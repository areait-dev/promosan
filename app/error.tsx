'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer/Footer';
import { T } from "@/components/Testi";

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
              <T k="pagina.error.ops">Ops.</T>
            </p>
            <h1 className="section-title" style={{ display: 'block' }}>
              <T k="pagina.error.qualcosa-e-andato-storto">Qualcosa è andato storto</T>
            </h1>
            <p className="section-subtitle" style={{ margin: '0 auto var(--space-xl)', maxWidth: '38rem' }}>
              <T k="pagina.error.si-e-verificato-un-errore-imprevisto">Si è verificato un errore imprevisto. Riprova, oppure torna alla home
              o contattaci se il problema persiste.</T>
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={reset} className="btn btn-primary">
                <T k="pagina.error.riprova">Riprova</T>
              </button>
              <Link href="/" className="btn btn-outline">
                <T k="pagina.error.torna-alla-home">Torna alla Home</T>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
