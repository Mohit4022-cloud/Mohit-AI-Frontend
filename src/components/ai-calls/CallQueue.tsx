import { useEffect } from "react";
import { useAICallStore, QueuedCall } from "@/stores/aiCallStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Phone, Clock, AlertCircle, ArrowUp, ArrowDown, 
  MoreVertical, Play, X, Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface CallQueueProps {
  limit?: number;
}

export function CallQueue({ limit }: CallQueueProps) {
  const { queuedCalls, loadQueuedCalls, removeFromQueue, updateQueuePriority, initiateCall } = useAICallStore();

  useEffect(() => {
    loadQueuedCalls();
    const interval = setInterval(loadQueuedCalls, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadQueuedCalls]);

  const displayCalls = limit ? queuedCalls.slice(0, limit) : queuedCalls;

  const handleCallNow = async (call: QueuedCall) => {
    await initiateCall(call.leadId);
    removeFromQueue(call.id);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Call Queue</CardTitle>
          <Badge variant="secondary">{queuedCalls.length} waiting</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-3">
        <ScrollArea className="h-full pr-3">
          {displayCalls.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                <Phone className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-muted-foreground">No calls in queue</p>
            </div>
          ) : (
            <div className="space-y-2">
              {displayCalls.map((call) => (
                <QueueItem 
                  key={call.id} 
                  call={call} 
                  onCallNow={() => handleCallNow(call)}
                  onRemove={() => removeFromQueue(call.id)}
                  onUpdatePriority={(priority) => updateQueuePriority(call.id, priority)}
                />
              ))}
              {limit && queuedCalls.length > limit && (
                <div className="pt-2 text-center">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View all {queuedCalls.length} queued calls
                  </Button>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface QueueItemProps {
  call: QueuedCall;
  onCallNow: () => void;
  onRemove: () => void;
  onUpdatePriority: (priority: "HIGH" | "MEDIUM" | "LOW") => void;
}

function QueueItem({ call, onCallNow, onRemove, onUpdatePriority }: QueueItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
      case "MEDIUM":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200";
      case "LOW":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "";
    }
  };

  return (
    <div className="group relative p-3 rounded-lg border bg-card hover:shadow-sm transition-all">
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
          call.priority === "HIGH" ? "bg-red-500" : 
          call.priority === "MEDIUM" ? "bg-amber-500" : "bg-gray-400"
        )} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-sm font-medium truncate">{call.leadName}</h4>
              <p className="text-xs text-muted-foreground truncate">{call.company}</p>
            </div>
            <Badge 
              variant="secondary" 
              className={cn("text-xs px-1.5 py-0", getPriorityColor(call.priority))}
            >
              {call.priority}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            {call.scheduledTime && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(call.scheduledTime, { addSuffix: true })}
              </span>
            )}
            {call.attempts > 0 && (
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {call.attempts} attempts
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={onCallNow}
          >
            <Play className="h-3.5 w-3.5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onUpdatePriority("HIGH")}>
                <ArrowUp className="h-4 w-4 mr-2 text-red-500" />
                Set High Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdatePriority("MEDIUM")}>
                <ArrowDown className="h-4 w-4 mr-2 text-amber-500" />
                Set Medium Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdatePriority("LOW")}>
                <ArrowDown className="h-4 w-4 mr-2 text-gray-500" />
                Set Low Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRemove} className="text-red-600">
                <X className="h-4 w-4 mr-2" />
                Remove from Queue
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}