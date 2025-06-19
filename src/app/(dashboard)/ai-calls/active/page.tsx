"use client";

import { useEffect } from "react";
import { useAICallStore } from "@/stores/aiCallStore";
import { CallGrid } from "@/components/ai-calls/CallGrid";
import { TranscriptPanel } from "@/components/ai-calls/TranscriptPanel";
import { CallControls } from "@/components/ai-calls/CallControls";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActiveCallsPage() {
  const router = useRouter();
  const { activeCalls, selectedCallId, selectCall, loadActiveCalls } = useAICallStore();
  
  useEffect(() => {
    loadActiveCalls();
    const interval = setInterval(loadActiveCalls, 5000);
    return () => clearInterval(interval);
  }, [loadActiveCalls]);

  const selectedCall = activeCalls.find(call => call.id === selectedCallId);

  return (
    <div className="flex flex-col h-full p-4 lg:p-6">
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/ai-calls")}
          className="mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <h1 className="text-2xl font-bold">Active AI Calls</h1>
        <p className="text-muted-foreground">
          Monitor and manage all ongoing AI-powered calls
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 ai-desktop:grid-cols-ai-split gap-4">
        <div>
          <CallGrid
            calls={activeCalls}
            selectedCallId={selectedCallId}
            onSelectCall={selectCall}
            view="list"
          />
        </div>
        
        {selectedCall && (
          <div className="space-y-4">
            <CallControls callId={selectedCall.id} />
            <TranscriptPanel 
              callId={selectedCall.id} 
              onClose={() => selectCall(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}