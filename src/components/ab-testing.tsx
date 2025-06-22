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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FlaskConical,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Mail,
  MessageSquare,
  Phone,
  Clock,
  Calendar as CalendarIcon,
  Play,
  Pause,
  StopCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Copy,
  Edit,
  Trash2,
  Plus,
  Zap,
  Target,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus,
  Filter,
  Search,
  Download,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Percent,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  format,
  addDays,
  differenceInDays,
  formatDistanceToNow,
} from "date-fns";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ABTest {
  id: string;
  name: string;
  description: string;
  campaign: string;
  status: "draft" | "running" | "paused" | "completed";
  type: "email" | "call_script" | "landing_page" | "messaging";
  startDate: string;
  endDate?: string;
  variants: Variant[];
  metrics: TestMetrics;
  winner?: string;
  confidence: number;
  sampleSize: {
    required: number;
    current: number;
  };
  settings: TestSettings;
}

interface Variant {
  id: string;
  name: string;
  description: string;
  allocation: number;
  content: {
    subject?: string;
    body?: string;
    cta?: string;
    script?: string;
    template?: string;
  };
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
    revenue: number;
    bounced: number;
    unsubscribed: number;
  };
  performance: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
    revenuePerLead: number;
  };
}

interface TestMetrics {
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalConverted: number;
  totalRevenue: number;
  statisticalSignificance: number;
  confidence: number;
  timeToSignificance?: number;
}

interface TestSettings {
  objective: "open_rate" | "click_rate" | "conversion_rate" | "revenue";
  minimumSampleSize: number;
  confidenceLevel: number;
  testDuration: number;
  automaticWinner: boolean;
  winnerCriteria: {
    metric: string;
    improvement: number;
  };
}

interface ABTestingProps {
  className?: string;
}

