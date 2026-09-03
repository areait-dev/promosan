'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-8 bottom-8 w-12 h-12 text-white rounded-full shadow-lg transition bg-primary hover:bg-blue-700 ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};

export default BackToTop;