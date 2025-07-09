"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add stagger animation to all direct children
          const children = section.querySelectorAll(':scope > *');
          children.forEach((child, index) => {
            (child as HTMLElement).style.opacity = '0';
            (child as HTMLElement).style.transform = 'translateY(30px)';
            (child as HTMLElement).style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            (child as HTMLElement).style.transitionDelay = `${index * 100}ms`;
            
            setTimeout(() => {
              (child as HTMLElement).style.opacity = '1';
              (child as HTMLElement).style.transform = 'translateY(0)';
            }, 50);
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
}