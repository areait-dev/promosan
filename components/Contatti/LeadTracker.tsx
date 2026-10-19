'use client';

import { useEffect, useRef } from 'react';
import { LEAD_COOKIE } from '@/lib/leadCookie';
import { trackMetaEvent } from '@/lib/metaPixel';
import { GOOGLE_ADS_CONVERSION_SEND_TO } from '@/lib/site';

// Su /grazie: se il cookie di invio riuscito è presente lo consuma e invia
// generate_lead (una sola volta); altrimenti rimanda l'utente al form.
export default function LeadTracker() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const hasCookie = document.cookie.split('; ').some((c) => c === `${LEAD_COOKIE}=1`);
    if (!hasCookie) {
      window.location.replace('/contatti');
      return;
    }
    document.cookie = `${LEAD_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;

    trackMetaEvent('Lead');

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { form: 'preventivo_b2b' });
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
        value: 1.0,
        currency: 'EUR',
      });
    }
  }, []);

  return null;
}
