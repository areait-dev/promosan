/**
 * lib/paths.ts
 *
 * Mapping condiviso tra i contenuti WordPress (post_type + slug) e le route
 * del front-end Next.js. Usato sia da /api/preview (redirect) sia da
 * /api/revalidate (rigenerazione on-demand).
 *
 * I CPT corrispondono ai field group ACF in /acf-json:
 *   news, sedi, pacchetti, faq  + le pagine native (post_type "page").
 */

/** Slug pagina native -> route Next. La home ('home' o vuoto) mappa su "/". */
export function pagePathFromSlug(slug: string): string {
  const s = (slug || "").trim().toLowerCase();
  if (!s || s === "home" || s === "homepage") return "/";
  return `/${s}`;
}

/**
 * Risolve la singola route da aprire in preview, dato il post_type e lo slug.
 * Per i CPT senza pagina di dettaglio dedicata si apre la pagina contenitore.
 */
export function resolvePreviewPath(postType: string, slug: string): string {
  switch (postType) {
    case "news":
      return "/news";
    case "sedi":
      return "/promo-health-center";
    case "pacchetti":
      return "/welfare-aziendale";
    case "faq":
      return "/";
    case "page":
      return pagePathFromSlug(slug);
    default:
      return "/";
  }
}

/**
 * Risolve TUTTE le route da rivalidare quando un contenuto viene salvato.
 * Alcuni contenuti compaiono in più pagine (es. le news anche in home).
 */
export function resolveRevalidatePaths(postType: string, slug: string): string[] {
  switch (postType) {
    case "news":
      // Le news compaiono nell'archivio /news e tra le ultime news in home.
      return ["/news", "/"];
    case "sedi":
      return ["/promo-health-center"];
    case "pacchetti":
      return ["/welfare-aziendale"];
    case "faq":
      // Le FAQ sono mostrate in home.
      return ["/"];
    case "page":
      return [pagePathFromSlug(slug)];
    default:
      return ["/"];
  }
}
