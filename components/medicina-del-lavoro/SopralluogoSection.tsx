'use client'
export default function SopralluogoSection() {
  return (
    <section className="section section-white" id="sopralluogo">
      <div className="container">

        {/* Header con titolo e badge */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="sopralluogo-title" style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 800,
            color: 'var(--color-dark)'
          }}>SOPRALLUOGO AZIENDALE</h2>
          <span className="norm-badge" style={{
            background: '#204c84',
            color: 'var(--color-white)',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: '700',
            padding: '6px 16px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
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
            background: 'var(--color-white)',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '2.2rem',
            transition: 'all 0.3s ease',
            height: '100%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <h3 className="norm-subtitle text-xl" style={{
              color: 'var(--color-primary)',
              fontWeight: '700',
              marginBottom: '1.2rem'
            }}>
              OBBLIGO FONDAMENTALE
            </h3>

            <p className="text-gray-700" style={{
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '1.2rem',
              fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)'
            }}>
              Il sopralluogo negli ambienti di lavoro è un obbligo fondamentale del Medico Competente stabilito dall'<strong style={{ color: 'var(--color-primary)', fontWeight: '700' }}>art. 25 comma 1 lettera l) del D.Lgs. 81/08</strong>.
            </p>
            <p className="text-gray-700" style={{
              color: '#64748b',
              lineHeight: '1.7',
              fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
              margin: 0
            }}>
              Questa attività permette di conoscere direttamente i luoghi di lavoro, verificare le condizioni ambientali e valutare l'esposizione dei lavoratori ai rischi professionali.
            </p>
          </div>

          {/* Garanzia - Box DESTRA */}
          <div className="garanzia-box" style={{
            background: '#f4f7fa',
            border: '1px solid #e4ecf5',
            borderRadius: '16px',
            padding: '2.2rem',
            transition: 'all 0.3s ease',
            height: '100%'
          }}>
            <h3 className="garanzia-subtitle text-xl" style={{
              color: 'var(--color-primary)',
              fontWeight: '700',
              marginBottom: '1.2rem'
            }}>
              GARANZIA PROMOSAN
            </h3>

            <p className="text-gray-700" style={{
              color: '#475569',
              lineHeight: '1.7',
              fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
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