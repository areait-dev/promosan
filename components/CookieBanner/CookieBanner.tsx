'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { T } from "@/components/Testi";

const STORAGE_KEY = 'promosan-cookie-consent';

interface Preferences {
  analytics: boolean;
  marketing: boolean;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    openCookiePreferences?: () => void;
  }
}

function applyConsent(prefs: Preferences) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    });
  }
}

function save(prefs: Preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* storage non disponibile */
  }
  applyConsent(prefs);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored) {
      try {
        const p = JSON.parse(stored) as Preferences;
        setAnalytics(!!p.analytics);
        setMarketing(!!p.marketing);
      } catch {
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
    window.openCookiePreferences = () => {
      setShowPanel(true);
      setVisible(true);
    };
    return () => {
      delete window.openCookiePreferences;
    };
  }, []);

  const acceptAll = () => {
    save({ analytics: true, marketing: true });
    setVisible(false);
    setShowPanel(false);
  };

  const rejectAll = () => {
    save({ analytics: false, marketing: false });
    setVisible(false);
    setShowPanel(false);
  };

  const saveSelection = () => {
    save({ analytics, marketing });
    setVisible(false);
    setShowPanel(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Informativa sui cookie"
      className="cookie-banner"
    >
      <div className="cookie-banner-head">
        <div className="cookie-banner-icon">
          <Cookie className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="cookie-banner-body">
          <p className="cookie-banner-title"><T k="cookie-banner.la-tua-privacy-conta-per-noi">La tua privacy conta per noi</T></p>
          <p className="cookie-banner-text">
            <T k="cookie-banner.utilizziamo-cookie-tecnici-necessari-e-previo">Utilizziamo cookie tecnici necessari e, previo consenso, cookie analytics e marketing per
            migliorare il sito e offrire contenuti personalizzati. Puoi accettare, rifiutare o
            personalizzare le preferenze. Per maggiori informazioni consulta la</T>{' '}
            <Link href="/cookie-policy"><T k="cookie-banner.cookie-policy">Cookie Policy</T></Link> <T k="cookie-banner.e-la">e la</T>{' '}
            <Link href="/privacy-policy"><T k="cookie-banner.privacy-policy">Privacy Policy</T></Link>.
          </p>
        </div>
      </div>

      {showPanel && (
        <div className="cookie-banner-panel">
          <div className="cookie-option">
            <span className="cookie-option-text">
              <strong><T k="cookie-banner.cookie-tecnici">Cookie tecnici</T></strong>
              <T k="cookie-banner.sempre-attivi-necessari-al-funzionamento-e">Sempre attivi. Necessari al funzionamento e alla sicurezza del sito.</T>
            </span>
            <span className="cookie-toggle">
              <input type="checkbox" checked disabled aria-label="Cookie tecnici, sempre attivi" />
              <span className="cookie-toggle-track" aria-hidden="true"></span>
            </span>
          </div>
          <div className="cookie-option">
            <span className="cookie-option-text">
              <strong><T k="cookie-banner.cookie-analytics">Cookie analytics</T></strong>
              <T k="cookie-banner.statistiche-aggregate-sull-apos-utilizzo-del">Statistiche aggregate sull&apos;utilizzo del sito (es. Google Analytics).</T>
            </span>
            <label className="cookie-toggle">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                aria-label="Attiva cookie analytics"
              />
              <span className="cookie-toggle-track" aria-hidden="true"></span>
            </label>
          </div>
          <div className="cookie-option">
            <span className="cookie-option-text">
              <strong><T k="cookie-banner.cookie-marketing">Cookie marketing</T></strong>
              <T k="cookie-banner.contenuti-e-messaggi-personalizzati-retargeting-e">Contenuti e messaggi personalizzati, retargeting e misurazione campagne.</T>
            </span>
            <label className="cookie-toggle">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                aria-label="Attiva cookie marketing"
              />
              <span className="cookie-toggle-track" aria-hidden="true"></span>
            </label>
          </div>
        </div>
      )}

      <div className="cookie-banner-actions">
        {!showPanel && (
          <button type="button" onClick={() => setShowPanel(true)} className="cookie-btn cookie-btn-secondary">
            <T k="cookie-banner.personalizza">Personalizza</T>
          </button>
        )}
        <button type="button" onClick={rejectAll} className="cookie-btn cookie-btn-secondary">
          <T k="cookie-banner.rifiuta">Rifiuta</T>
        </button>
        {showPanel && (
          <button type="button" onClick={saveSelection} className="cookie-btn cookie-btn-secondary">
            <T k="cookie-banner.salva-preferenze">Salva preferenze</T>
          </button>
        )}
        <button type="button" onClick={acceptAll} className="cookie-btn cookie-btn-primary">
          <T k="cookie-banner.accetta-tutti">Accetta tutti</T>
        </button>
      </div>
    </div>
  );
}
