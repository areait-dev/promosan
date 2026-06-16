'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeroSediProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const DEFAULT_TITLE = 'PRESENTI DOVE SERVE, QUANDO SERVE';
const DEFAULT_SUBTITLE =
  'PromoSan garantisce copertura su tutto il territorio nazionale grazie a una rete capillare e flessibile, pensata per rispondere alle esigenze di ogni azienda, ovunque essa operi.';

const HeroSedi = ({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  backgroundImage,
}: HeroSediProps = {}) => {
  const gradient = 'linear-gradient(90deg, rgba(44,82,130,0.85) 0%, rgba(66,153,225,0.85) 100%)';
  return (
    <section
      className="hero-sedi"
      style={{
        background: backgroundImage
          ? `${gradient}, url(${backgroundImage}) center / cover no-repeat`
          : 'linear-gradient(90deg, #2c5282 0%, #4299e1 100%)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '80px'
      }}
    >
      {/* Pattern decorativo */}
      <div className="hero-pattern"></div>
      

      
      <div className="hero-content">
        <h1 className="hero-title">
        {title}
        </h1>

        <p className="hero-subtitle">
        {subtitle}
        </p>
        
        <div className="hero-buttons">
          <Link href="#strutture-section" className="btn btn-white">
            Scopri le nostre sedi
          </Link>
          <Link href="/contatti" className="btn btn-outline">
            Contattaci
          </Link>
        </div>
      </div>
      
      {/* Freccia animata */}
      <div className="hero-arrow">
  <Link href="#sede-sicilia">
    <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </Link>
</div>
    </section>
  );
};

export default HeroSedi;