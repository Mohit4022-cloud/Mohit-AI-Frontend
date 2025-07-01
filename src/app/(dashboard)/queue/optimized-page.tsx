"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Users,
  Clock,
  AlertTriangle,
  ArrowUp,
  GripVertical,
  Phone,
  Mail,
  Building,
  MoreVertical,
  Search,
  SortAsc,
  SortDesc,
  RefreshCw,
  Bell,
  Calendar,
  SkipForward,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import "@/app/queue-optimizations.css";

interface QueuedLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  score: number;
  priority: "high" | "medium" | "low";
  waitTime: number;
  source: string;
  assignedTo?: string;
  attempts: number;
}

// Generate mock queue data
const generateMockQueue = (count: number): QueuedLead[] => {
  const firstNames = ["Sarah", "Michael", "Jennifer", "David", "Emily"];
  const lastNames = ["Johnson", "Chen", "Williams", "Brown", "Davis"];
  const companies = ["TechCorp", "Innovate.io", "StartupXYZ", "Enterprise Co", "Global Solutions"];
  const sources = ["Website", "LinkedIn", "Email", "Webinar", "Referral"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `queue-${i + 1}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `lead${i + 1}@example.com`,
    phone: `+1-555-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    score: Math.floor(Math.random() * 40 + 60),
    priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as any,
    waitTime: Math.floor(Math.random() * 45 + 5),
    source: sources[Math.floor(Math.random() * sources.length)],
    assignedTo: Math.random() > 0.5 ? "John Doe" : undefined,
    attempts: Math.floor(Math.random() * 3),
  }));
};

