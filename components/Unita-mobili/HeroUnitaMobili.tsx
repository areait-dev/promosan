'use client';

import Image from 'next/image';

export interface HeroUnitaMobiliProps {
  badge?: string;
  title?: string;
  btn1Label?: string;
  btn1Link?: string;
  btn2Label?: string;
  btn2Link?: string;
  backgroundImage?: string;
}

const DEFAULT_BADGE = 'Unità mobili';
const DEFAULT_TITLE = 'PORTIAMO LA MEDICINA DEL LAVORO DIRETTAMENTE DOVE LAVORI';
const DEFAULT_BTN1_LABEL = 'Scopri i vantaggi';
const DEFAULT_BTN1_LINK = '#vantaggi';
const DEFAULT_BTN2_LABEL = 'Come funziona';
const DEFAULT_BTN2_LINK = '#caratteristiche-unita-mobile';

export default function HeroUnitaMobili({
  badge = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  btn1Label = DEFAULT_BTN1_LABEL,
  btn1Link = DEFAULT_BTN1_LINK,
  btn2Label = DEFAULT_BTN2_LABEL,
  btn2Link = DEFAULT_BTN2_LINK,
  backgroundImage = '/assets/img/camper5.png',
}: HeroUnitaMobiliProps = {}) {
  const scrollToContent = () => {
    const heroSection = document.querySelector('section');
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
    <section style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1rem',
      color: '#ffffff',
      overflow: 'hidden'
    }} className="hero-servizio">
      {/* IMMAGINE DI BACKGROUND */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '0'
      }}>
        <Image
          src={backgroundImage}
          alt="Unità mobili background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          priority
        />
        {/* Overlay scuro per leggibilità testo */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(44, 82, 130, 0.5) 0%, rgba(66, 153, 225, 0.4) 100%)'
        }}></div>
      </div>

      {/* Pattern puntinato sopra l'immagine */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: '0.3',
        pointerEvents: 'none',
        zIndex: '1'
      }}></div>

      {/* Contenuto */}
      <div style={{
        position: 'relative',
        zIndex: '10',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            gap: '0.5rem',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#ffffff',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(4px)'
          }}>
            <span>{badge}</span>
          </div>
          
          {/* Titolo */}
          <h1 style={{
            maxWidth: '896px',
            margin: '0 auto 2rem',
            fontFamily: "'Titillium Web', sans-serif",
            fontSize: '2.25rem',
            fontWeight: '700',
            lineHeight: '1.25',
            color: '#ffffff',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            {title}
          </h1>
          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <a
              href={btn1Link}
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.6rem',
                fontWeight: '700',
                color: '#ffffff',
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                backgroundColor: '#3182ce',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#2c5282';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3182ce';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {btn1Label}
            </a>

            <a
              href={btn2Link}
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.6rem',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '14px',
                border: '2px solid #ffffff',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                backgroundColor: 'transparent',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#2c5282';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {btn2Label}
            </a>
          </div>

          {/* Scroll Indicator - Con testo e freccia più in basso */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '6rem',
              paddingBottom: '2rem',
              width: '100%'
            }}
          >
            <button 
              onClick={scrollToContent}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                transition: 'all 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Scorri per saperne di più</span>
              <div className="scroll-mouse">
                <span className="scroll-wheel" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Animazione keyframes */}
      <style>{`
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
        
        @media (max-width: 480px) {
          button span {
            display: none;
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
    </section>
  );
}