// src/app/altri-servizi/page.tsx
import { Metadata } from 'next';
import HeroAltriServizi from '../../components/altri-servizi/HeroAltriServizi';
import ServiziInSviluppo from '../../components/altri-servizi/ServiziInSviluppo';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { draftMode } from 'next/headers';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Altri Servizi | PromoSan - Innovazione e Sviluppo',
  description: 'Scopri i servizi in fase di sviluppo di PromoSan: Assistenza Domiciliare Integrata (ADI) e programmi avanzati di prevenzione per la salute.',
  keywords: 'ADI, assistenza domiciliare integrata, prevenzione salute, screening oncologici, educazione sanitaria, monitoraggio cronicità, PromoSan, servizi sanitari innovativi',
  openGraph: {
    title: 'Altri Servizi | PromoSan',
    description: 'L\'evoluzione continua dei servizi sanitari per rispondere alle esigenze emergenti',
    type: 'website',
    locale: 'it_IT',
    siteName: 'PromoSan'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default async function AltriServiziPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  try {
    options = await getGlobalOptions(draft);
  } catch (error) {
    console.error('[AltriServizi] Fetch WordPress fallito, uso i default:', error);
  }

  return (
    <main style={{
      overflowX: 'hidden',
      width: '100%',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <HeroAltriServizi />

      {/* Servizi in Sviluppo Section */}
        <ServiziInSviluppo />
      <Footer options={options} />
    </main>
  );
}