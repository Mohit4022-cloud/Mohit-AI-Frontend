"use client";

import { PerformanceProfiler } from "@/components/PerformanceProfiler";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Users,
  Phone,
  TrendingUp,
  MessageSquare,
  Mail,
  Target,
} from "lucide-react";

// Import Recharts components directly for now to fix loading issues
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Mock data
const responseTimeData = [
  { time: "00:00", value: 45 },
  { time: "04:00", value: 52 },
  { time: "08:00", value: 38 },
  { time: "12:00", value: 42 },
  { time: "16:00", value: 35 },
  { time: "20:00", value: 48 },
];

const stats = [
  {
    label: "Avg Response Time",
    value: "47s",
    change: "-23%",
    icon: Clock,
    description: "vs last week",
  },
  {
    label: "Leads Contacted",
    value: "1,234",
    change: "+12%",
    icon: Users,
    description: "this month",
  },
  {
    label: "Qualification Rate",
    value: "68%",
    change: "+5%",
    icon: Target,
    description: "qualified leads",
  },
  {
    label: "Conversion Rate",
    value: "24%",
    change: "+8%",
    icon: TrendingUp,
    description: "to opportunities",
  },
];

const activeLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechCorp",
    status: "qualifying",
    channel: "voice",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    company: "StartupXYZ",
    status: "contacted",
    channel: "chat",
    time: "5m ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    company: "Enterprise Co",
    status: "new",
    channel: "email",
    time: "8m ago",
  },
];

export default function DashboardPage() {
  return (
    <PerformanceProfiler id="DashboardPage">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your inbound lead performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs">
                  <span
                    className={
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Response Time Trend</CardTitle>
              <CardDescription>
                Average response time throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={responseTimeData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Channel Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Response Channels</CardTitle>
              <CardDescription>Lead engagement by channel today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ChannelStat
                icon={Phone}
                label="Voice Calls"
                value={245}
                total={500}
              />
              <ChannelStat
                icon={MessageSquare}
                label="Live Chat"
                value={189}
                total={500}
              />
              <ChannelStat icon={Mail} label="Email" value={156} total={500} />
              <ChannelStat
                icon={MessageSquare}
                label="SMS"
                value={110}
                total={500}
              />
            </CardContent>
          </Card>
        </div>

        {/* Active Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Active Leads</CardTitle>
            <CardDescription>Leads currently being processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={lead.status} />
                    <ChannelBadge channel={lead.channel} />
                    <span className="text-sm text-muted-foreground">
                      {lead.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PerformanceProfiler>
  );
}

function ChannelStat({ icon: Icon, label, value, total }: any) {
  const percentage = (value / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    qualifying: "bg-purple-100 text-purple-800",
    qualified: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        styles[status as keyof typeof styles],
      )}
    >
      {status}
    </span>
  );
}

function ChannelBadge({ channel }: { channel: string }) {
  const icons = {
    voice: Phone,
    chat: MessageSquare,
    email: Mail,
    sms: MessageSquare,
  };

  const Icon = icons[channel as keyof typeof icons];

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Icon className="h-3 w-3" />
      <span className="text-xs">{channel}</span>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}