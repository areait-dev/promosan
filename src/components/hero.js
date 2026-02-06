import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ subtitle, image }) {
  return (
    <section id="home" className="min-h-[85vh] md:min-h-screen relative bg-linear-to-br from-primary via-secondary to-dark overflow-hidden flex items-center justify-center">
      
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
        {image?.node ? (
          <Image 
            src={image?.node?.sourceUrl?.toString()} 
            alt={image?.node?.altText?.toString() || "Sfondo PromoSan"}
            fill
            priority
            className="object-cover opacity-45"
          />
        ) : (
          <div className="bg-slate-900 w-full h-full opacity-50"></div>
        )}
        <div className="absolute inset-0 bg-linear-to-b to-transparent from-primary/50 via-primary/10"></div>
      </div>

      {/* Contenuto principale - Ridotti i margini (mb-4/mb-6) */}
      <div className="relative z-20 flex flex-col justify-center items-center px-4 w-full text-white">
        <div className="text-center max-w-4xl">
          
          {/* Logo - Ridotto il margine inferiore */}
          <div className="flex justify-center mb-4 md:mb-6 animate-slide-up">
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

          <div className="mx-auto mb-4 w-24 h-0.5 bg-white/50 animate-slide-up" style={{ animationDelay: '0.2s' }}></div>

          {/* Sottotitolo - Più compatto */}
          <h1 className="mb-4 text-xl font-light md:text-2xl lg:text-3xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {subtitle || "Vicini alla salute dei lavoratori"}
          </h1>

          {/* Testo descrittivo - Margine ridotto */}
          <p className="mx-auto max-w-2xl text-base md:text-lg lg:text-xl text-white/80 animate-slide-up mb-8" style={{ animationDelay: '0.6s' }}>
            Proteggiamo chi costruisce, produce, crea. Portiamo prevenzione e benessere ovunque siano i tuoi lavoratori.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center mx-auto max-w-xl sm:flex-row animate-slide-up" style={{ animationDelay: '0.8s' }}>
            
            <Link href="#servizi" className="w-full sm:w-auto bg-primary hover:bg-dark text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:-translate-y-0.5 text-center">
              Scopri i nostri servizi
            </Link>

            {/* BOTTONE GLASSMORTPHISM: Trasparente, sfocato e con bordo sottile */}
            <Link href="#contatti" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:bg-white/20 hover:shadow-2xl hover:-translate-y-0.5 border border-white/20 text-center">
              Richiedi un preventivo
            </Link>

          </div>
        </div>

        {/* Scroll Indicator
        <Link href="#chi-siamo" className="absolute -bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-5 h-9 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-0.5 h-1.5 bg-white/70 rounded-full animate-bounce"></div>
          </div>
        </Link> */}
      </div>
    </section>
  );
}