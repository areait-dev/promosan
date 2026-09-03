import type { MetadataRoute } from "next";
import { getNews } from "../lib/wordpress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://promosan.eu";

// Pagine statiche del sito, con priorità/frequenza indicativa in base
// all'importanza (home e servizi principali più alte, legal più basse).
const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/medicina-del-lavoro", priority: 0.9, changeFrequency: "monthly" },
  { path: "/unita-mobili", priority: 0.9, changeFrequency: "monthly" },
  { path: "/welfare-aziendale", priority: 0.9, changeFrequency: "monthly" },
  { path: "/altri-servizi", priority: 0.7, changeFrequency: "monthly" },
  { path: "/promo-health-center", priority: 0.8, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/contatti", priority: 0.7, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/termini-e-condizioni", priority: 0.2, changeFrequency: "yearly" },
];

// Solo data (YYYY-MM-DD), niente ora/millisecondi: il formato W3C Datetime
// raccomandato da sitemaps.org è più stretto di un ISO 8601 completo, e un
// Date passato a Next.js viene serializzato con .toISOString() (millisecondi
// inclusi) — alcuni parser di sitemap sono rigidi su questo dettaglio.
function toSitemapDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = toSitemapDate(new Date());

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: today,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Articoli news da WordPress; in caso di errore la sitemap resta comunque
  // valida con le sole pagine statiche invece di rompere l'intera route.
  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const news = await getNews(100);
    newsEntries = news.map((item) => ({
      url: `${SITE_URL}/news/${item.slug}`,
      lastModified: toSitemapDate(new Date(item.date)),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("[sitemap] Fetch news fallito, escluse dalla sitemap:", error);
  }

  return [...staticEntries, ...newsEntries];
}
