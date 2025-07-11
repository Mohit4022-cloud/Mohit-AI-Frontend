// utils/animations.ts
import { Variants } from 'framer-motion';

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Scale animations
export const scaleVariants: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  }
};

// Slide animations
export const slideInLeft: Variants = {
  initial: {
    x: -100,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const slideInRight: Variants = {
  initial: {
    x: 100,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1]
  }
};

export const hoverGlow = {
  boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
  transition: {
    duration: 0.3
  }
};

// Tap animations
export const tapScale = {
  scale: 0.95,
  transition: {
    duration: 0.1
  }
};

// Floating animation
export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Pulse animation
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Gradient animation helper
export const createGradientAnimation = (colors: string[]) => ({
  background: colors,
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "linear"
  }
});

// Custom spring configs
export const springConfig = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  bouncy: { type: "spring", stiffness: 300, damping: 10 },
  stiff: { type: "spring", stiffness: 400, damping: 20 },
  slow: { type: "spring", stiffness: 80, damping: 20 }
};

// Scroll reveal animation
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Number counter animation
export const animateNumber = (
  start: number,
  end: number,
  duration: number = 2,
  onUpdate: (value: number) => void
) => {
  const startTime = Date.now();
  const endTime = startTime + duration * 1000;
  
  const tick = () => {
    const now = Date.now();
    const progress = Math.min((now - startTime) / (duration * 1000), 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = start + (end - start) * easeOutQuart;
    
    onUpdate(Math.round(currentValue));
    
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };
  
  tick();
};

// Ripple effect creator
export const createRipple = (
  event: React.MouseEvent<HTMLElement>,
  color: string = 'rgba(255, 255, 255, 0.5)'
) => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;
  
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - rect.left - radius}px`;
  ripple.style.top = `${event.clientY - rect.top - radius}px`;
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = color;
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple 600ms ease-out';
  ripple.style.pointerEvents = 'none';
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
};

// Parallax scroll effect
export const useParallaxScroll = (speed: number = 0.5) => {
  return {
    y: ['0%', `${speed * 100}%`],
    transition: {
      ease: "linear"
    }
  };
};

// Typewriter effect
export const typewriterVariants = (text: string) => ({
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: text.length * 0.05,
      ease: "linear"
    }
  }
});

// 3D card tilt effect
export const calculate3DTransform = (
  e: React.MouseEvent<HTMLElement>,
  intensity: number = 10
) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * intensity;
  const rotateY = ((centerX - x) / centerX) * intensity;
  
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transition: 'transform 0.1s ease-out'
  };
};

// Reset 3D transform
export const reset3DTransform = () => ({
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  transition: 'transform 0.3s ease-out'
});

// Quantum-specific animations
export const quantumGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(236, 72, 153, 0)'
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(236, 72, 153, 0.3)',
      '0 0 40px rgba(236, 72, 153, 0.5)',
      '0 0 20px rgba(236, 72, 153, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Morph animation
export const morphVariants: Variants = {
  initial: {
    borderRadius: '0.75rem'
  },
  hover: {
    borderRadius: '1.5rem',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Shimmer effect
export const shimmerEffect = {
  backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 2s infinite',
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' }
  }
};

// Bounce animation
export const bounceAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 0.6,
    times: [0, 0.5, 1],
    ease: [0.68, -0.55, 0.265, 1.55]
  }
};

// Shake animation
export const shakeAnimation = {
  x: [-10, 10, -10, 10, 0],
  transition: {
    duration: 0.5,
    ease: "easeInOut"
  }
};

// Fade in up animation
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Zoom animations
export const zoomIn: Variants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  }
};

export const zoomOut: Variants = {
  initial: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    }
  }
};

// Rotate animations
export const rotateIn: Variants = {
  initial: {
    rotate: -180,
    opacity: 0
  },
  animate: {
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Blur animations
export const blurIn: Variants = {
  initial: {
    filter: 'blur(10px)',
    opacity: 0
  },
  animate: {
    filter: 'blur(0px)',
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

// List animations
export const listContainer: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const listItem: Variants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Drawer animations
export const drawerSlideIn: Variants = {
  initial: {
    x: '100%'
  },
  animate: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.2
    }
  }
};

// Modal animations
export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

// Backdrop animation
export const backdropVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Progress bar animation
export const progressBarAnimation = (progress: number) => ({
  width: `${progress}%`,
  transition: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1]
  }
});

// Text reveal animation
export const textReveal: Variants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Glow pulse for buttons and interactive elements
export const glowPulse = {
  boxShadow: [
    '0 0 20px rgba(236, 72, 153, 0.3)',
    '0 0 40px rgba(236, 72, 153, 0.6)',
    '0 0 20px rgba(236, 72, 153, 0.3)'
  ],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Export all animations as a single object for convenience
export const animations = {
  page: pageVariants,
  stagger: { container: staggerContainer, item: staggerItem },
  scale: scaleVariants,
  slide: { left: slideInLeft, right: slideInRight },
  hover: { scale: hoverScale, glow: hoverGlow },
  tap: { scale: tapScale },
  float: floatingAnimation,
  pulse: pulseAnimation,
  quantum: { glow: quantumGlow },
  morph: morphVariants,
  bounce: bounceAnimation,
  shake: shakeAnimation,
  fade: { up: fadeInUp },
  zoom: { in: zoomIn, out: zoomOut },
  rotate: { in: rotateIn },
  blur: { in: blurIn },
  list: { container: listContainer, item: listItem },
  drawer: drawerSlideIn,
  modal: modalVariants,
  backdrop: backdropVariants,
  text: { reveal: textReveal },
  scroll: { reveal: scrollReveal },
  spring: springConfig
};