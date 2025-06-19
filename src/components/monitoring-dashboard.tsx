"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Activity, AlertTriangle, CheckCircle, Clock, 
  Database, Download, Filter, Globe, Info,
  RefreshCw, Search, Server, Shield, Zap,
  Cpu, HardDrive, Gauge, TrendingUp, TrendingDown,
  AlertCircle, Play, Pause, Terminal, FileText,
  BarChart3, Settings, Eye, Bell, Mail,
  XCircle, Timer, Cloud, Lock, Users,
  Wifi, WifiOff, Monitor, Smartphone, LogOut,
  Plus, MoreVertical, Edit, Copy, Trash2, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow, subHours, subMinutes } from "date-fns";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
  threshold?: {
    warning: number;
    critical: number;
  };
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  source: string;
  message: string;
  metadata?: Record<string, any>;
  userId?: string;
  requestId?: string;
  duration?: number;
  stackTrace?: string;
}

interface AlertRule {
  id: string;
  name: string;
  description: string;
  condition: {
    metric: string;
    operator: '>' | '<' | '=' | '>=' | '<=' | '!=';
    value: number;
    duration?: number;
  };
  actions: {
    type: 'email' | 'slack' | 'webhook' | 'pagerduty';
    config: Record<string, any>;
  }[];
  severity: 'info' | 'warning' | 'critical';
  enabled: boolean;
  lastTriggered?: string;
  triggerCount: number;
}

interface HealthCheck {
  id: string;
  name: string;
  endpoint: string;
  interval: number;
  timeout: number;
  status: 'up' | 'down' | 'degraded';
  lastCheck: string;
  responseTime: number;
  uptime: number;
  errors: number;
}

interface MonitoringDashboardProps {
  className?: string;
}

