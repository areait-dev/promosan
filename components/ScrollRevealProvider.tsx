"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type ScrollRevealType from "scrollreveal";

type ScrollRevealInstance = ReturnType<typeof ScrollRevealType>;

// Applica animazioni scroll-reveal a elementi comuni in tutto il sito.
// Selettore generico basato sul tag <section>, non sulla classe: le pagine del
// sito non condividono una convenzione di classi coerente (alcune usano
// className="section", altre solo style inline con id), quindi puntare a
// "main > section" e' l'unico modo per coprire homepage + tutte le pagine interne.
// Import dinamico: la libreria referenzia `window`/`document` a livello di modulo,
// incompatibile con l'SSR di Next.
function revealCurrentPage(sr: ScrollRevealInstance) {
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
}

export default function ScrollRevealProvider() {
  const pathname = usePathname();
  const srRef = useRef<ScrollRevealInstance | null>(null);

  // Istanza creata una sola volta (il provider vive nel root layout e non si
  // rimonta mai durante la navigazione): evita di distruggere e ricreare da
  // zero ScrollReveal (e il suo IntersectionObserver interno) ad ogni pagina.
  useEffect(() => {
    let cancelled = false;

    import("scrollreveal").then(({ default: ScrollReveal }) => {
      if (cancelled) return;

      srRef.current = ScrollReveal({
        distance: "40px",
        duration: 700,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        opacity: 0,
        reset: false,
        mobile: true,
      });

      revealCurrentPage(srRef.current);
    });

    return () => {
      cancelled = true;
      srRef.current?.destroy();
      srRef.current = null;
    };
  }, []);

  // Ad ogni cambio pagina richiama solo .reveal() sugli elementi effettivamente
  // presenti ora nel DOM (quelli della pagina precedente non ci sono più: React
  // li ha già rimossi durante la navigazione client-side), senza ricreare
  // l'istanza né toccare gli elementi già animati.
  useEffect(() => {
    if (srRef.current) revealCurrentPage(srRef.current);
  }, [pathname]);

  return null;
}
