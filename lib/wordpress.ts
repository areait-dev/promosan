/**
 * lib/wordpress.ts
 *
 * Funzioni di fetch per le REST API di WordPress (wp.promosan.eu).
 *
 * Strategia (compatibile con ACF FREE — niente Pro):
 * - Usa l'endpoint REST nativo (/wp/v2) per Custom Post Type e tassonomie.
 * - NIENTE repeater né Options Page (richiederebbero ACF Pro):
 *   - le liste sono campi `textarea` (una voce per riga) o due textarea incluse/escluse;
 *   - le Opzioni globali sono una pagina WordPress normale con slug "opzioni-globali".
 * - I campi ACF sono esposti abilitando `show_in_rest` sui field group:
 *   arrivano nella proprietà `acf` di ogni oggetto.
 * - Tutte le funzioni usano il caching di Next (`next: { revalidate }`) per ISR.
 *
 * NB: i CPT/tassonomie/slug ACF qui usati corrispondono ai file in /acf-json.
 */

import { extractYoast, type SeoFields } from "./seo";

const API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ?? "https://wp.promosan.eu/wp-json/wp/v2";

// Slug della pagina WordPress che contiene le Opzioni globali (al posto della Options Page Pro).
const OPTIONS_PAGE_SLUG = "opzioni-globali";

// Rivalidazione ISR di default (secondi). Override per singola chiamata se serve.
const DEFAULT_REVALIDATE = 60;

/* -------------------------------------------------------------------------- */
/*                                  Tipi                                       */
/* -------------------------------------------------------------------------- */

export interface WPImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: WPImage | null;
  date: string; // ISO
  readTime: number;
  categories: string[]; // slug tassonomia
  tags?: string[]; // tag nativi WP (post_tag)
  author?: { name: string; role: string; initials: string };
  views?: number;
  seo?: SeoFields; // dati Yoast normalizzati (yoast_head_json)
}

export interface Sede {
  id: number;
  regione: string;
  indirizzo: string;
  telefono: string;
  email: string;
  mappaUrl: string;
  mappaTitolo: string;
  googleMapsLink: string;
  servizi: string[];
  image: WPImage | null;
}

/** Path immagini di fallback (hardcoded nei componenti prima del CMS). */
export const IMAGE_FALLBACKS = {
  logo: "/assets/img/PromoSan.png",
  logoBianco: "/assets/img/PromoSan_white.png",
  fotoTeam: "/assets/img/fototeam.jpg",
  sede: "/assets/img/Promo_Health_Center_Logo_def.png",
} as const;

export interface PacchettoWelfare {
  id: number;
  name: string;
  subtitle: string;
  isPopular: boolean;
  features: { text: string; included: boolean }[];
  image: WPImage | null;
}

export interface FaqItem {
  question: string;
  answer: string; // HTML
  categoria: "servizi" | "normative";
}

export interface GlobalOptions {
  telefono: string;
  email: string;
  whatsapp: string;
  piva: string;
  rea: string;
  orari: string;
  areaRiservataUrl: string;
  brochureUrl: string;
  copyright: string;
  logoUrl: string;
  logoBianco: string;
  social: { linkedin: string; facebook: string; instagram: string };
}

/**
 * Campi ACF del gruppo unico "Contenuti Pagina" (acf-json/group_pagina_hero_cta.json),
 * organizzato in Tab per pagina. I sotto-campi sono raggruppati: in REST arrivano come
 * oggetti annidati e namespaced per pagina (es. acf.home.hero.titolo, acf.medicina.benefits.lista).
 *
 * I campi "lista*" sono textarea (vincolo ACF Free — niente Repeater): una voce per riga,
 * con eventuali colonne separate da " | " (vedi helper parseList/parseCards più sotto).
 */
export interface HeroFields {
  badge?: string;
  titolo?: string;
  sottotitolo?: string;
  immagine?: WPImage | false;
  btn1_label?: string;
  btn1_link?: string;
  btn2_label?: string;
  btn2_link?: string;
}

