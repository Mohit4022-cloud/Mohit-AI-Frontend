"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveStack,
  DeviceRender,
  ResponsiveText,
  ResponsiveSpacer
} from '@/components/UI/ResponsiveContainer';
import QuantumCard from '@/components/UI/QuantumCard';
import QuantumButton from '@/components/UI/QuantumButton';
import { useBreakpoint, useDeviceType, useViewport, useOrientation } from '@/utils/responsive';
import { Monitor, Tablet, Smartphone, Maximize2 } from 'lucide-react';
import { animations } from '@/utils/animations';

export default function ResponsiveDemoPage() {
  const breakpoint = useBreakpoint();
  const deviceType = useDeviceType();
  const viewport = useViewport();
  const orientation = useOrientation();

  return (
    <motion.div
      className="space-y-6"
      variants={animations.page}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <ResponsiveText
        as="h1"
        size={{ xs: '2xl', md: '3xl', lg: '4xl' }}
        weight={{ xs: 'semibold', md: 'bold' }}
        className="text-neutral-100"
      >
        Responsive Components Demo
      </ResponsiveText>

      {/* Current State Info */}
      <QuantumCard variant="glass" padding="lg">
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">
          Current Viewport Information
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-neutral-400">Breakpoint</p>
            <p className="text-lg font-semibold text-pink-400">{breakpoint}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400">Device Type</p>
            <p className="text-lg font-semibold text-pink-400">{deviceType}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400">Viewport</p>
            <p className="text-lg font-semibold text-pink-400">
              {viewport.width} × {viewport.height}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-400">Orientation</p>
            <p className="text-lg font-semibold text-pink-400">{orientation}</p>
          </div>
        </div>
      </QuantumCard>

      {/* Responsive Grid Demo */}
      <div>
        <ResponsiveText
          as="h2"
          size={{ xs: 'xl', md: '2xl' }}
          weight="semibold"
          className="text-neutral-100 mb-4"
        >
          Responsive Grid
        </ResponsiveText>
        <ResponsiveGrid
          cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          gap={{ xs: '1rem', md: '1.5rem' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <QuantumCard key={i} variant="gradient" padding="md">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  {i + 1}
                </div>
                <p className="text-sm text-neutral-400">Grid Item</p>
              </div>
            </QuantumCard>
          ))}
        </ResponsiveGrid>
      </div>

      {/* Responsive Stack Demo */}
      <div>
        <ResponsiveText
          as="h2"
          size={{ xs: 'xl', md: '2xl' }}
          weight="semibold"
          className="text-neutral-100 mb-4"
        >
          Responsive Stack
        </ResponsiveText>
        <ResponsiveStack
          direction={{ xs: 'vertical', md: 'horizontal' }}
          gap={{ xs: '1rem', lg: '2rem' }}
          wrap={{ xs: false, lg: true }}
        >
          <QuantumButton variant="primary" size="lg">
            Primary Action
          </QuantumButton>
          <QuantumButton variant="secondary" size="lg">
            Secondary Action
          </QuantumButton>
          <QuantumButton variant="ghost" size="lg">
            Tertiary Action
          </QuantumButton>
        </ResponsiveStack>
      </div>

      {/* Device-Specific Rendering */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
          Device-Specific Content
        </h2>
        <DeviceRender
          mobile={
            <QuantumCard variant="neon" padding="lg">
              <div className="flex items-center gap-4">
                <Smartphone size={32} className="text-pink-400" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-100">
                    Mobile View
                  </h3>
                  <p className="text-neutral-400">
                    Optimized for touch and small screens
                  </p>
                </div>
              </div>
            </QuantumCard>
          }
          tablet={
            <QuantumCard variant="gradient" padding="lg">
              <div className="flex items-center gap-4">
                <Tablet size={32} className="text-pink-400" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-100">
                    Tablet View
                  </h3>
                  <p className="text-neutral-400">
                    Balanced layout for medium screens
                  </p>
                </div>
              </div>
            </QuantumCard>
          }
          desktop={
            <QuantumCard variant="holographic" padding="lg">
              <div className="flex items-center gap-4">
                <Monitor size={32} className="text-pink-400" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-100">
                    Desktop View
                  </h3>
                  <p className="text-neutral-400">
                    Full features for large screens
                  </p>
                </div>
              </div>
            </QuantumCard>
          }
        />
      </div>

      {/* Responsive Container Demo */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
          Responsive Container
        </h2>
        <ResponsiveContainer
          display={{ xs: 'block', md: 'flex' }}
          gap={{ xs: '1rem', md: '2rem' }}
          padding={{ xs: '1rem', md: '2rem', lg: '3rem' }}
          className="bg-neutral-900 rounded-xl border border-neutral-800"
        >
          <div className="flex-1">
            <ResponsiveText
              size={{ xs: 'base', md: 'lg' }}
              weight={{ xs: 'normal', md: 'medium' }}
              className="text-neutral-300 mb-2"
            >
              Adaptive Content
            </ResponsiveText>
            <ResponsiveText
              size={{ xs: 'sm', md: 'base' }}
              className="text-neutral-500"
            >
              This container adapts its layout, padding, and gap based on the screen size.
            </ResponsiveText>
          </div>
          <div className="flex-shrink-0">
            <QuantumButton variant="primary" icon={Maximize2}>
              Resize Window
            </QuantumButton>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Responsive Spacer Demo */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
          Responsive Spacing
        </h2>
        <div className="bg-neutral-900 rounded-xl p-4">
          <div className="bg-pink-500/20 p-4 rounded">
            <p className="text-neutral-300">First Section</p>
          </div>
          
          <ResponsiveSpacer size={{ xs: '1rem', md: '2rem', lg: '3rem' }} />
          
          <div className="bg-blue-500/20 p-4 rounded">
            <p className="text-neutral-300">Second Section</p>
          </div>
          
          <ResponsiveSpacer size={{ xs: '0.5rem', md: '1.5rem', lg: '2.5rem' }} />
          
          <div className="bg-green-500/20 p-4 rounded">
            <p className="text-neutral-300">Third Section</p>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <QuantumCard variant="default" padding="lg">
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">
          Usage Example
        </h2>
        <pre className="text-sm text-neutral-400 overflow-x-auto bg-neutral-800 p-4 rounded-lg">
{`// Responsive Grid
<ResponsiveGrid
  cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gap={{ xs: '1rem', md: '2rem' }}
>
  {items.map(item => <Card key={item.id} />)}
</ResponsiveGrid>

// Responsive Text
<ResponsiveText
  size={{ xs: 'base', md: 'lg', lg: 'xl' }}
  weight={{ xs: 'normal', md: 'semibold' }}
>
  Adaptive Typography
</ResponsiveText>

// Device-Specific Rendering
<DeviceRender
  mobile={<MobileLayout />}
  tablet={<TabletLayout />}
  desktop={<DesktopLayout />}
/>`}
        </pre>
      </QuantumCard>
    </motion.div>
  );
}