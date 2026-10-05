// components/PromoHealthCenter/SedeCard.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Phone, Mail, Send, MapPin } from 'lucide-react';
import { T } from "@/components/Testi";

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
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <span className="info-label"><T k="sede-card.indirizzo">Indirizzo</T></span>
            <p className="info-text">{data.indirizzo}</p>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <span className="info-label"><T k="sede-card.telefono">Telefono</T></span>
            <p className="info-text">{data.telefono}</p>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <span className="info-label"><T k="sede-card.email">Email</T></span>
            <p className="info-text">{data.email}</p>
          </div>
        </div>
      </div>
      
      <div className="card-services">
        <h4 className="sede-services-title"><T k="sede-card.servizi-principali">Servizi principali</T></h4>
        <div className="service-badges-grid">
          {servizi.map((servizio: string, index: number) => (
            <span key={index} className="service-badge">{servizio}</span>
          ))}
        </div>
      </div>
      
      <div className="card-buttons">
        <Link href="/contatti" className="btn-contact">
          <Send className="h-4 w-4" />
          <T k="sede-card.contatta-questa-sede">Contatta questa sede</T>
        </Link>
        <a
          href={data.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent(data.indirizzo)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-map"
        >
          <MapPin className="h-4 w-4" />
          <T k="sede-card.vai-alla-mappa">Vai alla mappa</T>
        </a>
      </div>
    </div>
  );
};

export default SedeCard;