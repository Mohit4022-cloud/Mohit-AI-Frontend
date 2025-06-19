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
  ArrowLeft, Download, Filter, Search, Calendar as CalendarIcon,
  Play, FileText, BarChart3, Phone, Clock, TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";

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

  const filteredHistory = mockCallHistory.filter(call => {
    const matchesSearch = 
      call.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOutcome = filterOutcome === "all" || call.outcome === filterOutcome;
    const matchesMode = filterMode === "all" || call.mode === filterMode;
    return matchesSearch && matchesOutcome && matchesMode;
  });

  const stats = {
    totalCalls: mockCallHistory.length,
    avgDuration: Math.round(
      mockCallHistory.reduce((sum, call) => sum + call.duration, 0) / mockCallHistory.length
    ),
    avgSentiment: Math.round(
      mockCallHistory.reduce((sum, call) => sum + call.sentiment, 0) / mockCallHistory.length
    ),
    qualificationRate: Math.round(
      (mockCallHistory.filter(c => c.outcome === "Qualified").length / mockCallHistory.length) * 100
    ),
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
          <Button>
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
                <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
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
                <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">{Math.floor(stats.avgDuration / 60)}:{(stats.avgDuration % 60).toString().padStart(2, '0')}</p>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Sentiment</p>
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
                <p className="text-sm font-medium text-muted-foreground">Qualification Rate</p>
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
            <Button variant="outline" className="justify-start text-left font-normal">
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
                    to: range.to
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

        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More
        </Button>
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
                      <p className="text-sm text-muted-foreground">{call.company}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{format(call.date, "MMM d, yyyy")}</p>
                      <p className="text-sm text-muted-foreground">{format(call.date, "h:mm a")}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getModeVariant(call.mode)}>{call.mode}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getOutcomeVariant(call.outcome)}>{call.outcome}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-medium",
                      call.sentiment >= 80 ? "text-green-600" :
                      call.sentiment >= 60 ? "text-amber-600" : "text-red-600"
                    )}>
                      {call.sentiment}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {call.hasRecording && (
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      {call.hasTranscript && (
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
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