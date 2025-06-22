"use client";

import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  TrendingUp,
  Globe,
  Clock,
  Calendar,
  MousePointer,
  Eye,
  Download,
  FileText,
  Play,
  ShoppingCart,
  Search,
  Mail,
  Phone,
  MessageSquare,
  Target,
  Zap,
  Brain,
  BarChart3,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle,
  Timer,
  Route,
  Link,
  Hash,
  Video,
  Book,
  ArrowUp,
  Code,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface BehaviorEvent {
  id: string;
  leadId: string;
  type:
    | "page_view"
    | "click"
    | "form_submit"
    | "download"
    | "video_watch"
    | "search"
    | "cart_add"
    | "checkout";
  page: string;
  timestamp: string;
  duration?: number;
  metadata?: {
    element?: string;
    value?: string;
    referrer?: string;
    device?: string;
    location?: string;
  };
  score: number;
}

interface ScoringRule {
  id: string;
  name: string;
  description: string;
  eventType: string;
  conditions: {
    field: string;
    operator: string;
    value: any;
  }[];
  points: number;
  maxOccurrences?: number;
  decayRate?: number;
  enabled: boolean;
}

interface LeadBehavior {
  leadId: string;
  leadName: string;
  company: string;
  totalScore: number;
  scoreChange: number;
  lastActive: string;
  events: BehaviorEvent[];
  engagement: {
    pageViews: number;
    totalDuration: number;
    downloads: number;
    formSubmissions: number;
    videoWatches: number;
    searches: number;
  };
  interests: {
    category: string;
    score: number;
  }[];
  buyingStage: "awareness" | "consideration" | "decision" | "purchase";
}

interface BehavioralScoringProps {
  leads?: LeadBehavior[];
  onScoreUpdate?: (leadId: string, score: number) => void;
  className?: string;
}

