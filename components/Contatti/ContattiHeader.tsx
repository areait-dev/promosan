// src/components/contatti/ContattiHeader.tsx
'use client';

import React, { useEffect, useRef } from 'react';

export interface ContattiHeaderProps {
  badge?: string;
  title?: string;
  subtitle?: string; // HTML
}

const DEFAULT_BADGE = 'Contatti';
const DEFAULT_TITLE = 'RICHIEDI INFORMAZIONI';
const DEFAULT_SUBTITLE =
  'Ottieni un <span style="font-weight:600;color:#2c5282">preventivo personalizzato</span> per la tua azienda';

export default function ContattiHeader({
  badge = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
}: ContattiHeaderProps = {}) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = headerRef.current?.querySelectorAll('[data-animate="true"]');
    if (elements) {
      elements.forEach((element, index) => {
        setTimeout(() => {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
        }, index * 200);
      });
    }
  }, []);

  return (
    <div 
      ref={headerRef}
      style={{ 
        marginBottom: '3rem',
        textAlign: 'center'
      }}
      className="md:mb-16"
    >
      {/* Badge */}
      <div 
        data-animate="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.5rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #2c5282, #4299e1)',
          borderRadius: '9999px',
          color: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: '600',
          boxShadow: '0 10px 15px -3px rgba(44, 82, 130, 0.2)',
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
        }}
      >
        <i className="fas fa-comments"></i>
        <span>{badge}</span>
      </div>

      {/* Titolo */}
      <h1 
        data-animate="true"
        style={{
          marginBottom: '1rem',
          fontSize: 'clamp(1.875rem, 5vw, 2.5rem)',
          fontWeight: '700',
          lineHeight: '1.2',
          background: 'linear-gradient(to right, #2c5282, #4299e1, #2c5282)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          transitionDelay: '0.1s'
        }}
      >
        {title}
      </h1>

      {/* Sottotitolo */}
      <p 
        data-animate="true"
        style={{
          margin: '0 auto',
          maxWidth: '600px',
          fontSize: 'clamp(1rem, 4vw, 1.25rem)',
          color: '#4b5563',
          lineHeight: '1.6',
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          transitionDelay: '0.2s'
        }}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    </div>
  );
}