import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuantumLoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'quantum' | 'dna' | 'orbit' | 'bars';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gradient';
  text?: string;
  overlay?: boolean;
  blur?: boolean;
}

const QuantumLoader: React.FC<QuantumLoaderProps> = ({
  variant = 'quantum',
  size = 'md',
  color = 'primary',
  text,
  overlay = false,
  blur = false
}) => {
  const sizes = {
    sm: 24,
    md: 48,
    lg: 64,
    xl: 96
  };

  const colors = {
    primary: '#ec4899',
    white: '#ffffff',
    gradient: 'url(#gradient)'
  };

  const currentSize = sizes[size];
  const currentColor = colors[color];

  const LoaderContent = () => {
    switch (variant) {
      case 'spinner':
        return (
          <motion.svg
            width={currentSize}
            height={currentSize}
            viewBox="0 0 50 50"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={currentColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
              transform="rotate(-90 25 25)"
            />
          </motion.svg>
        );

      case 'dots':
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: currentSize / 4,
                  height: currentSize / 4,
                  backgroundColor: color === 'gradient' ? '#ec4899' : currentColor
                }}
                animate={{
                  y: [-10, 0, -10],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className="relative" style={{ width: currentSize, height: currentSize }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: color === 'gradient' ? '#ec4899' : currentColor,
                  opacity: 0.3
                }}
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: color === 'gradient' ? '#ec4899' : currentColor,
                transform: 'scale(0.5)'
              }}
            />
          </div>
        );

      case 'quantum':
        return (
          <motion.div
            className="relative"
            style={{ width: currentSize, height: currentSize }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <svg width={currentSize} height={currentSize} viewBox="0 0 100 100">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              
              {/* Outer ring */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={currentColor}
                strokeWidth="2"
                strokeDasharray="70 30"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle ring */}
              <motion.circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke={currentColor}
                strokeWidth="3"
                strokeDasharray="50 50"
                opacity="0.7"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner ring */}
              <motion.circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke={currentColor}
                strokeWidth="4"
                strokeDasharray="30 70"
                opacity="0.5"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center dot */}
              <motion.circle
                cx="50"
                cy="50"
                r="8"
                fill={currentColor}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        );

      case 'dna':
        return (
          <svg width={currentSize} height={currentSize} viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            
            {[0, 1].map((strand) => (
              <motion.path
                key={strand}
                d={`M 25 10 Q 50 30 75 10 T 75 50 T 75 90`}
                fill="none"
                stroke={currentColor}
                strokeWidth="3"
                opacity={strand === 0 ? 1 : 0.5}
                animate={{
                  d: [
                    `M 25 10 Q 50 30 75 10 T 75 50 T 75 90`,
                    `M 25 10 Q 50 -10 75 10 T 75 50 T 75 90`,
                    `M 25 10 Q 50 30 75 10 T 75 50 T 75 90`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: strand * 0.5
                }}
              />
            ))}
            
            {/* Connection dots */}
            {[20, 35, 50, 65, 80].map((y, i) => (
              <motion.circle
                key={i}
                cx="50"
                cy={y}
                r="3"
                fill={currentColor}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </svg>
        );

      case 'orbit':
        return (
          <div className="relative" style={{ width: currentSize, height: currentSize }}>
            {/* Center planet */}
            <div
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: currentSize / 3,
                height: currentSize / 3,
                backgroundColor: color === 'gradient' ? '#ec4899' : currentColor,
                transform: 'translate(-50%, -50%)'
              }}
            />
            
            {/* Orbiting elements */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: currentSize,
                  height: currentSize,
                  top: 0,
                  left: 0
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.66
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: currentSize / 8,
                    height: currentSize / 8,
                    backgroundColor: color === 'gradient' ? '#8b5cf6' : currentColor,
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: 0.8
                  }}
                />
              </motion.div>
            ))}
          </div>
        );

      case 'bars':
        return (
          <div className="flex items-end gap-1" style={{ height: currentSize }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: currentSize / 8,
                  backgroundColor: color === 'gradient' ? '#ec4899' : currentColor
                }}
                animate={{
                  height: [
                    `${currentSize * 0.3}px`,
                    `${currentSize * 0.8}px`,
                    `${currentSize * 0.3}px`
                  ]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const loader = (
    <div className="flex flex-col items-center gap-4">
      <LoaderContent />
      {text && (
        <motion.p
          className="text-sm font-medium"
          style={{ color: color === 'white' ? '#ffffff' : '#e5e5e5' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <AnimatePresence>
        <motion.div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/50 ${blur ? 'backdrop-blur-sm' : ''}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {loader}
        </motion.div>
      </AnimatePresence>
    );
  }

  return loader;
};

// Skeleton loader for content placeholders
export const QuantumSkeleton: React.FC<{
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}> = ({ width = '100%', height = 20, rounded = 'md', className = '' }) => {
  const roundedClasses = {
    none: '',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <motion.div
      className={`${roundedClasses[rounded]} ${className}`}
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, #262626 0%, #404040 50%, #262626 100%)',
        backgroundSize: '200% 100%'
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0']
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

// Progress loader
export const QuantumProgress: React.FC<{
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  animated?: boolean;
}> = ({ value, max = 100, size = 'md', showValue = true, animated = true }) => {
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      <div className={`w-full bg-neutral-800 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0, ease: "easeOut" }}
        >
          {animated && (
            <motion.div
              className="h-full w-full bg-white/20"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </motion.div>
      </div>
      {showValue && (
        <div className="mt-2 text-sm text-neutral-400 text-right">
          {value} / {max}
        </div>
      )}
    </div>
  );
};

export default QuantumLoader;