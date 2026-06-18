// components/Numeri/PromoSanNumeri.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  duration: number;
}

export interface PromoSanNumeriProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
}

const DEFAULT_TITLE = 'PROMOSAN IN NUMERI';
const DEFAULT_SUBTITLE =
  'La fiducia delle aziende è il nostro punto di forza. Ogni giorno lavoriamo per garantire salute e sicurezza nei luoghi di lavoro, con risultati concreti e misurabili.';
const DEFAULT_STATS: Stat[] = [
  { id: 1, value: 25000, suffix: '+', label: 'VISITE MEDICHE EFFETTUATE OGNI ANNO', duration: 2.5 },
  { id: 2, value: 50000, suffix: '+', label: 'LAVORATORI SEGUITI E TUTELATI', duration: 3 },
  { id: 3, value: 450, suffix: '', label: 'AZIENDE CLIENTI CHE SI AFFIDANO A PROMOSAN', duration: 2 },
];

const PromoSanNumeri: React.FC<PromoSanNumeriProps> = ({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  stats = DEFAULT_STATS,
}) => {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartAnimation(true);
            setTimeout(() => setVisibleCards(prev => [true, prev[1], prev[2]]), 100);
            setTimeout(() => setVisibleCards(prev => [prev[0], true, prev[2]]), 300);
            setTimeout(() => setVisibleCards(prev => [prev[0], prev[1], true]), 500);
            
            if (entry.target) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`section section-gradient ${startAnimation ? 'section-visible' : ''}`}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="section-header numeri-header">
          <h2 className="section-title">
            {title}
          </h2>

          <p className="section-subtitle">
            {subtitle}
          </p>
          
          <div className="section-divider"></div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`stat-card ${visibleCards[index] ? 'card-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="stat-value">
                {startAnimation ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={stat.duration}
                    suffix={stat.suffix}
                    separator="."
                    decimals={0}
                    useEasing={true}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              
              <p className="stat-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-gradient {
          background: radial-gradient(circle at center, #1b355a 0%, #0a1527 100%) !important;
          padding: 80px 0 !important;
          position: relative;
          overflow: hidden;
        }

        .numeri-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff !important;
          text-transform: uppercase;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .section-title::after {
          display: none !important;
        }

        .section-subtitle {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.75) !important;
          max-width: 650px;
          margin: 0 auto 24px auto !important;
          line-height: 1.6;
        }

        .section-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent) !important;
          margin: 0 auto !important;
          border-radius: 2px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 0 16px;
          }
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 16px !important;
          padding: 48px 24px !important;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease, background 0.3s ease, border-color 0.3s ease !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25) !important;
        }

        .stat-card.card-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-card:hover {
          transform: translateY(-4px) !important;
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }

        .stat-value {
          font-size: 52px;
          font-weight: 800;
          color: #ffffff !important;
          margin-bottom: 16px;
          line-height: 1;
          text-shadow: none !important;
          filter: none !important;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7) !important;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin: 0 !important;
          line-height: 1.5;
          white-space: normal !important;
        }
      `}</style>
    </section>
  );
};

export default PromoSanNumeri;