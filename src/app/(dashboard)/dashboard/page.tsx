"use client";

import { PerformanceProfiler } from "@/components/PerformanceProfiler";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Users,
  Phone,
  TrendingUp,
  MessageSquare,
  Mail,
  Target,
  Zap,
  Activity,
  BarChart3,
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
      <div className="ultra-container">
        {/* Hero Section with Massive White Space */}
        <div className="ultra-spacer-3xl" />
        
        <div className="text-center">
          <h1 className="ultra-heading-1">Performance Dashboard</h1>
          <p className="text-lg opacity-60 max-w-2xl mx-auto mt-8">
            Monitor your inbound lead performance with real-time analytics
          </p>
        </div>
        
        <div className="ultra-spacer-3xl" />

        {/* Ultra-Modern Stats Grid */}
        <div className="ultra-grid ultra-grid-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`glass-card ${index === 0 ? 'glass-card-accent' : ''} scan-effect`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`ultra-icon-box ${index === 0 ? 'ultra-icon-box-accent' : 'ultra-icon-box-black'}`}>
                <stat.icon className="h-7 w-7" />
              </div>
              
              <div className="ultra-spacer-md" />
              
              <div className="ultra-number">{stat.value}</div>
              
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60 mt-4">
                {stat.label}
              </h3>
              
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-sm font-bold ${
                    stat.change.startsWith("+")
                      ? "text-accent-pink"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs opacity-50">
                  {stat.description}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="ultra-spacer-2xl" />

        {/* Ultra Charts Section */}
        <div className="ultra-grid ultra-grid-2">
          {/* Response Time Chart */}
          <div className="glass-card">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="ultra-heading-3">Response Metrics</h2>
                <p className="text-sm opacity-60 mt-2">Average response time today</p>
              </div>
              <div className="ultra-icon-box ultra-icon-box-accent">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            
            <div className="ultra-spacer-lg" />
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={responseTimeData}>
                <defs>
                  <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f99bff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f99bff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255,255,255,0.9)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(249,155,255,0.2)',
                    borderRadius: '16px'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f99bff"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#pinkGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Distribution */}
          <div className="glass-card">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="ultra-heading-3">Channel Performance</h2>
                <p className="text-sm opacity-60 mt-2">Lead engagement by channel</p>
              </div>
              <div className="ultra-icon-box ultra-icon-box-black">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            
            <div className="ultra-spacer-lg" />
            
            <div className="space-y-8">
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
            </div>
          </div>
        </div>
        
        <div className="ultra-spacer-2xl" />

        {/* Active Leads Section */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="ultra-heading-2">Active Leads</h2>
              <p className="text-lg opacity-60 mt-4">Currently being processed</p>
            </div>
            <button className="ultra-button ultra-button-accent">
              View All
            </button>
          </div>
          
          <div className="space-y-6">
            {activeLeads.map((lead, index) => (
              <div
                key={lead.id}
                className="glass-card scan-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-24 bg-gradient-to-br from-accent-pink to-accent-pink-dark flex items-center justify-center text-white font-bold text-lg">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-xl font-semibold">{lead.name}</p>
                      <p className="text-sm opacity-60 mt-1">
                        {lead.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <StatusBadge status={lead.status} />
                    <ChannelBadge channel={lead.channel} />
                    <span className="text-sm opacity-50">
                      {lead.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="ultra-spacer-3xl" />
        <div className="ultra-divider ultra-divider-accent" />
        <div className="ultra-spacer-3xl" />
      </div>
    </PerformanceProfiler>
  );
}

function ChannelStat({ icon: Icon, label, value, total }: any) {
  const percentage = (value / total) * 100;

  return (
    <div className="layout-space-y-4">
      <div className="layout-flex layout-items-center layout-justify-between">
        <div className="layout-flex layout-items-center layout-gap-4">
          <div className="layout-height-12 layout-width-12 app-corner-16 app-bg-black layout-flex layout-items-center layout-justify-center">
            <Icon className="layout-height-5 layout-width-5 app-text-white" />
          </div>
          <div>
            <span className="app-text-lg app-font-semibold">{label}</span>
            <p className="app-text-2xl app-font-bold layout-margin-top-1">{value}</p>
          </div>
        </div>
        <span className="app-text-3xl app-font-bold app-opacity-20">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="layout-relative layout-height-3 app-bg-gray-100 app-corner-circle app-overflow-hidden">
        <div 
          className="layout-absolute layout-inset-vertical layout-left-0 app-bg-gradient-primary app-corner-circle app-transition-full app-duration-1000 app-ease-out"
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
    <div className="layout-flex layout-items-center layout-gap-2 app-bg-gray-100 layout-pad-x-4 layout-pad-y-2 app-corner-circle">
      <Icon className="layout-height-4 layout-width-4" />
      <span className="app-text-sm app-font-medium">{channel}</span>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}