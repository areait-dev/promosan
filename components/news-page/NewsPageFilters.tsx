// src/components/news/NewsPageFilters.tsx
'use client';

import React from 'react';
import type { ComponentType, SVGProps } from 'react';
import { Gavel, BriefcaseMedical, Calendar, Lightbulb, Handshake } from 'lucide-react';

interface Filter {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>> | null;
}

const filters: Filter[] = [
  { id: 'tutte', label: 'Tutte le news', Icon: null },
  { id: 'normativa', label: 'Normativa', Icon: Gavel },
  { id: 'servizi', label: 'Servizi', Icon: BriefcaseMedical },
  { id: 'eventi', label: 'Eventi', Icon: Calendar },
  { id: 'innovazione', label: 'Innovazione', Icon: Lightbulb },
  { id: 'welfare', label: 'Welfare', Icon: Handshake },
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
          {filter.Icon && <filter.Icon className="mr-2 inline h-4 w-4" style={{ marginRight: '0.5rem' }} />}
          {filter.label}
        </button>
      ))}
    </div>
  );
}