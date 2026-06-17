// lib/seo.ts
//
// Utility per collegare i dati SEO di Yoast (chiave `yoast_head_json` delle REST
// API di WordPress, esposta dal plugin "Yoast SEO REST API") ai Metadata di Next.
//
// Flusso: in lib/wordpress.ts si normalizza `yoast_head_json` con extractYoast()
// e si salva sull'entità (es. NewsItem.seo). Nella pagina, generateMetadata()
// passa quel campo a yoastToMetadata() insieme ai fallback locali.

import type { Metadata } from 'next';

/** Dati SEO normalizzati estratti da `yoast_head_json`. */
export interface SeoFields {
  title: string;
  description: string;
  ogImage: string;
  canonical: string;
  ogType: string;
}

/**
 * Normalizza la chiave `yoast_head_json` di un oggetto REST WordPress.
 * Ritorna undefined se Yoast non è presente (plugin disattivo o campo assente).
 */
export function extractYoast(raw: any): SeoFields | undefined {
  const yoast = raw?.yoast_head_json;
  if (!yoast) return undefined;

  return {
    title: yoast.title ?? raw?.title?.rendered ?? '',
    description: yoast.description ?? '',
    ogImage: yoast.og_image?.[0]?.url ?? '',
    canonical: yoast.canonical ?? '',
    ogType: yoast.og_type ?? 'article',
  };
}

/**
 * Trasforma i campi SEO normalizzati in un oggetto Metadata di Next.
 * Riutilizzabile per qualunque contenuto WordPress (news, sedi, pacchetti, ...):
 * basta passare i `fallback` locali, usati quando Yoast non fornisce il valore.
 */
export function yoastToMetadata(
  seo: SeoFields | undefined,
  fallback: { title: string; description: string; image?: string }
): Metadata {
  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  const image = seo?.ogImage || fallback.image;
  const images = image ? [{ url: image }] : [];

  return {
    title,
    description,
    alternates: { canonical: seo?.canonical || undefined },
    openGraph: {
      title,
      description,
      type: (seo?.ogType as 'article' | 'website') ?? 'article',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}
