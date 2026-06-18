// src/components/contatti/OrariContatti.tsx
'use client';

import React, { useEffect, useRef } from 'react';

export interface OrariContattiProps {
  telefono?: string;
  email?: string;
  orari?: string;
}

export default function OrariContatti({
  telefono = '+39 0932-862613',
  email = 'info@promosan.eu',
  orari = 'Lun-Ven: 9:00-18:00',
}: OrariContattiProps = {}) {
  const displayEmail = email || 'info@promosan.eu';
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
      className="contatti-card"
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
        color: '#000000',
        height:'fit-content',
        marginTop:0
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .contatti-card {
            padding: 1.5rem !important;
          }
          .contatti-info-box {
            align-items: center !important;
          }
        }
      `}</style>

      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: '800',
        color: '#1a365d',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        <i className="fas fa-clock" style={{ color: '#204c84', fontSize: '1.2rem' }}></i>
        Orari e contatti
      </h3>
      
      {/* Telefono */}
      <div className="contatti-info-box" style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        alignItems: 'flex-start'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '3rem',
          height: '3rem',
          background: '#eff6ff',
          borderRadius: '50%',
          color: '#2b578c',
          fontSize: '1.1rem',
          flexShrink: 0
        }}>
          <i className="fas fa-phone-alt"></i>
        </div>
        <div className="contatti-info-content">
          <h4 style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#64748b',
            marginBottom: '0.25rem'
          }}>
            Chiamaci
          </h4>
          <a
            href="tel:+390932862613"
            style={{
              display: 'block',
              fontSize: '1.15rem',
              fontWeight: '700',
              color: '#1e293b',
              textDecoration: 'none',
              marginBottom: '0.4rem'
            }}
          >
            +39 0932-862613
          </a>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: '#64748b',
            margin: 0,
            gap: '0.35rem'
          }}>
            <i className="far fa-clock" style={{ fontSize: '0.85rem', color: '#64748b' }}></i>
            Lun-Ven: 9:00-18:00
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="contatti-info-box" style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '3rem',
          height: '3rem',
          background: '#ecfdf5',
          borderRadius: '50%',
          color: '#10b981',
          fontSize: '1.1rem',
          flexShrink: 0
        }}>
          <i className="fas fa-envelope"></i>
        </div>
        <div className="contatti-info-content">
          <h4 style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#64748b',
            marginBottom: '0.25rem'
          }}>
            Scrivici
          </h4>
          <a
            href={`mailto:${displayEmail}`}
            style={{
              fontSize: '1.15rem',
              fontWeight: '700',
              color: '#1e293b',
              textDecoration: 'none'
            }}
          >
            {displayEmail}
          </a>
        </div>
      </div>
    </div>
  );
}