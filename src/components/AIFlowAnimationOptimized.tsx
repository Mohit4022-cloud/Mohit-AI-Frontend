"use client";

import React, { useEffect, useRef } from 'react';
import { debounce, createAnimationLoop, isMobileDevice, prefersReducedMotion } from '@/lib/performance-utils';

export default function AIFlowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use low-latency context for better performance
    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true,
      willReadFrequently: false 
    });
    if (!ctx) return;

    // Performance settings based on device
    const isMobile = isMobileDevice();
    const reducedMotion = prefersReducedMotion();
    const fps = isMobile ? 30 : 60;
    const maxParticles = isMobile ? 8 : 15;
    const particleSpeed = reducedMotion ? 0.005 : (isMobile ? 0.01 : 0.015);

    // Set canvas size with debounced resize handler
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap at 2x for performance
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    const debouncedResize = debounce(updateSize, 250);
    window.addEventListener('resize', debouncedResize, { passive: true });

    // Neural network nodes with reduced complexity for mobile
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulsePhase: number;
      connections: number[];
    }> = [];

    // Adjust network structure for mobile
    const layers = isMobile ? [2, 3, 3, 2] : [3, 5, 4, 3];
    const totalWidth = canvas.offsetWidth;
    const totalHeight = canvas.offsetHeight;
    const layerSpacing = totalWidth / (layers.length + 1);

    // Create nodes
    layers.forEach((nodeCount, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1);
      const ySpacing = totalHeight / (nodeCount + 1);
      
      for (let i = 0; i < nodeCount; i++) {
        const y = ySpacing * (i + 1);
        nodes.push({
          x,
          y,
          vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.2,
          vy: reducedMotion ? 0 : (Math.random() - 0.5) * 0.2,
          radius: layerIndex === 1 || layerIndex === 2 ? 4 : 3,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        });
      }
    });

    // Create connections
    let nodeIndex = 0;
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerSize = layers[layer];
      const nextLayerSize = layers[layer + 1];
      const nextLayerStartIndex = nodeIndex + currentLayerSize;
      
      for (let i = 0; i < currentLayerSize; i++) {
        const currentNode = nodes[nodeIndex + i];
        const connectionCount = Math.min(2 + Math.floor(Math.random() * 2), nextLayerSize);
        const selectedNodes = new Set<number>();
        
        while (selectedNodes.size < connectionCount) {
          selectedNodes.add(nextLayerStartIndex + Math.floor(Math.random() * nextLayerSize));
        }
        
        currentNode.connections = Array.from(selectedNodes);
      }
      
      nodeIndex += currentLayerSize;
    }

    // Data particles
    const particles: Array<{
      x: number;
      y: number;
      targetNode: number;
      sourceNode: number;
      progress: number;
      speed: number;
      opacity: number;
    }> = [];

    // Animation variables
    let frame = 0;

    // Pre-calculate static values
    const connectionPaths = new Map<string, Path2D>();
    const nodeGlows = new Map<number, { gradient: CanvasGradient }>();

    // Pre-render connection paths
    const updateConnectionPaths = () => {
      connectionPaths.clear();
      nodes.forEach((node, idx) => {
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex];
          if (target) {
            const path = new Path2D();
            const midX = (node.x + target.x) / 2;
            const midY = (node.y + target.y) / 2 + 20;
            path.moveTo(node.x, node.y);
            path.quadraticCurveTo(midX, midY, target.x, target.y);
            connectionPaths.set(`${idx}-${targetIndex}`, path);
          }
        });
      });
    };
    updateConnectionPaths();

    // Animation function
    const animate = (timestamp: number) => {
      // Clear with solid color for better performance
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update nodes only if not reduced motion
      if (!reducedMotion) {
        nodes.forEach((node) => {
          // Subtle floating animation
          node.x += node.vx;
          node.y += node.vy;

          // Soft boundaries
          const margin = 50;
          if (node.x < margin || node.x > canvas.offsetWidth - margin) node.vx *= -0.8;
          if (node.y < margin || node.y > canvas.offsetHeight - margin) node.vy *= -0.8;

          // Add slight random motion
          node.vx += (Math.random() - 0.5) * 0.02;
          node.vy += (Math.random() - 0.5) * 0.02;

          // Damping
          node.vx *= 0.99;
          node.vy *= 0.99;

          // Update pulse phase
          node.pulsePhase += 0.02;
        });
      }

      // Draw connections in batch
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = '#FF6EC7';
      ctx.lineWidth = 1;
      connectionPaths.forEach(path => {
        ctx.stroke(path);
      });
      ctx.restore();

      // Create new particles
      if (frame % (isMobile ? 45 : 30) === 0 && particles.length < maxParticles) {
        const firstLayerNodes = nodes.slice(0, layers[0]);
        const sourceNode = Math.floor(Math.random() * firstLayerNodes.length);
        const source = nodes[sourceNode];
        
        if (source.connections.length > 0) {
          const targetNode = source.connections[Math.floor(Math.random() * source.connections.length)];
          particles.push({
            x: source.x,
            y: source.y,
            sourceNode,
            targetNode,
            progress: 0,
            speed: particleSpeed + Math.random() * particleSpeed * 0.5,
            opacity: 1
          });
        }
      }

      // Batch particle rendering
      ctx.save();
      particles.forEach((particle, index) => {
        const source = nodes[particle.sourceNode];
        const target = nodes[particle.targetNode];
        
        if (source && target) {
          particle.progress += particle.speed;
          
          // Calculate position along curve
          const t = particle.progress;
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2 + 20;
          
          // Quadratic Bezier curve
          particle.x = (1 - t) * (1 - t) * source.x + 2 * (1 - t) * t * midX + t * t * target.x;
          particle.y = (1 - t) * (1 - t) * source.y + 2 * (1 - t) * t * midY + t * t * target.y;
          
          // Simple particle rendering for performance
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = '#FF6EC7';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
          ctx.fill();
          
          // When particle reaches target
          if (particle.progress >= 1) {
            const currentTarget = nodes[particle.targetNode];
            if (currentTarget.connections.length > 0 && Math.random() > 0.3) {
              // Continue to next node
              particle.sourceNode = particle.targetNode;
              particle.targetNode = currentTarget.connections[Math.floor(Math.random() * currentTarget.connections.length)];
              particle.progress = 0;
            } else {
              // Start fading out
              particle.opacity -= 0.05;
            }
          }
        }
      });
      ctx.restore();

      // Remove faded particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }

      // Batch node rendering
      ctx.save();
      nodes.forEach((node) => {
        const pulse = reducedMotion ? 1 : Math.sin(node.pulsePhase) * 0.3 + 0.7;
        
        // Simple node rendering for performance
        ctx.globalAlpha = 0.2 * pulse;
        ctx.fillStyle = '#FF6EC7';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Node core
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FF6EC7';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // White center
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      frame++;
    };

    // Use optimized animation loop
    animationRef.current = createAnimationLoop(animate, fps);
    animationRef.current.start();

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return (
    <section className="ai-flow-section">
      <div className="flow-container">
        <canvas 
          ref={canvasRef}
          className="ai-flow-canvas"
          style={{ 
            willChange: 'auto',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        />
        <div className="flow-overlay">
          <h2 className="flow-title">
            AI-Powered <span className="text-pink">Intelligence Network</span>
          </h2>
          <p className="flow-description">
            Real-time decision making across every customer touchpoint
          </p>
        </div>
      </div>
    </section>
  );
}