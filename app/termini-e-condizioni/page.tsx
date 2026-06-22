import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import LegalPage from '../../components/Legal/LegalPage';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Termini e Condizioni | PromoSan',
  description:
    'Termini e condizioni di utilizzo del sito di Promo. San. S.r.l.: proprietà dei contenuti, uso del sito, responsabilità, privacy e cookie, legge applicabile.',
};

export default async function TerminiCondizioniPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  try {
    options = await getGlobalOptions(draft);
  } catch (error) {
    console.error('[Termini] Fetch WordPress fallito, uso i default:', error);
  }

  return (
    <LegalPage
      title="Termini e Condizioni"
      intro="L’accesso e l’utilizzo del sito di Promo. San. S.r.l. implicano la presa visione e l’accettazione dei presenti termini e condizioni. Ultimo aggiornamento: 22/04/2026 — Rev. 01."
      options={options}
      sections={[
        {
          heading: '1. Titolare del sito',
          paragraphs: [
            'Il sito è gestito da Promo. San. S.r.l., P.IVA 01840870883, con sede legale e operativa in Vittoria (RG), Area Produttiva C.da Boscopiano / Via del Carrubo snc, telefono 0932 862613, e-mail info@promosan.eu, PEC promolab.srl@pec.it. Il legale rappresentante indicato nella documentazione aziendale è il Sig. Gulino Antonio.',
          ],
        },
        {
          heading: '2. Oggetto e ambito di applicazione',
          paragraphs: [
            'I presenti termini disciplinano l’accesso e l’utilizzo del sito web e degli strumenti digitali collegati a Promo. San. S.r.l., nonché la consultazione dei contenuti e l’invio di richieste di informazioni o preventivi.',
            'I presenti termini non regolano i singoli rapporti contrattuali, i servizi sanitari, la sorveglianza sanitaria o gli altri servizi resi dalla Società, che restano disciplinati dalle specifiche condizioni e dalla documentazione contrattuale applicabile.',
          ],
        },
        {
          heading: '3. Proprietà dei contenuti',
          paragraphs: [
            'Tutti i contenuti presenti sul sito (testi, immagini, loghi, marchi, grafica, layout e materiali scaricabili) sono di proprietà di Promo. San. S.r.l. o dei rispettivi titolari e sono protetti dalla normativa sul diritto d’autore e sulla proprietà industriale.',
            'È vietata la riproduzione, distribuzione, modifica o utilizzo dei contenuti, anche parziale, senza la preventiva autorizzazione scritta del Titolare, salvo l’uso personale e non commerciale consentito dalla legge.',
          ],
        },
        {
          heading: '4. Utilizzo del sito',
          paragraphs: [
            'L’utente si impegna a utilizzare il sito nel rispetto della legge, della buona fede e dei presenti termini, e a non porre in essere attività che possano comprometterne il funzionamento, la sicurezza o l’integrità.',
            'È vietato in particolare tentare accessi non autorizzati, introdurre codice malevolo, raccogliere dati di terzi in modo illecito o utilizzare il sito per finalità contrarie alla legge.',
          ],
        },
        {
          heading: '5. Richieste di informazioni e preventivi',
          paragraphs: [
            'Le informazioni pubblicate sul sito hanno carattere generale e non costituiscono offerta al pubblico. L’invio di una richiesta tramite i form o via e-mail non genera alcun obbligo a carico della Società fino all’eventuale formalizzazione del rapporto.',
            'Il conferimento dei dati contrassegnati come obbligatori è necessario per dare seguito alle richieste; il relativo trattamento è descritto nella Privacy Policy.',
          ],
        },
        {
          heading: '6. Privacy e cookie',
          paragraphs: [
            'Il trattamento dei dati personali degli utenti e l’utilizzo dei cookie e delle tecnologie similari sono disciplinati dalla Privacy Policy e dalla Cookie Policy, che costituiscono parte integrante dei presenti termini.',
            'L’utente può gestire in qualsiasi momento le proprie preferenze sui cookie tramite l’apposito strumento "Gestisci preferenze cookie" disponibile sul sito.',
          ],
        },
        {
          heading: '7. Collegamenti a siti terzi',
          paragraphs: [
            'Il sito può contenere collegamenti a siti o contenuti di terze parti. Promo. San. S.r.l. non controlla tali risorse e non è responsabile dei relativi contenuti, della loro disponibilità né del trattamento dei dati effettuato da soggetti terzi, che restano regolati dalle rispettive condizioni e informative.',
          ],
        },
        {
          heading: '8. Limitazione di responsabilità',
          paragraphs: [
            'Promo. San. S.r.l. non garantisce l’assenza di errori o interruzioni nel funzionamento del sito e si riserva di sospenderne o modificarne l’accesso per esigenze tecniche, di manutenzione o di sicurezza.',
            'Nei limiti consentiti dalla legge, la Società non è responsabile per eventuali danni derivanti dall’utilizzo o dall’impossibilità di utilizzo del sito, né dell’affidamento su informazioni di carattere generale ivi pubblicate.',
          ],
        },
        {
          heading: '9. Modifiche ai termini',
          paragraphs: [
            'Promo. San. S.r.l. si riserva il diritto di modificare i presenti termini in qualsiasi momento, in particolare in caso di variazioni del sito, dei servizi o della normativa applicabile. Si consiglia di verificare periodicamente la pagina e la data di aggiornamento.',
          ],
        },
        {
          heading: '10. Legge applicabile e foro competente',
          paragraphs: [
            'I presenti termini sono regolati dalla legge italiana. Per ogni controversia relativa all’interpretazione, esecuzione o validità degli stessi sarà competente in via esclusiva il Foro del luogo in cui ha sede Promo. San. S.r.l. (Ragusa), fatte salve le disposizioni inderogabili a tutela del consumatore.',
          ],
        },
      ]}
    />
  );
}