export function BehavioralScoring({
  leads = [],
  onScoreUpdate,
  className,
}: BehavioralScoringProps) {
  const [selectedLead, setSelectedLead] = useState<LeadBehavior | null>(null);
  const [scoringRules, setScoringRules] = useState<ScoringRule[]>([]);
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<ScoringRule | null>(null);
  const [timeRange, setTimeRange] = useState("7d");
  const [showTrackingCode, setShowTrackingCode] = useState(false);

  useEffect(() => {
    // Load default scoring rules
    const defaultRules: ScoringRule[] = [
      {
        id: "1",
        name: "High-Value Page Visit",
        description: "Award points for visiting pricing or demo pages",
        eventType: "page_view",
        conditions: [
          { field: "page", operator: "contains", value: "/pricing" },
          { field: "page", operator: "contains", value: "/demo" },
        ],
        points: 10,
        maxOccurrences: 3,
        enabled: true,
      },
      {
        id: "2",
        name: "Content Download",
        description: "Award points for downloading resources",
        eventType: "download",
        conditions: [],
        points: 15,
        enabled: true,
      },
      {
        id: "3",
        name: "Form Submission",
        description: "High points for form submissions",
        eventType: "form_submit",
        conditions: [],
        points: 25,
        maxOccurrences: 2,
        enabled: true,
      },
      {
        id: "4",
        name: "Video Engagement",
        description: "Points based on video watch time",
        eventType: "video_watch",
        conditions: [
          { field: "duration", operator: "greater_than", value: 30 },
        ],
        points: 5,
        enabled: true,
      },
      {
        id: "5",
        name: "Cart Addition",
        description: "Strong buying signal",
        eventType: "cart_add",
        conditions: [],
        points: 30,
        enabled: true,
      },
      {
        id: "6",
        name: "Repeat Visitor",
        description: "Points for returning to site",
        eventType: "page_view",
        conditions: [
          { field: "metadata.repeat_visitor", operator: "equals", value: true },
        ],
        points: 5,
        decayRate: 0.8,
        enabled: true,
      },
    ];
    setScoringRules(defaultRules);

    // Generate mock behavioral data
    if (leads.length === 0) {
      generateMockData();
    }
  }, [leads.length]);

  const generateMockData = () => {
    // Mock data would be generated here
    // In real implementation, this would come from website tracking
  };

  const calculateLeadScore = (events: BehaviorEvent[]): number => {
    let score = 0;
    const ruleApplications: Record<string, number> = {};

    events.forEach((event) => {
      scoringRules.forEach((rule) => {
        if (!rule.enabled || rule.eventType !== event.type) return;

        // Check conditions
        const conditionsMet =
          rule.conditions.length === 0 ||
          rule.conditions.every((condition) => {
            const fieldValue = condition.field.includes(".")
              ? condition.field
                  .split(".")
                  .reduce((obj: any, key) => obj?.[key], event)
              : (event as any)[condition.field];

            switch (condition.operator) {
              case "equals":
                return fieldValue === condition.value;
              case "contains":
                return String(fieldValue).includes(condition.value);
              case "greater_than":
                return Number(fieldValue) > Number(condition.value);
              case "less_than":
                return Number(fieldValue) < Number(condition.value);
              default:
                return true;
            }
          });

        if (conditionsMet) {
          // Check max occurrences
          ruleApplications[rule.id] = (ruleApplications[rule.id] || 0) + 1;
          const ruleCount = ruleApplications[rule.id] || 0;
          if (!rule.maxOccurrences || ruleCount <= rule.maxOccurrences) {
            // Apply decay if specified
            const decay = rule.decayRate
              ? Math.pow(rule.decayRate, ruleCount - 1)
              : 1;
            score += rule.points * decay;
          }
        }
      });
    });

    return Math.round(score);
  };

  const getBuyingStage = (behavior: LeadBehavior): string => {
    const { engagement, totalScore } = behavior;

    if (engagement.formSubmissions > 0 || engagement.downloads > 2) {
      return "decision";
    } else if (totalScore > 50 || engagement.videoWatches > 0) {
      return "consideration";
    } else if (engagement.pageViews > 5) {
      return "awareness";
    }
    return "awareness";
  };

  const getEngagementTrend = (events: BehaviorEvent[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: format(date, "MMM dd"),
        score: 0,
        events: 0,
      };
    });

    events.forEach((event) => {
      const eventDate = new Date(event.timestamp);
      const dayIndex = last7Days.findIndex(
        (day) => format(eventDate, "MMM dd") === day.date,
      );
      if (dayIndex !== -1 && last7Days[dayIndex]) {
        last7Days[dayIndex].score += event.score;
        last7Days[dayIndex].events += 1;
      }
    });

    return last7Days;
  };

  const mockLeadBehaviors: LeadBehavior[] = [
    {
      leadId: "1",
      leadName: "Sarah Johnson",
      company: "TechCorp Solutions",
      totalScore: 125,
      scoreChange: 15,
      lastActive: new Date(Date.now() - 3600000).toISOString(),
      events: [
        {
          id: "1",
          leadId: "1",
          type: "page_view",
          page: "/pricing",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          duration: 180,
          metadata: { device: "desktop", location: "San Francisco, CA" },
          score: 10,
        },
        {
          id: "2",
          leadId: "1",
          type: "download",
          page: "/resources/enterprise-guide",
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          metadata: { element: "Enterprise Guide PDF" },
          score: 15,
        },
        {
          id: "3",
          leadId: "1",
          type: "video_watch",
          page: "/demo",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          duration: 240,
          metadata: { element: "Product Demo Video" },
          score: 20,
        },
      ],
      engagement: {
        pageViews: 12,
        totalDuration: 1840,
        downloads: 2,
        formSubmissions: 1,
        videoWatches: 3,
        searches: 5,
      },
      interests: [
        { category: "Enterprise Features", score: 45 },
        { category: "Security", score: 30 },
        { category: "Integrations", score: 25 },
      ],
      buyingStage: "consideration",
    },
    {
      leadId: "2",
      leadName: "Michael Chen",
      company: "StartupHub",
      totalScore: 65,
      scoreChange: -5,
      lastActive: new Date(Date.now() - 172800000).toISOString(),
      events: [],
      engagement: {
        pageViews: 8,
        totalDuration: 560,
        downloads: 0,
        formSubmissions: 0,
        videoWatches: 1,
        searches: 2,
      },
      interests: [
        { category: "Pricing", score: 60 },
        { category: "Features", score: 40 },
      ],
      buyingStage: "awareness",
    },
  ];

  const generateTrackingCode = () => {
    return `<!-- Mohit AI Behavioral Tracking -->
<script>
(function() {
  var MohitAI = window.MohitAI || {};
  MohitAI.track = function(event, data) {
    fetch('https://api.mohitai.com/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: MohitAI.leadId,
        event: event,
        data: data,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer
      })
    });
  };
  
  // Auto-track page views
  MohitAI.track('page_view', {
    title: document.title,
    duration: 0
  });
  
  // Track link clicks
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      MohitAI.track('click', {
        element: e.target.textContent,
        href: e.target.href
      });
    }
  });
  
  // Track form submissions
  document.addEventListener('submit', function(e) {
    MohitAI.track('form_submit', {
      formId: e.target.id,
      formName: e.target.name
    });
  });
  
  window.MohitAI = MohitAI;
})();
</script>`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <CardTitle>Behavioral Scoring & Website Tracking</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTrackingCode(true)}
              >
                <Code className="h-4 w-4 mr-2" />
                Get Tracking Code
              </Button>
              <Button size="sm" onClick={() => setShowRuleDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
          </div>
          <CardDescription>
            Track and score lead behavior across your website to identify buying
            intent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leads">Lead Activity</TabsTrigger>
              <TabsTrigger value="rules">Scoring Rules</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Active Visitors</CardDescription>
                    <CardTitle className="text-2xl">24</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      +12% from yesterday
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Avg. Engagement Score</CardDescription>
                    <CardTitle className="text-2xl">78</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={78} className="h-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Hot Leads</CardDescription>
                    <CardTitle className="text-2xl">8</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Score &gt; 100
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Conversion Events</CardDescription>
                    <CardTitle className="text-2xl">142</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      This week
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={getEngagementTrend(
                        mockLeadBehaviors[0]?.events || [],
                      )}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="events"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leads" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Top Interests</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLeadBehaviors.map((lead) => (
                      <TableRow key={lead.leadId} className="cursor-pointer">
                        <TableCell className="font-medium">
                          {lead.leadName}
                        </TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {lead.totalScore}
                            </span>
                            {lead.scoreChange !== 0 && (
                              <Badge
                                variant={
                                  lead.scoreChange > 0 ? "default" : "secondary"
                                }
                                className="text-xs"
                              >
                                {lead.scoreChange > 0 ? "+" : ""}
                                {lead.scoreChange}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {lead.buyingStage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(lead.lastActive), {
                            addSuffix: true,
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {lead.interests.slice(0, 2).map((interest, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {interest.category}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedLead(lead)}
                          >
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <div className="space-y-3">
                {scoringRules.map((rule) => (
                  <Card
                    key={rule.id}
                    className={cn("border", !rule.enabled && "opacity-60")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{rule.name}</h4>
                            <Badge variant="outline">
                              +{rule.points} points
                            </Badge>
                            {rule.maxOccurrences && (
                              <Badge variant="secondary">
                                Max {rule.maxOccurrences}x
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {rule.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="default" className="text-xs">
                              {rule.eventType}
                            </Badge>
                            {rule.conditions.map((condition, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {condition.field} {condition.operator}{" "}
                                {condition.value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={(checked) => {
                              setScoringRules((rules) =>
                                rules.map((r) =>
                                  r.id === rule.id
                                    ? { ...r, enabled: checked }
                                    : r,
                                ),
                              );
                            }}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditingRule(rule);
                              setShowRuleDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setScoringRules((rules) =>
                                rules.filter((r) => r.id !== rule.id),
                              );
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Buying Stage Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Awareness", value: 45, color: "#8884d8" },
                            {
                              name: "Consideration",
                              value: 30,
                              color: "#82ca9d",
                            },
                            { name: "Decision", value: 20, color: "#ffc658" },
                            { name: "Purchase", value: 5, color: "#ff7c7c" },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {[
                            { name: "Awareness", value: 45, color: "#8884d8" },
                            {
                              name: "Consideration",
                              value: 30,
                              color: "#82ca9d",
                            },
                            { name: "Decision", value: 20, color: "#ffc658" },
                            { name: "Purchase", value: 5, color: "#ff7c7c" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Top Performing Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Enterprise Guide</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">245 views</Badge>
                          <span className="text-sm font-semibold">
                            +18 pts avg
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Product Demo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">189 views</Badge>
                          <span className="text-sm font-semibold">
                            +25 pts avg
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Pricing Page</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">432 views</Badge>
                          <span className="text-sm font-semibold">
                            +12 pts avg
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Behavioral Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      <strong>High Intent Pattern Detected:</strong> 68% of
                      leads who view pricing after watching the demo video
                      convert within 7 days.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Brain className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Content Recommendation:</strong> Leads interested
                      in security features have 3x higher engagement with
                      compliance whitepapers.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Target className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Optimal Follow-up Time:</strong> Leads are most
                      responsive to outreach within 2 hours of downloading
                      content.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Lead Detail Dialog */}
      {selectedLead && (
        <Dialog
          open={!!selectedLead}
          onOpenChange={() => setSelectedLead(null)}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>
                {selectedLead.leadName} - Behavioral Profile
              </DialogTitle>
              <DialogDescription>
                {selectedLead.company} • Score: {selectedLead.totalScore}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Buying Stage</Label>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {selectedLead.buyingStage}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Active</Label>
                  <p className="mt-1 text-sm">
                    {formatDistanceToNow(new Date(selectedLead.lastActive), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-2">
                  Engagement Summary
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Card>
                    <CardContent className="p-3 text-center">
                      <Eye className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-2xl font-bold">
                        {selectedLead.engagement.pageViews}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Page Views
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <Download className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-2xl font-bold">
                        {selectedLead.engagement.downloads}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Downloads
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-2xl font-bold">
                        {Math.round(selectedLead.engagement.totalDuration / 60)}
                        m
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Time on Site
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-2">
                  Interest Areas
                </Label>
                <div className="space-y-2">
                  {selectedLead.interests.map((interest, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{interest.category}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={interest.score} className="w-24 h-2" />
                        <span className="text-sm text-muted-foreground">
                          {interest.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-2">
                  Recent Activity
                </Label>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {selectedLead.events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50"
                      >
                        <div className="mt-0.5">
                          {event.type === "page_view" && (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          {event.type === "download" && (
                            <Download className="h-4 w-4 text-green-500" />
                          )}
                          {event.type === "video_watch" && (
                            <Video className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {event.page}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(event.timestamp), {
                              addSuffix: true,
                            })}
                            {event.duration &&
                              ` • ${Math.round(event.duration / 60)}m ${event.duration % 60}s`}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          +{event.score}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Tracking Code Dialog */}
      <Dialog open={showTrackingCode} onOpenChange={setShowTrackingCode}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Website Tracking Code</DialogTitle>
            <DialogDescription>
              Add this code to your website to start tracking visitor behavior
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Place this code in the &lt;head&gt; section of your website on
                all pages you want to track.
              </AlertDescription>
            </Alert>
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
                <code>{generateTrackingCode()}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => {
                  navigator.clipboard.writeText(generateTrackingCode());
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTrackingCode(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rule Editor Dialog */}
      <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingRule ? "Edit Scoring Rule" : "Create Scoring Rule"}
            </DialogTitle>
            <DialogDescription>
              Define how visitor actions translate into engagement scores
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input placeholder="e.g., High-Value Page Visit" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input placeholder="Brief description of this rule" />
            </div>
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="page_view">Page View</SelectItem>
                  <SelectItem value="click">Click</SelectItem>
                  <SelectItem value="form_submit">Form Submit</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                  <SelectItem value="video_watch">Video Watch</SelectItem>
                  <SelectItem value="search">Search</SelectItem>
                  <SelectItem value="cart_add">Add to Cart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Points</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div className="space-y-2">
              <Label>Max Occurrences (Optional)</Label>
              <Input type="number" placeholder="Leave empty for unlimited" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRuleDialog(false);
                setEditingRule(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowRuleDialog(false);
                setEditingRule(null);
              }}
            >
              {editingRule ? "Update" : "Create"} Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
