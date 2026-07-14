'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { GlobalOptions } from '../../lib/wordpress';

interface NavItem {
  name: string;
  path: string;
  type: 'link' | 'parent';
  children?: { name: string; path: string }[];
}

interface SocialLink {
  icon: string;
  href: string;
}

interface LegalLink {
  name: string;
  href: string;
}

export interface FooterProps {
  options?: Partial<GlobalOptions>;
  tagline?: string;
}

const DEFAULT_OPTIONS: GlobalOptions = {
  telefono: '800 034 615',
  email: 'info@promosan.eu',
  whatsapp: '',
  piva: '01840870883',
  rea: 'MI-1234567',
  orari: '',
  areaRiservataUrl: 'https://clienti.promotergroup.eu/login',
  brochureUrl: '/assets/pdf/Brochure PromoSan.pdf',
  copyright: '© 2026 PromoSan S.r.l. - Tutti i diritti riservati - P.IVA: 01840870883 - REA: MI-1234567',
  logoUrl: '/assets/img/PromoSan.png',
  logoBianco: '/assets/img/PromoSan_white.png',
  social: { linkedin: '#', facebook: '#', instagram: '#' },
};

export default function Footer({ options, tagline = 'Consulenza specializzata per la Sanità' }: FooterProps = {}) {
  const opt: GlobalOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    social: { ...DEFAULT_OPTIONS.social, ...(options?.social ?? {}) },
  };

  const copyright =
    opt.copyright && opt.copyright.includes('01840870883')
      ? opt.copyright
      : `© 2026 PromoSan S.r.l. - Tutti i diritti riservati - P.IVA: 01840870883 - REA: MI-1234567`;

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const telefono = opt.telefono || '800 034 615';
  const emailVal = opt.email || 'info@promosan.eu';

  const navItems: NavItem[] = [
    {
      name: 'Home',
      path: '/',
      type: 'link'
    },
    {
      name: 'Servizi',
      path: '/servizi',
      type: 'parent',
      children: [
        { name: 'Medicina del lavoro', path: '/medicina-del-lavoro' },
        { name: 'Unità mobili', path: '/unita-mobili' },
        { name: 'Welfare aziendale', path: '/welfare-aziendale' },
        { name: 'Altri servizi', path: '/altri-servizi' }
      ]
    },
    {
      name: 'Sedi',
      path: '/promo-health-center#strutture-section',
      type: 'link'
    },
    {
      name: 'News',
      path: '/news',
      type: 'link'
    },
    {
      name: 'Contatti',
      path: '/contatti',
      type: 'link'
    }
  ];

  const socialLinks: SocialLink[] = [
    { icon: 'fab fa-linkedin-in', href: opt.social.linkedin },
    { icon: 'fab fa-facebook-f', href: opt.social.facebook },
    { icon: 'fab fa-instagram', href: opt.social.instagram },
  ];

  const legalLinks: LegalLink[] = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Termini e Condizioni', href: '/termini-e-condizioni' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Inserisci una email valida');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alert('Grazie per l\'iscrizione!');
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  const brochureUrl = opt.brochureUrl || '/assets/pdf/Brochure PromoSan.pdf';

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = encodeURI(brochureUrl);
    link.download = 'PromoSan_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="footer promosan-footer">
      <div className="footer-container">

        {/* NEWSLETTER */}
        <div className="footer-newsletter">
          <div className="footer-newsletter-content">
            <div className="footer-newsletter-text">
              <h3>Newsletter</h3>
              <p>Ricevi le ultime novità normative</p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="footer-newsletter-form"
            >
              <div className="footer-newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="La tua email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                />
                <i className="fas fa-envelope footer-newsletter-icon"></i>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="footer-newsletter-btn"
              >
                {isSubmitting ? 'Invio...' : 'Iscriviti'}
              </button>
            </form>
          </div>
        </div>

        {/* 3 COLONNE */}
        <div className="footer-grid">

          {/* Colonna 1: Logo & Contatti */}
          <div className="footer-col">
            <div className="footer-logo mb-6">
              <Image
                src={opt.logoBianco || '/assets/img/PromoSan_white.png'}
                alt="Logo"
                width={160}
                height={45}
                className="footer-logo-img mb-4"
                style={{ width: '50%', height: 'auto' }}
              />
              <p className="footer-tagline">{tagline}</p>
            </div>
            <div className="footer-contacts">
              <div className="footer-contact-item">
                <i className="fas fa-phone"></i>
                <a href={`tel:${telefono.replace(/[\s-]/g, '')}`}>{telefono}</a>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${emailVal}`}>{emailVal}</a>
              </div>
            </div>
          </div>

          {/* Colonna 2: Navigazione */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigazione</h4>
            <ul className="footer-nav">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.type === 'parent' ? (
                    <span className="footer-nav-link">{item.name}</span>
                  ) : (
                    <Link href={item.path} className="footer-nav-link">
                      {item.name}
                    </Link>
                  )}

                  {item.type === 'parent' && item.children && (
                    <div className="footer-submenu">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.path}
                          className="footer-submenu-link"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3: Accesso & Social */}
          <div className="footer-col">
            <h4 className="footer-col-title">Accesso</h4>

            <div className="footer-buttons">
              <a
                href="https://clienti.promotergroup.eu/login"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-btn-primary"
              >
                <i className="fas fa-lock"></i>
                Area Riservata
              </a>

              <button
                onClick={handleDownloadBrochure}
                className="footer-btn-secondary"
              >
                <i className="fas fa-file-pdf"></i>
                Scarica Brochure
              </button>
            </div>

            <h4 className="footer-col-title">Seguici</h4>

            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${social.icon}`}></i>
                </a>
              ))}
            </div>

            <div className="footer-legal">
              {legalLinks.map((link, index) => (
                <span key={link.name} className="footer-legal-item">
                  {index > 0 && <span className="footer-legal-separator">•</span>}
                  <Link href={link.href} className="footer-legal-link">
                    {link.name}
                  </Link>
                </span>
              ))}
              <span className="footer-legal-item">
                <span className="footer-legal-separator">•</span>
                <button
                  type="button"
                  className="footer-legal-link"
                  onClick={() => window.openCookiePreferences?.()}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
                >
                  Gestisci preferenze cookie
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copyright">
          <p>
            {copyright}
          </p>
        </div>
      </div>

      <style jsx>{`
        .promosan-footer {
          background-color: #141f2e !important;
          color: #94a3b8;
          font-family: var(--font-family-base);
          padding: 64px 0 32px 0;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Newsletter Box */
        .footer-newsletter {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin-bottom: 32px !important;
        }

        .footer-newsletter-content {
          background-color: #1d2c3f !important;
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer-newsletter-text {
          flex: 1;
          min-width: 250px;
        }

        .footer-newsletter-text h3 {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 4px;
          text-transform: none;
        }

        .footer-newsletter-text p {
          color: #94a3b8;
          font-size: 0.85rem;
          margin-bottom: 0;
        }

        .footer-newsletter-form {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1.2;
          min-width: 300px;
        }

        .footer-newsletter-input-wrapper {
          position: relative;
          flex: 1;
        }

        .footer-newsletter-input {
          width: 100%;
          padding: 10px 44px 10px 16px;
          background-color: #141f2e !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 8px;
          color: #fff;
          font-size: 0.85rem;
          height: 42px;
        }

        .footer-newsletter-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 0.9rem;
        }

        .footer-newsletter-btn {
          background: linear-gradient(135deg, #2c5282 0%, #4299e1 100%) !important;
          color: #fff !important;
          padding: 0 24px !important;
          height: 42px;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2) !important;
        }

        .footer-newsletter-btn:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        /* Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1.3fr;
          gap: 48px;
          margin-top: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .footer-logo-img {
          /* Keep original white/blue logo colors */
          filter: none;
        }

        .footer-tagline {
          color: #94a3b8;
          font-size: 0.85rem;
          margin-top: 8px;
        }

        .footer-col-title {
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: none; /* Removed uppercase to match screen */
        }

        .footer-contacts {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-contact-item i {
          color: #fff; /* White icons to match screen */
          width: 16px;
        }

        .footer-contact-item a {
          color: #fff !important;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }

        .footer-contact-item a:hover {
          color: #4299e1 !important;
        }

        /* Nav links */
        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-nav-link {
          color: #fff; /* White navigation headers to match screen */
          font-size: 0.9rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .footer-nav-link:hover {
          color: #4299e1;
        }

        .footer-submenu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-left: 12px;
          margin-top: 8px;
        }

        .footer-submenu-link {
          color: #94a3b8;
          font-size: 0.85rem;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
        }

        .footer-submenu-link:hover {
          color: #4299e1;
        }

        .footer-submenu-link::before {
          content: '▪';
          color: #4299e1;
          font-size: 0.65rem;
          margin-right: 8px;
          display: inline-block;
        }

        /* Col 3 Buttons - Side-by-side */
        .footer-buttons {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .footer-btn-primary {
          background-color: #1a2c42 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
          border-radius: 8px !important;
          padding: 10px 16px !important;
          font-weight: 700 !important;
          font-size: 0.82rem !important;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .footer-btn-primary:hover {
          background-color: #24354c !important;
        }

        .footer-btn-secondary {
          background: linear-gradient(135deg, #4299e1, #2b6cb0) !important;
          color: #fff !important;
          border-radius: 8px !important;
          padding: 10px 16px !important;
          font-weight: 700 !important;
          font-size: 0.82rem !important;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: center;
          transition: all 0.2s ease;
          border: none !important;
        }

        .footer-btn-secondary:hover {
          opacity: 0.95;
        }

        /* Social circles */
        .footer-social {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
        }

        .footer-social-link {
          width: 36px;
          height: 36px;
          background-color: #1a2c42;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .footer-social-link:hover {
          background-color: #4299e1;
        }

        /* Legal Links */
        .footer-legal {
          display: flex;
          gap: 12px;
          font-size: 0.78rem;
          color: #64748b;
        }

        .footer-legal-link {
          color: #64748b;
          transition: color 0.2s ease;
        }

        .footer-legal-link:hover {
          color: #4299e1;
        }

        .footer-legal-separator {
          margin: 0 4px;
        }

        /* Copyright */
        .footer-copyright {
          text-align: left !important;
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 24px;
        }
      `}</style>
    </footer>
  );
}