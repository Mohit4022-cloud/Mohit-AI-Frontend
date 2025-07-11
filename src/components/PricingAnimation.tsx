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

    // Clean minimal price tiers
    interface PriceTier {
      label: string;
      value: string;
      y: number;
      targetY: number;
      opacity: number;
      highlighted: boolean;
    }

    const tiers: PriceTier[] = [
      { label: 'Starter', value: '$75', y: 0, targetY: 0, opacity: 0, highlighted: false },
      { label: 'Professional', value: '$299', y: 0, targetY: 0, opacity: 0, highlighted: true },
      { label: 'Scale', value: '$799', y: 0, targetY: 0, opacity: 0, highlighted: false }
    ];

    // Set initial positions
    const spacing = canvas.height / 4;
    tiers.forEach((tier, i) => {
      tier.targetY = spacing + (i * spacing * 0.8);
      tier.y = tier.targetY + 50;
    });

    // Very subtle floating dots
    interface Dot {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
    }

    const dots: Dot[] = [];
    for (let i = 0; i < 15; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw very subtle connection lines between tiers
      ctx.strokeStyle = 'rgba(255, 110, 199, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 10]);
      
      for (let i = 0; i < tiers.length - 1; i++) {
        const tier1 = tiers[i];
        const tier2 = tiers[i + 1];
        
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.3, tier1.y);
        ctx.lineTo(canvas.width * 0.3, tier2.y);
        ctx.stroke();
      }
      
      ctx.setLineDash([]);

      // Draw pricing tiers
      tiers.forEach((tier, index) => {
        // Smooth animation
        tier.y += (tier.targetY - tier.y) * 0.05;
        tier.opacity = Math.min(1, tier.opacity + 0.02);

        const x = canvas.width * 0.3;

        // Draw tier circle
        ctx.save();
        
        if (tier.highlighted) {
          // Very subtle glow for highlighted tier
          const glow = ctx.createRadialGradient(x, tier.y, 0, x, tier.y, 25);
          glow.addColorStop(0, 'rgba(255, 110, 199, 0.1)');
          glow.addColorStop(1, 'rgba(255, 110, 199, 0)');
          ctx.fillStyle = glow;
          ctx.fillRect(x - 25, tier.y - 25, 50, 50);
        }

        // Tier dot
        ctx.fillStyle = tier.highlighted ? '#FF6EC7' : '#E5E7EB';
        ctx.beginPath();
        ctx.arc(x, tier.y, tier.highlighted ? 8 : 6, 0, Math.PI * 2);
        ctx.fill();

        // Inner dot
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, tier.y, tier.highlighted ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Tier label
        ctx.globalAlpha = tier.opacity;
        ctx.fillStyle = '#6B7280';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(tier.label, x - 20, tier.y);

        // Price value (static, no floating)
        ctx.fillStyle = tier.highlighted ? '#FF6EC7' : '#1A1A1A';
        ctx.font = tier.highlighted ? 'bold 24px -apple-system, BlinkMacSystemFont, sans-serif' : '20px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(tier.value, x + 20, tier.y);

        // Per month label
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('/month', x + 80, tier.y + 2);

        ctx.restore();
      });

      // Very subtle growth indicator
      const growthX = canvas.width * 0.7;
      const growthY = canvas.height * 0.5;
      
      ctx.save();
      ctx.globalAlpha = 0.6;
      
      // Simple growth arrow
      ctx.strokeStyle = '#FF6EC7';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(growthX - 25, growthY + 15);
      ctx.lineTo(growthX, growthY - 10);
      ctx.lineTo(growthX + 25, growthY + 15);
      ctx.stroke();
      
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(growthX, growthY - 10);
      ctx.lineTo(growthX - 4, growthY - 6);
      ctx.moveTo(growthX, growthY - 10);
      ctx.lineTo(growthX + 4, growthY - 6);
      ctx.stroke();
      
      // Growth text
      ctx.fillStyle = '#FF6EC7';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scale', growthX, growthY + 35);
      
      ctx.fillStyle = '#6B7280';
      ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('as you grow', growthX, growthY + 50);
      
      ctx.restore();

      // Update and draw very subtle dots
      dots.forEach(dot => {
        dot.y -= dot.speed;
        
        if (dot.y < -10) {
          dot.y = canvas.height + 10;
          dot.x = Math.random() * canvas.width;
        }
        
        ctx.save();
        ctx.globalAlpha = dot.opacity;
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    // Start animation after a short delay
    setTimeout(() => {
      animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
};

export default PricingAnimation;