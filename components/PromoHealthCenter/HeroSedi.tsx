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
  const gradient = 'linear-gradient(90deg, rgba(44,82,130,0.5) 0%, rgba(66,153,225,0.5) 100%)';
  return (
    <section
      className="hero-sedi"
      style={{
        background: backgroundImage
          ? `${gradient}, url(${backgroundImage}) center / cover no-repeat`
          : 'linear-gradient(90deg, #2c5282 0%, #4299e1 100%)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem'
      }}
    >
      {/* Pattern decorativo */}
      <div className="hero-pattern"></div>
      
      <div className="hero-content" style={{ position: 'relative', transform: 'none', top: 'auto', left: 'auto' }}>
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
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <Link href="#strutture-section" className="scroll-link" aria-label="Scorri alle sedi">
          <div className="scroll-mouse">
            <span className="scroll-wheel" />
          </div>
        </Link>
      </div>

      <style jsx>{`
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .scroll-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .scroll-link:hover {
          color: #ffffff;
          transform: translateY(-2px);
        }

        .scroll-mouse {
          width: 22px;
          height: 36px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          position: relative;
          transition: all 0.3s ease;
        }

        .scroll-wheel {
          display: block;
          width: 4px;
          height: 8px;
          background: #ffffff;
          border-radius: 2px;
          position: absolute;
          left: 50%;
          top: 6px;
          transform: translateX(-50%);
          animation: scrollWheel 1.8s ease-in-out infinite;
        }

        @keyframes scrollWheel {
          0% {
            transform: translate(-50%, 0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          50% {
            transform: translate(-50%, 8px);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 14px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSedi;