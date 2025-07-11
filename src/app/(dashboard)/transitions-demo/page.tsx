"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PageTransition,
  StaggerChildren,
  SectionTransition,
  HoverCard
} from '@/components/UI/PageTransition';
import QuantumCard from '@/components/UI/QuantumCard';
import QuantumButton from '@/components/UI/QuantumButton';
import { 
  Layers, 
  Move, 
  Maximize, 
  RotateCw, 
  Eye,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { animations } from '@/utils/animations';

export default function TransitionsDemoPage() {
  const [transitionType, setTransitionType] = useState<'fade' | 'slide' | 'scale' | 'rotate' | 'blur'>('fade');
  const [key, setKey] = useState(0);

  const triggerTransition = () => {
    setKey(prev => prev + 1);
  };

  const transitionTypes = [
    { type: 'fade' as const, icon: Eye, label: 'Fade', color: 'text-pink-400' },
    { type: 'slide' as const, icon: Move, label: 'Slide', color: 'text-blue-400' },
    { type: 'scale' as const, icon: Maximize, label: 'Scale', color: 'text-green-400' },
    { type: 'rotate' as const, icon: RotateCw, label: 'Rotate', color: 'text-purple-400' },
    { type: 'blur' as const, icon: Layers, label: 'Blur', color: 'text-yellow-400' }
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={animations.page}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div>
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">
          Page Transitions Demo
        </h1>
        <p className="text-neutral-400">
          Smooth transitions and animations for better user experience
        </p>
      </div>

      {/* Transition Type Selector */}
      <QuantumCard variant="glass" padding="lg">
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">
          Page Transition Types
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {transitionTypes.map(({ type, icon: Icon, label, color }) => (
            <motion.button
              key={type}
              className={`
                p-4 rounded-lg border transition-all
                ${transitionType === type 
                  ? 'bg-neutral-800 border-pink-500' 
                  : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800'
                }
              `}
              onClick={() => setTransitionType(type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={24} className={`mx-auto mb-2 ${color}`} />
              <p className="text-sm text-neutral-300">{label}</p>
            </motion.button>
          ))}
        </div>

        <div className="space-y-4">
          <QuantumButton
            variant="primary"
            icon={Sparkles}
            onClick={triggerTransition}
            className="w-full"
          >
            Trigger Page Transition
          </QuantumButton>

          <PageTransition key={key} type={transitionType} duration={0.5}>
            <div className="p-8 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-500/20">
              <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                Transition Preview
              </h3>
              <p className="text-neutral-400">
                This content transitions with a {transitionType} effect when triggered.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-pink-400">
                <span>Transition #{key}</span>
                <ChevronRight size={16} />
                <span>{transitionType} effect</span>
              </div>
            </div>
          </PageTransition>
        </div>
      </QuantumCard>

      {/* Stagger Children Demo */}
      <QuantumCard variant="gradient" padding="lg">
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">
          Staggered Animations
        </h2>
        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-neutral-800 rounded-lg border border-neutral-700"
            >
              <div className="text-2xl font-bold text-pink-400 mb-2">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-sm text-neutral-400">
                Staggered item with smooth entrance
              </p>
            </div>
          ))}
        </StaggerChildren>
      </QuantumCard>

      {/* Section Transitions */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-neutral-100">
          Scroll-Based Section Transitions
        </h2>
        
        <SectionTransition>
          <QuantumCard variant="neon" padding="lg">
            <h3 className="text-lg font-semibold text-neutral-100 mb-2">
              Section 1: Fade In on Scroll
            </h3>
            <p className="text-neutral-400">
              This section fades in smoothly as you scroll down the page.
            </p>
          </QuantumCard>
        </SectionTransition>

        <SectionTransition>
          <QuantumCard variant="holographic" padding="lg">
            <h3 className="text-lg font-semibold text-neutral-100 mb-2">
              Section 2: Delayed Animation
            </h3>
            <p className="text-neutral-400">
              Multiple sections can have coordinated entrance animations.
            </p>
          </QuantumCard>
        </SectionTransition>

        <SectionTransition>
          <QuantumCard variant="glass" padding="lg">
            <h3 className="text-lg font-semibold text-neutral-100 mb-2">
              Section 3: Viewport Triggered
            </h3>
            <p className="text-neutral-400">
              Animations trigger when the element enters the viewport.
            </p>
          </QuantumCard>
        </SectionTransition>
      </div>

      {/* Hover Cards */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
          Interactive Hover Effects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Primary', 'Secondary', 'Tertiary'].map((label, i) => (
            <HoverCard key={i}>
              <QuantumCard variant="gradient" padding="lg">
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                  {label} Card
                </h3>
                <p className="text-sm text-neutral-400">
                  Hover to see the smooth lift animation with shadow effects.
                </p>
              </QuantumCard>
            </HoverCard>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <QuantumCard variant="default" padding="lg">
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">
          Implementation Example
        </h2>
        <pre className="text-sm text-neutral-400 overflow-x-auto bg-neutral-800 p-4 rounded-lg">
{`// Page-level transition
<PageTransition type="slide" duration={0.3}>
  <YourPageContent />
</PageTransition>

// Staggered list items
<StaggerChildren staggerDelay={0.1}>
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</StaggerChildren>

// Scroll-triggered sections
<SectionTransition threshold={0.2}>
  <Section>
    Content appears on scroll
  </Section>
</SectionTransition>

// Interactive hover cards
<HoverCard>
  <Card>Lifts on hover</Card>
</HoverCard>`}
        </pre>
      </QuantumCard>
    </motion.div>
  );
}