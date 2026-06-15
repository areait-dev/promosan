// src/components/news/NewsPageHero.tsx
'use client';

import React from 'react';

interface NewsPageHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function NewsPageHero({ searchQuery, onSearchChange }: NewsPageHeroProps) {
  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(to right, #2c5282, #4299e1, #2c5282)',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            marginBottom: '1.5rem',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            News & Aggiornamenti
          </h1>
          <p style={{
            margin: '0 auto',
            maxWidth: '600px',
            fontSize: '1.25rem',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Rimani informato sulle ultime normative e innovazioni nel settore della medicina del lavoro
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px'
            }}>
              <input
                type="text"
                placeholder="Cerca articoli, normative, aggiornamenti..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  color: '#1f2937',
                  background: '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}>
                <i className="fas fa-search" style={{ color: '#9ca3af' }}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}