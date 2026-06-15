// src/components/contatti/PrenotaConsulenza.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PrenotaConsulenza() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('[data-animate="true"]');
    if (elements) {
      elements.forEach((element, index) => {
        setTimeout(() => {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
        }, index * 150);
      });
    }
  }, []);

  return (
    <div 
      ref={sectionRef}
      data-animate="true"
      className="consulenza-card"
      style={{
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '250px'
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .consulenza-card {
            padding: 1.25rem !important;
            min-height: auto !important;
          }
          .consulenza-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
          .consulenza-list li {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <div className="consulenza-header" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        borderBottom: '2px solid #2c5282',
        paddingBottom: '0.75rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '2.5rem',
          height: '2.5rem',
          background: '#2c5282',
          borderRadius: '0.5rem',
          color: '#ffffff'
        }}>
          <i className="fas fa-calendar-check"></i>
        </div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#2c5282'
        }}>
          PRENOTA UNA CONSULENZA
        </h3>
      </div>

      <ul className="consulenza-list" style={{
        marginBottom: '1rem',
        listStyle: 'none',
        padding: 0
      }}>
        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <i className="fas fa-check-circle" style={{ color: '#2c5282', flexShrink: 0, marginTop: '0.2rem' }}></i>
          <span style={{ color: '#000000', fontWeight: '500' }}>Analisi personalizzata delle tue esigenze</span>
        </li>
        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <i className="fas fa-check-circle" style={{ color: '#2c5282', flexShrink: 0, marginTop: '0.2rem' }}></i>
          <span style={{ color: '#000000', fontWeight: '500' }}>Preventivo gratuito e senza impegno</span>
        </li>
        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <i className="fas fa-check-circle" style={{ color: '#2c5282', flexShrink: 0, marginTop: '0.2rem' }}></i>
          <span style={{ color: '#000000', fontWeight: '500' }}>Consulenza con i nostri specialisti</span>
        </li>
      </ul>

      <p style={{
        fontSize: '0.875rem',
        color: '#333333',
        fontStyle: 'italic',
        marginBottom: '1rem',
        padding: '0.5rem',
        background: '#f0f0f0',
        borderRadius: '0.5rem',
      }}>
        *La consulenza è un'opportunità per conoscere come possiamo aiutarti
      </p>

      <Link
        href="#prenota-consulenza"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '0.75rem',
          background: 'linear-gradient(135deg, #2c5282, #4299e1)',
          color: '#ffffff',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontWeight: '700',
          border: '2px solid #ffffff'
        }}
      >
        <i className="fas fa-calendar-check" style={{ marginRight: '0.5rem' }}></i>
        PRENOTA ORA
      </Link>
    </div>
  );
}