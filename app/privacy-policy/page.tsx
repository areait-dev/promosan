import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import LegalPage from '../../components/Legal/LegalPage';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Privacy Policy | PromoSan',
  description: 'Informativa sul trattamento dei dati personali di PromoSan S.r.l. ai sensi del Regolamento (UE) 2016/679 (GDPR).',
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
      intro="La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito di PromoSan S.r.l., ai sensi del Regolamento (UE) 2016/679 (GDPR)."
      options={options}
      sections={[
        {
          heading: 'Titolare del trattamento',
          paragraphs: [
            'Il titolare del trattamento è PromoSan S.r.l. - P.IVA 01840870883. Per qualsiasi richiesta relativa ai dati personali è possibile scrivere a info@promosan.eu.',
          ],
        },
        {
          heading: 'Dati raccolti e finalità',
          paragraphs: [
            'Raccogliamo i dati forniti volontariamente tramite i moduli di contatto (nome, email, telefono, messaggio) al solo fine di rispondere alle richieste e fornire i servizi richiesti.',
            'I dati di navigazione raccolti automaticamente sono trattati per finalità statistiche e di sicurezza, in forma aggregata.',
          ],
        },
        {
          heading: 'Base giuridica e conservazione',
          paragraphs: [
            'Il trattamento si basa sul consenso dell’interessato e sull’esecuzione di misure precontrattuali. I dati sono conservati per il tempo strettamente necessario alle finalità indicate.',
          ],
        },
        {
          heading: 'Diritti dell’interessato',
          paragraphs: [
            'L’interessato può esercitare in qualsiasi momento i diritti di accesso, rettifica, cancellazione, limitazione e opposizione previsti dagli artt. 15-22 del GDPR scrivendo a info@promosan.eu.',
          ],
        },
      ]}
    />
  );
}
