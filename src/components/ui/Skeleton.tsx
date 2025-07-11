import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  variant?: 'card' | 'text' | 'chart' | 'avatar' | 'button' | 'table';
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  animate?: boolean;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  rounded = 'md',
  className = '',
  animate = true,
  count = 1
}) => {
  const roundedClasses = {
    none: '',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return {
          width: width || '100%',
          height: height || 200,
          className: 'space-y-4 p-4'
        };
      case 'text':
        return {
          width: width || '100%',
          height: height || 20,
          className: ''
        };
      case 'chart':
        return {
          width: width || '100%',
          height: height || 300,
          className: ''
        };
      case 'avatar':
        return {
          width: width || 48,
          height: height || 48,
          className: '',
          rounded: 'full' as const
        };
      case 'button':
        return {
          width: width || 120,
          height: height || 40,
          className: ''
        };
      case 'table':
        return {
          width: width || '100%',
          height: height || 60,
          className: ''
        };
      default:
        return {
          width: width || '100%',
          height: height || 20,
          className: ''
        };
    }
  };

  const variantStyles = getVariantStyles();
  const actualRounded = variantStyles.rounded || rounded;

  const renderSkeleton = () => {
    if (variant === 'card') {
      return (
        <div 
          className={`${roundedClasses[actualRounded]} ${variantStyles.className} ${className}`}
          style={{ width: variantStyles.width, height: variantStyles.height }}
        >
          {/* Card Header */}
          <div className="flex items-center gap-3">
            <SkeletonElement width={40} height={40} rounded="full" animate={animate} />
            <div className="flex-1 space-y-2">
              <SkeletonElement width="40%" height={16} animate={animate} />
              <SkeletonElement width="60%" height={14} animate={animate} />
            </div>
          </div>
          
          {/* Card Body */}
          <div className="space-y-2">
            <SkeletonElement width="100%" height={16} animate={animate} />
            <SkeletonElement width="90%" height={16} animate={animate} />
            <SkeletonElement width="70%" height={16} animate={animate} />
          </div>
          
          {/* Card Footer */}
          <div className="flex gap-2 pt-2">
            <SkeletonElement width={80} height={32} animate={animate} />
            <SkeletonElement width={80} height={32} animate={animate} />
          </div>
        </div>
      );
    }

    if (variant === 'chart') {
      return (
        <div 
          className={`${roundedClasses[actualRounded]} ${className} relative overflow-hidden`}
          style={{ width: variantStyles.width, height: variantStyles.height }}
        >
          <SkeletonElement width="100%" height="100%" animate={animate} />
          
          {/* Fake chart bars */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around p-4 gap-2">
            {[0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-neutral-700/50 rounded-t"
                style={{ height: `${height * 60}%` }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (variant === 'table') {
      return (
        <div className={`space-y-2 ${className}`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3">
              <SkeletonElement width={40} height={40} rounded="full" animate={animate} />
              <div className="flex-1 space-y-2">
                <SkeletonElement width="30%" height={16} animate={animate} />
                <SkeletonElement width="50%" height={14} animate={animate} />
              </div>
              <SkeletonElement width={100} height={32} animate={animate} />
            </div>
          ))}
        </div>
      );
    }

    // Default single skeleton
    return (
      <SkeletonElement
        width={variantStyles.width}
        height={variantStyles.height}
        rounded={actualRounded}
        className={className}
        animate={animate}
      />
    );
  };

  if (count > 1 && variant !== 'table') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <React.Fragment key={i}>{renderSkeleton()}</React.Fragment>
        ))}
      </div>
    );
  }

  return renderSkeleton();
};

// Base skeleton element
const SkeletonElement: React.FC<{
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  animate?: boolean;
}> = ({ width = '100%', height = 20, rounded = 'md', className = '', animate = true }) => {
  const roundedClasses = {
    none: '',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <motion.div
      className={`${roundedClasses[rounded]} ${className} bg-neutral-800`}
      style={{
        width,
        height,
        background: animate 
          ? 'linear-gradient(90deg, #262626 0%, #404040 50%, #262626 100%)'
          : '#262626',
        backgroundSize: '200% 100%'
      }}
      animate={animate ? {
        backgroundPosition: ['200% 0', '-200% 0']
      } : undefined}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

// Preset skeleton components
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton variant="card" className={className} />
);

export const TextSkeleton: React.FC<{ 
  lines?: number; 
  className?: string;
  lastLineWidth?: string;
}> = ({ lines = 3, className, lastLineWidth = '70%' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        variant="text" 
        width={i === lines - 1 ? lastLineWidth : '100%'} 
      />
    ))}
  </div>
);

export const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton variant="chart" className={className} />
);

export const AvatarSkeleton: React.FC<{ 
  size?: number; 
  className?: string 
}> = ({ size = 48, className }) => (
  <Skeleton variant="avatar" width={size} height={size} className={className} />
);

export const ButtonSkeleton: React.FC<{ 
  width?: number; 
  className?: string 
}> = ({ width, className }) => (
  <Skeleton variant="button" width={width} className={className} />
);

export const TableSkeleton: React.FC<{ 
  rows?: number; 
  className?: string 
}> = ({ rows = 5, className }) => (
  <Skeleton variant="table" count={rows} className={className} />
);

// Skeleton group for complex layouts
export const SkeletonGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={`animate-pulse ${className}`}>
    {children}
  </div>
);

export default Skeleton;