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

    // Pricing value cards floating animation
    interface PriceCard {
      x: number;
      y: number;
      vx: number;
      vy: number;
      value: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      glowIntensity: number;
      color: string;
      pulsePhase: number;
    }

    const priceCards: PriceCard[] = [];
    const values = ['$75', '$299', '$799', '20%', '3x', '500+', '24/7', '156%'];
    const colors = ['#FF6EC7', '#BA55D3', '#DDA0DD', '#FFB6C1', '#FF69B4', '#DA70D6', '#EE82EE', '#FF1493'];

    // Create price cards
    for (let i = 0; i < 8; i++) {
      priceCards.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        value: values[i],
        size: Math.random() * 20 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0.7,
        glowIntensity: 0,
        color: colors[i],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Growth chart points
    interface ChartPoint {
      x: number;
      y: number;
      targetY: number;
      value: number;
    }

    const chartPoints: ChartPoint[] = [];
    const numPoints = 8;
    const chartHeight = canvas.height * 0.4;
    const chartBottom = canvas.height * 0.7;

    for (let i = 0; i < numPoints; i++) {
      const progress = i / (numPoints - 1);
      const growth = Math.pow(progress, 1.5); // Exponential growth curve
      chartPoints.push({
        x: canvas.width * 0.2 + (canvas.width * 0.6 * progress),
        y: chartBottom,
        targetY: chartBottom - (chartHeight * growth),
        value: growth
      });
    }

    // Particle system for ambiance
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 50;

    // Animation loop
    let frame = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;

      // Draw growth chart
      ctx.save();
      
      // Chart glow effect
      const gradient = ctx.createLinearGradient(0, chartBottom, 0, chartBottom - chartHeight);
      gradient.addColorStop(0, 'rgba(255, 110, 199, 0)');
      gradient.addColorStop(1, 'rgba(255, 110, 199, 0.2)');
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      ctx.moveTo(chartPoints[0].x, chartBottom);
      
      // Draw smooth curve through points
      for (let i = 0; i < chartPoints.length - 1; i++) {
        const p1 = chartPoints[i];
        const p2 = chartPoints[i + 1];
        
        // Update Y position with smooth animation
        p1.y += (p1.targetY - p1.y) * 0.05;
        
        const cp1x = p1.x + (p2.x - p1.x) * 0.5;
        const cp1y = p1.y;
        const cp2x = p1.x + (p2.x - p1.x) * 0.5;
        const cp2y = p2.y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      
      // Update last point
      chartPoints[chartPoints.length - 1].y += 
        (chartPoints[chartPoints.length - 1].targetY - chartPoints[chartPoints.length - 1].y) * 0.05;
      
      ctx.lineTo(chartPoints[chartPoints.length - 1].x, chartBottom);
      ctx.closePath();
      ctx.fill();
      
      // Draw chart line
      ctx.strokeStyle = '#FF6EC7';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(chartPoints[0].x, chartPoints[0].y);
      
      for (let i = 1; i < chartPoints.length; i++) {
        const p1 = chartPoints[i - 1];
        const p2 = chartPoints[i];
        
        const cp1x = p1.x + (p2.x - p1.x) * 0.5;
        const cp1y = p1.y;
        const cp2x = p1.x + (p2.x - p1.x) * 0.5;
        const cp2y = p2.y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      
      ctx.stroke();
      
      // Draw chart points
      chartPoints.forEach((point, i) => {
        const pulse = Math.sin(frame * 0.05 + i * 0.5) * 0.2 + 1;
        
        // Point glow
        const glowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 20 * pulse);
        glowGradient.addColorStop(0, 'rgba(255, 110, 199, 0.3)');
        glowGradient.addColorStop(1, 'rgba(255, 110, 199, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 20 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Point center
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#FF6EC7';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      
      ctx.restore();

      // Update and draw price cards
      priceCards.forEach((card, index) => {
        // Update position
        card.x += card.vx;
        card.y += card.vy;
        card.rotation += card.rotationSpeed;
        card.pulsePhase += 0.02;
        
        // Bounce off edges with damping
        if (card.x < 50 || card.x > canvas.width - 50) {
          card.vx *= -0.8;
          card.x = Math.max(50, Math.min(canvas.width - 50, card.x));
        }
        if (card.y < 50 || card.y > canvas.height - 50) {
          card.vy *= -0.8;
          card.y = Math.max(50, Math.min(canvas.height - 50, card.y));
        }
        
        // Add slight drift
        card.vx += (Math.random() - 0.5) * 0.02;
        card.vy += (Math.random() - 0.5) * 0.02;
        
        // Limit velocity
        card.vx = Math.max(-0.5, Math.min(0.5, card.vx));
        card.vy = Math.max(-0.5, Math.min(0.5, card.vy));
        
        // Draw card
        ctx.save();
        ctx.translate(card.x, card.y);
        ctx.rotate(card.rotation);
        
        const pulse = Math.sin(card.pulsePhase) * 0.1 + 1;
        const cardSize = card.size * pulse;
        
        // Card glow
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, cardSize);
        glowGradient.addColorStop(0, `${card.color}33`);
        glowGradient.addColorStop(1, `${card.color}00`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, cardSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Card background
        ctx.fillStyle = `${card.color}22`;
        ctx.strokeStyle = card.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-cardSize/2, -cardSize/3, cardSize, cardSize * 0.66, 8);
        ctx.fill();
        ctx.stroke();
        
        // Card text
        ctx.fillStyle = card.color;
        ctx.font = `bold ${cardSize * 0.3}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(card.value, 0, 0);
        
        ctx.restore();
      });

      // Create new particles
      if (particles.length < maxParticles && Math.random() < 0.1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 1 - 0.5,
          size: Math.random() * 3 + 1,
          opacity: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0
        });
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 0.02;
        
        // Fade in and out
        if (particle.life < 0.2) {
          particle.opacity = particle.life * 5;
        } else if (particle.life > 0.8) {
          particle.opacity = (1 - particle.life) * 5;
        } else {
          particle.opacity = 1;
        }
        
        // Remove dead particles
        if (particle.life > 1 || particle.y < -10) {
          particles.splice(i, 1);
          continue;
        }
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity * 0.6;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
      style={{ opacity: 0.8 }}
    />
  );
};

export default PricingAnimation;