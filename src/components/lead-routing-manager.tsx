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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Route,
  Brain,
  Users,
  Target,
  Zap,
  Settings,
  TrendingUp,
  User,
  Building,
  Globe,
  Clock,
  Calendar,
  DollarSign,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  RefreshCw,
  Save,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  ArrowRight,
  GitBranch,
  Sparkles,
  Bot,
  Activity,
  MapPin,
  Briefcase,
  Hash,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface RoutingRule {
  id: string;
  name: string;
  description: string;
  priority: number;
  enabled: boolean;
  conditions: RuleCondition[];
  action: RuleAction;
  stats: {
    matched: number;
    assigned: number;
    successRate: number;
  };
}

interface RuleCondition {
  field: string;
  operator: string;
  value: any;
  weight?: number;
}

interface RuleAction {
  type: "assign_to_user" | "assign_to_team" | "round_robin" | "ai_match";
  target?: string;
  options?: any;
}

interface Rep {
  id: string;
  name: string;
  email: string;
  team: string;
  role: string;
  availability: "available" | "busy" | "offline";
  skills: string[];
  industries: string[];
  languages: string[];
  timezone: string;
  maxLeads: number;
  currentLeads: number;
  performance: {
    conversionRate: number;
    avgResponseTime: number;
    satisfaction: number;
    deals: number;
  };
  specialties: {
    dealSize: string[];
    productLines: string[];
    regions: string[];
  };
}

interface AIMatchingConfig {
  factors: {
    skills: number;
    industry: number;
    language: number;
    timezone: number;
    availability: number;
    performance: number;
    workload: number;
    dealSize: number;
    region: number;
  };
  mode: "balanced" | "performance" | "availability" | "skills";
  constraints: {
    maxLeadsPerRep: number;
    respectTimezone: boolean;
    requireLanguageMatch: boolean;
    preferIndustryMatch: boolean;
  };
}

interface LeadRoutingManagerProps {
  reps: Rep[];
  onRoutingChange?: (rules: RoutingRule[]) => void;
  className?: string;
}

