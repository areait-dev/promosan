import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import LegalPage from '../../components/Legal/LegalPage';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Cookie Policy | PromoSan',
  description: 'Informativa sull’utilizzo dei cookie e delle tecnologie di tracciamento sul sito di PromoSan S.r.l.',
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
      intro="Questa pagina descrive l’utilizzo dei cookie e delle tecnologie analoghe sul sito di PromoSan S.r.l."
      options={options}
      sections={[
        {
          heading: 'Cosa sono i cookie',
          paragraphs: [
            'I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell’utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva.',
          ],
        },
        {
          heading: 'Tipologie di cookie utilizzati',
          paragraphs: [
            'Cookie tecnici: necessari al corretto funzionamento del sito, non richiedono il consenso dell’utente.',
            'Cookie analitici e di terze parti: utilizzati, previo consenso, per raccogliere informazioni statistiche aggregate sull’utilizzo del sito.',
          ],
        },
        {
          heading: 'Gestione dei cookie',
          paragraphs: [
            'L’utente può gestire o disabilitare i cookie tramite le impostazioni del proprio browser. La disabilitazione dei cookie tecnici può compromettere la fruizione di alcune funzionalità del sito.',
          ],
        },
      ]}
    />
  );
}
