// src/components/contatti/AssistenzaRapida.tsx
'use client';

import React, { useEffect, useRef } from 'react';

export interface AssistenzaRapidaProps {
  whatsapp?: string;
}

export default function AssistenzaRapida({
  whatsapp = '390932123456',
}: AssistenzaRapidaProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Normalizza il numero per l'URL wa.me (solo cifre).
  const waNumber = whatsapp.replace(/[^\d]/g, '');

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('[data-animate="true"]');
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
      ref={sectionRef}
      data-animate="true"
      className="assistenza-card"
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
        minHeight: 'auto',
        height:'fit-content'
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .assistenza-card {
            padding: 1.25rem !important;
          }
          .whatsapp-button {
            flex-direction: column !important;
            text-align: center !important;
            gap: 0.5rem !important;
          }
          .whatsapp-button i:first-child {
            margin-right: 0 !important;
            margin-bottom: '0.25rem';
          }
          .whatsapp-button span {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#2c5282',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '0.75rem'
      }}>
        <i className="fas fa-headset" style={{ marginRight: '0.75rem', color: '#2c5282' }}></i>
        Assistenza rapida
      </h3>
      
      <p style={{
        color: '#000000',
        marginBottom: '1.5rem',
        lineHeight: '1.6',
        fontWeight: '500'
      }}>
        Hai bisogno di informazioni urgenti sui nostri servizi?
      </p>
      
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.7rem 1.6rem',
          background: '#25D366',
          borderRadius: '14px',
          textDecoration: 'none',
          marginBottom: '1rem',
        }}
      >
        <i className="fab fa-whatsapp" style={{
          fontSize: '1.5rem',
          color: '#ffffff',
          marginRight: '1rem'
        }}></i>
        <span style={{
          flex: 1,
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '1rem'
        }}>
          Scrivici su WhatsApp
        </span>
        <i className="fas fa-external-link-alt" style={{
          fontSize: '0.875rem',
          color: '#ffffff'
        }}></i>
      </a>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: '#000000',
        fontWeight: '500',
        padding: '0.5rem',
        background: '#f0f0f0',
        borderRadius: '0.5rem'
      }}>
        <i className="fas fa-clock" style={{ color: '#25D366' }}></i>
        <span>Rispondiamo in media entro 2 ore</span>
      </div>
    </div>
  );
}