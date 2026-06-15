// src/app/welfare-aziendale/page.tsx
import { Metadata } from 'next';
import Navbar from '../../components/Navbar/Navbar';
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
  type GlobalOptions,
  type PacchettoWelfare,
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
  try {
    [options, pacchetti] = await Promise.all([
      getGlobalOptions(draft),
      getPacchettiWelfare(draft),
    ]);
  } catch (error) {
    console.error('[Welfare] Fetch WordPress fallito, uso i default:', error);
  }

  return (
    <main style={{
      overflowX: 'hidden',
      width: '100%'
    }}>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      {/* Hero Section */}
      <HeroWelfare />

      {/* Introduzione Section */}
      <IntroduzioneWelfare />

      {/* Pacchetti Section */}
      <PacchettiWelfare items={pacchetti} />

      {/* Vantaggi Section */}
      <VantaggiWelfare />

      {/* Call to Action Section */}
      <CtaWelfare />
      <Footer options={options} />

      {/* Stili globali per le animazioni */}
    </main>
  );
}