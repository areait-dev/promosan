'use client'
export default function SopralluogoSection() {
  return (
    <section className="section section-white" id="sopralluogo">
      <div className="container">
        
        {/* Header con titolo e badge */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="sopralluogo-title">SOPRALLUOGO AZIENDALE</h2>
          <span className="norm-badge px-5 py-2.5 text-sm font-bold rounded-full" style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            color: 'var(--color-white)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--border-radius-full)'
          }}>
            Art. 25 D.Lgs. 81/08
          </span>
        </div>

        {/* Grid delle box - RESPONSIVE con classe dedicata */}
        <div className="sopralluogo-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          width: '100%',
          marginTop: '1.5rem'
        }}>
          
          {/* Obbligo fondamentale - Box SINISTRA */}
          <div className="norm-box" style={{
            background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
            border: '2px solid rgba(44, 82, 130, 0.15)',
            borderRadius: 'var(--border-radius-xl)',
            padding: '2.5rem',
            transition: 'all 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
            height: '100%'
          }}>
            <div className="norm-icon-box mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full" style={{
              background: 'linear-gradient(135deg, rgba(44, 82, 130, 0.1), rgba(66, 153, 225, 0.1))',
              border: '2px solid rgba(44, 82, 130, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <i className="norm-icon fas fa-building text-2xl" style={{
                color: 'var(--color-primary)',
                transition: 'all 0.3s ease'
              }}></i>
            </div>
            
            <h3 className="norm-subtitle text-xl mb-4" style={{
              color: 'var(--color-primary)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              OBBLIGO FONDAMENTALE
            </h3>
            
            <p className="text-gray-700" style={{
              color: 'var(--color-gray-700)',
              lineHeight: '1.8',
              marginBottom: '1rem',
              fontSize: '1rem'
            }}>
              Il sopralluogo negli ambienti di lavoro è un obbligo fondamentale del Medico Competente stabilito dall'<strong className="text-primary">art. 25 comma 1 lettera l) del D.Lgs. 81/08</strong>.
            </p>
            <p className="text-gray-700" style={{
              color: 'var(--color-gray-700)',
              lineHeight: '1.8',
              fontSize: '1rem',
              margin: 0
            }}>
              Questa attività permette di conoscere direttamente i luoghi di lavoro, verificare le condizioni ambientali e valutare l'esposizione dei lavoratori ai rischi professionali.
            </p>
          </div>

          {/* Garanzia - Box DESTRA */}
          <div className="garanzia-box" style={{
            background: 'linear-gradient(135deg, rgba(44, 82, 130, 0.05), rgba(66, 153, 225, 0.03))',
            border: '2px solid rgba(44, 82, 130, 0.1)',
            borderRadius: 'var(--border-radius-xl)',
            padding: '2.5rem',
            transition: 'all 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
            height: '100%'
          }}>
            <div className="garanzia-icon-box mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full" style={{
              background: 'linear-gradient(135deg, rgba(44, 82, 130, 0.1), rgba(66, 153, 225, 0.1))',
              border: '2px solid rgba(44, 82, 130, 0.2)',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(44, 82, 130, 0.2)'
            }}>
              <i className="fas fa-shield-alt text-2xl" style={{
                color: 'var(--color-primary)',
                transition: 'all 0.3s ease'
              }}></i>
            </div>
            
            <h3 className="garanzia-subtitle text-xl mb-4" style={{
              color: 'var(--color-primary)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              GARANZIA PROMOSAN
            </h3>
            
            <p className="text-gray-700" style={{
              color: 'var(--color-gray-700)',
              lineHeight: '1.8',
              fontSize: '1rem',
              margin: 0
            }}>
              PromoSan garantisce lo svolgimento puntuale dei sopralluoghi aziendali in conformità agli obblighi normativi, fornendo alle aziende un supporto qualificato nella verifica delle condizioni di salute e sicurezza degli ambienti di lavoro.
            </p>
          </div>

        </div>
      </div>

      {/* Stili responsive con classe dedicata */}
      <style jsx>{`
        @media (max-width: 900px) {
          .sopralluogo-grid {
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .sopralluogo-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .norm-box, .garanzia-box {
            padding: 2rem !important;
            min-height: auto !important;
          }
          
          .norm-icon-box, .garanzia-icon-box {
            width: 3.5rem !important;
            height: 3.5rem !important;
          }
          
          .norm-icon-box i, .garanzia-icon-box i {
            font-size: 1.25rem !important;
          }
          
          .norm-subtitle, .garanzia-subtitle {
            font-size: 1.25rem !important;
            margin-bottom: 1rem !important;
          }
          
          p {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
          }
        }

        @media (max-width: 480px) {
          .norm-box, .garanzia-box {
            padding: 1.5rem !important;
          }
          
          .norm-subtitle, .garanzia-subtitle {
            font-size: 1.1rem !important;
          }
          
          p {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  );
}