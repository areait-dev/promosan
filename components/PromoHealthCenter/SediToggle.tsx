// components/PromoHealthCenter/SediToggle.tsx
'use client';
import React from 'react';

interface SediToggleProps {
  sedeAttiva: 'sicilia' | 'veneto';
  setSedeAttiva: (sede: 'sicilia' | 'veneto') => void;
}

const SediToggle = ({ sedeAttiva, setSedeAttiva }: SediToggleProps) => {
  return (
    <div 
      className="sedi-toggle" 
      data-sede-attiva={sedeAttiva}
    >
      <div className="sedi-toggle-wrapper">
        <button 
          className={`sedi-toggle-btn ${sedeAttiva === 'sicilia' ? 'active' : ''}`}
          onClick={() => setSedeAttiva('sicilia')}
        >
          SEDE SICILIA
        </button>
        <button 
          className={`sedi-toggle-btn ${sedeAttiva === 'veneto' ? 'active' : ''}`}
          onClick={() => setSedeAttiva('veneto')}
        >
          SEDE VENETO
        </button>
      </div>
    </div>
  );
};

export default SediToggle;