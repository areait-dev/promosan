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

  const btnBase: React.CSSProperties = {
    padding: '0.7rem 1.6rem',
    borderRadius: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  };
  const btnPrimary: React.CSSProperties = { ...btnBase, border: 'none', background: '#2563eb', color: '#fff' };
  const btnSecondary: React.CSSProperties = { ...btnBase, border: '1px solid #cbd5e1', background: '#fff', color: '#334155' };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Informativa sui cookie"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
        zIndex: 9999,
        maxWidth: '760px',
        margin: '0 auto',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.18)',
        padding: '1.25rem 1.5rem',
        maxHeight: '85vh',
        overflowY: 'auto',
      }}
    >
      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#334155' }}>
        Utilizziamo cookie tecnici necessari e, previo consenso, cookie analytics e marketing per
        migliorare il sito e offrire contenuti personalizzati. Puoi accettare, rifiutare o
        personalizzare le preferenze. Per maggiori informazioni consulta la{' '}
        <Link href="/cookie-policy" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Cookie Policy
        </Link>{' '}
        e la{' '}
        <Link href="/privacy-policy" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        .
      </p>

      {showPanel && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', opacity: 0.7 }}>
            <input type="checkbox" checked disabled style={{ marginTop: '0.2rem' }} />
            <span style={{ fontSize: '0.9rem', color: '#334155' }}>
              <strong>Cookie tecnici</strong> — sempre attivi. Necessari al funzionamento e alla
              sicurezza del sito.
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              style={{ marginTop: '0.2rem' }}
            />
            <span style={{ fontSize: '0.9rem', color: '#334155' }}>
              <strong>Cookie analytics</strong> — statistiche aggregate sull’utilizzo del sito
              (es. Google Analytics).
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              style={{ marginTop: '0.2rem' }}
            />
            <span style={{ fontSize: '0.9rem', color: '#334155' }}>
              <strong>Cookie marketing</strong> — contenuti e messaggi personalizzati, retargeting e
              misurazione campagne.
            </span>
          </label>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginTop: '1rem',
          justifyContent: 'flex-end',
        }}
      >
        {!showPanel && (
          <button type="button" onClick={() => setShowPanel(true)} style={btnSecondary}>
            Personalizza
          </button>
        )}
        <button type="button" onClick={rejectAll} style={btnSecondary}>
          Rifiuta
        </button>
        {showPanel && (
          <button type="button" onClick={saveSelection} style={btnSecondary}>
            Salva preferenze
          </button>
        )}
        <button type="button" onClick={acceptAll} style={btnPrimary}>
          Accetta tutti
        </button>
      </div>
    </div>
  );
}
