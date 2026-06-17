// src/components/News.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
    date: '2026-02-20',
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
    date: '2026-02-18',
    readTime: 4,
    categories: ['servizi'],
  },
  {
    id: 2,
    slug: 'decreto-sicurezza-159-2025',
    title: 'Tutte le novità del Decreto Sicurezza 159/2025 pubblicato in Gazzetta Ufficiale',
    excerpt: 'Badge digitale, patente a crediti con sanzioni raddoppiate, formazione, sorveglianza sanitaria e monitoraggio dei near miss: tutte le modifiche al Testo Unico sulla Sicurezza.',
    content: '',
    image: { url: '/assets/img/news-decreto-sicurezza.jpg', alt: 'Decreto Sicurezza 159/2025 in Gazzetta Ufficiale' },
    date: '2026-02-15',
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
    date: '2026-02-10',
    readTime: 5,
    categories: ['welfare'],
  },
];

// Etichetta leggibile per la prima categoria della news.
const CATEGORY_LABELS: Record<string, string> = {
  normativa: 'Normativa',
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

  const newsList = items;

  // Calcola il numero di pagine
  const totalIndicators = Math.ceil(newsList.length / itemsPerView);

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
      // Se l'indice corrente supera il massimo consentito, resetta a 0
      setCurrentIndex((prev) => Math.min(prev, Math.ceil(newsList.length / newItemsPerView) - 1));
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

      // Larghezza totale di un gruppo (itemsPerView elementi + gap tra di essi)
      const groupWidth = itemWidth * itemsPerView + gap * (itemsPerView - 1);
      const translateX = -currentIndex * groupWidth;

      carousel.style.transform = `translateX(${translateX}px)`;
    };

    updateCarousel();

    // Ricalcola anche al ridimensionamento della finestra
    window.addEventListener('resize', updateCarousel);
    return () => window.removeEventListener('resize', updateCarousel);
  }, [currentIndex, itemsPerView]);

  // Funzioni per navigazione in loop
  const nextSlide = (): void => {
    const maxIndex = Math.max(0, Math.ceil(newsList.length / itemsPerView) - 1);
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = (): void => {
    const maxIndex = Math.max(0, Math.ceil(newsList.length / itemsPerView) - 1);
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
          <p className="section-subtitle mx-auto">
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
                  typeof item.image === 'string' ? item.image : item.image?.url ?? '';
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
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="news-card-img"
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
                            <i className="far fa-clock"></i> {item.readTime} min
                          </span>
                          <span className="news-card-link-text">
                            Leggi l'articolo <i className="ml-1 text-xs fas fa-arrow-right"></i>
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
                <i className="fas fa-chevron-left"></i>
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
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href={archiveLink}
            className="btn btn-primary btn-large"
          >
            Vedi tutte le news
          </Link>
        </div>
      </div>
    </section>
  );
}