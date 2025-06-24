"use client";

import React from "react";
import { format } from "date-fns";
import { 
  Phone, 
  PhoneOff, 
  Clock, 
  FileText, 
  Download, 
  Play, 
  MoreVertical,
  Mail,
  PhoneCall,
  Trash2,
  ExternalLink,
  Share2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallQueueStore, CallRecord } from "@/stores/callQueueStore";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function CallHistoryTable() {
  const { callHistory, clearHistory, removeFromHistory } = useCallQueueStore();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const { toast } = useToast();

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (status: CallRecord["status"]) => {
    switch (status) {
      case "completed":
        return "default";
      case "failed":
        return "destructive";
      case "connected":
        return "secondary";
      default:
        return "outline";
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCallBack = (call: CallRecord) => {
    // Add to call queue for callback
    const callbackContact = {
      id: `callback-${call.id}`,
      name: call.contactName,
      company: call.contactCompany,
      title: "",
      phone: call.phone,
      email: "",
      industry: "",
      lastCalled: call.startTime,
      callStatus: undefined as any,
      callDuration: undefined,
      notes: `Callback from ${format(call.startTime, "MMM d, h:mm a")}`,
    };
    
    const { addToQueue } = useCallQueueStore.getState();
    addToQueue([callbackContact]);
    
    toast({
      title: "Added to call queue",
      description: `${call.contactName} has been added for callback`,
    });
  };

  const handleExportTranscript = (call: CallRecord) => {
    if (!call.transcript || call.transcript.length === 0) {
      toast({
        title: "No transcript available",
        description: "This call doesn't have a transcript to export",
        variant: "destructive",
      });
      return;
    }

    // Create transcript text
    const transcriptText = [
      `Call Transcript`,
      `Contact: ${call.contactName}`,
      `Company: ${call.contactCompany}`,
      `Phone: ${call.phone}`,
      `Date: ${format(call.startTime, "MMMM d, yyyy h:mm a")}`,
      `Duration: ${formatDuration(call.duration)}`,
      `Status: ${call.status}`,
      ``,
      `Transcript:`,
      ...call.transcript.map(line => line),
    ].join('\n');

    // Download as text file
    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript_${call.contactName.replace(/\s+/g, '_')}_${format(call.startTime, 'yyyy-MM-dd')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      description: "Transcript exported successfully",
    });
  };

  const handlePlayRecording = (call: CallRecord) => {
    toast({
      title: "Play Recording",
      description: "Call recording playback coming soon",
    });
  };

  const handleShareCall = (call: CallRecord) => {
    // Copy call details to clipboard
    const callDetails = [
      `Call with ${call.contactName}`,
      `Company: ${call.contactCompany}`,
      `Date: ${format(call.startTime, "MMMM d, yyyy h:mm a")}`,
      `Duration: ${formatDuration(call.duration)}`,
      `Status: ${call.status}`,
    ].join('\n');

    navigator.clipboard.writeText(callDetails);
    toast({
      description: "Call details copied to clipboard",
    });
  };

  const handleEmailSummary = (call: CallRecord) => {
    const subject = `Call Summary - ${call.contactName} - ${format(call.startTime, "MMM d, yyyy")}`;
    const body = [
      `Call Summary`,
      ``,
      `Contact: ${call.contactName}`,
      `Company: ${call.contactCompany}`,
      `Phone: ${call.phone}`,
      `Date: ${format(call.startTime, "MMMM d, yyyy h:mm a")}`,
      `Duration: ${formatDuration(call.duration)}`,
      `Status: ${call.status}`,
      ``,
      call.transcript && call.transcript.length > 0 ? 
        `Key Points from Transcript:\n${call.transcript.slice(0, 3).join('\n')}...` : 
        'No transcript available',
    ].join('\n');

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleViewDetails = (call: CallRecord) => {
    toast({
      title: "View Details",
      description: "Detailed call view coming soon",
    });
  };

  const handleDeleteCall = (callId: string) => {
    if (!confirm("Are you sure you want to delete this call record?")) return;
    
    removeFromHistory(callId);
    toast({
      description: "Call record deleted",
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Call History</CardTitle>
          <div className="flex items-center gap-2">
            {callHistory.length > 0 && (
              <>
                <Button
                  onClick={() => {
                    const csv = [
                      ["Contact", "Company", "Phone", "Date", "Duration", "Status"],
                      ...callHistory.map(call => [
                        call.contactName,
                        call.contactCompany,
                        call.phone,
                        format(call.startTime, "yyyy-MM-dd HH:mm"),
                        formatDuration(call.duration),
                        call.status
                      ])
                    ].map(row => row.join(",")).join("\n");

                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `call_history_${format(new Date(), "yyyy-MM-dd")}.csv`;
                    a.click();
                    URL.revokeObjectURL(url);

                    toast({
                      description: "Call history exported",
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                <Button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear all call history?")) {
                      clearHistory();
                      toast({
                        description: "Call history cleared",
                      });
                    }
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  Clear History
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px]">
          {callHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground p-8">
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No call history yet</p>
              </div>
            </div>
          ) : (
            <div className="divide-y">
              {callHistory.map((call) => (
                <div
                  key={call.id}
                  className={cn(
                    "p-4 hover:bg-muted/50 transition-colors",
                    expandedId === call.id && "bg-muted/50",
                  )}
                >
                  <div className="space-y-2">
                    {/* Main Info Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div 
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => toggleExpanded(call.id)}
                      >
                        <p className="font-medium truncate">
                          {call.contactName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {call.contactCompany}
                        </p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {call.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(call.status)}>
                          {call.status === "completed" ? (
                            <Phone className="h-3 w-3 mr-1" />
                          ) : (
                            <PhoneOff className="h-3 w-3 mr-1" />
                          )}
                          {call.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleCallBack(call)}>
                              <PhoneCall className="mr-2 h-4 w-4" />
                              Call Back
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePlayRecording(call)}>
                              <Play className="mr-2 h-4 w-4" />
                              Play Recording
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleExportTranscript(call)}
                              disabled={!call.transcript || call.transcript.length === 0}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Export Transcript
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEmailSummary(call)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Email Summary
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareCall(call)}>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share Call Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDetails(call)}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCall(call.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Record
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Time Info Row */}
                    <div 
                      className="flex items-center justify-between text-xs text-muted-foreground cursor-pointer"
                      onClick={() => toggleExpanded(call.id)}
                    >
                      <div className="flex items-center gap-4">
                        <span>{format(call.startTime, "MMM d, h:mm a")}</span>
                        {call.duration !== undefined && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuration(call.duration)}
                          </span>
                        )}
                      </div>
                      {call.transcript && call.transcript.length > 0 && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Transcript
                        </span>
                      )}
                    </div>

                    {/* Expanded Transcript */}
                    {expandedId === call.id &&
                      call.transcript &&
                      call.transcript.length > 0 && (
                        <div className="mt-3 pt-3 border-t space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-muted-foreground">
                              Call Transcript:
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleExportTranscript(call)}
                              className="h-7 text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Export
                            </Button>
                          </div>
                          <div className="space-y-1 max-h-40 overflow-y-auto">
                            {call.transcript.map((line, idx) => (
                              <p key={idx} className="text-xs">
                                <span className="font-medium">
                                  {line.startsWith("AI:") ? "AI" : "Prospect"}:
                                </span>{" "}
                                {line.replace(/^(AI:|Prospect:)\s*/, "")}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}