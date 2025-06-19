"use client";

import { useState, useEffect } from "react";
import { useAICallStore } from "@/stores/aiCallStore";
import { CallQueue } from "@/components/ai-calls/CallQueue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, Plus, Upload, Filter, Search, Calendar,
  Clock, Users, AlertCircle, Play, Settings
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallQueuePage() {
  const router = useRouter();
  const { queuedCalls, loadQueuedCalls, addToQueue } = useAICallStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  useEffect(() => {
    loadQueuedCalls();
    const interval = setInterval(loadQueuedCalls, 30000);
    return () => clearInterval(interval);
  }, [loadQueuedCalls]);

  const filteredCalls = queuedCalls.filter(call => {
    const matchesSearch = 
      call.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || call.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const stats = {
    total: queuedCalls.length,
    high: queuedCalls.filter(c => c.priority === "HIGH").length,
    medium: queuedCalls.filter(c => c.priority === "MEDIUM").length,
    low: queuedCalls.filter(c => c.priority === "LOW").length,
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
            <h1 className="text-2xl font-bold">Call Queue Management</h1>
            <p className="text-muted-foreground">
              Manage and prioritize upcoming AI calls
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add to Queue
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total in Queue"
          value={stats.total}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="High Priority"
          value={stats.high}
          icon={AlertCircle}
          color="red"
        />
        <StatsCard
          title="Medium Priority"
          value={stats.medium}
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="Low Priority"
          value={stats.low}
          icon={Calendar}
          color="gray"
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="HIGH">High Priority</SelectItem>
            <SelectItem value="MEDIUM">Medium Priority</SelectItem>
            <SelectItem value="LOW">Low Priority</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Queue Tabs */}
      <Tabs defaultValue="all" className="flex-1">
        <TabsList>
          <TabsTrigger value="all">All Calls ({filteredCalls.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="retry">Retry Queue</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <CallQueue />
        </TabsContent>

        <TabsContent value="scheduled" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>No scheduled calls at this time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retry" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Retry Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>No calls pending retry</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <QueueSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: "blue" | "red" | "amber" | "gray";
}

function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-950",
    red: "bg-red-100 text-red-600 dark:bg-red-950",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-950",
    gray: "bg-gray-100 text-gray-600 dark:bg-gray-800",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QueueSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Queue Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Maximum Concurrent AI Calls</Label>
            <Select defaultValue="10">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 calls</SelectItem>
                <SelectItem value="10">10 calls</SelectItem>
                <SelectItem value="20">20 calls</SelectItem>
                <SelectItem value="50">50 calls</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Call Retry Attempts</Label>
            <Select defaultValue="3">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 attempt</SelectItem>
                <SelectItem value="3">3 attempts</SelectItem>
                <SelectItem value="5">5 attempts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Time Between Retries</Label>
            <Select defaultValue="30">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Priority Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Enterprise Accounts</p>
                <p className="text-sm text-muted-foreground">Auto-assign high priority</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Follow-up Calls</p>
                <p className="text-sm text-muted-foreground">Medium priority after 24h</p>
              </div>
              <Badge>Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}