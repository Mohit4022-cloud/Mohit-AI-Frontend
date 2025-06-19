"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Clock, Timer, AlertTriangle, TrendingUp, Users, 
  Zap, Settings, Plus, Edit, Trash2, Play, Pause,
  BarChart3, Target, Shield, Bell, Mail, Phone,
  MessageSquare, Calendar, CheckCircle, XCircle,
  Info, RefreshCw, Save, ArrowUp, ArrowDown, ArrowRight,
  GitBranch, Activity, Eye, Filter, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow, addMinutes } from "date-fns";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

interface QueueItem {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'waiting' | 'in_progress' | 'escalated' | 'completed' | 'abandoned';
  assignedTo?: string;
  enqueuedAt: string;
  startedAt?: string;
  waitTime: number; // in minutes
  handleTime?: number;
  channel: 'web' | 'email' | 'phone' | 'chat' | 'social';
  reason: string;
  tags: string[];
  slaStatus: 'on_track' | 'at_risk' | 'breached';
  escalationLevel: number;
}

interface EscalationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'wait_time' | 'priority' | 'vip' | 'score' | 'attempts';
    operator: 'greater_than' | 'less_than' | 'equals';
    value: number;
    unit?: 'minutes' | 'hours' | 'attempts';
  };
  actions: {
    type: 'change_priority' | 'reassign' | 'notify' | 'auto_respond' | 'create_task';
    target?: string;
    message?: string;
    priority?: string;
  }[];
  conditions?: {
    field: string;
    operator: string;
    value: any;
  }[];
  enabled: boolean;
  lastTriggered?: string;
  triggerCount: number;
}

interface SLAPolicy {
  id: string;
  name: string;
  description: string;
  targets: {
    priority: string;
    firstResponseTime: number; // minutes
    resolutionTime: number; // minutes
  }[];
  businessHours: {
    enabled: boolean;
    timezone: string;
    hours: {
      day: string;
      start: string;
      end: string;
    }[];
  };
  enabled: boolean;
}

interface QueueConfig {
  maxWaitTime: number;
  autoAssignment: boolean;
  roundRobin: boolean;
  skillBasedRouting: boolean;
  priorityWeights: {
    score: number;
    waitTime: number;
    channel: number;
    vip: number;
  };
  channels: {
    web: boolean;
    email: boolean;
    phone: boolean;
    chat: boolean;
    social: boolean;
  };
}

interface AdvancedQueueManagerProps {
  queueItems?: QueueItem[];
  onQueueUpdate?: (items: QueueItem[]) => void;
  onEscalation?: (item: QueueItem, rule: EscalationRule) => void;
  className?: string;
}

