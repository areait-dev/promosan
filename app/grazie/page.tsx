import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Phone } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import LeadTracker from '../../components/Contatti/LeadTracker';

// Pagina di conversione (Google Ads): non indicizzabile, fuori da sitemap e menu.
export const metadata: Metadata = {
  title: 'Grazie | PromoSan',
  robots: { index: false, follow: false },
};

export default function GraziePage() {
  return (
    <>
      <LeadTracker />
      <main>
        <section style={{ padding: '6rem 0', background: '#f9fafb' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 1rem' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '1rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                border: '1px solid #e2e8f0',
                padding: '3rem 2rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '4rem',
                  height: '4rem',
                  background: '#ecfdf5',
                  borderRadius: '50%',
                  color: '#059669',
                  marginBottom: '1.5rem',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h1
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#1a365d',
                  marginBottom: '1rem',
                  lineHeight: 1.25,
                }}
              >
                Grazie, abbiamo ricevuto la tua richiesta
              </h1>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Ti ricontatteremo entro 24 ore lavorative con un preventivo per la tua azienda.
              </p>
              <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '2rem' }}>
                Chiamaci al{' '}
                <a
                  href="tel:+390932862613"
                  style={{
                    color: '#2c5282',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Phone size={16} />
                  0932 862613
                </a>
              </p>
              <Link
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '0.7rem 1.6rem',
                  background: 'linear-gradient(135deg, #2c5282, #4299e1)',
                  color: '#ffffff',
                  borderRadius: '14px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                }}
              >
                Torna al sito
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
