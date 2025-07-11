'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface OptimizedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const OptimizedButton = forwardRef<HTMLButtonElement, OptimizedButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    href,
    external = false,
    children,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = 'btn gpu-transition';
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary', 
      outline: 'btn-outline',
      ghost: 'btn-ghost'
    };
    const sizeClasses = {
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const content = (
      <>
        {loading && (
          <span className="btn-spinner" aria-hidden="true">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {leftIcon && !loading && <span className="btn-icon-left">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'auto'
            }}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={classes}
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'auto'
          }}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'auto'
        }}
        {...props}
      >
        {content}
      </button>
    );
  }
);

OptimizedButton.displayName = 'OptimizedButton';

// CSS for the button (add to your global CSS)
const buttonStyles = `
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-radius: 8px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
}

.btn:hover {
  transform: translateY(-2px) translateZ(0);
  will-change: transform;
}

.btn:active {
  transform: translateY(0) translateZ(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateZ(0);
}

.btn-icon-left,
.btn-icon-right {
  display: inline-flex;
  align-items: center;
  transform: translateZ(0);
}

/* Size variants */
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 36px;
}

.btn-md {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 44px;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
  min-height: 52px;
}

/* GPU optimized transitions */
.gpu-transition {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
  backface-visibility: hidden;
}

@media (hover: none) and (pointer: coarse) {
  .btn:hover {
    transform: none;
  }
  
  .btn:active {
    transform: scale(0.98) translateZ(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
  
  .btn:hover {
    transform: none;
  }
}
`;