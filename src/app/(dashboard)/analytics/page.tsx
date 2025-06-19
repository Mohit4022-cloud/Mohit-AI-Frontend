"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuthStore } from "@/stores/authStore";
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, FunnelChart, Funnel, LabelList
} from "recharts";
import { 
  TrendingUp, TrendingDown, Clock, DollarSign, Users, 
  Activity, Target, Zap, Calendar as CalendarIcon, Download, Filter,
  Phone, Mail, MessageSquare, CheckCircle, XCircle, AlertTriangle,
  Plus, Save, Play, Pause, Settings, Eye, EyeOff, RefreshCw,
  FileText, Send, BarChart3, PieChart as PieChart3, Share2,
  Table, Layout, Palette, Database, ArrowRight, Sparkles,
  Brain, Bot, Layers, Grid, List, ChevronDown, MoreVertical,
  Copy, Trash2, Edit, Star, Lock, Unlock, BookOpen, HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { PipelineAnalytics } from "@/components/pipeline-analytics";
import { PredictiveAnalytics } from "@/components/predictive-analytics";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
  subtitle?: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  metrics: string[];
  charts: ChartConfig[];
  filters: FilterConfig[];
  schedule?: ScheduleConfig;
  recipients?: string[];
  lastRun?: string;
  isPublic: boolean;
  createdBy: string;
  usage: number;
}

interface ChartConfig {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'radar' | 'scatter' | 'funnel' | 'composed';
  title: string;
  dataKey: string;
  xAxis?: string;
  yAxis?: string;
  metrics: string[];
  colors?: string[];
  options?: any;
}

interface FilterConfig {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between' | 'in';
  value: any;
  label: string;
}

interface ScheduleConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  time: string;
  timezone: string;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  enabled: boolean;
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  widgets: ReportWidget[];
  filters: FilterConfig[];
  layout: 'grid' | 'list';
  theme: 'light' | 'dark' | 'auto';
  schedule?: ScheduleConfig;
  sharing: {
    isPublic: boolean;
    sharedWith: string[];
    permissions: 'view' | 'edit';
  };
  lastModified: string;
  createdBy: string;
}

interface ReportWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'text' | 'image';
  config: any;
  position: { x: number; y: number; w: number; h: number };
}

