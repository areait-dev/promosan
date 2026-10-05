import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../components/Footer/Footer';
import { T } from "@/components/Testi";

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
              <T k="pagina.not-found.pagina-non-trovata">Pagina non trovata</T>
            </h1>
            <p className="section-subtitle" style={{ margin: '0 auto var(--space-xl)', maxWidth: '38rem' }}>
              <T k="pagina.not-found.la-pagina-che-stai-cercando-non">La pagina che stai cercando non esiste o è stata spostata. Torna alla home
              o contattaci se pensi che sia un errore.</T>
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-primary">
                <T k="pagina.not-found.torna-alla-home">Torna alla Home</T>
              </Link>
              <Link href="/contatti" className="btn btn-outline">
                <T k="pagina.not-found.contattaci">Contattaci</T>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
