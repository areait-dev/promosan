// src/components/welfare-aziendale/CtaWelfare.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CtaWelfare() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 0',
        background: 'linear-gradient(to right, #2c5282, #4299e1)'
      }}
    >
      {/* Pattern decorativo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '10rem',
          height: '10rem',
          border: '2px solid #ffffff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}></div>
        <div style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '15rem',
          height: '15rem',
          border: '2px solid #ffffff',
          borderRadius: '50%',
          transform: 'translate(33%, 33%)'
        }}></div>
      </div>

      {/* Contenuto */}
      <div style={{
        position: 'relative',
        maxWidth: '56rem',
        margin: '0 auto',
        padding: '0 1rem',
        textAlign: 'center'
      }}>
        <h2 
          data-animate="true"
          style={{ 
            marginBottom: '1.5rem',
            fontSize: 'clamp(1.575rem, 5vw, 2.25rem)',
            fontWeight: '700',
            color: '#ffffff',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
          }}
        >
          PRONTO A TRASFORMARE IL TUO BENESSERE IN VALORE?
        </h2>

        <p 
          data-animate="true"
          style={{ 
            marginBottom: '2.5rem',
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.9)',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.2s'
          }}
        >
          Contattaci per una consulenza personalizzata sui pacchetti welfare
        </p>

        <Link 
          href="/contatti"
          data-animate="true"
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            fontSize: '1.125rem',
            fontWeight: '700',
            background: '#ffffff',
            color: '#2c5282',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: 0,
            transform: 'translateY(20px)',
            transitionDelay: '0.4s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Richiedi un preventivo
        </Link>
      </div>

      {/* Elementi decorativi aggiuntivi */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>
    </section>
  );
}