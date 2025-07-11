import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

type Theme = 'dark' | 'midnight' | 'cosmic' | 'quantum';

interface ThemeColors {
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderHover: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  accent: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

interface ThemeConfig {
  name: Theme;
  colors: ThemeColors;
  effects: {
    blur: boolean;
    glow: boolean;
    animations: boolean;
  };
}

const themes: Record<Theme, ThemeConfig> = {
  dark: {
    name: 'dark',
    colors: {
      background: '#0f0f0f',
      surface: '#1a1a1a',
      surfaceHover: '#262626',
      border: '#2a2a2a',
      borderHover: '#3a3a3a',
      text: {
        primary: '#fafafa',
        secondary: '#d4d4d4',
        tertiary: '#737373'
      },
      accent: {
        primary: '#ec4899',
        secondary: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
      }
    },
    effects: {
      blur: true,
      glow: true,
      animations: true
    }
  },
  midnight: {
    name: 'midnight',
    colors: {
      background: '#0a0a0a',
      surface: '#151515',
      surfaceHover: '#202020',
      border: '#252525',
      borderHover: '#303030',
      text: {
        primary: '#f5f5f5',
        secondary: '#c0c0c0',
        tertiary: '#666666'
      },
      accent: {
        primary: '#ff0080',
        secondary: '#00d4ff',
        gradient: 'linear-gradient(135deg, #ff0080 0%, #00d4ff 100%)'
      }
    },
    effects: {
      blur: true,
      glow: true,
      animations: true
    }
  },
  cosmic: {
    name: 'cosmic',
    colors: {
      background: '#070014',
      surface: '#0f0824',
      surfaceHover: '#1a0f3a',
      border: '#2a1850',
      borderHover: '#3a2860',
      text: {
        primary: '#e8e6ff',
        secondary: '#b8b5ff',
        tertiary: '#7875aa'
      },
      accent: {
        primary: '#bd00ff',
        secondary: '#00fff0',
        gradient: 'linear-gradient(135deg, #bd00ff 0%, #00fff0 100%)'
      }
    },
    effects: {
      blur: true,
      glow: true,
      animations: true
    }
  },
  quantum: {
    name: 'quantum',
    colors: {
      background: '#000814',
      surface: '#001d3d',
      surfaceHover: '#003566',
      border: '#004080',
      borderHover: '#0050a0',
      text: {
        primary: '#ffffff',
        secondary: '#ffd60a',
        tertiary: '#ffc300'
      },
      accent: {
        primary: '#ffd60a',
        secondary: '#003566',
        gradient: 'linear-gradient(135deg, #ffd60a 0%, #003566 100%)'
      }
    },
    effects: {
      blur: true,
      glow: true,
      animations: true
    }
  }
};

interface ThemeContextValue {
  theme: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Theme Provider Component
export const ThemeProvider: React.FC<{ 
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}> = ({ 
  children, 
  defaultTheme = 'dark',
  storageKey = 'quantum-theme'
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from storage
  useEffect(() => {
    const loadTheme = () => {
      try {
        const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme && savedTheme in themes) {
          setThemeState(savedTheme as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      const themeConfig = themes[theme];

      // Apply CSS variables
      root.style.setProperty('--dashboard-bg', themeConfig.colors.background);
      root.style.setProperty('--dashboard-surface', themeConfig.colors.surface);
      root.style.setProperty('--dashboard-surface-hover', themeConfig.colors.surfaceHover);
      root.style.setProperty('--dashboard-border', themeConfig.colors.border);
      root.style.setProperty('--dashboard-border-hover', themeConfig.colors.borderHover);
      
      // Text colors
      root.style.setProperty('--color-neutral-100', themeConfig.colors.text.primary);
      root.style.setProperty('--color-neutral-400', themeConfig.colors.text.secondary);
      root.style.setProperty('--color-neutral-500', themeConfig.colors.text.tertiary);
      
      // Accent colors
      root.style.setProperty('--color-primary-500', themeConfig.colors.accent.primary);
      root.style.setProperty('--color-secondary-500', themeConfig.colors.accent.secondary);
      
      // Add theme class to body
      document.body.className = `theme-${theme}`;
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    if (!isLoading) {
      applyTheme();
    }
  }, [theme, isLoading]);

  // Set theme with persistence
  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [storageKey]);

  // Toggle through themes
  const toggleTheme = useCallback(() => {
    const themeKeys = Object.keys(themes) as Theme[];
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  }, [theme, setTheme]);

  const value: ThemeContextValue = {
    theme,
    themeConfig: themes[theme],
    setTheme,
    toggleTheme,
    isLoading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Standalone hook for components not wrapped in provider
export const useThemeStandalone = (storageKey = 'quantum-theme') => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTheme = () => {
      try {
        const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme && savedTheme in themes) {
          setThemeState(savedTheme as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();

    // Listen for theme changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue && e.newValue in themes) {
        setThemeState(e.newValue as Theme);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [storageKey]);

  const toggleTheme = useCallback(() => {
    const themeKeys = Object.keys(themes) as Theme[];
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  }, [theme, setTheme]);

  return {
    theme,
    themeConfig: themes[theme],
    setTheme,
    toggleTheme,
    isLoading
  };
};

// Utility functions
export const getThemeColor = (theme: Theme, path: string): string => {
  const config = themes[theme];
  const keys = path.split('.');
  let value: any = config.colors;
  
  for (const key of keys) {
    value = value[key];
    if (!value) return '';
  }
  
  return value;
};

export const applyThemeClass = (theme: Theme, className: string): string => {
  return `${className} theme-${theme}`;
};

// Theme-aware media query hook
export const useThemeMediaQuery = () => {
  const [prefersDark, setPrefersDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersDark;
};

// Theme transition helper
export const useThemeTransition = (duration = 300) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), duration);
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, [duration]);

  return isTransitioning;
};

export default useTheme;