import type { NextConfig } from "next";

/**
 * Configurazione Next.js per il fetching dei contenuti da WordPress (wp.promosan.eu).
 *
 * - `images.remotePatterns` autorizza il dominio WordPress (host esatto + sottodomini)
 *   come sorgenti per <Image>. Le immagini ACF caricate in Media stanno sotto
 *   /wp-content/uploads/, ma autorizziamo l'intero host per evitare 400 su altri path.
 * - `env` espone gli endpoint base lato build/runtime.
 * - `rewrites` (opzionale) consente di proxyare le chiamate REST evitando problemi CORS
 *   in fase di sviluppo: il frontend chiama /wp-api/* e Next inoltra a wp.promosan.eu.
 *
 * NB: Next/Image NON espone un'opzione di "timeout" per il fetch dell'immagine remota.
 *     Per ridurre i re-fetch (e quindi i fallimenti intermittenti) alziamo la cache
 *     dell'optimizer con `minimumCacheTTL`. Se le immagini non si caricano in LOCALE,
 *     la causa tipica è un antivirus che intercetta TLS (MITM) o una catena SSL
 *     incompleta sul server: l'optimizer di Next fa un fetch server-side e fallisce.
 */
const WP_HOST = "wp.promosan.eu";

const nextConfig: NextConfig = {
  images: {
    // In DEVELOPMENT disattiviamo l'optimizer: Next non fa il fetch server-side
    // verso WordPress (che in locale fallisce per il MITM TLS di AVG) e serve
    // l'immagine diretta. In PRODUCTION (Vercel) resta false → ottimizzazione attiva.
    unoptimized: process.env.NODE_ENV === "development",
    // Loader di default di Next (optimizer integrato). Esplicitato come richiesto.
    loader: "default",

    // Cache minima dell'immagine ottimizzata: 24h. Riduce i fetch ripetuti
    // verso WordPress (più resilienza in caso di rete lenta/instabile).
    minimumCacheTTL: 60 * 60 * 24,

    // Formati moderni serviti dall'optimizer.
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        // Host esatto, tutti i path (uploads e non).
        protocol: "https",
        hostname: WP_HOST,
        pathname: "/**",
      },
      {
        // Sottodomini di wp.promosan.eu (es. cdn.wp.promosan.eu, www.wp.promosan.eu).
        // In Next il carattere "*" copre un singolo segmento del wildcard.
        protocol: "https",
        hostname: "*.wp.promosan.eu",
        pathname: "/**",
      },
      {
        // Fallback per le immagini Unsplash ancora presenti in alcune news demo.
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  env: {
    // URL base del sito WordPress (senza slash finale).
    NEXT_PUBLIC_WORDPRESS_URL: `https://${WP_HOST}`,
    // Endpoint REST nativo (post, pagine, media, tassonomie).
    // Le Opzioni globali sono una pagina normale: /wp/v2/pages?slug=opzioni-globali (ACF free).
    NEXT_PUBLIC_WP_API_URL: `https://${WP_HOST}/wp-json/wp/v2`,
  },

  async rewrites() {
    return [
      {
        source: "/wp-api/:path*",
        destination: `https://${WP_HOST}/wp-json/:path*`,
      },
    ];
  },
};

export default nextConfig;
