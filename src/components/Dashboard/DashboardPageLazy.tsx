import React, { lazy, Suspense } from 'react';
import QuantumLoader from '@/components/UI/QuantumLoader';

// Lazy load the dashboard component
const DashboardPage = lazy(() => import('@/app/(dashboard)/dashboard/page'));

// Lazy load individual dashboard sections
export const LazyMetricsGrid = lazy(() => 
  import('@/app/(dashboard)/dashboard/page').then(module => ({
    default: module.MetricsGrid || (() => <div>Metrics Grid</div>)
  }))
);

export const LazyChartsSection = lazy(() => 
  import('@/app/(dashboard)/dashboard/page').then(module => ({
    default: module.ChartsSection || (() => <div>Charts Section</div>)
  }))
);

export const LazyActiveLeads = lazy(() => 
  import('@/app/(dashboard)/dashboard/page').then(module => ({
    default: module.ActiveLeadsSection || (() => <div>Active Leads</div>)
  }))
);

// Loading fallback component
const DashboardLoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-900">
    <div className="text-center">
      <QuantumLoader variant="quantum" size="lg" color="gradient" />
      <p className="mt-4 text-neutral-400">Loading dashboard...</p>
    </div>
  </div>
);

// Section loading fallback
const SectionLoadingFallback: React.FC<{ section: string }> = ({ section }) => (
  <div className="flex items-center justify-center p-8 bg-neutral-800/50 rounded-lg">
    <QuantumLoader variant="dots" size="md" text={`Loading ${section}...`} />
  </div>
);

// Main lazy-loaded dashboard wrapper
const DashboardPageLazy: React.FC = () => {
  return (
    <Suspense fallback={<DashboardLoadingFallback />}>
      <DashboardPage />
    </Suspense>
  );
};

// Preload critical components
export const preloadDashboard = () => {
  const dashboardImport = import('@/app/(dashboard)/dashboard/page');
  return dashboardImport;
};

// Create a progressive loading dashboard
export const ProgressiveDashboard: React.FC = () => {
  const [showCharts, setShowCharts] = React.useState(false);
  const [showLeads, setShowLeads] = React.useState(false);

  React.useEffect(() => {
    // Progressive loading - load sections after initial render
    const chartsTimer = setTimeout(() => setShowCharts(true), 100);
    const leadsTimer = setTimeout(() => setShowLeads(true), 200);

    return () => {
      clearTimeout(chartsTimer);
      clearTimeout(leadsTimer);
    };
  }, []);

  return (
    <div className="dashboard-page">
      {/* Always show metrics first (critical) */}
      <Suspense fallback={<SectionLoadingFallback section="metrics" />}>
        <LazyMetricsGrid />
      </Suspense>

      {/* Progressively load charts */}
      {showCharts && (
        <Suspense fallback={<SectionLoadingFallback section="charts" />}>
          <LazyChartsSection />
        </Suspense>
      )}

      {/* Progressively load active leads */}
      {showLeads && (
        <Suspense fallback={<SectionLoadingFallback section="active leads" />}>
          <LazyActiveLeads />
        </Suspense>
      )}
    </div>
  );
};

export default DashboardPageLazy;