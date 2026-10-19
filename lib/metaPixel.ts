// Helper condivisi per il Meta Pixel. Il consenso è quello del CookieBanner
// (localStorage, categoria "marketing"): nessun sistema parallelo.
export const CONSENT_STORAGE_KEY = 'promosan-cookie-consent';
export const CONSENT_CHANGE_EVENT = 'promosan-consent-change';

type MetaEvent = 'Lead' | 'Subscribe' | 'Contact';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __fbqPending?: MetaEvent[];
  }
}

export function hasMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? !!(JSON.parse(raw) as { marketing?: boolean }).marketing : false;
  } catch {
    return false;
  }
}

// Invia un evento di conversione solo con consenso marketing attivo. Se il pixel
// sta ancora caricando (es. /grazie appena aperta) l'evento è accodato e
// inviato da MetaPixel appena fbq è pronto.
export function trackMetaEvent(event: MetaEvent) {
  if (typeof window === 'undefined' || !hasMarketingConsent()) return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', event);
  } else {
    (window.__fbqPending ??= []).push(event);
  }
}
