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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Clock,
  BarChart3,
  Activity,
  Zap,
  Filter,
  Calendar,
  Users,
  ArrowRight,
  ArrowDown,
  AlertCircle,
  Info,
  CheckCircle,
  Timer,
  GitBranch,
  Layers,
  Route,
  Gauge,
  Lightbulb,
  Flag,
  ShieldAlert,
  Sparkles,
  Brain,
  Eye,
  Download,
  Plus,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, differenceInDays, differenceInHours } from "date-fns";
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
  Funnel,
  FunnelChart,
  Sankey,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface StageMetrics {
  stage: string;
  count: number;
  conversionRate: number;
  avgTimeInStage: number;
  dropoffRate: number;
  velocity: number;
  bottleneckScore: number;
}

interface PipelineMetrics {
  totalLeads: number;
  totalRevenue: number;
  avgDealSize: number;
  winRate: number;
  avgCycleTime: number;
  velocity: number;
  stages: StageMetrics[];
}

interface Bottleneck {
  id: string;
  stage: string;
  severity: "critical" | "high" | "medium" | "low";
  type: "velocity" | "conversion" | "volume" | "quality";
  description: string;
  impact: string;
  recommendations: string[];
  metrics: {
    current: number;
    benchmark: number;
    trend: "improving" | "stable" | "worsening";
  };
}

interface CohortAnalysis {
  cohort: string;
  leads: number;
  conversion: number;
  avgCycleTime: number;
  revenue: number;
  stages: {
    [key: string]: {
      reached: number;
      converted: number;
      avgTime: number;
    };
  };
}

interface PipelineAnalyticsProps {
  className?: string;
  onBottleneckSelect?: (bottleneck: Bottleneck) => void;
}

