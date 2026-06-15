// src/components/welfare-aziendale/IntroduzioneWelfare.tsx
'use client';

import { useEffect, useRef } from 'react';

export interface IntroduzioneWelfareProps {
  title?: string;
  text?: string; // HTML
}

const DEFAULT_TITLE = 'WELFARE AZIENDALE';
const DEFAULT_TEXT =
  'Il <strong style="font-weight:600;color:#2c5282">Welfare Aziendale</strong> rappresenta l\'evoluzione strategica della medicina del lavoro: <strong style="color:#2c5282">non più solo adempimento normativo</strong>, ma investimento concreto sul benessere delle persone e sulla competitività dell\'impresa. <strong style="font-weight:600;color:#2c5282">PromoSan</strong> offre pacchetti personalizzati che trasformano la tutela della salute in un <strong style="font-weight:600;color:#1f2937">vantaggio competitivo per l\'azienda</strong> e in un beneficio tangibile per i lavoratori.';

export default function IntroduzioneWelfare({
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
}: IntroduzioneWelfareProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('[data-animate="true"]');
    if (elements) {
      elements.forEach((element, index) => {
        setTimeout(() => {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
          if (element.classList.contains('animate-scale-x')) {
            (element as HTMLElement).style.transform = 'scaleX(1)';
          }
        }, index * 200);
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        padding: '2rem 0',
        background: 'linear-gradient(to bottom, #ffffff, #eff6ff)',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ margin: '0 auto' }}>
          {/* Titolo */}
          <h2 
            data-animate="true"
            style={{ 
              marginBottom: '1.5rem',
              fontSize: '32px',
              fontWeight: '700',
              color: '#2c5282',
              textAlign: 'left',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.7s ease-out'
            }}
          >
            {title}
          </h2>

          {/* Linea decorativa animata */}
          <div 
            data-animate="true"
            className="animate-scale-x"
            style={{ 
              marginBottom: '2rem',
              opacity: 0,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.3s'
            }}
          >
            <div style={{
              width: '8rem',
              height: '0.375rem',
              background: 'linear-gradient(to right, #2c5282, rgba(44, 82, 130, 0.3))',
              borderRadius: '9999px'
            }}></div>
          </div>

          {/* Testo */}
          <div 
            data-animate="true"
            style={{ 
              fontSize: '1.125rem',
              color: '#4b5563',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.7s ease-out',
              transitionDelay: '0.5s'
            }}
          >
            <p
              style={{
                lineHeight: '1.8',
                textAlign: 'justify',
                transition: 'color 0.3s ease',
                maxWidth: '1200px',
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        </div>
      </div>

      {/* Elemento decorativo opzionale */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(66, 153, 225, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <style jsx>{`
        .animate-scale-x[data-animate="true"] {
          transform: scaleX(1) !important;
        }
      `}</style>
    </section>
  );
}