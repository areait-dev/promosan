import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import LegalPage from '../../components/Legal/LegalPage';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Privacy Policy | PromoSan',
  description:
    'Informativa sul trattamento dei dati personali di Promo. San. S.r.l. resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR).',
};

export default async function PrivacyPolicyPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  try {
    options = await getGlobalOptions(draft);
  } catch (error) {
    console.error('[Privacy] Fetch WordPress fallito, uso i default:', error);
  }

  return (
    <LegalPage
      title="Privacy Policy"
      intro="Informativa resa ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679. La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito e utilizzano gli strumenti digitali collegati a Promo. San. S.r.l. Ultimo aggiornamento: 22/04/2026 — Rev. 01."
      options={options}
      sections={[
        {
          heading: '1. Titolare del trattamento',
          paragraphs: [
            'Il Titolare del trattamento è Promo. San. S.r.l., P.IVA 01840870883, con sede legale e operativa in Vittoria (RG), Area Produttiva C.da Boscopiano / Via del Carrubo snc, telefono 0932 862613, e-mail info@promosan.eu, PEC promolab.srl@pec.it.',
            'Il legale rappresentante indicato nella documentazione aziendale è il Sig. Gulino Antonio.',
            'Il Responsabile della Protezione dei Dati (DPO/RPD), ove nominato, sarà indicato nella presente sezione e/o nelle informative pubblicate sul sito. In assenza di indicazione specifica, le richieste privacy possono essere inviate direttamente ai recapiti del Titolare sopra riportati.',
          ],
        },
        {
          heading: '2. Ambito della presente informativa',
          paragraphs: [
            'La presente informativa disciplina il trattamento dei dati personali effettuato attraverso il sito web e gli strumenti digitali collegati a Promo. San. S.r.l., con particolare riferimento a: navigazione del sito, invio di richieste di informazioni o preventivi, iscrizione alla newsletter, eventuale gestione di comunicazioni commerciali e utilizzo dei cookie o di tecnologie similari.',
            'La presente informativa non sostituisce le specifiche informative rese per rapporti contrattuali, servizi sanitari, sorveglianza sanitaria, rapporti di lavoro, fornitori o candidati, ove applicabili.',
          ],
        },
        {
          heading: '3. Tipologie di dati trattati',
          paragraphs: [
            'Dati di navigazione: indirizzo IP, identificativi del dispositivo, log tecnici, informazioni sul browser e sul sistema operativo, data e ora di accesso, pagine visitate.',
            'Dati forniti volontariamente dall’utente: nome, cognome, azienda/ente di appartenenza, ruolo, recapito telefonico, indirizzo e-mail, contenuto del messaggio e altri dati inseriti nei form.',
            'Dati per richieste commerciali o preventivi: informazioni necessarie a comprendere la richiesta, predisporre un riscontro, programmare eventuali contatti e formulare una proposta.',
            'Dati per newsletter: indirizzo e-mail, eventuale nome/cognome, preferenze espresse e informazioni tecniche relative all’iscrizione, alla revoca e alla gestione del consenso.',
            'Cookie e strumenti similari: dati raccolti tramite cookie tecnici, analytics e, se presenti e previo consenso, strumenti di marketing o tracciamento.',
          ],
        },
        {
          heading: '4. Finalità e basi giuridiche del trattamento',
          table: {
            headers: ['Finalità', 'Descrizione', 'Base giuridica'],
            rows: [
              [
                'Navigazione e sicurezza del sito',
                'Consentire la consultazione del sito, garantirne il funzionamento tecnico, prevenire abusi, frodi o accessi non autorizzati.',
                'Legittimo interesse del Titolare e necessità tecnica del servizio.',
              ],
              [
                'Richiesta informazioni e preventivi',
                'Rispondere alle richieste inviate dall’utente, ricontattarlo, fornire informazioni sui servizi e predisporre eventuali preventivi.',
                'Esecuzione di misure precontrattuali richieste dall’interessato; legittimo interesse alla gestione del rapporto.',
              ],
              [
                'Gestione contatti commerciali',
                'Gestire il rapporto con potenziali clienti, aziende, enti e referenti che chiedono informazioni sui servizi.',
                'Misure precontrattuali o legittimo interesse, secondo il contesto.',
              ],
              [
                'Newsletter',
                'Inviare comunicazioni informative, aggiornamenti, contenuti promozionali e notizie sui servizi del Titolare.',
                'Consenso libero, specifico e revocabile dell’interessato.',
              ],
              [
                'Obblighi di legge',
                'Adempiere a obblighi normativi, fiscali, amministrativi o richieste dell’autorità.',
                'Obbligo legale.',
              ],
              [
                'Difesa dei diritti',
                'Accertare, esercitare o difendere un diritto in sede stragiudiziale o giudiziale.',
                'Legittimo interesse del Titolare.',
              ],
            ],
          },
        },
        {
          heading: '5. Richiesta informazioni e preventivi',
          paragraphs: [
            'Quando l’utente compila un form di contatto, invia una e-mail o lascia i propri dati per essere ricontattato, Promo. San. S.r.l. tratta i dati esclusivamente per prendere in carico la richiesta, fornire informazioni, formulare eventuali preventivi e gestire i successivi contatti precontrattuali.',
            'Il conferimento dei dati contrassegnati come obbligatori è necessario per consentire al Titolare di rispondere alla richiesta. Il mancato conferimento può rendere impossibile dare seguito al contatto o predisporre un preventivo.',
          ],
        },
        {
          heading: '6. Newsletter e comunicazioni informative',
          paragraphs: [
            'L’iscrizione alla newsletter è facoltativa e richiede uno specifico consenso. I dati saranno utilizzati per l’invio di comunicazioni informative, promozionali e di aggiornamento sui servizi di Promo. San. S.r.l. e del gruppo di appartenenza, ove coerente con il consenso prestato.',
            'L’utente può revocare il consenso in qualsiasi momento tramite il link di disiscrizione presente nelle comunicazioni, ove disponibile, oppure scrivendo ai recapiti del Titolare. La revoca non pregiudica la liceità del trattamento svolto prima della revoca.',
            'Se nelle e-mail/newsletter sono utilizzati strumenti di tracciamento, quali pixel di apertura, link tracciati o sistemi di profilazione delle interazioni, tali strumenti devono essere attivati solo se correttamente indicati nell’informativa e, ove richiesto, previo consenso specifico.',
          ],
        },
        {
          heading: '7. Modalità del trattamento e misure di sicurezza',
          paragraphs: [
            'Il trattamento è effettuato con strumenti informatici, telematici e, ove necessario, cartacei, secondo principi di liceità, correttezza, trasparenza, minimizzazione, riservatezza e integrità dei dati.',
            'Il Titolare adotta misure tecniche e organizzative adeguate, tra cui gestione degli accessi, credenziali individuali, limitazione dei privilegi, backup, protezione antivirus/antimalware, misure di sicurezza dei sistemi informativi, istruzioni agli autorizzati e verifica dei fornitori esterni coinvolti nel trattamento.',
          ],
        },
        {
          heading: '8. Destinatari dei dati',
          paragraphs: [
            'I dati potranno essere trattati da personale autorizzato del Titolare e comunicati, nei limiti delle finalità sopra indicate, a fornitori IT, hosting provider, consulenti, soggetti che gestiscono piattaforme e-mail/newsletter, società del gruppo o partner tecnici, nonché a soggetti pubblici o autorità quando previsto dalla legge.',
            'I soggetti esterni che trattano dati per conto del Titolare sono nominati, ove necessario, Responsabili del trattamento ai sensi dell’art. 28 GDPR oppure operano come autonomi titolari nei casi previsti dalla normativa applicabile.',
          ],
        },
        {
          heading: '9. Trasferimenti extra UE',
          paragraphs: [
            'I dati sono trattati preferibilmente all’interno dello Spazio Economico Europeo. Qualora l’utilizzo di servizi cloud, newsletter, hosting, analytics o altri fornitori comporti trasferimenti verso Paesi extra UE, il Titolare adotterà le garanzie previste dagli artt. 44 e ss. del GDPR, quali decisioni di adeguatezza, clausole contrattuali standard o altre misure idonee.',
          ],
        },
        {
          heading: '10. Tempi di conservazione',
          table: {
            headers: ['Categoria', 'Periodo di conservazione'],
            rows: [
              [
                'Dati di navigazione e log tecnici',
                'Per il tempo strettamente necessario al funzionamento e alla sicurezza del sito, salvo esigenze di accertamento di illeciti.',
              ],
              [
                'Richieste informazioni/preventivi',
                'Per il tempo necessario a gestire la richiesta e i successivi contatti; di norma fino a 24 mesi, salvo instaurazione di un rapporto contrattuale o necessità di tutela dei diritti.',
              ],
              [
                'Newsletter',
                'Fino alla revoca del consenso o alla richiesta di cancellazione, con verifiche periodiche sull’attualità del consenso.',
              ],
              [
                'Dati contrattuali/amministrativi',
                'Per i tempi previsti dalla normativa civilistica, fiscale e contabile, di norma fino a 10 anni ove applicabile.',
              ],
              [
                'Cookie',
                'Secondo le durate indicate nella tabella cookie e nelle impostazioni del browser/CMP (vedi Cookie Policy).',
              ],
            ],
          },
        },
        {
          heading: '11. Diritti dell’interessato',
          paragraphs: [
            'L’interessato può esercitare, nei limiti e alle condizioni previste dal GDPR, i diritti di accesso, rettifica, cancellazione, limitazione, opposizione, portabilità, revoca del consenso e reclamo all’Autorità Garante per la protezione dei dati personali.',
            'Le richieste possono essere inviate a Promo. San. S.r.l. ai recapiti: info@promosan.eu, PEC promolab.srl@pec.it, telefono 0932 862613.',
          ],
        },
      ]}
    />
  );
}
