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

    // Enhanced price tiers
    interface PriceTier {
      label: string;
      value: string;
      y: number;
      targetY: number;
      opacity: number;
      highlighted: boolean;
      scale: number;
      glowIntensity: number;
      ringRadius: number;
      ringOpacity: number;
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
        glowIntensity: 0,
        ringRadius: 20,
        ringOpacity: 0
      },
      { 
        label: 'Professional', 
        value: '$299', 
        y: 0, 
        targetY: 0, 
        opacity: 0, 
        highlighted: true, 
        scale: 1.1,
        glowIntensity: 0.5,
        ringRadius: 25,
        ringOpacity: 0.3
      },
      { 
        label: 'Scale', 
        value: '$799', 
        y: 0, 
        targetY: 0, 
        opacity: 0, 
        highlighted: false, 
        scale: 1,
        glowIntensity: 0,
        ringRadius: 20,
        ringOpacity: 0
      }
    ];

    // Set initial positions
    const spacing = canvas.height / 4;
    tiers.forEach((tier, i) => {
      tier.targetY = spacing + (i * spacing * 0.8);
      tier.y = tier.targetY + 100;
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

    // Elegant floating orbs
    interface Orb {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      opacity: number;
      color: string;
      speed: number;
    }

    const orbs: Orb[] = [];
    const orbColors = ['#FF6EC7', '#FFB6C1', '#DDA0DD', '#F0E6FF'];
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 150;
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;
      
      orbs.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        targetX: centerX + Math.cos(angle) * radius,
        targetY: centerY + Math.sin(angle) * radius,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        speed: Math.random() * 0.5 + 0.5
      });
    }

    // Flowing connections
    interface Flow {
      points: { x: number; y: number }[];
      progress: number;
      opacity: number;
    }

    const flows: Flow[] = [];
    
    // Create flowing paths between tiers
    for (let i = 0; i < 3; i++) {
      flows.push({
        points: [],
        progress: i * 0.33,
        opacity: 0.2
      });
    }

    let frame = 0;

    const animate = () => {
      // Subtle clear with trail effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;

      // Update orb positions with smooth floating
      orbs.forEach((orb, i) => {
        const angle = (frame * 0.001 * orb.speed) + (i / orbs.length) * Math.PI * 2;
        const radius = 120 + Math.sin(frame * 0.002 + i) * 30;
        const centerX = canvas.width * 0.5;
        const centerY = canvas.height * 0.5;
        
        orb.targetX = centerX + Math.cos(angle) * radius;
        orb.targetY = centerY + Math.sin(angle) * radius;
        
        // Smooth movement
        orb.x += (orb.targetX - orb.x) * 0.05;
        orb.y += (orb.targetY - orb.y) * 0.05;
        
        // Draw orb with glow
        const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size * 2);
        glow.addColorStop(0, orb.color + '40');
        glow.addColorStop(0.5, orb.color + '20');
        glow.addColorStop(1, orb.color + '00');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = orb.color + '60';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw elegant connections between tiers
      const tierX = canvas.width * 0.35;
      
      for (let i = 0; i < tiers.length - 1; i++) {
        const tier1 = tiers[i];
        const tier2 = tiers[i + 1];
        
        // Create curved path
        ctx.strokeStyle = 'rgba(255, 110, 199, 0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        
        ctx.beginPath();
        ctx.moveTo(tierX, tier1.y);
        
        const cp1x = tierX + 50;
        const cp1y = tier1.y + (tier2.y - tier1.y) * 0.3;
        const cp2x = tierX + 50;
        const cp2y = tier1.y + (tier2.y - tier1.y) * 0.7;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, tierX, tier2.y);
        ctx.stroke();
        
        ctx.setLineDash([]);
      }

      // Draw pricing tiers with enhanced design
      tiers.forEach((tier, index) => {
        // Smooth animation
        tier.y += (tier.targetY - tier.y) * 0.08;
        tier.opacity = Math.min(1, tier.opacity + 0.03);

        const x = tierX;
        
        // Check hover proximity
        const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - tier.y, 2));
        const isNear = distance < 150;
        
        // Update glow intensity
        const targetGlow = tier.highlighted ? 0.5 : (isNear ? 0.3 : 0);
        tier.glowIntensity += (targetGlow - tier.glowIntensity) * 0.1;
        
        // Update ring animation
        tier.ringRadius += 0.5;
        if (tier.ringRadius > 50) tier.ringRadius = 20;
        tier.ringOpacity = tier.highlighted ? 0.3 * (1 - (tier.ringRadius - 20) / 30) : 0;

        ctx.save();
        
        // Expanding ring effect for highlighted tier
        if (tier.ringOpacity > 0) {
          ctx.strokeStyle = `rgba(255, 110, 199, ${tier.ringOpacity})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, tier.y, tier.ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Glow effect
        if (tier.glowIntensity > 0) {
          const glowSize = 60;
          const glow = ctx.createRadialGradient(x, tier.y, 0, x, tier.y, glowSize);
          glow.addColorStop(0, `rgba(255, 110, 199, ${tier.glowIntensity * 0.3})`);
          glow.addColorStop(0.5, `rgba(255, 182, 193, ${tier.glowIntensity * 0.1})`);
          glow.addColorStop(1, 'rgba(255, 110, 199, 0)');
          ctx.fillStyle = glow;
          ctx.fillRect(x - glowSize, tier.y - glowSize, glowSize * 2, glowSize * 2);
        }

        // Main tier circle
        const circleSize = tier.highlighted ? 12 : 10;
        
        // Outer circle
        ctx.fillStyle = tier.highlighted ? '#FF6EC7' : '#F3F4F6';
        ctx.beginPath();
        ctx.arc(x, tier.y, circleSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner circle
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, tier.y, circleSize - 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Center dot
        ctx.fillStyle = tier.highlighted ? '#FF6EC7' : '#E5E7EB';
        ctx.beginPath();
        ctx.arc(x, tier.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Clean typography
        ctx.globalAlpha = tier.opacity;
        
        // Tier label
        ctx.fillStyle = '#6B7280';
        ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(tier.label, x - 30, tier.y);

        // Price value
        ctx.fillStyle = tier.highlighted ? '#FF6EC7' : '#1A1A1A';
        ctx.font = tier.highlighted ? 
          'bold 24px -apple-system, BlinkMacSystemFont, sans-serif' : 
          '20px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(tier.value, x + 30, tier.y);

        // Per month
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('/mo', x + 85, tier.y + 1);

        ctx.restore();
      });

      // Draw central focal element
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;
      
      // Rotating gradient ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(frame * 0.001);
      
      const gradient = ctx.createLinearGradient(-100, 0, 100, 0);
      gradient.addColorStop(0, 'rgba(255, 110, 199, 0.2)');
      gradient.addColorStop(0.5, 'rgba(255, 182, 193, 0.1)');
      gradient.addColorStop(1, 'rgba(221, 160, 221, 0.2)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.stroke();
      
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