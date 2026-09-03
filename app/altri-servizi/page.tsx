// src/app/altri-servizi/page.tsx
import { Metadata } from 'next';
import HeroAltriServizi from '../../components/altri-servizi/HeroAltriServizi';
import ServiziInSviluppo from '../../components/altri-servizi/ServiziInSviluppo';
import BannerInfo from '../../components/altri-servizi/BannerInfo';
import Footer from '../../components/Footer/Footer';
import { draftMode } from 'next/headers';
import {
  getGlobalOptions,
  getPageFields,
  mediaUrl,
  parseList,
  type GlobalOptions,
  type PageContentFields,
} from '@/lib/wordpress';

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
  let pageContent: PageContentFields | null = null;
  try {
    [options, pageContent] = await Promise.all([
      getGlobalOptions(draft),
      getPageFields<PageContentFields>('altri-servizi', draft),
    ]);
  } catch (error) {
    console.error('[AltriServizi] Fetch WordPress fallito, uso i default:', error);
  }

  const altri = pageContent?.altri;
  const focusItems = parseList(altri?.servizi_sviluppo?.focus_lista);
  const heroBg = await mediaUrl(altri?.hero?.immagine, draft);

  return (
    <main style={{
      overflowX: 'hidden',
      width: '100%',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <HeroAltriServizi
        badge={altri?.hero?.badge || undefined}
        title={altri?.hero?.titolo || undefined}
        subtitle={altri?.hero?.sottotitolo || undefined}
        btn1Label={altri?.hero?.btn1_label || undefined}
        btn2Label={altri?.hero?.btn2_label || undefined}
        backgroundImage={heroBg}
      />

      {/* Servizi in Sviluppo Section */}
        <ServiziInSviluppo
          badge={altri?.servizi_sviluppo?.badge || undefined}
          title={altri?.servizi_sviluppo?.titolo || undefined}
          intro={altri?.servizi_sviluppo?.intro || undefined}
          focusItems={focusItems.length ? focusItems : undefined}
        />
      <BannerInfo />
      <Footer options={options} />
    </main>
  );
}