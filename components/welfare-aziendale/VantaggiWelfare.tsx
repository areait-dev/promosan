// src/components/welfare-aziendale/VantaggiWelfare.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import promoSanLogo from '../../public/assets/img/PromoSan_white.png';

interface Vantaggio {
  id: number;
  title: string;
  description: string;
}

export default function VantaggiWelfare() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-animate="true"]');
    if (cards) {
      cards.forEach((card, index) => {
        setTimeout(() => {
          (card as HTMLElement).style.opacity = '1';
          (card as HTMLElement).style.transform = 'translateY(0)';
        }, index * 150);
      });
    }

    // Animazione per la citazione finale
    const quote = sectionRef.current?.querySelector('[data-animate-quote="true"]');
    if (quote) {
      setTimeout(() => {
        (quote as HTMLElement).style.opacity = '1';
        (quote as HTMLElement).style.transform = 'translateY(0)';
      }, 800);
    }
  }, []);

  const vantaggi: Vantaggio[] = [
    {
      id: 1,
      title: "MIGLIORAMENTO DEL CLIMA AZIENDALE",
      description: "Il welfare contribuisce a creare un ambiente di lavoro più sereno e collaborativo."
    },
    {
      id: 2,
      title: "AUMENTO DELLA PRODUTTIVITÀ",
      description: "Dipendenti soddisfatti sono più motivati e produttivi."
    },
    {
      id: 3,
      title: "RIDUZIONE DEL TURNOVER",
      description: "Minore turnover del personale grazie a maggior senso di appartenenza."
    },
    {
      id: 4,
      title: "VANTAGGI FISCALI",
      description: "Detrazioni fiscali per l'azienda e vantaggi in busta paga per i dipendenti."
    },
    {
      id: 5,
      title: "MIGLIORAMENTO DELL'IMMAGINE AZIENDALE",
      description: "L'azienda si posiziona come datore di lavoro responsabile e attrattivo."
    },
    {
      id: 6,
      title: "MAGGIORE ATTRATTIVITÀ PER I TALENTI",
      description: "Strumento strategico per attrarre nuovi talenti in un mercato competitivo."
    }
  ];

  return (
    <section 
      id="vantaggi"
      ref={sectionRef}
      className="vantaggi-welfare-section"
      style={{ 
        padding: 'clamp(3rem, 8vw, 5rem) 0',
        background: 'linear-gradient(to bottom, #ffffff, #eff6ff)',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Titolo */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h2 
            data-animate="true"
            style={{ 
              marginBottom: '1rem',
              fontSize: '32px',
              fontWeight: '700',
              color: '#2c5282',
              textAlign: 'left',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            I VANTAGGI STRATEGICI
          </h2>
          <p 
            data-animate="true"
            style={{ 
              fontSize: 'clamp(0.95rem, 3vw, 1.125rem)',
              color: '#2C5282',
              textAlign: 'left',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.1s'
            }}
          >
           INVESTIRE NEL WELFARE AZIENDALE SIGNIFICA:
          </p>
        </div>

        {/* Griglia vantaggi - RESPONSIVE */}
        <div className="vantaggi-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {vantaggi.map((vantaggio, index) => (
            <div
              key={vantaggio.id}
              data-animate="true"
              className="vantaggio-card"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out, box-shadow 0.5s ease',
                transitionDelay: `${0.2 + index * 0.1}s`
              }}
            >
              <div style={{
                padding: 'clamp(1.25rem, 3vw, 1.5rem)',
                background: '#ffffff',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.25rem)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
              >
                <h3 style={{ 
                  marginBottom: '0.75rem',
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  fontWeight: '700',
                  color: '#2c5282',
                  lineHeight: '1.4'
                }}>
                  {vantaggio.title}
                </h3>
                <p style={{ 
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                }}>
                  {vantaggio.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Citazione finale - OTTIMIZZATA PER MOBILE */}
        <div 
          data-animate-quote="true"
          className="quote-box"
          style={{ 
            marginTop: 'clamp(3rem, 8vw, 5rem)',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            background: 'linear-gradient(to right, #2c5282, #4299e1)',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
          }}
        >
          <div className="quote-content" style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div className="quote-logo" style={{ 
              marginRight: '2rem',
              flexShrink: 0
            }}>
              <Image 
                src={promoSanLogo}
                alt="PromoSan Logo"
                width={120}
                height={40}
                style={{
                  width: 'auto',
                  height: 'clamp(2.5rem, 5vw, 3rem)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
            </div>
            <div className="quote-text" style={{ flex: 1 }}>
              <blockquote style={{
                fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                fontStyle: 'italic',
                color: '#ffffff',
                lineHeight: '1.6',
                margin: 0
              }}>
                La prevenzione diventa così uno strumento di gestione strategica delle risorse umane, in cui la salute è un asset aziendale che genera valore condiviso per l'impresa e per chi lavora.
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        /* Tablet: 2 colonne */
        @media (max-width: 1024px) {
          .vantaggi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }

        /* Mobile: 1 colonna */
        @media (max-width: 768px) {
          .vantaggi-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .vantaggio-card {
            width: 100% !important;
          }
          
          /* Ottimizzazione citazione per mobile */
          .quote-content {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem !important;
          }
          
          .quote-logo {
            margin-right: 0 !important;
            margin-bottom: 0.5rem !important;
          }
          
          .quote-logo img {
            height: 2.5rem !important;
          }
          
          .quote-text blockquote {
            font-size: 1rem !important;
            text-align: center !important;
          }
        }

        @media (max-width: 480px) {
          .quote-box {
            padding: 1.25rem !important;
          }
          
          .quote-logo img {
            height: 2rem !important;
          }
          
          .quote-text blockquote {
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </section>
  );
}