"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const TextPressure = ({
  text = "Hello",
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = true,
  textColor = "#ffffff",
  strokeColor = "#ff0000",
  minFontSize = 24,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll('.char');
    chars.forEach((char, index) => {
      const dist = Math.abs(index / chars.length - mousePos.x);
      const scale = Math.max(0.5, 1 - dist);

      gsap.to(char, {
  scale: scale * 1.5, // Le lettere si ingrandiscono al passaggio del mouse
  y: -scale * 20,     // Le lettere si alzano leggermente
  opacity: alpha ? scale : 1,
  duration: 0.4,
  ease: "power2.out",
});
    });
  }, [mousePos, alpha, width, weight, italic]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ cursor: 'default' }}
    >
      <h1
        ref={titleRef}
        className="flex uppercase text-center font-bold tracking-widest"
        style={{
          fontSize: `clamp(${minFontSize}px, 10vw, 50px)`,
          color: stroke ? 'transparent' : textColor,
          WebkitTextStroke: stroke ? `2px ${strokeColor}` : 'none',
          display: flex ? 'flex' : 'block',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block transition-all">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;