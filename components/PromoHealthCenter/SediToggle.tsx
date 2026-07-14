// components/PromoHealthCenter/SediToggle.tsx
'use client';
import React from 'react';

interface SediToggleProps {
  sedeAttiva: 'sicilia' | 'veneto' | 'piemonte';
  setSedeAttiva: (sede: 'sicilia' | 'veneto' | 'piemonte') => void;
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
          SICILIA
        </button>
        <button
          className={`sedi-toggle-btn ${sedeAttiva === 'veneto' ? 'active' : ''}`}
          onClick={() => setSedeAttiva('veneto')}
        >
          VENETO
        </button>
        <button
          className={`sedi-toggle-btn ${sedeAttiva === 'piemonte' ? 'active' : ''}`}
          onClick={() => setSedeAttiva('piemonte')}
        >
          PIEMONTE
        </button>
      </div>

      <style jsx>{`
        .sedi-toggle {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .sedi-toggle-wrapper {
          display: inline-flex;
          background: #e9eff5;
          border-radius: 8px;
          padding: 4px;
          gap: 4px;
          border: 1px solid #d6deeb;
        }

        .sedi-toggle-btn {
          padding: 10px 36px;
          border: none;
          outline: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          color: #556982;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .sedi-toggle-btn.active {
          background: #2b578c;
          color: #ffffff;
        }

        .sedi-toggle-btn:not(.active):hover {
          color: #2b578c;
        }

        @media (max-width: 768px) {
          .sedi-toggle-wrapper {
            width: 90%;
            max-width: 340px;
          }
          
          .sedi-toggle-btn {
            flex: 1;
            padding: 10px 16px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SediToggle;