import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFCP(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

// Performance monitoring utilities
export const performanceMonitor = {
  // Mark the start of a performance measurement
  mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  },

  // Measure between two marks
  measure(name: string, startMark: string, endMark?: string) {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name)[0];
        if (measure) {
          console.log(`Performance: ${name} took ${measure.duration}ms`);
          return measure.duration;
        }
      } catch (error) {
        console.error('Performance measurement error:', error);
      }
    }
    return null;
  },

  // Clear marks and measures
  clear() {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    }
  },

  // Log all performance entries
  logEntries() {
    if (typeof window !== 'undefined' && window.performance) {
      const entries = window.performance.getEntries();
      console.table(entries.filter(entry => entry.duration > 100));
    }
  }
};

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}