// src/components/news/NewsPagePagination.tsx
'use client';

import React from 'react';

interface NewsPagePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NewsPagePagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: NewsPagePaginationProps) {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const buttonBaseStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      justifyContent: 'center',
      marginTop: '4rem'
    }}>
      <button
        style={{
          ...buttonBaseStyle,
          background: currentPage === 1 ? '#f3f4f6' : '#ffffff',
          color: currentPage === 1 ? '#9ca3af' : '#2c5282',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background = '#2c5282';
            e.currentTarget.style.color = '#ffffff';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#2c5282';
          }
        }}
      >
        <i className="fas fa-chevron-left" style={{ marginRight: '0.5rem' }}></i> 
        Precedente
      </button>

      {pages.map((page) => (
        <button
          key={page}
          style={{
            ...buttonBaseStyle,
            minWidth: '2.5rem',
            background: page === currentPage ? '#2c5282' : '#ffffff',
            color: page === currentPage ? '#ffffff' : '#374151',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}
          onClick={() => onPageChange(page)}
          onMouseEnter={(e) => {
            if (page !== currentPage) {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (page !== currentPage) {
              e.currentTarget.style.background = '#ffffff';
            }
          }}
        >
          {page}
        </button>
      ))}

      <button
        style={{
          ...buttonBaseStyle,
          background: currentPage === totalPages || totalPages === 0 ? '#f3f4f6' : '#ffffff',
          color: currentPage === totalPages || totalPages === 0 ? '#9ca3af' : '#2c5282',
          cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages && totalPages !== 0) {
            e.currentTarget.style.background = '#2c5282';
            e.currentTarget.style.color = '#ffffff';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages && totalPages !== 0) {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#2c5282';
          }
        }}
      >
        Successivo 
        <i className="fas fa-chevron-right" style={{ marginLeft: '0.5rem' }}></i>
      </button>
    </div>
  );
}