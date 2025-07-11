"use client";

import React, { useEffect, useRef } from 'react';
import { debounce, createAnimationLoop, isMobileDevice, prefersReducedMotion } from '@/lib/performance-utils';

const PricingAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    });
    if (!ctx) return;

    // Performance settings
    const isMobile = isMobileDevice();
    const reducedMotion = prefersReducedMotion();
    const fps = isMobile ? 30 : 60;

    const setCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = container.offsetWidth * dpr;
        canvas.height = container.offsetHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = container.offsetWidth + 'px';
        canvas.style.height = container.offsetHeight + 'px';
      }
    };

    setCanvasSize();
    const debouncedResize = debounce(setCanvasSize, 250);
    window.addEventListener('resize', debouncedResize, { passive: true });

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

    // Neural network nodes - reduced for mobile
    interface Node {
      x: number;
      y: number;
      connections: number[];
    }

    const nodes: Node[] = [];
    const nodeCount = isMobile ? 8 : 12;
    
    // Create network nodes in a grid-like pattern
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: []
      });
    }
    
    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + 
            Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 200 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    // Data packets flowing through network
    interface DataPacket {
      from: number;
      to: number;
      progress: number;
      active: boolean;
    }

    const packets: DataPacket[] = [];
    const maxPackets = isMobile ? 3 : 5;
    
    // Initialize some data packets
    for (let i = 0; i < maxPackets; i++) {
      const fromNode = Math.floor(Math.random() * nodeCount);
      const toNode = nodes[fromNode].connections[Math.floor(Math.random() * nodes[fromNode].connections.length)];
      if (toNode !== undefined) {
        packets.push({
          from: fromNode,
          to: toNode,
          progress: 0,
          active: true
        });
      }
    }

    let animationLoop: { start: () => void; stop: () => void } | null = null;

    const animate = (timestamp: number) => {
      // Clear with solid color for better performance
      const container = canvas.parentElement;
      if (container) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, container.offsetWidth, container.offsetHeight);
      }

      // Draw neural network connections - batch for performance
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = '#FF6EC7';
      ctx.lineWidth = 1;
      
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodes[connectionIndex];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        });
      });
      ctx.restore();

      // Draw neural network nodes - simplified for performance
      if (!reducedMotion) {
        ctx.save();
        ctx.fillStyle = '#FF6EC7';
        nodes.forEach(node => {
          ctx.globalAlpha = 0.05;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.globalAlpha = 0.1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // Animate data packets
      packets.forEach((packet, index) => {
        if (packet.active) {
          const fromNode = nodes[packet.from];
          const toNode = nodes[packet.to];
          
          packet.progress += reducedMotion ? 0.04 : 0.02;
          
          if (packet.progress >= 1) {
            // Reset packet to new connection
            packet.from = packet.to;
            const connections = nodes[packet.from].connections;
            if (connections.length > 0) {
              packet.to = connections[Math.floor(Math.random() * connections.length)];
              packet.progress = 0;
            } else {
              packet.active = false;
            }
          }
          
          // Draw packet - simplified for performance
          if (!reducedMotion) {
            const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;
            
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#FF6EC7';
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      });

      // Draw very subtle connection lines between tiers
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = '#FF6EC7';
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
      ctx.restore();

      // Draw pricing tiers
      tiers.forEach((tier, index) => {
        // Smooth animation
        tier.y += (tier.targetY - tier.y) * 0.05;
        tier.opacity = Math.min(1, tier.opacity + (reducedMotion ? 0.1 : 0.02));

        const x = (container?.offsetWidth || canvas.width) * 0.3;

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
      const growthX = (container?.offsetWidth || canvas.width) * 0.7;
      const growthY = (container?.offsetHeight || canvas.height) * 0.5;
      
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


    };

    // Use optimized animation loop
    animationLoop = createAnimationLoop(animate, fps);
    
    // Start animation after a short delay
    setTimeout(() => {
      animationLoop?.start();
    }, 100);

    return () => {
      if (animationLoop) {
        animationLoop.stop();
      }
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        opacity: 0.9,
        willChange: 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    />
  );
};

export default PricingAnimation;