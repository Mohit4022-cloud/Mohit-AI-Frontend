import React, { lazy, Suspense, ComponentType } from 'react';
import { QuantumSkeleton } from '@/components/UI/QuantumLoader';
import ErrorBoundary from '@/components/ErrorBoundary';

// Utility to create lazy loaded components with loading and error states
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
  errorFallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <ErrorBoundary fallback={errorFallback} isolate>
      <Suspense fallback={fallback || <ComponentSkeleton />}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Skeleton loaders for different component types
const ComponentSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4 p-4">
    <QuantumSkeleton height={40} rounded="lg" />
    <QuantumSkeleton height={100} rounded="lg" />
  </div>
);

const MetricCardSkeleton: React.FC = () => (
  <div className="bg-neutral-800 rounded-lg p-4 space-y-3">
    <div className="flex items-center justify-between">
      <QuantumSkeleton width={40} height={40} rounded="lg" />
      <QuantumSkeleton width={20} height={20} rounded="full" />
    </div>
    <QuantumSkeleton width="60%" height={32} />
    <QuantumSkeleton width="40%" height={16} />
    <QuantumSkeleton width="80%" height={20} />
  </div>
);

const ChartSkeleton: React.FC = () => (
  <div className="bg-neutral-800 rounded-lg p-6">
    <div className="mb-4">
      <QuantumSkeleton width="30%" height={24} className="mb-2" />
      <QuantumSkeleton width="20%" height={16} />
    </div>
    <QuantumSkeleton height={300} rounded="md" />
  </div>
);

const TableSkeleton: React.FC = () => (
  <div className="bg-neutral-800 rounded-lg p-4">
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <QuantumSkeleton width={48} height={48} rounded="full" />
          <div className="flex-1 space-y-2">
            <QuantumSkeleton width="40%" height={16} />
            <QuantumSkeleton width="60%" height={14} />
          </div>
          <QuantumSkeleton width={80} height={32} rounded="md" />
        </div>
      ))}
    </div>
  </div>
);

// Lazy loaded dashboard components with appropriate skeletons
export const LazyMetricsGrid = createLazyComponent(
  () => import('./MetricsGrid'),
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <MetricCardSkeleton key={i} />
    ))}
  </div>
);

export const LazyChartSection = createLazyComponent(
  () => import('./ChartSection'),
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <ChartSkeleton />
    <ChartSkeleton />
  </div>
);

export const LazyActiveLeadsTable = createLazyComponent(
  () => import('./ActiveLeadsTable'),
  <TableSkeleton />
);

// Progressive enhancement wrapper
export const ProgressiveLoad: React.FC<{
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
}> = ({ children, delay = 0, threshold = 0.1 }) => {
  const [shouldLoad, setShouldLoad] = React.useState(delay === 0);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShouldLoad(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  React.useEffect(() => {
    if (!shouldLoad && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoad(true);
          }
        },
        { threshold }
      );

      observer.observe(elementRef.current);

      return () => observer.disconnect();
    }
  }, [shouldLoad, threshold]);

  if (!shouldLoad) {
    return <div ref={elementRef} style={{ minHeight: '200px' }} />;
  }

  return <>{children}</>;
};

// Resource hint components
export const PreloadComponent: React.FC<{
  component: () => Promise<any>;
}> = ({ component }) => {
  React.useEffect(() => {
    // Preload the component
    component();
  }, [component]);

  return null;
};

// Optimized image loader
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}> = ({ src, alt, className, placeholder }) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder || '');
  const [isLoading, setIsLoading] = React.useState(true);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
          };
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse rounded-lg" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
};

// Code splitting boundary
export const CodeSplitBoundary: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => {
  return (
    <ErrorBoundary isolate>
      <Suspense fallback={fallback || <ComponentSkeleton />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};