"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: "47", label: "Response Time", suffix: "s" },
  { value: "24/7", label: "Always Active" },
  { value: "4", label: "Channels", suffix: "+" }
];

export default function QuantumStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma && e.beta) {
        const x = (e.gamma + 90) / 180;
        const y = (e.beta + 90) / 180;
        setMousePosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  return (
    <section className="quantum-stats-section" ref={ref}>
      {/* Quantum Field Background */}
      <div className="quantum-field">
        <div className="quantum-grid"></div>
        <div className="quantum-particles">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="quantum-particle"
              style={{
                '--particle-x': Math.random(),
                '--particle-y': Math.random(),
                '--particle-duration': 15 + Math.random() * 20,
                '--particle-delay': Math.random() * 5,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Neural Connections */}
      <svg className="neural-connections" viewBox="0 0 1200 400">
        <defs>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-pink)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent-pink)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-pink)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="neural-path"
          d="M 200 200 Q 400 150 600 200 T 1000 200"
          stroke="url(#neural-gradient)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Stats Container */}
      <div 
        className="quantum-stats-container" 
        ref={containerRef}
        style={{
          '--mouse-x': mousePosition.x,
          '--mouse-y': mousePosition.y,
        } as React.CSSProperties}
      >
        <div className={`quantum-stats-grid ${inView ? 'animate-in' : ''}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`quantum-stat quantum-stat-${index + 1} ${isHovered === index ? 'hovered' : ''}`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                '--stat-index': index,
                '--hover-state': isHovered === index ? 1 : 0,
              } as React.CSSProperties}
            >
              {/* Holographic Layers */}
              <div className="holographic-layer layer-1"></div>
              <div className="holographic-layer layer-2"></div>
              <div className="holographic-layer layer-3"></div>

              {/* Stat Content */}
              <div className="stat-content">
                <div className="stat-value-wrapper">
                  <span className="stat-value">{stat.value}</span>
                  {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>

              {/* Quantum Glow */}
              <div className="quantum-glow"></div>
              
              {/* Magnetic Field */}
              <div className="magnetic-field">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`field-line field-line-${i + 1}`}></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Pulse */}
        <div className="ambient-pulse"></div>
      </div>
    </section>
  );
}