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
  type GlobalOptions,
  type NewsItem,
  type FaqItem,
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

  try {
    [options, latestNews, faq] = await Promise.all([
      getGlobalOptions(draft),
      getLatestNews(4, draft),
      getFaq(draft),
    ]);
  } catch (error) {
    console.error("[Home] Fetch WordPress fallito, uso i default:", error);
  }

  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <main>
        <Hero />

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
