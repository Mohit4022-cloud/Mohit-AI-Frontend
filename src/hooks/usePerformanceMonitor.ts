import { useEffect, useRef, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  loadTime: number;
  renderTime: number;
  networkLatency: number;
  domNodes: number;
  jsHeapSize: number;
}

interface PerformanceThresholds {
  fps?: number;
  memory?: number;
  loadTime?: number;
  renderTime?: number;
  domNodes?: number;
}

export const usePerformanceMonitor = (
  thresholds: PerformanceThresholds = {
    fps: 30,
    memory: 90,
    loadTime: 3000,
    renderTime: 16,
    domNodes: 1500
  }
) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: { used: 0, total: 0, percentage: 0 },
    loadTime: 0,
    renderTime: 0,
    networkLatency: 0,
    domNodes: 0,
    jsHeapSize: 0
  });

  const [warnings, setWarnings] = useState<string[]>([]);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>();

  // FPS Monitor
  const measureFPS = useCallback(() => {
    frameCount.current++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime.current + 1000) {
      const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      frameCount.current = 0;
      lastTime.current = currentTime;
      
      setMetrics(prev => ({ ...prev, fps }));
      
      if (fps < thresholds.fps!) {
        setWarnings(prev => [...prev, `Low FPS detected: ${fps}`]);
      }
    }
    
    rafId.current = requestAnimationFrame(measureFPS);
  }, [thresholds.fps]);

  // Memory Monitor
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const used = memory.usedJSHeapSize;
      const total = memory.totalJSHeapSize;
      const percentage = Math.round((used / total) * 100);
      
      setMetrics(prev => ({
        ...prev,
        memory: { used, total, percentage },
        jsHeapSize: used
      }));
      
      if (percentage > thresholds.memory!) {
        setWarnings(prev => [...prev, `High memory usage: ${percentage}%`]);
      }
    }
  }, [thresholds.memory]);

  // Load Time Monitor
  const measureLoadTime = useCallback(() => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      setMetrics(prev => ({ ...prev, loadTime }));
      
      if (loadTime > thresholds.loadTime!) {
        setWarnings(prev => [...prev, `Slow page load: ${loadTime}ms`]);
      }
    }
  }, [thresholds.loadTime]);

  // Render Time Monitor
  const measureRenderTime = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          const renderTime = entry.duration;
          setMetrics(prev => ({ ...prev, renderTime }));
          
          if (renderTime > thresholds.renderTime!) {
            setWarnings(prev => [...prev, `Slow render: ${renderTime.toFixed(2)}ms`]);
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    return () => observer.disconnect();
  }, [thresholds.renderTime]);

  // Network Latency Monitor
  const measureNetworkLatency = useCallback(async () => {
    const start = performance.now();
    try {
      await fetch('/api/health', { method: 'HEAD' });
      const latency = performance.now() - start;
      setMetrics(prev => ({ ...prev, networkLatency: latency }));
    } catch (error) {
      console.error('Network latency measurement failed:', error);
    }
  }, []);

  // DOM Nodes Monitor
  const measureDOMNodes = useCallback(() => {
    const nodeCount = document.getElementsByTagName('*').length;
    setMetrics(prev => ({ ...prev, domNodes: nodeCount }));
    
    if (nodeCount > thresholds.domNodes!) {
      setWarnings(prev => [...prev, `High DOM node count: ${nodeCount}`]);
    }
  }, [thresholds.domNodes]);

  // Resource Timing API
  const getResourceMetrics = useCallback(() => {
    const resources = performance.getEntriesByType('resource');
    const metrics = {
      totalResources: resources.length,
      totalSize: resources.reduce((acc, resource: any) => {
        return acc + (resource.transferSize || 0);
      }, 0),
      slowResources: resources.filter((resource: any) => {
        return resource.duration > 1000;
      }).map((resource: any) => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize
      }))
    };
    
    return metrics;
  }, []);

  // Long Task Observer
  const observeLongTasks = useCallback(() => {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.duration > 50) {
              setWarnings(prev => [...prev, `Long task detected: ${entry.duration.toFixed(2)}ms`]);
            }
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        
        return () => observer.disconnect();
      } catch (e) {
        console.warn('Long task observer not supported');
      }
    }
  }, []);

  // Clear warnings
  const clearWarnings = useCallback(() => {
    setWarnings([]);
  }, []);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    measureFPS();
    measureMemory();
    measureLoadTime();
    measureDOMNodes();
    measureNetworkLatency();
    
    const memoryInterval = setInterval(measureMemory, 2000);
    const domInterval = setInterval(measureDOMNodes, 5000);
    const networkInterval = setInterval(measureNetworkLatency, 10000);
    
    const cleanupRender = measureRenderTime();
    const cleanupLongTasks = observeLongTasks();
    
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      clearInterval(memoryInterval);
      clearInterval(domInterval);
      clearInterval(networkInterval);
      if (cleanupRender) cleanupRender();
      if (cleanupLongTasks) cleanupLongTasks();
    };
  }, [
    measureFPS,
    measureMemory,
    measureLoadTime,
    measureDOMNodes,
    measureNetworkLatency,
    measureRenderTime,
    observeLongTasks
  ]);

  // Performance mark
  const mark = useCallback((name: string) => {
    performance.mark(name);
  }, []);

  // Performance measure
  const measure = useCallback((name: string, startMark: string, endMark?: string) => {
    try {
      performance.measure(name, startMark, endMark);
    } catch (e) {
      console.error('Performance measure failed:', e);
    }
  }, []);

  // Get navigation timing
  const getNavigationTiming = useCallback(() => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      return {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        request: timing.responseStart - timing.requestStart,
        response: timing.responseEnd - timing.responseStart,
        domProcessing: timing.domComplete - timing.domLoading,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart
      };
    }
    return null;
  }, []);

  // Start monitoring on mount
  useEffect(() => {
    const cleanup = startMonitoring();
    return cleanup;
  }, [startMonitoring]);

  return {
    metrics,
    warnings,
    clearWarnings,
    mark,
    measure,
    getResourceMetrics,
    getNavigationTiming,
    isPerformanceOptimal: warnings.length === 0
  };
};

