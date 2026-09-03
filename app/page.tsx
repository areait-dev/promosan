// app/page.tsx
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
  mediaUrl,
  parseColumns,
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

  // Contenuti namespaced sotto acf.home.* (Tab "Home"). Props undefined -> default del componente.
  const home = pageContent?.home;
  const hero = home?.hero;

  // Risolve le immagini ACF (ID/oggetto/stringa) in URL prima del render.
  const [heroBg, fotoTeam, missionImg] = await Promise.all([
    mediaUrl(hero?.immagine, draft),
    mediaUrl(home?.chisiamo?.foto_team, draft),
    mediaUrl(home?.mission?.immagine, draft),
  ]);

  // Liste textarea ACF -> strutture attese dai componenti (vuote = default del componente).
  const servizi = parseColumns(home?.servizi?.lista)
    .filter((c) => c[0])
    .map((c) => ({
      title: c[0] ?? "",
      description: c[1] ?? "",
      image: c[2] ?? "",
      link: c[3] ?? "#",
    }));
  const stats = parseColumns(home?.numeri?.lista)
    .filter((c) => c[0])
    .map((c, i) => ({
      id: i + 1,
      value: Number(String(c[0]).replace(/[^\d]/g, "")) || 0,
      suffix: c[1] ?? "",
      label: c[2] ?? "",
      duration: 2.5,
    }));

  return (
    <>
      <main>
        <Hero
          title={hero?.titolo || undefined}
          backgroundImage={heroBg}
          logo={options?.logoBianco || undefined}
          ctaLabel={hero?.btn1_label || undefined}
          ctaLink={hero?.btn1_link || undefined}
        />

        {/* Sezioni con spacing uniforme */}
        <section className="section">
          <ChiSiamo
            title={home?.chisiamo?.titolo || undefined}
            text={home?.chisiamo?.testo || undefined}
            fotoTeam={fotoTeam}
          />
        </section>

        <section className="section">
          <MissionVision
            missionText={home?.mission?.mission_testo || undefined}
            visionText={home?.mission?.vision_testo || undefined}
          />
        </section>

        <section className="section">
          <PromoSanNumeri
            title={home?.numeri?.titolo || undefined}
            subtitle={home?.numeri?.sottotitolo || undefined}
            stats={stats.length ? stats : undefined}
          />
        </section>

        <section className="section section-light">
          <Services
            title={home?.servizi?.titolo || undefined}
            subtitle={home?.servizi?.sottotitolo || undefined}
            services={servizi.length ? servizi : undefined}
          />
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
