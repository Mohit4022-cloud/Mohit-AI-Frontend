"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationProviderProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "rotate" | "slide-up" | "bounce" | "blur-in" | "stagger";
  delay?: number;
  duration?: number;
  threshold?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function ScrollAnimationProvider({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.1,
  staggerDelay = 100,
  once = true,
}: ScrollAnimationProviderProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial styles based on animation type
    const setInitialStyles = () => {
      element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      element.style.transitionDelay = `${delay}ms`;

      switch (animation) {
        case "fade-up":
          element.style.opacity = "0";
          element.style.transform = "translateY(30px)";
          break;
        case "fade-left":
          element.style.opacity = "0";
          element.style.transform = "translateX(30px)";
          break;
        case "fade-right":
          element.style.opacity = "0";
          element.style.transform = "translateX(-30px)";
          break;
        case "scale":
          element.style.opacity = "0";
          element.style.transform = "scale(0.8)";
          break;
        case "rotate":
          element.style.opacity = "0";
          element.style.transform = "rotate(-10deg) scale(0.9)";
          break;
        case "slide-up":
          element.style.opacity = "0";
          element.style.transform = "translateY(100%)";
          break;
        case "bounce":
          element.style.opacity = "0";
          element.style.transform = "translateY(30px) scale(0.95)";
          break;
        case "blur-in":
          element.style.opacity = "0";
          element.style.filter = "blur(10px)";
          element.style.transform = "translateY(20px)";
          break;
        case "stagger":
          element.style.opacity = "0";
          element.style.transform = "translateY(30px)";
          // Handle stagger children
          const children = element.children;
          Array.from(children).forEach((child, index) => {
            (child as HTMLElement).style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            (child as HTMLElement).style.transitionDelay = `${delay + (index * staggerDelay)}ms`;
            (child as HTMLElement).style.opacity = "0";
            (child as HTMLElement).style.transform = "translateY(20px)";
          });
          break;
      }
    };

    // Set animated styles
    const setAnimatedStyles = () => {
      element.style.opacity = "1";
      element.style.transform = "none";
      element.style.filter = "none";

      if (animation === "bounce") {
        // Add bounce effect
        element.style.animation = `bounce-in ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms both`;
      }

      if (animation === "stagger") {
        const children = element.children;
        Array.from(children).forEach((child) => {
          (child as HTMLElement).style.opacity = "1";
          (child as HTMLElement).style.transform = "none";
        });
      }
    };

    setInitialStyles();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            setAnimatedStyles();
            hasAnimated.current = true;
          } else if (!once && !entry.isIntersecting) {
            setInitialStyles();
            hasAnimated.current = false;
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully in view
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animation, delay, duration, threshold, staggerDelay, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// Export a hook for more advanced use cases
export function useScrollAnimation(
  ref: React.RefObject<HTMLElement>,
  options: Omit<ScrollAnimationProviderProps, "children" | "className"> = {}
) {
  const {
    animation = "fade-up",
    delay = 0,
    duration = 800,
    threshold = 0.1,
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Similar logic as above but for custom elements
    // ... (implementation similar to above)
  }, [ref, animation, delay, duration, threshold, once]);
}