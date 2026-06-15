'use client';

import { useState } from 'react';

export default function MissionVision() {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <section className="section">
      <div className="container">
        {/* Switch buttons */}
        <div className="tabs-wrapper">
          <div className="tabs-container">
            <button
              onClick={() => setActiveTab('mission')}
              className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
            >
              MISSION
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
            >
              VISION
            </button>
          </div>
        </div>

        {/* Content sections */}
        <div className="tabs-content">
          {/* Mission Section */}
          {activeTab === 'mission' && (
            <div className="tab-panel active">
              <div className="section-header">
                <h2 className="section-title">MISSION</h2>
              </div>
              
              <p className="section-text mb-5">
                Al centro della nostra attività c'è la <strong className="text-primary">sorveglianza sanitaria</strong>: l'insieme 
                degli atti medici finalizzati alla tutela dello stato di salute e sicurezza 
                dei lavoratori, in relazione all'ambiente di lavoro, ai fattori di rischio 
                professionali e alle modalità di svolgimento dell'attività lavorativa 
                (art. 2, lettera m del D.Lgs. 81/08).
              </p>
              
              <div>
                <h4>IL NOSTRO IMPEGNO È GARANTIRE:</h4>
                
                {/* Griglia responsive per Mission */}
                <div className="responsive-grid responsive-grid-cols-2">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">COMPETENZA PROFESSIONALE</h4>
                      <p className="card-text">Attraverso medici specializzati e costantemente aggiornati</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">RISPETTO DELLA DIGNITÀ E PRIVACY</h4>
                      <p className="card-text">Di ogni lavoratore in ogni fase del percorso</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">QUALITÀ DEL SERVIZIO</h4>
                      <p className="card-text">Attraverso il miglioramento continuo dei processi</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">SUPPORTO COMPLETO</h4>
                      <p className="card-text">Alle imprese di ogni dimensione, dalle PMI alle realtà strutturate</p>
                    </div>
                  </div>
                </div>
                
                {/* Citazione sotto le card */}
                <div style={{ marginTop: '30px', textAlign: 'center', fontStyle: 'italic', padding: '0 15px' }}>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
                    Operiamo in piena conformità con il D.lgs.81/2008, seguendo ogni aspetto della Sorveglianza Sanitaria con precisione, professionalità e attenzione alla persona
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Vision Section */}
          {activeTab === 'vision' && (
            <div className="tab-panel active">
              <div className="section-header">
                <h2 className="section-title">VISION</h2>
              </div>
              
              <p className="section-text mb-5">
                <strong className="text-primary">PromoSan</strong> si impegna a diventare 
                <strong className="text-primary">un punto di riferimento nel settore della Medicina del Lavoro</strong>, collaborando 
                attivamente con le aziende per diffondere una cultura aziendale basata sulla 
                salute, la sicurezza e il benessere delle persone.
              </p>

              <h3 className="section-subtitle">I NOSTRI OBIETTIVI:</h3>
              
              {/* Griglia responsive per Vision */}
              <div className="responsive-grid responsive-grid-cols-3">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">EFFICACIA ED EFFICIENZA</h4>
                    <p className="card-text">
                      Garantire la qualità del servizio attraverso risorse professionali 
                      qualificate e tecnologie all'avanguardia, ottimizzando ogni processo 
                      aziendale.
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">ATTENZIONE ALL'UTENZA</h4>
                    <p className="card-text">
                      Soddisfare le esigenze delle aziende e dei lavoratori con servizi 
                      rapidi, accessibili e di qualità, riducendo i tempi d'attesa e 
                      ottimizzando i costi senza compromettere l'eccellenza.
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">INNOVAZIONE E MIGLIORAMENTO CONTINUO</h4>
                    <p className="card-text">
                      Investire costantemente in formazione, strumenti e metodologie per 
                      offrire soluzioni sempre più efficaci e personalizzate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stili aggiuntivi per garantire il corretto comportamento responsive */}
      <style jsx>{`
        .responsive-grid {
          display: grid;
          gap: var(--space-lg);
          grid-template-columns: 1fr;
          margin-top: var(--space-lg);
        }

        @media (min-width: 640px) {
          .responsive-grid.responsive-grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .responsive-grid.responsive-grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Mobile first: su schermi piccoli, le card occupano tutta la larghezza */
        .card {
          width: 100%;
          margin-bottom: var(--space-md);
        }

        @media (min-width: 640px) {
          .card {
            margin-bottom: 0;
          }
        }

        /* Migliora la leggibilità su mobile */
        .section-text {
          font-size: var(--text-base);
          line-height: 1.6;
        }

        .section-subtitle {
          font-size: var(--text-lg);
          margin-top: var(--space-lg);
          margin-bottom: var(--space-md);
        }

        .card-title {
          font-size: var(--text-base);
        }

        .card-text {
          font-size: var(--text-sm);
        }
      `}</style>
    </section>
  );
}