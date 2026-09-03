import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Pagina non trovata | PromoSan',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <main>
        <section className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
          <div className="container">
            <p
              style={{
                fontSize: 'clamp(3rem, 12vw, 6rem)',
                fontWeight: 800,
                color: 'var(--color-primary)',
                lineHeight: 1,
                marginBottom: 'var(--space-md)',
              }}
            >
              404
            </p>
            <h1 className="section-title" style={{ display: 'block' }}>
              Pagina non trovata
            </h1>
            <p className="section-subtitle" style={{ margin: '0 auto var(--space-xl)', maxWidth: '38rem' }}>
              La pagina che stai cercando non esiste o è stata spostata. Torna alla home
              o contattaci se pensi che sia un errore.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-primary">
                Torna alla Home
              </Link>
              <Link href="/contatti" className="btn btn-outline">
                Contattaci
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
