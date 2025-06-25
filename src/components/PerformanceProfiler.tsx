'use client';

import React from 'react';

interface PerformanceProfilerProps {
  id: string;
  children: React.ReactNode;
}

export function PerformanceProfiler({ id, children }: PerformanceProfilerProps) {
  const onRender = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    if (actualDuration > 100) {
      console.warn(`Performance warning: ${id} took ${actualDuration}ms to ${phase}`);
      console.log({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
      });
    }
  };

  return (
    <React.Profiler id={id} onRender={onRender}>
      {children}
    </React.Profiler>
  );
}