"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PerformanceChart } from "@/components/ai-calls/PerformanceChart";
import { 
  ArrowLeft, Download, TrendingUp, Users, Phone, 
  Brain, Target, Clock, DollarSign, AlertTriangle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

export default function AIAnalyticsPage() {
  const router = useRouter();

  // Mock data for agent performance
  const agentPerformance = [
    { metric: "Qualification Rate", value: 78, benchmark: 65 },
    { metric: "Avg Call Duration", value: 85, benchmark: 80 },
    { metric: "Customer Satisfaction", value: 92, benchmark: 85 },
    { metric: "Objection Handling", value: 88, benchmark: 75 },
    { metric: "Closing Ability", value: 72, benchmark: 70 },
    { metric: "Product Knowledge", value: 95, benchmark: 90 },
  ];

  const costSavings = [
    { month: "Jan", aiCalls: 2500, humanCost: 75000, aiCost: 12500, savings: 62500 },
    { month: "Feb", aiCalls: 3200, humanCost: 96000, aiCost: 16000, savings: 80000 },
    { month: "Mar", aiCalls: 3800, humanCost: 114000, aiCost: 19000, savings: 95000 },
    { month: "Apr", aiCalls: 4200, humanCost: 126000, aiCost: 21000, savings: 105000 },
    { month: "May", aiCalls: 4800, humanCost: 144000, aiCost: 24000, savings: 120000 },
    { month: "Jun", aiCalls: 5200, humanCost: 156000, aiCost: 26000, savings: 130000 },
  ];

  const topObjections = [
    { objection: "Too expensive", count: 145, handled: 89 },
    { objection: "Happy with current solution", count: 132, handled: 78 },
    { objection: "Need to think about it", count: 98, handled: 92 },
    { objection: "Not the decision maker", count: 87, handled: 95 },
    { objection: "Bad timing", count: 76, handled: 84 },
  ];

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
            <h1 className="text-2xl font-bold">AI Call Analytics</h1>
            <p className="text-muted-foreground">
              Deep insights into AI agent performance and ROI
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="AI Success Rate"
          value="87%"
          change="+5%"
          trend="up"
          subtitle="Calls completed without human intervention"
          icon={Brain}
        />
        <MetricCard
          title="Cost per Call"
          value="$4.80"
          change="-23%"
          trend="up"
          subtitle="vs $26.50 for human agents"
          icon={DollarSign}
        />
        <MetricCard
          title="Lead Qualification"
          value="62%"
          change="+8%"
          trend="up"
          subtitle="Leads qualified by AI"
          icon={Target}
        />
        <MetricCard
          title="Avg Response Time"
          value="0.8s"
          change="-0.2s"
          trend="up"
          subtitle="Time to first response"
          icon={Clock}
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="flex-1">
        <TabsList className="grid w-full max-w-[600px] grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6 mt-6">
          <PerformanceChart detailed />
          
          {/* Agent Performance Radar */}
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Performance vs Benchmark</CardTitle>
              <CardDescription>
                How our AI compares to industry standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={agentPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="AI Agent"
                      dataKey="value"
                      stroke="#2563EB"
                      fill="#2563EB"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Industry Benchmark"
                      dataKey="benchmark"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6 mt-6">
          {/* Cost Savings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Savings Analysis</CardTitle>
              <CardDescription>
                Monthly comparison of AI vs human agent costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costSavings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="humanCost" fill="#EF4444" name="Human Cost (projected)" />
                    <Bar dataKey="aiCost" fill="#10B981" name="AI Cost (actual)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Total Savings YTD: ${costSavings.reduce((sum, m) => sum + m.savings, 0).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ROI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">ROI</h3>
                <p className="text-3xl font-bold text-green-600">485%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Return on AI investment
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Payback Period</h3>
                <p className="text-3xl font-bold">2.3</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Months to break even
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Efficiency Gain</h3>
                <p className="text-3xl font-bold">3.2x</p>
                <p className="text-sm text-muted-foreground mt-1">
                  More calls per hour
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          {/* Objection Handling */}
          <Card>
            <CardHeader>
              <CardTitle>Top Objections & AI Handling Rate</CardTitle>
              <CardDescription>
                Most common objections and how well AI handles them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topObjections.map((item) => (
                  <div key={item.objection} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.objection}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {item.count} occurrences
                        </span>
                        <Badge variant={item.handled > 85 ? "default" : "secondary"}>
                          {item.handled}% handled
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${item.handled}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle>AI Learning Progress</CardTitle>
              <CardDescription>
                Improvement in key metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <LearningMetric
                  metric="Response Accuracy"
                  baseline={72}
                  current={91}
                  target={95}
                />
                <LearningMetric
                  metric="Objection Handling"
                  baseline={65}
                  current={88}
                  target={92}
                />
                <LearningMetric
                  metric="Lead Qualification"
                  baseline={58}
                  current={82}
                  target={90}
                />
                <LearningMetric
                  metric="Natural Conversation"
                  baseline={70}
                  current={89}
                  target={95}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6 mt-6">
          {/* AI vs Human Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>AI vs Human Agent Comparison</CardTitle>
              <CardDescription>
                Side-by-side performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ComparisonRow
                  metric="Calls per Hour"
                  ai={18}
                  human={6}
                  unit="calls"
                />
                <ComparisonRow
                  metric="Average Handle Time"
                  ai={8.5}
                  human={12.3}
                  unit="min"
                  inverse
                />
                <ComparisonRow
                  metric="First Call Resolution"
                  ai={78}
                  human={72}
                  unit="%"
                />
                <ComparisonRow
                  metric="Customer Satisfaction"
                  ai={88}
                  human={85}
                  unit="%"
                />
                <ComparisonRow
                  metric="Cost per Call"
                  ai={4.80}
                  human={26.50}
                  unit="$"
                  inverse
                />
                <ComparisonRow
                  metric="Available 24/7"
                  ai={100}
                  human={30}
                  unit="%"
                />
              </div>
            </CardContent>
          </Card>

          {/* Best Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Best for AI</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Initial qualification calls
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Appointment scheduling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Information gathering
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Follow-up calls
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    High-volume outreach
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Best for Human</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    Complex negotiations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    Enterprise deals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    Relationship building
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    Technical deep dives
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    Escalated issues
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  subtitle: string;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, trend, subtitle, icon: Icon }: MetricCardProps) {
  const isPositive = trend === "up";
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            <span className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}>
              {change}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface LearningMetricProps {
  metric: string;
  baseline: number;
  current: number;
  target: number;
}

function LearningMetric({ metric, baseline, current, target }: LearningMetricProps) {
  const improvement = ((current - baseline) / baseline * 100).toFixed(0);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{metric}</span>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{current}%</span>
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{improvement}%
          </Badge>
        </div>
      </div>
      <div className="relative w-full bg-secondary rounded-full h-2">
        <div
          className="absolute bg-muted rounded-full h-2"
          style={{ width: `${baseline}%` }}
        />
        <div
          className="absolute bg-primary rounded-full h-2 transition-all"
          style={{ width: `${current}%` }}
        />
        <div
          className="absolute top-0 h-2 border-r-2 border-foreground"
          style={{ left: `${target}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Baseline: {baseline}%</span>
        <span>Target: {target}%</span>
      </div>
    </div>
  );
}

interface ComparisonRowProps {
  metric: string;
  ai: number;
  human: number;
  unit: string;
  inverse?: boolean;
}

function ComparisonRow({ metric, ai, human, unit, inverse }: ComparisonRowProps) {
  const aiWins = inverse ? ai < human : ai > human;
  const difference = Math.abs(((ai - human) / human * 100)).toFixed(0);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{metric}</span>
        <Badge variant={aiWins ? "default" : "secondary"}>
          {aiWins ? "AI" : "Human"} +{difference}%
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950 rounded">
          <span className="flex items-center gap-1">
            <Brain className="h-3 w-3" />
            AI
          </span>
          <span className="font-medium">{ai}{unit}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            Human
          </span>
          <span className="font-medium">{human}{unit}</span>
        </div>
      </div>
    </div>
  );
}