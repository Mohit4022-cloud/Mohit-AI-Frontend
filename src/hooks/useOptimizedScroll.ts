import { useEffect, useRef, useCallback } from 'react';
import { throttle, isMobileDevice, prefersReducedMotion } from '@/lib/performance-utils';

interface ScrollOptions {
  threshold?: number | number[];
  rootMargin?: string;
  enableParallax?: boolean;
  onScroll?: (scrollY: number) => void;
}

export function useOptimizedScroll(options: ScrollOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    enableParallax = true,
    onScroll
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const parallaxRafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Optimized parallax handler
  const updateParallax = useCallback(() => {
    if (!enableParallax || prefersReducedMotion() || isMobileDevice()) return;

    const scrollY = window.scrollY;
    const elements = document.querySelectorAll('.parallax-element');

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const speed = parseFloat(
        getComputedStyle(element).getPropertyValue('--parallax-speed') || '0.5'
      );

      // Only update elements in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = -(scrollY * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px) translateZ(0)`;
      }
    });

    ticking.current = false;
  }, [enableParallax]);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;

    if (onScroll) {
      onScroll(lastScrollY.current);
    }

    if (!ticking.current && enableParallax) {
      parallaxRafRef.current = requestAnimationFrame(updateParallax);
      ticking.current = true;
    }
  }, [enableParallax, updateParallax, onScroll]);

  const throttledScroll = useRef(throttle(handleScroll, 16)); // 60fps

  // Setup Intersection Observer for reveal animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create observer for reveal animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class with requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
              entry.target.classList.add('visible');
              
              // Set will-change before animation
              (entry.target as HTMLElement).style.willChange = 'transform, opacity';
              
              // Remove will-change after animation completes
              setTimeout(() => {
                (entry.target as HTMLElement).style.willChange = 'auto';
              }, 800);
            });

            // Unobserve after revealing
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll(
      '.observe-element, .observe-fade, .observe-scale, ' +
      '.observe-slide-left, .observe-slide-right, .observe-rotate, .observe-stagger'
    );

    revealElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    // Add optimized scroll listener
    if (enableParallax || onScroll) {
      window.addEventListener('scroll', throttledScroll.current, { passive: true });
      
      // Initial parallax update
      if (enableParallax) {
        updateParallax();
      }
    }

    return () => {
      // Cleanup
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (parallaxRafRef.current) {
        cancelAnimationFrame(parallaxRafRef.current);
      }

      window.removeEventListener('scroll', throttledScroll.current);
    };
  }, [threshold, rootMargin, enableParallax, updateParallax, onScroll]);

  // Return scroll position for components that need it
  return {
    scrollY: lastScrollY.current,
    observeElement: (element: HTMLElement) => {
      if (observerRef.current && element) {
        observerRef.current.observe(element);
      }
    },
    unobserveElement: (element: HTMLElement) => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    }
  };
}

// Hook for lazy loading images
export function useLazyImages() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // Load image
            if (img.dataset.src) {
              const tempImg = new Image();
              tempImg.onload = () => {
                requestAnimationFrame(() => {
                  img.src = img.dataset.src!;
                  img.classList.add('loaded');
                  img.removeAttribute('data-src');
                });
              };
              tempImg.src = img.dataset.src;
            }

            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );

    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, []);
}

// Hook for scroll progress indicator
export function useScrollProgress() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateProgress = () => {
      if (!progressRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);

      requestAnimationFrame(() => {
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress}) translateZ(0)`;
        }
      });
    };

    const throttledUpdate = throttle(updateProgress, 16);
    
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateProgress(); // Initial update

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
    };
  }, []);

  return progressRef;
}