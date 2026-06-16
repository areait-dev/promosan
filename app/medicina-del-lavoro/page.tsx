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
import {
  getGlobalOptions,
  getPageFields,
  parseCards,
  type GlobalOptions,
  type PageContentFields,
} from '@/lib/wordpress';

export const revalidate = 60;

export default async function MedicinaDelLavoroPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  let pageContent: PageContentFields | null = null;
  try {
    [options, pageContent] = await Promise.all([
      getGlobalOptions(draft),
      getPageFields<PageContentFields>('medicina-del-lavoro', draft),
    ]);
  } catch (error) {
    console.error('[MedicinaDelLavoro] Fetch WordPress fallito, uso i default:', error);
  }

  const medicina = pageContent?.medicina;
  const benefits = parseCards(medicina?.benefits?.lista);

  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <main>
        <HeroMedicinaLavoro
          badge={medicina?.hero?.badge || undefined}
          title={medicina?.hero?.titolo || undefined}
          ctaLabel={medicina?.hero?.btn1_label || undefined}
          ctaLink={medicina?.hero?.btn1_link || undefined}
          backgroundImage={medicina?.hero?.immagine ? medicina.hero.immagine.url : undefined}
        />
        <NominaMedicoSection />
        <ValutazioneRischiSection />
        <SopralluogoSection />
        <VisiteMedicheSection
          title={medicina?.visite?.titolo || undefined}
          intro={medicina?.visite?.intro || undefined}
        />
        <SegreteriaOrganizzativa />
        <RiunioneAllegatoSection />
        <BenefitsSection
          title={medicina?.benefits?.titolo || undefined}
          benefits={benefits.length ? benefits : undefined}
        />
        <CtaSection />
      </main>
      <Footer options={options} />
    </>
  );
}