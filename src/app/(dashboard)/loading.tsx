export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-primary/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
