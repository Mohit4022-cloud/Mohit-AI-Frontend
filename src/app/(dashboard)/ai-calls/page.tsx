"use client";

import { useState, useEffect } from "react";
import { useAICallStore } from "@/stores/aiCallStore";
import { MetricsBar } from "@/components/ai-calls/MetricsBar";
import { CallGrid } from "@/components/ai-calls/CallGrid";
import { CallQueue } from "@/components/ai-calls/CallQueue";
import { AIInsights } from "@/components/ai-calls/AIInsights";
import { PerformanceChart } from "@/components/ai-calls/PerformanceChart";
import { TranscriptPanel } from "@/components/ai-calls/TranscriptPanel";
import { ContentCards } from "@/components/ai-calls/ContentCards";
import { ProgressiveSettings } from "@/components/ai-calls/ProgressiveSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Phone, Plus, Settings, Activity, History, ListOrdered } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AICallsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedView, setSelectedView] = useState<"grid" | "list">("grid");
  
  const {
    activeCalls,
    selectedCallId,
    callMetrics,
    selectCall,
    loadActiveCalls,
  } = useAICallStore();

  useEffect(() => {
    // Load initial data
    loadActiveCalls();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      loadActiveCalls();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadActiveCalls]);

  const selectedCall = activeCalls.find(call => call.id === selectedCallId);

  return (
    <div className="flex flex-col h-full space-y-4 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Phone className="h-8 w-8 text-ai-blue" />
            AI Calls
          </h1>
          <p className="text-muted-foreground">
            Manage AI-powered calls with real-time insights
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/ai-calls/queue")}
          >
            <ListOrdered className="h-4 w-4 mr-2" />
            Call Queue
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/ai-calls/history")}
          >
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/ai-calls/settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            onClick={() => router.push("/ai-calls/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Call
          </Button>
        </div>
      </div>

      {/* Metrics Bar */}
      <MetricsBar metrics={callMetrics} />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Calls</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 h-full">
          <div className="grid grid-cols-1 ai-desktop:grid-cols-ai-split gap-4 h-full">
            {/* Left Panel - Active Calls Grid (60%) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Active Calls ({activeCalls.length})</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedView === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedView("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={selectedView === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedView("list")}
                  >
                    List
                  </Button>
                </div>
              </div>
              
              <CallGrid
                calls={activeCalls}
                selectedCallId={selectedCallId}
                onSelectCall={selectCall}
                view={selectedView}
              />
            </div>

            {/* Right Panel - Split view (40%) */}
            <div className="space-y-4">
              {/* Call Queue */}
              <div className="h-[300px]">
                <CallQueue limit={5} />
              </div>
              
              {/* AI Insights */}
              {selectedCall && (
                <div className="space-y-4">
                  <div className="h-[300px]">
                    <AIInsights callId={selectedCall.id} />
                  </div>
                  
                  {/* Content Cards - Competitor-inspired features */}
                  <ContentCards callId={selectedCall.id} />
                </div>
              )}
              
              {/* Progressive Disclosure Settings */}
              <ProgressiveSettings />
            </div>
          </div>

          {/* Bottom Section - Performance Charts */}
          <div className="mt-6">
            <PerformanceChart />
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <CallGrid
                calls={activeCalls}
                selectedCallId={selectedCallId}
                onSelectCall={(id) => {
                  selectCall(id);
                  setShowTranscript(true);
                }}
                view="list"
              />
            </div>
            
            {showTranscript && selectedCall && (
              <div className="lg:col-span-1">
                <TranscriptPanel
                  callId={selectedCall.id}
                  onClose={() => setShowTranscript(false)}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnalyticsCard
                title="Call Success Rate"
                value="87%"
                change="+5%"
                trend="up"
              />
              <AnalyticsCard
                title="Avg Call Duration"
                value="12:34"
                change="+1:23"
                trend="up"
              />
              <AnalyticsCard
                title="AI Handling Rate"
                value="94%"
                change="+2%"
                trend="up"
              />
              <AnalyticsCard
                title="Lead Qualification"
                value="62%"
                change="+8%"
                trend="up"
              />
            </div>
            
            <PerformanceChart detailed />
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Transcript Panel for Mobile */}
      {showTranscript && selectedCall && (
        <div className={cn(
          "fixed inset-x-0 bottom-0 z-50 lg:hidden",
          "bg-background border-t shadow-lg",
          "transform transition-transform duration-300",
          showTranscript ? "translate-y-0" : "translate-y-full"
        )}>
          <TranscriptPanel
            callId={selectedCall.id}
            onClose={() => setShowTranscript(false)}
          />
        </div>
      )}
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

function AnalyticsCard({ title, value, change, trend }: AnalyticsCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs mt-1",
          trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"
        )}>
          {change} from last week
        </p>
      </div>
    </div>
  );
}