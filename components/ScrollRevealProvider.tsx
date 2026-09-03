"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type ScrollRevealType from "scrollreveal";

// Applica animazioni scroll-reveal a elementi comuni in tutto il sito.
// Selettore generico basato sul tag <section>, non sulla classe: le pagine del
// sito non condividono una convenzione di classi coerente (alcune usano
// className="section", altre solo style inline con id), quindi puntare a
// "main > section" e' l'unico modo per coprire homepage + tutte le pagine interne.
// Import dinamico: la libreria referenzia `window`/`document` a livello di modulo,
// incompatibile con l'SSR di Next.
// Re-inizializzato ad ogni cambio pathname: il layout non si rimonta durante la
// navigazione client-side, quindi senza questo il reveal scansionerebbe solo il
// DOM della prima pagina caricata.
export default function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    let sr: ReturnType<typeof ScrollRevealType> | undefined;
    let cancelled = false;

    import("scrollreveal").then(({ default: ScrollReveal }) => {
      if (cancelled) return;

      sr = ScrollReveal({
        distance: "40px",
        duration: 700,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        opacity: 0,
        reset: false,
        mobile: true,
      });

      // Ogni sezione di contenuto (esclusi gli hero, gia' visibili al primo paint
      // e animati separatamente sotto).
      sr.reveal('main > section:not([class*="hero"])', {
        origin: "bottom",
        interval: 120,
      });

      // Hero: titolo/CTA/trust-bar animano in sequenza invece della sezione intera.
      sr.reveal(
        '.hero-title-homepage, .hero-cta, .hero-subtitle, .trust-bar, [class*="hero"] h1, [class*="hero"] .btn',
        { origin: "bottom", interval: 150, distance: "24px" }
      );

      // Card ricorrenti con markup noto in tutto il sito.
      // .stat-card (Numeri) e altre con animazione propria via IntersectionObserver: esclusi qui.
      sr.reveal(".service-card, .news-card, .faq-item", {
        origin: "bottom",
        interval: 80,
        distance: "30px",
      });
    });

    return () => {
      cancelled = true;
      sr?.destroy();
    };
  }, [pathname]);

  return null;
}
