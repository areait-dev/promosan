// src/components/contatti/ContattiForm.tsx
'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  nome: string;
  email: string;
  azienda: string;
  telefono: string;
  servizio: string;
  dipendenti: string;
  messaggio: string;
  privacy: boolean;
}

export default function ContattiForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    azienda: '',
    telefono: '',
    servizio: '',
    dipendenti: '',
    messaggio: '',
    privacy: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Grazie! La tua richiesta è stata inviata. Ti risponderemo a breve.');
    setFormData({
      nome: '',
      email: '',
      azienda: '',
      telefono: '',
      servizio: '',
      dipendenti: '',
      messaggio: '',
      privacy: false
    });
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '1rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      width: '100%',
      height: 'fit-content'
    }}>
      <style>{`
        @media (max-width: 768px) {
          .form-container {
            padding: 1.25rem !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .form-grid > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>

      <div className="form-container" style={{ 
        padding: '2rem'
      }}>
        {/* Header del form */}
        <div style={{ 
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '3.5rem',
            height: '3.5rem',
            background: '#2c5282',
            borderRadius: '0.75rem',
            color: '#ffffff',
            flexShrink: 0
          }}>
            <i className="fas fa-paper-plane" style={{ fontSize: '1.25rem' }}></i>
          </div>
          <div>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              color: '#2c5282', 
              marginBottom: '0.25rem' 
            }}>
              INVIA UN MESSAGGIO
            </h2>
            <p style={{ 
              color: '#4b5563',
              fontSize: '1rem'
            }}>
              Compila il form per ricevere un preventivo personalizzato
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Griglia - 2 colonne desktop, 1 colonna mobile */}
          <div className="form-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Nome */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <i className="fas fa-user" style={{ marginRight: '0.5rem', color: '#2c5282' }}></i>
                Nome e Cognome *
              </label>
              <input 
                type="text" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Mario Rossi"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <i className="fas fa-envelope" style={{ marginRight: '0.5rem', color: '#2c5282' }}></i>
                Email *
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="mario.rossi@email.it"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Azienda */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <i className="fas fa-building" style={{ marginRight: '0.5rem', color: '#2c5282' }}></i>
                Azienda
              </label>
              <input 
                type="text" 
                name="azienda"
                value={formData.azienda}
                onChange={handleChange}
                placeholder="Nome della tua azienda"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Telefono */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <i className="fas fa-phone" style={{ marginRight: '0.5rem', color: '#2c5282' }}></i>
                Telefono *
              </label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="+39 123 456 7890"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Servizio */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <i className="fas fa-briefcase" style={{ marginRight: '0.5rem', color: '#2c5282' }}></i>
                Servizio di interesse *
              </label>
              <select 
                name="servizio"
                value={formData.servizio}
                onChange={handleChange}
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="">Seleziona un servizio</option>
                <option value="medicina">Medicina del lavoro</option>
                <option value="unita-mobili">Unità mobili</option>
                <option value="welfare">Welfare aziendale</option>
                <option value="sicurezza">Sicurezza sul lavoro</option>
                <option value="formazione">Formazione</option>
              </select>
            </div>

            {/* Dipendenti */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <i className="fas fa-users" style={{ marginRight: '0.5rem', color: '#2c5282' }}></i>
                Numero dipendenti
              </label>
              <select 
                name="dipendenti"
                value={formData.dipendenti}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="">Seleziona fascia dipendenti</option>
                <option value="1-10">1-10 dipendenti</option>
                <option value="11-50">11-50 dipendenti</option>
                <option value="51-200">51-200 dipendenti</option>
                <option value="200+">200+ dipendenti</option>
              </select>
            </div>

            {/* Messaggio - occupa 2 colonne su desktop, 1 su mobile */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                <i className="fas fa-comment-dots" style={{ marginRight: '0.5rem', color: '#2c5282' }}></i>
                Messaggio *
              </label>
              <textarea 
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required 
                rows={5}
                placeholder="Descrivici le tue esigenze..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  resize: 'vertical'
                }}
              />
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                <i className="fas fa-info-circle" style={{ marginRight: '0.25rem', color: '#2c5282' }}></i>
                Più informazioni ci fornisci, più preciso sarà il nostro preventivo
              </p>
            </div>
          </div>

          {/* Privacy */}
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid #f3f4f6',
            marginBottom: '1.5rem'
          }}>
            <label style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              alignItems: 'flex-start',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                required 
                style={{
                  marginTop: '0.25rem',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #d1d5db',
                  accentColor: '#2c5282',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: '#4b5563', lineHeight: 1.5 }}>
                Acconsento al trattamento dei dati personali secondo la privacy policy di PromoSan.
              </span>
            </label>
          </div>

          {/* Sicurezza */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: '#6b7280',
            flexWrap: 'wrap'
          }}>
            <i className="fas fa-shield-alt" style={{ color: '#2c5282' }}></i>
            <span>I tuoi dati sono protetti e sicuri</span>
          </div>

          {/* Bottone */}
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #2c5282, #4299e1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <i className="fas fa-paper-plane"></i>
            Richiedi preventivo
          </button>
        </form>
      </div>
    </div>
  );
}