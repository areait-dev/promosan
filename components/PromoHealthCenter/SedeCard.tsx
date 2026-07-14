// components/PromoHealthCenter/SedeCard.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Definisci i tipi per i dati della sede
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

// Definisci i tipi per le props del componente
interface SedeCardProps {
  sede: 'sicilia' | 'veneto' | 'piemonte';
  data: SedeData;
  servizi: string[];
}

const SedeCard = ({ sede, data, servizi }: SedeCardProps) => {
  return (
    <div className="sede-card">
      <div className="card-logo">
      <Image
  src={data.image || "/assets/img/Promo_Health_Center_Logo_def.png"}
  alt={data.image ? `Sede ${data.regione}` : "Promo Health Center Logo"}
  width={180}
  height={60}
  className="h-12 w-auto"
/>
      </div>
      
      <div className="card-header">

      </div>      
      <div className="card-info">
        <div className="info-item">
          <div className="info-icon">
            <i className="fas fa-building"></i>
          </div>
          <div>
            <span className="info-label">Indirizzo</span>
            <p className="info-text">{data.indirizzo}</p>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <i className="fas fa-phone"></i>
          </div>
          <div>
            <span className="info-label">Telefono</span>
            <p className="info-text">{data.telefono}</p>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div>
            <span className="info-label">Email</span>
            <p className="info-text">{data.email}</p>
          </div>
        </div>
      </div>
      
      <div className="card-services">
        <h4 className="services-title">Servizi principali</h4>
        <div className="service-badges-grid">
          {servizi.map((servizio: string, index: number) => (
            <span key={index} className="service-badge">{servizio}</span>
          ))}
        </div>
      </div>
      
      <div className="card-buttons">
        <Link href="/contatti" className="btn-contact">
          <i className="fas fa-paper-plane"></i>
          Contatta questa sede
        </Link>
        <a
          href={data.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent(data.indirizzo)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-map"
        >
          <i className="fas fa-map-marker-alt"></i>
          Vai alla mappa
        </a>
      </div>
    </div>
  );
};

export default SedeCard;