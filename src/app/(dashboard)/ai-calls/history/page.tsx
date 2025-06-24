"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  Calendar as CalendarIcon,
  Play,
  FileText,
  BarChart3,
  Phone,
  Clock,
  TrendingUp,
  MoreVertical,
  Eye,
  Copy,
  Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock data for call history
const mockCallHistory = [
  {
    id: "1",
    leadName: "John Smith",
    company: "TechCorp",
    phone: "+1234567890",
    date: new Date(2024, 11, 19, 14, 30),
    duration: 485,
    mode: "AI",
    outcome: "Qualified",
    sentiment: 92,
    hasRecording: true,
    hasTranscript: true,
    notes: "Interested in enterprise plan",
  },
  {
    id: "2",
    leadName: "Sarah Johnson",
    company: "InnovateCo",
    phone: "+1234567891",
    date: new Date(2024, 11, 19, 11, 15),
    duration: 320,
    mode: "HYBRID",
    outcome: "Follow-up",
    sentiment: 78,
    hasRecording: true,
    hasTranscript: true,
    notes: "Needs approval from CFO",
  },
  // Add more mock data as needed
];

export default function CallHistoryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [filterOutcome, setFilterOutcome] = useState("all");
  const [filterMode, setFilterMode] = useState("all");

  const filteredHistory = mockCallHistory.filter((call) => {
    const matchesSearch =
      call.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOutcome =
      filterOutcome === "all" || call.outcome === filterOutcome;
    const matchesMode = filterMode === "all" || call.mode === filterMode;
    return matchesSearch && matchesOutcome && matchesMode;
  });

  const stats = {
    totalCalls: mockCallHistory.length,
    avgDuration: Math.round(
      mockCallHistory.reduce((sum, call) => sum + call.duration, 0) /
        mockCallHistory.length,
    ),
    avgSentiment: Math.round(
      mockCallHistory.reduce((sum, call) => sum + call.sentiment, 0) /
        mockCallHistory.length,
    ),
    qualificationRate: Math.round(
      (mockCallHistory.filter((c) => c.outcome === "Qualified").length /
        mockCallHistory.length) *
        100,
    ),
  };

  // Export to CSV function
  const handleExportCSV = () => {
    const csvHeaders = [
      "Lead Name",
      "Company",
      "Phone",
      "Date",
      "Time",
      "Duration",
      "Mode",
      "Outcome",
      "Sentiment",
      "Notes",
    ];

    const csvData = filteredHistory.map((call) => [
      call.leadName,
      call.company,
      call.phone,
      format(call.date, "yyyy-MM-dd"),
      format(call.date, "HH:mm:ss"),
      `${Math.floor(call.duration / 60)}:${(call.duration % 60)
        .toString()
        .padStart(2, "0")}`,
      call.mode,
      call.outcome,
      `${call.sentiment}%`,
      call.notes || "",
    ]);

    const csvContent = [
      csvHeaders.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `call_history_${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Call history has been exported to CSV file.",
    });
  };

  // Play recording function
  const handlePlayRecording = (callId: string, leadName: string) => {
    toast({
      title: "Playing Recording",
      description: `Playing call recording for ${leadName}...`,
    });
    // In a real app, this would trigger audio playback
  };

  // View/Download transcript function
  const handleTranscript = (callId: string, leadName: string) => {
    toast({
      title: "Downloading Transcript",
      description: `Downloading transcript for call with ${leadName}...`,
    });
    // In a real app, this would download the transcript file
  };

  // View call details function
  const handleViewDetails = (callId: string, leadName: string) => {
    toast({
      title: "Opening Call Details",
      description: `Loading detailed view for call with ${leadName}...`,
    });
    // In a real app, this would navigate to a detailed view
    router.push(`/ai-calls/history/${callId}`);
  };

  // Copy call ID function
  const handleCopyCallId = (callId: string) => {
    navigator.clipboard.writeText(callId);
    toast({
      title: "Copied",
      description: "Call ID copied to clipboard.",
    });
  };

  // Share call function
  const handleShareCall = (callId: string, leadName: string) => {
    const shareUrl = `${window.location.origin}/ai-calls/history/${callId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Share Link Copied",
      description: `Share link for call with ${leadName} copied to clipboard.`,
    });
  };

  return (
    <div className="flex flex-col h-full p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/ai-calls")}
          className="mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Call History</h1>
            <p className="text-muted-foreground">
              Review past calls and performance metrics
            </p>
          </div>
          <Button onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Calls
                </p>
                <p className="text-2xl font-bold">{stats.totalCalls}</p>
              </div>
              <Phone className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Duration
                </p>
                <p className="text-2xl font-bold">
                  {Math.floor(stats.avgDuration / 60)}:
                  {(stats.avgDuration % 60).toString().padStart(2, "0")}
                </p>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Sentiment
                </p>
                <p className="text-2xl font-bold">{stats.avgSentiment}%</p>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Qualification Rate
                </p>
                <p className="text-2xl font-bold">{stats.qualificationRate}%</p>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => {
                if (range) {
                  setDateRange({
                    from: range.from,
                    to: range.to,
                  });
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select value={filterOutcome} onValueChange={setFilterOutcome}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="All outcomes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outcomes</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Not Interested">Not Interested</SelectItem>
            <SelectItem value="Follow-up">Follow-up</SelectItem>
            <SelectItem value="No Answer">No Answer</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterMode} onValueChange={setFilterMode}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="All modes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="AI">AI Only</SelectItem>
            <SelectItem value="HUMAN">Human Only</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setFilterOutcome("all");
                setFilterMode("all");
                setSearchQuery("");
                toast({
                  title: "Filters Cleared",
                  description: "All filters have been reset.",
                });
              }}
            >
              Clear All Filters
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDateRange({
                  from: subDays(new Date(), 1),
                  to: new Date(),
                });
                toast({
                  title: "Date Range Updated",
                  description: "Showing calls from last 24 hours.",
                });
              }}
            >
              Last 24 Hours
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDateRange({
                  from: subDays(new Date(), 30),
                  to: new Date(),
                });
                toast({
                  title: "Date Range Updated",
                  description: "Showing calls from last 30 days.",
                });
              }}
            >
              Last 30 Days
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{call.leadName}</p>
                      <p className="text-sm text-muted-foreground">
                        {call.company}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{format(call.date, "MMM d, yyyy")}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(call.date, "h:mm a")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {Math.floor(call.duration / 60)}:
                    {(call.duration % 60).toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getModeVariant(call.mode)}>
                      {call.mode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getOutcomeVariant(call.outcome)}>
                      {call.outcome}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-medium",
                        call.sentiment >= 80
                          ? "text-green-600"
                          : call.sentiment >= 60
                            ? "text-amber-600"
                            : "text-red-600",
                      )}
                    >
                      {call.sentiment}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {call.hasRecording && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handlePlayRecording(call.id, call.leadName)}
                          title="Play Recording"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      {call.hasTranscript && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleTranscript(call.id, call.leadName)}
                          title="View/Download Transcript"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            title="More Actions"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(call.id, call.leadName)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleCopyCallId(call.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Call ID
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleShareCall(call.id, call.leadName)}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Call
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {call.hasRecording && (
                            <DropdownMenuItem
                              onClick={() => {
                                toast({
                                  title: "Downloading Recording",
                                  description: `Downloading recording for ${call.leadName}...`,
                                });
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Recording
                            </DropdownMenuItem>
                          )}
                          {call.hasTranscript && (
                            <DropdownMenuItem
                              onClick={() => handleTranscript(call.id, call.leadName)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Download Transcript
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function getModeVariant(mode: string) {
  switch (mode) {
    case "AI":
      return "default";
    case "HUMAN":
      return "secondary";
    case "HYBRID":
      return "outline";
    default:
      return "default";
  }
}

function getOutcomeVariant(outcome: string) {
  switch (outcome) {
    case "Qualified":
      return "default";
    case "Follow-up":
      return "secondary";
    case "Not Interested":
      return "destructive";
    default:
      return "outline";
  }
}
