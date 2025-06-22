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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Zap,
  Clock,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  Activity,
  Eye,
  Filter,
  Info,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  RefreshCw,
  Download,
  Lightbulb,
  Flag,
  Shield,
  Gauge,
  Timer,
  Plus,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, addMonths, formatDistanceToNow } from "date-fns";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";

interface LeadScoringPrediction {
  leadId: string;
  leadName: string;
  company: string;
  currentScore: number;
  predictedScore: number;
  scoreChange: number;
  conversionProbability: number;
  timeToConversion: number;
  recommendedActions: string[];
  riskFactors: string[];
  opportunityFactors: string[];
}

interface RevenueForecast {
  period: string;
  predicted: number;
  optimistic: number;
  pessimistic: number;
  confidence: number;
  drivers: {
    factor: string;
    impact: number;
    trend: "positive" | "negative" | "neutral";
  }[];
}

interface ChurnPrediction {
  leadId: string;
  leadName: string;
  company: string;
  churnRisk: number;
  churnReasons: {
    reason: string;
    weight: number;
  }[];
  retentionActions: string[];
  lifetimeValue: number;
  lastEngagement: string;
}

interface TeamPerformancePrediction {
  userId: string;
  userName: string;
  currentPerformance: number;
  predictedPerformance: number;
  strengths: string[];
  improvementAreas: string[];
  recommendedTraining: string[];
  optimalLeadTypes: string[];
}

interface MarketTrend {
  trend: string;
  impact: "high" | "medium" | "low";
  direction: "up" | "down" | "stable";
  affectedSegments: string[];
  recommendations: string[];
  confidence: number;
}

interface PredictiveAnalyticsProps {
  className?: string;
}

