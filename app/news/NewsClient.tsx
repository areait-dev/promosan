// app/news/NewsClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import NewsPageHero from '../../components/news-page/NewsPageHero';
import NewsPageFilters from '../../components/news-page/NewsPageFilters';
import NewsPageCard from '../../components/news-page/NewsPageCard';
import NewsPagePagination from '../../components/news-page/NewsPagePagination';
import Footer from '../../components/Footer/Footer';
import type { GlobalOptions, NewsItem as WPNewsItem } from '../../lib/wordpress';

// Forma attesa da NewsPageCard (immagine come stringa).
interface NewsItem {
  id: number;
  slug?: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
  categories: string[];
}

const ITEMS_PER_PAGE = 6;

// Fallback usato finché il fetch da WordPress non è collegato.
const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 1,
    slug: 'strategia-nazionale-2026-2030',
    title: 'Strategia Nazionale 2026–2030: una nuova visione per la salute e la sicurezza sul lavoro',
    excerpt: 'Il documento traccia la rotta per i prossimi cinque anni: prevenzione, formazione e coordinamento al centro della nuova strategia per ridurre infortuni e morti sul lavoro.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-02-20',
    readTime: 5,
    categories: ['normativa'],
  },
  {
    id: 2,
    slug: 'lavoratori-stranieri-sicurezza',
    title: 'Lavoratori stranieri: sicurezza sul lavoro e malattie professionali in Italia',
    excerpt: 'I dati INAIL rivelano una maggiore esposizione ai rischi di infortuni e malattie professionali per i lavoratori stranieri, con tassi più elevati rispetto agli italiani.',
    image: 'https://images.unsplash.com/photo-1551836026-d5c2c7af6c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-02-18',
    readTime: 4,
    categories: ['servizi'],
  },
  {
    id: 3,
    slug: 'decreto-sicurezza-159-2025',
    title: 'Tutte le novità del Decreto Sicurezza 159/2025 pubblicato in Gazzetta Ufficiale',
    excerpt: 'Badge digitale, patente a crediti con sanzioni raddoppiate, formazione, sorveglianza sanitaria e monitoraggio dei near miss: tutte le modifiche al Testo Unico sulla Sicurezza.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-02-15',
    readTime: 8,
    categories: ['normativa'],
  },
  {
    id: 4,
    slug: 'lavoro-alte-temperature',
    title: 'Lavoro e alte temperature: linee guida per affrontare le ore più calde',
    excerpt: 'Le linee guida INAIL per prevenire infortuni e patologie da calore: formazione, DPI, rimodulazione orari e piano di sorveglianza sanitaria.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-02-10',
    readTime: 5,
    categories: ['welfare'],
  },
];

// Converte la forma di lib/wordpress nella forma usata dalle card.
function toCardItem(item: WPNewsItem): NewsItem {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    image: typeof item.image === 'string' ? item.image : item.image?.url ?? '',
    date: item.date,
    readTime: item.readTime,
    categories: item.categories,
  };
}

interface NewsClientProps {
  initialNews?: WPNewsItem[];
  options?: GlobalOptions;
}

export default function NewsClient({ initialNews, options }: NewsClientProps) {
  const newsData: NewsItem[] =
    initialNews && initialNews.length ? initialNews.map(toCardItem) : FALLBACK_NEWS;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('tutte');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsData);
  // Inizializzati con i dati già al primo render (SSR): le card sono nell'HTML
  // iniziale, non solo dopo l'esecuzione del JS. Gli useEffect aggiornano su filtri/ricerca.
  const [paginatedNews, setPaginatedNews] = useState<NewsItem[]>(() =>
    newsData.slice(0, ITEMS_PER_PAGE)
  );
  const [totalPages, setTotalPages] = useState(() =>
    Math.ceil(newsData.length / ITEMS_PER_PAGE) || 1
  );

  // Filtraggio news
  useEffect(() => {
    let filtered = [...newsData];

    if (activeFilter !== 'tutte') {
      filtered = filtered.filter((item) => item.categories.includes(activeFilter));
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.excerpt.toLowerCase().includes(query)
      );
    }

    setFilteredNews(filtered);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, searchQuery]);

  // Paginazione
  useEffect(() => {
    const total = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    setTotalPages(total || 1);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedNews(filteredNews.slice(start, end));
  }, [filteredNews, currentPage]);

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      <NewsPageHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <NewsPageFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          {paginatedNews.length > 0 ? (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '2rem',
                  marginBottom: '2rem',
                }}
              >
                {paginatedNews.map((news) => (
                  <NewsPageCard key={news.id} news={news} />
                ))}
              </div>

              {totalPages > 1 && (
                <NewsPagePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Search size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                Nessun risultato trovato
              </h3>
              <p style={{ color: '#6b7280' }}>
                Prova a modificare i filtri di ricerca o la categoria selezionata
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stili globali */}
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #2c5282;
          color: #ffffff;
        }
      `}</style>
      <Footer options={options} />
    </main>
  );
}
