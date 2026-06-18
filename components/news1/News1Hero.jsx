'use client';

import React from 'react';
import Link from 'next/link';

const getCategoryLabel = (cat) =>
({
  normativa: 'Normativa',
  servizi: 'Servizi',
  eventi: 'Eventi',
  innovazione: 'Innovazione',
  welfare: 'Welfare',
}[cat] ?? cat?.charAt(0).toUpperCase() + cat?.slice(1) ?? '');

const getCategoryColor = (cat) =>
({
  normativa: '#1a56db',
  servizi: '#0e9f6e',
  eventi: '#7e3af2',
  innovazione: '#d97706',
  welfare: '#e11d48',
}[cat] ?? '#1a56db');

const News1Hero = ({ news }) => {
  const date = new Date(news.date);
  const formatted = date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const primaryCategory = news.categories?.[0] ?? '';

  return (
    <>
      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <div className="news-hero-banner">
        {/* Immagine di sfondo */}
        <div
          className="news-hero-bg"
          style={{ backgroundImage: `url(${news.image})` }}
          aria-hidden="true"
        />

        {/* Overlay gradiente leggero */}
        <div className="news-hero-overlay" aria-hidden="true" />

        {/* Contenuto sovrapposto */}
        <div className="news-hero-inner">
          {/* Categoria */}
          {primaryCategory && (
            <span
              className="news-hero-category"
              style={{ background: getCategoryColor(primaryCategory) }}
            >
              {getCategoryLabel(primaryCategory)}
            </span>
          )}

          {/* Titolo */}
          <h1 className="news-hero-title">{news.title}</h1>

          {/* Meta */}
          <div className="news-hero-meta">

            {/* Data */}
            <span className="news-hero-info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatted}
            </span>

            {/* Tempo di lettura */}
            {news.readTime > 0 && (
              <span className="news-hero-info-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {news.readTime} min di lettura
              </span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── BANNER ─────────────────────────────────────────────── */
        .news-hero-banner {
          position: relative;
          width: 100%;
          min-height: 520px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .news-hero-banner {
            min-height: 400px;
          }
        }

        .news-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          transition: transform 8s ease;
        }

        .news-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5, 12, 30, 0.82) 0%,
            rgba(5, 12, 30, 0.45) 50%,
            rgba(5, 12, 30, 0.15) 100%
          );
        }

        /* ── INNER ──────────────────────────────────────────────── */
        .news-hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 3rem 2rem 3.5rem;
        }

        @media (max-width: 768px) {
          .news-hero-inner {
            padding: 2rem 1.25rem 2.5rem;
          }
        }

        /* ── BREADCRUMB ─────────────────────────────────────────── */
        .news-hero-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .news-hero-breadcrumb a {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          transition: color 0.2s;
        }

        .news-hero-breadcrumb a:hover {
          color: #ffffff;
        }

        .news-hero-breadcrumb span:not([aria-hidden]) {
          color: rgba(255, 255, 255, 0.5);
        }

        /* ── CATEGORY BADGE ─────────────────────────────────────── */
        .news-hero-category {
          display: inline-block;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        /* ── TITLE ──────────────────────────────────────────────── */
        .news-hero-title {
          font-size: clamp(1.7rem, 4vw, 2.8rem);
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
          margin: 0 0 1.75rem;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
          max-width: 820px;
        }

        /* ── META ROW ───────────────────────────────────────────── */
        .news-hero-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .news-hero-author {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .news-hero-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--color-primary, #1a56db);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.35);
        }

        .news-hero-author-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.2;
        }

        .news-hero-author-role {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.2;
        }

        .news-hero-divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.25);
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .news-hero-divider { display: none; }
        }

        .news-hero-info-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </>
  );
};

export default News1Hero;
