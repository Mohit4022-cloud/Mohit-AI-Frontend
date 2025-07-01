"use client";

import { PerformanceProfiler } from "@/components/PerformanceProfiler";
import {
  Clock,
  Users,
  Phone,
  TrendingUp,
  MessageSquare,
  Mail,
  Target,
  Activity,
  BarChart3,
} from "lucide-react";
import "@/app/dashboard-optimizations.css";

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
      <div className="layout-dashboard-wrapper">
        <div className="layout-dashboard-container">
          {/* Compact Page Header */}
          <div className="layout-page-header">
            <h1 className="layout-page-title">Performance Dashboard</h1>
            <p className="layout-page-subtitle">
              Monitor your inbound lead performance with real-time analytics
            </p>
          </div>

          {/* Compact Metrics Grid */}
          <div className="layout-metrics-grid">
            {stats.map((stat, index) => (
              <div key={stat.label} className="data-metric-box">
                <div className={`data-metric-icon ${index === 0 ? 'data-metric-icon-accent' : 'data-metric-icon-black'}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                
                <div className="data-metric-value">{stat.value}</div>
                
                <h3 className="data-metric-label">{stat.label}</h3>
                
                <div className="data-metric-change">
                  <span className={stat.change.startsWith("+") ? "data-metric-change-positive" : "data-metric-change-negative"}>
                    {stat.change}
                  </span>
                  <span className="data-metric-description">{stat.description}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="layout-charts-grid">
            {/* Response Time Chart */}
            <div className="data-chart-container">
              <div className="data-chart-header">
                <div>
                  <h2 className="data-chart-title">Response Metrics</h2>
                  <p className="data-chart-subtitle">Average response time today</p>
                </div>
                <div className="data-metric-icon data-metric-icon-accent">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={responseTimeData}>
                  <defs>
                    <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f99bff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f99bff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="time" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(255,255,255,0.9)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(249,155,255,0.2)',
                      borderRadius: '12px',
                      fontSize: '13px'
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#f99bff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#pinkGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Channel Distribution */}
            <div className="data-chart-container">
              <div className="data-chart-header">
                <div>
                  <h2 className="data-chart-title">Channel Performance</h2>
                  <p className="data-chart-subtitle">Lead engagement by channel</p>
                </div>
                <div className="data-metric-icon data-metric-icon-black">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              
              <div className="space-y-4">
                <ChannelStat icon={Phone} label="Voice Calls" value={245} total={500} />
                <ChannelStat icon={MessageSquare} label="Live Chat" value={189} total={500} />
                <ChannelStat icon={Mail} label="Email" value={156} total={500} />
                <ChannelStat icon={MessageSquare} label="SMS" value={110} total={500} />
              </div>
            </div>
          </div>

          {/* Active Leads Section */}
          <div className="data-active-leads-container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="data-chart-title">Active Leads</h2>
                <p className="data-chart-subtitle">Currently being processed</p>
              </div>
              <button className="control-action control-action-accent">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {activeLeads.map((lead) => (
                <div key={lead.id} className="data-lead-item">
                  <div className="flex items-center">
                    <div className="data-lead-avatar">
                      {lead.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="data-lead-info">
                      <p className="data-lead-name">{lead.name}</p>
                      <p className="data-lead-company">{lead.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={lead.status} />
                    <ChannelBadge channel={lead.channel} />
                    <span className="text-xs opacity-50">{lead.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PerformanceProfiler>
  );
}

function ChannelStat({ icon: Icon, label, value, total }: any) {
  const percentage = (value / total) * 100;

  return (
    <div className="data-channel-stat">
      <div className="data-channel-header">
        <div className="data-channel-info">
          <div className="data-channel-icon-box">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <span className="data-channel-label">{label}</span>
            <p className="data-channel-value">{value}</p>
          </div>
        </div>
        <span className="data-channel-percentage">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="data-channel-progress">
        <div 
          className="data-channel-progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    new: "app-status-indicator",
    contacted: "app-status-indicator",
    qualifying: "app-status-indicator app-status-indicator-accent",
    qualified: "app-status-indicator",
  };

  return (
    <span className={styles[status as keyof typeof styles] || "app-status-indicator"}>
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
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
      <Icon className="h-3 w-3" />
      <span className="text-xs font-medium">{channel}</span>
    </div>
  );
}