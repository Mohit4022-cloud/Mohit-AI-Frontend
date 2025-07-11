"use client";

import React, { useEffect, useRef } from 'react';

export default function AIFlowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulsePhase: number;
      connections: number[];
    }> = [];

    // Create nodes in a structured pattern
    const layers = [3, 5, 4, 3]; // Neural network structure
    const totalWidth = canvas.offsetWidth;
    const totalHeight = canvas.offsetHeight;
    const layerSpacing = totalWidth / (layers.length + 1);

    layers.forEach((nodeCount, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1);
      const ySpacing = totalHeight / (nodeCount + 1);
      
      for (let i = 0; i < nodeCount; i++) {
        const y = ySpacing * (i + 1);
        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: layerIndex === 1 || layerIndex === 2 ? 4 : 3,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        });
      }
    });

    // Create connections between adjacent layers
    let nodeIndex = 0;
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerSize = layers[layer];
      const nextLayerSize = layers[layer + 1];
      const nextLayerStartIndex = nodeIndex + currentLayerSize;
      
      for (let i = 0; i < currentLayerSize; i++) {
        const currentNode = nodes[nodeIndex + i];
        // Connect to 2-3 nodes in the next layer
        const connectionCount = Math.min(2 + Math.floor(Math.random() * 2), nextLayerSize);
        const selectedNodes = new Set<number>();
        
        while (selectedNodes.size < connectionCount) {
          selectedNodes.add(nextLayerStartIndex + Math.floor(Math.random() * nextLayerSize));
        }
        
        currentNode.connections = Array.from(selectedNodes);
      }
      
      nodeIndex += currentLayerSize;
    }

    // Data particles flowing through the network
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update nodes with subtle floating motion
      nodes.forEach((node, index) => {
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

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 110, 199, 0.1)';
      ctx.lineWidth = 1;
      nodes.forEach((node) => {
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex];
          if (target) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            
            // Create slight curve for more organic look
            const midX = (node.x + target.x) / 2;
            const midY = (node.y + target.y) / 2 + 20;
            ctx.quadraticCurveTo(midX, midY, target.x, target.y);
            
            ctx.stroke();
          }
        });
      });

      // Create new particles
      if (frame % 30 === 0 && particles.length < 15) {
        // Pick a random starting node from the first layer
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
            speed: 0.015 + Math.random() * 0.01,
            opacity: 1
          });
        }
      }

      // Update and draw particles
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
          
          // Draw particle with glow
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 8);
          gradient.addColorStop(0, `rgba(255, 110, 199, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 110, 199, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(255, 110, 199, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // When particle reaches target, continue to next node or fade out
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

      // Remove faded particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }

      // Draw nodes
      nodes.forEach((node, index) => {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        
        // Node glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
        glowGradient.addColorStop(0, `rgba(255, 110, 199, ${0.2 * pulse})`);
        glowGradient.addColorStop(1, 'rgba(255, 110, 199, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Node core
        ctx.fillStyle = '#FF6EC7';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // White center
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <section className="ai-flow-section">
      <div className="flow-container">
        <canvas 
          ref={canvasRef}
          className="ai-flow-canvas"
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