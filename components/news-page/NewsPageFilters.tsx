// src/components/news/NewsPageFilters.tsx
'use client';

import React from 'react';

interface Filter {
  id: string;
  label: string;
  icon: string | null;
}

const filters: Filter[] = [
  { id: 'tutte', label: 'Tutte le news', icon: null },
  { id: 'normativa', label: 'Normativa', icon: 'fa-gavel' },
  { id: 'servizi', label: 'Servizi', icon: 'fa-briefcase-medical' },
  { id: 'eventi', label: 'Eventi', icon: 'fa-calendar-alt' },
  { id: 'innovazione', label: 'Innovazione', icon: 'fa-lightbulb' },
  { id: 'welfare', label: 'Welfare', icon: 'fa-handshake' },
];

interface NewsPageFiltersProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export default function NewsPageFilters({ activeFilter, onFilterChange }: NewsPageFiltersProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      justifyContent: 'center',
      marginBottom: '3rem'
    }}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          style={{
            padding: '0.75rem 1.5rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: activeFilter === filter.id ? '#2c5282' : '#f3f4f6',
            color: activeFilter === filter.id ? '#ffffff' : '#374151'
          }}
          onMouseEnter={(e) => {
            if (activeFilter !== filter.id) {
              e.currentTarget.style.background = '#e5e7eb';
            }
          }}
          onMouseLeave={(e) => {
            if (activeFilter !== filter.id) {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
        >
          {filter.icon && <i className={`mr-2 fas ${filter.icon}`} style={{ marginRight: '0.5rem' }}></i>}
          {filter.label}
        </button>
      ))}
    </div>
  );
}