// src/components/News.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { NewsItem } from '../../lib/wordpress';

export interface NewsProps {
  title?: string;
  subtitle?: string;
  archiveLink?: string;
  items?: NewsItem[];
}

const DEFAULT_TITLE = 'ULTIME NOVITÀ & AGGIORNAMENTI';
const DEFAULT_SUBTITLE =
  'Scopri le ultime normative e innovazioni nel settore della medicina del lavoro';

// Fallback usato finché il fetch da WordPress non è collegato.
const DEFAULT_ITEMS: NewsItem[] = [
  {
    id: 0,
    slug: 'strategia-nazionale-2026-2030',
    title: 'Strategia Nazionale 2026–2030: una nuova visione per la salute e la sicurezza sul lavoro',
    excerpt: 'Il documento traccia la rotta per i prossimi cinque anni: prevenzione, formazione e coordinamento al centro della nuova strategia per ridurre infortuni e morti sul lavoro.',
    content: '',
    image: { url: '/assets/img/news-strategia-nazionale.jpg', alt: 'Strategia Nazionale 2026-2030 salute e sicurezza sul lavoro' },
    date: '2026-01-12',
    readTime: 5,
    categories: ['normativa'],
  },
  {
    id: 1,
    slug: 'lavoratori-stranieri-sicurezza',
    title: 'Lavoratori stranieri: sicurezza sul lavoro e malattie professionali in Italia',
    excerpt: 'I dati INAIL rivelano una maggiore esposizione ai rischi di infortuni e malattie professionali per i lavoratori stranieri, con tassi più elevati rispetto agli italiani.',
    content: '',
    image: { url: '/assets/img/news-lavoratori-stranieri.jpg', alt: 'Lavoratori stranieri e sicurezza sul lavoro in Italia' },
    date: '2025-12-12',
    readTime: 4,
    categories: ['sicurezza'],
  },
  {
    id: 2,
    slug: 'decreto-sicurezza-159-2025',
    title: 'Tutte le novità del Decreto Sicurezza 159/2025 pubblicato in Gazzetta Ufficiale',
    excerpt: 'Badge digitale, patente a crediti con sanzioni raddoppiate, formazione, sorveglianza sanitaria e monitoraggio dei near miss: tutte le modifiche al Testo Unico sulla Sicurezza.',
    content: '',
    image: { url: '/assets/img/news-decreto-sicurezza.jpg', alt: 'Decreto Sicurezza 159/2025 in Gazzetta Ufficiale' },
    date: '2025-11-07',
    readTime: 8,
    categories: ['normativa'],
  },
  {
    id: 3,
    slug: 'lavoro-alte-temperature',
    title: 'Lavoro e alte temperature: linee guida per affrontare le ore più calde',
    excerpt: 'Le linee guida INAIL per prevenire infortuni e patologie da calore: formazione, DPI, rimodulazione orari e piano di sorveglianza sanitaria.',
    content: '',
    image: { url: '/assets/img/news-lavoro-alte-temperature.jpg', alt: 'Lavoro e alte temperature: linee guida INAIL' },
    date: '2025-07-15',
    readTime: 5,
    categories: ['welfare'],
  },
];

// Etichetta leggibile per la prima categoria della news.
const CATEGORY_LABELS: Record<string, string> = {
  normativa: 'Normativa',
  sicurezza: 'Sicurezza sul lavoro',
  servizi: 'Servizi',
  eventi: 'Eventi',
  innovazione: 'Innovazione',
  welfare: 'Welfare',
};

