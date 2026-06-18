'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';

const CATEGORY_LABELS = {
  normativa: 'Normativa',
  sicurezza: 'Sicurezza sul lavoro',
  servizi: 'Servizi',
  eventi: 'Eventi',
  innovazione: 'Innovazione',
  welfare: 'Welfare',
};

const getTagStyle = (tag) => {
  const styles = {
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

const News1Related = ({ relatedNews }) => {
  const swiperRef = useRef(null);

  return (
    <section className="section-news" style={{ padding: '4rem 0' }}>
      <div className="section-header text-left" style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1a365d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ALTRE NEWS
        </h2>
        <p className="section-subtitle" style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.4rem' }}>
          Approfondisci con gli ultimi aggiornamenti e articoli correlati
        </p>
      </div>

      <div className="carousel-container" style={{ position: 'relative' }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={relatedNews.length > 3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="news-swiper"
        >
          {relatedNews.map((item) => {
            const date = new Date(item.date);
            const day = String(date.getDate()).padStart(2, '0');
            const month = date.toLocaleString('it-IT', { month: 'short' }).toUpperCase();

            const primaryCategory = item.categories[0] ?? 'normativa';
            const tagLabel = CATEGORY_LABELS[primaryCategory] ?? primaryCategory;

            const fullDateFormatted = date.toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });

            return (
              <SwiperSlide key={item.id} style={{ height: 'auto', display: 'flex' }}>
                <div className="news-card" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Link
                    href={`/news/${item.slug ?? item.id}`}
                    className="news-card-link"
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <div className="news-card-image">
                      <img
                        src={item.image}
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
                      <div className="news-card-bottom-bar">
                        <span className="news-card-bottom-label">News</span>
                        <span className="news-card-bottom-date">{fullDateFormatted}</span>
                      </div>
                    </div>
                    <div className="news-card-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 className="news-card-title">
                          {item.title}
                        </h3>
                        <p className="news-card-excerpt">
                          {item.excerpt}
                        </p>
                      </div>
                      <div className="news-card-footer">
                        <span className="news-card-time">
                          <i className="far fa-clock"></i> {item.readTime} min
                        </span>
                        <span className="news-card-link-text">
                          Leggi <i className="ml-1 text-xs fas fa-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* CONTROLLI CAROSELLO */}
        <div className="carousel-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="carousel-btn"
            aria-label="Articolo precedente"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="carousel-btn"
            aria-label="Articolo successivo"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .news-card {
          background: #ffffff;
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
          background: #ffffff;
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
          color: #ffffff;
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
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 500;
          opacity: 0.95;
        }

        .news-card-content {
          padding: 20px;
          background: #ffffff;
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
          color: #cf142b !important;
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
          color: #cf142b !important;
          gap: 7px;
        }

        .carousel-btn {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 50%;
          color: #64748b !important;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
          cursor: pointer;
        }

        .carousel-btn:hover {
          background: #ffffff !important;
          color: #1e3a8a !important;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>
    </section>
  );
};

export default News1Related;