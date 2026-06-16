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
  telefono: '+39 123 456 7890',
  email: 'info@promosan.it',
  whatsapp: '',
  piva: '01234567890',
  rea: 'MI-1234567',
  orari: '',
  areaRiservataUrl: 'https://clienti.promotergroup.eu/login',
  brochureUrl: '/Brochure PromoSan.pdf',
  copyright: '© 2024 PromoSan S.r.l. - Tutti i diritti riservati - P.IVA: 01234567890 - REA: MI-1234567',
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

  // Costruisce il copyright: usa quello da CMS, altrimenti compone da P.IVA/REA.
  const copyright =
    opt.copyright ||
    `© ${new Date().getFullYear()} PromoSan S.r.l. - Tutti i diritti riservati - P.IVA: ${opt.piva} - REA: ${opt.rea}`;

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navItems: NavItem[] = [
    { 
      name: 'Home', 
      path: '/',
      type: 'link'
    },
    { 
      name: 'Chi Siamo', 
      path: '/chi-siamo',
      type: 'parent',
      children: [
        { name: 'Promo Health Center', path: '/promo-health-center' }
      ]
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

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = opt.brochureUrl;
    link.download = 'PromoSan_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="footer bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        {/* NEWSLETTER - PIÙ SPAZIATA */}
        <div className="footer-newsletter mb-16">
          <div className="footer-newsletter-content bg-gray-800 rounded-xl p-8">
            <div className="footer-newsletter-text mb-6">
              <h3 className="text-2xl font-semibold mb-2">Newsletter</h3>
              <p className="text-gray-400">Ricevi le ultime novità normative</p>
            </div>
            <form 
              onSubmit={handleNewsletterSubmit}
              className="footer-newsletter-form flex flex-col sm:flex-row gap-4"
            >
              <div className="footer-newsletter-input-wrapper flex-1 relative">
                <input
                  type="email"
                  placeholder="La tua email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-primary pl-12"
                />
                <i className="fas fa-envelope footer-newsletter-icon absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="footer-newsletter-btn px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-50 whitespace-nowrap font-medium"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Invio...
                  </>
                ) : 'Iscriviti'}
              </button>
            </form>
          </div>
        </div>

        {/* 3 COLONNE - PIÙ SPAZIATE */}
        <div className="footer-grid grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Colonna 1: Logo & Contatti */}
          <div className="footer-col">
            <div className="footer-logo mb-6">
              <Image
                src={opt.logoBianco || '/assets/img/PromoSan_white.png'}
                alt="Logo"
                width={140} 
                height={40}
                className="footer-logo-img brightness-0 invert mb-4"
              />
              <p className="text-gray-400">{tagline}</p>
            </div>
            <div className="footer-contacts space-y-4">
              <div className="footer-contact-item flex items-center gap-3">
                <i className="fas fa-phone text-primary w-5"></i>
                <a href={`tel:${opt.telefono.replace(/[\s-]/g, '')}`} className="text-gray-300 hover:text-primary transition-colors">{opt.telefono}</a>
              </div>
              <div className="footer-contact-item flex items-center gap-3">
                <i className="fas fa-envelope text-primary w-5"></i>
                <a href={`mailto:${opt.email}`} className="text-gray-300 hover:text-primary transition-colors">{opt.email}</a>
              </div>
            </div>
          </div>
          
          {/* Colonna 2: Navigazione */}
          <div className="footer-col">
            <h4 className="footer-col-title text-xl font-semibold mb-6">Navigazione</h4>
            <ul className="footer-nav space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="footer-nav-link text-gray-300 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                  
                  {item.type === 'parent' && item.children && (
                    <div className="footer-submenu ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link 
                          key={child.name}
                          href={child.path} 
                          className="footer-submenu-link text-gray-400 hover:text-primary transition-colors text-sm block"
                        >
                          • {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colonna 3: Accesso & Social - CON PIÙ SPAZIO TRA GLI ELEMENTI */}
          <div className="footer-col">
            <h4 className="footer-col-title text-xl font-semibold mb-4">Accesso</h4>
            
            {/* BOTTONI CON PIÙ SPAZIO TRA LORO */}
            <div className="footer-buttons">
  <a
    href={opt.areaRiservataUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="footer-btn-first footer-btn-primary inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors mb-4"  /* Aggiunto mb-4 */
  >
    <i className="fas fa-lock text-xs"></i>
    Area Riservata
  </a>
  
  <button
    onClick={handleDownloadBrochure}
    className="footer-btn footer-btn-secondary inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
  >
    <i className="fas fa-file-pdf text-xs"></i>
    Scarica Brochure
  </button>
</div>
            
            {/* SOCIAL CON PIÙ SPAZIO DAI BOTTONI */}
            <h4 className="footer-col-title text-xl font-semibold mb-6">Seguici</h4>
            
            <div className="footer-social flex gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="footer-social-link w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${social.icon}`}></i>
                </a>
              ))}
            </div>
            
            {/* LINK LEGALI CON PIÙ SPAZIO DAI SOCIAL */}
            <div className="footer-legal text-sm text-gray-500">
              {legalLinks.map((link, index) => (
                <span key={link.name} className="footer-legal-item">
                  {index > 0 && <span className="footer-legal-separator mx-2">•</span>}
                  <Link href={link.href} className="footer-legal-link hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* COPYRIGHT - PIÙ SPAZIATO */}
        <div className="footer-copyright pt-8 mt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}