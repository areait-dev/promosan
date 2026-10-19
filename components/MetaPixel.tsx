'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  hasMarketingConsent,
  trackMetaEvent,
} from '@/lib/metaPixel';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

if (!PIXEL_ID && process.env.NODE_ENV !== 'production') {
  console.warn('[MetaPixel] NEXT_PUBLIC_META_PIXEL_ID mancante: il pixel non verrà caricato.');
}

// Meta Pixel: caricato solo con consenso "marketing" del CookieBanner. Reagisce
// subito a accetta/revoca (evento custom + storage per le altre schede).
// Niente <noscript>: non potrebbe rispettare il consenso.
export default function MetaPixel() {
  const pathname = usePathname();
  const [granted, setGranted] = useState(false);
  const [ready, setReady] = useState(false);
  const lastTracked = useRef<string | null>(null);
  const revoked = useRef(false);

  useEffect(() => {
    const sync = () => setGranted(hasMarketingConsent());
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) sync();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Revoca: ferma il tracciamento; alla riconcessione il PageView riparte.
  useEffect(() => {
    if (granted) return;
    if (typeof window.fbq === 'function') {
      window.fbq('consent', 'revoke');
      revoked.current = true;
    }
    lastTracked.current = null;
  }, [granted]);

  // next/script NON chiama onReady per gli script inline alla prima montata
  // (nessun evento "load"): attendo che lo snippet abbia definito window.fbq.
  useEffect(() => {
    if (!granted || !PIXEL_ID) return;
    let tries = 0;
    const timer = setInterval(() => {
      if (typeof window.fbq === 'function') {
        setReady(true);
        clearInterval(timer);
      } else if (++tries > 100) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [granted]);

  // PageView al primo caricamento dopo il consenso e a ogni cambio rotta.
  useEffect(() => {
    if (!granted || !ready || typeof window.fbq !== 'function') return;
    if (revoked.current) {
      window.fbq('consent', 'grant');
      revoked.current = false;
    }
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    window.fbq('track', 'PageView');
    const pending = window.__fbqPending ?? [];
    window.__fbqPending = [];
    pending.forEach(trackMetaEvent);
  }, [granted, ready, pathname]);

  // Contact: click su link tel: e mailto:
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
      if (a) trackMetaEvent('Contact');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!PIXEL_ID || !granted) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
    >
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${JSON.stringify(PIXEL_ID)});
      `}
    </Script>
  );
}
