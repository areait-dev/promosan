'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroWelfare() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animazione elementi all'avvio
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

  const scrollToContent = () => {
    const heroSection = sectionRef.current;
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      const scrollPosition = window.pageYOffset + rect.height;
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section 
        ref={sectionRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a3650 0%, #2c5282 50%, #4299e1 100%)',
          overflow: 'hidden',
          padding: '4rem 1rem'
        }}
      >
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
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '70vh',
          width: '100%'
        }}>
          {/* Badge */}
          <div 
            data-animate="true"
            style={{
              marginBottom: '2rem',
              opacity: 0,
              transform: 'translateY(-20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              color: '#ffffff',
              letterSpacing: '0.5px'
            }}>
              PromoSan • Welfare Aziendale
            </span>
          </div>

          {/* Titolo */}
          <h1 
            data-animate="true"
            style={{
              marginBottom: '2rem',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              color: '#ffffff',
              textShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: '0.2s',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            DALL'ADEMPIMENTO NORMATIVO ALL'INVESTIMENTO STRATEGICO SUL BENESSERE
          </h1>

          {/* Bottoni */}
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
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: '0.6s',
              marginBottom: '4rem'
            }}
          >
            <a 
              href="#pacchetti"
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#ffffff',
                background: '#4299e1',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#2c5282';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4299e1';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
              }}
            >
              Scopri i pacchetti
            </a>

            <a 
              href="#vantaggi"
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                background: 'transparent',
                borderRadius: '9999px',
                border: '2px solid #ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textDecoration: 'none',
                display: 'inline-block',
                backdropFilter: 'blur(4px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#2c5282';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              I vantaggi strategici
            </a>
          </div>

          {/* Scroll Indicator - Stile identico alla homepage */}
          <div className="scroll-indicator">
            <button 
              onClick={scrollToContent}
              className="scroll-link"
              aria-label="Scorri ai contenuti"
            >
              <span>Scopri di più</span>
              <i className="fas fa-chevron-down scroll-arrow" />
            </button>
          </div>
        </div>

        {/* Elementi decorativi animati */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(66, 153, 225, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(44, 82, 130, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite reverse'
        }}></div>
      </section>

      {/* Stili identici alla homepage per lo scroll indicator */}
      <style>{`
        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 4rem;
          padding-bottom: 2rem;
          width: 100%;
        }

        .scroll-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .scroll-link:hover {
          color: #ffffff;
          transform: translateY(-2px);
        }

        .scroll-arrow {
          font-size: 1.5rem;
          animation: bounceArrow 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-20px, 20px) scale(1.05); }
          50% { transform: translate(20px, -20px) scale(0.95); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }

        @keyframes bounceArrow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .scroll-link span {
            display: none;
          }

          .scroll-arrow {
            font-size: 2rem;
          }
        }

        /* Landscape mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .scroll-indicator {
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  );
}