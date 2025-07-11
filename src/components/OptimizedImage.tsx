'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  fill?: boolean;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  fill = false,
  style,
  loading = 'lazy'
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || typeof window === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setHasLoaded(true);
    onLoad?.();
  };

  // Generate blur placeholder if not provided
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Simple blur placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI1IiAvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiBmaWx0ZXI9InVybCgjYmx1cikiIC8+PC9zdmc+';
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        backgroundColor: hasLoaded ? 'transparent' : '#f3f4f6',
        transition: 'background-color 0.3s ease-out'
      }}
    >
      {isInView && (
        <>
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes || '100vw'}
              quality={quality}
              placeholder={placeholder}
              blurDataURL={getBlurDataURL()}
              onLoad={handleLoad}
              loading={loading}
              className={`${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-out`}
              style={{
                objectFit: 'cover',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width || 0}
              height={height || 0}
              sizes={sizes}
              quality={quality}
              placeholder={placeholder}
              blurDataURL={getBlurDataURL()}
              onLoad={handleLoad}
              loading={loading}
              className={`${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-out`}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

// Responsive image with art direction
interface ResponsiveImageProps extends Omit<OptimizedImageProps, 'src'> {
  sources: {
    src: string;
    media?: string;
    width: number;
    height: number;
  }[];
  fallbackSrc: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  sources,
  fallbackSrc,
  alt,
  className,
  ...props
}) => {
  const [currentSource, setCurrentSource] = useState(sources[sources.length - 1]);

  useEffect(() => {
    const handleResize = () => {
      for (const source of sources) {
        if (source.media && window.matchMedia(source.media).matches) {
          setCurrentSource(source);
          break;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sources]);

  return (
    <OptimizedImage
      src={currentSource.src}
      alt={alt}
      width={currentSource.width}
      height={currentSource.height}
      className={className}
      {...props}
    />
  );
};