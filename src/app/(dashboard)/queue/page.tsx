"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { useAuthStore } from "@/stores/authStore";
import { io, Socket } from "socket.io-client";
import {
  User,
  Clock,
  AlertTriangle,
  Target,
  BarChart3,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Settings,
  Phone,
  Mail,
  MessageSquare,
  Building,
  Calendar,
  TrendingUp,
  Users,
  Zap,
  Timer,
  Play,
  Pause,
  SkipForward,
  ChevronRight,
  RefreshCw,
  Eye,
  Bot,
  Brain,
  Sparkles,
  Shield,
  ArrowUp,
  ArrowDown,
  Grip,
  GripVertical,
  Move,
  MoreVertical,
  Check,
  X,
  Info,
  Bell,
  Activity,
  Layers,
  Route,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AdvancedQueueManager } from "@/components/advanced-queue-manager";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";

interface QueuedLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  score: number;
  status: string;
  priority: "high" | "medium" | "low";
  assignedTo?: string;
  waitTime: number;
  lastActivity: string;
  source: string;
  tags: string[];
  engagementScore: number;
  responseTime?: number;
  qualificationData?: any;
  nextAction?: string;
  scheduledTime?: string;
  attempts: number;
  notes?: string;
}

interface EscalationRule {
  id: string;
  name: string;
  description: string;
  condition: "wait_time" | "attempts" | "score" | "priority" | "custom";
  threshold: number;
  action: "reassign" | "notify" | "prioritize" | "auto_respond";
  targetTeam?: string;
  targetUser?: string;
  message?: string;
  enabled: boolean;
  lastTriggered?: string;
  triggerCount: number;
}

interface QueueMetrics {
  totalInQueue: number;
  avgWaitTime: number;
  avgResponseTime: number;
  escalated: number;
  completed: number;
  abandoned: number;
  sla: {
    met: number;
    breached: number;
    atRisk: number;
  };
}

