// app/api/newsletter/route.js
//
// Iscrizione newsletter tramite Resend Audiences/Contacts (stesso ESP già
// usato per l'invio email in app/api/send/route.js, niente servizio nuovo).
//
// SETUP RICHIESTO (TODO): creare una Audience su https://resend.com/audiences
// e impostarne l'ID nella variabile d'ambiente RESEND_AUDIENCE_ID (.env.local
// in locale, variabili d'ambiente del progetto su Vercel in produzione).
// Senza questa variabile l'endpoint risponde con errore esplicito: non c'è
// nessun "successo" finto se l'iscrizione non può essere salvata davvero.

import { Resend } from 'resend';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: 'Richiesta non valida.' }, { status: 400 });
  }

  const email = String(body?.email ?? '').trim();

  if (!email || !isValidEmail(email)) {
    return Response.json(
      { success: false, error: 'Inserisci un indirizzo email valido.' },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    console.error(
      '[Newsletter] RESEND_AUDIENCE_ID non configurata: vedi TODO in app/api/newsletter/route.js'
    );
    return Response.json(
      { success: false, error: 'Iscrizione temporaneamente non disponibile. Riprova più tardi.' },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });

    if (error) {
      console.error('[Resend] Errore iscrizione newsletter:', error);
      return Response.json(
        { success: false, error: 'Iscrizione non riuscita. Riprova più tardi.' },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[Resend] Eccezione iscrizione newsletter:', err);
    return Response.json(
      { success: false, error: 'Si è verificato un errore. Riprova più tardi.' },
      { status: 500 }
    );
  }
}
