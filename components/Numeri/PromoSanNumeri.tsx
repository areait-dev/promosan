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
      {/* Background pattern e orbs - gestiti dal CSS */}
      <div className="section-bg-pattern"></div>
      <div className="section-orb section-orb--left"></div>
      <div className="section-orb section-orb--right"></div>

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title text-white">
            {title}
          </h2>

          <p className="section-subtitle text-white/90">
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
    </section>
  );
};

export default PromoSanNumeri;