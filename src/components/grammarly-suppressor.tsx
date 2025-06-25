"use client";

import { useEffect } from "react";

export function GrammarlySuppressor() {
  useEffect(() => {
    // Suppress Grammarly attributes
    if (typeof window !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const target = mutation.target as HTMLElement;
            if (target.hasAttribute('data-new-gr-c-s-check-loaded')) {
              target.removeAttribute('data-new-gr-c-s-check-loaded');
            }
            if (target.hasAttribute('data-gr-ext-installed')) {
              target.removeAttribute('data-gr-ext-installed');
            }
          }
        });
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed']
      });
      
      // Also check body element
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed']
      });
      
      return () => observer.disconnect();
    }
  }, []);
  
  return null;
}