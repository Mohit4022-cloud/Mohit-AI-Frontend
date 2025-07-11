/**
 * Performance optimization utilities for animations and interactions
 * These utilities help ensure smooth 60fps performance on all devices
 */

/**
 * Throttle function execution to improve performance
 * @param func Function to throttle
 * @param limit Time limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
    return lastResult;
  };
}

/**
 * Debounce function execution
 * @param func Function to debounce
 * @param delay Delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
}

/**
 * Create an optimized animation frame handler
 * Automatically handles cleanup and performance optimization
 */
export function createAnimationLoop(
  callback: (timestamp: number) => void,
  fps: number = 60
): { start: () => void; stop: () => void } {
  let animationId: number | null = null;
  let lastTimestamp = 0;
  const frameDuration = 1000 / fps;
  let isRunning = false;

  const animate = (timestamp: number) => {
    if (!isRunning) return;

    const deltaTime = timestamp - lastTimestamp;

    if (deltaTime >= frameDuration) {
      callback(timestamp);
      lastTimestamp = timestamp - (deltaTime % frameDuration);
    }

    animationId = requestAnimationFrame(animate);
  };

  return {
    start: () => {
      if (!isRunning) {
        isRunning = true;
        lastTimestamp = performance.now();
        animationId = requestAnimationFrame(animate);
      }
    },
    stop: () => {
      isRunning = false;
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  };
}

/**
 * Optimize scroll events with passive listeners and throttling
 */
export function addOptimizedScrollListener(
  callback: (event: Event) => void,
  throttleMs: number = 16
): () => void {
  const throttledCallback = throttle(callback, throttleMs);
  
  window.addEventListener('scroll', throttledCallback, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', throttledCallback);
  };
}

/**
 * Create an Intersection Observer for lazy loading and scroll animations
 */
export function createLazyObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.01,
    ...options
  });
}

/**
 * Batch DOM updates to prevent layout thrashing
 */
export class DOMBatcher {
  private reads: (() => void)[] = [];
  private writes: (() => void)[] = [];
  private scheduled = false;

  read(fn: () => void) {
    this.reads.push(fn);
    this.schedule();
  }

  write(fn: () => void) {
    this.writes.push(fn);
    this.schedule();
  }

  private schedule() {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => {
        this.flush();
      });
    }
  }

  private flush() {
    const reads = this.reads.slice();
    const writes = this.writes.slice();

    this.reads.length = 0;
    this.writes.length = 0;
    this.scheduled = false;

    // Execute all reads first
    reads.forEach(fn => fn());
    // Then execute all writes
    writes.forEach(fn => fn());
  }
}

/**
 * GPU-accelerated transform helper
 */
export function gpuAcceleratedStyle(
  transform: string = '',
  opacity: number = 1
): React.CSSProperties {
  return {
    transform: transform || 'translateZ(0)',
    opacity,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Performance monitor for development
 */
export class PerformanceMonitor {
  private frameTimes: number[] = [];
  private lastTime = performance.now();
  
  startMonitoring() {
    const monitor = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - this.lastTime;
      this.lastTime = currentTime;
      
      this.frameTimes.push(frameTime);
      if (this.frameTimes.length > 60) {
        this.frameTimes.shift();
      }
      
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  }
  
  getFPS(): number {
    if (this.frameTimes.length === 0) return 60;
    const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    return Math.round(1000 / avgFrameTime);
  }
}