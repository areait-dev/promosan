// components/PromoHealthCenter/SediInteractive.tsx
'use client';
import React, { useState } from 'react';
import SediToggle from './SediToggle';
import SedeCard from './SedeCard';
import MappaIframe from './MappaIframe';

interface SedeData {
  regione: string;
  indirizzo: string;
  telefono: string;
  email: string;
  mappaUrl: string;
  mappaTitolo: string;
  googleMapsLink?: string;
  image?: string;
}

interface SediInteractiveProps {
  sediData: {
    sicilia: SedeData;
    veneto: SedeData;
  };
  servizi: string[];
}

const SediInteractive = ({ sediData, servizi }: SediInteractiveProps) => {
  const [sedeAttiva, setSedeAttiva] = useState<'sicilia' | 'veneto'>('sicilia');

  return (
    <>
      <SediToggle 
        sedeAttiva={sedeAttiva} 
        setSedeAttiva={setSedeAttiva} 
      />
      
      <div className="sedi-content-grid">
        {/* COLONNA INFO CARD - a sinistra su desktop, sopra su mobile */}
        <div className="sedi-content-right">
          <div id={`sede-${sedeAttiva}`}>
            <SedeCard 
              sede={sedeAttiva}
              data={sediData[sedeAttiva]}
              servizi={servizi}
            />
          </div>
        </div>
        
        {/* COLONNA MAPPA - a destra su desktop, sotto su mobile */}
        <div className="sedi-content-left">
          <div className="sedi-map-wrapper">
            <h3 className="sedi-map-title">
              Mappa - {sediData[sedeAttiva].regione}
            </h3>
            <MappaIframe 
              url={sediData[sedeAttiva].mappaUrl}
              titolo={sediData[sedeAttiva].mappaTitolo}
            />
          </div>
        </div>
      </div>  
    </>
  );
};

export default SediInteractive;