export function LeadRoutingManager({
  reps,
  onRoutingChange,
  className,
}: LeadRoutingManagerProps) {
  const [rules, setRules] = useState<RoutingRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<RoutingRule | null>(null);
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [aiConfig, setAIConfig] = useState<AIMatchingConfig>({
    factors: {
      skills: 30,
      industry: 20,
      language: 15,
      timezone: 10,
      availability: 10,
      performance: 10,
      workload: 5,
      dealSize: 0,
      region: 0,
    },
    mode: "balanced",
    constraints: {
      maxLeadsPerRep: 50,
      respectTimezone: true,
      requireLanguageMatch: false,
      preferIndustryMatch: true,
    },
  });
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    // Load default routing rules
    const defaultRules: RoutingRule[] = [
      {
        id: "1",
        name: "Enterprise Leads",
        description: "Route high-value enterprise leads to senior reps",
        priority: 1,
        enabled: true,
        conditions: [
          { field: "company_size", operator: "greater_than", value: 500 },
          { field: "score", operator: "greater_than", value: 80 },
        ],
        action: {
          type: "ai_match",
          options: { preferSenior: true, requireIndustryMatch: true },
        },
        stats: { matched: 145, assigned: 142, successRate: 87 },
      },
      {
        id: "2",
        name: "Regional Assignment",
        description: "Assign leads based on geographic region",
        priority: 2,
        enabled: true,
        conditions: [{ field: "region", operator: "exists", value: true }],
        action: {
          type: "ai_match",
          options: { matchRegion: true },
        },
        stats: { matched: 523, assigned: 520, successRate: 92 },
      },
      {
        id: "3",
        name: "Round Robin Fallback",
        description: "Distribute remaining leads evenly",
        priority: 99,
        enabled: true,
        conditions: [],
        action: {
          type: "round_robin",
          options: { excludeOffline: true },
        },
        stats: { matched: 89, assigned: 89, successRate: 78 },
      },
    ];
    setRules(defaultRules);
  }, []);

  const calculateAIMatch = (lead: any, rep: Rep): number => {
    let score = 0;
    const factors = aiConfig.factors;

    // Skills match
    if (lead.requiredSkills) {
      const matchedSkills = lead.requiredSkills.filter((skill: string) =>
        rep.skills.includes(skill),
      ).length;
      score += (matchedSkills / lead.requiredSkills.length) * factors.skills;
    }

    // Industry match
    if (lead.industry && rep.industries.includes(lead.industry)) {
      score += factors.industry;
    }

    // Language match
    if (lead.language && rep.languages.includes(lead.language)) {
      score += factors.language;
    }

    // Timezone compatibility
    const timezoneOffset = Math.abs(
      parseInt(lead.timezone || "0") - parseInt(rep.timezone || "0"),
    );
    score += Math.max(0, factors.timezone - timezoneOffset * 2);

    // Availability
    if (rep.availability === "available") {
      score += factors.availability;
    } else if (rep.availability === "busy") {
      score += factors.availability * 0.5;
    }

    // Performance
    score += (rep.performance.conversionRate / 100) * factors.performance;

    // Workload balance
    const workloadRatio = rep.currentLeads / rep.maxLeads;
    score += (1 - workloadRatio) * factors.workload;

    // Deal size preference
    if (lead.dealSize && rep.specialties.dealSize.includes(lead.dealSize)) {
      score += factors.dealSize;
    }

    // Region match
    if (lead.region && rep.specialties.regions.includes(lead.region)) {
      score += factors.region;
    }

    return Math.round(score);
  };

  const simulateRouting = async () => {
    setIsSimulating(true);

    // Simulate routing for sample leads
    setTimeout(() => {
      const results = {
        totalLeads: 1000,
        routedSuccessfully: 956,
        avgMatchScore: 78,
        distributionByRep: reps.map((rep) => ({
          rep: rep.name,
          assigned: Math.floor(Math.random() * 50) + 20,
          matchScore: Math.floor(Math.random() * 30) + 70,
        })),
        rulePerformance: rules.map((rule) => ({
          rule: rule.name,
          matched: Math.floor(Math.random() * 400) + 100,
          avgTime: Math.random() * 2 + 0.5,
        })),
      };
      setSimulationResults(results);
      setIsSimulating(false);
    }, 2000);
  };

  const updateAIFactor = (
    factor: keyof AIMatchingConfig["factors"],
    value: number,
  ) => {
    setAIConfig({
      ...aiConfig,
      factors: {
        ...aiConfig.factors,
        [factor]: value,
      },
    });
  };

  const renderRuleConditions = (conditions: RuleCondition[]) => {
    return conditions.map((condition, index) => (
      <div key={index} className="flex items-center gap-2 text-sm">
        <Badge variant="outline">{condition.field}</Badge>
        <span className="text-muted-foreground">{condition.operator}</span>
        <Badge variant="secondary">{condition.value}</Badge>
        {index < conditions.length - 1 && (
          <span className="text-muted-foreground">AND</span>
        )}
      </div>
    ));
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              <CardTitle>Lead Routing & AI Matching</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={simulateRouting}
                disabled={isSimulating}
              >
                {isSimulating ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Simulate Routing
              </Button>
              <Button size="sm" onClick={() => setShowRuleDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
          </div>
          <CardDescription>
            Configure intelligent lead distribution with AI-powered rep matching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rules" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rules">Routing Rules</TabsTrigger>
              <TabsTrigger value="ai-config">AI Configuration</TabsTrigger>
              <TabsTrigger value="reps">Rep Profiles</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-4">
              <div className="space-y-3">
                {rules
                  .sort((a, b) => a.priority - b.priority)
                  .map((rule) => (
                    <Card
                      key={rule.id}
                      className={cn("border", !rule.enabled && "opacity-60")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Priority {rule.priority}
                              </Badge>
                              <h4 className="font-semibold">{rule.name}</h4>
                              <Switch
                                checked={rule.enabled}
                                onCheckedChange={(checked) => {
                                  setRules(
                                    rules.map((r) =>
                                      r.id === rule.id
                                        ? { ...r, enabled: checked }
                                        : r,
                                    ),
                                  );
                                }}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {rule.description}
                            </p>

                            {rule.conditions.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {renderRuleConditions(rule.conditions)}
                              </div>
                            )}

                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-2">
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <Badge>
                                  {rule.action.type === "ai_match"
                                    ? "AI Match"
                                    : rule.action.type === "round_robin"
                                      ? "Round Robin"
                                      : rule.action.type === "assign_to_team"
                                        ? "Team Assignment"
                                        : "User Assignment"}
                                </Badge>
                                {rule.action.target && (
                                  <span className="text-sm text-muted-foreground">
                                    → {rule.action.target}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 ml-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold">
                                {rule.stats.successRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Success Rate
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedRule(rule);
                                  setShowRuleDialog(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  setRules(
                                    rules.filter((r) => r.id !== rule.id),
                                  );
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    AI Matching Configuration
                  </CardTitle>
                  <CardDescription>
                    Adjust the weights of different factors in the AI matching
                    algorithm
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Matching Mode</Label>
                    <RadioGroup
                      value={aiConfig.mode}
                      onValueChange={(value: any) =>
                        setAIConfig({ ...aiConfig, mode: value })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="balanced" id="balanced" />
                        <Label htmlFor="balanced">Balanced (Recommended)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="performance" id="performance" />
                        <Label htmlFor="performance">Performance First</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="availability"
                          id="availability"
                        />
                        <Label htmlFor="availability">Availability First</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="skills" id="skills" />
                        <Label htmlFor="skills">Skills Match First</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Factor Weights</Label>
                    {Object.entries(aiConfig.factors).map(([factor, value]) => (
                      <div key={factor} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm capitalize">
                            {factor.replace(/([A-Z])/g, " $1").trim()}
                          </Label>
                          <span className="text-sm text-muted-foreground">
                            {value}%
                          </span>
                        </div>
                        <Slider
                          value={[value]}
                          onValueChange={([newValue]) =>
                            updateAIFactor(factor as any, newValue || 0)
                          }
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Constraints</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="max-leads" className="text-sm">
                          Max Leads per Rep
                        </Label>
                        <Input
                          id="max-leads"
                          type="number"
                          value={aiConfig.constraints.maxLeadsPerRep}
                          onChange={(e) =>
                            setAIConfig({
                              ...aiConfig,
                              constraints: {
                                ...aiConfig.constraints,
                                maxLeadsPerRep: parseInt(e.target.value),
                              },
                            })
                          }
                          className="w-20"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="timezone"
                          checked={aiConfig.constraints.respectTimezone}
                          onCheckedChange={(checked) =>
                            setAIConfig({
                              ...aiConfig,
                              constraints: {
                                ...aiConfig.constraints,
                                respectTimezone: checked,
                              },
                            })
                          }
                        />
                        <Label htmlFor="timezone" className="text-sm">
                          Respect Timezone Differences
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="language"
                          checked={aiConfig.constraints.requireLanguageMatch}
                          onCheckedChange={(checked) =>
                            setAIConfig({
                              ...aiConfig,
                              constraints: {
                                ...aiConfig.constraints,
                                requireLanguageMatch: checked,
                              },
                            })
                          }
                        />
                        <Label htmlFor="language" className="text-sm">
                          Require Language Match
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="industry"
                          checked={aiConfig.constraints.preferIndustryMatch}
                          onCheckedChange={(checked) =>
                            setAIConfig({
                              ...aiConfig,
                              constraints: {
                                ...aiConfig.constraints,
                                preferIndustryMatch: checked,
                              },
                            })
                          }
                        />
                        <Label htmlFor="industry" className="text-sm">
                          Prefer Industry Match
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reps" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reps.map((rep) => (
                  <Card key={rep.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">
                            {rep.name}
                          </CardTitle>
                          <CardDescription>
                            {rep.role} • {rep.team}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            rep.availability === "available"
                              ? "default"
                              : rep.availability === "busy"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {rep.availability}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Current Load
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(rep.currentLeads / rep.maxLeads) * 100}
                            className="w-20 h-2"
                          />
                          <span>
                            {rep.currentLeads}/{rep.maxLeads}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Conversion
                          </span>
                          <p className="font-semibold">
                            {rep.performance.conversionRate}%
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Response
                          </span>
                          <p className="font-semibold">
                            {rep.performance.avgResponseTime}h
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {rep.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {rep.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{rep.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              {simulationResults ? (
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total Leads</CardDescription>
                        <CardTitle className="text-2xl">
                          {simulationResults.totalLeads.toLocaleString()}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Routed Successfully</CardDescription>
                        <CardTitle className="text-2xl">
                          {simulationResults.routedSuccessfully.toLocaleString()}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Success Rate</CardDescription>
                        <CardTitle className="text-2xl">
                          {(
                            (simulationResults.routedSuccessfully /
                              simulationResults.totalLeads) *
                            100
                          ).toFixed(1)}
                          %
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Avg Match Score</CardDescription>
                        <CardTitle className="text-2xl">
                          {simulationResults.avgMatchScore}%
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Distribution by Rep
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Rep</TableHead>
                            <TableHead>Leads Assigned</TableHead>
                            <TableHead>Match Score</TableHead>
                            <TableHead>Distribution</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {simulationResults.distributionByRep.map(
                            (item: any) => (
                              <TableRow key={item.rep}>
                                <TableCell>{item.rep}</TableCell>
                                <TableCell>{item.assigned}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {item.matchScore}%
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Progress
                                    value={
                                      (item.assigned /
                                        simulationResults.totalLeads) *
                                      100
                                    }
                                    className="h-2"
                                  />
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Simulation Data
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Run a simulation to see how leads would be distributed
                  </p>
                  <Button onClick={simulateRouting}>
                    <Play className="h-4 w-4 mr-2" />
                    Run Simulation
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Rule Editor Dialog */}
      <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedRule ? "Edit Routing Rule" : "Create Routing Rule"}
            </DialogTitle>
            <DialogDescription>
              Define conditions and actions for lead routing
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input placeholder="e.g., Enterprise Lead Routing" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe what this rule does..." />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Input type="number" placeholder="1" min="1" />
            </div>
            <div className="space-y-2">
              <Label>Conditions</Label>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Condition
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Action</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai_match">AI-Powered Matching</SelectItem>
                  <SelectItem value="round_robin">Round Robin</SelectItem>
                  <SelectItem value="assign_to_team">Assign to Team</SelectItem>
                  <SelectItem value="assign_to_user">Assign to User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRuleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowRuleDialog(false)}>
              {selectedRule ? "Update" : "Create"} Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
