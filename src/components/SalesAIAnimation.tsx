"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Phone, MessageCircle, Mail, Smartphone, Sparkles, User, Brain } from 'lucide-react';

export default function SalesAIAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChannel, setActiveChannel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const channels = [
    { icon: Phone, label: 'Phone', position: 'top' },
    { icon: MessageCircle, label: 'Chat', position: 'right' },
    { icon: Mail, label: 'Email', position: 'bottom' },
    { icon: Smartphone, label: 'SMS', position: 'left' }
  ];

  return (
    <section className="sales-ai-animation-section">
      <div className="animation-container" ref={containerRef}>
        {/* Central AI Core */}
        <div className="ai-core">
          <div className="core-glow"></div>
          <div className="core-center">
            <Brain className="core-icon" />
          </div>
          <div className="core-ring ring-1"></div>
          <div className="core-ring ring-2"></div>
          <div className="core-ring ring-3"></div>
          
          {/* AI Particles */}
          <div className="ai-particles">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`ai-particle particle-${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Communication Channels */}
        <div className="channels-orbit">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className={`channel-node ${channel.position} ${activeChannel === index ? 'active' : ''}`}
              >
                <div className="channel-icon">
                  <Icon />
                </div>
                <div className="channel-pulse"></div>
                <div className="channel-connection"></div>
              </div>
            );
          })}
        </div>

        {/* Lead Nodes */}
        <div className="leads-container">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`lead-node lead-${i + 1}`}>
              <User className="lead-icon" />
              <div className="lead-glow"></div>
            </div>
          ))}
        </div>

        {/* Data Streams */}
        <svg className="data-streams" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6EC7" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF6EC7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF6EC7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className={`stream-group ${activeChannel === i ? 'active' : ''}`}>
              <path
                className="data-stream"
                d={`M400,300 Q${200 + i * 100},${200 + i * 50} ${150 + i * 150},${100 + i * 100}`}
                stroke="url(#stream-gradient)"
                strokeWidth="2"
                fill="none"
              />
            </g>
          ))}
        </svg>

        {/* Response Time Display */}
        <div className="stats-display">
          <div className="stat-item">
            <span className="stat-value">47s</span>
            <span className="stat-label">Response Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Always Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4</span>
            <span className="stat-label">Channels</span>
          </div>
        </div>

        {/* Background Grid */}
        <div className="background-grid"></div>
      </div>
    </section>
  );
}