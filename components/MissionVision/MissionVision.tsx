'use client';

import { useState } from 'react';

export interface MissionVisionProps {
  missionText?: string; // HTML
  visionText?: string; // HTML
}

const DEFAULT_MISSION_TEXT =
  'Al centro della nostra attività c\'è la <strong class="text-primary">sorveglianza sanitaria</strong>: l\'insieme degli atti medici finalizzati alla tutela dello stato di salute e sicurezza dei lavoratori, in relazione all\'ambiente di lavoro, ai fattori di rischio professionali e alle modalità di svolgimento dell\'attività lavorativa (art. 2, lettera m del D.Lgs. 81/08).';
const DEFAULT_VISION_TEXT =
  '<strong class="text-primary">PromoSan</strong> si impegna a diventare <strong class="text-primary">un punto di riferimento nel settore della Medicina del Lavoro</strong>, collaborando attivamente con le aziende per diffondere una cultura aziendale basata sulla salute, la sicurezza e il benessere delle persone.';

export default function MissionVision({
  missionText = DEFAULT_MISSION_TEXT,
  visionText = DEFAULT_VISION_TEXT,
}: MissionVisionProps = {}) {
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
        </div>        {/* Content sections */}
        <div className="tabs-content">
          {/* Mission Section */}
          {activeTab === 'mission' && (
            <div className="tab-panel active">
              <div className="section-header">
                <h2 className="tab-title">MISSION</h2>
              </div>

              <p
                className="section-text mb-5"
                dangerouslySetInnerHTML={{ __html: missionText }}
              />

              <div>
                <h3 className="tab-subtitle">IL NOSTRO IMPEGNO È GARANTIRE:</h3>

                {/* Griglia responsive per Mission */}
                <div className="responsive-grid responsive-grid-cols-4">
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
              </div>
            </div>
          )}

          {/* Vision Section */}
          {activeTab === 'vision' && (
            <div className="tab-panel active">
              <div className="section-header">
                <h2 className="tab-title">VISION</h2>
              </div>

              <p
                className="section-text mb-5"
                dangerouslySetInnerHTML={{ __html: visionText }}
              />

              <h3 className="tab-subtitle">I NOSTRI OBIETTIVI:</h3>

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
        .section {
          background-color: #f8fafc;
          padding: var(--space-xl) 0;
        }

        .tabs-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: var(--space-xl);
        }

        .tabs-container {
          background-color: #e8eaf0;
          border-radius: 6px;
          padding: 4px;
          display: inline-flex;
          gap: 4px;
        }

        .tab-btn {
          padding: 8px 24px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          outline: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: transparent;
          color: #718096;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .tab-btn.active {
          background-color: #2c5282;
          color: #ffffff;
        }

        .tab-btn:hover:not(.active) {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .tab-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: var(--space-md);
          text-transform: uppercase;
        }

        .tab-subtitle {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
          margin-top: var(--space-lg);
          margin-bottom: var(--space-md);
          text-transform: uppercase;
        }

        .responsive-grid {
          display: grid;
          gap: var(--space-lg);
          grid-template-columns: 1fr;
          margin-top: var(--space-lg);
        }

        @media (min-width: 640px) {
          .responsive-grid.responsive-grid-cols-4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .responsive-grid.responsive-grid-cols-4 {
            grid-template-columns: repeat(4, 1fr);
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
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.05);
          background-color: var(--color-white);
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

        .card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 8px;
          position: relative;
        }

        .card-title::after {
          display: none !important;
        }

        .card-text {
          font-size: 14px;
          color: var(--color-gray-600);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}