// src/components/altri-servizi/ServiziInSviluppo.tsx
'use client';

import { useEffect, useRef } from 'react';
import CardServizio from './CardServizio';
import FocusGrid from './FocusGrid';

export interface ServiziInSviluppoProps {
  badge?: string;
  title?: string;
  intro?: string; // HTML
  focusItems?: string[];
}

const DEFAULT_BADGE = 'INNOVAZIONE IN CORSO';
const DEFAULT_TITLE = 'SERVIZI IN SVILUPPO';
const DEFAULT_INTRO =
  "<p>PromoSan è costantemente impegnata nell'ampliamento della propria offerta per rispondere alle esigenze emergenti in ambito sanitario e assistenziale.</p><p>Tra i servizi in fase di sviluppo figurano l'Assistenza Domiciliare Integrata (ADI) e programmi avanzati di Prevenzione della Salute, che rappresentano l'evoluzione naturale del nostro impegno nella tutela del benessere delle persone.</p>";
const DEFAULT_FOCUS = [
  'Screening oncologici',
  'Educazione sanitaria',
  'Monitoraggio cronicità',
  'Stili di vita salutari',
];

export default function ServiziInSviluppo({
  badge = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  intro = DEFAULT_INTRO,
  focusItems = DEFAULT_FOCUS,
}: ServiziInSviluppoProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('[data-animate="true"]');
    if (elements) {
      elements.forEach((element, index) => {
        setTimeout(() => {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
        }, index * 150);
      });
    }
  }, []);

  const adiFeatures = [
    { title: 'Obiettivo principale', text: 'Garantire cure di qualità nel comfort domestico' }
  ];

  return (
    <section 
      id="servizi"
      ref={sectionRef}
      style={{ 
        overflow: 'hidden',
        padding: '5rem 0',
        background: 'linear-gradient(to bottom, #ffffff, #ffffff, rgba(249, 250, 251, 0.3))'
      }}
    >
      <div style={{ 
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Badge e Titolo */}
        <div style={{ marginBottom: '3rem' }}>
          <div 
            data-animate="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              marginBottom: '1rem',
              background: 'linear-gradient(to right, #2c5282, #4299e1, #2c5282)',
              borderRadius: '9999px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: '600',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <i className="fas fa-flask"></i>
            <span>{badge}</span>
          </div>

          <h2 
            data-animate="true"
            style={{ 
              marginBottom: '0.75rem',
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#2c5282',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.1s'
            }}
          >
            {title}
          </h2>

          <div 
            data-animate="true"
            style={{
              width: '4rem',
              height: '0.25rem',
              background: 'linear-gradient(to right, #4299e1, #90cdf4)',
              borderRadius: '9999px',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.2s'
            }}
          ></div>
        </div>

        {/* Introduzione */}
        <div 
          data-animate="true"
          style={{ 
            marginBottom: '3rem',
            maxWidth: '1280px',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.3s'
          }}
        >
          <div
            style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        </div>

        {/* Grid Servizi */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {/* Card ADI */}
          <div data-animate="true" style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.4s',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardServizio 
              title="ASSISTENZA DOMICILIARE INTEGRATA"
              badge="ADI"
              badgeLabel="Servizio integrato"
              description="L'ADI si configura come un servizio di assistenza sanitaria e socio-sanitaria erogato direttamente al domicilio della persona, garantendo continuità assistenziale e qualità delle cure in un contesto familiare."
              features={adiFeatures}
              footerText="In sviluppo"
            />
          </div>

          {/* Card Prevenzione con children */}
          <div data-animate="true" style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.5s',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardServizio 
              title="PROGRAMMI AVANZATI DI PREVENZIONE"
              badge="ESTESO"
              badgeLabel="Programmi avanzati"
              description={[
                "Oltre ai programmi di prevenzione già inclusi nel welfare aziendale, PromoSan sta sviluppando percorsi di prevenzione estesi anche alla popolazione generale.",
                "L'obiettivo è creare una rete di servizi che metta la prevenzione al centro del percorso di salute delle persone."
              ]}
              footerText="In sviluppo"
            >
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{
                  marginBottom: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#2c5282',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#4299e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#2c5282';
                }}
                >
                  Focus principali:
                </h4>
                <FocusGrid items={focusItems} />
              </div>
            </CardServizio>
          </div>
        </div>
      </div>
    </section>
  );
}