export default function EnhancedAnalyticsPage() {
  const { token, user } = useAuthStore();
  const [timeRange, setTimeRange] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [customReports, setCustomReports] = useState<CustomReport[]>([]);
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [automatedReports, setAutomatedReports] = useState<any[]>([]);
  const [reportBuilderMode, setReportBuilderMode] = useState<'create' | 'edit'>('create');
  const [editingReport, setEditingReport] = useState<CustomReport | null>(null);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
  const [reportLayout, setReportLayout] = useState<'grid' | 'list'>('grid');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  
  // Key Performance Metrics
  const [keyMetrics, setKeyMetrics] = useState<MetricCard[]>([
    {
      title: "Avg Response Time",
      value: "47 seconds",
      change: -23,
      changeType: "positive",
      icon: Clock,
      subtitle: "vs. 61 seconds last period"
    },
    {
      title: "Lead Conversion Rate",
      value: "24.3%",
      change: 5.2,
      changeType: "positive",
      icon: TrendingUp,
      subtitle: "1,247 of 5,132 leads"
    },
    {
      title: "Revenue Generated",
      value: "$487,230",
      change: 18.5,
      changeType: "positive",
      icon: DollarSign,
      subtitle: "From converted leads"
    },
    {
      title: "Active Leads",
      value: "1,832",
      change: 12,
      changeType: "positive",
      icon: Users,
      subtitle: "In pipeline"
    },
    {
      title: "SLA Compliance",
      value: "96.7%",
      change: 2.1,
      changeType: "positive",
      icon: CheckCircle,
      subtitle: "5-min target"
    },
    {
      title: "Cost per Lead",
      value: "$12.40",
      change: -8.3,
      changeType: "positive",
      icon: Target,
      subtitle: "Efficiency improved"
    }
  ]);

  // Chart Data (existing data from original file)
  const [responseTimeData, setResponseTimeData] = useState([
    { time: "00:00", value: 45 },
    { time: "04:00", value: 38 },
    { time: "08:00", value: 52 },
    { time: "12:00", value: 48 },
    { time: "16:00", value: 55 },
    { time: "20:00", value: 42 }
  ]);

  const [conversionFunnelData, setConversionFunnelData] = useState([
    { stage: "Leads Captured", value: 5132, percentage: 100 },
    { stage: "Contacted", value: 4876, percentage: 95 },
    { stage: "Qualified", value: 2841, percentage: 55.3 },
    { stage: "Opportunity", value: 1832, percentage: 35.7 },
    { stage: "Customer", value: 1247, percentage: 24.3 }
  ]);

  const [channelPerformanceData, setChannelPerformanceData] = useState([
    { channel: "Website", leads: 2341, conversion: 28, avgResponseTime: 32 },
    { channel: "Email", leads: 1523, conversion: 22, avgResponseTime: 45 },
    { channel: "LinkedIn", leads: 876, conversion: 31, avgResponseTime: 38 },
    { channel: "Phone", leads: 392, conversion: 42, avgResponseTime: 15 }
  ]);

  const [leadSourceROI, setLeadSourceROI] = useState([
    { name: "Organic Search", value: 35, roi: 4.2 },
    { name: "Paid Ads", value: 28, roi: 2.8 },
    { name: "Social Media", value: 20, roi: 3.5 },
    { name: "Referrals", value: 17, roi: 6.1 }
  ]);

  const [teamPerformanceData, setTeamPerformanceData] = useState([
    { name: "Sarah Johnson", leads: 342, converted: 98, avgResponseTime: 38, score: 92 },
    { name: "Michael Chen", leads: 298, converted: 78, avgResponseTime: 42, score: 88 },
    { name: "Emily Davis", leads: 276, converted: 71, avgResponseTime: 45, score: 85 },
    { name: "Robert Wilson", leads: 251, converted: 65, avgResponseTime: 51, score: 82 }
  ]);

  const [activityHeatmapData, setActivityHeatmapData] = useState([
    { hour: "9AM", Mon: 85, Tue: 92, Wed: 78, Thu: 88, Fri: 95, Sat: 45, Sun: 32 },
    { hour: "10AM", Mon: 92, Tue: 98, Wed: 88, Thu: 95, Fri: 102, Sat: 52, Sun: 38 },
    { hour: "11AM", Mon: 88, Tue: 95, Wed: 92, Thu: 98, Fri: 98, Sat: 48, Sun: 35 },
    { hour: "2PM", Mon: 78, Tue: 85, Wed: 82, Thu: 88, Fri: 85, Sat: 38, Sun: 28 },
    { hour: "3PM", Mon: 82, Tue: 88, Wed: 85, Thu: 92, Fri: 88, Sat: 42, Sun: 32 },
    { hour: "4PM", Mon: 75, Tue: 82, Wed: 78, Thu: 85, Fri: 82, Sat: 35, Sun: 25 }
  ]);

  useEffect(() => {
    fetchAnalyticsData();
    fetchReportTemplates();
    fetchCustomReports();
    fetchAutomatedReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const fetchReportTemplates = async () => {
    // Mock report templates
    const templates: ReportTemplate[] = [
      {
        id: 'rt1',
        name: 'Executive Dashboard',
        description: 'High-level KPIs and performance metrics for leadership',
        category: 'executive',
        metrics: ['conversion_rate', 'revenue', 'response_time', 'sla_compliance'],
        charts: [
          {
            id: 'c1',
            type: 'line',
            title: 'Revenue Trend',
            dataKey: 'revenue',
            metrics: ['revenue'],
            colors: ['#0088FE']
          },
          {
            id: 'c2',
            type: 'funnel',
            title: 'Conversion Funnel',
            dataKey: 'conversions',
            metrics: ['leads', 'qualified', 'opportunities', 'customers']
          }
        ],
        filters: [],
        isPublic: true,
        createdBy: 'System',
        usage: 245
      },
      {
        id: 'rt2',
        name: 'Sales Performance Report',
        description: 'Detailed analysis of sales team performance and lead conversion',
        category: 'sales',
        metrics: ['leads_handled', 'conversion_rate', 'avg_deal_size', 'win_rate'],
        charts: [
          {
            id: 'c3',
            type: 'bar',
            title: 'Team Performance',
            dataKey: 'performance',
            metrics: ['leads', 'converted', 'revenue']
          }
        ],
        filters: [
          {
            id: 'f1',
            field: 'team',
            operator: 'in',
            value: ['sales'],
            label: 'Sales Team Only'
          }
        ],
        schedule: {
          frequency: 'weekly',
          time: '09:00',
          timezone: 'America/New_York',
          daysOfWeek: [1],
          enabled: true
        },
        recipients: ['sales-manager@company.com'],
        lastRun: new Date(Date.now() - 86400000).toISOString(),
        isPublic: false,
        createdBy: 'Sales Manager',
        usage: 89
      },
      {
        id: 'rt3',
        name: 'Marketing Attribution Report',
        description: 'Track ROI and performance across marketing channels',
        category: 'marketing',
        metrics: ['leads_by_source', 'cost_per_lead', 'channel_roi', 'attribution'],
        charts: [
          {
            id: 'c4',
            type: 'pie',
            title: 'Lead Sources',
            dataKey: 'sources',
            metrics: ['organic', 'paid', 'social', 'referral']
          },
          {
            id: 'c5',
            type: 'scatter',
            title: 'Cost vs Conversion',
            dataKey: 'efficiency',
            xAxis: 'cost',
            yAxis: 'conversion',
            metrics: ['cost', 'conversion']
          }
        ],
        filters: [],
        isPublic: true,
        createdBy: 'Marketing Team',
        usage: 156
      }
    ];
    
    setReportTemplates(templates);
  };

  const fetchCustomReports = async () => {
    // Mock custom reports
    const reports: CustomReport[] = [
      {
        id: 'cr1',
        name: 'Q4 Board Presentation',
        description: 'Quarterly results and projections for board meeting',
        widgets: [
          {
            id: 'w1',
            type: 'metric',
            config: {
              title: 'Total Revenue',
              value: '$2.4M',
              change: 23.5,
              icon: 'dollar'
            },
            position: { x: 0, y: 0, w: 3, h: 2 }
          },
          {
            id: 'w2',
            type: 'chart',
            config: {
              type: 'line',
              title: 'Monthly Revenue Trend',
              data: 'revenue_trend'
            },
            position: { x: 3, y: 0, w: 6, h: 4 }
          }
        ],
        filters: [],
        layout: 'grid',
        theme: 'light',
        sharing: {
          isPublic: false,
          sharedWith: ['board@company.com'],
          permissions: 'view'
        },
        lastModified: new Date(Date.now() - 172800000).toISOString(),
        createdBy: user?.name || 'Admin'
      }
    ];
    
    setCustomReports(reports);
  };

  const fetchAutomatedReports = async () => {
    // Mock automated reports
    const automated = [
      {
        id: 'ar1',
        name: 'Daily Performance Summary',
        template: 'Executive Dashboard',
        schedule: {
          frequency: 'daily',
          time: '08:00',
          timezone: 'America/New_York',
          enabled: true
        },
        recipients: ['team@company.com'],
        lastSent: new Date(Date.now() - 86400000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        status: 'active'
      },
      {
        id: 'ar2',
        name: 'Weekly Sales Report',
        template: 'Sales Performance Report',
        schedule: {
          frequency: 'weekly',
          time: '09:00',
          timezone: 'America/New_York',
          daysOfWeek: [1],
          enabled: true
        },
        recipients: ['sales@company.com', 'management@company.com'],
        lastSent: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 259200000).toISOString(),
        status: 'active'
      }
    ];
    
    setAutomatedReports(automated);
  };

  const createCustomReport = async (report: Partial<CustomReport>) => {
    // Simulate API call
    const newReport: CustomReport = {
      id: `cr${Date.now()}`,
      name: report.name || 'Untitled Report',
      description: report.description || '',
      widgets: report.widgets || [],
      filters: report.filters || [],
      layout: report.layout || 'grid',
      theme: report.theme || 'light',
      sharing: {
        isPublic: false,
        sharedWith: [],
        permissions: 'view'
      },
      lastModified: new Date().toISOString(),
      createdBy: user?.name || 'User'
    };
    
    setCustomReports([...customReports, newReport]);
    setShowReportBuilder(false);
  };

  const scheduleAutomatedReport = async (config: any) => {
    const newAutomated = {
      id: `ar${Date.now()}`,
      name: config.name,
      template: config.template,
      schedule: config.schedule,
      recipients: config.recipients,
      lastSent: null,
      nextRun: calculateNextRun(config.schedule),
      status: 'active'
    };
    
    setAutomatedReports([...automatedReports, newAutomated]);
  };

  const calculateNextRun = (schedule: ScheduleConfig) => {
    // Simple calculation for demo
    const now = new Date();
    if (schedule.frequency === 'daily') {
      now.setDate(now.getDate() + 1);
    } else if (schedule.frequency === 'weekly') {
      now.setDate(now.getDate() + 7);
    } else if (schedule.frequency === 'monthly') {
      now.setMonth(now.getMonth() + 1);
    }
    return now.toISOString();
  };

  const getMetricIcon = (icon: any) => {
    const Icon = icon;
    return <Icon className="h-5 w-5" />;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Report Builder Component
  const ReportBuilder = () => {
    const [reportName, setReportName] = useState(editingReport?.name || '');
    const [reportDescription, setReportDescription] = useState(editingReport?.description || '');
    const [selectedChartType, setSelectedChartType] = useState<string>('line');
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
    const [reportWidgets, setReportWidgets] = useState<ReportWidget[]>(editingReport?.widgets || []);

    const availableMetrics = [
      { id: 'leads', label: 'Total Leads', category: 'acquisition' },
      { id: 'conversion_rate', label: 'Conversion Rate', category: 'performance' },
      { id: 'revenue', label: 'Revenue', category: 'financial' },
      { id: 'response_time', label: 'Avg Response Time', category: 'efficiency' },
      { id: 'sla_compliance', label: 'SLA Compliance', category: 'quality' },
      { id: 'cost_per_lead', label: 'Cost per Lead', category: 'financial' },
      { id: 'customer_lifetime_value', label: 'Customer LTV', category: 'financial' },
      { id: 'churn_rate', label: 'Churn Rate', category: 'retention' },
      { id: 'nps_score', label: 'NPS Score', category: 'satisfaction' },
      { id: 'agent_utilization', label: 'Agent Utilization', category: 'efficiency' }
    ];

    const chartTypes = [
      { id: 'line', label: 'Line Chart', icon: Activity },
      { id: 'bar', label: 'Bar Chart', icon: BarChart3 },
      { id: 'pie', label: 'Pie Chart', icon: PieChart3 },
      { id: 'area', label: 'Area Chart', icon: Activity },
      { id: 'scatter', label: 'Scatter Plot', icon: Sparkles },
      { id: 'funnel', label: 'Funnel Chart', icon: Filter },
      { id: 'radar', label: 'Radar Chart', icon: Target }
    ];

    const addWidget = (type: string) => {
      const newWidget: ReportWidget = {
        id: `w${Date.now()}`,
        type: type as any,
        config: {
          title: 'New Widget',
          data: selectedMetrics
        },
        position: { 
          x: reportWidgets.length % 4 * 3, 
          y: Math.floor(reportWidgets.length / 4) * 3, 
          w: 3, 
          h: 3 
        }
      };
      
      setReportWidgets([...reportWidgets, newWidget]);
    };

    return (
      <div className="space-y-6">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="Enter report name..."
            />
          </div>
          
          <div>
            <Label htmlFor="report-description">Description</Label>
            <Input
              id="report-description"
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Brief description of this report..."
            />
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-4">Select Metrics</h4>
          <ScrollArea className="h-48 border rounded-lg p-4">
            <div className="space-y-4">
              {['acquisition', 'performance', 'financial', 'efficiency', 'quality', 'satisfaction'].map(category => (
                <div key={category}>
                  <h5 className="text-sm font-medium text-muted-foreground capitalize mb-2">{category}</h5>
                  <div className="space-y-2">
                    {availableMetrics
                      .filter(m => m.category === category)
                      .map(metric => (
                        <div key={metric.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={metric.id}
                            checked={selectedMetrics.includes(metric.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMetrics([...selectedMetrics, metric.id]);
                              } else {
                                setSelectedMetrics(selectedMetrics.filter(m => m !== metric.id));
                              }
                            }}
                          />
                          <Label
                            htmlFor={metric.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {metric.label}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Add Visualizations</h4>
          <div className="grid grid-cols-4 gap-3">
            {chartTypes.map(chart => (
              <Button
                key={chart.id}
                variant="outline"
                onClick={() => addWidget('chart')}
                className="h-24 flex flex-col gap-2"
              >
                <chart.icon className="h-6 w-6" />
                <span className="text-xs">{chart.label}</span>
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => addWidget('metric')}
              className="h-24 flex flex-col gap-2"
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs">Metric Card</span>
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Report Preview</h4>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReportLayout(reportLayout === 'grid' ? 'list' : 'grid')}
              >
                {reportLayout === 'grid' ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 min-h-[300px] bg-muted/30">
            {reportWidgets.length === 0 ? (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                <div className="text-center">
                  <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Add widgets to build your report</p>
                </div>
              </div>
            ) : (
              <div className={cn(
                reportLayout === 'grid' ? "grid grid-cols-12 gap-4" : "space-y-4"
              )}>
                {reportWidgets.map(widget => (
                  <div
                    key={widget.id}
                    className={cn(
                      "border rounded-lg p-4 bg-background",
                      reportLayout === 'grid' 
                        ? `col-span-${widget.position.w} row-span-${widget.position.h}`
                        : ""
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{widget.config.title}</h5>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Widget
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {widget.type === 'metric' ? (
                      <div className="text-2xl font-bold">--</div>
                    ) : (
                      <div className="h-32 bg-muted/50 rounded flex items-center justify-center text-muted-foreground">
                        <BarChart3 className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowReportBuilder(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => createCustomReport({
              name: reportName,
              description: reportDescription,
              widgets: reportWidgets,
              layout: reportLayout
            })}
            disabled={!reportName || reportWidgets.length === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Report
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive performance insights and custom reporting</p>
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => {
                  if (range) {
                    setDateRange({ from: range.from, to: range.to || undefined });
                  } else {
                    setDateRange({ from: undefined, to: undefined });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => setShowReportBuilder(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Custom Report Builder Dialog */}
      <Dialog open={showReportBuilder} onOpenChange={setShowReportBuilder}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {reportBuilderMode === 'create' ? 'Create Custom Report' : 'Edit Report'}
            </DialogTitle>
            <DialogDescription>
              Build custom reports with drag-and-drop widgets and real-time data
            </DialogDescription>
          </DialogHeader>
          
          <ReportBuilder />
        </DialogContent>
      </Dialog>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                {getMetricIcon(metric.icon)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {metric.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : metric.changeType === 'negative' ? (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                ) : null}
                <span className={cn(
                  "text-xs font-medium",
                  metric.changeType === 'positive' ? "text-green-600" : "text-red-600"
                )}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              {metric.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="automated">Automated</TabsTrigger>
        </TabsList>

        {/* Performance Tab (existing content) */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Trend</CardTitle>
              <CardDescription>Average first response time throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0088FE" 
                    fill="#0088FE" 
                    fillOpacity={0.6}
                    name="Response Time (seconds)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Activity Heatmap</CardTitle>
              <CardDescription>Identify peak hours for inbound leads</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityHeatmapData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Mon" fill="#8884d8" />
                  <Bar dataKey="Tue" fill="#82ca9d" />
                  <Bar dataKey="Wed" fill="#ffc658" />
                  <Bar dataKey="Thu" fill="#ff7c7c" />
                  <Bar dataKey="Fri" fill="#8dd1e1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Analytics Tab */}
        <TabsContent value="pipeline" className="space-y-4">
          <PipelineAnalytics 
            onBottleneckSelect={(bottleneck) => {
              console.log('Selected bottleneck:', bottleneck);
              // Handle bottleneck selection - could open a modal or navigate to a detailed view
            }}
          />
        </TabsContent>

        {/* Conversion Tab (existing content) */}
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Lead progression through sales stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnelData.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <span className="text-sm text-muted-foreground">
                        {stage.value.toLocaleString()} ({stage.percentage}%)
                      </span>
                    </div>
                    <Progress value={stage.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Source ROI</CardTitle>
              <CardDescription>Return on investment by lead source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadSourceROI}
                    cx="50%"
                    cy="50%"
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadSourceROI.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {leadSourceROI.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <Badge variant="outline">{source.roi}x ROI</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Reports Tab */}
        <TabsContent value="custom" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Custom Reports</h3>
            <Button onClick={() => setShowReportBuilder(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>

          {/* Report Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-built templates to get started quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reportTemplates.map(template => (
                  <Card key={template.id} className="cursor-pointer hover:bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{template.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {template.usage} uses
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.metrics.slice(0, 3).map(metric => (
                          <Badge key={metric} variant="secondary" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                        {template.metrics.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.metrics.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {template.isPublic ? (
                            <Unlock className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            by {template.createdBy}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          Use Template
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Reports */}
          <Card>
            <CardHeader>
              <CardTitle>My Reports</CardTitle>
              <CardDescription>Custom reports you&apos;ve created</CardDescription>
            </CardHeader>
            <CardContent>
              {customReports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No custom reports yet</p>
                  <Button variant="outline" onClick={() => setShowReportBuilder(true)}>
                    Create Your First Report
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {customReports.map(report => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>Modified {format(new Date(report.lastModified), 'MMM d, yyyy')}</span>
                            <span>{report.widgets.length} widgets</span>
                            {report.sharing.isPublic && (
                              <Badge variant="outline" className="text-xs">Public</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingReport(report);
                            setReportBuilderMode('edit');
                            setShowReportBuilder(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automated Reports Tab */}
        <TabsContent value="automated" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Automated Reports</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Report
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Automated Report</DialogTitle>
                  <DialogDescription>
                    Set up recurring reports to be sent automatically
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Report Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTemplates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Recipients</Label>
                    <Input placeholder="email1@company.com, email2@company.com" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Send immediately after creation</Label>
                    <Switch />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Schedule Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Manage your automated report deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedReports.map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        report.status === 'active' ? "bg-green-100" : "bg-gray-100"
                      )}>
                        <Send className={cn(
                          "h-5 w-5",
                          report.status === 'active' ? "text-green-600" : "text-gray-600"
                        )} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {report.schedule.frequency} at {report.schedule.time} • {report.recipients.length} recipients
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          {report.lastSent && (
                            <span>Last sent: {format(new Date(report.lastSent), 'MMM d, h:mm a')}</span>
                          )}
                          <span>Next run: {format(new Date(report.nextRun), 'MMM d, h:mm a')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = automatedReports.map(r => 
                            r.id === report.id 
                              ? { ...r, status: r.status === 'active' ? 'paused' : 'active' }
                              : r
                          );
                          setAutomatedReports(updated);
                        }}
                      >
                        {report.status === 'active' ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report History */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery History</CardTitle>
              <CardDescription>Track report delivery status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Daily Performance Summary</TableCell>
                    <TableCell>{format(new Date(), 'MMM d, h:mm a')}</TableCell>
                    <TableCell>12 recipients</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Delivered
                      </Badge>
                    </TableCell>
                    <TableCell>83%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Weekly Sales Report</TableCell>
                    <TableCell>{format(new Date(Date.now() - 86400000), 'MMM d, h:mm a')}</TableCell>
                    <TableCell>8 recipients</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Delivered
                      </Badge>
                    </TableCell>
                    <TableCell>92%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other existing tabs... */}
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance Comparison</CardTitle>
              <CardDescription>Effectiveness across communication channels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={channelPerformanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="channel" />
                  <PolarRadiusAxis />
                  <Radar 
                    name="Leads" 
                    dataKey="leads" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Conversion %" 
                    dataKey="conversion" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.6} 
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Leaderboard</CardTitle>
              <CardDescription>Individual SDR performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformanceData.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {index === 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                            <Star className="h-3 w-3" />
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Performance Score: {member.score}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{member.leads}</p>
                        <p className="text-muted-foreground">Leads</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{member.converted}</p>
                        <p className="text-muted-foreground">Converted</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">
                          {((member.converted / member.leads) * 100).toFixed(1)}%
                        </p>
                        <p className="text-muted-foreground">Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{member.avgResponseTime}s</p>
                        <p className="text-muted-foreground">Avg Response</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <PredictiveAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );

  function Alert({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={cn("p-3 border rounded-lg", className)}>
        {children}
      </div>
    );
  }

  function Table({ children }: { children: React.ReactNode }) {
    return <table className="w-full">{children}</table>;
  }

  function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="border-b">{children}</thead>;
  }

  function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
  }

  function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="border-b">{children}</tr>;
  }

  function TableHead({ children }: { children: React.ReactNode }) {
    return <th className="text-left p-2 font-medium text-muted-foreground">{children}</th>;
  }

  function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
    return <td className={cn("p-2", className)}>{children}</td>;
  }

  function Separator() {
    return <div className="border-t my-4" />;
  }
}