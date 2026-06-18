'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const DEFAULT_TITLE = 'I NOSTRI SERVIZI';
const DEFAULT_SUBTITLE =
  "PromoSan mette a disposizione delle aziende un'offerta completa di servizi: medicina del lavoro, welfare aziendale e medicina preventiva. La nostra unicità risiede nella flessibilità operativa: attraverso le Unità Mobili raggiungiamo le imprese ovunque si trovino, assicurando programmazione certa e risposte tempestive su tutto il territorio nazionale.";
const DEFAULT_SERVICES: Service[] = [
  {
    title: 'MEDICINA DEL LAVORO',
    description: 'Servizio completo: nomina Medico Competente (soluzioni flessibili), sorveglianza sanitaria, visite mediche, accertamenti, gestione documentale e tutti gli adempimenti normativi (Allegato 3B, riunioni periodiche).',
    image: '/assets/img/doctor-with-yellow-stethoscope.jpg',
    link: '/medicina-del-lavoro'
  },
  {
    title: 'UNITÀ MOBILI',
    description: 'Visite e accertamenti direttamente in azienda o in cantiere con cliniche su ruote attrezzate. Massima flessibilità, riduzione dei tempi e costi standardizzati.',
    image: '/assets/img/camper5.png',
    link: '/unita-mobili'
  },
  {
    title: 'WELFARE AZIENDALE',
    description: 'Pacchetti personalizzati di prevenzione e benessere (check-up, screening, programmi salute). Trasforma la tutela della salute in un vantaggio competitivo e migliora il clima aziendale.',
    image: '/assets/img/teamwork-concept.jpg',
    link: '/welfare-aziendale'
  },
  {
    title: 'ALTRI SERVIZI',
    description: 'Servizi in sviluppo: Assistenza Domiciliare Integrata (ADI) e programmi avanzati di Prevenzione della Salute per la comunità.',
    image: '/assets/img/various-applications-forming-circle-front-two-people-using-mobile-phone.jpg',
    link: '/altri-servizi'
  }
];

export default function Services({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  services = DEFAULT_SERVICES,
}: ServicesProps = {}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="section section-light" id="servizi">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>
        
        {/* Griglia servizi */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`service-card ${hoveredCard === index ? 'card-hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Immagine di sfondo */}
              <div className="card-background-container">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="card-background-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* Overlay scuro */}
              <div className="card-overlay"></div>
              
              {/* Contenuto */}
              <div className="card-content">
                <h3 className="card-title">
                  {service.title}
                </h3>
                
                <div className="card-description-container">
                  <p className="card-description">
                    {service.description}
                  </p>
                </div>
                
                <div className="card-button-container">
                  <Link 
                    href={service.link}
                    className="btn btn-small btn-white"
                  >
                    Richiedi informazioni
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          align-items: flex-start;
          margin-top: 40px;
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-card {
          position: relative;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          height: 270px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .service-card.card-hovered,
        .service-card:hover {
          height: 350px;
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: transparent;
        }

        .card-background-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease;
        }

        .service-card.card-hovered .card-background-container,
        .service-card:hover .card-background-container {
          opacity: 1;
          visibility: visible;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .service-card.card-hovered .card-overlay,
        .service-card:hover .card-overlay {
          background: linear-gradient(to bottom, rgba(26, 54, 93, 0.6) 0%, rgba(10, 21, 39, 0.9) 100%) !important;
        }

        .card-content {
          position: relative;
          z-index: 3;
          padding: 24px;
          color: #2c5282;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
          transition: all 0.3s ease;
        }

        .service-card.card-hovered .card-content,
        .service-card:hover .card-content {
          color: #ffffff;
          justify-content: space-between;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #2c5282 !important;
          transition: all 0.3s ease;
        }

        .service-card.card-hovered .card-title,
        .service-card:hover .card-title {
          color: #ffffff !important;
          margin-bottom: 12px;
        }

        .card-description-container {
          opacity: 0;
          height: 0;
          overflow: hidden;
          transition: opacity 0.3s ease, height 0.3s ease;
        }

        .service-card.card-hovered .card-description-container,
        .service-card:hover .card-description-container {
          opacity: 1;
          height: auto;
          margin-bottom: 16px;
        }

        .card-description {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .card-button-container {
          opacity: 0;
          height: 0;
          overflow: hidden;
          transition: opacity 0.3s ease, height 0.3s ease;
        }

        .service-card.card-hovered .card-button-container,
        .service-card:hover .card-button-container {
          opacity: 1;
          height: auto;
          margin-top: 12px;
        }

        .card-button-container :global(.btn) {
          background-color: #2c5282 !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 9999px !important;
          padding: 8px 20px !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          display: inline-flex !important;
          box-shadow: none !important;
          text-decoration: none !important;
          transition: background-color 0.2s ease !important;
        }

        .card-button-container :global(.btn:hover) {
          background-color: #1a365d !important;
        }
      `}</style>
    </section>
  );
}