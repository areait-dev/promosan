'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function VantaggiUnitaMobili() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Seleziono tutte le card che hanno l'attributo data-animate
    const cards = sectionRef.current?.querySelectorAll('[data-animate="true"]');
    if (cards) {
      cards.forEach((card, index) => {
        (card as HTMLElement).style.transitionDelay = `${(index + 1) * 0.1}s`;
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = index === 2 
          ? 'scale(1.05)' 
          : 'translateY(0)';
      });
    }

    // Aggiungo osservatore per animazioni allo scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );

    const animateCards = sectionRef.current?.querySelectorAll('.card-hover-animation');
    animateCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const vantaggi = [
    {
      id: 1,
      title: "RIDUZIONE DEI TEMPI",
      description: "I lavoratori non devono spostarsi, eliminando <strong>tempi di viaggio e attese</strong>.",
      isCentral: false
    },
    {
      id: 2,
      title: "COSTI STANDARDIZZATI",
      description: "<strong>Tariffe uniformi su tutto il territorio</strong>, indipendentemente dalla localizzazione.",
      isCentral: false
    },
    {
      id: 3,
      title: "ACCESSIBILITÀ TERRITORIALE",
      description: "Possibilità di raggiungere <strong>cantieri, siti produttivi e aree interne</strong> anche in zone remote.",
      isCentral: true
    },
    {
      id: 4,
      title: "FLESSIBILITÀ ORGANIZZATIVA",
      description: "<strong>Programmazione personalizzata</strong> in base alle esigenze produttive aziendali.",
      isCentral: false
    },
    {
      id: 5,
      title: "CONTINUITÀ OPERATIVA",
      description: "<strong>Minore impatto sull'attività lavorativa</strong> quotidiana.",
      isCentral: false
    }
  ];

  return (
    <section 
      id="vantaggi" 
      ref={sectionRef}
      style={{ 
        overflow: 'hidden', 
        padding: '5rem 0', 
        background: 'linear-gradient(to bottom, #ffffff, #eff6ff)' 
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div 
          data-animate="true"
          style={{ 
            marginBottom: '4rem', 
            textAlign: 'left',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.7s ease-out'
          }}
        >
          <h2 style={{ 
            marginBottom: '1rem', 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: '#2c5282',
            position: 'relative',
            display: 'inline-block'
          }}>
            I VANTAGGI PER LA TUA AZIENDA
            <span style={{
              position: 'absolute',
              bottom: '-0.5rem',
              left: '0',
              width: '0',
              height: '0.25rem',
              background: 'linear-gradient(to right, #2c5282, #4299e1)',
              borderRadius: '9999px',
              animation: 'expandWidth 0.8s ease-out forwards',
              animationDelay: '0.3s'
            }}></span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>
            Il servizio con Unità Mobili offre significativi benefici alle aziende:
          </p>
        </div>

        {/* Grid vantaggi - 5 colonne */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '1rem' 
        }}>
          {vantaggi.map((vantaggio, index) => (
            <div
              key={vantaggio.id}
              data-animate="true"
              className="card-hover-animation"
              style={{
                opacity: 0,
                transform: vantaggio.isCentral ? 'scale(0.95)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out',
                transitionDelay: `${(index + 1) * 0.1}s`,
                zIndex: vantaggio.isCentral ? '10' : 'auto'
              }}
            >
              <div
                className="vantaggio-card"
                style={{
                  position: 'relative',
                  padding: '1.5rem',
                  height: '100%',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: vantaggio.isCentral 
                    ? 'linear-gradient(135deg, #2c5282, #4299e1)' 
                    : '#ffffff',
                  color: vantaggio.isCentral ? '#ffffff' : '#1f2937',
                  transform: vantaggio.isCentral ? 'scale(1.05)' : 'scale(1)',
                  animation: vantaggio.isCentral ? 'gentlePulse 3s ease-in-out infinite' : 'none'
                }}
              >
                {/* Numero con animazione leggera */}
                <div 
                  className="numero-animato"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                    width: '3.5rem',
                    height: '3.5rem',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    borderRadius: '0.75rem',
                    background: vantaggio.isCentral 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'linear-gradient(135deg, #2c5282, #4299e1)',
                    color: '#ffffff',
                    transition: 'all 0.3s ease',
                    animation: `gentlePulse 2s ease-in-out ${index * 0.2}s infinite`
                  }}
                >
                  {vantaggio.id}
                </div>

                {/* Titolo */}
                <h3 
                  className="titolo-card"
                  style={{ 
                    marginBottom: '0.75rem', 
                    fontSize: '1.25rem', 
                    fontWeight: '700',
                    color: vantaggio.isCentral ? '#ffffff' : '#2c5282',
                    minHeight: '3rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {vantaggio.title}
                </h3>

                {/* Descrizione */}
                <p 
                  className="descrizione-card"
                  style={{ 
                    flexGrow: 1, 
                    lineHeight: '1.625',
                    color: vantaggio.isCentral ? 'rgba(255, 255, 255, 0.9)' : '#4b5563',
                    transition: 'all 0.3s ease'
                  }}
                  dangerouslySetInnerHTML={{ __html: vantaggio.description }}
                />

                {/* Effetto hover leggero - bordo sottile */}
                <span className="card-border-effect" style={{
                  position: 'absolute',
                  inset: '0',
                  borderRadius: '1rem',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none'
                }}></span>
              </div>
            </div>
          ))}
        </div>

        {/* Box PromoSan con animazione minima */}
        <div 
          data-animate="true"
          style={{ 
            marginTop: '5rem', 
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.7s ease-out',
            transitionDelay: '0.6s'
          }}
        >
          <div style={{
            overflow: 'hidden',
            position: 'relative',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, #ffffff, #f0f7ff)',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s ease',
            border: '1px solid rgba(66, 153, 225, 0.1)'
          }}>
            {/* Effetto sfondo molto leggero */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(66, 153, 225, 0.03) 0%, transparent 60%)',
              animation: 'gentlePulse 4s ease-in-out infinite'
            }}></div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: '10'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <Image 
                  src="/assets/img/download-removebg-preview.png"
                  alt="PromoSan Logo"
                  width={150}
                  height={48}
                  style={{
                    objectFit: 'contain',
                    transition: 'opacity 0.3s ease',
                    filter: 'drop-shadow(0 5px 10px rgba(44, 82, 130, 0.1))'
                  }}
                />
              </div>
              <div style={{ flexGrow: 1, textAlign: 'center' }}>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#1f2937',
                  lineHeight: '1.8',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  Garantisce copertura capillare del territorio nazionale attraverso le proprie Unità Mobili, assicurando <strong style={{ 
                    color: '#2c5282',
                    position: 'relative',
                    display: 'inline-block',
                    fontWeight: '700'
                  }}>
                    standard qualitativi elevati e conformità normativa
                    <span style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(to right, #2c5282, #4299e1)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      animation: 'expandWidth 0.5s ease-out forwards',
                      animationDelay: '0.8s'
                    }}></span>
                  </strong> ovunque sia necessario il servizio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stili animazioni globali */}
      <style jsx>{`
        @keyframes expandWidth {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.95;
            transform: scale(1.02);
          }
        }
        
        /* Hover effetti */
        .vantaggio-card:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 30px -10px rgba(44, 82, 130, 0.2);
        }
        
        .vantaggio-card:hover .numero-animato {
          transform: scale(1.1) rotate(2deg);
          background: linear-gradient(135deg, #3182ce, #2c5282);
        }
        
        .vantaggio-card:hover .titolo-card {
          color: #2b6cb0;
          transform: translateX(3px);
        }
        
        .vantaggio-card:hover .descrizione-card {
          color: #1f2937;
        }
        
        .vantaggio-card:hover .card-border-effect {
          border-color: rgba(66, 153, 225, 0.3);
        }
        
        /* Animazione allo scroll */
        .card-hover-animation {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Effetto per card centrale */
        [class*="vantaggio-card"][style*="scale(1.05)"]:hover {
          transform: scale(1.08) translateY(-2px) !important;
        }
      `}</style>
    </section>
  );
}