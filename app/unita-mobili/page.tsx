import HeroUnitaMobili from '../../components/Unita-mobili/HeroUnitaMobili';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import VantaggiUnitaMobili from '../../components/Unita-mobili/VantaggiUnitaMobili';
import CaratteristicheServizio from '../../components/Unita-mobili/CaratteristicheServizio';
import { draftMode } from 'next/headers';
import {
  getGlobalOptions,
  getPageFields,
  parseCards,
  type GlobalOptions,
  type PageContentFields,
} from '@/lib/wordpress';

export const revalidate = 60;

export default async function UnitaMobiliPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  let pageContent: PageContentFields | null = null;
  try {
    [options, pageContent] = await Promise.all([
      getGlobalOptions(draft),
      getPageFields<PageContentFields>('unita-mobili', draft),
    ]);
  } catch (error) {
    console.error('[UnitaMobili] Fetch WordPress fallito, uso i default:', error);
  }

  const unita = pageContent?.unita;
  const vantaggi = parseCards(unita?.vantaggi?.lista);

  return (
    <main>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <HeroUnitaMobili
        badge={unita?.hero?.badge || undefined}
        title={unita?.hero?.titolo || undefined}
        btn1Label={unita?.hero?.btn1_label || undefined}
        btn1Link={unita?.hero?.btn1_link || undefined}
        btn2Label={unita?.hero?.btn2_label || undefined}
        btn2Link={unita?.hero?.btn2_link || undefined}
        backgroundImage={unita?.hero?.immagine ? unita.hero.immagine.url : undefined}
      />
      <CaratteristicheServizio
        title={unita?.caratteristiche?.titolo || undefined}
        intro={unita?.caratteristiche?.intro || undefined}
      />
      <VantaggiUnitaMobili
        title={unita?.vantaggi?.titolo || undefined}
        subtitle={unita?.vantaggi?.sottotitolo || undefined}
        vantaggi={vantaggi.length ? vantaggi : undefined}
      />
      <Footer options={options} />
    </main>
  );
}
