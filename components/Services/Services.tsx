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
    </section>
  );
}