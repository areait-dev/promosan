'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, Search, Lock, X } from 'lucide-react';

export interface NavbarProps {
  logoUrl?: string;
  areaRiservataUrl?: string;
}

export default function Navbar({
  logoUrl = '/assets/img/PromoSan_white.png',
  areaRiservataUrl = 'https://clienti.promotergroup.eu/login',
}: NavbarProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiziOpen, setIsServiziOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServiziOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ricerca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      closeMobileMenu();
      setIsSearchOverlayOpen(false);
    }
  };

  useEffect(() => {
    if (!isSearchOverlayOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOverlayOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOverlayOpen]);

  return (
    <header className="bg-primary sticky top-0 z-50 w-full shadow-xl">
      <div className="container">
        <div className="navbar-inner flex justify-between items-center h-[100px] lg:h-20">
          {/* Logo a sinistra */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src={logoUrl}
                alt="PromoSan Logo"
                width={140}
                height={40}
                sizes="140px"
                className="brightness-0 invert h-8 lg:h-[38px] w-auto"
                priority
              />
            </Link>
          </div>

          {/* Menu Desktop (centrato nello spazio tra logo e azioni) */}
          <nav className="navbar-menu hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-1 items-center px-2 py-2 rounded-full">
              <li>
                <Link href="/" className="nav-pill" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>

              {/* Servizi Dropdown */}
              <li className="relative group">
                <button className="nav-pill flex items-center gap-1">
                  <span>Servizi</span>
                  <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="dropdown-menu">
                  <Link
                    href="/medicina-del-lavoro"
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    Medicina del lavoro
                  </Link>
                  <Link
                    href="/unita-mobili"
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    Unità mobili
                  </Link>
                  <Link
                    href="/welfare-aziendale"
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    Welfare aziendale
                  </Link>
                  <Link
                    href="/altri-servizi"
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    Altri Servizi
                  </Link>
                </div>
              </li>

              <li>
                <Link href="/promo-health-center" className="nav-pill" onClick={closeMobileMenu}>
                  Sedi
                </Link>
              </li>
              <li>
                <Link href="/news" className="nav-pill" onClick={closeMobileMenu}>
                  News
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="nav-pill" onClick={closeMobileMenu}>
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Actions: la search testuale sta comoda solo da 1536px in su;
              tra 1024 e 1535px (notebook) mostriamo solo l'icona con overlay,
              per evitare l'overlap tra menu/search/CTA in quella fascia. */}
          <div className="navbar-actions hidden lg:flex gap-3 2xl:gap-6 items-center">
            <form onSubmit={handleSearch} className="search-form hidden 2xl:flex">
              <input
                type="text"
                placeholder="Cerca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="sr-only">Cerca</button>
            </form>
            <button
              type="button"
              onClick={() => setIsSearchOverlayOpen(true)}
              className="search-icon-btn flex 2xl:hidden"
              aria-label="Cerca"
            >
              <Search className="h-4 w-4" />
            </button>
            <a
              href={areaRiservataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-pill"
            >
              Area Riservata
            </a>
          </div>

          {/* Hamburger Mobile */}
          <button
            id="menuToggle"
            className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-28 z-50 max-h-[70vh] overflow-y-auto rounded-2xl bg-white shadow-2xl lg:hidden">
          <div className="p-2 flex flex-col">
            <Link 
              href="/" 
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            <div className="mobile-divider"></div>

            {/* Servizi mobile */}
            <div>
              <button
                className="mobile-dropdown-btn"
                onClick={() => setIsServiziOpen(!isServiziOpen)}
              >
                <span>Servizi</span>
                <ChevronDown className={`mobile-dropdown-icon h-4 w-4 ${
                  isServiziOpen ? 'rotate-180 text-primary' : ''
                }`} />
              </button>
              
              <div className={`mobile-submenu ${
                isServiziOpen ? 'open' : ''
              }`}>
                <div className="pb-2 pl-4 pr-4 flex flex-col space-y-1">
                  <Link 
                    href="/medicina-del-lavoro" 
                    className="mobile-submenu-link"
                    onClick={closeMobileMenu}
                  >
                    Medicina del lavoro
                  </Link>
                  <Link 
                    href="/unita-mobili" 
                    className="mobile-submenu-link"
                    onClick={closeMobileMenu}
                  >
                    Unità mobili
                  </Link>
                  <Link 
                    href="/welfare-aziendale" 
                    className="mobile-submenu-link"
                    onClick={closeMobileMenu}
                  >
                    Welfare aziendale
                  </Link>
                  <Link 
                    href="/altri-servizi" 
                    className="mobile-submenu-link"
                    onClick={closeMobileMenu}
                  >
                    Altri Servizi
                  </Link>
                </div>
              </div>
            </div>

            <div className="mobile-divider"></div>

            <Link
              href="/promo-health-center"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              Sedi
            </Link>

            <Link
              href="/news"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              News
            </Link>

            <Link 
              href="/contatti" 
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              Contatti
            </Link>

            <div className="mobile-divider"></div>

            {/* Ricerca Mobile */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca nel sito..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4"
                />
              </form>
            </div>

            {/* Area Riservata mobile */}
            <div className="px-4 py-2">
              <a
                href={areaRiservataUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 font-medium text-white"
                onClick={closeMobileMenu}
              >
                <Lock className="h-4 w-4" />
                <span>Area Riservata</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Overlay ricerca: usato tra 1024 e 1535px (icona), vedi navbar-actions */}
      {isSearchOverlayOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Cerca nel sito"
          onClick={() => setIsSearchOverlayOpen(false)}
        >
          <form
            onSubmit={handleSearch}
            className="search-overlay-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Cerca nel sito..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-overlay-input"
            />
            <button
              type="button"
              onClick={() => setIsSearchOverlayOpen(false)}
              className="search-overlay-close"
              aria-label="Chiudi ricerca"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}