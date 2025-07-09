"use client";

import { useEffect, useRef } from "react";

interface CounterAnimationProps {
  target: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimal?: boolean;
}

export function CounterAnimation({ 
  target, 
  duration = 2000, 
  className = "",
  suffix = "",
  prefix = "",
  decimal = false
}: CounterAnimationProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animateValue = (start: number, end: number) => {
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = start + (end - start) * easeOutQuart;
        const displayValue = decimal ? current.toFixed(1) : Math.floor(current);
        
        if (element) {
          element.textContent = `${prefix}${displayValue}${suffix}`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateValue(0, target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration, suffix, prefix, decimal]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}