export interface PageContentFields {
  // --- Home ---
  home?: {
    hero?: HeroFields;
    servizi?: { titolo?: string; sottotitolo?: string; lista?: string }; // "Titolo | Descrizione | image | link"
    numeri?: { titolo?: string; sottotitolo?: string; lista?: string }; // "valore | suffisso | etichetta"
    mission?: { mission_testo?: string; vision_testo?: string; immagine?: WPImage | false };
    chisiamo?: { titolo?: string; testo?: string; foto_team?: WPImage | false };
  };
  // --- Medicina del Lavoro ---
  medicina?: {
    hero?: HeroFields;
    benefits?: { titolo?: string; lista?: string }; // "Titolo | Descrizione"
    visite?: { titolo?: string; intro?: string };
  };
  // --- Unità Mobili ---
  unita?: {
    hero?: HeroFields;
    caratteristiche?: { titolo?: string; intro?: string };
    vantaggi?: { titolo?: string; sottotitolo?: string; lista?: string }; // "Titolo | Descrizione"
  };
  // --- Welfare ---
  welfare?: {
    hero?: HeroFields;
    introduzione?: { titolo?: string; testo?: string };
    vantaggi?: { titolo?: string; sottotitolo?: string; lista?: string; citazione?: string };
  };
  // --- Altri Servizi ---
  altri?: {
    hero?: HeroFields;
    servizi_sviluppo?: { badge?: string; titolo?: string; intro?: string; focus_lista?: string };
  };
  // --- Promo Health Center ---
  sedi?: {
    hero?: { titolo?: string; sottotitolo?: string; btn1_label?: string; btn2_label?: string; immagine?: WPImage | false };
    rete_partner?: { titolo?: string; testo?: string; immagine?: WPImage | false };
  };
  // --- Contatti ---
  contatti?: {
    header?: { badge?: string; titolo?: string; sottotitolo?: string };
    prenota?: { titolo?: string; lista?: string; nota?: string };
  };
}

/** Una textarea (una voce per riga) -> array di stringhe pulite. */
export function parseList(text?: string): string[] {
  return splitLines(text);
}

/** Textarea "colonna | colonna | ..." per riga -> array di array di colonne. */
export function parseColumns(text?: string): string[][] {
  return splitLines(text).map((line) => line.split("|").map((c) => c.trim()));
}

/** Textarea "Titolo | Descrizione" per riga -> array di card. */
export function parseCards(text?: string): { title: string; description: string }[] {
  return parseColumns(text).map((cols) => ({
    title: cols[0] ?? "",
    description: cols[1] ?? "",
  }));
}

/* -------------------------------------------------------------------------- */
/*                              Fetch generico                                */
/* -------------------------------------------------------------------------- */

