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

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invio non riuscito. Riprova più tardi.');
      }

      setStatus('success');
      setFeedback('Grazie! La tua richiesta è stata inviata. Ti risponderemo a breve.');
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
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Si è verificato un errore. Riprova più tardi.');
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '1rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      width: '100%',
      height: 'fit-content'
    }}>
      <style>{`
        @media (max-width: 768px) {
          .form-container {
            padding: 1.5rem !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .form-grid > div {
            grid-column: span 1 !important;
          }
        }
        
        .form-input-field:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
        }
      `}</style>

      {/* Header del form */}
      <div style={{ 
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        background: '#f4f8fc',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '2.5rem',
          height: '2.5rem',
          background: '#204c84',
          borderRadius: '50%',
          color: '#ffffff',
          flexShrink: 0
        }}>
          <i className="fas fa-paper-plane" style={{ fontSize: '1rem', transform: 'rotate(-10deg)' }}></i>
        </div>
        <div>
          <h2 style={{ 
            fontSize: '1rem', 
            fontWeight: '800', 
            color: '#1a365d', 
            marginBottom: '0.15rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            INVIA UN MESSAGGIO
          </h2>
          <p style={{ 
            color: '#64748b',
            fontSize: '0.85rem'
          }}>
            Compila il form per ricevere un preventivo personalizzato
          </p>
        </div>
      </div>

      <div className="form-container" style={{ 
        padding: '2rem'
      }}>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Griglia - 2 colonne desktop, 1 colonna mobile */}
          <div className="form-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* Nome */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="fas fa-user" style={{ marginRight: '0.5rem', color: '#1a365d', fontSize: '0.85rem' }}></i>
                Nome e Cognome *
              </label>
              <input 
                type="text" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Mario Rossi"
                className="form-input-field"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#334155',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="fas fa-envelope" style={{ marginRight: '0.5rem', color: '#1a365d', fontSize: '0.85rem' }}></i>
                Email *
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="mario.rossi@email.it"
                className="form-input-field"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#334155',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            {/* Azienda */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="fas fa-building" style={{ marginRight: '0.5rem', color: '#1a365d', fontSize: '0.85rem' }}></i>
                Azienda
              </label>
              <input 
                type="text" 
                name="azienda"
                value={formData.azienda}
                onChange={handleChange}
                placeholder="Nome della tua azienda"
                className="form-input-field"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#334155',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            {/* Telefono */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="fas fa-phone" style={{ marginRight: '0.5rem', color: '#1a365d', fontSize: '0.85rem' }}></i>
                Telefono *
              </label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="+39 123456789"
                className="form-input-field"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#334155',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            {/* Servizio */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="fas fa-briefcase" style={{ marginRight: '0.5rem', color: '#1a365d', fontSize: '0.85rem' }}></i>
                Servizio di interesse *
              </label>
              <select 
                name="servizio"
                value={formData.servizio}
                onChange={handleChange}
                required 
                className="form-input-field"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#334155',
                  outline: 'none',
                  background: '#ffffff',
                  transition: 'all 0.2s ease'
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
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="fas fa-users" style={{ marginRight: '0.5rem', color: '#1a365d', fontSize: '0.85rem' }}></i>
                Numero dipendenti
              </label>
              <select 
                name="dipendenti"
                value={formData.dipendenti}
                onChange={handleChange}
                className="form-input-field"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#334155',
                  outline: 'none',
                  background: '#ffffff',
                  transition: 'all 0.2s ease'
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
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="fas fa-comment-dots" style={{ marginRight: '0.5rem', color: '#1a365d', fontSize: '0.85rem' }}></i>
                Messaggio *
              </label>
              <textarea 
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required 
                rows={4}
                placeholder="Descrivici le tue esigenze..."
                className="form-input-field"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  color: '#334155',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  resize: 'vertical'
                }}
              />
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <i className="fas fa-info-circle" style={{ color: '#2b578c' }}></i>
                Più informazioni ci fornisci, più preciso sarà il nostro preventivo
              </p>
            </div>
          </div>

          {/* Privacy */}
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9',
            marginBottom: '1.25rem'
          }}>
            <label style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              alignItems: 'flex-start',
              fontSize: '0.85rem',
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
                  accentColor: '#2b578c',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: '#475569', lineHeight: 1.5 }}>
                Acconsento al trattamento dei dati personali secondo la privacy policy di PromoSan.
              </span>
            </label>
          </div>

          {/* Sicurezza */}
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            alignItems: 'center',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            color: '#64748b'
          }}>
            <i className="fas fa-shield-alt" style={{ color: '#2b578c' }}></i>
            <span>I tuoi dati sono protetti e sicuri</span>
          </div>

          {/* Messaggio di feedback */}
          {status !== 'idle' && status !== 'loading' && feedback && (
            <div
              role="status"
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'flex-start',
                marginBottom: '1.5rem',
                padding: '0.875rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                background: status === 'success' ? '#ecfdf5' : '#fef2f2',
                color: status === 'success' ? '#065f46' : '#991b1b',
                border: `1px solid ${status === 'success' ? '#a7f3d0' : '#fecaca'}`
              }}
            >
              <i
                className={status === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}
                style={{ marginTop: '0.15rem', flexShrink: 0 }}
              ></i>
              <span>{feedback}</span>
            </div>
          )}

          {/* Bottone */}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}
          >
            <i className={status === 'loading' ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'}></i>
            {status === 'loading' ? 'Invio in corso...' : 'Richiedi preventivo'}
          </button>
        </form>
      </div>
    </div>
  );
}