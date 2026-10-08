// app/api/send/route.js
import { Resend } from 'resend';

// Etichette leggibili per i valori delle select del form.
const SERVIZI = {
  medicina: 'Medicina del lavoro',
  'unita-mobili': 'Unità mobili',
  welfare: 'Welfare aziendale',
  sicurezza: 'Sicurezza sul lavoro',
  formazione: 'Formazione',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function logToSheet({ servizio, dipendenti, azienda }) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret: process.env.SHEETS_WEBHOOK_SECRET || '',
        servizio,
        dipendenti: dipendenti || 'Non specificato',
        azienda: azienda || 'Non specificata',
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error('[Sheets] Risposta non valida:', res.status);
  } catch (err) {
    console.error('[Sheets] Scrittura fallita:', err);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: 'Richiesta non valida.' }, { status: 400 });
  }

  const {
    nome = '',
    email = '',
    azienda = '',
    telefono = '',
    servizio = '',
    dipendenti = '',
    messaggio = '',
    privacy = false,
  } = body || {};

  // Validazione dei campi obbligatori.
  if (!nome.trim() || !email.trim() || !telefono.trim() || !messaggio.trim() || !privacy) {
    return Response.json(
      { success: false, error: 'Compila tutti i campi obbligatori e accetta la privacy policy.' },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { success: false, error: 'Configurazione email mancante. Riprova più tardi.' },
      { status: 500 }
    );
  }

  const servizioLabel = SERVIZI[servizio] || servizio || 'Non specificato';

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'info@promosan.eu',
      to: 'info@promosan.eu',
      replyTo: email,
      subject: `Nuova richiesta dal sito — ${nome}`,
      html: `
        <h2>Nuova richiesta di preventivo</h2>
        <ul>
          <li><strong>Nome e cognome:</strong> ${escapeHtml(nome)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Azienda:</strong> ${escapeHtml(azienda) || '—'}</li>
          <li><strong>Telefono:</strong> ${escapeHtml(telefono)}</li>
          <li><strong>Servizio di interesse:</strong> ${escapeHtml(servizioLabel)}</li>
          <li><strong>Numero dipendenti:</strong> ${escapeHtml(dipendenti) || '—'}</li>
        </ul>
        <p><strong>Messaggio:</strong></p>
        <p>${escapeHtml(messaggio).replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      console.error('[Resend] Errore invio:', error);
      return Response.json(
        { success: false, error: "Invio non riuscito. Riprova più tardi." },
        { status: 502 }
      );
    }

    // Registro interno per le statistiche delle campagne: solo servizio,
    // fascia dipendenti e azienda (nessun dato personale del contatto).
    // Un errore qui non deve far fallire la richiesta: la mail è già partita.
    await logToSheet({ servizio: servizioLabel, dipendenti, azienda });

    return Response.json({ success: true });
  } catch (err) {
    console.error('[Resend] Eccezione invio:', err);
    return Response.json(
      { success: false, error: "Si è verificato un errore. Riprova più tardi." },
      { status: 500 }
    );
  }
}
