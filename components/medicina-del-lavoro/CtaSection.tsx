'use client';

import Link from 'next/link';

export default function CtaSection() {
  return (
    <section style={{ 
      padding: '4rem 0', 
      background: 'linear-gradient(to right, #2c5282, #4299e1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Pattern animato opzionale */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.05) 2px, transparent 2px)',
        backgroundSize: '50px 50px',
        opacity: '0.3',
        pointerEvents: 'none'
      }}></div>

      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 1rem',
        position: 'relative',
        zIndex: '1'
      }}>
        <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.9)' }}>
          <h2 style={{ 
            marginBottom: '1.5rem', 
            fontSize: '1.875rem', 
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            METTI IN SICUREZZA LA TUA AZIENDA
          </h2>
          
          <p style={{ 
            maxWidth: '768px', 
            margin: '0 auto 2rem', 
            fontSize: '1.25rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6'
          }}>
            Tutela la salute dei tuoi collaboratori con un servizio di Medicina del Lavoro completo, chiaro e affidabile.
          </p>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <Link 
              href="/contatti" 
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                fontWeight: '700',
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                color: '#2c5282',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ position: 'relative', zIndex: '1' }}>
                Richiedi una consulenza gratuita
              </span>
              
              {/* Shine effect */}
              <span style={{
                position: 'absolute',
                top: '0',
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(44, 82, 130, 0.1), transparent)',
                transition: 'left 0.7s ease'
              }} className="shine-effect"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}