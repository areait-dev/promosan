// src/components/contatti/PrenotaConsulenza.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CalendarCheck, CheckCircle2 } from 'lucide-react';

export interface PrenotaConsulenzaProps {
  title?: string;
  items?: string[];
  nota?: string;
}

const DEFAULT_TITLE = 'PRENOTA UNA CONSULENZA';
const DEFAULT_ITEMS = [
  'Analisi personalizzata delle tue esigenze',
  'Preventivo gratuito e senza impegno',
  'Consulenza con i nostri specialisti',
];
const DEFAULT_NOTA =
  "*La consulenza è un'opportunità per conoscere come possiamo aiutarti";

export default function PrenotaConsulenza({
  title = DEFAULT_TITLE,
  items = DEFAULT_ITEMS,
  nota = DEFAULT_NOTA,
}: PrenotaConsulenzaProps = {}) {
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
        padding: '2rem 1.5rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e2e8f0',
        width: '100%',
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        color: '#374151',
        height: 'fit-content'
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .consulenza-card {
            padding: 1.5rem !important;
          }
          .consulenza-header {
            align-items: center !important;
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
        marginBottom: '1.75rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '2.5rem',
          height: '2.5rem',
          background: '#204c84',
          borderRadius: '50%',
          color: '#ffffff',
          flexShrink: 0
        }}>
          <CalendarCheck size={14} />
        </div>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: '800',
          color: '#1a365d',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {title}
        </h3>
      </div>

      <ul className="consulenza-list" style={{
        marginBottom: '1.5rem',
        listStyle: 'none',
        padding: 0
      }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.85rem', alignItems: 'center' }}>
            <CheckCircle2 size={15} style={{ color: '#204c84', flexShrink: 0 }} />
            <span style={{ color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>{item}</span>
          </li>
        ))}
      </ul>

      <p style={{
        fontSize: '0.75rem',
        color: '#475569',
        lineHeight: 1.5,
        margin: 0
      }}>
        {nota}
      </p>
    </div>
  );
}