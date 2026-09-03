'use client';

import React, { useEffect, useRef } from 'react';

export interface HeroWelfareProps {
  badge?: string;
  title?: string;
  btn1Label?: string;
  btn1Link?: string;
  btn2Label?: string;
  btn2Link?: string;
  backgroundImage?: string;
}

const DEFAULT_BADGE = 'PromoSan • Welfare Aziendale';
const DEFAULT_TITLE = "DALL'ADEMPIMENTO NORMATIVO ALL'INVESTIMENTO STRATEGICO SUL BENESSERE";
const DEFAULT_BTN1_LABEL = 'Scopri i pacchetti';
const DEFAULT_BTN1_LINK = '#pacchetti';
const DEFAULT_BTN2_LABEL = 'I vantaggi strategici';
const DEFAULT_BTN2_LINK = '#vantaggi';

export default function HeroWelfare({
  badge = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  btn1Label = DEFAULT_BTN1_LABEL,
  btn1Link = DEFAULT_BTN1_LINK,
  btn2Label = DEFAULT_BTN2_LABEL,
  btn2Link = DEFAULT_BTN2_LINK,
  backgroundImage,
}: HeroWelfareProps = {}) {
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: backgroundImage
            ? undefined
            : 'linear-gradient(135deg, #1a3650 0%, #2c5282 50%, #4299e1 100%)',
          overflow: 'hidden',
          padding: '4rem 1rem'
        }}
        className="hero-servizio"
      >
        {/* Immagine di sfondo opzionale (da WordPress), con tint gradiente semi-trasparente sopra */}
        {backgroundImage && (
          <>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}></div>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(26,54,80,0.55) 0%, rgba(44,82,130,0.5) 50%, rgba(66,153,225,0.45) 100%)',
              zIndex: 1,
            }}></div>
          </>
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
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
              {badge}
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
            {title}
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
              href={btn1Link}
              style={{
                padding: '0.7rem 1.6rem',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: '#ffffff',
                background: '#4299e1',
                borderRadius: '14px',
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
              {btn1Label}
            </a>

            <a
              href={btn2Link}
              style={{
                padding: '0.7rem 1.6rem',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                background: 'transparent',
                borderRadius: '14px',
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
              {btn2Label}
            </a>
          </div>

          {/* Scroll Indicator - Stile identico alla homepage */}
          <div className="scroll-indicator">
            <button
              onClick={scrollToContent}
              className="scroll-link"
              aria-label="Scorri per saperne di più"
            >
              <span aria-hidden="true">Scorri per saperne di più</span>
              <div className="scroll-mouse">
                <span className="scroll-wheel" />
              </div>
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

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-20px, 20px) scale(1.05); }
          50% { transform: translate(20px, -20px) scale(0.95); }
          75% { transform: translate(20px, 20px) scale(1.05); }
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

        /* Mobile */
        @media (max-width: 480px) {
          .scroll-link span {
            display: none;
          }
        }

        /* Landscape mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .scroll-indicator {
            margin-top: 2rem;
          }
        }

        .hero-servizio {
          min-height: 45vh;
          min-height: 45svh;
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-servizio {
            min-height: 65vh;
            min-height: 65svh;
          }
        }

        @media (min-width: 1024px) {
          .hero-servizio {
            min-height: 80vh;
            min-height: 80svh;
            max-height: 1000px;
          }
        }
      `}</style>
    </>
  );
}