export function ABTesting({ className }: ABTestingProps) {
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: "1",
      name: "Subject Line Test - Q4 Campaign",
      description: "Testing urgency vs value proposition in subject lines",
      campaign: "Q4 Enterprise Outreach",
      status: "running",
      type: "email",
      startDate: addDays(new Date(), -5).toISOString(),
      variants: [
        {
          id: "a",
          name: "Variant A - Urgency",
          description: "Focus on limited time offer",
          allocation: 50,
          content: {
            subject: "Last chance: 30% off Mohit AI before prices increase",
            body: "Hi {firstName},\n\nTime is running out...",
            cta: "Claim Your Discount",
          },
          metrics: {
            sent: 2500,
            opened: 625,
            clicked: 125,
            converted: 25,
            revenue: 125000,
            bounced: 50,
            unsubscribed: 5,
          },
          performance: {
            openRate: 25,
            clickRate: 20,
            conversionRate: 20,
            revenuePerLead: 5000,
          },
        },
        {
          id: "b",
          name: "Variant B - Value",
          description: "Focus on ROI and benefits",
          allocation: 50,
          content: {
            subject: "How {Company} can save $50k/year on SDR costs",
            body: "Hi {firstName},\n\nI noticed {Company} is growing...",
            cta: "See Your Savings",
          },
          metrics: {
            sent: 2500,
            opened: 875,
            clicked: 218,
            converted: 43,
            revenue: 215000,
            bounced: 45,
            unsubscribed: 3,
          },
          performance: {
            openRate: 35,
            clickRate: 25,
            conversionRate: 20,
            revenuePerLead: 5000,
          },
        },
      ],
      metrics: {
        totalSent: 5000,
        totalOpened: 1500,
        totalClicked: 343,
        totalConverted: 68,
        totalRevenue: 340000,
        statisticalSignificance: 0.89,
        confidence: 89,
      },
      confidence: 89,
      sampleSize: {
        required: 6000,
        current: 5000,
      },
      settings: {
        objective: "open_rate",
        minimumSampleSize: 6000,
        confidenceLevel: 95,
        testDuration: 14,
        automaticWinner: true,
        winnerCriteria: {
          metric: "open_rate",
          improvement: 10,
        },
      },
    },
    {
      id: "2",
      name: "Call Script Optimization",
      description: "Testing consultative vs direct approach",
      campaign: "SMB Outbound Calls",
      status: "completed",
      type: "call_script",
      startDate: addDays(new Date(), -30).toISOString(),
      endDate: addDays(new Date(), -2).toISOString(),
      winner: "a",
      variants: [
        {
          id: "a",
          name: "Consultative Approach",
          description: "Focus on understanding needs first",
          allocation: 50,
          content: {
            script:
              "Hi {firstName}, I'm calling to learn about your current SDR process...",
          },
          metrics: {
            sent: 500,
            opened: 500,
            clicked: 150,
            converted: 45,
            revenue: 90000,
            bounced: 0,
            unsubscribed: 0,
          },
          performance: {
            openRate: 100,
            clickRate: 30,
            conversionRate: 30,
            revenuePerLead: 2000,
          },
        },
        {
          id: "b",
          name: "Direct Approach",
          description: "Lead with value proposition",
          allocation: 50,
          content: {
            script:
              "Hi {firstName}, I can show you how to double your SDR productivity...",
          },
          metrics: {
            sent: 500,
            opened: 500,
            clicked: 100,
            converted: 25,
            revenue: 50000,
            bounced: 0,
            unsubscribed: 0,
          },
          performance: {
            openRate: 100,
            clickRate: 20,
            conversionRate: 25,
            revenuePerLead: 2000,
          },
        },
      ],
      metrics: {
        totalSent: 1000,
        totalOpened: 1000,
        totalClicked: 250,
        totalConverted: 70,
        totalRevenue: 140000,
        statisticalSignificance: 0.97,
        confidence: 97,
      },
      confidence: 97,
      sampleSize: {
        required: 1000,
        current: 1000,
      },
      settings: {
        objective: "conversion_rate",
        minimumSampleSize: 1000,
        confidenceLevel: 95,
        testDuration: 28,
        automaticWinner: true,
        winnerCriteria: {
          metric: "conversion_rate",
          improvement: 15,
        },
      },
    },
  ]);

  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [showNewTestDialog, setShowNewTestDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock time series data for the selected test
  const generateTimeSeriesData = (test: ABTest) => {
    const days = test.endDate
      ? differenceInDays(new Date(test.endDate), new Date(test.startDate))
      : differenceInDays(new Date(), new Date(test.startDate));

    return Array.from({ length: Math.min(days, 30) }, (_, i) => ({
      date: format(addDays(new Date(test.startDate), i), "MMM dd"),
      variantA: Math.random() * 40 + 20,
      variantB: Math.random() * 40 + 30,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-600";
      case "paused":
        return "text-yellow-600";
      case "completed":
        return "text-blue-600";
      case "draft":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const calculateStatisticalSignificance = (
    variantA: Variant,
    variantB: Variant,
  ) => {
    // Simplified calculation for demo
    const convA = variantA.metrics.converted / variantA.metrics.sent;
    const convB = variantB.metrics.converted / variantB.metrics.sent;
    const pooled =
      (variantA.metrics.converted + variantB.metrics.converted) /
      (variantA.metrics.sent + variantB.metrics.sent);
    const se = Math.sqrt(
      pooled *
        (1 - pooled) *
        (1 / variantA.metrics.sent + 1 / variantB.metrics.sent),
    );
    const z = Math.abs(convA - convB) / se;
    const significance = 2 * (1 - normalCDF(z));
    return (1 - significance) * 100;
  };

  const normalCDF = (x: number) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp((-x * x) / 2);
    const p =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - p : p;
  };

  const filteredTests = tests.filter(
    (test) => filterStatus === "all" || test.status === filterStatus,
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">A/B Testing</h2>
          <p className="text-muted-foreground">
            Optimize your campaigns with data-driven experiments
          </p>
        </div>
        <Button onClick={() => setShowNewTestDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Test
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Tests</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Tests
                    </p>
                    <p className="text-2xl font-bold">
                      {tests.filter((t) => t.status === "running").length}
                    </p>
                  </div>
                  <FlaskConical className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Improvement
                    </p>
                    <p className="text-2xl font-bold">+23.4%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tests This Month
                    </p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <Percent className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Tests</CardTitle>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedTest(test)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{test.name}</h4>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              getStatusColor(test.status),
                            )}
                          >
                            {test.status}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {test.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {test.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{test.metrics.totalSent} sent</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span>{test.confidence}% confidence</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>
                              Started{" "}
                              {formatDistanceToNow(new Date(test.startDate))}{" "}
                              ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {test.winner && (
                          <div className="flex items-center gap-1 text-green-600 mb-2">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Variant {test.winner.toUpperCase()} Won
                            </span>
                          </div>
                        )}
                        <Progress
                          value={
                            (test.sampleSize.current /
                              test.sampleSize.required) *
                            100
                          }
                          className="w-32"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {test.sampleSize.current} / {test.sampleSize.required}{" "}
                          samples
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {selectedTest && selectedTest.status === "running" ? (
            <>
              {/* Test Details */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedTest.name}</CardTitle>
                      <CardDescription>
                        {selectedTest.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Test
                      </Button>
                      <Button variant="outline" size="sm">
                        <StopCircle className="h-4 w-4 mr-2" />
                        End Test
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Variant Performance */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Variant Performance</h3>
                      {selectedTest.variants.map((variant, index) => (
                        <div key={variant.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold",
                                  index === 0 ? "bg-blue-600" : "bg-purple-600",
                                )}
                              >
                                {variant.id.toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-medium">{variant.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {variant.allocation}% traffic
                                </p>
                              </div>
                            </div>
                            {selectedTest.winner === variant.id && (
                              <Badge className="bg-green-600">Winner</Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Open Rate</p>
                              <p className="font-semibold">
                                {variant.performance.openRate}%
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Click Rate
                              </p>
                              <p className="font-semibold">
                                {variant.performance.clickRate}%
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Conversion
                              </p>
                              <p className="font-semibold">
                                {variant.performance.conversionRate}%
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Revenue/Lead
                              </p>
                              <p className="font-semibold">
                                ${variant.performance.revenuePerLead}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Chart */}
                    <div>
                      <h3 className="font-semibold mb-4">
                        Performance Over Time
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={generateTimeSeriesData(selectedTest)}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="variantA"
                              stroke="#3b82f6"
                              name="Variant A"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="variantB"
                              stroke="#8b5cf6"
                              name="Variant B"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Statistical Analysis */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Statistical Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Confidence Level
                              </p>
                              <p className="text-2xl font-bold">
                                {selectedTest.confidence}%
                              </p>
                            </div>
                            <Target className="h-8 w-8 text-blue-600" />
                          </div>
                          <Progress
                            value={selectedTest.confidence}
                            className="mt-2"
                          />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Sample Progress
                              </p>
                              <p className="text-2xl font-bold">
                                {Math.round(
                                  (selectedTest.sampleSize.current /
                                    selectedTest.sampleSize.required) *
                                    100,
                                )}
                                %
                              </p>
                            </div>
                            <Users className="h-8 w-8 text-green-600" />
                          </div>
                          <Progress
                            value={
                              (selectedTest.sampleSize.current /
                                selectedTest.sampleSize.required) *
                              100
                            }
                            className="mt-2"
                          />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Est. Days Left
                              </p>
                              <p className="text-2xl font-bold">
                                {Math.max(
                                  0,
                                  Math.ceil(
                                    (selectedTest.sampleSize.required -
                                      selectedTest.sampleSize.current) /
                                      (selectedTest.sampleSize.current /
                                        differenceInDays(
                                          new Date(),
                                          new Date(selectedTest.startDate),
                                        )),
                                  ),
                                )}
                              </p>
                            </div>
                            <Clock className="h-8 w-8 text-purple-600" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        {selectedTest.confidence >= 95
                          ? "This test has reached statistical significance. You can confidently declare a winner."
                          : `This test needs ${selectedTest.sampleSize.required - selectedTest.sampleSize.current} more samples to reach statistical significance.`}
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-12">
              <FlaskConical className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                No Active Test Selected
              </h3>
              <p className="text-muted-foreground">
                Select a running test from the overview to see live results
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {/* Completed Tests Results */}
          <Card>
            <CardHeader>
              <CardTitle>Completed Test Results</CardTitle>
              <CardDescription>
                Analysis of completed A/B tests and their impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tests
                  .filter((t) => t.status === "completed")
                  .map((test) => (
                    <div key={test.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Ran from{" "}
                            {format(new Date(test.startDate), "MMM dd")} to{" "}
                            {test.endDate &&
                              format(new Date(test.endDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                        <Badge className="bg-green-600">
                          Variant {test.winner?.toUpperCase()} Won
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {test.variants.map((variant) => (
                          <div
                            key={variant.id}
                            className={cn(
                              "border rounded-lg p-4",
                              test.winner === variant.id &&
                                "border-green-600 bg-green-50",
                            )}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">
                                Variant {variant.id.toUpperCase()}:{" "}
                                {variant.name}
                              </h4>
                              {test.winner === variant.id && (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Conversion Rate
                                </span>
                                <span className="font-medium">
                                  {variant.performance.conversionRate}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Revenue per Lead
                                </span>
                                <span className="font-medium">
                                  ${variant.performance.revenuePerLead}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Total Revenue
                                </span>
                                <span className="font-medium">
                                  ${variant.metrics.revenue.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-medium mb-2">Key Insights</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                              Winner achieved{" "}
                              {Math.round(
                                ((test.variants.find(
                                  (v) => v.id === test.winner,
                                )?.performance.conversionRate || 0) /
                                  (test.variants.find(
                                    (v) => v.id !== test.winner,
                                  )?.performance.conversionRate || 1) -
                                  1) *
                                  100,
                              )}
                              % higher conversion rate
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                              Statistical significance: {test.confidence}%
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                              Projected annual impact: $
                              {Math.round(
                                ((test.variants.find(
                                  (v) => v.id === test.winner,
                                )?.metrics.revenue || 0) *
                                  12) /
                                  (differenceInDays(
                                    new Date(test.endDate!),
                                    new Date(test.startDate),
                                  ) /
                                    30),
                              ).toLocaleString()}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Clone Test
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {/* Testing Insights and Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Testing Insights</CardTitle>
              <CardDescription>
                Learn from your testing history and optimize future experiments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Win Rate by Test Type */}
              <div>
                <h3 className="font-semibold mb-4">Win Rate by Test Type</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { type: "Email Subject", winRate: 76, tests: 45 },
                        { type: "Email Body", winRate: 68, tests: 32 },
                        { type: "Call Script", winRate: 82, tests: 28 },
                        { type: "Landing Page", winRate: 71, tests: 19 },
                        { type: "CTA Button", winRate: 64, tests: 24 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="winRate" fill="#3b82f6" name="Win Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <Separator />

              {/* Best Performing Elements */}
              <div>
                <h3 className="font-semibold mb-4">Best Performing Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Subject Lines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Personalization</span>
                          <Badge className="bg-green-600">+32% open rate</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Urgency</span>
                          <Badge className="bg-green-600">+28% open rate</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Numbers/Stats</span>
                          <Badge className="bg-green-600">+24% open rate</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Call Scripts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Consultative</span>
                          <Badge className="bg-green-600">
                            +45% conversion
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pain Points First</span>
                          <Badge className="bg-green-600">
                            +38% conversion
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Social Proof</span>
                          <Badge className="bg-green-600">
                            +31% conversion
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold mb-4">AI Recommendations</h3>
                <div className="space-y-3">
                  <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription>
                      Your email tests show 3x better results when testing
                      subject lines vs body content. Consider focusing more
                      tests on subject line optimization.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      Tests running for 14+ days have 85% higher confidence
                      levels. Avoid ending tests prematurely to ensure
                      statistical significance.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Target className="h-4 w-4" />
                    <AlertDescription>
                      Your highest performing variants use personalization
                      tokens. Consider making this a standard practice across
                      all campaigns.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Test Dialog */}
      <Dialog open={showNewTestDialog} onOpenChange={setShowNewTestDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New A/B Test</DialogTitle>
            <DialogDescription>
              Set up a new experiment to optimize your campaigns
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Test Name</Label>
                <Input
                  placeholder="e.g., Q1 Email Subject Line Test"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Campaign</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1-enterprise">
                      Q1 Enterprise Outreach
                    </SelectItem>
                    <SelectItem value="smb-nurture">
                      SMB Nurture Series
                    </SelectItem>
                    <SelectItem value="product-launch">
                      Product Launch Campaign
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Test Type</Label>
              <RadioGroup defaultValue="email" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="call" id="call" />
                  <Label htmlFor="call">Call Script</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landing" id="landing" />
                  <Label htmlFor="landing">Landing Page</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="message" id="message" />
                  <Label htmlFor="message">Message Template</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Test Objective</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="What do you want to optimize?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open_rate">Open Rate</SelectItem>
                  <SelectItem value="click_rate">Click-Through Rate</SelectItem>
                  <SelectItem value="conversion_rate">
                    Conversion Rate
                  </SelectItem>
                  <SelectItem value="revenue">Revenue per Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Test Variants</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Variant A (Control)</h4>
                    <Badge variant="outline">50% traffic</Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label>Subject Line</Label>
                      <Input
                        placeholder="Enter subject line for variant A"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Preview Text</Label>
                      <Input
                        placeholder="Enter preview text"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Variant B</h4>
                    <Badge variant="outline">50% traffic</Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label>Subject Line</Label>
                      <Input
                        placeholder="Enter subject line for variant B"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Preview Text</Label>
                      <Input
                        placeholder="Enter preview text"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Test Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Minimum Sample Size</Label>
                    <Input type="number" defaultValue="1000" className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Per variant, based on statistical power
                    </p>
                  </div>
                  <div>
                    <Label>Confidence Level</Label>
                    <Select defaultValue="95">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                        <SelectItem value="99">99%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automatic Winner Selection</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically deploy winning variant when significant
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setShowNewTestDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowNewTestDialog(false)}>
              Create Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