// Performance Monitor Component
export const PerformanceMonitorWidget: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  show?: boolean;
}> = ({ position = 'bottom-right', show = process.env.NODE_ENV === 'development' }) => {
  const { metrics, warnings, clearWarnings } = usePerformanceMonitor();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!show) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 bg-neutral-900/95 backdrop-blur-sm border border-neutral-800 rounded-lg p-3 font-mono text-xs transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-32'
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={`${metrics.fps < 30 ? 'text-red-400' : 'text-green-400'}`}>
          {metrics.fps} FPS
        </span>
        <span className="text-neutral-500">▼</span>
      </div>
      
      {isExpanded && (
        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-400">Memory:</span>
            <span className={metrics.memory.percentage > 90 ? 'text-red-400' : 'text-green-400'}>
              {metrics.memory.percentage}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">DOM Nodes:</span>
            <span className={metrics.domNodes > 1500 ? 'text-yellow-400' : 'text-green-400'}>
              {metrics.domNodes}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Load Time:</span>
            <span className={metrics.loadTime > 3000 ? 'text-red-400' : 'text-green-400'}>
              {metrics.loadTime}ms
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Network:</span>
            <span className={metrics.networkLatency > 1000 ? 'text-yellow-400' : 'text-green-400'}>
              {metrics.networkLatency.toFixed(0)}ms
            </span>
          </div>
          
          {warnings.length > 0 && (
            <div className="border-t border-neutral-800 pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-red-400">Warnings:</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearWarnings();
                  }}
                  className="text-neutral-500 hover:text-neutral-300"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {warnings.slice(-3).map((warning, index) => (
                  <div key={index} className="text-yellow-400 text-xs">
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default usePerformanceMonitor;