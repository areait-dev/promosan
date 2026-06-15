// app/page.tsx
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import ChiSiamo from "../components/Chisiamo/chisiamo";
import MissionVision from "../components/MissionVision/MissionVision";
import Services from "../components/Services/Services";
import News from "../components/News/News";
import Footer from "../components/Footer/Footer";
import { draftMode } from "next/headers";
import PromoSanNumeri from "../components/Numeri/PromoSanNumeri";
import FAQ from "../components/FAQ/FAQ";
import {
  getGlobalOptions,
  getLatestNews,
  getFaq,
  getPageFields,
  type GlobalOptions,
  type NewsItem,
  type FaqItem,
  type PageContentFields,
} from "@/lib/wordpress";

// ISR: rigenera la pagina al massimo ogni 60 secondi.
export const revalidate = 60;

export default async function Home() {
  // Draft Mode attivo (preview) -> fetch no-store; altrimenti ISR (revalidate 60).
  const { isEnabled: draft } = await draftMode();

  // Fetch parallelo dei dati CMS; fallback ai default dei componenti in caso di errore.
  let options: GlobalOptions | undefined;
  let latestNews: NewsItem[] | undefined;
  let faq: FaqItem[] | undefined;
  let pageContent: PageContentFields | null = null;

  try {
    [options, latestNews, faq, pageContent] = await Promise.all([
      getGlobalOptions(draft),
      getLatestNews(4, draft),
      getFaq(draft),
      getPageFields<PageContentFields>("home", draft),
    ]);
  } catch (error) {
    console.error("[Home] Fetch WordPress fallito, uso i default:", error);
  }

  // Hero dal gruppo ACF "hero" (acf.hero.*). Props undefined -> il componente usa i suoi default.
  const hero = pageContent?.hero;

  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <main>
        <Hero
          title={hero?.titolo || undefined}
          backgroundImage={hero?.immagine ? hero.immagine.url : undefined}
          ctaLabel={hero?.btn1_label || undefined}
          ctaLink={hero?.btn1_link || undefined}
        />

        {/* Sezioni con spacing uniforme */}
        <section className="section">
          <ChiSiamo />
        </section>

        <section className="section">
          <MissionVision />
        </section>

        <section className="section">
          <PromoSanNumeri />
        </section>

        <section className="section section-light">
          <Services />
        </section>

        <section className="section">
          <FAQ items={faq} />
        </section>

        <section className="section section-light">
          <News items={latestNews} />
        </section>
      </main>
      <Footer options={options} />
    </>
  );
}
