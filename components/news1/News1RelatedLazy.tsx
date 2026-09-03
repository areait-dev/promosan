'use client';

import dynamic from 'next/dynamic';

// Swiper (carousel) è pesante e non serve al render iniziale della pagina
// news: caricato solo lato client, in un chunk separato, quando serve.
// ssr:false è permesso solo dentro un Client Component (per questo il
// wrapper): il Server Component app/news/[slug]/page.tsx importa questo
// file con una import normale, non dynamic.
const News1Related = dynamic(() => import('./News1Related'), {
  ssr: false,
  loading: () => null,
});

export default News1Related;