function SortableQueueItem({
  lead,
  onAction,
}: {
  lead: QueuedLead;
  onAction: (action: string, lead: QueuedLead) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getWaitTimeStatus = (minutes: number) => {
    if (minutes > 30) return "data-queue-time-critical";
    if (minutes > 15) return "data-queue-time-warning";
    return "data-queue-time-ok";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("data-queue-item", isDragging && "data-queue-item-dragging")}
    >
      <div {...attributes} {...listeners} className="data-queue-handle">
        <GripVertical className="h-4 w-4" />
      </div>

      <div className="data-queue-primary">
        <div className="data-queue-avatar">
          {lead.firstName[0]}{lead.lastName[0]}
        </div>
        <div className="data-queue-info">
          <div className="data-queue-name">
            {lead.firstName} {lead.lastName}
          </div>
          <div className="data-queue-details">
            <div className="data-queue-detail-item">
              <Building className="data-queue-detail-icon" />
              <span>{lead.company}</span>
            </div>
            <div className="data-queue-detail-item">
              <Mail className="data-queue-detail-icon" />
              <span>{lead.email}</span>
            </div>
            {lead.assignedTo && (
              <div className="data-queue-detail-item">
                <User className="data-queue-detail-icon" />
                <span>{lead.assignedTo}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="data-queue-badges">
        <span className={`data-queue-priority data-queue-priority-${lead.priority}`}>
          {lead.priority}
        </span>
        <span className={cn("data-queue-time", getWaitTimeStatus(lead.waitTime))}>
          {lead.waitTime}m
        </span>
        <div className="data-queue-actions">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="data-queue-action">
                <MoreVertical className="data-queue-action-icon" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAction("contact", lead)}>
                <Phone className="mr-2 h-4 w-4" />
                Contact Now
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction("assign", lead)}>
                <User className="mr-2 h-4 w-4" />
                Reassign
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction("schedule", lead)}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction("skip", lead)}>
                <SkipForward className="mr-2 h-4 w-4" />
                Skip
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default function OptimizedQueuePage() {
  const [queuedLeads, setQueuedLeads] = useState<QueuedLead[]>(generateMockQueue(20));
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"waitTime" | "score" | "priority">("waitTime");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLive, setIsLive] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<QueuedLead[]>([]);
  const notificationTimeoutRef = useRef<NodeJS.Timeout>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Simulate new leads
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        const newLead = generateMockQueue(1)[0];
        setQueuedLeads((prev) => [newLead, ...prev]);
        showNotification(newLead);
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const showNotification = (lead: QueuedLead) => {
    setNotifications((prev) => [...prev, lead]);
    
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setNotifications([]);
    }, 5000);
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setQueuedLeads((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleLeadAction = (action: string, lead: QueuedLead) => {
    if (action === "skip") {
      setQueuedLeads((prev) => prev.filter((l) => l.id !== lead.id));
    }
    // Handle other actions
  };

  const filteredLeads = queuedLeads.filter((lead) => {
    if (priorityFilter !== "all" && lead.priority !== priorityFilter) return false;
    if (searchQuery && !`${lead.firstName} ${lead.lastName} ${lead.company}`.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "waitTime":
        comparison = a.waitTime - b.waitTime;
        break;
      case "score":
        comparison = a.score - b.score;
        break;
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Calculate metrics
  const metrics = {
    totalInQueue: queuedLeads.length,
    avgWaitTime: Math.round(queuedLeads.reduce((sum, lead) => sum + lead.waitTime, 0) / queuedLeads.length),
    slaAtRisk: queuedLeads.filter(lead => lead.waitTime > 20).length,
    escalated: queuedLeads.filter(lead => lead.priority === "high" && lead.waitTime > 30).length,
  };

  return (
    <div className="layout-page-container">
      {/* Page Header */}
      <div className="layout-page-header">
        <div>
          <h1 className="layout-page-title">Lead Queue</h1>
          <p className="layout-page-subtitle">
            Real-time queue management workspace
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn("data-queue-live", isLive && "data-queue-live-active")}>
            <div className={cn("data-queue-live-dot", isLive ? "data-queue-live-dot-active" : "data-queue-live-dot-inactive")} />
            <span>{isLive ? "Live" : "Offline"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={isLive}
              onCheckedChange={setIsLive}
              id="realtime"
            />
            <Label htmlFor="realtime" className="text-sm">
              Real-time
            </Label>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Compact Stats */}
      <div className="layout-queue-stats">
        <div className="data-queue-stat">
          <Users className="data-queue-icon" />
          <div className="data-queue-number">{metrics.totalInQueue}</div>
          <div className="data-queue-label">In Queue</div>
        </div>
        <div className="data-queue-stat">
          <Clock className="data-queue-icon" />
          <div className="data-queue-number">{metrics.avgWaitTime}m</div>
          <div className="data-queue-label">Avg Wait</div>
        </div>
        <div className="data-queue-stat">
          <AlertTriangle className="data-queue-icon" />
          <div className="data-queue-number">{metrics.slaAtRisk}</div>
          <div className="data-queue-label">At Risk</div>
        </div>
        <div className="data-queue-stat">
          <ArrowUp className="data-queue-icon" />
          <div className="data-queue-number">{metrics.escalated}</div>
          <div className="data-queue-label">Escalated</div>
        </div>
      </div>

      {/* Queue Container */}
      <div className="layout-queue-container">
        <div className="layout-queue-header">
          <h2 className="layout-queue-title">Queue Management</h2>
          <div className="layout-queue-filters">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="data-queue-search pl-9"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="data-queue-select">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="data-queue-select">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waitTime">Wait Time</SelectItem>
                <SelectItem value="score">Score</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="h-8 w-8 p-0"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="layout-queue-scroll">
          {sortedLeads.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortedLeads.map((lead) => lead.id)}
                strategy={verticalListSortingStrategy}
              >
                {sortedLeads.map((lead) => (
                  <SortableQueueItem
                    key={lead.id}
                    lead={lead}
                    onAction={handleLeadAction}
                  />
                ))}
              </SortableContext>
              <DragOverlay>
                {activeId ? (
                  <div className="opacity-50">
                    {/* Render dragging item */}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <div className="data-queue-empty">
              <Users className="data-queue-empty-icon" />
              <p className="text-base font-medium">No leads in queue</p>
              <p className="text-sm text-muted-foreground">New leads will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      {notifications.map((lead, index) => (
        <div
          key={lead.id}
          className="data-queue-notification"
          style={{ top: `${80 + index * 80}px` }}
        >
          <div className="data-queue-notification-header">
            <Bell className="data-queue-notification-icon" />
            <span className="data-queue-notification-title">New Lead!</span>
          </div>
          <div className="data-queue-notification-body">
            {lead.firstName} {lead.lastName} from {lead.company}
          </div>
        </div>
      ))}
    </div>
  );
}