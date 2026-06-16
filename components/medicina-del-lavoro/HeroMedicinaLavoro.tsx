'use client'
import Link from 'next/link';

export interface HeroMedicinaLavoroProps {
  badge?: string;
  title?: string;
  ctaLabel?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

const DEFAULT_BADGE = 'Medicina del Lavoro';
const DEFAULT_TITLE = 'IL TUO PARTNER PER LA SORVEGLIANZA SANITARIA';
const DEFAULT_CTA_LABEL = 'Richiedi un preventivo';
const DEFAULT_CTA_LINK = '/contatti';

export default function HeroMedicinaLavoro({
  badge = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  ctaLabel = DEFAULT_CTA_LABEL,
  ctaLink = DEFAULT_CTA_LINK,
  backgroundImage,
}: HeroMedicinaLavoroProps = {}) {
  const scrollToContent = () => {
    const heroSection = document.querySelector('.hero-section-medicina');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      const scrollPosition = window.pageYOffset + rect.height;
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      className="hero-section hero-section-medicina"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-badge">
            <span>{badge}</span>
          </div>

          <h1 className="hero-title">
            {title}
          </h1>

          <Link href={ctaLink} className="btn btn-white">
            {ctaLabel}
          </Link>

          {/* Scroll Indicator - Solo la freccia */}
          <div className="scroll-indicator">
            <button 
              onClick={scrollToContent}
              className="scroll-link"
              aria-label="Scorri verso il basso"
            >
              <i className="fas fa-chevron-down scroll-arrow" />
            </button>
          </div>
        </div>
      </div>

      {/* Solo gli stili per la scroll arrow come nella homepage */}
      <style jsx>{`
        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 4rem;
          padding-bottom: 2rem;
          width: 100%;
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

        .scroll-arrow {
          font-size: 1.5rem;
          animation: bounceArrow 2s ease-in-out infinite;
        }

        @keyframes bounceArrow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        @media (max-width: 480px) {
          .scroll-arrow {
            font-size: 2rem;
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .scroll-indicator {
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}