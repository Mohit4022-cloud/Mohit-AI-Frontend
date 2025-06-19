import { AICall } from "@/stores/aiCallStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, User, Building, Clock, Mic, Cpu, Volume2, 
  Pause, UserPlus, PhoneOff, MoreVertical, Bot, Users, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";
import { useAICallStore } from "@/stores/aiCallStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CallCardProps {
  call: AICall;
  isSelected?: boolean;
  onSelect?: () => void;
  view?: "grid" | "list";
}

export function CallCard({ call, isSelected, onSelect, view = "grid" }: CallCardProps) {
  const { takeOverCall, pauseAI, endCall } = useAICallStore();

  const handleTakeOver = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await takeOverCall(call.id);
  };

  const handleEndCall = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await endCall(call.id);
  };

  const handlePauseAI = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await pauseAI(call.id);
  };

  if (view === "list") {
    return (
      <Card 
        className={cn(
          "p-4 cursor-pointer transition-all hover:shadow-md",
          isSelected && "ring-2 ring-primary"
        )}
        onClick={onSelect}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StatusIndicator status={call.agentStatus} mode={call.mode} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{call.leadName}</h3>
                <Badge variant={getModeVariant(call.mode)}>{call.mode}</Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Building className="h-3 w-3" />
                {call.company}
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3" />
                {formatDuration(call.duration)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <SentimentIndicator value={call.sentiment} />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleTakeOver}
              disabled={call.mode === "HUMAN"}
            >
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "relative p-4 min-w-call-card h-call-card cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        isSelected && "ring-2 ring-ai-blue"
      )}
      onClick={onSelect}
    >
      {/* Mode Indicator */}
      <div className="absolute top-2 right-2">
        {call.mode === "AI" && (
          <div className="flex items-center gap-1 text-ai-blue">
            <Bot className="h-4 w-4" />
            <Sparkles className="h-3 w-3" />
          </div>
        )}
        {call.mode === "HUMAN" && (
          <User className="h-4 w-4 text-ai-green" />
        )}
        {call.mode === "HYBRID" && (
          <Users className="h-4 w-4 text-ai-amber" />
        )}
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <StatusIndicator status={call.agentStatus} mode={call.mode} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{call.leadName}</h3>
          <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
            <Building className="h-3 w-3" />
            {call.company}
          </p>
        </div>
      </div>

      {/* Mini Waveform */}
      <div className="mb-3">
        <MiniWaveform isActive={call.agentStatus === "SPEAKING"} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatDuration(call.duration)}
          <span className="mx-1">•</span>
          <SentimentIndicator value={call.sentiment} size="sm" />
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={handleTakeOver}
            disabled={call.mode === "HUMAN"}
          >
            <UserPlus className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={handleEndCall}
          >
            <PhoneOff className="h-3.5 w-3.5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePauseAI}>
                {call.mode === "AI" ? "Pause AI" : "Resume AI"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                Get Summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}

interface StatusIndicatorProps {
  status: AICall["agentStatus"];
  mode: AICall["mode"];
}

function StatusIndicator({ status, mode }: StatusIndicatorProps) {
  if (status === "LISTENING") {
    return (
      <div className="relative w-status-indicator h-status-indicator">
        <div className="absolute inset-0 rounded-full bg-ai-blue/20 animate-pulse-ring" />
        <div className="relative w-full h-full rounded-full bg-ai-blue border-status border-ai-blue flex items-center justify-center">
          <Mic className="h-4 w-4 text-white" />
        </div>
      </div>
    );
  }

  if (status === "PROCESSING") {
    return (
      <div className="relative w-status-indicator h-status-indicator">
        <div className="w-full h-full rounded-full bg-ai-amber border-status border-ai-amber flex items-center justify-center animate-rotate-gear">
          <Cpu className="h-4 w-4 text-white" />
        </div>
      </div>
    );
  }

  if (status === "SPEAKING") {
    return (
      <div className="relative w-status-indicator h-status-indicator">
        <div className="w-full h-full rounded-full bg-ai-green border-status border-ai-green flex items-center justify-center overflow-hidden">
          <div className="flex items-end gap-0.5 h-4">
            <div className="w-1 bg-white rounded-full animate-sound-wave" style={{ height: '60%' }} />
            <div className="w-1 bg-white rounded-full animate-sound-wave-delayed" style={{ height: '100%' }} />
            <div className="w-1 bg-white rounded-full animate-sound-wave" style={{ height: '80%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-status-indicator h-status-indicator rounded-full bg-ai-gray border-status border-ai-gray flex items-center justify-center">
      <Phone className="h-4 w-4 text-white" />
    </div>
  );
}

interface SentimentIndicatorProps {
  value: number;
  size?: "sm" | "md";
}

function SentimentIndicator({ value, size = "md" }: SentimentIndicatorProps) {
  const getColor = () => {
    if (value >= 80) return "text-ai-green";
    if (value >= 60) return "text-ai-amber";
    return "text-ai-red";
  };

  return (
    <span className={cn(
      "font-medium",
      getColor(),
      size === "sm" ? "text-xs" : "text-sm"
    )}>
      {value}%
    </span>
  );
}

interface MiniWaveformProps {
  isActive: boolean;
}

function MiniWaveform({ isActive }: MiniWaveformProps) {
  const heights = [40, 70, 50, 90, 60, 80, 45, 85, 55, 75, 65, 95, 40, 70, 50, 80, 60, 90, 45, 75];
  
  return (
    <div className="flex items-center gap-0.5 h-6">
      {heights.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-300",
            isActive 
              ? "bg-ai-green" 
              : "bg-ai-gray/30"
          )}
          style={{
            height: isActive ? `${height}%` : "20%",
            transform: isActive ? `scaleY(${0.5 + Math.sin(Date.now() / 200 + i) * 0.5})` : 'scaleY(1)',
          }}
        />
      ))}
    </div>
  );
}

function getModeVariant(mode: AICall["mode"]) {
  switch (mode) {
    case "AI":
      return "default";
    case "HUMAN":
      return "secondary";
    case "HYBRID":
      return "outline";
  }
}