export function AdvancedQueueManager({ 
  queueItems = [], 
  onQueueUpdate,
  onEscalation,
  className 
}: AdvancedQueueManagerProps) {
  const [queue, setQueue] = useState<QueueItem[]>(queueItems);
  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([]);
  const [slaPolicies, setSlaPolicies] = useState<SLAPolicy[]>([]);
  const [queueConfig, setQueueConfig] = useState<QueueConfig>({
    maxWaitTime: 30,
    autoAssignment: true,
    roundRobin: true,
    skillBasedRouting: false,
    priorityWeights: {
      score: 30,
      waitTime: 40,
      channel: 20,
      vip: 10
    },
    channels: {
      web: true,
      email: true,
      phone: true,
      chat: true,
      social: true
    }
  });
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [showSLADialog, setShowSLADialog] = useState(false);
  const [editingRule, setEditingRule] = useState<EscalationRule | null>(null);
  const [editingSLA, setEditingSLA] = useState<SLAPolicy | null>(null);
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    // Load default escalation rules
    const defaultRules: EscalationRule[] = [
      {
        id: '1',
        name: 'High Priority Escalation',
        description: 'Escalate high priority items waiting over 15 minutes',
        trigger: {
          type: 'wait_time',
          operator: 'greater_than',
          value: 15,
          unit: 'minutes'
        },
        actions: [
          { type: 'change_priority', priority: 'urgent' },
          { type: 'notify', target: 'manager@company.com', message: 'High priority lead escalated' }
        ],
        conditions: [
          { field: 'priority', operator: 'equals', value: 'high' }
        ],
        enabled: true,
        triggerCount: 0
      },
      {
        id: '2',
        name: 'VIP Auto Response',
        description: 'Send automatic response to VIP leads',
        trigger: {
          type: 'score',
          operator: 'greater_than',
          value: 90
        },
        actions: [
          { 
            type: 'auto_respond', 
            message: 'Thank you for your interest. A senior representative will contact you within 5 minutes.' 
          },
          { type: 'change_priority', priority: 'urgent' }
        ],
        enabled: true,
        triggerCount: 0
      },
      {
        id: '3',
        name: 'Abandoned Lead Recovery',
        description: 'Create follow-up task for abandoned leads',
        trigger: {
          type: 'wait_time',
          operator: 'greater_than',
          value: 60,
          unit: 'minutes'
        },
        actions: [
          { type: 'create_task', target: 'Follow up with abandoned lead' },
          { type: 'notify', target: 'sales-team', message: 'Lead abandoned queue' }
        ],
        enabled: true,
        triggerCount: 0
      }
    ];
    setEscalationRules(defaultRules);

    // Load default SLA policies
    const defaultSLAs: SLAPolicy[] = [
      {
        id: '1',
        name: 'Standard SLA',
        description: 'Default service level agreement',
        targets: [
          { priority: 'urgent', firstResponseTime: 5, resolutionTime: 30 },
          { priority: 'high', firstResponseTime: 15, resolutionTime: 60 },
          { priority: 'medium', firstResponseTime: 30, resolutionTime: 240 },
          { priority: 'low', firstResponseTime: 60, resolutionTime: 480 }
        ],
        businessHours: {
          enabled: true,
          timezone: 'America/New_York',
          hours: [
            { day: 'Monday', start: '09:00', end: '18:00' },
            { day: 'Tuesday', start: '09:00', end: '18:00' },
            { day: 'Wednesday', start: '09:00', end: '18:00' },
            { day: 'Thursday', start: '09:00', end: '18:00' },
            { day: 'Friday', start: '09:00', end: '18:00' }
          ]
        },
        enabled: true
      }
    ];
    setSlaPolicies(defaultSLAs);

    // Simulate queue activity
    const interval = setInterval(() => {
      updateQueueMetrics();
      checkEscalationRules();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateQueueMetrics = () => {
    setQueue(prevQueue => 
      prevQueue.map(item => {
        if (item.status === 'waiting') {
          const waitTime = Math.floor(
            (Date.now() - new Date(item.enqueuedAt).getTime()) / 60000
          );
          return { ...item, waitTime };
        }
        return item;
      })
    );
  };

  const checkEscalationRules = () => {
    queue.forEach(item => {
      if (item.status !== 'waiting' && item.status !== 'in_progress') return;

      escalationRules.forEach(rule => {
        if (!rule.enabled) return;

        let shouldTrigger = false;

        // Check trigger condition
        switch (rule.trigger.type) {
          case 'wait_time':
            if (rule.trigger.operator === 'greater_than' && item.waitTime > rule.trigger.value) {
              shouldTrigger = true;
            }
            break;
          case 'priority':
            if (getPriorityValue(item.priority) >= getPriorityValue(rule.trigger.value.toString())) {
              shouldTrigger = true;
            }
            break;
          // Add more trigger types as needed
        }

        // Check additional conditions
        if (shouldTrigger && rule.conditions) {
          shouldTrigger = rule.conditions.every(condition => {
            const fieldValue = (item as any)[condition.field];
            switch (condition.operator) {
              case 'equals': return fieldValue === condition.value;
              case 'greater_than': return fieldValue > condition.value;
              case 'less_than': return fieldValue < condition.value;
              default: return true;
            }
          });
        }

        if (shouldTrigger && item.escalationLevel < 3) {
          executeEscalationActions(item, rule);
        }
      });
    });
  };

  const executeEscalationActions = (item: QueueItem, rule: EscalationRule) => {
    rule.actions.forEach(action => {
      switch (action.type) {
        case 'change_priority':
          updateQueueItem(item.id, { 
            priority: action.priority as any, 
            escalationLevel: item.escalationLevel + 1 
          });
          break;
        case 'notify':
          // In real app, send notification
          console.log(`Notification sent to ${action.target}: ${action.message}`);
          break;
        case 'auto_respond':
          // In real app, send auto response
          console.log(`Auto response sent: ${action.message}`);
          break;
        case 'create_task':
          // In real app, create task
          console.log(`Task created: ${action.target}`);
          break;
      }
    });

    // Update rule statistics
    setEscalationRules(rules => 
      rules.map(r => 
        r.id === rule.id 
          ? { ...r, lastTriggered: new Date().toISOString(), triggerCount: r.triggerCount + 1 }
          : r
      )
    );

    if (onEscalation) {
      onEscalation(item, rule);
    }
  };

  const updateQueueItem = (id: string, updates: Partial<QueueItem>) => {
    setQueue(prevQueue => 
      prevQueue.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const getPriorityValue = (priority: string): number => {
    const values = { low: 1, medium: 2, high: 3, urgent: 4 };
    return values[priority as keyof typeof values] || 0;
  };

  const calculateSLAStatus = (item: QueueItem): 'on_track' | 'at_risk' | 'breached' => {
    const activePolicy = slaPolicies.find(p => p.enabled);
    if (!activePolicy) return 'on_track';

    const target = activePolicy.targets.find(t => t.priority === item.priority);
    if (!target) return 'on_track';

    const percentUsed = (item.waitTime / target.firstResponseTime) * 100;
    
    if (percentUsed >= 100) return 'breached';
    if (percentUsed >= 80) return 'at_risk';
    return 'on_track';
  };

  const getQueueMetrics = () => {
    const metrics = {
      total: queue.length,
      waiting: queue.filter(i => i.status === 'waiting').length,
      inProgress: queue.filter(i => i.status === 'in_progress').length,
      escalated: queue.filter(i => i.escalationLevel > 0).length,
      avgWaitTime: queue.reduce((sum, i) => sum + i.waitTime, 0) / queue.length || 0,
      slaCompliance: {
        onTrack: queue.filter(i => calculateSLAStatus(i) === 'on_track').length,
        atRisk: queue.filter(i => calculateSLAStatus(i) === 'at_risk').length,
        breached: queue.filter(i => calculateSLAStatus(i) === 'breached').length
      }
    };
    return metrics;
  };

  const getChannelDistribution = () => {
    const channels = ['web', 'email', 'phone', 'chat', 'social'];
    return channels.map(channel => ({
      name: channel.charAt(0).toUpperCase() + channel.slice(1),
      value: queue.filter(i => i.channel === channel).length,
      color: {
        web: '#8884d8',
        email: '#82ca9d',
        phone: '#ffc658',
        chat: '#ff7c7c',
        social: '#8dd1e1'
      }[channel]
    }));
  };

  const filteredQueue = queue.filter(item => {
    if (filterChannel !== 'all' && item.channel !== filterChannel) return false;
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false;
    return true;
  });

  const metrics = getQueueMetrics();

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <CardTitle>Advanced Queue Management</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRuleDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSLADialog(true)}
              >
                <Shield className="h-4 w-4 mr-2" />
                Configure SLA
              </Button>
            </div>
          </div>
          <CardDescription>
            Real-time queue monitoring with automated escalation and SLA management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="queue">Live Queue</TabsTrigger>
              <TabsTrigger value="rules">Escalation Rules</TabsTrigger>
              <TabsTrigger value="sla">SLA Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Metrics Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Queue Size</CardDescription>
                    <CardTitle className="text-2xl">{metrics.total}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">{metrics.waiting} waiting</Badge>
                      <Badge variant="secondary">{metrics.inProgress} active</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Avg Wait Time</CardDescription>
                    <CardTitle className="text-2xl">{metrics.avgWaitTime.toFixed(1)}m</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={Math.min(100, (metrics.avgWaitTime / queueConfig.maxWaitTime) * 100)} className="h-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>SLA Compliance</CardDescription>
                    <CardTitle className="text-2xl">
                      {metrics.total > 0 
                        ? Math.round((metrics.slaCompliance.onTrack / metrics.total) * 100)
                        : 100}%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1">
                      <Badge variant="default" className="text-xs">
                        {metrics.slaCompliance.onTrack}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {metrics.slaCompliance.atRisk}
                      </Badge>
                      <Badge variant="destructive" className="text-xs">
                        {metrics.slaCompliance.breached}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Escalations</CardDescription>
                    <CardTitle className="text-2xl">{metrics.escalated}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Active escalations
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Channel Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Channel Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={getChannelDistribution()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {getChannelDistribution().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="queue" className="space-y-4">
              {/* Filters */}
              <div className="flex items-center gap-4">
                <Select value={filterChannel} onValueChange={setFilterChannel}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1" />
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Queue Table */}
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Wait Time</TableHead>
                      <TableHead>SLA Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQueue.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.leadName}</div>
                            <div className="text-sm text-muted-foreground">{item.company}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.channel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            item.priority === 'urgent' ? 'destructive' :
                            item.priority === 'high' ? 'default' :
                            item.priority === 'medium' ? 'secondary' : 'outline'
                          }>
                            {item.priority}
                            {item.escalationLevel > 0 && (
                              <ArrowUp className="h-3 w-3 ml-1" />
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-muted-foreground" />
                            {item.waitTime}m
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            calculateSLAStatus(item) === 'on_track' ? 'outline' :
                            calculateSLAStatus(item) === 'at_risk' ? 'secondary' : 'destructive'
                          }>
                            {calculateSLAStatus(item).replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              {escalationRules.map((rule) => (
                <Card key={rule.id} className={cn(
                  "border",
                  !rule.enabled && "opacity-60"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{rule.name}</h4>
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={(checked) => {
                              setEscalationRules(rules => rules.map(r => 
                                r.id === rule.id ? { ...r, enabled: checked } : r
                              ));
                            }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {rule.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">
                            {rule.trigger.type} {rule.trigger.operator} {rule.trigger.value} {rule.trigger.unit}
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          {rule.actions.map((action, idx) => (
                            <Badge key={idx} variant="secondary">
                              {action.type.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                        {rule.lastTriggered && (
                          <div className="text-xs text-muted-foreground">
                            Last triggered {formatDistanceToNow(new Date(rule.lastTriggered), { addSuffix: true })}
                            • {rule.triggerCount} times total
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEditingRule(rule);
                            setShowRuleDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEscalationRules(rules => rules.filter(r => r.id !== rule.id));
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="sla" className="space-y-4">
              {slaPolicies.map((policy) => (
                <Card key={policy.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{policy.name}</CardTitle>
                        <CardDescription>{policy.description}</CardDescription>
                      </div>
                      <Switch
                        checked={policy.enabled}
                        onCheckedChange={(checked) => {
                          setSlaPolicies(policies => policies.map(p => 
                            p.id === policy.id ? { ...p, enabled: checked } : p
                          ));
                        }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2">Response Time Targets</Label>
                      <div className="space-y-2">
                        {policy.targets.map((target, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                            <Badge variant="outline" className="capitalize">
                              {target.priority}
                            </Badge>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{target.firstResponseTime}m first response</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-muted-foreground" />
                                <span>{target.resolutionTime}m resolution</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {policy.businessHours.enabled && (
                      <div>
                        <Label className="text-sm text-muted-foreground mb-2">Business Hours</Label>
                        <div className="text-sm space-y-1">
                          {policy.businessHours.hours.map((hours, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="w-20">{hours.day}:</span>
                              <span>{hours.start} - {hours.end}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Wait Time Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={[
                        { time: '8am', wait: 5 },
                        { time: '9am', wait: 8 },
                        { time: '10am', wait: 15 },
                        { time: '11am', wait: 22 },
                        { time: '12pm', wait: 18 },
                        { time: '1pm', wait: 12 },
                        { time: '2pm', wait: 10 },
                        { time: '3pm', wait: 14 },
                        { time: '4pm', wait: 20 },
                        { time: '5pm', wait: 16 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="wait" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Escalation Triggers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {escalationRules.map((rule) => (
                        <div key={rule.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{rule.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{rule.triggerCount}</Badge>
                            <Progress value={Math.min(100, rule.triggerCount * 10)} className="w-20 h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SLA Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { priority: 'Urgent', met: 92, breached: 8 },
                      { priority: 'High', met: 85, breached: 15 },
                      { priority: 'Medium', met: 95, breached: 5 },
                      { priority: 'Low', met: 98, breached: 2 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="priority" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="met" stackId="a" fill="#82ca9d" />
                      <Bar dataKey="breached" stackId="a" fill="#ff7c7c" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Escalation Rule Dialog */}
      <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingRule ? 'Edit Escalation Rule' : 'Create Escalation Rule'}
            </DialogTitle>
            <DialogDescription>
              Define conditions and actions for automatic queue escalation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input placeholder="e.g., VIP Lead Escalation" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe what this rule does..." />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Trigger Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wait_time">Wait Time</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="score">Lead Score</SelectItem>
                    <SelectItem value="attempts">Contact Attempts</SelectItem>
                    <SelectItem value="vip">VIP Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Operator</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greater_than">Greater Than</SelectItem>
                    <SelectItem value="less_than">Less Than</SelectItem>
                    <SelectItem value="equals">Equals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input type="number" placeholder="15" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Actions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label className="text-sm font-normal">Change priority</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label className="text-sm font-normal">Reassign to specific user/team</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label className="text-sm font-normal">Send notification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label className="text-sm font-normal">Send auto-response</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label className="text-sm font-normal">Create follow-up task</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRuleDialog(false);
              setEditingRule(null);
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowRuleDialog(false);
              setEditingRule(null);
            }}>
              {editingRule ? 'Update' : 'Create'} Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SLA Configuration Dialog */}
      <Dialog open={showSLADialog} onOpenChange={setShowSLADialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configure SLA Policy</DialogTitle>
            <DialogDescription>
              Set response and resolution time targets for different priority levels
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Policy Name</Label>
              <Input placeholder="e.g., Standard SLA" />
            </div>
            <div className="space-y-2">
              <Label>Response Time Targets (minutes)</Label>
              <div className="space-y-2">
                {['urgent', 'high', 'medium', 'low'].map(priority => (
                  <div key={priority} className="grid grid-cols-3 gap-4 items-center">
                    <Label className="capitalize">{priority}</Label>
                    <Input type="number" placeholder="First Response" />
                    <Input type="number" placeholder="Resolution" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch />
                <Label>Apply business hours only</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowSLADialog(false);
              setEditingSLA(null);
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowSLADialog(false);
              setEditingSLA(null);
            }}>
              Save Policy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}