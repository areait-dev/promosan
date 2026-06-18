// app/ricerca/RicercaClient.tsx
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import NewsPageCard from '../../components/news-page/NewsPageCard';
import { searchSitePages, type SitePage } from '../../lib/searchIndex';
import type { GlobalOptions, NewsItem as WPNewsItem } from '../../lib/wordpress';

// Forma attesa da NewsPageCard (immagine come stringa).
interface CardItem {
  id: number;
  slug?: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
  categories: string[];
}

interface SearchableItem extends CardItem {
  content: string;
}

function toSearchable(item: WPNewsItem): SearchableItem {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content ?? '',
    image: typeof item.image === 'string' ? item.image : item.image?.url ?? '',
    date: item.date,
    readTime: item.readTime,
    categories: item.categories,
  };
}

interface RicercaClientProps {
  initialQuery: string;
  news?: WPNewsItem[];
  options?: GlobalOptions;
}

export default function RicercaClient({ initialQuery, news, options }: RicercaClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const items = useMemo<SearchableItem[]>(
    () => (news && news.length ? news.map(toSearchable) : []),
    [news]
  );

  const results = useMemo<SearchableItem[]>(() => {
    const q = initialQuery.trim().toLowerCase();
    if (!q) return [];
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.categories.some((c) => c.toLowerCase().includes(q))
    );
  }, [items, initialQuery]);

  const pageResults = useMemo<SitePage[]>(
    () => searchSitePages(initialQuery),
    [initialQuery]
  );

  const totalResults = results.length + pageResults.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ricerca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const hasQuery = initialQuery.trim() !== '';

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />

      {/* Hero ricerca */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2c5282 0%, #4299e1 100%)',
          padding: '6rem 1rem 4rem',
          color: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ricerca nel sito
          </h1>
          <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
            Cerca tra news, normative e aggiornamenti di PromoSan.
          </p>
          <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
            <i
              className="fas fa-search"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
              }}
            ></i>
            <input
              type="text"
              placeholder="Cerca nel sito..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 2.75rem',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '1rem',
                color: '#1f2937',
                outline: 'none',
              }}
            />
          </form>
        </div>
      </section>

      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {hasQuery && (
            <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
              {totalResults > 0
                ? `${totalResults} risultato${totalResults === 1 ? '' : 'i'} per `
                : 'Nessun risultato per '}
              <strong style={{ color: '#1f2937' }}>“{initialQuery}”</strong>
            </p>
          )}

          {totalResults > 0 ? (
            <>
              {pageResults.length > 0 && (
                <div style={{ marginBottom: results.length > 0 ? '3.5rem' : 0 }}>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Pagine del sito
                  </h2>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {pageResults.map((page) => (
                      <Link
                        key={page.url}
                        href={page.url}
                        style={{
                          display: 'block',
                          padding: '1.25rem 1.5rem',
                          background: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#4299e1';
                          e.currentTarget.style.boxShadow =
                            '0 4px 6px -1px rgba(0, 0, 0, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            color: '#2c5282',
                            marginBottom: '0.35rem',
                          }}
                        >
                          <i className="far fa-file-alt"></i>
                          {page.title}
                        </span>
                        <span style={{ color: '#4b5563', lineHeight: 1.5 }}>
                          {page.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '1.25rem',
                    }}
                  >
                    News & Articoli
                  </h2>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '2rem',
                    }}
                  >
                    {results.map((item) => (
                      <NewsPageCard key={item.id} news={item} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <i
                className="fas fa-search"
                style={{ fontSize: '3rem', color: '#9ca3af', marginBottom: '1rem' }}
              ></i>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#1f2937',
                  marginBottom: '0.5rem',
                }}
              >
                {hasQuery ? 'Nessun risultato trovato' : 'Inizia la tua ricerca'}
              </h3>
              <p style={{ color: '#6b7280' }}>
                {hasQuery
                  ? 'Prova con parole chiave diverse o più generiche.'
                  : 'Digita un termine nel campo qui sopra per cercare nel sito.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
        ::selection {
          background: #2c5282;
          color: #ffffff;
        }
        @media (max-width: 1024px) {
          section .results-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      <Footer options={options} />
    </main>
  );
}
