'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app/error.tsx] Errore non gestito:', error);
  }, [error]);

  return (
    <>
      <Navbar />
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
              Ops.
            </p>
            <h1 className="section-title" style={{ display: 'block' }}>
              Qualcosa è andato storto
            </h1>
            <p className="section-subtitle" style={{ margin: '0 auto var(--space-xl)', maxWidth: '38rem' }}>
              Si è verificato un errore imprevisto. Riprova, oppure torna alla home
              o contattaci se il problema persiste.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={reset} className="btn btn-primary">
                Riprova
              </button>
              <Link href="/" className="btn btn-outline">
                Torna alla Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
