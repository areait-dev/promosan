// src/components/contatti/ContattiForm.tsx
'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
  Send,
  User,
  Mail,
  Building2,
  Phone,
  Briefcase,
  Users,
  MessageCircle,
  Info,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { T, useT } from "@/components/Testi";

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
  const t = useT();
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
      setFeedback(t("contatti-form.grazie-la-tua-richiesta-e-stata", "Grazie! La tua richiesta è stata inviata. Ti risponderemo a breve."));
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
      setFeedback(err instanceof Error ? err.message : t("contatti-form.si-e-verificato-un-errore-riprova", "Si è verificato un errore. Riprova più tardi."));
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
          border-color: #2c5282 !important;
          box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1) !important;
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
          <Send size={16} style={{ transform: 'rotate(-10deg)' }} />
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
            <T k="contatti-form.invia-un-messaggio">INVIA UN MESSAGGIO</T>
          </h2>
          <p style={{ 
            color: '#475569',
            fontSize: '0.85rem'
          }}>
            <T k="contatti-form.compila-il-form-per-ricevere-un">Compila il form per ricevere un preventivo personalizzato</T>
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
                <User size={14} style={{ marginRight: '0.5rem', color: '#1a365d' }} />
                <T k="contatti-form.nome-e-cognome">Nome e Cognome *</T>
              </label>
              <input 
                type="text" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder={t("contatti-form.mario-rossi", "Mario Rossi")}
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
                <Mail size={14} style={{ marginRight: '0.5rem', color: '#1a365d' }} />
                <T k="contatti-form.email">Email *</T>
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
                <Building2 size={14} style={{ marginRight: '0.5rem', color: '#1a365d' }} />
                <T k="contatti-form.azienda">Azienda</T>
              </label>
              <input 
                type="text" 
                name="azienda"
                value={formData.azienda}
                onChange={handleChange}
                placeholder={t("contatti-form.nome-della-tua-azienda", "Nome della tua azienda")}
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
                <Phone size={14} style={{ marginRight: '0.5rem', color: '#1a365d' }} />
                <T k="contatti-form.telefono">Telefono *</T>
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
              <label htmlFor="servizio" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <Briefcase size={14} style={{ marginRight: '0.5rem', color: '#1a365d' }} />
                <T k="contatti-form.servizio-di-interesse">Servizio di interesse *</T>
              </label>
              <select
                id="servizio"
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
                <option value=""><T k="contatti-form.seleziona-un-servizio">Seleziona un servizio</T></option>
                <option value="medicina"><T k="contatti-form.medicina-del-lavoro">Medicina del lavoro</T></option>
                <option value="unita-mobili"><T k="contatti-form.unita-mobili">Unità mobili</T></option>
                <option value="welfare"><T k="contatti-form.welfare-aziendale">Welfare aziendale</T></option>
                <option value="sicurezza"><T k="contatti-form.sicurezza-sul-lavoro">Sicurezza sul lavoro</T></option>
                <option value="formazione"><T k="contatti-form.formazione">Formazione</T></option>
              </select>
            </div>

            {/* Dipendenti */}
            <div>
              <label htmlFor="dipendenti" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#1a365d',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <Users size={14} style={{ marginRight: '0.5rem', color: '#1a365d' }} />
                <T k="contatti-form.numero-dipendenti">Numero dipendenti</T>
              </label>
              <select
                id="dipendenti"
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
                <option value=""><T k="contatti-form.seleziona-fascia-dipendenti">Seleziona fascia dipendenti</T></option>
                <option value="1-10"><T k="contatti-form.1-10-dipendenti">1-10 dipendenti</T></option>
                <option value="11-50"><T k="contatti-form.11-50-dipendenti">11-50 dipendenti</T></option>
                <option value="51-200"><T k="contatti-form.51-200-dipendenti">51-200 dipendenti</T></option>
                <option value="200+"><T k="contatti-form.200-dipendenti">200+ dipendenti</T></option>
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
                <MessageCircle size={14} style={{ marginRight: '0.5rem', color: '#1a365d' }} />
                <T k="contatti-form.messaggio">Messaggio *</T>
              </label>
              <textarea 
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required 
                rows={4}
                placeholder={t("contatti-form.descrivici-le-tue-esigenze", "Descrivici le tue esigenze...")}
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
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Info size={16} style={{ color: '#2b578c' }} />
                <T k="contatti-form.piu-informazioni-ci-fornisci-piu-preciso">Più informazioni ci fornisci, più preciso sarà il nostro preventivo</T>
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
                <T k="contatti-form.acconsento-al-trattamento-dei-dati-personali">Acconsento al trattamento dei dati personali secondo la privacy policy di PromoSan.</T>
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
            color: '#475569'
          }}>
            <ShieldCheck size={16} style={{ color: '#2b578c' }} />
            <span><T k="contatti-form.i-tuoi-dati-sono-protetti-e">I tuoi dati sono protetti e sicuri</T></span>
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
              {status === 'success' ? (
                <CheckCircle2 size={16} style={{ marginTop: '0.15rem', flexShrink: 0 }} />
              ) : (
                <AlertCircle size={16} style={{ marginTop: '0.15rem', flexShrink: 0 }} />
              )}
              <span>{feedback}</span>
            </div>
          )}

          {/* Bottone */}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              width: '100%',
              padding: '0.7rem 1.6rem',
              background: 'linear-gradient(135deg, #2c5282, #4299e1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '14px',
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
            {status === 'loading' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {status === 'loading' ? t("contatti-form.invio-in-corso", "Invio in corso...") : t("contatti-form.richiedi-preventivo", "Richiedi preventivo")}
          </button>
        </form>
      </div>
    </div>
  );
}