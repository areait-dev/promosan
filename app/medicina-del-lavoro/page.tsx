// app/medicina-del-lavoro/page.tsx
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';
import HeroMedicinaLavoro from '../../components/medicina-del-lavoro/HeroMedicinaLavoro';
import NominaMedicoSection from '../../components/medicina-del-lavoro/NominaMedicoSection';
import ValutazioneRischiSection from '../../components/medicina-del-lavoro/ValutazioneRischiSection';
import SopralluogoSection from '../../components/medicina-del-lavoro/SopralluogoSection';
import VisiteMedicheSection from '../../components/medicina-del-lavoro/VisiteMedicheSection';
import SegreteriaOrganizzativa from '../../components/medicina-del-lavoro/SegreteriaOrganizzativa';
import RiunioneAllegatoSection from '../../components/medicina-del-lavoro/RiunioneAllegatoSection';
import BenefitsSection from '../../components/medicina-del-lavoro/BenefitsSection';
import CtaSection from '../../components/medicina-del-lavoro/CtaSection';
import { draftMode } from 'next/headers';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export default async function MedicinaDelLavoroPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  try {
    options = await getGlobalOptions(draft);
  } catch (error) {
    console.error('[MedicinaDelLavoro] Fetch WordPress fallito, uso i default:', error);
  }

  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <main>
        <HeroMedicinaLavoro />
        <NominaMedicoSection />
        <ValutazioneRischiSection />
        <SopralluogoSection />
        <VisiteMedicheSection />
        <SegreteriaOrganizzativa />
        <RiunioneAllegatoSection />
        <BenefitsSection />
        <CtaSection />
      </main>
      <Footer options={options} />
    </>
  );
}