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
    <main className="w-full overflow-x-hidden">
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />

      {/* Hero ricerca */}
      <section
        className="bg-gradient-to-br from-primary to-secondary text-white"
        style={{ paddingTop: '8rem', paddingBottom: '5rem' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <i className="fas fa-search"></i>
            <span>Ricerca nel sito</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cosa stai cercando?
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Cerca tra news, normative e aggiornamenti di PromoSan.
          </p>
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mt-8">
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10"></i>
            <input
              type="text"
              placeholder="Cerca nel sito..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-32 rounded-2xl text-gray-900 text-base shadow-xl focus:outline-none border-0"
              style={{ boxSizing: 'border-box' }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors text-sm"
            >
              Cerca
            </button>
          </form>
        </div>
      </section>

      {/* Risultati */}
      <section className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {hasQuery && (
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <p className="text-gray-600 text-lg">
                {totalResults > 0 ? (
                  <>
                    <span className="font-bold text-primary text-2xl">{totalResults}</span>
                    {' '}risultato{totalResults === 1 ? '' : 'i'} per{' '}
                    <span className="font-semibold text-gray-900">&ldquo;{initialQuery}&rdquo;</span>
                  </>
                ) : (
                  <>Nessun risultato per <span className="font-semibold">&ldquo;{initialQuery}&rdquo;</span></>
                )}
              </p>
            </div>
          )}

          {totalResults > 0 ? (
            <>
              {pageResults.length > 0 && (
                <div className={results.length > 0 ? 'mb-14' : ''}>
                  <h2 className="text-xl font-bold text-gray-900 mb-5">
                    Pagine del sito
                  </h2>
                  <div className="grid gap-4">
                    {pageResults.map((page) => (
                      <Link
                        key={page.url}
                        href={page.url}
                        className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          <i className="far fa-file-alt text-primary group-hover:text-white"></i>
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors block mb-1">
                            {page.title}
                          </span>
                          <span className="text-gray-500 text-sm leading-relaxed">
                            {page.description}
                          </span>
                        </div>
                        <i className="fas fa-arrow-right ml-auto text-gray-300 group-hover:text-primary transition-colors mt-1"></i>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-5">
                    News &amp; Articoli
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((item) => (
                      <NewsPageCard key={item.id} news={item} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {hasQuery ? 'Nessun risultato trovato' : 'Inizia la tua ricerca'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {hasQuery
                  ? 'Prova con parole chiave diverse o più generiche.'
                  : 'Digita un termine nel campo qui sopra per cercare nel sito.'}
              </p>
              {hasQuery && (
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                >
                  <i className="fas fa-newspaper"></i>
                  Sfoglia tutte le news
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer options={options} />
    </main>
  );
}
