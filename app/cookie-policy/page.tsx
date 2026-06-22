import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import LegalPage from '../../components/Legal/LegalPage';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Cookie Policy | PromoSan',
  description:
    'Informativa sull’utilizzo dei cookie e delle tecnologie di tracciamento sul sito di Promo. San. S.r.l., resa secondo la disciplina vigente.',
};

export default async function CookiePolicyPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  try {
    options = await getGlobalOptions(draft);
  } catch (error) {
    console.error('[Cookie] Fetch WordPress fallito, uso i default:', error);
  }

  return (
    <LegalPage
      title="Cookie Policy"
      intro="Questa pagina descrive l’utilizzo dei cookie e delle tecnologie analoghe sul sito di Promo. San. S.r.l. Ultimo aggiornamento: 22/04/2026 — Rev. 01."
      options={options}
      sections={[
        {
          heading: '12. Cosa sono i cookie',
          paragraphs: [
            'I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell’utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. Tecnologie simili possono includere pixel, tag, SDK, local storage e altri identificatori online.',
          ],
        },
        {
          heading: '13. Tipologie di cookie utilizzabili',
          paragraphs: [
            'Cookie tecnici: necessari al funzionamento del sito e alla corretta erogazione del servizio; non richiedono consenso.',
            'Cookie di preferenza/funzionalità: consentono di ricordare scelte dell’utente, ove presenti.',
            'Cookie analytics: usati per statistiche aggregate; se non anonimizzati o se consentono identificazione/tracciamento, richiedono consenso.',
            'Cookie marketing/profilazione: usati per inviare messaggi o contenuti coerenti con preferenze e navigazione dell’utente; richiedono consenso preventivo.',
            'Cookie di terze parti e contenuti incorporati: possono essere installati da fornitori esterni, ad esempio servizi video, mappe, social network o piattaforme analytics.',
          ],
        },
        {
          heading: '14. Cookie utilizzati',
          paragraphs: [
            'La tabella seguente è soggetta a verifica e completamento mediante scansione tecnica del sito e della piattaforma effettivamente utilizzata. Eventuali cookie non tecnici sono bloccati prima del consenso tramite il banner di gestione delle preferenze.',
          ],
          table: {
            headers: ['Nome/categoria', 'Fornitore', 'Finalità', 'Durata', 'Base giuridica', 'Note'],
            rows: [
              [
                'Cookie tecnici di sessione',
                'Prima parte',
                'Funzionamento del sito, sicurezza, gestione sessione',
                'Sessione / variabile',
                'Necessità tecnica',
                'Da confermare con scansione sito',
              ],
              [
                'Cookie preferenze banner',
                'Prima parte / CMP',
                'Memorizzazione preferenze cookie',
                '6-12 mesi',
                'Obbligo/legittimo interesse',
                'Da configurare nel CMP',
              ],
              [
                'Cookie analytics anonimizzati',
                'Prima o terza parte',
                'Statistiche aggregate sul traffico',
                'Variabile',
                'Legittimo interesse se anonimizzati; consenso se non anonimizzati',
                'Verificare IP masking e assenza incrocio dati',
              ],
              [
                'Google Analytics / strumenti analoghi',
                'Terza parte',
                'Statistiche e analisi navigazione',
                'Variabile',
                'Consenso se non pienamente anonimizzato',
                'Attivare solo dopo consenso se necessario',
              ],
              [
                'Google Maps / contenuti incorporati',
                'Terza parte',
                'Visualizzazione mappe o contenuti esterni',
                'Variabile',
                'Consenso',
                'Caricare solo dopo scelta utente se presente',
              ],
              [
                'YouTube / video incorporati',
                'Terza parte',
                'Visualizzazione video',
                'Variabile',
                'Consenso',
                'Preferire modalità privacy-enhanced se applicabile',
              ],
              [
                'Meta/Facebook/LinkedIn pixel o simili',
                'Terza parte',
                'Marketing, retargeting, misurazione campagne',
                'Variabile',
                'Consenso',
                'Da usare solo se effettivamente presente e configurato',
              ],
              [
                'Tracking newsletter / pixel e link tracciati',
                'Fornitore newsletter',
                'Misurazione aperture/click e interazioni',
                'Variabile',
                'Consenso ove richiesto',
                'Indicare nel form newsletter se attivo',
              ],
            ],
          },
        },
        {
          heading: '15. Gestione del consenso cookie',
          paragraphs: [
            'Alla prima visita il sito deve mostrare un banner che consenta all’utente di accettare, rifiutare o personalizzare i cookie non tecnici. La prosecuzione della navigazione o il semplice scroll non costituiscono consenso valido.',
            'L’utente deve poter modificare o revocare le preferenze in qualsiasi momento tramite apposito link o pulsante accessibile dal sito, ad esempio "Gestisci preferenze cookie".',
            'L’utente può inoltre gestire o disabilitare i cookie tramite le impostazioni del proprio browser. La disabilitazione dei cookie tecnici può compromettere la fruizione di alcune funzionalità del sito.',
          ],
        },
        {
          heading: '16. Contenuti di terze parti',
          paragraphs: [
            'Il sito potrebbe incorporare contenuti di terze parti, quali mappe, video, social plugin o strumenti analoghi. Tali contenuti possono raccogliere dati dell’utente come se questi visitasse direttamente il sito del terzo. I contenuti non necessari devono essere caricati solo dopo il consenso, ove richiesto.',
          ],
        },
        {
          heading: '17. Aggiornamento della policy',
          paragraphs: [
            'La presente informativa potrà essere aggiornata in caso di modifiche al sito, ai servizi, ai fornitori, ai cookie utilizzati, alle modalità di trattamento o alla normativa applicabile. Si consiglia di verificare periodicamente la data di aggiornamento. Aggiornamento: 22/04/2026 — Promo. San. S.r.l.',
          ],
        },
      ]}
    />
  );
}
