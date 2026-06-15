// src/components/altri-servizi/CardServizio.tsx
'use client';

import React, { ReactNode } from 'react';

interface Feature {
  title?: string;
  text?: string;
}

interface CardServizioProps {
  title: string;
  badge: string;
  badgeLabel?: string;
  description: string | string[];
  features?: Feature[];
  footerText?: string;
  children?: ReactNode;
}

export default function CardServizio({
  title,
  badge,
  badgeLabel,
  description,
  features = [],
  footerText = 'In sviluppo',
  children
}: CardServizioProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-0.5rem)';
      e.currentTarget.style.boxShadow = '0 30px 40px -15px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
    }}
    >
      {/* Barra superiore animata */}
      <div style={{
        height: '0.25rem',
        background: 'linear-gradient(to right, #2c5282, #2c5282, rgba(44, 82, 130, 0.8))',
        transition: 'all 0.7s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.height = '0.375rem';
        e.currentTarget.style.background = 'linear-gradient(to right, #4299e1, #4299e1, rgba(66, 153, 225, 0.8))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.height = '0.25rem';
        e.currentTarget.style.background = 'linear-gradient(to right, #2c5282, #2c5282, rgba(44, 82, 130, 0.8))';
      }}
      ></div>

      {/* Contenuto principale */}
      <div style={{
        flexGrow: 1,
        padding: '2rem'
      }}>
        {/* Header con titolo e badge */}
        <div style={{
          marginBottom: '1.5rem',
          transition: 'transform 0.5s ease',
          transform: 'translateX(0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(0.25rem)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
        }}
        >
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#2c5282',
            marginBottom: '0.5rem',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#4299e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#2c5282';
          }}
          >
            {title}
          </h3>
          
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#2c5282',
              background: 'rgba(44, 82, 130, 0.1)',
              borderRadius: '9999px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#4299e1';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(44, 82, 130, 0.1)';
              e.currentTarget.style.color = '#2c5282';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              {badge}
            </span>
            
            {badgeLabel && (
              <span style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}
              >
                {badgeLabel}
              </span>
            )}
          </div>
        </div>

        {/* Descrizione */}
        <div>
          {Array.isArray(description) ? (
            description.map((text, index) => (
              <p key={index} style={{
                lineHeight: '1.8',
                color: '#4b5563',
                marginBottom: index < description.length - 1 ? '1rem' : 0,
                transition: 'all 0.5s ease',
                transform: 'translateX(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1f2937';
                e.currentTarget.style.transform = 'translateX(0.25rem)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4b5563';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              >
                {text}
              </p>
            ))
          ) : (
            <p style={{
              lineHeight: '1.8',
              color: '#4b5563',
              transition: 'all 0.5s ease',
              transform: 'translateX(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1f2937';
              e.currentTarget.style.transform = 'translateX(0.25rem)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4b5563';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div style={{
            padding: '1.25rem',
            marginTop: '2rem',
            background: 'rgba(44, 82, 130, 0.05)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(44, 82, 130, 0.1)',
            transition: 'all 0.5s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(66, 153, 225, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(66, 153, 225, 0.2)';
            e.currentTarget.style.boxShadow = 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(44, 82, 130, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(44, 82, 130, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            {features.map((feature, index) => (
              <div key={index} style={{ marginBottom: index < features.length - 1 ? '1rem' : 0 }}>
                {feature.title && (
                  <p style={{
                    fontWeight: '600',
                    color: '#2c5282',
                    marginBottom: '0.25rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4299e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2c5282';
                  }}
                  >
                    {feature.title}
                  </p>
                )}
                {feature.text && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#4b5563',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#4b5563';
                  }}
                  >
                    {feature.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Children (es. FocusGrid) */}
        {children}
      </div>

      {/* Footer */}
      <div style={{
        padding: '1rem 2rem',
        borderTop: '1px solid #f3f4f6',
        background: '#f9fafb',
        transition: 'all 0.5s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(to right, rgba(66, 153, 225, 0.05), #f9fafb)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#f9fafb';
      }}
      >
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#2c5282',
          transition: 'all 0.5s ease',
          transform: 'translateX(0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(0.5rem)';
          e.currentTarget.style.color = '#4299e1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.color = '#2c5282';
        }}
        >
          {footerText}
        </div>
      </div>
    </div>
  );
}