async function wpFetch<T>(
  path: string,
  {
    revalidate = DEFAULT_REVALIDATE,
    base = API_URL,
    draft = false,
  }: { revalidate?: number; base?: string; draft?: boolean } = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${base}${path}`;

  // In Draft Mode (preview) i contenuti devono essere sempre freschi:
  // niente cache ISR, fetch diretto a WordPress ad ogni richiesta.
  const cacheOptions: RequestInit = draft
    ? { cache: "no-store" }
    : { next: { revalidate } };

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    ...cacheOptions,
  });

  if (!res.ok) {
    throw new Error(`WordPress fetch failed (${res.status}) → ${url}`);
  }

  return (res.json()) as Promise<T>;
}

/** Estrae l'immagine in evidenza da un oggetto WP con `_embed`. */
function extractFeaturedImage(post: any): WPImage | null {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return null;
  return {
    url: media.source_url,
    alt: media.alt_text || post?.title?.rendered || "",
    width: media.media_details?.width,
    height: media.media_details?.height,
  };
}

/** Estrae l'immagine dal campo ACF `immagine` (return_format "array"). */
function extractAcfImage(img: any): WPImage | null {
  if (!img?.url) return null;
  return {
    url: img.url,
    alt: img.alt || "",
    width: img.width,
    height: img.height,
  };
}

/**
 * Risolve un valore di un campo ACF image in WPImage, qualunque sia il formato
 * restituito da WordPress:
 *  - oggetto  { url, alt, ... }   (return_format "array")
 *  - stringa  "https://.../x.jpg" (return_format "url")
 *  - numero   170                 (return_format "id" / REST nativo ACF) → fetch /media/<id>
 * Ritorna null se vuoto o non risolvibile.
 */
async function resolveAcfImage(
  value: any,
  draft = false
): Promise<WPImage | null> {
  if (value === null || value === undefined || value === "" || value === false)
    return null;

  // Oggetto ACF già formattato.
  if (typeof value === "object") return extractAcfImage(value);

  // Stringa: URL diretto (assoluto o relativo).
  if (typeof value === "string") {
    return value.startsWith("http") || value.startsWith("/")
      ? { url: value, alt: "" }
      : null;
  }

  // Numero: ID allegato → recupera l'URL dalla Media Library.
  if (typeof value === "number") {
    try {
      const media = await wpFetch<any>(
        `/media/${value}?_fields=source_url,alt_text,media_details`,
        { draft }
      );
      if (!media?.source_url) return null;
      return {
        url: media.source_url,
        alt: media.alt_text || "",
        width: media.media_details?.width,
        height: media.media_details?.height,
      };
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Helper comodo per i componenti: risolve un campo ACF image nel solo URL
 * (o undefined). Accetta ID, oggetto o stringa. Usalo nelle pagine per passare
 * l'immagine ai componenti, es: `backgroundImage={await mediaUrl(hero?.immagine, draft)}`.
 */
export async function mediaUrl(
  value: any,
  draft = false
): Promise<string | undefined> {
  const img = await resolveAcfImage(value, draft);
  return img?.url;
}

/** Converte una textarea multi-riga in array di stringhe (righe vuote scartate). */
function splitLines(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Pulisce le stringhe HTML "rendered" di WordPress (entità + tag base). */
function clean(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<\/?p>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8230;/g, "…")
    .replace(/&hellip;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "") // rimuove tutti i tag HTML residui
    .trim();
}

/* -------------------------------------------------------------------------- */
/*                                   NEWS                                      */
/* -------------------------------------------------------------------------- */

async function mapNews(post: any, draft = false): Promise<NewsItem> {
  const acf = post.acf ?? {};
  // Le categorie arrivano come termini embedded della tassonomia 'categoria_news'.
  const terms: any[] = post?._embedded?.["wp:term"]?.flat?.() ?? [];
  const categories = terms
    .filter((t) => t?.taxonomy === "categoria_news")
    .map((t) => t.slug);
  // I tag dell'articolo arrivano dalla tassonomia nativa 'post_tag' (non da ACF).
  const tags = terms
    .filter((t) => t?.taxonomy === "post_tag")
    .map((t) => t.name as string)
    .filter(Boolean);

  return {
    id: post.id,
    slug: post.slug,
    title: clean(post.title?.rendered),
    excerpt: clean(post.excerpt?.rendered),
    content: post.content?.rendered ?? "",
    // Immagine ACF impostata dal redattore; in mancanza, fallback all'immagine in evidenza nativa.
    image: (await resolveAcfImage(acf.immagine, draft)) ?? extractFeaturedImage(post),
    date: post.date,
    readTime: Number(acf.tempo_lettura) || 5,
    categories: categories.length ? categories : ["normativa"],
    tags,
    seo: extractYoast(post),
    // Autore sempre valorizzato: se i campi ACF sono vuoti, usa i default redazione
    // (i componenti accedono a author.initials senza optional chaining).
    author: {
      name: acf.autore?.nome || "Redazione PromoSan",
      role: acf.autore?.ruolo || "Staff",
      initials: acf.autore?.iniziali || "RP",
    },
    views: Number(acf.visualizzazioni) || 0,
  };
}

/** Lista news (CPT 'news'). `perPage` default 12, ordinate per data discendente. */
export async function getNews(perPage = 12, draft = false): Promise<NewsItem[]> {
  const data = await wpFetch<any[]>(
    `/news?_embed&per_page=${perPage}&orderby=date&order=desc`,
    { draft }
  );
  return Promise.all(data.map((post) => mapNews(post, draft)));
}

/** News in evidenza per la homepage (default 4). */
export async function getLatestNews(count = 4, draft = false): Promise<NewsItem[]> {
  return getNews(count, draft);
}

/** Singola news per slug. */
export async function getNewsBySlug(slug: string, draft = false): Promise<NewsItem | null> {
  const data = await wpFetch<any[]>(`/news?slug=${encodeURIComponent(slug)}&_embed`, {
    draft,
  });
  return data.length ? mapNews(data[0], draft) : null;
}

/** News correlate (stessa categoria, esclusa quella corrente). */
export async function getRelatedNews(
  currentId: number,
  categorySlug?: string,
  count = 4,
  draft = false
): Promise<NewsItem[]> {
  const all = await getNews(count + 5, draft);
  return all
    .filter((n) => n.id !== currentId)
    .filter((n) => (categorySlug ? n.categories.includes(categorySlug) : true))
    .slice(0, count);
}

/* -------------------------------------------------------------------------- */
/*                                   SEDI                                      */
/* -------------------------------------------------------------------------- */

export async function getSedi(draft = false): Promise<Sede[]> {
  const data = await wpFetch<any[]>(`/sedi?_embed&per_page=50`, { draft });
  return Promise.all(
    data.map(async (post) => {
      const acf = post.acf ?? {};
      return {
        id: post.id,
        regione: acf.regione ?? clean(post.title?.rendered),
        indirizzo: acf.indirizzo ?? "",
        telefono: acf.telefono ?? "",
        email: acf.email ?? "",
        mappaUrl: acf.mappa_url ?? "",
        mappaTitolo: acf.mappa_titolo ?? `Mappa sede ${acf.regione ?? ""}`.trim(),
        googleMapsLink: acf.google_maps_link ?? "",
        // 'servizi' è una textarea: una voce per riga (niente repeater Pro).
        servizi: splitLines(acf.servizi),
        image: await resolveAcfImage(acf.immagine, draft),
      };
    })
  );
}

/* -------------------------------------------------------------------------- */
/*                            PACCHETTI WELFARE                                */
/* -------------------------------------------------------------------------- */

export async function getPacchettiWelfare(draft = false): Promise<PacchettoWelfare[]> {
  const data = await wpFetch<any[]>(
    `/pacchetti?per_page=20&orderby=menu_order&order=asc`,
    { draft }
  );
  return Promise.all(
    data.map(async (post) => {
      const acf = post.acf ?? {};
      return {
        id: post.id,
        name: acf.nome ?? clean(post.title?.rendered),
        subtitle: acf.sottotitolo ?? "",
        isPopular: Boolean(acf.popolare),
        // Due textarea separate (incluse / escluse) al posto del repeater Pro.
        features: [
          ...splitLines(acf.caratteristiche_incluse).map((text) => ({ text, included: true })),
          ...splitLines(acf.caratteristiche_escluse).map((text) => ({ text, included: false })),
        ],
        image: await resolveAcfImage(acf.immagine, draft),
      };
    })
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FAQ                                       */
/* -------------------------------------------------------------------------- */

export async function getFaq(draft = false): Promise<FaqItem[]> {
  const data = await wpFetch<any[]>(`/faq?per_page=50`, { draft });
  return data.map((post) => {
    const acf = post.acf ?? {};
    return {
      // Domanda = titolo nativo, Risposta = editor nativo. Solo 'categoria' è un campo ACF semplice (select).
      question: clean(post.title?.rendered),
      answer: post.content?.rendered ?? "",
      categoria: (acf.categoria as FaqItem["categoria"]) ?? "servizi",
    };
  });
}

/* -------------------------------------------------------------------------- */
/*                           OPZIONI GLOBALI (ACF)                            */
/* -------------------------------------------------------------------------- */

export async function getGlobalOptions(draft = false): Promise<GlobalOptions> {
  // Pagina WordPress normale (slug 'opzioni-globali') con campi ACF semplici.
  // Niente Options Page (Pro): i social sono campi flat social_linkedin/social_facebook/social_instagram.
  const data = await wpFetch<any[]>(
    `/pages?slug=${OPTIONS_PAGE_SLUG}`,
    { revalidate: 0, draft }
  );
  const acf = data[0]?.acf ?? {};
  // I loghi possono arrivare come ID allegato (REST ACF nativo): risolviamo l'URL.
  const [logo, logoBianco] = await Promise.all([
    resolveAcfImage(acf.logo, draft),
    resolveAcfImage(acf.logo_bianco, draft),
  ]);
  return {
    telefono: acf.telefono ?? "",
    email: acf.email ?? "",
    whatsapp: acf.whatsapp ?? "",
    piva: acf.piva ?? "",
    rea: acf.rea ?? "",
    orari: acf.orari ?? "",
    areaRiservataUrl: acf.area_riservata_url ?? "",
    brochureUrl: acf.brochure_url ?? "",
    copyright: acf.copyright ?? "",
    logoUrl: logo?.url ?? IMAGE_FALLBACKS.logo,
    logoBianco: logoBianco?.url ?? IMAGE_FALLBACKS.logoBianco,
    social: {
      linkedin: acf.social_linkedin ?? "#",
      facebook: acf.social_facebook ?? "#",
      instagram: acf.social_instagram ?? "#",
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                          PAGINE / CONTENUTI ACF                            */
/* -------------------------------------------------------------------------- */

/**
 * Recupera i campi ACF di una pagina per slug (es. 'home', 'medicina-del-lavoro').
 * Utile per Hero, intro testuali, blocchi CTA gestiti da ACF su pagine native.
 */
export async function getPageFields<T = Record<string, any>>(
  slug: string,
  draft = false
): Promise<T | null> {
  // _fields limita la risposta REST ai soli campi che servono (payload più leggero).
  const data = await wpFetch<any[]>(
    `/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,acf`,
    { draft }
  );
  return data.length ? ((data[0].acf ?? {}) as T) : null;
}
