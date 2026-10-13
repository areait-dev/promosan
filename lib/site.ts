// URL pubblico canonico del sito. Fisso (non da env) per evitare che una
// variabile Vercel/.env con l'apex o con wp.promosan.eu rompa canonical e sitemap.
export const SITE_URL = "https://www.promosan.eu";

/** Riscrive eventuali URL del backend WordPress (wp.promosan.eu) sul dominio pubblico. */
export function toPublicUrl(url: string): string {
  return url.replace(/^https?:\/\/(?:wp\.)?(?:www\.)?promosan\.eu/i, SITE_URL);
}

// Google Ads: ID account e etichetta della conversione "richiesta preventivo".
// Sovrascrivibili da Vercel/.env con le variabili NEXT_PUBLIC_*.
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18501673014";
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "8QGVCI_BpJsdELbApPZE";
export const GOOGLE_ADS_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;