export function PipelineAnalytics({
  className,
  onBottleneckSelect,
}: PipelineAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [bottlenecks, setBottlenecks] = useState<Bottleneck[]>([]);
  const [metrics, setMetrics] = useState<PipelineMetrics>({
    totalLeads: 0,
    totalRevenue: 0,
    avgDealSize: 0,
    winRate: 0,
    avgCycleTime: 0,
    velocity: 0,
    stages: [],
  });
  const [cohortData, setCohortData] = useState<CohortAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    analyzePipeline();
  }, [timeRange]);

  const analyzePipeline = async () => {
    setIsAnalyzing(true);

    // Simulate pipeline analysis
    setTimeout(() => {
      const mockStages: StageMetrics[] = [
        {
          stage: "New",
          count: 450,
          conversionRate: 75,
          avgTimeInStage: 2.5,
          dropoffRate: 25,
          velocity: 180,
          bottleneckScore: 20,
        },
        {
          stage: "Qualified",
          count: 338,
          conversionRate: 65,
          avgTimeInStage: 4.2,
          dropoffRate: 35,
          velocity: 80,
          bottleneckScore: 45,
        },
        {
          stage: "Meeting Scheduled",
          count: 220,
          conversionRate: 80,
          avgTimeInStage: 3.8,
          dropoffRate: 20,
          velocity: 58,
          bottleneckScore: 30,
        },
        {
          stage: "Proposal",
          count: 176,
          conversionRate: 70,
          avgTimeInStage: 7.5,
          dropoffRate: 30,
          velocity: 23,
          bottleneckScore: 75,
        },
        {
          stage: "Negotiation",
          count: 123,
          conversionRate: 85,
          avgTimeInStage: 5.2,
          dropoffRate: 15,
          velocity: 24,
          bottleneckScore: 40,
        },
        {
          stage: "Closed Won",
          count: 105,
          conversionRate: 100,
          avgTimeInStage: 0,
          dropoffRate: 0,
          velocity: 0,
          bottleneckScore: 0,
        },
      ];

      setMetrics({
        totalLeads: 450,
        totalRevenue: 2850000,
        avgDealSize: 27143,
        winRate: 23.3,
        avgCycleTime: 23.2,
        velocity: 122850,
        stages: mockStages,
      });

      // Identify bottlenecks
      const identifiedBottlenecks: Bottleneck[] = [
        {
          id: "1",
          stage: "Proposal",
          severity: "critical",
          type: "velocity",
          description: "Proposals taking 75% longer than target",
          impact: "Reducing monthly revenue by ~$180K",
          recommendations: [
            "Implement proposal templates",
            "Add approval automation for standard terms",
            "Assign proposal specialists to complex deals",
          ],
          metrics: {
            current: 7.5,
            benchmark: 4.0,
            trend: "worsening",
          },
        },
        {
          id: "2",
          stage: "Qualified",
          severity: "high",
          type: "conversion",
          description: "35% drop-off rate exceeds target by 15%",
          impact: "~40 qualified leads lost per month",
          recommendations: [
            "Review qualification criteria",
            "Implement lead scoring automation",
            "Add nurture campaigns for borderline leads",
          ],
          metrics: {
            current: 65,
            benchmark: 80,
            trend: "stable",
          },
        },
        {
          id: "3",
          stage: "Meeting Scheduled",
          severity: "medium",
          type: "volume",
          description: "Below capacity for sales team",
          impact: "Underutilizing 30% of available slots",
          recommendations: [
            "Increase outbound activities",
            "Optimize meeting scheduling automation",
            "Implement no-show reduction strategies",
          ],
          metrics: {
            current: 220,
            benchmark: 300,
            trend: "improving",
          },
        },
      ];

      setBottlenecks(identifiedBottlenecks);

      // Generate cohort data
      const cohorts: CohortAnalysis[] = [
        {
          cohort: "Week 1",
          leads: 112,
          conversion: 24,
          avgCycleTime: 21,
          revenue: 651000,
          stages: {
            New: { reached: 112, converted: 84, avgTime: 2.5 },
            Qualified: { reached: 84, converted: 55, avgTime: 4.0 },
            "Meeting Scheduled": { reached: 55, converted: 44, avgTime: 3.5 },
            Proposal: { reached: 44, converted: 31, avgTime: 7.0 },
            Negotiation: { reached: 31, converted: 24, avgTime: 5.0 },
            "Closed Won": { reached: 24, converted: 24, avgTime: 0 },
          },
        },
        {
          cohort: "Week 2",
          leads: 108,
          conversion: 22,
          avgCycleTime: 23,
          revenue: 597000,
          stages: {
            New: { reached: 108, converted: 81, avgTime: 2.8 },
            Qualified: { reached: 81, converted: 51, avgTime: 4.5 },
            "Meeting Scheduled": { reached: 51, converted: 40, avgTime: 4.0 },
            Proposal: { reached: 40, converted: 27, avgTime: 8.0 },
            Negotiation: { reached: 27, converted: 22, avgTime: 5.5 },
            "Closed Won": { reached: 22, converted: 22, avgTime: 0 },
          },
        },
        {
          cohort: "Week 3",
          leads: 115,
          conversion: 28,
          avgCycleTime: 22,
          revenue: 760000,
          stages: {
            New: { reached: 115, converted: 89, avgTime: 2.3 },
            Qualified: { reached: 89, converted: 60, avgTime: 3.8 },
            "Meeting Scheduled": { reached: 60, converted: 50, avgTime: 3.5 },
            Proposal: { reached: 50, converted: 36, avgTime: 7.5 },
            Negotiation: { reached: 36, converted: 28, avgTime: 4.8 },
            "Closed Won": { reached: 28, converted: 28, avgTime: 0 },
          },
        },
        {
          cohort: "Week 4",
          leads: 115,
          conversion: 31,
          avgCycleTime: 20,
          revenue: 842000,
          stages: {
            New: { reached: 115, converted: 92, avgTime: 2.0 },
            Qualified: { reached: 92, converted: 63, avgTime: 3.5 },
            "Meeting Scheduled": { reached: 63, converted: 55, avgTime: 3.2 },
            Proposal: { reached: 55, converted: 40, avgTime: 6.8 },
            Negotiation: { reached: 40, converted: 31, avgTime: 4.5 },
            "Closed Won": { reached: 31, converted: 31, avgTime: 0 },
          },
        },
      ];

      setCohortData(cohorts);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getBottleneckColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getBottleneckIcon = (type: string) => {
    switch (type) {
      case "velocity":
        return <Timer className="h-4 w-4" />;
      case "conversion":
        return <TrendingDown className="h-4 w-4" />;
      case "volume":
        return <Users className="h-4 w-4" />;
      case "quality":
        return <ShieldAlert className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const funnelData = metrics.stages.map((stage) => ({
    name: stage.stage,
    value: stage.count,
    fill:
      stage.bottleneckScore > 60
        ? "#ef4444"
        : stage.bottleneckScore > 40
          ? "#f59e0b"
          : stage.bottleneckScore > 20
            ? "#eab308"
            : "#10b981",
  }));

  const velocityData = metrics.stages.slice(0, -1).map((stage, idx) => ({
    stage: stage.stage,
    avgTime: stage.avgTimeInStage,
    benchmark: idx === 3 ? 4.0 : stage.avgTimeInStage * 0.8,
    velocity: stage.velocity,
  }));

  const conversionData = metrics.stages.slice(0, -1).map((stage) => ({
    stage: stage.stage,
    conversion: stage.conversionRate,
    dropoff: stage.dropoffRate,
    benchmark: 80,
  }));

  const radarData = metrics.stages.slice(0, -1).map((stage) => ({
    stage: stage.stage,
    performance: 100 - stage.bottleneckScore,
    target: 80,
  }));

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              <CardTitle>Pipeline Analytics & Bottleneck Detection</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={analyzePipeline}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Re-analyze
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <CardDescription>
            Real-time pipeline velocity tracking and bottleneck identification
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">
                  Pipeline Velocity
                </div>
                <div className="text-2xl font-bold">
                  ${(metrics.velocity / 1000).toFixed(0)}K/mo
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+12%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">
                  Avg Cycle Time
                </div>
                <div className="text-2xl font-bold">
                  {metrics.avgCycleTime.toFixed(1)} days
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">+2.3 days</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Win Rate</div>
                <div className="text-2xl font-bold">
                  {metrics.winRate.toFixed(1)}%
                </div>
                <Progress value={metrics.winRate} className="h-2 mt-1" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">
                  Active Deals
                </div>
                <div className="text-2xl font-bold">
                  {metrics.totalLeads - (metrics.stages[5]?.count || 0)}
                </div>
                <div className="text-xs text-muted-foreground">In pipeline</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">
                  Avg Deal Size
                </div>
                <div className="text-2xl font-bold">
                  ${(metrics.avgDealSize / 1000).toFixed(0)}K
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+8%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Bottlenecks</div>
                <div className="text-2xl font-bold">{bottlenecks.length}</div>
                <div className="text-xs text-orange-600">Action required</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="funnel" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="funnel">Pipeline Funnel</TabsTrigger>
              <TabsTrigger value="velocity">Velocity Analysis</TabsTrigger>
              <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
              <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="funnel" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conversion Funnel</CardTitle>
                  <CardDescription>
                    Lead progression through pipeline stages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <FunnelChart>
                      <Tooltip />
                      <Funnel
                        dataKey="value"
                        data={funnelData}
                        isAnimationActive
                      >
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>

                  <div className="grid gap-3 mt-6">
                    {metrics.stages.map((stage, idx) => (
                      <div
                        key={stage.stage}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-semibold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="font-medium">{stage.stage}</div>
                            <div className="text-sm text-muted-foreground">
                              {stage.count} leads
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {idx < metrics.stages.length - 1 && (
                            <>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {stage.conversionRate}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  conversion
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="velocity" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Stage Velocity</CardTitle>
                    <CardDescription>
                      Average time spent in each stage vs. benchmark
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={velocityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgTime" fill="#8884d8" name="Current" />
                        <Bar dataKey="benchmark" fill="#82ca9d" name="Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Conversion Rates by Stage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={conversionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="conversion"
                          stroke="#8884d8"
                          strokeWidth={2}
                          name="Conversion Rate"
                        />
                        <Line
                          type="monotone"
                          dataKey="benchmark"
                          stroke="#82ca9d"
                          strokeDasharray="5 5"
                          name="Target"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="bottlenecks" className="space-y-4">
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>
                    {
                      bottlenecks.filter((b) => b.severity === "critical")
                        .length
                    }{" "}
                    critical
                  </strong>{" "}
                  and{" "}
                  <strong>
                    {bottlenecks.filter((b) => b.severity === "high").length}{" "}
                    high priority
                  </strong>{" "}
                  bottlenecks detected that require immediate attention.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {bottlenecks.map((bottleneck) => (
                  <Card
                    key={bottleneck.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onBottleneckSelect?.(bottleneck)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            getBottleneckColor(bottleneck.severity),
                          )}
                        >
                          {getBottleneckIcon(bottleneck.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">
                                {bottleneck.stage} Stage
                              </h4>
                              <Badge
                                className={cn(
                                  "text-xs",
                                  getBottleneckColor(bottleneck.severity),
                                )}
                              >
                                {bottleneck.severity}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {bottleneck.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              {bottleneck.metrics.trend === "worsening" && (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              {bottleneck.metrics.trend === "improving" && (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              )}
                              <span className="text-muted-foreground">
                                {bottleneck.metrics.trend}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {bottleneck.description}
                          </p>

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <Gauge className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Current:{" "}
                                <strong>{bottleneck.metrics.current}</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Target:{" "}
                                <strong>{bottleneck.metrics.benchmark}</strong>
                              </span>
                            </div>
                          </div>

                          <Alert className="mb-3">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Impact:</strong> {bottleneck.impact}
                            </AlertDescription>
                          </Alert>

                          <div>
                            <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4" />
                              Recommendations
                            </h5>
                            <ul className="space-y-1">
                              {bottleneck.recommendations.map((rec, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Pipeline Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="stage" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Performance"
                        dataKey="performance"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Target"
                        dataKey="target"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cohort" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cohort Performance</CardTitle>
                  <CardDescription>
                    Weekly cohort analysis of lead progression
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cohortData.map((cohort) => (
                      <div
                        key={cohort.cohort}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{cohort.cohort}</h4>
                            <p className="text-sm text-muted-foreground">
                              {cohort.leads} leads · $
                              {(cohort.revenue / 1000).toFixed(0)}K revenue
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {(
                                (cohort.conversion / cohort.leads) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                            <div className="text-sm text-muted-foreground">
                              conversion
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {Object.entries(cohort.stages).map(
                            ([stage, data], idx) => (
                              <div key={stage} className="flex-1">
                                <div className="relative">
                                  <Progress
                                    value={(data.reached / cohort.leads) * 100}
                                    className="h-8"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                    {data.reached}
                                  </div>
                                </div>
                                <div className="text-xs text-center mt-1 text-muted-foreground">
                                  {stage.split(" ")[0]}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Alert className="mt-4">
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Trend:</strong> Week 4 cohort shows 29%
                      improvement in conversion rate and 13% reduction in cycle
                      time compared to Week 1.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-4">
                <Alert className="border-blue-200 bg-blue-50">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>AI Analysis Complete:</strong> Based on historical
                    patterns and current performance, here are the key insights
                    and predictions.
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Predictive Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-100">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Revenue Forecast</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Based on current velocity, pipeline is projected to
                            generate
                            <strong> $3.2M</strong> next month, a{" "}
                            <strong>12% increase</strong>.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-orange-100">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Risk Alert</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Proposal stage velocity declining for 3 consecutive
                            weeks. Without intervention, expect{" "}
                            <strong>15% revenue impact</strong> in 30 days.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <Zap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Optimization Opportunity
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Implementing automated proposal generation could
                            reduce cycle time by
                            <strong> 3.5 days</strong> and increase velocity by{" "}
                            <strong>$280K/month</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Action Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">
                            Immediate: Fix Proposal Bottleneck
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Assign 2 proposal specialists to clear backlog.
                            Expected impact: 20% velocity increase within 7
                            days.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                            2
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">
                            This Week: Improve Qualification
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Review and update lead scoring criteria. Current
                            false positive rate of 35% is causing unnecessary
                            pipeline congestion.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-bold">
                            3
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">
                            This Month: Scale Meeting Capacity
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Add 3 SDRs or implement automated scheduling to
                            capture 30% more qualified opportunities currently
                            being lost.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
