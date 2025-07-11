"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useBreakpoint, useDeviceType, ResponsiveValue, getResponsiveValue } from '@/utils/responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: ResponsiveValue<string>;
  margin?: ResponsiveValue<string>;
  display?: ResponsiveValue<'block' | 'flex' | 'grid' | 'none'>;
  gap?: ResponsiveValue<string>;
  columns?: ResponsiveValue<number>;
  direction?: ResponsiveValue<'row' | 'column'>;
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>;
  justify?: ResponsiveValue<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  padding,
  margin,
  display = 'block',
  gap,
  columns,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
}) => {
  const breakpoint = useBreakpoint();
  
  // Get responsive values
  const currentPadding = padding ? getResponsiveValue(padding, breakpoint) : undefined;
  const currentMargin = margin ? getResponsiveValue(margin, breakpoint) : undefined;
  const currentDisplay = getResponsiveValue(display, breakpoint);
  const currentGap = gap ? getResponsiveValue(gap, breakpoint) : undefined;
  const currentColumns = columns ? getResponsiveValue(columns, breakpoint) : undefined;
  const currentDirection = getResponsiveValue(direction, breakpoint);
  const currentAlign = getResponsiveValue(align, breakpoint);
  const currentJustify = getResponsiveValue(justify, breakpoint);

  const justifyMap = {
    'start': 'flex-start',
    'center': 'center',
    'end': 'flex-end',
    'between': 'space-between',
    'around': 'space-around',
    'evenly': 'space-evenly',
  };

  const alignMap = {
    'start': 'flex-start',
    'center': 'center',
    'end': 'flex-end',
    'stretch': 'stretch',
  };

  const style: React.CSSProperties = {
    padding: currentPadding,
    margin: currentMargin,
    display: currentDisplay,
    gap: currentGap,
    ...(currentDisplay === 'grid' && currentColumns && {
      gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
    }),
    ...(currentDisplay === 'flex' && {
      flexDirection: currentDirection,
      alignItems: alignMap[currentAlign],
      justifyContent: justifyMap[currentJustify],
    }),
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: ResponsiveValue<number>;
  gap?: ResponsiveValue<string>;
  padding?: ResponsiveValue<string>;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = { xs: '1rem', md: '1.5rem', lg: '2rem' },
  padding = { xs: '1rem', md: '2rem' },
}) => {
  const breakpoint = useBreakpoint();
  const currentCols = getResponsiveValue(cols, breakpoint);
  const currentGap = getResponsiveValue(gap, breakpoint);
  const currentPadding = getResponsiveValue(padding, breakpoint);

  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${currentCols}, 1fr)`,
        gap: currentGap,
        padding: currentPadding,
      }}
    >
      {children}
    </div>
  );
};

// Responsive Stack Component
interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  direction?: ResponsiveValue<'horizontal' | 'vertical'>;
  gap?: ResponsiveValue<string>;
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>;
  wrap?: ResponsiveValue<boolean>;
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({
  children,
  className = '',
  direction = { xs: 'vertical', md: 'horizontal' },
  gap = { xs: '1rem', md: '1.5rem' },
  align = 'stretch',
  wrap = false,
}) => {
  const breakpoint = useBreakpoint();
  const currentDirection = getResponsiveValue(direction, breakpoint);
  const currentGap = getResponsiveValue(gap, breakpoint);
  const currentAlign = getResponsiveValue(align, breakpoint);
  const currentWrap = getResponsiveValue(wrap, breakpoint);

  const alignMap = {
    'start': 'flex-start',
    'center': 'center',
    'end': 'flex-end',
    'stretch': 'stretch',
  };

  return (
    <div
      className={`flex ${className}`}
      style={{
        flexDirection: currentDirection === 'horizontal' ? 'row' : 'column',
        gap: currentGap,
        alignItems: alignMap[currentAlign],
        flexWrap: currentWrap ? 'wrap' : 'nowrap',
      }}
    >
      {children}
    </div>
  );
};

// Device-specific rendering component
interface DeviceRenderProps {
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  fallback?: React.ReactNode;
}

export const DeviceRender: React.FC<DeviceRenderProps> = ({
  mobile,
  tablet,
  desktop,
  fallback = null,
}) => {
  const deviceType = useDeviceType();

  switch (deviceType) {
    case 'mobile':
      return <>{mobile || fallback}</>;
    case 'tablet':
      return <>{tablet || fallback}</>;
    case 'desktop':
      return <>{desktop || fallback}</>;
    default:
      return <>{fallback}</>;
  }
};

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: ResponsiveValue<'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'>;
  weight?: ResponsiveValue<'light' | 'normal' | 'medium' | 'semibold' | 'bold'>;
  align?: ResponsiveValue<'left' | 'center' | 'right' | 'justify'>;
  color?: ResponsiveValue<string>;
  as?: keyof JSX.IntrinsicElements;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  className = '',
  size = 'base',
  weight = 'normal',
  align = 'left',
  color,
  as: Component = 'p',
}) => {
  const breakpoint = useBreakpoint();
  const currentSize = getResponsiveValue(size, breakpoint);
  const currentWeight = getResponsiveValue(weight, breakpoint);
  const currentAlign = getResponsiveValue(align, breakpoint);
  const currentColor = color ? getResponsiveValue(color, breakpoint) : undefined;

  const sizeClasses = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  };

  const weightClasses = {
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
  };

  const alignClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
    'justify': 'text-justify',
  };

  return (
    <Component
      className={`${sizeClasses[currentSize]} ${weightClasses[currentWeight]} ${alignClasses[currentAlign]} ${className}`}
      style={{ color: currentColor }}
    >
      {children}
    </Component>
  );
};

// Responsive Spacer Component
interface ResponsiveSpacerProps {
  size?: ResponsiveValue<string | number>;
  direction?: 'horizontal' | 'vertical' | 'both';
}

export const ResponsiveSpacer: React.FC<ResponsiveSpacerProps> = ({
  size = { xs: '1rem', md: '2rem', lg: '3rem' },
  direction = 'vertical',
}) => {
  const breakpoint = useBreakpoint();
  const currentSize = getResponsiveValue(size, breakpoint);

  const style: React.CSSProperties = {
    ...(direction === 'horizontal' || direction === 'both' ? { width: currentSize } : {}),
    ...(direction === 'vertical' || direction === 'both' ? { height: currentSize } : {}),
  };

  return <div style={style} />;
};