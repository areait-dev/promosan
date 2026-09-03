// src/app/welfare-aziendale/page.tsx
import { Metadata } from 'next';
import Footer from '../../components/Footer/Footer';
import HeroWelfare from '../../components/welfare-aziendale/HeroWelfare';
import IntroduzioneWelfare from '../../components/welfare-aziendale/IntroduzioneWelfare';
import VantaggiWelfare from '../../components/welfare-aziendale/VantaggiWelfare';
import PacchettiWelfare from '../../components/welfare-aziendale/PacchettiWelfare';
import CtaWelfare from '../../components/welfare-aziendale/CtaWelfare';
import { draftMode } from 'next/headers';
import {
  getGlobalOptions,
  getPacchettiWelfare,
  getPageFields,
  mediaUrl,
  parseCards,
  type GlobalOptions,
  type PacchettoWelfare,
  type PageContentFields,
} from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Welfare Aziendale | PromoSan - Benessere e vantaggi competitivi',
  description: 'Scopri le soluzioni di welfare aziendale di PromoSan: pacchetti personalizzati per il benessere dei dipendenti e vantaggi fiscali per la tua azienda.',
  keywords: 'welfare aziendale, benessere dipendenti, vantaggi fiscali, pacchetti welfare, PromoSan, medicina del lavoro',
  openGraph: {
    title: 'Welfare Aziendale | PromoSan',
    description: 'Trasforma la tutela della salute in un vantaggio competitivo per la tua azienda',
    type: 'website',
    locale: 'it_IT',
    siteName: 'PromoSan'
  }
};

export default async function WelfareAziendalePage() {
  const { isEnabled: draft } = await draftMode();

  let options: GlobalOptions | undefined;
  let pacchetti: PacchettoWelfare[] | undefined;
  let pageContent: PageContentFields | null = null;
  try {
    [options, pacchetti, pageContent] = await Promise.all([
      getGlobalOptions(draft),
      getPacchettiWelfare(draft),
      getPageFields<PageContentFields>('welfare-aziendale', draft),
    ]);
  } catch (error) {
    console.error('[Welfare] Fetch WordPress fallito, uso i default:', error);
  }

  const welfare = pageContent?.welfare;
  const vantaggi = parseCards(welfare?.vantaggi?.lista);
  const heroBg = await mediaUrl(welfare?.hero?.immagine, draft);

  return (
    <main style={{
      overflowX: 'hidden',
      width: '100%'
    }}>
      {/* Hero Section */}
      <HeroWelfare
        badge={welfare?.hero?.badge || undefined}
        title={welfare?.hero?.titolo || undefined}
        btn1Label={welfare?.hero?.btn1_label || undefined}
        btn1Link={welfare?.hero?.btn1_link || undefined}
        btn2Label={welfare?.hero?.btn2_label || undefined}
        btn2Link={welfare?.hero?.btn2_link || undefined}
        backgroundImage={heroBg}
      />

      {/* Introduzione Section */}
      <IntroduzioneWelfare
        title={welfare?.introduzione?.titolo || undefined}
        text={welfare?.introduzione?.testo || undefined}
      />

      {/* Pacchetti Section */}
      <PacchettiWelfare items={pacchetti} />

      {/* Vantaggi Section */}
      <VantaggiWelfare
        title={welfare?.vantaggi?.titolo || undefined}
        subtitle={welfare?.vantaggi?.sottotitolo || undefined}
        vantaggi={vantaggi.length ? vantaggi : undefined}
        citazione={welfare?.vantaggi?.citazione || undefined}
      />

      {/* Call to Action Section */}
      <CtaWelfare />
      <Footer options={options} />

      {/* Stili globali per le animazioni */}
    </main>
  );
}