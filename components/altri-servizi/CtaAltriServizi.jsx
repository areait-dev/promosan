import React from 'react';
import { Calendar, Phone, Info, Check } from 'lucide-react';
import { T } from "@/components/Testi";

const CtaAltriServizi = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#2c5282] to-[#4299e1]">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="mb-6 text-3xl font-bold md:text-3xl">
            <T k="cta-altri-servizi.innovazione-in-azione-scopri-i-servizi">Innovazione in Azione: Scopri i Servizi del Futuro</T>
          </h2>
          
          <p className="mx-auto mb-8 max-w-3xl text-lg text-white/90">
            <T k="cta-altri-servizi.unisciti-alla-rivoluzione-sanitaria-digitale-e">Unisciti alla rivoluzione sanitaria digitale e sperimenta oggi i servizi che definiranno la medicina di domani</T>
          </p>
          
          <div className="flex flex-col gap-6 justify-center items-center sm:flex-row">
            <a 
              href="./contatti.html" 
              className="relative px-8 py-4 font-bold bg-white rounded-xl transition-all duration-300 group text-[#2c5282] hover:bg-gray-100 hover:shadow-2xl hover:scale-105"
            >
              <span className="flex relative z-10 gap-2 items-center">
                <Calendar size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                <span><T k="cta-altri-servizi.diventa-partner-innovativo">Diventa Partner Innovativo</T></span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r rounded-xl transition-all duration-500 from-[#2c5282]/0 to-[#4299e1]/0 group-hover:from-[#2c5282]/5 group-hover:to-[#4299e1]/5"></div>
            </a>
            
            <a 
              href="tel:+391234567890" 
              className="relative px-8 py-4 font-bold text-white rounded-xl border-2 border-white transition-all duration-300 group hover:bg-white hover:text-[#2c5282] hover:shadow-2xl hover:scale-105"
            >
              <span className="flex relative z-10 gap-2 items-center">
                <Phone size={16} className="transition-transform duration-300 group-hover:scale-110" />
                <span><T k="cta-altri-servizi.chiamaci-ora-per-informazioni">Chiamaci ora per informazioni</T></span>
              </span>
              <div className="absolute inset-0 rounded-xl transition-all duration-500 bg-white/0 group-hover:bg-white/5"></div>
            </a>
          </div>
          
          <div className="mt-8">
            <p className="inline-flex gap-2 items-center px-4 py-2 text-sm rounded-lg transition-all duration-300 text-white/70 bg-white/5 hover:bg-white/10 hover:scale-105 group">
              <Info size={16} />
              <span><T k="cta-altri-servizi.servizio-attivo-dal-lunedi-al-venerdi">Servizio attivo dal lunedì al venerdì, 8:00-18:00. Rispondiamo entro 24 ore</T></span>
              <Check size={16} className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaAltriServizi;