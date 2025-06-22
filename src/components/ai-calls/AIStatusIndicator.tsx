import { cn } from "@/lib/utils";
import { Mic, Cpu, Volume2 } from "lucide-react";

interface AIStatusIndicatorProps {
  status: "LISTENING" | "PROCESSING" | "SPEAKING" | "IDLE";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function AIStatusIndicator({
  status,
  size = "md",
  showLabel = false,
}: AIStatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-status-indicator h-status-indicator",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
  };

  if (status === "LISTENING") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          {/* Pulsing rings */}
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-ai-blue/20",
              sizeClasses[size],
            )}
          >
            <div className="absolute inset-0 rounded-full bg-ai-blue/40 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full bg-ai-blue/20 animate-pulse-ring [animation-delay:0.5s]" />
          </div>

          {/* Center indicator */}
          <div
            className={cn(
              "relative rounded-full bg-ai-blue border-status border-ai-blue flex items-center justify-center",
              sizeClasses[size],
            )}
          >
            <Mic className={cn("text-white", iconSizes[size])} />
          </div>
        </div>
        {showLabel && (
          <span className="text-xs font-medium text-ai-blue">Listening</span>
        )}
      </div>
    );
  }

  if (status === "PROCESSING") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "rounded-full bg-ai-amber border-status border-ai-amber flex items-center justify-center animate-rotate-gear",
            sizeClasses[size],
          )}
        >
          <Cpu className={cn("text-white", iconSizes[size])} />
        </div>
        {showLabel && (
          <span className="text-xs font-medium text-ai-amber">Processing</span>
        )}
      </div>
    );
  }

  if (status === "SPEAKING") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "rounded-full bg-ai-green border-status border-ai-green flex items-center justify-center overflow-hidden",
            sizeClasses[size],
          )}
        >
          {/* Sound wave bars */}
          <div className="flex items-end gap-0.5 h-4">
            <div
              className="w-0.5 bg-white rounded-full animate-sound-wave"
              style={{ height: "60%" }}
            />
            <div
              className="w-0.5 bg-white rounded-full animate-sound-wave-delayed"
              style={{ height: "100%" }}
            />
            <div
              className="w-0.5 bg-white rounded-full animate-sound-wave [animation-delay:0.2s]"
              style={{ height: "80%" }}
            />
            <div
              className="w-0.5 bg-white rounded-full animate-sound-wave-delayed [animation-delay:0.3s]"
              style={{ height: "90%" }}
            />
            <div
              className="w-0.5 bg-white rounded-full animate-sound-wave [animation-delay:0.4s]"
              style={{ height: "70%" }}
            />
          </div>
        </div>
        {showLabel && (
          <span className="text-xs font-medium text-ai-green">Speaking</span>
        )}
      </div>
    );
  }

  // IDLE state
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "rounded-full bg-ai-gray border-status border-ai-gray flex items-center justify-center",
          sizeClasses[size],
        )}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-ai-gray">Idle</span>
      )}
    </div>
  );
}
