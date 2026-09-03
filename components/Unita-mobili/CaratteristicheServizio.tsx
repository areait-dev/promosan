'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Caratteristica {
  id: number;
  title: string;
  items: string[];
}

export interface CaratteristicheServizioProps {
  title?: string;
  intro?: string; // HTML
}

const DEFAULT_TITLE = 'CARATTERISTICHE DEL SERVIZIO';
const DEFAULT_INTRO =
  '<strong style="color: #2c5282">PromoSan</strong> dispone di Unità Mobili attrezzate per lo svolgimento completo delle visite mediche di medicina del lavoro, portando il servizio direttamente presso le sedi aziendali, i cantieri e i centri operativi dislocati sul territorio.';

export default function CaratteristicheServizio({
  title = DEFAULT_TITLE,
  intro = DEFAULT_INTRO,
}: CaratteristicheServizioProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Modifica i percorsi con le tue immagini reali
  const interiorImages = [
    '../../assets/img/camper1.jpg',
    '../../assets/img/camper2.jpg',
    '../../assets/img/camper3.jpg',
  ];
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.animate-on-load');
    if (cards) {
      cards.forEach((card, index) => {
        (card as HTMLElement).style.transitionDelay = `${(index + 1) * 0.15}s`;
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      });
    }
  }, []);

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev === 0 ? interiorImages.length - 1 : prev - 1));
  };

  const caratteristiche: Caratteristica[] = [
    {
      id: 1,
      title: "STRUTTURA",
      items: ["Saletta accettazione", "Saletta medica completa"]
    },
    {
      id: 2,
      title: "TECNOLOGIA",
      items: ["Strumentazioni moderne", "Sistema endoscopico"]
    },
    {
      id: 3,
      title: "SERVIZI EROGATI",
      items: ["Visite mediche specialistiche", "Accertamenti diagnostici", "Esami ematochimici"]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      style={{ 
        padding: '6rem 0', 
        background: 'linear-gradient(to bottom, #ffffff, #eff6ff)',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ 
            marginBottom: '1.5rem', 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: '#2c5282',
            textAlign: 'left'
          }}>
            {title}
          </h3>
        </div>

        <p
          style={{
            marginBottom: '3rem',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            color: '#4b5563',
          }}
          dangerouslySetInnerHTML={{ __html: intro }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Card principale */}
          <div 
            className="animate-on-load"
            style={{
              opacity: '0',
              transform: 'translateY(20px)',
              transition: 'all 0.7s ease-out',
              transitionDelay: '0.1s'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              background: '#ffffff',
              borderRadius: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.5s ease'
            }}>
              <h4 style={{ 
                marginBottom: '1rem', 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: '#2c5282',
                textAlign: 'left'
              }}>
                UNITÀ MOBILE DI TELEMEDICINA BREVETTATA
              </h4>

              <div style={{ marginBottom: '2.5rem', color: '#4b5563' }}>
                <p>
                  <strong style={{ color: '#2c5282' }}>PromoSan detiene il brevetto</strong> per l'Unità Mobile di Telemedicina sul Lavoro, un'innovazione all'avanguardia che anticipa le evoluzioni future nel settore della Medicina del Lavoro.
                </p>
              </div>

              {/* Slider interno */}
              {interiorImages.length > 0 && (
                <div style={{ 
                  position: 'relative', 
                  margin: '0 auto 2.5rem auto', 
                  width: '100%', 
                  maxWidth: '768px' 
                }}>
                  <div style={{
                    overflow: 'hidden',
                    background: '#f3f4f6',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    aspectRatio: '16/9'
                  }}>
                    <img
                      src={interiorImages[currentIndex]}
                      alt={`Interno unità mobile - vista ${currentIndex + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Pulsanti freccia */}
                  {interiorImages.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        style={{
                          position: 'absolute',
                          left: '0.5rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 10,
                          padding: '0.5rem',
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(4px)',
                          border: 'none',
                          borderRadius: '9999px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        aria-label="Immagine precedente"
                      >
                        <ChevronLeft size={16} style={{ color: '#2c5282' }} />
                      </button>
                      <button
                        onClick={nextSlide}
                        style={{
                          position: 'absolute',
                          right: '0.5rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 10,
                          padding: '0.5rem',
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(4px)',
                          border: 'none',
                          borderRadius: '9999px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        aria-label="Immagine successiva"
                      >
                        <ChevronRight size={16} style={{ color: '#2c5282' }} />
                      </button>

                      {/* Indicatori */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '0.75rem', 
                        gap: '0.375rem' 
                      }}>
                        {interiorImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            style={{
                              width: '0.625rem',
                              height: '0.625rem',
                              padding: 0,
                              border: 'none',
                              borderRadius: '9999px',
                              background: idx === currentIndex ? '#2c5282' : '#d1d5db',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease'
                            }}
                            aria-label={`Vai all'immagine ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Sezione "CARATTERISTICHE DELL'UNITÀ MOBILE" - ORIZZONTALE */}
              <div id="caratteristiche-unita-mobile" style={{ marginTop: '2.5rem' }}>
                <h2 style={{ 
                  marginBottom: '1rem', 
                  fontSize: '1.875rem', 
                  fontWeight: '700', 
                  lineHeight: '1.25',
                  color: '#2c5282'
                }}>
                  CARATTERISTICHE DELL'UNITÀ MOBILE
                </h2>
                <div style={{ 
                  marginBottom: '1.5rem', 
                  width: '6rem', 
                  height: '0.25rem', 
                  background: 'linear-gradient(to right, #4299e1, #2c5282)',
                  borderRadius: '9999px'
                }}></div>

                {/* Grid ORIZZONTALE a 3 colonne, responsive sotto */}
                <div className="caratteristiche-grid">
                  {caratteristiche.map((cat) => (
                    <div
                      key={cat.id}
                      className="animate-on-load"
                      style={{
                        opacity: '0',
                        transform: 'translateY(20px)',
                        transition: 'all 0.7s ease-out',
                        transitionDelay: `${(cat.id + 1) * 0.1}s`
                      }}
                    >
                      <div style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(to bottom, #ffffff, rgba(66, 153, 225, 0.05))',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(66, 153, 225, 0.2)',
                        transition: 'all 0.3s ease',
                        height: '100%'
                      }}>
                        <h4 style={{ 
                          marginBottom: '1rem', 
                          fontSize: '1.125rem', 
                          fontWeight: '700', 
                          color: '#2c5282',
                          textAlign: 'left'
                        }}>
                          {cat.title}
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {cat.items.map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <span style={{
                                display: 'inline-block',
                                flexShrink: 0,
                                marginTop: '0.5rem',
                                marginRight: '0.75rem',
                                width: '0.625rem',
                                height: '0.625rem',
                                borderRadius: '9999px',
                                background: '#2c5282'
                              }}></span>
                              <span style={{ 
                                fontSize: '1.125rem', 
                                lineHeight: '1.25', 
                                color: '#4b5563' 
                              }}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Due card finali - ORIZZONTALI, responsive sotto */}
          <div className="finali-grid">
            {[0, 1].map((_, index) => (
              <div
                key={index}
                className="animate-on-load"
                style={{
                  opacity: '0',
                  transform: 'translateY(20px)',
                  transition: 'all 0.7s ease-out',
                  transitionDelay: `${(index + 4) * 0.15}s`
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem',
                  background: '#ffffff',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}>
                  <h4 style={{ 
                    marginBottom: '1rem', 
                    width: '100%', 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    color: '#2c5282',
                    textAlign: 'left',
                    transition: 'color 0.3s ease'
                  }}>
                    {index === 0 ? 'SOLUZIONE FLESSIBILE' : 'EFFICIENZA OPERATIVA'}
                  </h4>
                  <p style={{ 
                    textAlign: 'left', 
                    color: '#4b5563' 
                  }}>
                    {index === 0 ? (
                      <>
                        Particolarmente indicata per <strong style={{ color: '#2c5282', transition: 'color 0.3s ease' }}>aziende con sedi distribuite</strong> sul territorio, cantieri temporanei, stabilimenti in aree remote.
                      </>
                    ) : (
                      <>
                        Soluzione ideale per situazioni in cui è necessario <strong style={{ color: '#2c5282', transition: 'color 0.3s ease' }}>minimizzare l'interruzione dell'attività lavorativa</strong> ed eliminare la necessità di spostamenti.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .caratteristiche-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .finali-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .caratteristiche-grid {
            grid-template-columns: 1fr;
          }

          .finali-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}