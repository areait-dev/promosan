'use client'
import React from 'react';

export default function NominaMedicoSection() {
  return (
    <section className="section section-light" id="nomina-medico">
      <div className="container">
        
        {/* Header Section */}
        <div className="section-header">
          <h2 className="section-title" style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            lineHeight: '1.2'
          }}>
            NOMINA DEL MEDICO COMPETENTE
          </h2>
          <p className="section-subtitle" style={{
            fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
            lineHeight: '1.6',
            maxWidth: '1200px',
            textAlign: 'justify'
          }}>
            La nomina del Medico Competente rappresenta un adempimento fondamentale per le aziende soggette all'obbligo di sorveglianza sanitaria. Secondo il <strong style={{ color: 'var(--color-primary)' }}>D.Lgs. 81/08</strong>, il Medico Competente è il professionista sanitario specializzato in medicina del lavoro che collabora con il datore di lavoro nella tutela della salute e della sicurezza dei lavoratori, attuando la sorveglianza sanitaria prevista dalla legge.
          </p>
        </div>

        {/* Sottotitolo */}
        <h3 style={{ 
          fontSize: 'clamp(1.3rem, 4vw, 1.75rem)', 
          color: 'var(--color-primary)',
          marginBottom: '1rem',
          marginTop: 'clamp(2rem, 5vw, 3rem)',
          lineHeight: '1.3',
          wordBreak: 'break-word'
        }}>
          MODALITÀ DI NOMINA PERSONALIZZABILI
        </h3>
        <p style={{ 
          fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', 
          color: 'var(--color-gray-600)',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          maxWidth: '1200px',
          lineHeight: '1.6'
        }}>
          Scegli la soluzione più adatta alla tua azienda. Ogni modalità offre vantaggi specifici in base alle dimensioni, alla complessità organizzativa e alle esigenze specifiche.
        </p>

        {/* Grid Cards - completamente responsive */}
        <div className="nomina-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          width: '100%',
          marginTop: '1.5rem'
        }}>
          
          {/* Card 1 - COORDINATORE/COORDINATO */}
          <Card 
            badgeText="Ideale per Gruppi"
            badgeColor="#204c84"
            title="COORDINATORE/COORDINATO"
            description="Una soluzione integrata che prevede sia la funzione di coordinamento di più medici competenti, ideale per realtà complesse con sedi multiple o articolazioni organizzative distribuite sul territorio, sia l'operatività diretta nella sorveglianza sanitaria."
            recommendation="Gruppi aziendali, multinazionali, aziende con più sedi operative"
          />

          {/* Card 2 - SOLO COORDINATO */}
          <Card 
            badgeText="Flessibile"
            badgeColor="#3b82f6"
            title="SOLO COORDINATO"
            description="Il servizio si concentra sull'attività operativa di sorveglianza sanitaria, perfetto per aziende che hanno già una struttura di coordinamento definita o che necessitano di supporto specialistico su specifiche sedi o reparti."
            recommendation="Aziende con team RSPP interno, realtà che hanno già strutture di coordinamento"
          />

          {/* Card 3 - MEDICO COMPETENTE DEDICATO */}
          <Card 
            badgeText="Soluzione Standard"
            badgeColor="#2c5282"
            title="MEDICO COMPETENTE DEDICATO"
            description="La nomina con tutti gli obblighi normativi per aziende di piccole dimensioni, con un professionista dedicato che segue in modo continuativo tutti gli aspetti della medicina del lavoro aziendale."
            recommendation="PMI, startup, aziende che cercano una soluzione completa e autonoma"
          />

        </div>

        {/* Media Queries per il responsive */}
        <style jsx>{`
          @media (max-width: 1024px) {
            .nomina-grid {
              gap: 1.5rem !important;
            }
          }

          @media (max-width: 900px) {
            .nomina-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          @media (max-width: 600px) {
            .nomina-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
          }

          @media (max-width: 380px) {
            .nomina-grid {
              gap: 1.2rem !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

// Componente Card separato per maggiore pulizia e riutilizzo
interface CardProps {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  recommendation: string;
}

function Card({ 
  badgeText, 
  badgeColor, 
  title, 
  description, 
  recommendation
}: CardProps) {
  return (
    <div className="protocol-card" style={{
      borderRadius: '20px',
      padding: '2.2rem',
      background: 'var(--color-white)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      border: '1px solid #f1f5f9',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(44, 82, 130, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.2rem' }}>
        <span style={{
          display: 'inline-block',
          padding: '5px 14px',
          borderRadius: '50px',
          fontSize: '11px',
          fontWeight: '700',
          background: badgeColor,
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {badgeText}
        </span>
      </div>
      
      <h4 style={{ 
        fontSize: 'clamp(1.15rem, 3vw, 1.35rem)', 
        fontWeight: '700', 
        color: 'var(--color-primary)',
        marginBottom: '1.2rem',
        lineHeight: '1.35'
      }}>
        {title}
      </h4>
      
      <p style={{ 
        color: '#64748b', 
        marginBottom: '1.8rem',
        lineHeight: '1.7',
        flex: '1',
        fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)'
      }}>
        {description}
      </p>
      
      <div style={{ 
        padding: '16px',
        backgroundColor: '#f4f7fa',
        borderRadius: '12px',
        marginTop: 'auto'
      }}>
        <h6 style={{ 
          fontSize: '11px', 
          fontWeight: '700', 
          color: '#64748b', 
          marginBottom: '6px', 
          textTransform: 'uppercase', 
          letterSpacing: '0.5px' 
        }}>
          Consigliato per:
        </h6>
        <p style={{ 
          color: '#334155', 
          fontWeight: '600',
          margin: 0,
          fontSize: 'clamp(0.8rem, 2.5vw, 0.88rem)',
          lineHeight: '1.45'
        }}>
          {recommendation}
        </p>
      </div>
    </div>
  );
}