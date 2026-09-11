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

const interiorImages = ['/assets/img/camper1.jpg', '/assets/img/camper2.jpg', '/assets/img/camper3.jpg'];

const caratteristiche: Caratteristica[] = [
  {
    id: 1,
    title: 'STRUTTURA',
    items: ['Saletta accettazione', 'Saletta medica completa'],
  },
  {
    id: 2,
    title: 'TECNOLOGIA',
    items: ['Strumentazioni moderne', 'Sistema endoscopico'],
  },
  {
    id: 3,
    title: 'SERVIZI EROGATI',
    items: ['Visite mediche specialistiche', 'Accertamenti diagnostici', 'Esami ematochimici'],
  },
];

export default function CaratteristicheServizio({
  title = DEFAULT_TITLE,
  intro = DEFAULT_INTRO,
}: CaratteristicheServizioProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

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

  useEffect(() => {
    if (isPaused || interiorImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-white to-blue-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="mb-6 text-left text-3xl font-bold text-primary">{title}</h2>
        </div>

        <p
          className="mb-12 text-lg leading-relaxed text-gray-600"
          dangerouslySetInnerHTML={{ __html: intro }}
        />

        {/* Testo brevetto */}
        <div
          className="animate-on-load mb-10 max-w-none opacity-0 transition-all duration-700 ease-out"
          style={{ transform: 'translateY(20px)', transitionDelay: '0.1s' }}
        >
          <h4 className="mb-4 text-left text-xl font-bold text-primary">
            UNITÀ MOBILE DI TELEMEDICINA BREVETTATA
          </h4>
          <p className="text-gray-600">
            <strong className="text-primary">PromoSan detiene il brevetto</strong> per l&apos;Unità
            Mobile di Telemedicina sul Lavoro, un&apos;innovazione all&apos;avanguardia che anticipa le
            evoluzioni future nel settore della Medicina del Lavoro.
          </p>
        </div>

        {/* Slider immagini largo */}
        {interiorImages.length > 0 && (
          <div
            className="slider-modern relative mb-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="tab-image-wrap group relative w-full overflow-hidden rounded-2xl bg-gray-900 shadow-xl">
              <div
                className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {interiorImages.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Interno unità mobile - vista ${idx + 1}`}
                    className="h-full w-full flex-shrink-0 object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 right-4 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                {currentIndex + 1} / {interiorImages.length}
              </span>

              {interiorImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 text-primary opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100"
                    aria-label="Immagine precedente"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 text-primary opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:opacity-100"
                    aria-label="Immagine successiva"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {interiorImages.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {interiorImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-7 bg-primary' : 'w-2 bg-gray-300 hover:bg-secondary/60'
                    }`}
                    aria-label={`Vai all'immagine ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sezione "CARATTERISTICHE DELL'UNITÀ MOBILE" a card */}
        <div id="caratteristiche-unita-mobile" className="mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-primary">
            CARATTERISTICHE DELL&apos;UNITÀ MOBILE
          </h2>
          <div className="mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-secondary to-primary" />

          <div className="caratteristiche-grid">
            {caratteristiche.map((cat) => (
              <div
                key={cat.id}
                className="animate-on-load opacity-0 transition-all duration-700 ease-out"
                style={{ transform: 'translateY(20px)', transitionDelay: `${(cat.id + 1) * 0.1}s` }}
              >
                <div className="h-full rounded-xl border border-secondary/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <h4 className="mb-4 text-left text-xl font-bold text-primary">{cat.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-3 mt-2 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-lg leading-tight text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Due card finali */}
        <div className="finali-grid">
          {[0, 1].map((_, index) => (
            <div
              key={index}
              className="animate-on-load opacity-0 transition-all duration-700 ease-out"
              style={{ transform: 'translateY(20px)', transitionDelay: `${(index + 4) * 0.15}s` }}
            >
              <div className="flex h-full flex-col rounded-xl bg-white p-8 shadow-lg transition-all duration-300">
                <h4 className="mb-4 w-full text-left text-xl font-bold text-primary transition-colors duration-300">
                  {index === 0 ? 'SOLUZIONE FLESSIBILE' : 'EFFICIENZA OPERATIVA'}
                </h4>
                <p className="text-left text-gray-600">
                  {index === 0 ? (
                    <>
                      Particolarmente indicata per{' '}
                      <strong className="text-primary transition-colors duration-300">
                        aziende con sedi distribuite
                      </strong>{' '}
                      sul territorio, cantieri temporanei, stabilimenti in aree remote.
                    </>
                  ) : (
                    <>
                      Soluzione ideale per situazioni in cui è necessario{' '}
                      <strong className="text-primary transition-colors duration-300">
                        minimizzare l&apos;interruzione dell&apos;attività lavorativa
                      </strong>{' '}
                      ed eliminare la necessità di spostamenti.
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tab-image-wrap {
          aspect-ratio: 21 / 9;
        }

        @media (max-width: 640px) {
          .tab-image-wrap {
            aspect-ratio: 16 / 9;
          }
        }

        .caratteristiche-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .finali-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
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
