"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Moon, Sun, Sparkles, Orbit } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeSwitcher, ThemePreview } from '@/components/UI/ThemeSwitcher';
import QuantumCard from '@/components/UI/QuantumCard';
import QuantumButton from '@/components/UI/QuantumButton';
import { animations } from '@/utils/animations';
import { useToast } from "@/components/ui/use-toast";

export function ThemeSettings() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Classic dark theme with pink accents',
      icon: Moon,
      preview: {
        primary: '#ec4899',
        secondary: '#8b5cf6',
        bg: '#0f0f0f',
        surface: '#1a1a1a'
      }
    },
    {
      id: 'midnight',
      name: 'Midnight',
      description: 'Deep blacks with neon highlights',
      icon: Sun,
      preview: {
        primary: '#ff0080',
        secondary: '#00d4ff',
        bg: '#0a0a0a',
        surface: '#151515'
      }
    },
    {
      id: 'cosmic',
      name: 'Cosmic',
      description: 'Purple space theme with vibrant accents',
      icon: Sparkles,
      preview: {
        primary: '#bd00ff',
        secondary: '#00fff0',
        bg: '#070014',
        surface: '#0f0824'
      }
    },
    {
      id: 'quantum',
      name: 'Quantum',
      description: 'Futuristic blue and gold combination',
      icon: Orbit,
      preview: {
        primary: '#ffd60a',
        secondary: '#003566',
        bg: '#000814',
        surface: '#001d3d'
      }
    }
  ];

  const handleThemeChange = (newTheme: any) => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme changed to ${themes.find(t => t.id === newTheme)?.name}`,
    });
  };

  return (
    <motion.div
      className="space-y-6"
      variants={animations.stagger.container}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div variants={animations.stagger.item}>
        <h2 className="text-2xl font-bold text-neutral-100 mb-2">Theme Settings</h2>
        <p className="text-neutral-400">Customize the appearance of your dashboard</p>
      </motion.div>

      {/* Current Theme Card */}
      <motion.div variants={animations.stagger.item}>
        <QuantumCard variant="gradient" padding="lg" hover="glow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-pink-500/10">
                <Palette size={32} className="text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">Active Theme</h3>
                <p className="text-neutral-400">
                  Currently using: <span className="text-pink-400 font-medium">{themes.find(t => t.id === theme)?.name || 'Dark Mode'}</span>
                </p>
              </div>
            </div>
            
            <ThemeSwitcher variant="dropdown" showLabel={false} size="lg" />
          </div>
        </QuantumCard>
      </motion.div>

      {/* Theme Grid */}
      <motion.div variants={animations.stagger.item}>
        <h3 className="text-lg font-semibold text-neutral-100 mb-4">Available Themes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map((themeOption, index) => {
            const Icon = themeOption.icon;
            const isActive = theme === themeOption.id;
            
            return (
              <motion.div
                key={themeOption.id}
                variants={animations.stagger.item}
                custom={index}
              >
                <QuantumCard
                  variant={isActive ? 'neon' : 'default'}
                  hover="lift"
                  className={`cursor-pointer ${isActive ? 'ring-2 ring-pink-500' : ''}`}
                  onClick={() => handleThemeChange(themeOption.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Theme Preview */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <div 
                        className="w-full h-full p-2"
                        style={{ backgroundColor: themeOption.preview.bg }}
                      >
                        <div 
                          className="w-full h-full rounded-md flex items-center justify-center"
                          style={{ backgroundColor: themeOption.preview.surface }}
                        >
                          <div className="flex gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: themeOption.preview.primary }}
                            />
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: themeOption.preview.secondary }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Theme Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={20} className="text-neutral-400" />
                        <h4 className="font-semibold text-neutral-100">{themeOption.name}</h4>
                        {isActive && (
                          <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-400 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-400">{themeOption.description}</p>
                      
                      {/* Color Swatches */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-neutral-500">Colors:</span>
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: themeOption.preview.primary }}
                          title="Primary"
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: themeOption.preview.secondary }}
                          title="Secondary"
                        />
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: themeOption.preview.bg }}
                          title="Background"
                        />
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: themeOption.preview.surface }}
                          title="Surface"
                        />
                      </div>
                    </div>
                  </div>
                </QuantumCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Theme Preferences */}
      <motion.div variants={animations.stagger.item}>
        <QuantumCard variant="glass" padding="lg">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Theme Preferences</h3>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-neutral-100">Auto-switch based on time</span>
                <p className="text-sm text-neutral-500">Automatically switch themes at sunset/sunrise</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 rounded bg-neutral-800 border-neutral-700 text-pink-500 focus:ring-pink-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-neutral-100">Sync with system theme</span>
                <p className="text-sm text-neutral-500">Follow your operating system's theme preference</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 rounded bg-neutral-800 border-neutral-700 text-pink-500 focus:ring-pink-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-neutral-100">Enable theme animations</span>
                <p className="text-sm text-neutral-500">Smooth transitions when switching themes</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded bg-neutral-800 border-neutral-700 text-pink-500 focus:ring-pink-500"
              />
            </label>
          </div>
        </QuantumCard>
      </motion.div>

      {/* Additional Options */}
      <motion.div variants={animations.stagger.item}>
        <QuantumCard variant="default" padding="lg">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Additional Options</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-100">High Contrast</p>
                <p className="text-sm text-neutral-500">Increase contrast for better readability</p>
              </div>
              <QuantumButton variant="secondary" size="sm" disabled>
                Coming Soon
              </QuantumButton>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-100">Custom Colors</p>
                <p className="text-sm text-neutral-500">Personalize your color scheme</p>
              </div>
              <QuantumButton variant="secondary" size="sm" disabled>
                Coming Soon
              </QuantumButton>
            </div>
          </div>
        </QuantumCard>
      </motion.div>

      {/* Quick Preview */}
      <motion.div variants={animations.stagger.item}>
        <h3 className="text-lg font-semibold text-neutral-100 mb-4">Quick Preview</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {themes.map((themeOption) => (
            <ThemePreview
              key={themeOption.id}
              previewTheme={themeOption.id as any}
              isActive={theme === themeOption.id}
              onClick={() => handleThemeChange(themeOption.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Info Message */}
      <motion.div 
        variants={animations.stagger.item}
        className="text-sm text-neutral-400 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700"
      >
        <p className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          Theme changes are applied immediately and saved automatically.
        </p>
      </motion.div>
    </motion.div>
  );
}