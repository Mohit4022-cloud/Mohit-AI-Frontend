import { AICall } from "@/stores/aiCallStore";
import { CallCard } from "./CallCard";
import { cn } from "@/lib/utils";

interface CallGridProps {
  calls: AICall[];
  selectedCallId: string | null;
  onSelectCall: (id: string) => void;
  view?: "grid" | "list";
}

export function CallGrid({
  calls,
  selectedCallId,
  onSelectCall,
  view = "grid",
}: CallGridProps) {
  if (calls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-1">No Active Calls</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Start a new AI call from the leads page or wait for scheduled calls to
          begin.
        </p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="space-y-2">
        {calls.map((call) => (
          <CallCard
            key={call.id}
            call={call}
            isSelected={call.id === selectedCallId}
            onSelect={() => onSelectCall(call.id)}
            view="list"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        "grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3",
        "auto-rows-max",
      )}
    >
      {calls.map((call) => (
        <CallCard
          key={call.id}
          call={call}
          isSelected={call.id === selectedCallId}
          onSelect={() => onSelectCall(call.id)}
        />
      ))}
    </div>
  );
}
