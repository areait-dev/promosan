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
  author?: { name: string; role: string; initials: string };
  views?: number;
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
}

export interface PacchettoWelfare {
  id: number;
  name: string;
  subtitle: string;
  isPopular: boolean;
  features: { text: string; included: boolean }[];
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
  social: { linkedin: string; facebook: string; instagram: string };
}

/**
 * Campi ACF del gruppo "Contenuti Pagina (Hero, Intro, CTA)"
 * (acf-json/group_pagina_hero_cta.json). I sotto-campi sono raggruppati:
 * in REST arrivano come oggetti annidati (es. acf.hero.titolo).
 */
export interface PageContentFields {
  hero?: {
    badge?: string;
    titolo?: string;
    sottotitolo?: string;
    immagine?: WPImage | false;
    btn1_label?: string;
    btn1_link?: string;
    btn2_label?: string;
    btn2_link?: string;
  };
  intro?: { titolo?: string; testo?: string };
  cta?: { titolo?: string; testo?: string; label?: string; link?: string };
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
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/* -------------------------------------------------------------------------- */
/*                                   NEWS                                      */
/* -------------------------------------------------------------------------- */

function mapNews(post: any): NewsItem {
  const acf = post.acf ?? {};
  // Le categorie arrivano come termini embedded della tassonomia 'categoria_news'.
  const terms: any[] = post?._embedded?.["wp:term"]?.flat?.() ?? [];
  const categories = terms
    .filter((t) => t?.taxonomy === "categoria_news")
    .map((t) => t.slug);

  return {
    id: post.id,
    slug: post.slug,
    title: clean(post.title?.rendered),
    excerpt: clean(post.excerpt?.rendered),
    content: post.content?.rendered ?? "",
    image: extractFeaturedImage(post),
    date: post.date,
    readTime: Number(acf.tempo_lettura) || 5,
    categories: categories.length ? categories : ["normativa"],
    author: acf.autore
      ? {
          name: acf.autore.nome ?? "",
          role: acf.autore.ruolo ?? "",
          initials: acf.autore.iniziali ?? "",
        }
      : undefined,
    views: Number(acf.visualizzazioni) || 0,
  };
}

/** Lista news (CPT 'news'). `perPage` default 12, ordinate per data discendente. */
export async function getNews(perPage = 12, draft = false): Promise<NewsItem[]> {
  const data = await wpFetch<any[]>(
    `/news?_embed&per_page=${perPage}&orderby=date&order=desc`,
    { draft }
  );
  return data.map(mapNews);
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
  return data.length ? mapNews(data[0]) : null;
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
  return data.map((post) => {
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
    };
  });
}

/* -------------------------------------------------------------------------- */
/*                            PACCHETTI WELFARE                                */
/* -------------------------------------------------------------------------- */

export async function getPacchettiWelfare(draft = false): Promise<PacchettoWelfare[]> {
  const data = await wpFetch<any[]>(
    `/pacchetti?per_page=20&orderby=menu_order&order=asc`,
    { draft }
  );
  return data.map((post) => {
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
    };
  });
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
    { revalidate: 300, draft }
  );
  const acf = data[0]?.acf ?? {};
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
