'use client';

export default function BenefitsSection() {
  const benefits = [
    {
      title: 'COMPETENZA NORMATIVA',
      description: 'Piena conformità al D.Lgs. 81/08 e successivi aggiornamenti.'
    },
    {
      title: 'PERSONALIZZAZIONE',
      description: 'Soluzioni flessibili che si adattano alla tua struttura aziendale.'
    },
    {
      title: 'APPROCCIO PROATTIVO',
      description: 'Non solo adempimenti, ma analisi dei dati e consulenza per migliorare la prevenzione.'
    },
    {
      title: 'COPERTURA NAZIONALE',
      description: 'Servizio erogato su tutto il territorio nazionale con professionalità omogenea.'
    }
  ];

  return (
    <section className="benefits-section" style={{ 
      padding: 'clamp(3rem, 8vw, 5rem) 0', 
      background: 'linear-gradient(to bottom, #ffffff, rgba(249, 250, 251, 0.5))' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '768px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            fontSize: 'clamp(1.5rem, 5vw, 1.875rem)', 
            fontWeight: '700', 
            color: '#2c5282' 
          }}>
            PERCHÈ SCEGLIERE PROMOSAN?
          </h2>
          <div style={{ 
            width: 'clamp(4rem, 10vw, 6rem)', 
            height: '0.25rem', 
            margin: '1.5rem auto 0', 
            borderRadius: '9999px', 
            background: 'linear-gradient(to right, #2c5282, #4299e1, #2c5282)'
          }}></div>
        </div>
        
        {/* Benefits Grid - RESPONSIVE */}
        <div className="benefits-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '2rem' 
        }}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefit-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                border: '1px solid #f3f4f6',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(44, 82, 130, 0.25)';
                e.currentTarget.style.transform = 'translateY(-0.5rem)';
                e.currentTarget.style.borderColor = 'rgba(44, 82, 130, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#f3f4f6';
              }}
            >
              {/* Effetto gradiente al hover */}
              <div style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(135deg, rgba(44, 82, 130, 0.05), transparent)',
                borderRadius: '1rem',
                opacity: '0',
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none'
              }} className="hover-gradient"></div>
              
              <h4 style={{ 
                marginBottom: '1rem', 
                fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                fontWeight: '700', 
                color: '#2c5282',
                lineHeight: '1.4'
              }}>
                {benefit.title}
              </h4>
              
              <p style={{ 
                lineHeight: '1.625', 
                color: '#4b5563',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
              }}>
                {benefit.description}
              </p>
              
              {/* Linea inferiore animata */}
              <div style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
                left: '0',
                height: '0.25rem',
                background: 'linear-gradient(to right, transparent, #4299e1, transparent)',
                opacity: '0',
                transition: 'opacity 0.5s ease'
              }} className="bottom-line"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Stili responsive */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 640px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .benefit-card {
            padding: 1.5rem !important;
          }
          
          .benefit-card:hover {
            transform: translateY(-0.25rem) !important;
          }
        }

        /* Hover effects mantenuti */
        .benefit-card:hover .hover-gradient {
          opacity: 1 !important;
        }
        
        .benefit-card:hover .bottom-line {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}