
'use client';

import { useEffect, useRef } from 'react';
import type { PacchettoWelfare } from '../../lib/wordpress';

interface Pacchetto {
  id: string;
  name: string;
  subtitle: string;
  isPopular?: boolean;
  features: {
    text: string;
    included: boolean;
  }[];
  bgClass: string;
}

export interface PacchettiWelfareProps {
  items?: PacchettoWelfare[];
}

// Converte i dati da WordPress nella forma interna usata dal markup.
function toPacchetto(p: PacchettoWelfare): Pacchetto {
  return {
    id: String(p.id),
    name: p.name,
    subtitle: p.subtitle,
    isPopular: p.isPopular,
    features: p.features,
    // Il pacchetto "popolare" usa lo sfondo a gradiente (come nel design originale).
    bgClass: p.isPopular ? 'gradient' : 'white',
  };
}

export default function PacchettiWelfare({ items }: PacchettiWelfareProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('[data-animate="true"]');
    if (elements) {
      elements.forEach((element, index) => {
        setTimeout(() => {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
          if (element.classList.contains('animate-scale-x')) {
            (element as HTMLElement).style.transform = 'scaleX(1)';
          }
        }, index * 200);
      });
    }
  }, []);

  const DEFAULT_PACCHETTI: Pacchetto[] = [
    {
      id: 'essential',
      name: 'ESSENTIAL',
      subtitle: 'PREVENZIONE DI BASE',
      features: [
        { text: 'Check-up preventivi completi', included: true },
        { text: 'Screening cardiovascolare', included: true },
        { text: 'Telemedicina', included: true },
        { text: 'Screening oncologici', included: false },
        { text: 'Supporto psicologico', included: false },
        { text: 'Valutazioni ergonomiche', included: false }
      ],
      bgClass: 'white'
    },
    {
      id: 'business',
      name: 'BUSINESS',
      subtitle: 'PREVENZIONE COMPLETA',
      isPopular: true,
      features: [
        { text: 'Check-up preventivi completi', included: true },
        { text: 'Screening oncologici e cardiovascolari', included: true },
        { text: 'Promozione salute (alimentazione, attività fisica)', included: true },
        { text: 'Telemedicina e consulti specialistici', included: true },
        { text: 'Supporto psicologico', included: true },
        { text: 'Valutazioni ergonomiche', included: false }
      ],
      bgClass: 'gradient'
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      subtitle: 'PREVENZIONE TOTALE',
      features: [
        { text: 'Check-up preventivi completi', included: true },
        { text: 'Screening oncologici e cardiovascolari', included: true },
        { text: 'Promozione salute completa', included: true },
        { text: 'Supporto psicologico dedicato', included: true },
        { text: 'Telemedicina e consulti specialistici', included: true },
        { text: 'Programma cessazione fumo', included: true },
        { text: 'Valutazioni ergonomiche personalizzate', included: true }
      ],
      bgClass: 'white'
    }
  ];

  const pacchetti: Pacchetto[] =
    items && items.length ? items.map(toPacchetto) : DEFAULT_PACCHETTI;

  return (
    <section 
      id="pacchetti"
      ref={sectionRef}
      className="pacchetti-section"
      style={{ 
        padding: 'clamp(2rem, 5vw, 3rem) 0 clamp(3rem, 8vw, 5rem) 0',
        background: 'linear-gradient(to bottom, #eff6ff, #ffffff)',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Header Section */}
        <div style={{ marginBottom: '4rem', maxWidth: '1280px' }}>
          <h2 
            data-animate="true"
            style={{ 
              marginBottom: '1.5rem',
              fontSize: '32px',
              fontWeight: '700',
              color: '#2c5282',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.2s'
            }}
          >
            PACCHETTI SU MISURA
          </h2>

          {/* Linea decorativa */}
          <div 
            data-animate="true"
            className="animate-scale-x"
            style={{ 
              marginBottom: '2rem',
              opacity: 0,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '0.3s'
            }}
          >
            <div style={{
              width: '8rem',
              height: '0.375rem',
              background: 'linear-gradient(to right, #2c5282, rgba(44, 82, 130, 0.3))',
              borderRadius: '9999px'
            }}></div>
          </div>

          {/* Descrizione */}
          <div 
            data-animate="true"
            style={{ 
              fontSize: 'clamp(0.95rem, 3vw, 1.125rem)',
              color: '#4b5563',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.4s'
            }}
          >
            <p style={{ marginBottom: '1rem' }}>
           PromoSan progetta soluzioni personalizzate in base alle caratteristiche dell'azienda e della popolazione lavorativa, tutti i pacchetti sono personalizzabili in base alle esigenze della tua azienda.
            </p>
          </div>
        </div>

        {/* Cards Pacchetti - RESPONSIVE */}
        <div className="pacchetti-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.5rem'
        }}>
          {pacchetti.map((pacchetto, index) => (
            <div
              key={pacchetto.id}
              data-animate="true"
              className={`pacchetto-card ${pacchetto.isPopular ? 'popular' : ''}`}
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out, box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${0.5 + index * 0.1}s`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                background: pacchetto.bgClass === 'gradient' 
                  ? 'linear-gradient(to bottom, #2c5282, #4299e1)' 
                  : '#ffffff',
                borderRadius: '1.5rem',
                border: pacchetto.bgClass === 'white' ? '2px solid #f3f4f6' : 'none',
                boxShadow: pacchetto.isPopular 
                  ? '0 30px 40px -15px rgba(44, 82, 130, 0.3)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                marginTop: pacchetto.isPopular ? '-1.5rem' : '0',
                marginBottom: pacchetto.isPopular ? '1.5rem' : '0',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.75rem)';
                e.currentTarget.style.boxShadow = '0 40px 60px -15px rgba(44, 82, 130, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = pacchetto.isPopular 
                  ? '0 30px 40px -15px rgba(44, 82, 130, 0.3)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              }}
            >
              {/* Badge "PIÙ RICHIESTO" */}
              {pacchetto.isPopular && (
                <div className="popular-badge" style={{
                  position: 'absolute',
                  top: '-1.25rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '0.5rem 1.5rem',
                  background: '#ffffff',
                  borderRadius: '9999px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  fontWeight: '700',
                  color: '#2c5282',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  whiteSpace: 'nowrap',
                  zIndex: 10
                }}>
                  PIÙ RICHIESTO
                </div>
              )}

              {/* Header Card */}
              <div style={{ marginBottom: '2.5rem', marginTop: pacchetto.isPopular ? '1rem' : '0' }}>
                <h3 style={{ 
                  marginBottom: '0.5rem',
                  fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                  fontWeight: '700',
                  color: pacchetto.bgClass === 'gradient' ? '#ffffff' : '#2c5282'
                }}>
                  {pacchetto.name}
                </h3>
                <p style={{ 
                  fontWeight: '500',
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  color: pacchetto.bgClass === 'gradient' ? 'rgba(255,255,255,0.9)' : '#6b7280'
                }}>
                  {pacchetto.subtitle}
                </p>
              </div>

              {/* Lista Caratteristiche */}
              <ul style={{ 
                flexGrow: 1,
                marginBottom: '2.5rem'
              }}>
                {pacchetto.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    style={{ 
                      marginBottom: idx < pacchetto.features.length - 1 ? '1rem' : '0',
                      color: pacchetto.bgClass === 'gradient' 
                        ? feature.included ? '#ffffff' : 'rgba(255,255,255,0.4)'
                        : feature.included ? '#374151' : '#9ca3af',
                      opacity: feature.included ? 1 : 0.5,
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                    }}
                  >
                    • {feature.text}
                  </li>
                ))}
              </ul>

              {/* Bottone */}
              <a 
                href="#contatti"
                className="pacchetto-button"
                style={{
                  display: 'block',
                  padding: '1rem',
                  width: '100%',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '0.75rem',
                  border: pacchetto.bgClass === 'gradient' ? 'none' : '2px solid #2c5282',
                  background: pacchetto.bgClass === 'gradient' ? '#ffffff' : 'transparent',
                  color: pacchetto.bgClass === 'gradient' ? '#2c5282' : '#2c5282',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                }}
                onMouseEnter={(e) => {
                  if (pacchetto.bgClass === 'gradient') {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  } else {
                    e.currentTarget.style.background = '#2c5282';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  if (pacchetto.bgClass === 'gradient') {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1)';
                  } else {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#2c5282';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Richiedi preventivo
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-scale-x[data-animate="true"] {
          transform: scaleX(1) !important;
        }

        /* Tablet: 2 colonne */
        @media (max-width: 1024px) {
          .pacchetti-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
          
          .pacchetto-card.popular {
            order: -1; /* La card popolare va in cima */
          }
        }

        /* Mobile: 1 colonna */
        @media (max-width: 768px) {
          .pacchetti-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .pacchetto-card {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          
          .pacchetto-card.popular {
            order: -1;
          }
          
          .popular-badge {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 1.5rem !important;
            width: fit-content !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          .pacchetto-card.popular .popular-badge {
            margin-bottom: 1rem !important;
          }
        }

        /* Tablet e mobile: ripristino margin per card popolare */
        @media (max-width: 1024px) {
          .pacchetto-card.popular {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}