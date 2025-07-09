"use client";

import { useEffect, useState } from "react";

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
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simple timer-based animation that starts immediately
    const startTime = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = target * easeOutQuart;
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [target, duration]);

  // Show target immediately on server, animate on client
  const displayValue = mounted 
    ? (decimal ? count.toFixed(1) : Math.floor(count))
    : (decimal ? target.toFixed(1) : Math.floor(target));

  return (
    <span className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}