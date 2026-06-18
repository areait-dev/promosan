// lib/searchIndex.ts
// Indice statico delle pagine del sito, usato dalla ricerca globale (/ricerca)
// in aggiunta alle news caricate da WordPress.

export interface SitePage {
  title: string;
  description: string;
  url: string;
  /** Parole chiave aggiuntive su cui fare match (servizi, sinonimi, ecc.). */
  keywords: string[];
}

export const SITE_PAGES: SitePage[] = [
  {
    title: 'Home',
    description: 'PromoSan: medicina del lavoro, sorveglianza sanitaria, unità mobili e welfare aziendale per la salute e la sicurezza dei lavoratori.',
    url: '/',
    keywords: ['promosan', 'home', 'salute', 'sicurezza sul lavoro', 'azienda'],
  },
  {
    title: 'Medicina del Lavoro',
    description: 'Sorveglianza sanitaria, nomina del medico competente, visite mediche, sopralluoghi e riunioni periodiche per la sicurezza sul lavoro.',
    url: '/medicina-del-lavoro',
    keywords: [
      'medicina del lavoro',
      'medico competente',
      'sorveglianza sanitaria',
      'visite mediche',
      'nomina medico',
      'sopralluogo',
      'riunione periodica',
      'idoneità',
    ],
  },
  {
    title: 'Unità Mobili',
    description: 'Cliniche mobili attrezzate per portare visite ed esami direttamente in azienda, ovunque ne abbiate bisogno.',
    url: '/unita-mobili',
    keywords: ['unità mobili', 'clinica mobile', 'ambulatorio mobile', 'esami in azienda', 'screening'],
  },
  {
    title: 'Welfare Aziendale',
    description: 'Soluzioni di welfare aziendale: pacchetti personalizzati per il benessere dei dipendenti e vantaggi fiscali per la tua azienda.',
    url: '/welfare-aziendale',
    keywords: ['welfare aziendale', 'benessere dipendenti', 'vantaggi fiscali', 'pacchetti welfare', 'benefit'],
  },
  {
    title: 'Promo Health Center - Le Nostre Sedi',
    description: 'Le sedi Promo Health Center in Sicilia e Veneto: medicina del lavoro, sorveglianza sanitaria e servizi per la salute dei lavoratori.',
    url: '/promo-health-center',
    keywords: ['sedi', 'promo health center', 'sicilia', 'veneto', 'ambulatorio', 'poliambulatorio'],
  },
  {
    title: 'Altri Servizi',
    description: 'Servizi in sviluppo: Assistenza Domiciliare Integrata (ADI), screening oncologici, educazione sanitaria e monitoraggio della cronicità.',
    url: '/altri-servizi',
    keywords: [
      'altri servizi',
      'adi',
      'assistenza domiciliare integrata',
      'prevenzione',
      'screening oncologici',
      'educazione sanitaria',
      'cronicità',
    ],
  },
  {
    title: 'News & Aggiornamenti',
    description: 'Le ultime normative e innovazioni nel settore della medicina del lavoro e della sicurezza.',
    url: '/news',
    keywords: ['news', 'aggiornamenti', 'normativa', 'blog', 'articoli'],
  },
  {
    title: 'Contatti',
    description: 'Contatta PromoSan per informazioni e per richiedere un preventivo personalizzato per la tua azienda.',
    url: '/contatti',
    keywords: ['contatti', 'preventivo', 'telefono', 'email', 'indirizzo', 'consulenza'],
  },
];

/** Filtra le pagine statiche in base alla query (titolo, descrizione, keyword). */
export function searchSitePages(query: string): SitePage[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SITE_PAGES.filter(
    (page) =>
      page.title.toLowerCase().includes(q) ||
      page.description.toLowerCase().includes(q) ||
      page.keywords.some((k) => k.toLowerCase().includes(q))
  );
}
