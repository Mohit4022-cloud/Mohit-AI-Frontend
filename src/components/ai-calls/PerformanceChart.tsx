import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";

interface PerformanceChartProps {
  detailed?: boolean;
}

export function PerformanceChart({ detailed = false }: PerformanceChartProps) {
  const [timeRange, setTimeRange] = useState("7d");
  const [metric, setMetric] = useState("calls");

  // Mock data - in production, this would come from API
  const callVolumeData = [
    { date: "Mon", ai: 45, human: 12, hybrid: 8 },
    { date: "Tue", ai: 52, human: 15, hybrid: 10 },
    { date: "Wed", ai: 48, human: 18, hybrid: 12 },
    { date: "Thu", ai: 58, human: 14, hybrid: 9 },
    { date: "Fri", ai: 65, human: 20, hybrid: 15 },
    { date: "Sat", ai: 32, human: 8, hybrid: 5 },
    { date: "Sun", ai: 28, human: 6, hybrid: 4 },
  ];

  const sentimentData = [
    { date: "Mon", score: 82 },
    { date: "Tue", score: 85 },
    { date: "Wed", score: 78 },
    { date: "Thu", score: 88 },
    { date: "Fri", score: 92 },
    { date: "Sat", score: 86 },
    { date: "Sun", score: 84 },
  ];

  const outcomeData = [
    { name: "Qualified", value: 42, color: "#10B981" },
    { name: "Not Interested", value: 28, color: "#EF4444" },
    { name: "Follow-up", value: 20, color: "#F59E0B" },
    { name: "No Answer", value: 10, color: "#6B7280" },
  ];

  const durationData = [
    { range: "0-5 min", count: 25 },
    { range: "5-10 min", count: 45 },
    { range: "10-15 min", count: 38 },
    { range: "15-20 min", count: 22 },
    { range: "20+ min", count: 15 },
  ];

  if (!detailed) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">
              Call Performance
            </CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24h</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stackId="1"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="human"
                  stackId="1"
                  stroke="#16A34A"
                  fill="#16A34A"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="hybrid"
                  stackId="1"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI Call Analytics</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calls">Call Volume</SelectItem>
                  <SelectItem value="sentiment">Sentiment</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="outcomes">Outcomes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24h</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="volume" className="space-y-4">
            <TabsList>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="duration">Duration</TabsTrigger>
            </TabsList>

            <TabsContent value="volume" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callVolumeData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ai" fill="#2563EB" name="AI Calls" />
                  <Bar dataKey="human" fill="#16A34A" name="Human Calls" />
                  <Bar dataKey="hybrid" fill="#F59E0B" name="Hybrid Calls" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="sentiment" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="outcomes" className="h-[300px]">
              <div className="grid grid-cols-2 gap-4 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {outcomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col justify-center space-y-2">
                  {outcomeData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="duration" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={durationData} layout="horizontal">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#EC4899" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="AI Resolution Rate"
          value="78%"
          subtitle="Calls resolved without human intervention"
          trend="+5%"
        />
        <MetricCard
          title="Avg Handle Time"
          value="8:45"
          subtitle="12% faster than last month"
          trend="-12%"
        />
        <MetricCard
          title="Cost Savings"
          value="$24,500"
          subtitle="Saved this month with AI calls"
          trend="+18%"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
}

function MetricCard({ title, value, subtitle, trend }: MetricCardProps) {
  const isPositive = trend.startsWith("+");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            <span
              className={`text-sm font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
