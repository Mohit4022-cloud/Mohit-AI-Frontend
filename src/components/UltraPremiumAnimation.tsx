"use client";

import React, { useEffect, useRef } from 'react';

export default function UltraPremiumAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="ultra-animation-section">
      <div className="animation-container" ref={containerRef}>
        {/* Liquid Morphing Orb */}
        <div className="liquid-orb-container">
          <div className="liquid-orb">
            <div className="orb-core"></div>
            <div className="orb-layer layer-1"></div>
            <div className="orb-layer layer-2"></div>
            <div className="orb-layer layer-3"></div>
            
            {/* Floating Particles */}
            <div className="particle-field">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`floating-particle particle-${i + 1}`} />
              ))}
            </div>
          </div>
          
          {/* Energy Rings */}
          <div className="energy-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
        </div>

        {/* DNA Helix Animation */}
        <div className="dna-helix">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="dna-strand" style={{ '--index': i } as React.CSSProperties}>
              <div className="strand-left"></div>
              <div className="strand-right"></div>
              <div className="strand-connection"></div>
            </div>
          ))}
        </div>

        {/* Quantum Wave */}
        <svg className="quantum-wave" viewBox="0 0 1200 200">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6EC7" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF6EC7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF6EC7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="wave-path"
            d="M0,100 Q300,50 600,100 T1200,100"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Prismatic Light Beams */}
        <div className="light-beams">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
          <div className="beam beam-3"></div>
        </div>

        {/* Ambient Glow */}
        <div className="ambient-glow"></div>
      </div>
    </section>
  );
}