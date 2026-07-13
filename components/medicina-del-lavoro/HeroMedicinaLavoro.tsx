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
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
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

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <button 
              onClick={scrollToContent}
              className="scroll-link"
              aria-label="Scorri verso il basso"
            >
              <div className="scroll-mouse">
                <span className="scroll-wheel" />
              </div>
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

        .scroll-mouse {
          width: 22px;
          height: 36px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          position: relative;
          margin-top: 0.5rem;
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

        @media (max-height: 600px) and (orientation: landscape) {
          .scroll-indicator {
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}