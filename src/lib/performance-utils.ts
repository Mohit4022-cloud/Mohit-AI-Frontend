export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function createAnimationLoop(callback: (time: number) => void) {
  let animationId: number | null = null;
  let isRunning = false;

  const loop = (time: number) => {
    if (!isRunning) return;
    callback(time);
    animationId = requestAnimationFrame(loop);
  };

  return {
    start() {
      if (isRunning) return;
      isRunning = true;
      animationId = requestAnimationFrame(loop);
    },
    stop() {
      isRunning = false;
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  };
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}