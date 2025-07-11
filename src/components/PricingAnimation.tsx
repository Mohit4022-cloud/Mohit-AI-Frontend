"use client";

import React, { useEffect, useRef } from 'react';

const PricingAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Pricing-themed particles with dollar signs and chart elements
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'dollar' | 'chart' | 'star' | 'plus';
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      pulsePhase: number;
    }

    const particles: Particle[] = [];
    const particleCount = 30;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 20 + 15,
        type: ['dollar', 'chart', 'star', 'plus'][Math.floor(Math.random() * 4)] as any,
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Connection lines
    interface Connection {
      from: number;
      to: number;
      progress: number;
      opacity: number;
    }

    const connections: Connection[] = [];
    
    // Create some initial connections
    for (let i = 0; i < 10; i++) {
      const from = Math.floor(Math.random() * particleCount);
      const to = Math.floor(Math.random() * particleCount);
      if (from !== to) {
        connections.push({
          from,
          to,
          progress: 0,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    }

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const pulse = Math.sin(particle.pulsePhase) * 0.2 + 1;
      const size = particle.size * pulse;
      
      ctx.globalAlpha = particle.opacity;

      switch (particle.type) {
        case 'dollar':
          // Draw dollar sign
          ctx.strokeStyle = '#FF6EC7';
          ctx.lineWidth = 2;
          ctx.font = `${size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FF6EC7';
          ctx.fillText('$', 0, 0);
          break;
          
        case 'chart':
          // Draw simple chart icon
          ctx.strokeStyle = '#BA55D3';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const barWidth = size / 4;
          const barSpacing = size / 6;
          
          // Three bars of different heights
          ctx.fillStyle = '#BA55D3';
          ctx.fillRect(-size/2, size/4, barWidth, -size/3);
          ctx.fillRect(-barSpacing, size/4, barWidth, -size/2);
          ctx.fillRect(barSpacing, size/4, barWidth, -size/4);
          break;
          
        case 'star':
          // Draw star
          ctx.fillStyle = '#FFB6C1';
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * size/2;
            const y = Math.sin(angle) * size/2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            
            const innerAngle = angle + Math.PI / 5;
            const innerX = Math.cos(innerAngle) * size/4;
            const innerY = Math.sin(innerAngle) * size/4;
            ctx.lineTo(innerX, innerY);
          }
          ctx.closePath();
          ctx.fill();
          break;
          
        case 'plus':
          // Draw plus sign
          ctx.strokeStyle = '#DDA0DD';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-size/2, 0);
          ctx.lineTo(size/2, 0);
          ctx.moveTo(0, -size/2);
          ctx.lineTo(0, size/2);
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach((conn, index) => {
        const from = particles[conn.from];
        const to = particles[conn.to];
        
        if (!from || !to) return;
        
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          ctx.save();
          ctx.globalAlpha = conn.opacity * (1 - distance / 200);
          ctx.strokeStyle = '#FF6EC7';
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = conn.progress * 10;
          
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
          ctx.restore();
          
          conn.progress += 0.02;
          if (conn.progress > 1) conn.progress = 0;
        }
        
        // Occasionally change connections
        if (Math.random() < 0.001) {
          connections[index] = {
            from: Math.floor(Math.random() * particleCount),
            to: Math.floor(Math.random() * particleCount),
            progress: 0,
            opacity: Math.random() * 0.3 + 0.1
          };
        }
      });

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update rotation
        particle.rotation += particle.rotationSpeed;
        
        // Update pulse
        particle.pulsePhase += 0.02;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
        
        // Occasionally change direction
        if (Math.random() < 0.01) {
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = (Math.random() - 0.5) * 0.5;
        }
        
        drawParticle(particle);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

export default PricingAnimation;