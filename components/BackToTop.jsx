'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setIsVisible(ratio >= 0.7);
    };
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-8 bottom-8 w-12 h-12 flex items-center justify-center text-white rounded-full shadow-lg transition bg-primary hover:bg-blue-700 z-50 ${
        isVisible ? 'flex' : 'hidden'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};

export default BackToTop;
