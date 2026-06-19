import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import LegalPage from '../../components/Legal/LegalPage';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Termini e Condizioni | PromoSan',
  description: 'Termini e condizioni di utilizzo del sito di PromoSan S.r.l.',
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
      intro="L’accesso e l’utilizzo del sito di PromoSan S.r.l. implicano l’accettazione dei presenti termini e condizioni."
      options={options}
      sections={[
        {
          heading: 'Proprietà dei contenuti',
          paragraphs: [
            'Tutti i contenuti presenti sul sito (testi, immagini, loghi, grafica) sono di proprietà di PromoSan S.r.l. o dei rispettivi titolari e sono protetti dalla normativa sul diritto d’autore. È vietata la riproduzione senza autorizzazione.',
          ],
        },
        {
          heading: 'Utilizzo del sito',
          paragraphs: [
            'L’utente si impegna a utilizzare il sito nel rispetto della legge e a non porre in essere attività che possano comprometterne il funzionamento o la sicurezza.',
          ],
        },
        {
          heading: 'Limitazione di responsabilità',
          paragraphs: [
            'PromoSan S.r.l. non garantisce l’assenza di errori o interruzioni nel funzionamento del sito e non è responsabile per eventuali danni derivanti dall’utilizzo o dall’impossibilità di utilizzo dello stesso.',
          ],
        },
        {
          heading: 'Legge applicabile',
          paragraphs: [
            'I presenti termini sono regolati dalla legge italiana. Per ogni controversia sarà competente il foro del luogo in cui ha sede PromoSan S.r.l.',
          ],
        },
      ]}
    />
  );
}
