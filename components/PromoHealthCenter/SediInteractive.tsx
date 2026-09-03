// components/PromoHealthCenter/SediInteractive.tsx
'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SediToggle from './SediToggle';
import SedeCard from './SedeCard';

// Iframe Google Maps: non necessario al render iniziale, caricato solo lato
// client in un chunk separato.
const MappaIframe = dynamic(() => import('./MappaIframe'), {
  ssr: false,
  loading: () => <div className="map-container" aria-hidden="true" />,
});

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
    piemonte: SedeData;
  };
  servizi: string[];
}

const SediInteractive = ({ sediData, servizi }: SediInteractiveProps) => {
  const [sedeAttiva, setSedeAttiva] = useState<'sicilia' | 'veneto' | 'piemonte'>('sicilia');

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