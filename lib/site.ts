// URL pubblico canonico del sito. Fisso (non da env) per evitare che una
// variabile Vercel/.env con l'apex o con wp.promosan.eu rompa canonical e sitemap.
export const SITE_URL = "https://www.promosan.eu";

/** Riscrive eventuali URL del backend WordPress (wp.promosan.eu) sul dominio pubblico. */
export function toPublicUrl(url: string): string {
  return url.replace(/^https?:\/\/(?:wp\.)?(?:www\.)?promosan\.eu/i, SITE_URL);
}
