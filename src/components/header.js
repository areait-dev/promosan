"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary font-sans">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. LOGO: Deve essere proporzionato all'altezza h-20 */}
          <div className="flex w-auto">
            <Link href="/" className="block">
              <div className="relative w-auto h-10 md:h-50">
                <Image 
                  src="/img/logo.png" 
                  alt="PromoSan Logo" 
                  width={902} 
                  height={96}
                  className="h-full w-auto filter brightness-0 invert"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* 2. MENU DESKTOP: Nota la classe rounded-full e backdrop-blur */}
          <nav className="hidden lg:block">
            <ul className="flex items-center px-2 py-1 space-x-1 rounded-full shadow-2xl backdrop-blur-sm bg-primary border border-white/10">
              
              {/* Link Semplice */}
              <li>
                <Link href="/" className="flex gap-2 items-center px-4 py-3 text-white rounded-full transition-all duration-300 nav-pill hover:bg-white hover:text-primary text-16 font-medium whitespace-nowrap">
                  Home
                </Link>
              </li>

              {/* Dropdown Chi Siamo */}
              <li className="relative group has-dropdown">
                <button className="flex gap-2 items-center px-4 py-3 text-white rounded-full transition-all duration-300 nav-pill hover:bg-white hover:text-primary text-16 font-medium whitespace-nowrap outline-none">
                  Chi siamo <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Il Dropdown ora usa la classe dropdown-menu definita in globals.css */}
                <div className="dropdown-menu">
                  <div className="py-2">
                    <Link href="/promo-health-center" className="flex gap-3 items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors duration-200">
                      <span className="text-14 font-medium">Promo Health Center</span>
                    </Link>
                  </div>
                </div>
              </li>

              {/* Dropdown Servizi */}
              <li className="relative group has-dropdown">
                <button className="flex gap-2 items-center px-4 py-3 text-white rounded-full transition-all duration-300 nav-pill hover:bg-white hover:text-primary text-16 font-medium whitespace-nowrap outline-none">
                  Servizi <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="dropdown-menu w-72">
                  <div className="py-2">
                    {["Medicina del lavoro", "Unità mobili", "Welfare aziendale", "Altri Servizi"].map((item) => (
                      <Link 
                        key={item}
                        href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                        className="flex gap-3 items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors duration-200"
                      >
                        <span className="text-14 font-medium">{item}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li><Link href="#news" className="flex gap-2 items-center px-4 py-3 text-white rounded-full transition-all duration-300 nav-pill hover:bg-white hover:text-primary text-16 font-medium">News</Link></li>
              <li><Link href="/contatti" className="flex gap-2 items-center px-4 py-3 text-white rounded-full transition-all duration-300 nav-pill hover:bg-white hover:text-primary text-16 font-medium">Contatti</Link></li>
            </ul>
          </nav>

          {/* 3. SEARCH & AREA RISERVATA */}
<div className="hidden items-center space-x-4 lg:flex">
  
  {/* Search Bar con animazione e effetto Glass */}
  <div className="relative group">
    <input
      type="text"
      placeholder="Cerca..."
      className="py-2 pr-10 pl-4 w-32 text-sm text-white rounded-full border border-white/20 
                 bg-white/10 backdrop-blur-md outline-none transition-all duration-500 ease-in-out
                 placeholder:text-white/60
                 focus:w-52 focus:bg-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/30"
    />
    <Search 
      size={16} 
      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-white transition-colors" 
    />
  </div>

  {/* Area Riservata con effetto Glass */}
  <Link 
    href="/area-riservata" 
    className="flex gap-2 items-center px-5 py-2.5 text-white rounded-full border border-white/20 
               bg-white/10 backdrop-blur-md transition-all duration-300 
               hover:bg-white hover:text-primary hover:border-white text-15 font-medium shadow-sm"
  >
    Area Riservata
  </Link>
</div>

          {/* 4. BOTTONE MOBILE (Hamburger) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 text-white rounded-lg bg-primary/90 hover:bg-primary transition-all"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MENU MOBILE: Animato con la classe slide-up */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-24 z-40 rounded-2xl bg-white shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto lg:hidden animate-slide-up">
          <div className="p-4">
            <ul className="space-y-2">
              <li><Link href="/" className="flex gap-3 items-center px-4 py-3 text-gray-800 rounded-lg hover:bg-blue-50 font-medium">Home</Link></li>
              <li><Link href="/chi-siamo" className="flex gap-3 items-center px-4 py-3 text-gray-800 rounded-lg hover:bg-blue-50 font-medium">Chi siamo</Link></li>
              <li><Link href="/servizi" className="flex gap-3 items-center px-4 py-3 rounded-lg hover:bg-blue-50 font-medium text-primary">Servizi</Link></li>
              <li><Link href="/news" className="flex gap-3 items-center px-4 py-3 text-gray-800 rounded-lg hover:bg-blue-50 font-medium">News</Link></li>
              <li><Link href="/contatti" className="flex gap-3 items-center px-4 py-3 text-gray-800 rounded-lg hover:bg-blue-50 font-medium">Contatti</Link></li>
              <li className="pt-4 mt-4 border-t border-gray-100">
                <Link href="/area-riservata" className="flex gap-3 items-center px-4 py-3 text-white bg-primary rounded-lg font-medium justify-center">
                  Area Riservata
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}