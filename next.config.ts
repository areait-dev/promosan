import type { NextConfig } from "next";

/**
 * Configurazione Next.js per il fetching dei contenuti da WordPress (wp.promosan.eu).
 *
 * - `images.remotePatterns` autorizza il dominio WordPress (e il vecchio Unsplash usato
 *   temporaneamente nelle news) come sorgenti per <Image>.
 * - `env` espone gli endpoint base lato build/runtime.
 * - `rewrites` (opzionale) consente di proxyare le chiamate REST evitando problemi CORS
 *   in fase di sviluppo: il frontend chiama /wp-api/* e Next inoltra a wp.promosan.eu.
 */
const WP_HOST = "wp.promosan.eu";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: WP_HOST,
        pathname: "/wp-content/uploads/**",
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
