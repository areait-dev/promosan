"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react'; // Corretto da userRef a useRef
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextPressure from './TextPressure';

export default function Hero({ subtitle, image }) {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".gsap-reveal", {
      y: 60,            
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      id="home" 
      className="min-h-[85vh] md:min-h-screen relative bg-linear-to-br from-primary via-secondary to-dark overflow-hidden flex items-center justify-center"
    >
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-10">
        <div className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>
      </div>

      {/* Immagine di sfondo dinamica */}
      <div className="absolute inset-0 z-0">
        {image?.node?.sourceUrl && (
          <Image 
            src={image.node.sourceUrl} 
            alt={image.node.altText || "Sfondo PromoSan"}
            fill
            priority
            className="object-cover opacity-45"
          />
        )}
      </div>

      <div className="relative z-20 flex flex-col justify-center items-center px-4 w-full text-white">
        <div className="text-center max-w-4xl">
          
          {/* Aggiunta classe .gsap-reveal agli elementi da animare */}
          <div className="flex justify-center mb-4 md:mb-6 gsap-reveal">
             <div className="relative w-full max-w-60 md:max-w-90">
                <Image 
                  src="/img/logo.png"
                  alt="Logo PromoSan" 
                  width={902}
                  height={96}
                  className="h-auto w-full filter brightness-0 invert" 
                />
             </div>
          </div>

          <div className="mx-auto mb-4 w-24 h-0.5 bg-white/50 gsap-reveal"></div>

          <div className="mb-8 gsap-reveal" style={{ position: 'relative', height: '150px', width: '100%' }}>
            <TextPressure
              text={subtitle || "PROMOSAN"}
              flex={true}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              minFontSize={40}
            />
          </div>

          <p className="mx-auto max-w-2xl text-base md:text-lg lg:text-xl text-white/80 mb-8 gsap-reveal">
            Proteggiamo chi costruisce, produce, crea. Portiamo prevenzione e benessere ovunque siano i tuoi lavoratori.
          </p>

          <div className="flex flex-col gap-4 justify-center items-center mx-auto max-w-xl sm:flex-row gsap-reveal">
            <Link href="#servizi" className="w-full sm:w-auto bg-primary hover:bg-dark text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:-translate-y-0.5 text-center">
              Scopri i nostri servizi
            </Link>

            <Link href="#contatti" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:bg-white/20 hover:shadow-2xl hover:-translate-y-0.5 border border-white/20 text-center">
              Richiedi un preventivo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}