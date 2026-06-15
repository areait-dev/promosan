// src/components/altri-servizi/FocusGrid.tsx
'use client';

import React from 'react';

interface FocusGridProps {
  items?: string[];
}

export default function FocusGrid({ items = [] }: FocusGridProps) {
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.75rem'
    }}>
      {items.map((item, index) => (
        <div 
          key={index}
          style={{
            padding: '0.5rem 0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(66, 153, 225, 0.05)';
            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(-0.25rem)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f9fafb';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#4b5563',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#4299e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4b5563';
          }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}