export default function News({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  archiveLink = '/news',
  items = DEFAULT_ITEMS,
}: NewsProps = {}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);

  const newsList = items.slice(0, 4);

  // Calcola il numero di posizioni/pagine del carosello (spostamento singolo)
  const totalIndicators = Math.max(1, newsList.length - itemsPerView + 1);

  // Aggiorna itemsPerView in base alla dimensione dello schermo e resetta currentIndex se necessario
  useEffect(() => {
    const updateItemsPerView = () => {
      let newItemsPerView = 3;
      if (window.innerWidth >= 1024) {
        newItemsPerView = 3;
      } else if (window.innerWidth >= 768) {
        newItemsPerView = 2;
      } else {
        newItemsPerView = 1;
      }
      setItemsPerView(newItemsPerView);
      // Se l'indice corrente supera il massimo consentito, resetta al massimo consentito
      const maxIndex = Math.max(0, newsList.length - newItemsPerView);
      setCurrentIndex((prev) => Math.min(prev, maxIndex));
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [newsList.length]);

  // Logica del carosello - calcola la traslazione
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateCarousel = () => {
      const items = carousel.children;
      if (items.length === 0) return;

      const firstItem = items[0] as HTMLElement;
      const itemWidth = firstItem.offsetWidth;
      const gap = 24; // gap-6 = 24px

      // Sposta di un singolo elemento (larghezza + gap)
      const translateX = -currentIndex * (itemWidth + gap);

      carousel.style.transform = `translateX(${translateX}px)`;
    };

    updateCarousel();

    // Ricalcola anche al ridimensionamento della finestra
    window.addEventListener('resize', updateCarousel);
    return () => window.removeEventListener('resize', updateCarousel);
  }, [currentIndex, itemsPerView]);

  // Funzioni per navigazione in loop
  const nextSlide = (): void => {
    const maxIndex = Math.max(0, newsList.length - itemsPerView);
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = (): void => {
    const maxIndex = Math.max(0, newsList.length - itemsPerView);
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  // Estrae giorno e mese (IT) da una data ISO.
  const parseDate = (dateStr: string): { day: string; month: string } => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      const parts = dateStr.split(' ');
      return { day: parts[0] ?? '', month: parts[1] ?? '' };
    }
    return {
      day: String(d.getDate()).padStart(2, '0'),
      month: d.toLocaleString('it-IT', { month: 'short' }).toUpperCase(),
    };
  };

  // Mappa colore per tag
  const getTagStyle = (tag: string): React.CSSProperties => {
    const styles: Record<string, React.CSSProperties> = {
      'Normativa': { background: '#dbeafe', color: '#1e40af' },
      'Sicurezza sul lavoro': { background: '#fee2e2', color: '#991b1b' },
      'Sicurezza': { background: '#fee2e2', color: '#991b1b' },
      'Innovazione': { background: '#dcfce7', color: '#166534' },
      'Welfare': { background: '#f3e8ff', color: '#6b21a8' },
      'Formazione': { background: '#ffedd5', color: '#9a3412' },
      'Servizi': { background: '#cffafe', color: '#155e75' },
      'Salute': { background: '#fee2e2', color: '#991b1b' },
      'Ambiente': { background: '#fef9c3', color: '#854d0e' },
      'Eventi': { background: '#fce7f3', color: '#9d174d' },
      'Certificazioni': { background: '#e0e7ff', color: '#3730a3' },
      'Privacy': { background: '#ccfbf1', color: '#115e59' },
    };
    return styles[tag] || { background: '#f3f4f6', color: '#1f2937' };
  };

  return (
    <section id="news" className="section-news">
      <div className="container">
        {/* Header della sezione */}
        <div className="section-header text-left">
          <h2 className="section-title">
            {title}
          </h2>
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-wrapper">
            <div
              ref={carouselRef}
              className="carousel-track"
            >
              {newsList.map((item) => {
                const { day, month } = parseDate(item.date);
                const primaryCategory = item.categories[0] ?? 'normativa';
                const tagLabel = CATEGORY_LABELS[primaryCategory] ?? primaryCategory;
                const imageUrl =
                  (typeof item.image === 'string' ? item.image : item.image?.url) ||
                  '/assets/img/news-strategia-nazionale.jpg';

                // Formatta la data completa in italiano (es. "12 gennaio 2026")
                const fullDateFormatted = (() => {
                  const d = new Date(item.date);
                  if (isNaN(d.getTime())) return item.date;
                  return d.toLocaleDateString('it-IT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });
                })();

                return (
                  <div
                    key={item.id}
                    className="news-card"
                  >
                    <Link
                      href={`/news/${item.slug ?? item.id}`}
                      className="news-card-link"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <div className="news-card-image">
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          className="news-card-img"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                        <div className="news-card-date">
                          <div className="news-card-day">{day}</div>
                          <div className="news-card-month">{month}</div>
                        </div>
                        <div
                          className="news-card-tag"
                          style={getTagStyle(tagLabel)}
                        >
                          {tagLabel}
                        </div>
                        {/* Red News label and Date overlay at the bottom of the image */}
                        <div className="news-card-bottom-bar">
                          <span className="news-card-bottom-label">News</span>
                          <span className="news-card-bottom-date">{fullDateFormatted}</span>
                        </div>
                      </div>
                      <div className="news-card-content">
                        <h3 className="news-card-title">
                          {item.title}
                        </h3>
                        <p className="news-card-excerpt">
                          {item.excerpt}
                        </p>
                        <div className="news-card-footer">
                          <span className="news-card-time">
                            <Clock className="inline h-3 w-3" /> {item.readTime} min
                          </span>
                          <span className="news-card-link-text">
                            Leggi <ArrowRight className="ml-1 inline h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottoni di navigazione e indicatori - visibili solo se necessario */}
          {totalIndicators > 1 && (
            <div className="carousel-controls">
              <button
                onClick={prevSlide}
                className="carousel-btn"
                aria-label="Articolo precedente"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="carousel-indicators">
                {Array.from({ length: totalIndicators }).map((_, index) => {
                  const isActive = currentIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`carousel-indicator ${isActive ? 'active' : ''}`}
                      aria-label={`Vai alla slide ${index + 1}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={nextSlide}
                className="carousel-btn"
                aria-label="Articolo successivo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="news-archive-btn-wrapper">
          <Link
            href={archiveLink}
            className="btn-archive"
          >
            Vedi tutte le news
          </Link>
        </div>
      </div>

      <style jsx>{`
        .news-card {
          flex-shrink: 0;
          width: calc(33.333% - 16px);
          background: var(--color-white);
          border-radius: 16px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
          border: 1px solid #e2e8f0 !important;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }

        .news-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08) !important;
        }

        .news-card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .news-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .news-card-link:hover .news-card-img {
          transform: scale(1.04);
        }

        .news-card-date {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--color-white);
          padding: 6px 12px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          z-index: 2;
          min-width: 52px;
          text-align: center;
        }

        .news-card-day {
          color: #1e3a8a;
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.1;
        }

        .news-card-month {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
        }

        .news-card-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          z-index: 2;
        }

        .news-card-bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.65) 100%);
          padding: 0 16px 0 0;
          z-index: 2;
          height: 36px;
        }

        .news-card-bottom-label {
          background: #cf142b;
          color: var(--color-white);
          font-weight: 700;
          font-size: 0.75rem;
          padding: 0 14px;
          height: 100%;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .news-card-bottom-date {
          color: var(--color-white);
          font-size: 0.72rem;
          font-weight: 500;
          opacity: 0.95;
        }

        .news-card-content {
          padding: 20px;
          background: var(--color-white);
        }

        .news-card-title {
          color: #1a365d !important;
          font-weight: 700 !important;
          font-size: 1.05rem;
          line-height: 1.45;
          margin-bottom: 12px;
          height: 2.9em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s ease;
        }

        .news-card-link:hover .news-card-title {
          color: var(--color-secondary) !important;
        }

        .news-card-excerpt {
          color: #64748b;
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 16px;
          height: 4.8em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .news-card-time {
          color: #94a3b8;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .news-card-link-text {
          font-weight: 700 !important;
          color: #1e3a8a !important;
          font-size: 0.82rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s ease, color 0.2s ease;
        }

        .news-card-link:hover .news-card-link-text {
          color: var(--color-secondary) !important;
          gap: 7px;
        }

        .carousel-btn {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--color-white) !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: var(--border-radius-full);
          color: #64748b !important;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
          cursor: pointer;
        }

        .carousel-btn:hover {
          background: var(--color-white) !important;
          color: var(--color-primary) !important;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          border-color: #cbd5e1 !important;
        }

        .carousel-indicators {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .carousel-indicator {
          width: 16px;
          height: 12px;
          border-radius: 6px;
          background: #e2e8f0 !important;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-indicator.active {
          background: #1e3a8a !important;
          width: 28px;
        }

        .news-archive-btn-wrapper {
          display: flex;
          justify-content: center;
          margin-top: var(--space-xl);
        }

        .btn-archive {
          background: var(--color-primary) !important;
          color: var(--color-white) !important;
          padding: 0.7rem 1.6rem !important;
          font-weight: 700 !important;
          font-size: 0.95rem !important;
          border-radius: 14px !important;
          box-shadow: 0 4px 14px rgba(44, 82, 130, 0.2) !important;
          transition: all 0.2s ease !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          cursor: pointer !important;
        }

        .btn-archive:hover {
          background: var(--color-dark) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(44, 82, 130, 0.3) !important;
        }
      `}</style>
    </section>
  );
}