function SortableItem({
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
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getWaitTimeColor = (minutes: number) => {
    if (minutes > 30) return "text-red-600";
    if (minutes > 15) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "border rounded-lg p-4 mb-3 bg-white hover:shadow-md transition-all",
        isDragging && "shadow-lg",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="mt-1 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">
                  {lead.firstName} {lead.lastName}
                </h3>
                <Badge
                  className={cn("text-xs", getPriorityColor(lead.priority))}
                >
                  {lead.priority.toUpperCase()}
                </Badge>
                <span
                  className={cn(
                    "text-sm font-medium",
                    getWaitTimeColor(lead.waitTime),
                  )}
                >
                  {lead.waitTime}m wait
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onAction("escalate", lead)}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Escalate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAction("skip", lead)}>
                    <SkipForward className="mr-2 h-4 w-4" />
                    Skip
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                {lead.company}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {lead.email}
              </div>
              {lead.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {lead.phone}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                Score: {lead.score}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {lead.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {lead.attempts > 0 && (
                <span className="text-xs text-muted-foreground">
                  {lead.attempts} attempts
                </span>
              )}
              {lead.nextAction && (
                <span className="text-xs text-blue-600">
                  Next: {lead.nextAction}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QueuePage() {
  const { token, user } = useAuthStore();
  const [queuedLeads, setQueuedLeads] = useState<QueuedLead[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [newLeadNotifications, setNewLeadNotifications] = useState<
    QueuedLead[]
  >([]);
  const [metrics, setMetrics] = useState<QueueMetrics>({
    totalInQueue: 0,
    avgWaitTime: 0,
    avgResponseTime: 0,
    escalated: 0,
    completed: 0,
    abandoned: 0,
    sla: { met: 0, breached: 0, atRisk: 0 },
  });
  const [filters, setFilters] = useState({
    priority: "all",
    assignee: "all",
    source: "all",
    waitTime: "all",
    search: "",
  });
  const [sortBy, setSortBy] = useState<"waitTime" | "score" | "priority">(
    "waitTime",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showEscalationDialog, setShowEscalationDialog] = useState(false);
  const [newRule, setNewRule] = useState<Partial<EscalationRule>>({
    name: "",
    description: "",
    condition: "wait_time",
    threshold: 30,
    action: "notify",
    enabled: true,
  });
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showAdvancedView, setShowAdvancedView] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const notificationTimeoutRef = useRef<NodeJS.Timeout>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    // Initialize WebSocket connection
    if (realtimeEnabled) {
      const socketInstance = io(WS_URL, {
        transports: ["websocket"],
        auth: { token },
      });

      socketInstance.on("connect", () => {
        // Logging removed for production
        setIsConnected(true);
        socketInstance.emit("join_queue", { userId: user?.id });
      });

      socketInstance.on("disconnect", () => {
        // Logging removed for production
        setIsConnected(false);
      });

      socketInstance.on("new_lead", (lead: QueuedLead) => {
        setQueuedLeads((prev) => [lead, ...prev]);
        setNewLeadNotifications((prev) => [...prev, lead]);

        // Clear notification after 5 seconds
        if (notificationTimeoutRef.current) {
          clearTimeout(notificationTimeoutRef.current);
        }
        notificationTimeoutRef.current = setTimeout(() => {
          setNewLeadNotifications([]);
        }, 5000);

        // Update metrics
        setMetrics((prev) => ({
          ...prev,
          totalInQueue: prev.totalInQueue + 1,
        }));
      });

      socketInstance.on("lead_updated", (updatedLead: QueuedLead) => {
        setQueuedLeads((prev) =>
          prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)),
        );
      });

      socketInstance.on("lead_removed", (leadId: string) => {
        setQueuedLeads((prev) => prev.filter((lead) => lead.id !== leadId));
        setMetrics((prev) => ({
          ...prev,
          totalInQueue: Math.max(0, prev.totalInQueue - 1),
          completed: prev.completed + 1,
        }));
      });

      socketInstance.on(
        "metrics_update",
        (newMetrics: Partial<QueueMetrics>) => {
          setMetrics((prev) => ({ ...prev, ...newMetrics }));
        },
      );

      socketInstance.on(
        "escalation_triggered",
        (data: { lead: QueuedLead; rule: EscalationRule }) => {
          // Logging removed for production
          // Update the lead's priority or assignment
          setQueuedLeads((prev) =>
            prev.map((lead) =>
              lead.id === data.lead.id
                ? { ...lead, priority: "high", waitTime: data.lead.waitTime }
                : lead,
            ),
          );
        },
      );

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      // Load mock data as fallback
      const mockLeads: QueuedLead[] = [
        {
          id: "1",
          firstName: "Sarah",
          lastName: "Johnson",
          email: "sarah.johnson@techcorp.com",
          phone: "+1-415-555-0123",
          company: "TechCorp Solutions",
          jobTitle: "VP of Sales",
          score: 95,
          status: "QUALIFIED",
          priority: "high",
          assignedTo: user?.email,
          waitTime: 45,
          lastActivity: new Date(Date.now() - 45 * 60000).toISOString(),
          source: "Website Demo Request",
          tags: ["Enterprise", "Hot Lead", "Decision Maker"],
          engagementScore: 92,
          responseTime: 5,
          attempts: 2,
          nextAction: "Demo call scheduled",
          scheduledTime: new Date(Date.now() + 3600000).toISOString(),
        },
        {
          id: "2",
          firstName: "Michael",
          lastName: "Chen",
          email: "mchen@innovate.io",
          phone: "+1-408-555-0456",
          company: "Innovate.io",
          jobTitle: "CTO",
          score: 88,
          status: "CONTACTED",
          priority: "high",
          assignedTo: user?.email,
          waitTime: 32,
          lastActivity: new Date(Date.now() - 32 * 60000).toISOString(),
          source: "LinkedIn Outreach",
          tags: ["Tech Stack Fit", "Budget Confirmed"],
          engagementScore: 85,
          responseTime: 8,
          attempts: 1,
          nextAction: "Follow-up email",
        },
        {
          id: "3",
          firstName: "Emily",
          lastName: "Rodriguez",
          email: "emily.r@growthco.com",
          phone: "+1-650-555-0789",
          company: "GrowthCo",
          jobTitle: "Head of Operations",
          score: 78,
          status: "NEW",
          priority: "medium",
          waitTime: 22,
          lastActivity: new Date(Date.now() - 22 * 60000).toISOString(),
          source: "Webinar Attendee",
          tags: ["Mid-Market", "Q1 Timeline"],
          engagementScore: 72,
          attempts: 0,
          nextAction: "Initial outreach",
        },
        {
          id: "4",
          firstName: "David",
          lastName: "Thompson",
          email: "dthompson@enterprise.com",
          phone: "+1-212-555-0234",
          company: "Enterprise Corp",
          jobTitle: "Procurement Manager",
          score: 65,
          status: "NEW",
          priority: "medium",
          waitTime: 18,
          lastActivity: new Date(Date.now() - 18 * 60000).toISOString(),
          source: "Trade Show",
          tags: ["Enterprise", "Long Sales Cycle"],
          engagementScore: 60,
          attempts: 0,
        },
        {
          id: "5",
          firstName: "Lisa",
          lastName: "Wang",
          email: "lwang@startup.tech",
          phone: "+1-510-555-0567",
          company: "StartupTech",
          jobTitle: "CEO",
          score: 72,
          status: "CONTACTED",
          priority: "low",
          waitTime: 12,
          lastActivity: new Date(Date.now() - 12 * 60000).toISOString(),
          source: "Referral",
          tags: ["Startup", "Limited Budget"],
          engagementScore: 68,
          responseTime: 15,
          attempts: 1,
        },
      ];

      const mockRules: EscalationRule[] = [
        {
          id: "1",
          name: "High Priority Wait Time",
          description: "Escalate high priority leads waiting over 30 minutes",
          condition: "wait_time",
          threshold: 30,
          action: "notify",
          targetTeam: "Senior Sales",
          enabled: true,
          lastTriggered: new Date(Date.now() - 3600000).toISOString(),
          triggerCount: 5,
        },
        {
          id: "2",
          name: "Multiple Failed Attempts",
          description: "Reassign after 3 failed contact attempts",
          condition: "attempts",
          threshold: 3,
          action: "reassign",
          targetUser: "manager@company.com",
          enabled: true,
          triggerCount: 2,
        },
        {
          id: "3",
          name: "VIP Auto Response",
          description: "Send automated response to VIP leads",
          condition: "score",
          threshold: 90,
          action: "auto_respond",
          message:
            "Thank you for your interest. A senior account executive will contact you within 15 minutes.",
          enabled: false,
          triggerCount: 0,
        },
      ];

      setQueuedLeads(mockLeads);
      setEscalationRules(mockRules);

      // Update metrics
      setMetrics({
        totalInQueue: mockLeads.length,
        avgWaitTime: Math.round(
          mockLeads.reduce((sum, lead) => sum + lead.waitTime, 0) /
            mockLeads.length,
        ),
        avgResponseTime: 8.5,
        escalated: 5,
        completed: 127,
        abandoned: 3,
        sla: { met: 115, breached: 8, atRisk: 4 },
      });
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, realtimeEnabled, token]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        // Simulate real-time updates
        setQueuedLeads((prev) =>
          prev.map((lead) => ({
            ...lead,
            waitTime: lead.waitTime + 1,
          })),
        );

        // Check escalation rules
        checkEscalationRules();
      }, 60000); // Update every minute
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh]);

  const checkEscalationRules = () => {
    escalationRules.forEach((rule) => {
      if (!rule.enabled) return;

      queuedLeads.forEach((lead) => {
        let shouldEscalate = false;

        switch (rule.condition) {
          case "wait_time":
            shouldEscalate = lead.waitTime >= rule.threshold;
            break;
          case "attempts":
            shouldEscalate = lead.attempts >= rule.threshold;
            break;
          case "score":
            shouldEscalate = lead.score >= rule.threshold;
            break;
          case "priority":
            shouldEscalate =
              lead.priority === "high" && lead.waitTime >= rule.threshold;
            break;
        }

        if (shouldEscalate) {
          handleEscalation(lead, rule);
        }
      });
    });
  };

  const handleEscalation = (lead: QueuedLead, rule: EscalationRule) => {
    // Simulate escalation action
    // Logging removed for production

    switch (rule.action) {
      case "notify":
        // Send notification
        break;
      case "reassign":
        // Reassign lead
        break;
      case "prioritize":
        // Increase priority
        break;
      case "auto_respond":
        // Send automated response
        break;
    }
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
    // Logging removed for production

    // Emit action to server
    if (socket && socket.connected) {
      socket.emit("lead_action", {
        action,
        leadId: lead.id,
        userId: user?.id,
        timestamp: new Date().toISOString(),
      });
    }

    // Optimistic update
    switch (action) {
      case "contact":
        setQueuedLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id ? { ...l, status: "contacting" } : l,
          ),
        );
        break;
      case "skip":
        setQueuedLeads((prev) => prev.filter((l) => l.id !== lead.id));
        break;
      case "escalate":
        setQueuedLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, priority: "high" } : l)),
        );
        break;
    }
  };

  const createEscalationRule = () => {
    const rule: EscalationRule = {
      id: Date.now().toString(),
      name: newRule.name || "",
      description: newRule.description || "",
      condition: newRule.condition || "wait_time",
      threshold: newRule.threshold || 30,
      action: newRule.action || "notify",
      targetTeam: newRule.targetTeam,
      targetUser: newRule.targetUser,
      message: newRule.message,
      enabled: newRule.enabled !== false,
      triggerCount: 0,
    };

    setEscalationRules([...escalationRules, rule]);
    setShowEscalationDialog(false);
    setNewRule({
      name: "",
      description: "",
      condition: "wait_time",
      threshold: 30,
      action: "notify",
      enabled: true,
    });
  };

  const filteredLeads = queuedLeads.filter((lead) => {
    if (filters.priority !== "all" && lead.priority !== filters.priority)
      return false;
    if (filters.source !== "all" && lead.source !== filters.source)
      return false;
    if (filters.waitTime !== "all") {
      const waitTimeFilter = parseInt(filters.waitTime);
      if (lead.waitTime < waitTimeFilter) return false;
    }
    if (
      filters.search &&
      !`${lead.firstName} ${lead.lastName} ${lead.company} ${lead.email}`
        .toLowerCase()
        .includes(filters.search.toLowerCase())
    ) {
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Lead Queue</h1>
          <p className="text-muted-foreground">
            Manage and prioritize your lead queue with automated escalation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                isConnected ? "bg-green-500" : "bg-red-500",
              )}
            />
            <span className="text-sm font-medium">
              {isConnected ? "Live" : "Offline"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={realtimeEnabled}
              onCheckedChange={setRealtimeEnabled}
              id="realtime"
            />
            <Label htmlFor="realtime" className="text-sm">
              Real-time updates
            </Label>
          </div>

          <Button
            variant={showAdvancedView ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAdvancedView(!showAdvancedView)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Advanced View
          </Button>

          <div className="flex items-center gap-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              id="auto-refresh"
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto-refresh
            </Label>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => socket?.emit("refresh_queue")}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Dialog
            open={showEscalationDialog}
            onOpenChange={setShowEscalationDialog}
          >
            <DialogTrigger asChild>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Escalation Rules
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Manage Escalation Rules</DialogTitle>
                <DialogDescription>
                  Configure automated escalation rules for your lead queue
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="rules" className="mt-4">
                <TabsList>
                  <TabsTrigger value="rules">Active Rules</TabsTrigger>
                  <TabsTrigger value="create">Create Rule</TabsTrigger>
                </TabsList>

                <TabsContent value="rules" className="space-y-4">
                  {escalationRules.map((rule) => (
                    <Card key={rule.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{rule.name}</h4>
                              <Badge
                                variant={rule.enabled ? "default" : "secondary"}
                              >
                                {rule.enabled ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {rule.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span>
                                Condition: {rule.condition.replace("_", " ")}
                              </span>
                              <span>Threshold: {rule.threshold}</span>
                              <span>
                                Action: {rule.action.replace("_", " ")}
                              </span>
                              {rule.triggerCount > 0 && (
                                <span className="text-muted-foreground">
                                  Triggered {rule.triggerCount} times
                                </span>
                              )}
                            </div>
                          </div>
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={(checked) => {
                              setEscalationRules((prev) =>
                                prev.map((r) =>
                                  r.id === rule.id
                                    ? { ...r, enabled: checked }
                                    : r,
                                ),
                              );
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="create" className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input
                        id="rule-name"
                        value={newRule.name}
                        onChange={(e) =>
                          setNewRule({ ...newRule, name: e.target.value })
                        }
                        placeholder="e.g., High Priority Escalation"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rule-desc">Description</Label>
                      <Input
                        id="rule-desc"
                        value={newRule.description}
                        onChange={(e) =>
                          setNewRule({
                            ...newRule,
                            description: e.target.value,
                          })
                        }
                        placeholder="Brief description of the rule"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select
                          value={newRule.condition}
                          onValueChange={(value: any) =>
                            setNewRule({ ...newRule, condition: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wait_time">Wait Time</SelectItem>
                            <SelectItem value="attempts">
                              Contact Attempts
                            </SelectItem>
                            <SelectItem value="score">Lead Score</SelectItem>
                            <SelectItem value="priority">
                              Priority Level
                            </SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="threshold">Threshold</Label>
                        <Input
                          id="threshold"
                          type="number"
                          value={newRule.threshold}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              threshold: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="action">Action</Label>
                      <Select
                        value={newRule.action}
                        onValueChange={(value: any) =>
                          setNewRule({ ...newRule, action: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notify">
                            Send Notification
                          </SelectItem>
                          <SelectItem value="reassign">
                            Reassign Lead
                          </SelectItem>
                          <SelectItem value="prioritize">
                            Increase Priority
                          </SelectItem>
                          <SelectItem value="auto_respond">
                            Auto Respond
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={createEscalationRule}>Create Rule</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* New Lead Notifications */}
      {newLeadNotifications.length > 0 && (
        <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
          {newLeadNotifications.map((lead) => (
            <Alert
              key={lead.id}
              className="bg-green-50 border-green-200 animate-slide-in"
            >
              <Bell className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Lead Captured!</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.firstName} {lead.lastName} from {lead.company}
                    </p>
                  </div>
                  <Badge
                    className={
                      lead.priority === "high" ? "bg-red-500" : "bg-blue-500"
                    }
                  >
                    {lead.priority}
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Show either advanced view or regular view */}
      {showAdvancedView ? (
        <AdvancedQueueManager
          queueItems={queuedLeads.map((lead) => ({
            id: lead.id,
            leadId: lead.id,
            leadName: `${lead.firstName} ${lead.lastName}`,
            company: lead.company,
            priority: lead.priority,
            status: "waiting" as const,
            assignedTo: lead.assignedTo,
            enqueuedAt: new Date(
              Date.now() - lead.waitTime * 60000,
            ).toISOString(),
            waitTime: lead.waitTime,
            channel:
              lead.source === "Website"
                ? "web"
                : lead.source === "Email"
                  ? "email"
                  : ("phone" as any),
            reason: "Lead qualification",
            tags: lead.tags || [],
            slaStatus:
              lead.waitTime > 30
                ? "breached"
                : lead.waitTime > 20
                  ? "at_risk"
                  : ("on_track" as any),
            escalationLevel: 0,
          }))}
          onQueueUpdate={(items) => {
            // Update queue items based on advanced manager changes
            console.log("Queue updated:", items);
          }}
          onEscalation={(item, rule) => {
            console.log("Escalation triggered:", item, rule);
          }}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total in Queue
                    </p>
                    <p className="text-2xl font-bold">{metrics.totalInQueue}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Wait Time
                    </p>
                    <p className="text-2xl font-bold">{metrics.avgWaitTime}m</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">SLA At Risk</p>
                    <p className="text-2xl font-bold">{metrics.sla.atRisk}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Escalated Today
                    </p>
                    <p className="text-2xl font-bold">{metrics.escalated}</p>
                  </div>
                  <ArrowUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Queue Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search leads..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="w-64"
                  />

                  <Select
                    value={filters.priority}
                    onValueChange={(value) =>
                      setFilters({ ...filters, priority: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={sortBy}
                    onValueChange={(value: any) => setSortBy(value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="waitTime">Wait Time</SelectItem>
                      <SelectItem value="score">Lead Score</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
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
                      <SortableItem
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
              </ScrollArea>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
