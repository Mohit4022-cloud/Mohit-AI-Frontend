import { ApiDebugPanel } from "@/components/debug/ApiDebugPanel";

export default function DebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">API Debug Tools</h1>
      <ApiDebugPanel />
    </div>
  );
}
