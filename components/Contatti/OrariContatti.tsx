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
  email = 'info@promosan.it',
  orari = 'Lun-Ven: 9:00-18:00',
}: OrariContattiProps = {}) {
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
        padding: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: 'auto',
        height:'fit-content',
        marginTop:0
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .contatti-card {
            padding: 1.25rem !important;
          }
          .contatti-info-box {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
          .contatti-info-content {
            width: 100% !important;
          }
        }
      `}</style>

      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#2c5282',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid #2c5282',
        paddingBottom: '0.75rem'
      }}>
        <i className="fas fa-clock" style={{ marginRight: '0.75rem', color: '#2c5282' }}></i>
        Orari e contatti
      </h3>
      
      {/* Telefono */}
      <div className="contatti-info-box" style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '0.75rem',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '2.5rem',
          height: '2.5rem',
          background: '#2c5282',
          borderRadius: '0.5rem',
          color: '#ffffff',
          fontSize: '1rem',
          flexShrink: 0
        }}>
          <i className="fas fa-phone-alt"></i>
        </div>
        <div className="contatti-info-content">
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '0.25rem',
            textTransform: 'uppercase'
          }}>
            Chiamaci
          </h4>
          <a
            href={`tel:${telefono.replace(/[\s-]/g, '')}`}
            style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#2c5282',
              textDecoration: 'none',
              marginBottom: '0.5rem'
            }}
          >
            {telefono}
          </a>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
            color: '#333333',
            margin: 0
          }}>
            <i className="fas fa-clock" style={{ marginRight: '0.5rem', fontSize: '0.75rem', color: '#2c5282' }}></i>
            {orari}
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="contatti-info-box" style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '0.75rem',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '2.5rem',
          height: '2.5rem',
          background: '#10b981',
          borderRadius: '0.5rem',
          color: '#ffffff',
          fontSize: '1rem',
          flexShrink: 0
        }}>
          <i className="fas fa-envelope"></i>
        </div>
        <div className="contatti-info-content">
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '0.25rem',
            textTransform: 'uppercase'
          }}>
            Scrivici
          </h4>
          <a
            href={`mailto:${email}`}
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#2c5282',
              textDecoration: 'none'
            }}
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}