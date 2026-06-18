'use client';

import React from 'react';

const News1Content = ({ news }) => {
  return (
    <>
      <div className="news-content-wrapper">
        {/* ── CONTENUTO HTML ─────────────────────────────────────── */}
        <div
          className="news-article-body"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* ── TAGS ───────────────────────────────────────────────── */}
        {news.tags && news.tags.length > 0 && (
          <div className="news-tags">
            <span className="news-tags-label">Tag:</span>
            <div className="news-tags-list">
              {news.tags.map((tag) => (
                <span key={tag} className="news-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* ── WRAPPER ────────────────────────────────────────────── */
        .news-content-wrapper {
          max-width: 920px;
          padding: 5rem 6rem;
        }

        @media (max-width: 992px) {
          .news-content-wrapper {
          }
        }

        @media (max-width: 576px) {
          .news-content-wrapper {
            padding: 1.5rem 1.25rem;
          }
        }

        /* ── ARTICLE BODY ───────────────────────────────────────── */
        .news-article-body {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.125rem;
          line-height: 1.9;
          color: #2d3748;
        }

        /* Headings */
        .news-article-body :global(h2) {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: #1a202c;
          margin: 3rem 0 1.25rem;
          line-height: 1.35;
          letter-spacing: -0.02em;
        }

        .news-article-body :global(h3) {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #2d3748;
          margin: 2.5rem 0 1rem;
          line-height: 1.4;
        }

        .news-article-body :global(p) {
          margin-bottom: 1.75rem;
        }

        .news-article-body :global(a) {
          color: var(--color-primary, #1a56db);
          text-decoration: underline;
          text-underline-offset: 4px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .news-article-body :global(a:hover) {
          color: var(--color-secondary, #0e4db8);
        }

        /* Liste */
        .news-article-body :global(ul),
        .news-article-body :global(ol) {
          padding-left: 2rem;
          margin-bottom: 1.75rem;
        }

        .news-article-body :global(li) {
          margin-bottom: 0.65rem;
        }

        /* Quote */
        .news-article-body :global(blockquote) {
          border-left: 4px solid var(--color-primary, #1a56db);
          margin: 2.5rem 0;
          padding: 1.25rem 2rem;
          background: #f7fafc;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: #4a5568;
          font-size: 1.2rem;
          line-height: 1.8;
        }

        /* Immagini */
        .news-article-body :global(img) {
          max-width: 100%;
          border-radius: 16px;
          margin: 2.5rem auto;
          display: block;
        }

        /* Strong */
        .news-article-body :global(strong) {
          font-weight: 700;
          color: #1a202c;
        }

        /* Tabelle */
        .news-article-body :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 2.5rem 0;
          font-size: 0.95rem;
        }

        .news-article-body :global(th) {
          font-weight: 700;
          padding: 0.85rem 1.15rem;
          border: 1px solid #e2e8f0;
          text-align: left;
        }

        .news-article-body :global(td) {
          color: #4a5568;
        }

        .news-article-body :global(tr:nth-child(even) td) {
          background: #fcfdfd;
        }

        /* ── TAGS ───────────────────────────────────────────────── */
        .news-tags {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 3.5rem;
          padding-top: 2.5rem;
          border-top: 1px solid #edf2f7;
        }

        .news-tags-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #718096;
          padding-top: 0.35rem;
          flex-shrink: 0;
        }

        .news-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .news-tag {
          display: inline-block;
          padding: 0.35rem 0.85rem;
          background: #edf2f7;
          color: #4a5568;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .news-tag:hover {
          background: #e2e8f0;
          color: #2d3748;
        }
      `}</style>
    </>
  );
};

export default News1Content;