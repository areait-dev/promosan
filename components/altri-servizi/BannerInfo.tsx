'use client';

import React from 'react';

export default function BannerInfo() {
  return (
    <section className="banner-info-section">
      <div className="container">
        <div className="banner-content">
          <h2 className="banner-title">
            Innovazione in Azione: Scopri i Servizi del Futuro
          </h2>
          <p className="banner-subtitle">
            Unisciti alla rivoluzione sanitaria digitale e sperimenta oggi i servizi che definiranno la medicina di domani
          </p>
          
          <div className="banner-cta">
            <a href="tel:+390932862613" className="banner-button">
              <i className="fas fa-phone-alt"></i>
              <span>Chiamaci ora per informazioni</span>
            </a>
          </div>

          <div className="banner-note">
            <i className="far fa-clock"></i>
            <span>Servizio attivo dal lunedì al venerdì, 9:00-18:00. Rispondiamo entro 24 ore</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-info-section {
          background: linear-gradient(to right, #2c5282, #4299e1);
          padding: 4.5rem 1rem;
          text-align: center;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .banner-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .banner-title {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 800;
          margin-bottom: 1.2rem;
          line-height: 1.3;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .banner-subtitle {
          font-size: clamp(0.95rem, 2.5vw, 1.1rem);
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 700px;
        }

        .banner-cta {
          margin-bottom: 2rem;
        }

        .banner-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2.2rem;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid #ffffff;
          border-radius: 8px;
          color: #ffffff;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: clamp(0.9rem, 2.5vw, 1rem);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .banner-button:hover {
          background: #ffffff;
          color: #2c5282;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .banner-note {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          font-size: clamp(0.75rem, 2vw, 0.85rem);
          color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
        }

        .banner-note i {
          font-size: 0.9rem;
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
}
