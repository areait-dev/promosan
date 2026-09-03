// src/components/news/NewsPageCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

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

interface NewsPageCardProps {
  news: NewsItem;
}

const getCategoryStyle = (category: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    normativa: { background: '#dbeafe', color: '#1e40af' },
    servizi: { background: '#cffafe', color: '#155e75' },
    eventi: { background: '#fce7f3', color: '#9d174d' },
    innovazione: { background: '#dcfce7', color: '#166534' },
    welfare: { background: '#f3e8ff', color: '#6b21a8' }
  };
  return styles[category] || styles.normativa;
};

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    normativa: 'Normativa',
    servizi: 'Servizi',
    eventi: 'Eventi',
    innovazione: 'Innovazione',
    welfare: 'Welfare'
  };
  return labels[category] || category;
};

export default function NewsPageCard({ news }: NewsPageCardProps) {
  const primaryCategory = news.categories[0];
  const categoryStyle = getCategoryStyle(primaryCategory);
  const categoryLabel = getCategoryLabel(primaryCategory);

  const newsDate = new Date(news.date);
  const day = newsDate.getDate();
  const month = newsDate.toLocaleString('it-IT', { month: 'short' }).toUpperCase();

  return (
    <article style={{
      overflow: 'hidden',
      background: '#ffffff',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-0.25rem)';
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ position: 'relative', height: '14rem', overflow: 'hidden' }}>
        <img
          src={news.image}
          alt={news.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          padding: '0.5rem 0.75rem',
          background: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#2c5282' }}>{day}</div>
          <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>{month}</div>
        </div>
        <span style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.25rem 0.75rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          borderRadius: '9999px',
          ...categoryStyle
        }}>
          {categoryLabel}
        </span>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          marginBottom: '0.75rem',
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#1f2937',
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#2c5282';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#1f2937';
        }}
        >
          {news.title}
        </h3>
        <p style={{
          marginBottom: '1rem',
          color: '#4b5563',
          lineHeight: '1.6',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {news.excerpt}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid #f3f4f6'
        }}>
          <span style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            <Clock className="inline h-3 w-3" /> {news.readTime} min
          </span>
          <Link
            href={`/news/${news.slug ?? news.id}`}
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#2c5282',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4299e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#2c5282';
            }}
          >
            Leggi articolo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}