'use client'
import React from 'react';
import Image from 'next/image';

export interface RetePartnerProps {
  title?: string;
  text?: string; // HTML
}

const DEFAULT_TITLE = 'RETE DI PARTNER QUALIFICATI';
const DEFAULT_TEXT =
  'La nostra presenza è ulteriormente rafforzata da una distribuzione capillare di partner certificati su tutto il territorio nazionale. Questa rete di professionisti qualificati ci consente di garantire vicinanza alle aziende clienti, tempestività negli interventi e standard qualitativi uniformi, anche nelle aree più periferiche.';

export default function RetePartner({
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
}: RetePartnerProps = {}) {
  return (
    <section style={{ padding: '3rem 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3rem'
          }}
          className="rete-partner-row"
        >
          {/* TESTO A SINISTRA */}
          <div style={{ width: '100%' }} className="rete-partner-text">
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#2c5282',
              marginBottom: '1rem'
            }}>
              {title}
              <span style={{
                display: 'block',
                width: '5rem',
                height: '4px',
                backgroundColor: '#2c5282',
                marginTop: '0.75rem',
                borderRadius: '2px'
              }}></span>
            </h3>

            <p
              style={{
                fontSize: '1.125rem',
                color: '#374151',
                lineHeight: '1.75',
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
          
          {/* FOTO A DESTRA */}
          <div style={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }} className="rete-partner-image">
            <div style={{ 
              position: 'relative',
              width: '300px',
              height: '300px',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
              <Image
                src="/Screenshot 2026-03-03 144118.png"
                alt="Rete di partner qualificati PromoSan"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 300px, 400px"
                priority
              />
            </div>
          </div>
          
        </div>
      </div>

      {/* CSS per desktop */}
      <style jsx>{`
        @media (min-width: 768px) {
          .rete-partner-row {
            flex-direction: row !important;
            justify-content: space-between;
          }
          .rete-partner-text {
            width: 50% !important;
            order: 1;
          }
          .rete-partner-image {
            width: 50% !important;
            justify-content: flex-end !important;
            order: 2;
          }
          .rete-partner-image > div {
            width: 400px !important;
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}