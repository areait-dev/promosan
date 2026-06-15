// src/components/Unita-mobili/CtaUnitaMobili.jsx
import React from 'react';

const CtaUnitaMobili = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Titolo */}
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            PORTIAMO LA SANITÀ NELLA TUA AZIENDA
          </h2>
          
          {/* Sottotitolo */}
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-white/90">
            Scopri come le nostre Unità Mobili possono ottimizzare la gestione della medicina del lavoro nella tua realtà aziendale.
          </p>
          
          {/* Bottone CTA */}
          <div className="flex justify-center">
            <a
              href="/contatti"
              className="inline-block px-10 py-5 text-lg font-bold text-white rounded-xl transition-all duration-300 bg-accent hover:bg-white hover:text-primary hover:shadow-2xl"
            >
              Richiedi una consulenza gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaUnitaMobili;