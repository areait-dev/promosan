'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function VisiteMedicheSection() {
  const [activeTab, setActiveTab] = useState('tipologie');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  
  const tabOrder = ['tipologie', 'cartella', 'accertamenti', 'giudizio', 'portale'];
  
  const switchTab = (tabName: string) => {
    const index = tabOrder.indexOf(tabName);
    setActiveTab(tabName);
    setCurrentTabIndex(index);
  };
  
  const nextTab = () => {
    if (currentTabIndex < tabOrder.length - 1) {
      const nextTabName = tabOrder[currentTabIndex + 1];
      switchTab(nextTabName);
    }
  };
  
  const prevTab = () => {
    if (currentTabIndex > 0) {
      const prevTabName = tabOrder[currentTabIndex - 1];
      switchTab(prevTabName);
    }
  };
  
  useEffect(() => {
    switchTab('tipologie');
  }, []);

  const getIconPath = (iconName: string) => {
    const iconMap: Record<string, string> = {
      'visiotest': '/assets/img/visita medica.svg',
      'spirometria': '/assets/img/spirometria.svg',
      'audiometria': '/assets/img/audiometria.svg',
      'ecg': '/assets/img/ECG.svg',
      'drug test': '/assets/img/drug test.svg',
      'alcol test': '/assets/img/alcol test.svg',
      'ematochimici': '/assets/img/ematochimici.svg',
      'unità mobile': '/assets/img/unita-mobile.svg',
      'visita medica': '/assets/img/visita-medica.svg'
    };
    
    return iconMap[iconName] || `/assets/icons/${iconName}.svg`;
  };

  return (
    <section className="visite-mediche-section" style={{ 
      padding: 'clamp(2rem, 5vw, 4rem) 0', 
      background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
          <h2 style={{ 
            marginBottom: '1.5rem', 
            fontSize: 'clamp(1.5rem, 5vw, 1.875rem)', 
            fontWeight: '700', 
            color: '#2c5282',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            VISITE MEDICHE
          </h2>
          
          <div style={{ marginBottom: '2rem', maxWidth: '1280px' }}>
            <p style={{ 
              marginBottom: '1rem', 
              fontSize: 'clamp(0.95rem, 3vw, 1.125rem)', 
              color: '#374151', 
              lineHeight: '1.75' 
            }}>
              Le visite mediche rappresentano il momento centrale della sorveglianza sanitaria e costituiscono lo strumento attraverso cui il Medico Competente valuta la salute dei lavoratori in relazione ai rischi professionali. Secondo l'<strong style={{ color: '#2c5282' }}>art. 41 del D.Lgs. 81/08</strong>, la sorveglianza sanitaria comprende diverse tipologie di visite mediche, ciascuna con finalità specifiche.
            </p>
          </div>
        </div>

        {/* Tab Buttons - Griglia su mobile, orizzontale su desktop */}
        <div className="visite-tabs-grid" style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          {tabOrder.map((tab) => (
            <button 
              key={tab}
              onClick={() => switchTab(tab)} 
              className="visite-tab-btn"
              style={{
                padding: '0.75rem 1.25rem',
                fontWeight: '500',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === tab ? '#2c5282' : '#e5e7eb',
                color: activeTab === tab ? '#ffffff' : '#374151',
                flex: '1 1 auto',
                minWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.backgroundColor = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
            >
              {tab === 'tipologie' && 'TIPOLOGIE DI VISITE'}
              {tab === 'cartella' && 'CARTELLA SANITARIA'}
              {tab === 'accertamenti' && 'ACCERTAMENTI'}
              {tab === 'giudizio' && 'GIUDIZIO DI IDONEITÀ'}
              {tab === 'portale' && 'PORTALE DIGITALE'}
            </button>
          ))}
        </div>

        {/* TAB: TIPOLOGIE */}
        {activeTab === 'tipologie' && (
          <div className="visite-content-box" style={{ 
            padding: 'clamp(1rem, 4vw, 2rem)', 
            backgroundColor: '#ffffff', 
            borderRadius: '1rem', 
            border: '2px solid rgba(44, 82, 130, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                alignItems: 'center', 
                marginBottom: '0.75rem', 
                fontSize: 'clamp(1rem, 4vw, 1.125rem)', 
                fontWeight: '600', 
                color: '#2c5282' 
              }}>
                <Image 
                  src={getIconPath('visiotest')} 
                  alt="Visita medica"
                  width={24}
                  height={24}
                  style={{ objectFit: 'contain' }}
                />
                LE VISITE MEDICHE PREVISTE DALLA NORMATIVA INCLUDONO:
              </h4>
            </div>
            
            <div className="visite-grid visite-grid-3" style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1.5rem' 
            }}>
              {[
                "VISITA MEDICA PREVENTIVA",
                "VISITA MEDICA PERIODICA", 
                "VISITA MEDICA SU RICHIESTA DEL LAVORATORE",
                "VISITA MEDICA PER CAMBIO MANSIONE",
                "VISITA MEDICA PRECEDENTE ALLA RIPRESA DEL LAVORO",
                "VISITA MEDICA ALLA CESSAZIONE DEL RAPPORTO DI LAVORO"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="visite-card-item"
                  style={{ 
                    padding: '1.25rem', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2c5282';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 82, 130, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1rem)', fontWeight: '600', color: '#2c5282' }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CARTELLA */}
        {activeTab === 'cartella' && (
          <div className="visite-content-box" style={{ 
            padding: 'clamp(1rem, 4vw, 2rem)', 
            backgroundColor: '#ffffff', 
            borderRadius: '1rem', 
            border: '2px solid rgba(44, 82, 130, 0.2)' 
          }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ 
                marginBottom: '1rem', 
                fontSize: 'clamp(1rem, 4vw, 1.125rem)', 
                fontWeight: '700', 
                color: '#2c5282' 
              }}>
                ISTITUZIONE DELLA CARTELLA SANITARIA E DI RISCHIO
              </h3>
              <p style={{ 
                lineHeight: '1.625', 
                textAlign: 'justify', 
                color: '#374151',
                fontSize: 'clamp(0.9rem, 3vw, 1rem)' 
              }}>
                Per ogni lavoratore sottoposto a sorveglianza sanitaria, il Medico Competente istituisce e aggiorna una cartella sanitaria e di rischio. La cartella, custodita sotto la responsabilità del Medico Competente nel rispetto del segreto professionale, contiene tutti i dati relativi agli accertamenti sanitari effettuati, ai risultati degli esami e al giudizio di idoneità espresso.
              </p>
            </div>
          </div>
        )}

        {/* TAB: ACCERTAMENTI */}
        {activeTab === 'accertamenti' && (
          <div className="visite-content-box" style={{ 
            padding: 'clamp(1rem, 4vw, 2rem)', 
            backgroundColor: '#ffffff', 
            borderRadius: '1rem', 
            border: '2px solid rgba(44, 82, 130, 0.2)' 
          }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ 
                marginBottom: '1rem', 
                fontSize: 'clamp(1rem, 4vw, 1.125rem)', 
                fontWeight: '700', 
                color: '#2c5282' 
              }}>
                ACCERTAMENTI SANITARI
              </h3>
              <p style={{ 
                marginBottom: '2rem', 
                lineHeight: '1.625', 
                color: '#374151',
                fontSize: 'clamp(0.9rem, 3vw, 1rem)' 
              }}>
                Le visite mediche comprendono gli esami clinici e gli accertamenti diagnostici necessari, individuati dal Medico Competente in funzione dei rischi specifici della mansione. PromoSan effettua direttamente in azienda o presso le proprie strutture una gamma completa di accertamenti sanitari:
              </p>
            </div>
            
            <div className="visite-grid visite-grid-2" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1.5rem' 
            }}>
              {[
                { icon: "visiotest", title: "VISIOTEST", desc: "Valutazione dell'acuità visiva e della percezione cromatica" },
                { icon: "spirometria", title: "SPIROMETRIA", desc: "Esame della funzionalità respiratoria" },
                { icon: "audiometria", title: "AUDIOMETRIA", desc: "Valutazione della capacità uditiva" },
                { icon: "ecg", title: "ECG A RIPOSO", desc: "Elettrocardiogramma per la valutazione della funzionalità cardiaca" },
                { icon: "drug test", title: "DRUG TEST ON-SITE", desc: "Test rapidi per la ricerca di sostanze stupefacenti" },
                { icon: "alcol test", title: "ALCOL TEST MEDIANTE ETILOMETRI", desc: "Misurazione del tasso alcolemico" },
                { icon: "ematochimici", title: "ESAMI EMATOCHIMICI", desc: "Analisi di laboratorio mirate ai rischi specifici" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="visite-accertamento-item"
                  style={{ 
                    padding: '1.25rem', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2c5282';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Image 
                      src={getIconPath(item.icon)} 
                      alt={item.title}
                      width={32}
                      height={32}
                      style={{ flexShrink: 0, marginTop: '2px', objectFit: 'contain' }}
                    />
                    <div>
                      <div style={{ 
                        marginBottom: '0.25rem', 
                        fontSize: 'clamp(0.9rem, 3vw, 1rem)', 
                        fontWeight: '600', 
                        color: '#2c5282' 
                      }}>{item.title}</div>
                      <div style={{ 
                        fontSize: 'clamp(0.8rem, 2.5vw, 0.875rem)', 
                        color: '#4b5563' 
                      }}>{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: GIUDIZIO */}
        {activeTab === 'giudizio' && (
          <div className="visite-content-box" style={{ 
            padding: 'clamp(1rem, 4vw, 2rem)', 
            backgroundColor: '#ffffff', 
            borderRadius: '1rem', 
            border: '2px solid rgba(44, 82, 130, 0.2)' 
          }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ 
                marginBottom: '1rem', 
                fontSize: 'clamp(1rem, 4vw, 1.125rem)', 
                fontWeight: '700', 
                color: '#2c5282' 
              }}>
                RILASCIO GIUDIZIO DI IDONEITÀ
              </h3>
              <p style={{ 
                marginBottom: '2rem', 
                lineHeight: '1.625', 
                color: '#374151',
                fontSize: 'clamp(0.9rem, 3vw, 1rem)' 
              }}>
                Al termine della visita medica e sulla base dei risultati degli accertamenti effettuati, il Medico Competente esprime uno dei seguenti giudizi previsti dall'<strong style={{ color: '#2c5282' }}>art. 41</strong>:
              </p>
            </div>
            
            <div className="visite-grid visite-grid-2" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1.5rem' 
            }}>
              {[
                { title: "IDONEITÀ", desc: "Il lavoratore è idoneo a svolgere la mansione specifica" },
                { title: "IDONEITÀ PARZIALE, TEMPORANEA O PERMANENTE, CON PRESCRIZIONI O LIMITAZIONI", desc: "Il lavoratore può svolgere la mansione con specifiche condizioni" },
                { title: "INIDONEITÀ TEMPORANEA", desc: "Il lavoratore non può svolgere temporaneamente la mansione, con indicazione dei limiti temporali" },
                { title: "INIDONEITÀ PERMANENTE", desc: "Il lavoratore non è idoneo a svolgere la mansione specifica" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="visite-giudizio-item"
                  style={{ 
                    padding: '1.25rem', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2c5282';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{ 
                    marginBottom: '0.5rem', 
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)', 
                    fontWeight: '600', 
                    color: '#2c5282' 
                  }}>{item.title}</div>
                  <div style={{ 
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.875rem)', 
                    color: '#4b5563' 
                  }}>{item.desc}</div>
                </div>
              ))}
            </div>
            
            <div style={{ 
              padding: '1.25rem', 
              marginTop: '2rem', 
              backgroundColor: '#eff6ff', 
              borderRadius: '0.75rem', 
              border: '1px solid #bfdbfe' 
            }}>
              <p style={{ 
                lineHeight: '1.625', 
                color: '#1f2937',
                fontSize: 'clamp(0.9rem, 3vw, 1rem)' 
              }}>
                <strong style={{ color: '#2c5282' }}>Il giudizio di idoneità viene comunicato sia al datore di lavoro che al lavoratore.</strong>
              </p>
            </div>
          </div>
        )}

        {/* TAB: PORTALE */}
        {activeTab === 'portale' && (
          <div className="visite-content-box" style={{ 
            padding: 'clamp(1rem, 4vw, 2rem)', 
            backgroundColor: '#ffffff', 
            borderRadius: '1rem', 
            border: '2px solid rgba(44, 82, 130, 0.2)' 
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ 
                marginBottom: '1rem', 
                fontSize: 'clamp(1rem, 4vw, 1.125rem)', 
                fontWeight: '700', 
                color: '#2c5282' 
              }}>
                CONSEGNA DOCUMENTAZIONE TRAMITE PORTALE TELEMATICO
              </h3>
              <p style={{ 
                fontSize: 'clamp(0.9rem, 3vw, 1rem)', 
                color: '#374151' 
              }}>
                PromoSan mette a disposizione un portale digitale dedicato attraverso cui datore di lavoro e lavoratori possono accedere in modo semplice e sicuro alla documentazione sanitaria.
              </p>
            </div>
          </div>
        )}

        {/* Navigation - Desktop style su desktop, mobile style su mobile */}
        <div className="visite-navigation" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          maxWidth: '896px', 
          margin: '2rem auto 0'
        }}>
          <button 
            onClick={prevTab} 
            className="visite-nav-btn prev"
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              padding: '0.75rem 1.25rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: currentTabIndex === 0 ? 'not-allowed' : 'pointer',
              backgroundColor: currentTabIndex === 0 ? '#e5e7eb' : '#d1d5db',
              color: currentTabIndex === 0 ? '#9ca3af' : '#374151',
              opacity: currentTabIndex === 0 ? 0.5 : 1
            }}
            disabled={currentTabIndex === 0}
          >
            <span>Precedente</span>
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontWeight: '700', color: '#2c5282' }}>{currentTabIndex + 1}</span>
            <span style={{ color: '#9ca3af' }}> / {tabOrder.length}</span>
          </div>
          
          <button 
            onClick={nextTab} 
            className="visite-nav-btn next"
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              padding: '0.75rem 1.25rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: currentTabIndex === tabOrder.length - 1 ? 'not-allowed' : 'pointer',
              backgroundColor: currentTabIndex === tabOrder.length - 1 ? '#10b981' : '#2c5282',
              color: '#ffffff'
            }}
            disabled={currentTabIndex === tabOrder.length - 1}
          >
            <span>{currentTabIndex === tabOrder.length - 1 ? 'Completato' : 'Successivo'}</span>
          </button>
        </div>
      </div>

      {/* Stili responsive */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .visite-grid-3 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          /* Bottoni in griglia 2x2 su mobile */
          .visite-tabs-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
          
          .visite-tab-btn {
            width: 100% !important;
            text-align: center !important;
            padding: 0.75rem 0.5rem !important;
            font-size: 0.9rem !important;
          }
          
          .visite-grid-3 {
            grid-template-columns: 1fr !important;
          }
          
          .visite-grid-2 {
            grid-template-columns: 1fr !important;
          }
          
          .visite-content-box {
            padding: 1.5rem !important;
          }
          
          .visite-card-item,
          .visite-accertamento-item,
          .visite-giudizio-item {
            padding: 1rem !important;
          }
          
          /* Navigation - solo su mobile diventa a colonna */
          .visite-navigation {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .visite-nav-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .visite-content-box {
            padding: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}