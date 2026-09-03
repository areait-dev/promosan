'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeroProps {
  backgroundImage?: string;
  logo?: string;
  title?: string;
  trustItems?: string[];
  ctaLabel?: string;
  ctaLink?: string;
}

const DEFAULT_HERO: Required<HeroProps> = {
  backgroundImage: '/assets/img/camper9.jpg',
  logo: '/assets/img/PromoSan_white.png',
  title: 'RAGGIUNGIAMO OVUNQUE I TUOI LAVORATORI',
  trustItems: [
    'COSTO VISITA UNICO IN TUTTA ITALIA',
    "RIDUCIAMO I TEMPI D'ATTESA",
    'GESTIAMO TUTTE LE SCADENZE',
  ],
  ctaLabel: 'Scopri i servizi',
  ctaLink: '#servizi',
};

export default function Hero(props: HeroProps = {}) {
  const {
    backgroundImage = DEFAULT_HERO.backgroundImage,
    logo = DEFAULT_HERO.logo,
    title = DEFAULT_HERO.title,
    trustItems = DEFAULT_HERO.trustItems,
    ctaLabel = DEFAULT_HERO.ctaLabel,
    ctaLink = DEFAULT_HERO.ctaLink,
  } = props;

  return (
    <section className="hero">
      {/* Background Image con overlay */}
      <div className="hero-bg">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="hero-bg-image"
          priority
          quality={75}
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content-homepage">
        {/* Logo */}
        <div className="hero-logo-wrapper">
          <Image
            src={logo}
            alt="PromoSan Logo"
            className="hero-logo"
            width={270}
            height={50}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>

        <div className="hero-text-homepage">
          {/* Titolo */}
          <h1 className="hero-title-homepage">
            {title}
          </h1>

          {/* Trust Bar */}
          <div className="trust-bar">
            {trustItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="trust-divider" />}
                <div className="trust-item">{item}</div>
              </React.Fragment>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hero-cta">
            <Link href={ctaLink} className="btn btn-white">
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <a href="#servizi" className="scroll-link" aria-label="Scorri ai nostri servizi">
            <span aria-hidden="true">Scorri ai nostri servizi</span>
            <div className="scroll-mouse">
              <span className="scroll-wheel" />
            </div>
          </a>
        </div>
      </div>

      {/* Stili responsive */}
      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          max-height: 900px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-2xl) var(--space-md);
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg-image {
          object-fit: cover;
          object-position: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(44,82,130,0.5) 0%,
            rgba(66,153,225,0.4) 40%,
            rgba(49,130,206,0.3) 100%
          );
          mix-blend-mode: multiply;
          z-index: 1;
        }

        .hero-content-homepage {
          position: relative;
          z-index: 20;
          text-align: center;
          max-width: 1200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-logo-wrapper {
          margin-bottom: var(--space-md);
        }

        .hero-logo {
          max-height: 70px;
          width: auto;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.5)) drop-shadow(0 2px 4px rgba(0,0,0,0.3)) brightness(1.3) contrast(1.1);
        }

        .hero-text-homepage {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          justify-content: center;
        }

        .hero-title-homepage {
          color: var(--color-white);
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
          margin-bottom: var(--space-md);
          /* Scalatura fluida su tutto il range (360px-1920px+): il clamp gestisce
             da solo l'adattamento, niente ridefinizioni fisse per breakpoint. */
          font-size: clamp(1.4rem, 5vw, 2.55rem);
          font-weight: 800;
          line-height: 1.2;
          max-width: 900px;
          padding: 0 var(--space-md);
          /* Riserva lo spazio per 2 righe: il fallback font (in attesa del
             caricamento di Titillium Web via next/font) ha metriche leggermente
             diverse e può far andare il testo a capo diversamente, causando un
             layout shift quando il font reale sostituisce il fallback. */
          min-height: calc(2 * 1.2em);
        }

        .trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1000px;
          margin: 0 auto var(--space-md);
          padding: 6px var(--space-md);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: var(--shadow-lg);
          width: 100%;
          /* Riserva l'altezza di una riga: se il fallback font va a capo
             diversamente dal font reale una volta caricato, l'hero (centrato
             verticalmente) non si riposiziona di conseguenza. */
          min-height: 40px;
        }

        .trust-item {
          padding: 4px var(--space-xs);
          color: var(--color-white);
          font-weight: 700;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: normal;
          text-align: center;
          flex: 1;
        }

        .trust-divider {
          width: 1px;
          height: 24px;
          background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
        }

        .hero-cta {
          margin-top: var(--space-md);
          margin-bottom: var(--space-xl);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-xs);
          padding: 8px 20px;
          font-weight: 700;
          font-size: var(--text-base);
          border-radius: 8px;
          transition: var(--transition-base);
          cursor: pointer;
          border: 2px solid transparent;
          text-decoration: none;
          white-space: nowrap;
        }

        .btn-white {
          background: var(--color-white);
          color: var(--color-primary);
          box-shadow: var(--shadow-md);
        }

        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          background: rgba(255,255,255,0.95);
        }

        .btn-large {
          padding: var(--space-lg) var(--space-2xl);
          font-size: var(--text-lg);
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: var(--space-lg);
          padding-bottom: var(--space-sm);
          width: 100%;
        }

        .scroll-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-size: var(--text-xs);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: var(--transition-base);
        }

        .scroll-link:hover {
          color: var(--color-white);
          transform: translateY(-2px);
        }

        .scroll-mouse {
          width: 22px;
          height: 36px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          position: relative;
          margin-top: var(--space-xs);
          transition: var(--transition-base);
        }

        .scroll-wheel {
          display: block;
          width: 4px;
          height: 8px;
          background: var(--color-white);
          border-radius: 2px;
          position: absolute;
          left: 50%;
          top: 6px;
          transform: translateX(-50%);
          animation: scrollWheel 1.8s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
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

        /* Tablet */
        @media (max-width: 768px) {
          .trust-bar {
            flex-direction: column;
            padding: var(--space-sm) var(--space-md);
            gap: 4px;
          }

          .trust-divider {
            width: 80%;
            height: 1px;
            margin: 2px 0;
          }

          .trust-item {
            padding: 2px 0;
            font-size: 0.8rem;
          }

          .btn-large {
            padding: var(--space-md) var(--space-xl);
            font-size: var(--text-base);
          }

          .hero-logo {
            max-height: 70px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .trust-bar {
            padding: var(--space-xs) var(--space-sm);
          }

          .trust-item {
            font-size: 0.7rem;
          }

          .btn-large {
            padding: var(--space-sm) var(--space-lg);
            width: 100%;
            max-width: 280px;
          }

          .hero-logo {
            max-height: 50px;
          }

          .scroll-link span {
            display: none;
          }

          .scroll-mouse {
            width: 24px;
            height: 40px;
            margin-top: 0;
          }
        }

        /* Landscape mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .hero-content-homepage {
            padding: var(--space-xl) 0;
          }

          .hero-logo-wrapper {
            margin-bottom: var(--space-md);
          }

          .hero-logo {
            max-height: 40px;
          }

          .hero-title-homepage {
            font-size: 1.3rem;
            margin-bottom: var(--space-sm);
          }

          .trust-bar {
            padding: var(--space-xs);
            margin-bottom: var(--space-md);
          }

          .hero-cta {
            margin-top: var(--space-md);
            margin-bottom: var(--space-md);
          }

          .scroll-indicator {
            margin-top: var(--space-md);
          }
        }
      `}</style>
    </section>
  );
}