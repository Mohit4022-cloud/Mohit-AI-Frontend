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

    // Enhanced price tiers with features
    interface PriceTier {
      label: string;
      value: string;
      y: number;
      targetY: number;
      opacity: number;
      highlighted: boolean;
      scale: number;
      features: string[];
      featureOpacity: number;
      hoverProgress: number;
    }

    const tiers: PriceTier[] = [
      { 
        label: 'Starter', 
        value: '$75', 
        y: 0, 
        targetY: 0, 
        opacity: 0, 
        highlighted: false, 
        scale: 1,
        features: ['100 calls', '1 user', 'Email support'],
        featureOpacity: 0,
        hoverProgress: 0
      },
      { 
        label: 'Professional', 
        value: '$299', 
        y: 0, 
        targetY: 0, 
        opacity: 0, 
        highlighted: true, 
        scale: 1.1,
        features: ['500 calls', '5 users', 'Priority support'],
        featureOpacity: 0,
        hoverProgress: 0
      },
      { 
        label: 'Scale', 
        value: '$799', 
        y: 0, 
        targetY: 0, 
        opacity: 0, 
        highlighted: false, 
        scale: 1,
        features: ['2000 calls', '20 users', 'Dedicated support'],
        featureOpacity: 0,
        hoverProgress: 0
      }
    ];

    // Set initial positions
    const spacing = canvas.height / 4;
    tiers.forEach((tier, i) => {
      tier.targetY = spacing + (i * spacing * 0.8);
      tier.y = tier.targetY + 50;
    });

    // Interactive hover detection
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animated particles with trails
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      trail: { x: number; y: number; opacity: number }[];
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.5 - 0.2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        color: ['#FF6EC7', '#FFB6C1', '#DDA0DD'][Math.floor(Math.random() * 3)],
        trail: []
      });
    }

    // Animated connections
    interface Connection {
      progress: number;
      opacity: number;
      from: number;
      to: number;
    }

    const connections: Connection[] = [
      { progress: 0, opacity: 0.3, from: 0, to: 1 },
      { progress: 0.33, opacity: 0.3, from: 1, to: 2 }
    ];

    // Feature badges animation
    let featureAnimationProgress = 0;

    // Performance metrics
    interface Metric {
      label: string;
      value: string;
      x: number;
      y: number;
      progress: number;
    }

    const metrics: Metric[] = [
      { label: 'Response Time', value: '47s', x: 0, y: 0, progress: 0 },
      { label: 'Conversion Rate', value: '+391%', x: 0, y: 0, progress: 0 },
      { label: 'ROI', value: '5.2x', x: 0, y: 0, progress: 0 }
    ];

    // Position metrics
    const metricsStartX = canvas.width * 0.65;
    metrics.forEach((metric, i) => {
      metric.x = metricsStartX;
      metric.y = spacing + (i * spacing * 0.8);
    });

    let frame = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;
      featureAnimationProgress = (Math.sin(frame * 0.01) + 1) / 2;

      // Draw animated connections with pulse
      connections.forEach((conn, index) => {
        conn.progress += 0.01;
        if (conn.progress > 1) conn.progress = 0;

        const tier1 = tiers[conn.from];
        const tier2 = tiers[conn.to];
        
        // Animated gradient line
        const gradient = ctx.createLinearGradient(
          canvas.width * 0.3, tier1.y,
          canvas.width * 0.3, tier2.y
        );
        gradient.addColorStop(0, `rgba(255, 110, 199, ${conn.opacity * 0.5})`);
        gradient.addColorStop(conn.progress, `rgba(255, 110, 199, ${conn.opacity})`);
        gradient.addColorStop(Math.min(conn.progress + 0.1, 1), `rgba(255, 110, 199, ${conn.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 110, 199, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.3, tier1.y);
        ctx.lineTo(canvas.width * 0.3, tier2.y);
        ctx.stroke();
      });

      // Draw pricing tiers with enhanced interactivity
      tiers.forEach((tier, index) => {
        // Smooth animation
        tier.y += (tier.targetY - tier.y) * 0.05;
        tier.opacity = Math.min(1, tier.opacity + 0.02);

        const x = canvas.width * 0.3;
        
        // Check hover
        const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - tier.y, 2));
        const isHovered = distance < 100;
        tier.hoverProgress += (isHovered ? 0.05 : -0.05);
        tier.hoverProgress = Math.max(0, Math.min(1, tier.hoverProgress));

        // Update scale based on hover
        const targetScale = tier.highlighted ? 1.1 : (isHovered ? 1.05 : 1);
        tier.scale += (targetScale - tier.scale) * 0.1;

        ctx.save();
        
        // Enhanced glow effect
        if (tier.highlighted || tier.hoverProgress > 0) {
          const glowSize = 40 * tier.scale;
          const glow = ctx.createRadialGradient(x, tier.y, 0, x, tier.y, glowSize);
          glow.addColorStop(0, `rgba(255, 110, 199, ${0.3 * (tier.highlighted ? 1 : tier.hoverProgress)})`);
          glow.addColorStop(0.5, `rgba(255, 110, 199, ${0.1 * (tier.highlighted ? 1 : tier.hoverProgress)})`);
          glow.addColorStop(1, 'rgba(255, 110, 199, 0)');
          ctx.fillStyle = glow;
          ctx.fillRect(x - glowSize, tier.y - glowSize, glowSize * 2, glowSize * 2);
        }

        // Tier circle with breathing effect
        const breathe = Math.sin(frame * 0.02 + index) * 0.1 + 1;
        const circleSize = (tier.highlighted ? 10 : 8) * tier.scale * breathe;
        
        // Outer ring
        ctx.strokeStyle = tier.highlighted ? '#FF6EC7' : '#E5E7EB';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, tier.y, circleSize + 4, 0, Math.PI * 2);
        ctx.stroke();
        
        // Main circle
        ctx.fillStyle = tier.highlighted ? '#FF6EC7' : '#E5E7EB';
        ctx.beginPath();
        ctx.arc(x, tier.y, circleSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner dot
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, tier.y, circleSize * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Tier label with fade
        ctx.globalAlpha = tier.opacity;
        ctx.fillStyle = '#6B7280';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(tier.label, x - 25, tier.y);

        // Animated price value
        const priceOffset = Math.sin(frame * 0.03 + index) * 2;
        ctx.fillStyle = tier.highlighted ? '#FF6EC7' : '#1A1A1A';
        ctx.font = tier.highlighted ? 
          'bold 26px -apple-system, BlinkMacSystemFont, sans-serif' : 
          '22px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(tier.value, x + 25, tier.y + priceOffset);

        // Per month label
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('/month', x + 85, tier.y + 2);

        // Animated features on hover
        tier.featureOpacity += (tier.hoverProgress > 0.5 ? 0.05 : -0.05);
        tier.featureOpacity = Math.max(0, Math.min(1, tier.featureOpacity));
        
        if (tier.featureOpacity > 0) {
          ctx.globalAlpha = tier.featureOpacity * tier.opacity;
          ctx.fillStyle = '#6B7280';
          ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
          tier.features.forEach((feature, i) => {
            const featureY = tier.y + 20 + (i * 15);
            const featureX = x + 25;
            ctx.fillText(feature, featureX, featureY);
          });
        }

        ctx.restore();
      });

      // Draw performance metrics with stagger animation
      metrics.forEach((metric, index) => {
        metric.progress = Math.min(1, metric.progress + 0.02);
        
        const staggerDelay = index * 0.3;
        const progress = Math.max(0, Math.min(1, (frame / 60 - staggerDelay) / 2));
        
        if (progress > 0) {
          ctx.save();
          ctx.globalAlpha = progress;
          
          // Metric card
          const cardX = metric.x + Math.sin(frame * 0.02 + index) * 3;
          const cardY = metric.y;
          
          // Card background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.strokeStyle = 'rgba(255, 110, 199, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(cardX - 60, cardY - 25, 120, 50, 8);
          ctx.fill();
          ctx.stroke();
          
          // Metric value
          ctx.fillStyle = '#FF6EC7';
          ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(metric.value, cardX, cardY);
          
          // Metric label
          ctx.fillStyle = '#9CA3AF';
          ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
          ctx.fillText(metric.label, cardX, cardY + 15);
          
          ctx.restore();
        }
      });

      // Enhanced particles with trails
      particles.forEach(particle => {
        // Update trail
        particle.trail.push({ 
          x: particle.x, 
          y: particle.y, 
          opacity: particle.opacity 
        });
        
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Add some wave motion
        particle.x += Math.sin(frame * 0.02 + particle.y * 0.01) * 0.3;
        
        // Wrap around
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
          particle.trail = [];
        }
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        
        // Draw trail
        ctx.save();
        particle.trail.forEach((point, i) => {
          const trailOpacity = (i / particle.trail.length) * point.opacity * 0.3;
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Growth indicator with pulse
      const growthX = canvas.width * 0.5;
      const growthY = canvas.height * 0.85;
      const pulse = Math.sin(frame * 0.03) * 0.1 + 1;
      
      ctx.save();
      ctx.globalAlpha = 0.8;
      
      // Pulsing background
      const pulseGradient = ctx.createRadialGradient(growthX, growthY - 20, 0, growthX, growthY - 20, 50 * pulse);
      pulseGradient.addColorStop(0, 'rgba(255, 110, 199, 0.1)');
      pulseGradient.addColorStop(1, 'rgba(255, 110, 199, 0)');
      ctx.fillStyle = pulseGradient;
      ctx.fillRect(growthX - 100, growthY - 70, 200, 100);
      
      // Animated arrow
      ctx.strokeStyle = '#FF6EC7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(growthX - 30, growthY);
      ctx.lineTo(growthX, growthY - 30 * pulse);
      ctx.lineTo(growthX + 30, growthY);
      ctx.stroke();
      
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(growthX, growthY - 30 * pulse);
      ctx.lineTo(growthX - 5, growthY - 25 * pulse);
      ctx.moveTo(growthX, growthY - 30 * pulse);
      ctx.lineTo(growthX + 5, growthY - 25 * pulse);
      ctx.stroke();
      
      // Growth text
      ctx.fillStyle = '#FF6EC7';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scale with confidence', growthX, growthY + 20);
      
      ctx.restore();

      requestAnimationFrame(animate);
    };

    // Start animation
    setTimeout(() => {
      animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9, cursor: 'default' }}
    />
  );
};

export default PricingAnimation;