export function MonitoringDashboard({ className }: MonitoringDashboardProps) {
  const [timeRange, setTimeRange] = useState('1h');
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  // Mock data
  const [systemMetrics] = useState<SystemMetric[]>([
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: 42,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      change: -2.3,
      threshold: { warning: 70, critical: 90 }
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: 68,
      unit: '%',
      status: 'warning',
      trend: 'up',
      change: 12.5,
      threshold: { warning: 65, critical: 85 }
    },
    {
      id: 'disk',
      name: 'Disk Space',
      value: 35,
      unit: '%',
      status: 'healthy',
      trend: 'up',
      change: 1.2,
      threshold: { warning: 80, critical: 95 }
    },
    {
      id: 'api_latency',
      name: 'API Latency',
      value: 245,
      unit: 'ms',
      status: 'healthy',
      trend: 'down',
      change: -15.3,
      threshold: { warning: 500, critical: 1000 }
    },
    {
      id: 'error_rate',
      name: 'Error Rate',
      value: 0.8,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      change: 0.1,
      threshold: { warning: 2, critical: 5 }
    },
    {
      id: 'requests',
      name: 'Requests/min',
      value: 1247,
      unit: 'req/min',
      status: 'healthy',
      trend: 'up',
      change: 8.7,
      threshold: { warning: 5000, critical: 10000 }
    }
  ]);

  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      level: 'info',
      source: 'api-gateway',
      message: 'Successfully processed webhook from CRM',
      metadata: { webhookId: 'wh_123', processingTime: 142 },
      userId: 'user_456',
      requestId: 'req_789',
      duration: 142
    },
    {
      id: '2',
      timestamp: subMinutes(new Date(), 5).toISOString(),
      level: 'warning',
      source: 'lead-processor',
      message: 'High memory usage detected during lead import',
      metadata: { memoryUsage: '82%', leadsProcessed: 1523 },
      requestId: 'req_790',
      duration: 3421
    },
    {
      id: '3',
      timestamp: subMinutes(new Date(), 12).toISOString(),
      level: 'error',
      source: 'email-service',
      message: 'Failed to send campaign email',
      metadata: { campaignId: 'camp_123', error: 'SMTP timeout' },
      userId: 'user_789',
      requestId: 'req_791',
      stackTrace: 'Error: SMTP timeout\\n  at EmailService.send (email.js:142)'
    },
    {
      id: '4',
      timestamp: subMinutes(new Date(), 20).toISOString(),
      level: 'debug',
      source: 'auth-service',
      message: 'User authentication successful',
      metadata: { method: 'oauth', provider: 'google' },
      userId: 'user_101',
      duration: 89
    },
    {
      id: '5',
      timestamp: subMinutes(new Date(), 35).toISOString(),
      level: 'critical',
      source: 'database',
      message: 'Database connection pool exhausted',
      metadata: { activeConnections: 100, maxConnections: 100 },
      stackTrace: 'Error: Connection pool exhausted\\n  at DatabasePool.acquire (db.js:78)'
    }
  ]);

  const [alertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High CPU Usage',
      description: 'Alert when CPU usage exceeds 80% for 5 minutes',
      condition: {
        metric: 'cpu_usage',
        operator: '>',
        value: 80,
        duration: 5
      },
      actions: [
        {
          type: 'email',
          config: { recipients: ['ops@company.com'] }
        },
        {
          type: 'slack',
          config: { channel: '#alerts', mention: '@oncall' }
        }
      ],
      severity: 'warning',
      enabled: true,
      lastTriggered: subHours(new Date(), 2).toISOString(),
      triggerCount: 3
    },
    {
      id: '2',
      name: 'API Error Rate',
      description: 'Alert when error rate exceeds 5%',
      condition: {
        metric: 'error_rate',
        operator: '>',
        value: 5
      },
      actions: [
        {
          type: 'pagerduty',
          config: { serviceKey: 'pd_service_123' }
        }
      ],
      severity: 'critical',
      enabled: true,
      triggerCount: 0
    },
    {
      id: '3',
      name: 'Low Disk Space',
      description: 'Alert when disk usage exceeds 90%',
      condition: {
        metric: 'disk_usage',
        operator: '>',
        value: 90
      },
      actions: [
        {
          type: 'webhook',
          config: { url: 'https://api.company.com/alerts' }
        }
      ],
      severity: 'warning',
      enabled: false,
      triggerCount: 1
    }
  ]);

  const [healthChecks] = useState<HealthCheck[]>([
    {
      id: '1',
      name: 'API Gateway',
      endpoint: 'https://api.mohitai.com/health',
      interval: 60,
      timeout: 5,
      status: 'up',
      lastCheck: new Date().toISOString(),
      responseTime: 142,
      uptime: 99.98,
      errors: 0
    },
    {
      id: '2',
      name: 'Database',
      endpoint: 'postgres://db.mohitai.com:5432',
      interval: 30,
      timeout: 3,
      status: 'up',
      lastCheck: new Date().toISOString(),
      responseTime: 23,
      uptime: 99.99,
      errors: 0
    },
    {
      id: '3',
      name: 'Redis Cache',
      endpoint: 'redis://cache.mohitai.com:6379',
      interval: 30,
      timeout: 2,
      status: 'degraded',
      lastCheck: new Date().toISOString(),
      responseTime: 512,
      uptime: 98.5,
      errors: 3
    },
    {
      id: '4',
      name: 'Email Service',
      endpoint: 'https://email.mohitai.com/health',
      interval: 120,
      timeout: 10,
      status: 'down',
      lastCheck: subMinutes(new Date(), 2).toISOString(),
      responseTime: 0,
      uptime: 95.2,
      errors: 12
    }
  ]);

  // Mock time series data
  const timeSeriesData = Array.from({ length: 60 }, (_, i) => ({
    time: format(subMinutes(new Date(), 60 - i), 'HH:mm'),
    cpu: Math.random() * 30 + 30,
    memory: Math.random() * 20 + 60,
    requests: Math.random() * 500 + 1000,
    errors: Math.random() * 10
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return 'text-green-600';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600';
      case 'critical':
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'debug':
        return 'text-gray-500';
      case 'info':
        return 'text-blue-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'critical':
        return 'text-red-800';
      default:
        return 'text-gray-600';
    }
  };

  const filteredLogs = logs.filter(log => {
    if (logFilter !== 'all' && log.level !== logFilter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Monitoring</h2>
          <p className="text-muted-foreground">Real-time system health and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5m">Last 5 min</SelectItem>
              <SelectItem value="15m">Last 15 min</SelectItem>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label>Auto refresh</Label>
          </div>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {systemMetrics.map((metric) => (
          <Card 
            key={metric.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg",
              selectedMetric === metric.id && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", {
                  'bg-green-100': metric.status === 'healthy',
                  'bg-yellow-100': metric.status === 'warning',
                  'bg-red-100': metric.status === 'critical'
                })}>
                  {metric.id === 'cpu' && <Cpu className="h-4 w-4" />}
                  {metric.id === 'memory' && <HardDrive className="h-4 w-4" />}
                  {metric.id === 'disk' && <Database className="h-4 w-4" />}
                  {metric.id === 'api_latency' && <Timer className="h-4 w-4" />}
                  {metric.id === 'error_rate' && <AlertTriangle className="h-4 w-4" />}
                  {metric.id === 'requests' && <Activity className="h-4 w-4" />}
                </div>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getStatusColor(metric.status))}
                >
                  {metric.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {metric.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
                  {metric.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-600" />}
                  <span className={cn("text-xs", metric.change > 0 ? 'text-green-600' : 'text-red-600')}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="health">Health Checks</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>System performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="cpu" 
                      stroke="#3b82f6" 
                      name="CPU %"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="memory" 
                      stroke="#8b5cf6" 
                      name="Memory %"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="requests" 
                      stroke="#10b981" 
                      name="Requests/min"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="errors" 
                      stroke="#ef4444" 
                      name="Errors"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Request Distribution</CardTitle>
                <CardDescription>API endpoint usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: '/api/leads', value: 35 },
                          { name: '/api/conversations', value: 28 },
                          { name: '/api/analytics', value: 20 },
                          { name: '/api/auth', value: 12 },
                          { name: 'Other', value: 5 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2, 3, 4].map((index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#6b7280'][index]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>API response time distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { range: '0-50ms', count: 245 },
                        { range: '50-100ms', count: 189 },
                        { range: '100-200ms', count: 124 },
                        { range: '200-500ms', count: 67 },
                        { range: '500ms+', count: 12 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>Real-time application logs and events</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={logFilter} onValueChange={setLogFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {filteredLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", getLogLevelColor(log.level))}
                            >
                              {log.level.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(log.timestamp), 'MMM dd HH:mm:ss')}
                            </span>
                            <span className="text-xs font-mono bg-muted px-1 rounded">
                              {log.source}
                            </span>
                            {log.userId && (
                              <span className="text-xs text-muted-foreground">
                                User: {log.userId}
                              </span>
                            )}
                          </div>
                          <p className="text-sm mb-1">{log.message}</p>
                          {log.metadata && (
                            <div className="text-xs font-mono text-muted-foreground">
                              {JSON.stringify(log.metadata)}
                            </div>
                          )}
                          {log.stackTrace && (
                            <details className="mt-1">
                              <summary className="text-xs text-muted-foreground cursor-pointer">
                                Stack trace
                              </summary>
                              <pre className="text-xs font-mono bg-muted p-2 rounded mt-1 overflow-x-auto">
                                {log.stackTrace}
                              </pre>
                            </details>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {log.duration && (
                            <span className="text-xs text-muted-foreground">
                              {log.duration}ms
                            </span>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Log
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Filter className="h-4 w-4 mr-2" />
                                Filter by Source
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Alert Rules</CardTitle>
                  <CardDescription>Configure monitoring alerts and notifications</CardDescription>
                </div>
                <Button onClick={() => setShowAlertDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Alert Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{rule.name}</h4>
                          <Badge 
                            variant={rule.severity === 'critical' ? 'destructive' : rule.severity === 'warning' ? 'default' : 'secondary'}
                          >
                            {rule.severity}
                          </Badge>
                          {rule.lastTriggered && (
                            <span className="text-xs text-muted-foreground">
                              Last triggered {formatDistanceToNow(new Date(rule.lastTriggered))} ago
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Gauge className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono">
                              {rule.condition.metric} {rule.condition.operator} {rule.condition.value}
                              {rule.condition.duration && ` for ${rule.condition.duration}min`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <span>{rule.actions.length} actions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span>Triggered {rule.triggerCount} times</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={rule.enabled} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Play className="h-4 w-4 mr-2" />
                              Test Alert
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Recent alert triggers and resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Alert className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">High Memory Usage</p>
                    <p className="text-xs text-muted-foreground">
                      Memory usage exceeded 65% threshold • 15 minutes ago
                    </p>
                  </div>
                  <Badge variant="outline" className="text-yellow-600">
                    Active
                  </Badge>
                </Alert>
                <Alert className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">API Latency Spike</p>
                    <p className="text-xs text-muted-foreground">
                      Resolved after 8 minutes • 2 hours ago
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Resolved
                  </Badge>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Service Health</CardTitle>
                  <CardDescription>Monitor critical service endpoints</CardDescription>
                </div>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Health Check
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthChecks.map((check) => (
                  <div key={check.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", {
                          'bg-green-100': check.status === 'up',
                          'bg-yellow-100': check.status === 'degraded',
                          'bg-red-100': check.status === 'down'
                        })}>
                          {check.status === 'up' && <Wifi className="h-5 w-5 text-green-600" />}
                          {check.status === 'degraded' && <WifiOff className="h-5 w-5 text-yellow-600" />}
                          {check.status === 'down' && <XCircle className="h-5 w-5 text-red-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{check.name}</h4>
                          <p className="text-sm text-muted-foreground">{check.endpoint}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-semibold">{check.uptime}%</p>
                          <p className="text-xs text-muted-foreground">Uptime</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{check.responseTime}ms</p>
                          <p className="text-xs text-muted-foreground">Response</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{check.errors}</p>
                          <p className="text-xs text-muted-foreground">Errors</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn(getStatusColor(check.status))}
                        >
                          {check.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Check every {check.interval}s • Timeout: {check.timeout}s</span>
                      <span>Last checked {formatDistanceToNow(new Date(check.lastCheck))} ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Status</CardTitle>
              <CardDescription>Cloud services and dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Cloud className="h-8 w-8 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">AWS Services</h4>
                    <p className="text-sm text-muted-foreground">All systems operational</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Database className="h-8 w-8 text-purple-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">Database Cluster</h4>
                    <p className="text-sm text-muted-foreground">Primary: Healthy • Replicas: 2/2</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">SSL Certificates</h4>
                    <p className="text-sm text-muted-foreground">Valid • Expires in 87 days</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Globe className="h-8 w-8 text-indigo-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">CDN</h4>
                    <p className="text-sm text-muted-foreground">Cache hit rate: 94.2%</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Configuration</CardTitle>
              <CardDescription>Configure monitoring preferences and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Data Retention Period</Label>
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="14d">14 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                      <SelectItem value="180d">180 days</SelectItem>
                      <SelectItem value="365d">365 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Alert Notification Channels</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">ops@mohitai.com</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Slack</p>
                          <p className="text-sm text-muted-foreground">#alerts channel</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">PagerDuty</p>
                          <p className="text-sm text-muted-foreground">Critical alerts only</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Log Export</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Export to S3</p>
                        <p className="text-sm text-muted-foreground">Automatically export logs to AWS S3</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Export to Datadog</p>
                        <p className="text-sm text-muted-foreground">Stream logs to Datadog for analysis</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Sampling Rate</Label>
                      <Select defaultValue="100">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="25">25%</SelectItem>
                          <SelectItem value="50">50%</SelectItem>
                          <SelectItem value="100">100%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable APM</p>
                        <p className="text-sm text-muted-foreground">Application Performance Monitoring</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alert Dialog */}
      <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Alert Rule</DialogTitle>
            <DialogDescription>
              Configure a new monitoring alert rule
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Alert Name</Label>
              <Input placeholder="e.g., High Database Connection Count" className="mt-2" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                placeholder="Describe what this alert monitors and why it's important" 
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Metric</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpu_usage">CPU Usage</SelectItem>
                    <SelectItem value="memory_usage">Memory Usage</SelectItem>
                    <SelectItem value="disk_usage">Disk Usage</SelectItem>
                    <SelectItem value="error_rate">Error Rate</SelectItem>
                    <SelectItem value="response_time">Response Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Condition</Label>
                <div className="flex gap-2 mt-2">
                  <Select>
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder=">" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">">{">"}</SelectItem>
                      <SelectItem value="<">{"<"}</SelectItem>
                      <SelectItem value=">=">{">="}</SelectItem>
                      <SelectItem value="<=">{"<="}</SelectItem>
                      <SelectItem value="=">{"="}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="number" placeholder="Threshold value" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Severity</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notification Channels</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="pagerduty">PagerDuty</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlertDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAlertDialog(false)}>
              Create Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}