export function PredictiveAnalytics({ className }: PredictiveAnalyticsProps) {
  const [timeHorizon, setTimeHorizon] = useState("3m");
  const [selectedModel, setSelectedModel] = useState("all");
  const [isCalculating, setIsCalculating] = useState(false);
  const [leadPredictions, setLeadPredictions] = useState<
    LeadScoringPrediction[]
  >([]);
  const [revenueForecast, setRevenueForecast] = useState<RevenueForecast[]>([]);
  const [churnPredictions, setChurnPredictions] = useState<ChurnPrediction[]>(
    [],
  );
  const [teamPredictions, setTeamPredictions] = useState<
    TeamPerformancePrediction[]
  >([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [modelAccuracy, setModelAccuracy] = useState({
    leadScoring: 87,
    revenue: 82,
    churn: 79,
    performance: 84,
  });

  useEffect(() => {
    generatePredictions();
  }, [timeHorizon, selectedModel]);

  const generatePredictions = () => {
    setIsCalculating(true);

    // Simulate AI calculations
    setTimeout(() => {
      // Lead scoring predictions
      const leads: LeadScoringPrediction[] = [
        {
          leadId: "1",
          leadName: "Sarah Johnson",
          company: "TechCorp Solutions",
          currentScore: 75,
          predictedScore: 92,
          scoreChange: 17,
          conversionProbability: 0.84,
          timeToConversion: 14,
          recommendedActions: [
            "Schedule product demo within 3 days",
            "Send case study for similar company",
            "Connect with decision maker on LinkedIn",
          ],
          riskFactors: ["No C-level engagement yet"],
          opportunityFactors: [
            "High email engagement",
            "Downloaded pricing guide",
            "Multiple stakeholders involved",
          ],
        },
        {
          leadId: "2",
          leadName: "Michael Chen",
          company: "Innovate.io",
          currentScore: 65,
          predictedScore: 45,
          scoreChange: -20,
          conversionProbability: 0.32,
          timeToConversion: 45,
          recommendedActions: [
            "Re-engage with value proposition",
            "Offer limited-time trial",
            "Schedule check-in call",
          ],
          riskFactors: [
            "Decreasing engagement",
            "Competitor evaluation",
            "Budget concerns mentioned",
          ],
          opportunityFactors: ["Previous positive interaction"],
        },
        {
          leadId: "3",
          leadName: "Emily Davis",
          company: "GrowthCo",
          currentScore: 82,
          predictedScore: 95,
          scoreChange: 13,
          conversionProbability: 0.91,
          timeToConversion: 7,
          recommendedActions: [
            "Prepare contract terms",
            "Schedule closing call",
            "Involve sales manager",
          ],
          riskFactors: [],
          opportunityFactors: [
            "Budget approved",
            "Timeline urgency",
            "Champion identified",
          ],
        },
      ];

      // Revenue forecast
      const forecast: RevenueForecast[] = [
        {
          period: "Current Month",
          predicted: 285000,
          optimistic: 312000,
          pessimistic: 258000,
          confidence: 0.85,
          drivers: [
            {
              factor: "Pipeline velocity increase",
              impact: 35000,
              trend: "positive",
            },
            { factor: "Seasonal trend", impact: 15000, trend: "positive" },
            { factor: "Competition", impact: -10000, trend: "negative" },
          ],
        },
        {
          period: "Next Month",
          predicted: 318000,
          optimistic: 350000,
          pessimistic: 285000,
          confidence: 0.78,
          drivers: [
            { factor: "New campaign launch", impact: 45000, trend: "positive" },
            { factor: "Expected churn", impact: -12000, trend: "negative" },
            { factor: "Market expansion", impact: 25000, trend: "positive" },
          ],
        },
        {
          period: "Month +2",
          predicted: 342000,
          optimistic: 385000,
          pessimistic: 298000,
          confidence: 0.72,
          drivers: [
            {
              factor: "Product update release",
              impact: 38000,
              trend: "positive",
            },
            { factor: "Team scaling", impact: 22000, trend: "positive" },
            {
              factor: "Economic uncertainty",
              impact: -15000,
              trend: "negative",
            },
          ],
        },
      ];

      // Churn predictions
      const churn: ChurnPrediction[] = [
        {
          leadId: "4",
          leadName: "Robert Wilson",
          company: "StartupX",
          churnRisk: 0.78,
          churnReasons: [
            { reason: "Low product usage", weight: 0.35 },
            { reason: "Support ticket unresolved", weight: 0.25 },
            { reason: "Decision maker changed", weight: 0.2 },
            { reason: "Competitor outreach detected", weight: 0.2 },
          ],
          retentionActions: [
            "Executive business review",
            "Offer success manager support",
            "Provide additional training",
          ],
          lifetimeValue: 45000,
          lastEngagement: new Date(Date.now() - 86400000 * 15).toISOString(),
        },
        {
          leadId: "5",
          leadName: "Jessica Martinez",
          company: "Enterprise Solutions",
          churnRisk: 0.23,
          churnReasons: [
            { reason: "Contract renewal approaching", weight: 0.6 },
            { reason: "Minor feature requests pending", weight: 0.4 },
          ],
          retentionActions: [
            "Proactive renewal discussion",
            "Feature roadmap review",
          ],
          lifetimeValue: 125000,
          lastEngagement: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
      ];

      // Team performance predictions
      const team: TeamPerformancePrediction[] = [
        {
          userId: "1",
          userName: "Alex Thompson",
          currentPerformance: 82,
          predictedPerformance: 89,
          strengths: [
            "Email engagement",
            "Follow-up consistency",
            "Technical knowledge",
          ],
          improvementAreas: ["Cold calling", "Social selling"],
          recommendedTraining: [
            "Advanced LinkedIn Sales Navigator",
            "Consultative Selling",
          ],
          optimalLeadTypes: [
            "Tech companies",
            "Series B+ startups",
            "Developer tools",
          ],
        },
        {
          userId: "2",
          userName: "Maria Garcia",
          currentPerformance: 91,
          predictedPerformance: 88,
          strengths: [
            "Relationship building",
            "Closing skills",
            "Industry expertise",
          ],
          improvementAreas: ["Time management", "Pipeline coverage"],
          recommendedTraining: [
            "Time Management for Sales",
            "Pipeline Optimization",
          ],
          optimalLeadTypes: [
            "Enterprise accounts",
            "Financial services",
            "Long sales cycles",
          ],
        },
      ];

      // Market trends
      const trends: MarketTrend[] = [
        {
          trend: "AI adoption acceleration in target market",
          impact: "high",
          direction: "up",
          affectedSegments: ["Technology", "Financial Services", "Healthcare"],
          recommendations: [
            "Update messaging to emphasize AI capabilities",
            "Create AI-focused case studies",
            "Target AI-forward companies",
          ],
          confidence: 0.89,
        },
        {
          trend: "Budget constraints in SMB segment",
          impact: "medium",
          direction: "down",
          affectedSegments: ["Small Business", "Startups <50 employees"],
          recommendations: [
            "Introduce flexible pricing tiers",
            "Focus on ROI messaging",
            "Offer extended trial periods",
          ],
          confidence: 0.76,
        },
        {
          trend: "Remote work normalization driving demand",
          impact: "high",
          direction: "up",
          affectedSegments: ["All segments"],
          recommendations: [
            "Highlight remote collaboration features",
            "Target distributed teams",
            "Partner with remote work platforms",
          ],
          confidence: 0.82,
        },
      ];

      setLeadPredictions(leads);
      setRevenueForecast(forecast);
      setChurnPredictions(churn);
      setTeamPredictions(team);
      setMarketTrends(trends);
      setIsCalculating(false);
    }, 2000);
  };

  const getScoreChangeColor = (change: number) => {
    if (change > 10) return "text-green-600";
    if (change > 0) return "text-green-500";
    if (change > -10) return "text-orange-500";
    return "text-red-600";
  };

  const getRiskColor = (risk: number) => {
    if (risk > 0.7) return "text-red-600 bg-red-50";
    if (risk > 0.4) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return "text-green-600";
    if (confidence > 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const conversionTimeline = leadPredictions
    .map((lead) => ({
      name: lead.leadName.split(" ")[0],
      days: lead.timeToConversion,
      probability: Math.round(lead.conversionProbability * 100),
    }))
    .sort((a, b) => a.days - b.days);

  const revenueChart = revenueForecast.map((f) => ({
    period: f.period,
    predicted: f.predicted / 1000,
    optimistic: f.optimistic / 1000,
    pessimistic: f.pessimistic / 1000,
  }));

  const accuracyRadar = Object.entries(modelAccuracy).map(
    ([model, accuracy]) => ({
      model: model.replace(/([A-Z])/g, " $1").trim(),
      accuracy,
    }),
  );

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <CardTitle>Predictive Analytics & AI Insights</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  <SelectItem value="leads">Lead Scoring</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="churn">Churn</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={generatePredictions}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-pulse" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>
          <CardDescription>
            AI-powered predictions and insights to optimize your sales strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Model Accuracy Overview */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Lead Scoring
                    </p>
                    <p className="text-2xl font-bold">
                      {modelAccuracy.leadScoring}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500 opacity-20" />
                </div>
                <Progress
                  value={modelAccuracy.leadScoring}
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Revenue Forecast
                    </p>
                    <p className="text-2xl font-bold">
                      {modelAccuracy.revenue}%
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500 opacity-20" />
                </div>
                <Progress value={modelAccuracy.revenue} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Churn Prediction
                    </p>
                    <p className="text-2xl font-bold">{modelAccuracy.churn}%</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500 opacity-20" />
                </div>
                <Progress value={modelAccuracy.churn} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="text-2xl font-bold">
                      {modelAccuracy.performance}%
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500 opacity-20" />
                </div>
                <Progress
                  value={modelAccuracy.performance}
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="leads" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="leads">Lead Predictions</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Forecast</TabsTrigger>
              <TabsTrigger value="churn">Churn Risk</TabsTrigger>
              <TabsTrigger value="team">Team Insights</TabsTrigger>
              <TabsTrigger value="trends">Market Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Conversion Timeline Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={conversionTimeline}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="days"
                          fill="#8884d8"
                          name="Days to Close"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="probability"
                          stroke="#82ca9d"
                          name="Win Probability %"
                          strokeWidth={2}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Model Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={accuracyRadar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="model" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Accuracy"
                          dataKey="accuracy"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {leadPredictions.map((prediction) => (
                  <Card key={prediction.leadId}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div>
                              <h4 className="font-semibold">
                                {prediction.leadName}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {prediction.company}
                              </p>
                            </div>
                            <Badge variant="outline" className="gap-1">
                              <Gauge className="h-3 w-3" />
                              {Math.round(
                                prediction.conversionProbability * 100,
                              )}
                              % probability
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Timer className="h-3 w-3" />
                              {prediction.timeToConversion} days
                            </Badge>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3 mb-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Score Prediction
                              </Label>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-lg font-semibold">
                                  {prediction.currentScore}
                                </span>
                                <ArrowRight className="h-4 w-4" />
                                <span className="text-lg font-semibold">
                                  {prediction.predictedScore}
                                </span>
                                <span
                                  className={cn(
                                    "text-sm font-medium",
                                    getScoreChangeColor(prediction.scoreChange),
                                  )}
                                >
                                  {prediction.scoreChange > 0 ? "+" : ""}
                                  {prediction.scoreChange}
                                </span>
                              </div>
                            </div>

                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Opportunity Factors
                              </Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {prediction.opportunityFactors
                                  .slice(0, 2)
                                  .map((factor, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs text-green-600"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      {factor}
                                    </Badge>
                                  ))}
                              </div>
                            </div>

                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Risk Factors
                              </Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {prediction.riskFactors.length > 0 ? (
                                  prediction.riskFactors.map((risk, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs text-orange-600"
                                    >
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      {risk}
                                    </Badge>
                                  ))
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-xs text-green-600"
                                  >
                                    <Shield className="h-3 w-3 mr-1" />
                                    Low risk
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs text-muted-foreground mb-2">
                              AI Recommended Actions
                            </Label>
                            <div className="space-y-1">
                              {prediction.recommendedActions.map(
                                (action, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <Sparkles className="h-3 w-3 text-blue-500" />
                                    <span>{action}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Forecast</CardTitle>
                  <CardDescription>
                    AI-predicted revenue with confidence intervals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={revenueChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="optimistic"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                        name="Optimistic"
                      />
                      <Area
                        type="monotone"
                        dataKey="predicted"
                        stackId="2"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        name="Predicted"
                      />
                      <Area
                        type="monotone"
                        dataKey="pessimistic"
                        stackId="3"
                        stroke="#ffc658"
                        fill="#ffc658"
                        fillOpacity={0.3}
                        name="Pessimistic"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {revenueForecast.map((forecast, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{forecast.period}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold">
                              ${(forecast.predicted / 1000).toFixed(0)}K
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                getConfidenceColor(forecast.confidence),
                              )}
                            >
                              {Math.round(forecast.confidence * 100)}%
                              confidence
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            Range
                          </div>
                          <div className="text-sm">
                            ${(forecast.pessimistic / 1000).toFixed(0)}K - $
                            {(forecast.optimistic / 1000).toFixed(0)}K
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground mb-2">
                          Key Drivers
                        </Label>
                        <div className="space-y-2">
                          {forecast.drivers.map((driver, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                {driver.trend === "positive" ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : driver.trend === "negative" ? (
                                  <TrendingDown className="h-4 w-4 text-red-500" />
                                ) : (
                                  <Activity className="h-4 w-4 text-gray-500" />
                                )}
                                <span className="text-sm">{driver.factor}</span>
                              </div>
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  driver.impact > 0
                                    ? "text-green-600"
                                    : "text-red-600",
                                )}
                              >
                                {driver.impact > 0 ? "+" : ""}$
                                {(Math.abs(driver.impact) / 1000).toFixed(0)}K
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="churn" className="space-y-4">
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>
                    {churnPredictions.filter((c) => c.churnRisk > 0.7).length}{" "}
                    accounts
                  </strong>{" "}
                  at high risk of churn. Immediate action recommended to retain
                  $
                  {(
                    churnPredictions
                      .filter((c) => c.churnRisk > 0.7)
                      .reduce((sum, c) => sum + c.lifetimeValue, 0) / 1000
                  ).toFixed(0)}
                  K in lifetime value.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {churnPredictions.map((prediction) => (
                  <Card
                    key={prediction.leadId}
                    className={cn(
                      "border-l-4",
                      prediction.churnRisk > 0.7
                        ? "border-l-red-500"
                        : prediction.churnRisk > 0.4
                          ? "border-l-orange-500"
                          : "border-l-green-500",
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">
                            {prediction.leadName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {prediction.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={cn(
                              "mb-2",
                              getRiskColor(prediction.churnRisk),
                            )}
                          >
                            {Math.round(prediction.churnRisk * 100)}% churn risk
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            LTV: ${(prediction.lifetimeValue / 1000).toFixed(0)}
                            K
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2">
                            Risk Factors
                          </Label>
                          <div className="space-y-2">
                            {prediction.churnReasons.map((reason, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm">{reason.reason}</span>
                                <Progress
                                  value={reason.weight * 100}
                                  className="w-20 h-2"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground mb-2">
                            Retention Actions
                          </Label>
                          <div className="space-y-1">
                            {prediction.retentionActions.map((action, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <Lightbulb className="h-3 w-3 text-blue-500" />
                                <span>{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          Last engagement:{" "}
                          {formatDistanceToNow(
                            new Date(prediction.lastEngagement),
                            { addSuffix: true },
                          )}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="grid gap-4">
                {teamPredictions.map((prediction) => (
                  <Card key={prediction.userId}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">
                            {prediction.userName}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              Performance trajectory:
                            </span>
                            <span className="font-medium">
                              {prediction.currentPerformance}%
                            </span>
                            <ArrowRight className="h-4 w-4" />
                            <span
                              className={cn(
                                "font-medium",
                                prediction.predictedPerformance >
                                  prediction.currentPerformance
                                  ? "text-green-600"
                                  : "text-orange-600",
                              )}
                            >
                              {prediction.predictedPerformance}%
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {prediction.predictedPerformance >
                          prediction.currentPerformance ? (
                            <>
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Improving
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Needs Support
                            </>
                          )}
                        </Badge>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2">
                            Strengths
                          </Label>
                          <div className="space-y-1">
                            {prediction.strengths.map((strength, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1 text-sm"
                              >
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground mb-2">
                            Improvement Areas
                          </Label>
                          <div className="space-y-1">
                            {prediction.improvementAreas.map((area, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1 text-sm"
                              >
                                <Target className="h-3 w-3 text-orange-500" />
                                <span>{area}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground mb-2">
                            Recommended Training
                          </Label>
                          <div className="space-y-1">
                            {prediction.recommendedTraining.map(
                              (training, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1 text-sm"
                                >
                                  <Sparkles className="h-3 w-3 text-blue-500" />
                                  <span>{training}</span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label className="text-xs text-muted-foreground">
                          Optimal Lead Types
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {prediction.optimalLeadTypes.map((type, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Market trends are analyzed using industry data, competitor
                  intelligence, and historical patterns.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                {marketTrends.map((trend, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            trend.impact === "high"
                              ? "bg-red-100"
                              : trend.impact === "medium"
                                ? "bg-orange-100"
                                : "bg-yellow-100",
                          )}
                        >
                          {trend.direction === "up" ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : trend.direction === "down" ? (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          ) : (
                            <Activity className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{trend.trend}</h4>
                            <Badge variant="outline" className="text-xs">
                              {trend.impact} impact
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                getConfidenceColor(trend.confidence),
                              )}
                            >
                              {Math.round(trend.confidence * 100)}% confidence
                            </Badge>
                          </div>

                          <div className="mb-3">
                            <Label className="text-xs text-muted-foreground">
                              Affected Segments
                            </Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {trend.affectedSegments.map((segment, sIdx) => (
                                <Badge
                                  key={sIdx}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {segment}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs text-muted-foreground mb-2">
                              Strategic Recommendations
                            </Label>
                            <div className="space-y-1">
                              {trend.recommendations.map((rec, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <ChevronRight className="h-3 w-3 text-blue-500" />
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
