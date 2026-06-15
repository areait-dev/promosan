// components/PromoHealthCenter/MappaIframe.tsx
'use client';
import React from 'react';

interface MappaIframeProps {
  url: string;
  titolo: string;
}

const MappaIframe = ({ url, titolo }: MappaIframeProps) => {
  return (
    <div className="map-container">
      <iframe 
        src={url}
        width="100%" 
        height="100%" 
        style={{ border: 0, minHeight: '400px' }}
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title={titolo}
        className="map-iframe">
      </iframe>
    </div>
  );
};

export default MappaIframe;