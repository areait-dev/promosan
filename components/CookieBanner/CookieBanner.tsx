'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
          <i className="fas fa-cookie-bite" aria-hidden="true"></i>
        </div>
        <div className="cookie-banner-body">
          <p className="cookie-banner-title">La tua privacy conta per noi</p>
          <p className="cookie-banner-text">
            Utilizziamo cookie tecnici necessari e, previo consenso, cookie analytics e marketing per
            migliorare il sito e offrire contenuti personalizzati. Puoi accettare, rifiutare o
            personalizzare le preferenze. Per maggiori informazioni consulta la{' '}
            <Link href="/cookie-policy">Cookie Policy</Link> e la{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {showPanel && (
        <div className="cookie-banner-panel">
          <div className="cookie-option">
            <span className="cookie-option-text">
              <strong>Cookie tecnici</strong>
              Sempre attivi. Necessari al funzionamento e alla sicurezza del sito.
            </span>
            <span className="cookie-toggle">
              <input type="checkbox" checked disabled aria-label="Cookie tecnici, sempre attivi" />
              <span className="cookie-toggle-track" aria-hidden="true"></span>
            </span>
          </div>
          <div className="cookie-option">
            <span className="cookie-option-text">
              <strong>Cookie analytics</strong>
              Statistiche aggregate sull&apos;utilizzo del sito (es. Google Analytics).
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
              <strong>Cookie marketing</strong>
              Contenuti e messaggi personalizzati, retargeting e misurazione campagne.
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
            Personalizza
          </button>
        )}
        <button type="button" onClick={rejectAll} className="cookie-btn cookie-btn-secondary">
          Rifiuta
        </button>
        {showPanel && (
          <button type="button" onClick={saveSelection} className="cookie-btn cookie-btn-secondary">
            Salva preferenze
          </button>
        )}
        <button type="button" onClick={acceptAll} className="cookie-btn cookie-btn-primary">
          Accetta tutti
        </button>
      </div>
    </div>
  );
}
