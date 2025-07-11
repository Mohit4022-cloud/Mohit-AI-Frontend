import { useEffect, useState } from 'react';

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
} as const;

// Hook to detect current breakpoint
export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return currentBreakpoint;
};

// Hook to check if current viewport matches a breakpoint
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// Hook to check if viewport is at least a certain breakpoint
export const useMinBreakpoint = (breakpoint: Breakpoint): boolean => {
  return useMediaQuery(mediaQueries[breakpoint]);
};

// Responsive value helper
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export const getResponsiveValue = <T,>(
  value: ResponsiveValue<T>,
  currentBreakpoint: Breakpoint
): T => {
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  const breakpointValues = value as Partial<Record<Breakpoint, T>>;
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  // Find the value for current breakpoint or fall back to smaller ones
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (bp in breakpointValues) {
      return breakpointValues[bp]!;
    }
  }

  // If no value found, return the first available value
  const firstValue = Object.values(breakpointValues)[0];
  return firstValue as T;
};

// Responsive styles helper
export const responsiveStyles = <T extends Record<string, any>>(
  styles: Partial<Record<Breakpoint, T>>
): string => {
  let cssString = '';

  Object.entries(styles).forEach(([breakpoint, style]) => {
    if (breakpoint === 'xs') {
      // Base styles (no media query needed)
      Object.entries(style).forEach(([prop, value]) => {
        cssString += `${prop}: ${value}; `;
      });
    } else {
      // Media query wrapped styles
      cssString += `@media ${mediaQueries[breakpoint as Breakpoint]} { `;
      Object.entries(style).forEach(([prop, value]) => {
        cssString += `${prop}: ${value}; `;
      });
      cssString += '} ';
    }
  });

  return cssString;
};

// Responsive class names helper
export const responsiveClasses = (
  classes: Partial<Record<Breakpoint, string>>
): string => {
  return Object.entries(classes)
    .map(([breakpoint, className]) => {
      if (breakpoint === 'xs') {
        return className;
      }
      return `${breakpoint}:${className}`;
    })
    .join(' ');
};

// Device type detection
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceType = (): DeviceType => {
  const breakpoint = useBreakpoint();
  
  if (breakpoint === 'xs' || breakpoint === 'sm') {
    return 'mobile';
  } else if (breakpoint === 'md' || breakpoint === 'lg') {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Orientation detection
export type Orientation = 'portrait' | 'landscape';

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return orientation;
};

// Touch device detection
export const useIsTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  return isTouchDevice;
};

// Viewport dimensions
export interface ViewportDimensions {
  width: number;
  height: number;
  vw: number;
  vh: number;
}

export const useViewport = (): ViewportDimensions => {
  const [dimensions, setDimensions] = useState<ViewportDimensions>({
    width: 0,
    height: 0,
    vw: 0,
    vh: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        vw: window.innerWidth / 100,
        vh: window.innerHeight / 100,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
};