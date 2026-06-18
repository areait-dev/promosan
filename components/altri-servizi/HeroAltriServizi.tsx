// src/components/altri-servizi/HeroAltriServizi.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export interface HeroAltriServiziProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const DEFAULT_BADGE = 'Servizi in Evoluzione';
const DEFAULT_TITLE = 'ALTRI SERVIZI';
const DEFAULT_SUBTITLE =
  "L'evoluzione continua dei servizi sanitari per rispondere alle esigenze emergenti";

export default function HeroAltriServizi({
  badge = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  backgroundImage,
}: HeroAltriServiziProps = {}) {
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
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a3650 0%, #2c5282 50%, #4299e1 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Immagine di sfondo opzionale (da WordPress) sotto il gradiente */}
      {backgroundImage && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          zIndex: 0,
        }}></div>
      )}

      {/* Overlay pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.3
      }}></div>

      {/* Contenuto hero */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        textAlign: 'center'
      }}>
        {/* Badge */}
        <div 
          data-animate="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            borderRadius: '9999px',
            color: '#ffffff',
            fontSize: '0.875rem',
            fontWeight: '600',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
          }}
        >
          <i className="fas fa-plus" style={{ fontSize: '0.75rem' }}></i>
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
            color: '#ffffff',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
            margin: '0 auto 2rem auto',
            maxWidth: '600px',
            fontSize: 'clamp(1rem, 4vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.2s'
          }}
        >
          {subtitle}
        </p>

        {/* Bottoni principali */}
        <div 
          data-animate="true"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.3s'
          }}
        >
          <Link 
            href="#servizi"
            style={{
              padding: '1rem 1.5rem',
              background: '#ffffff',
              color: '#2c5282',
              fontWeight: '700',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Scopri i servizi</span>
              <i className="fas fa-chevron-down"></i>
            </span>
          </Link>

          <Link 
            href="#contatti"
            style={{
              padding: '1rem 1.5rem',
              background: 'transparent',
              color: '#ffffff',
              fontWeight: '700',
              borderRadius: '0.75rem',
              border: '2px solid #ffffff',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#2c5282';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-envelope"></i>
              <span>Contattaci</span>
            </span>
          </Link>
        </div>

        {/* Link "Scopri di più" con animazione */}
        <div 
          data-animate="true"
          style={{
            marginTop: '2rem',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.4s'
          }}
        >
          <Link 
            href="#servizi"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            <span>Scopri di più</span>
            <div className="scroll-mouse">
              <span className="scroll-wheel" />
            </div>
          </Link>
        </div>
      </div>

      {/* Elementi decorativi */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(66, 153, 225, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(44, 82, 130, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>

      <style jsx>{`
        .scroll-mouse {
          width: 22px;
          height: 36px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          position: relative;
          margin-top: 0.5rem;
          transition: all 0.3s ease;
        }

        .scroll-wheel {
          display: block;
          width: 4px;
          height: 8px;
          background: #ffffff;
          border-radius: 2px;
          position: absolute;
          left: 50%;
          top: 6px;
          transform: translateX(-50%);
          animation: scrollWheel 1.8s ease-in-out infinite;
        }

        @keyframes scrollWheel {
          0% {
            transform: translate(-50%, 0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          50% {
            transform: translate(-50%, 8px);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 14px);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-20px, 20px) scale(1.05); }
          50% { transform: translate(20px, -20px) scale(0.95); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}