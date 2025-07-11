import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Sparkles, Orbit } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { animations } from '@/utils/animations';

const themeIcons = {
  dark: Moon,
  midnight: Sun,
  cosmic: Sparkles,
  quantum: Orbit
};

const themeNames = {
  dark: 'Dark Mode',
  midnight: 'Midnight',
  cosmic: 'Cosmic',
  quantum: 'Quantum'
};

export const ThemeSwitcher: React.FC<{
  variant?: 'button' | 'dropdown' | 'inline';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ variant = 'button', showLabel = true, size = 'md' }) => {
  const { theme, setTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const sizes = {
    sm: { icon: 16, padding: 'p-2', text: 'text-sm' },
    md: { icon: 20, padding: 'p-3', text: 'text-base' },
    lg: { icon: 24, padding: 'p-4', text: 'text-lg' }
  };

  const currentSize = sizes[size];
  const Icon = themeIcons[theme];

  if (variant === 'button') {
    return (
      <motion.button
        className={`relative ${currentSize.padding} rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const themes = Object.keys(themeIcons) as Array<keyof typeof themeIcons>;
          const currentIndex = themes.indexOf(theme);
          const nextTheme = themes[(currentIndex + 1) % themes.length];
          setTheme(nextTheme);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={currentSize.icon} className="text-neutral-300" />
          </motion.div>
        </AnimatePresence>
        
        {showLabel && (
          <span className={`ml-2 ${currentSize.text} text-neutral-300`}>
            {themeNames[theme]}
          </span>
        )}
      </motion.button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <motion.button
          className={`flex items-center gap-2 ${currentSize.padding} rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon size={currentSize.icon} className="text-neutral-300" />
          {showLabel && (
            <span className={`${currentSize.text} text-neutral-300`}>
              {themeNames[theme]}
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                className="absolute top-full mt-2 right-0 z-50 w-48 bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden shadow-xl"
                variants={animations.modal}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {(Object.keys(themeIcons) as Array<keyof typeof themeIcons>).map((themeOption) => {
                  const ThemeIcon = themeIcons[themeOption];
                  const isActive = theme === themeOption;
                  
                  return (
                    <motion.button
                      key={themeOption}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                        isActive 
                          ? 'bg-neutral-700 text-white' 
                          : 'hover:bg-neutral-700/50 text-neutral-300'
                      }`}
                      onClick={() => {
                        setTheme(themeOption);
                        setIsOpen(false);
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <ThemeIcon size={18} />
                      <span className="text-sm font-medium">{themeNames[themeOption]}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full bg-pink-500"
                          layoutId="activeTheme"
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="flex items-center gap-2">
      {(Object.keys(themeIcons) as Array<keyof typeof themeIcons>).map((themeOption) => {
        const ThemeIcon = themeIcons[themeOption];
        const isActive = theme === themeOption;
        
        return (
          <motion.button
            key={themeOption}
            className={`relative ${currentSize.padding} rounded-lg transition-all ${
              isActive 
                ? 'bg-neutral-700 text-white shadow-lg' 
                : 'bg-neutral-800/50 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300'
            }`}
            onClick={() => setTheme(themeOption)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeIcon size={currentSize.icon} />
            
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: `radial-gradient(circle at center, ${themeConfig.colors.accent.primary}20 0%, transparent 70%)`,
                }}
              />
            )}
            
            {showLabel && (
              <span className={`ml-2 ${currentSize.text}`}>
                {themeNames[themeOption]}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// Compact theme toggle for header
export const CompactThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const Icon = themeIcons[theme];

  return (
    <motion.button
      className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={`Current theme: ${themeNames[theme]}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Icon size={20} className="text-neutral-400 hover:text-neutral-200" />
      </motion.div>
    </motion.button>
  );
};

// Theme preview component
export const ThemePreview: React.FC<{
  previewTheme: 'dark' | 'midnight' | 'cosmic' | 'quantum';
  isActive?: boolean;
  onClick?: () => void;
}> = ({ previewTheme, isActive = false, onClick }) => {
  const Icon = themeIcons[previewTheme];
  
  // Mock theme colors for preview
  const previewColors = {
    dark: { bg: '#0f0f0f', surface: '#1a1a1a', accent: '#ec4899' },
    midnight: { bg: '#0a0a0a', surface: '#151515', accent: '#ff0080' },
    cosmic: { bg: '#070014', surface: '#0f0824', accent: '#bd00ff' },
    quantum: { bg: '#000814', surface: '#001d3d', accent: '#ffd60a' }
  };

  const colors = previewColors[previewTheme];

  return (
    <motion.div
      className={`relative cursor-pointer rounded-xl overflow-hidden ${
        isActive ? 'ring-2 ring-offset-2 ring-offset-neutral-900 ring-pink-500' : ''
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="w-32 h-24 p-3"
        style={{ backgroundColor: colors.bg }}
      >
        <div 
          className="w-full h-full rounded-lg flex items-center justify-center"
          style={{ backgroundColor: colors.surface }}
        >
          <Icon size={24} style={{ color: colors.accent }} />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm px-3 py-1">
        <span className="text-xs text-white font-medium">{themeNames[previewTheme]}</span>
      </div>
      
      {isActive && (
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{ backgroundColor: colors.accent }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default ThemeSwitcher;