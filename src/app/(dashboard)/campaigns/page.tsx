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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/authStore";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ABTesting } from "@/components/ab-testing";
import {
  Play,
  Pause,
  StopCircle,
  Send,
  Users,
  Target,
  Mail,
  MessageSquare,
  Phone,
  Calendar as CalendarIcon,
  Clock,
  TrendingUp,
  BarChart3,
  Eye,
  Copy,
  Trash2,
  Edit,
  Plus,
  Filter,
  Search,
  ChevronDown,
  MoreVertical,
  Settings,
  Zap,
  Brain,
  Building,
  User,
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  FileText,
  BookOpen,
  Sparkles,
  Shield,
  FlaskConical,
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  X,
  Bell,
  RefreshCw,
  Download,
  Upload,
  Star,
  Lock,
  Unlock,
  Tag,
  Layers,
  GitBranch,
  Route,
  Map,
  Briefcase,
  DollarSign,
  PieChart,
  Activity,
  Database,
  Bot,
  Wand2,
  Package,
  GripVertical,
  Workflow,
  GitMerge,
  Timer,
  Circle,
  Square,
  Diamond,
  Hexagon,
  Triangle,
  ArrowDown,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Campaign {
  id: string;
  name: string;
  description: string;
  type: "standard" | "account-based" | "nurture" | "onboarding";
  status: "draft" | "scheduled" | "active" | "paused" | "completed";
  startDate: string;
  endDate?: string;
  audience: CampaignAudience;
  channels: string[];
  templates: string[];
  performance: CampaignPerformance;
  budget?: number;
  owner: string;
  createdAt: string;
  tags: string[];
}

interface CampaignAudience {
  type: "segment" | "account-list" | "custom";
  totalSize: number;
  criteria?: any;
  accounts?: Account[];
  segments?: string[];
}

interface Account {
  id: string;
  name: string;
  industry: string;
  size: string;
  revenue: number;
  contacts: number;
  engagementScore: number;
  tier: "tier1" | "tier2" | "tier3";
  owner?: string;
}

interface CampaignPerformance {
  sent: number;
  opened: number;
  clicked: number;
  replied: number;
  converted: number;
  revenue: number;
  roi: number;
}

interface Template {
  id: string;
  name: string;
  category: string;
  channel: string;
  subject?: string;
  content: string;
  variables: string[];
  performance?: {
    usage: number;
    openRate: number;
    clickRate: number;
    replyRate: number;
  };
  tags: string[];
  isPublic: boolean;
  createdBy: string;
  lastModified: string;
}

interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  templates: Template[];
  icon: any;
}

interface CampaignNode {
  id: string;
  type: "trigger" | "action" | "condition" | "delay" | "end";
  data: {
    label: string;
    type?: string;
    config?: any;
  };
  position: { x: number; y: number };
  connections: string[];
}

interface DragItem {
  id: string;
  type: string;
  label: string;
  icon: any;
  category: string;
}

export default function CampaignsPage() {
  const { token, user } = useAuthStore();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateCategories, setTemplateCategories] = useState<
    TemplateCategory[]
  >([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showVisualBuilder, setShowVisualBuilder] = useState(false);
  const [showABTesting, setShowABTesting] = useState(false);
  const [campaignType, setCampaignType] = useState<
    "standard" | "account-based"
  >("standard");
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);
  const [availableAccounts, setAvailableAccounts] = useState<Account[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [campaignNodes, setCampaignNodes] = useState<CampaignNode[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<CampaignNode | null>(null);

  useEffect(() => {
    fetchCampaigns();
    fetchTemplates();
    fetchAccounts();
  }, []);

  const fetchCampaigns = async () => {
    // Mock data
    const mockCampaigns: Campaign[] = [
      {
        id: "c1",
        name: "Enterprise ABM Campaign Q4",
        description:
          "Account-based marketing campaign targeting Fortune 500 companies",
        type: "account-based",
        status: "active",
        startDate: new Date(Date.now() - 604800000).toISOString(),
        audience: {
          type: "account-list",
          totalSize: 25,
          accounts: [],
        },
        channels: ["email", "linkedin", "phone"],
        templates: ["t1", "t2", "t3"],
        performance: {
          sent: 150,
          opened: 98,
          clicked: 45,
          replied: 12,
          converted: 3,
          revenue: 450000,
          roi: 8.5,
        },
        budget: 50000,
        owner: "Sarah Johnson",
        createdAt: new Date(Date.now() - 2592000000).toISOString(),
        tags: ["enterprise", "abm", "q4"],
      },
      {
        id: "c2",
        name: "SaaS Onboarding Sequence",
        description: "Automated onboarding campaign for new SaaS customers",
        type: "onboarding",
        status: "active",
        startDate: new Date(Date.now() - 2592000000).toISOString(),
        audience: {
          type: "segment",
          totalSize: 342,
          segments: ["new-customers"],
        },
        channels: ["email", "in-app"],
        templates: ["t4", "t5", "t6"],
        performance: {
          sent: 1026,
          opened: 856,
          clicked: 412,
          replied: 89,
          converted: 298,
          revenue: 178800,
          roi: 12.3,
        },
        owner: "Michael Chen",
        createdAt: new Date(Date.now() - 7776000000).toISOString(),
        tags: ["onboarding", "saas", "automated"],
      },
      {
        id: "c3",
        name: "Lead Nurture - Mid Market",
        description: "Multi-touch nurture campaign for mid-market prospects",
        type: "nurture",
        status: "scheduled",
        startDate: new Date(Date.now() + 259200000).toISOString(),
        endDate: new Date(Date.now() + 2592000000).toISOString(),
        audience: {
          type: "segment",
          totalSize: 1250,
          segments: ["mid-market", "mql"],
        },
        channels: ["email", "sms", "retargeting"],
        templates: ["t7", "t8", "t9", "t10"],
        performance: {
          sent: 0,
          opened: 0,
          clicked: 0,
          replied: 0,
          converted: 0,
          revenue: 0,
          roi: 0,
        },
        budget: 15000,
        owner: "Emily Davis",
        createdAt: new Date().toISOString(),
        tags: ["nurture", "mid-market", "q1"],
      },
    ];

    setCampaigns(mockCampaigns);
  };

  const fetchTemplates = async () => {
    // Mock template data
    const mockTemplates: Template[] = [
      {
        id: "t1",
        name: "Enterprise Introduction",
        category: "cold-outreach",
        channel: "email",
        subject: "Quick question about {company}'s {challenge}",
        content: `Hi {firstName},

I noticed {company} is {trigger_event}. Many companies in {industry} struggle with {challenge}.

We've helped similar companies like {similar_company} achieve {result}.

Worth a quick 15-minute call to discuss how this might apply to {company}?

Best,
{sender_name}`,
        variables: [
          "firstName",
          "company",
          "trigger_event",
          "industry",
          "challenge",
          "similar_company",
          "result",
          "sender_name",
        ],
        performance: {
          usage: 342,
          openRate: 68,
          clickRate: 24,
          replyRate: 12,
        },
        tags: ["enterprise", "cold", "personalized"],
        isPublic: true,
        createdBy: "System",
        lastModified: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "t2",
        name: "ABM Multi-Thread",
        category: "account-based",
        channel: "linkedin",
        content: `Hi {firstName},

I've been working with {colleague_name} from your team on {initiative}. 

They mentioned you're the person who oversees {responsibility}.

I'd love to get your perspective on {specific_question}.

Would you be open to a brief conversation?`,
        variables: [
          "firstName",
          "colleague_name",
          "initiative",
          "responsibility",
          "specific_question",
        ],
        performance: {
          usage: 156,
          openRate: 0,
          clickRate: 0,
          replyRate: 28,
        },
        tags: ["abm", "linkedin", "multi-thread"],
        isPublic: true,
        createdBy: "ABM Team",
        lastModified: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        id: "t3",
        name: "Executive Voicemail Script",
        category: "account-based",
        channel: "phone",
        content: `Hi {firstName}, this is {sender_name} from Mohit AI.

I'm calling because I noticed {company} recently {trigger_event}.

We've helped {similar_company} in {industry} {achievement}, and I believe we could do something similar for you.

I'll send you a brief email with more details. If it resonates, I'd love to connect for 15 minutes.

Again, this is {sender_name} from Mohit AI. Have a great day!`,
        variables: [
          "firstName",
          "sender_name",
          "company",
          "trigger_event",
          "similar_company",
          "industry",
          "achievement",
        ],
        performance: {
          usage: 89,
          openRate: 0,
          clickRate: 0,
          replyRate: 15,
        },
        tags: ["abm", "voicemail", "executive"],
        isPublic: true,
        createdBy: "Sales Team",
        lastModified: new Date(Date.now() - 604800000).toISOString(),
      },
    ];

    const categories: TemplateCategory[] = [
      {
        id: "cold-outreach",
        name: "Cold Outreach",
        description: "Initial contact templates for new prospects",
        templates: mockTemplates.filter((t) => t.category === "cold-outreach"),
        icon: Mail,
      },
      {
        id: "account-based",
        name: "Account-Based",
        description: "Targeted templates for specific accounts",
        templates: mockTemplates.filter((t) => t.category === "account-based"),
        icon: Building,
      },
      {
        id: "nurture",
        name: "Lead Nurture",
        description: "Multi-touch sequences for warming up leads",
        templates: [],
        icon: Users,
      },
      {
        id: "follow-up",
        name: "Follow-Up",
        description: "Post-meeting and demo follow-up templates",
        templates: [],
        icon: RefreshCw,
      },
      {
        id: "onboarding",
        name: "Customer Onboarding",
        description: "Welcome and activation sequences",
        templates: [],
        icon: Sparkles,
      },
    ];

    setTemplates(mockTemplates);
    setTemplateCategories(categories);
  };

  const fetchAccounts = async () => {
    // Mock account data for ABM
    const mockAccounts: Account[] = [
      {
        id: "acc1",
        name: "TechCorp Industries",
        industry: "Technology",
        size: "Enterprise",
        revenue: 5000000000,
        contacts: 12,
        engagementScore: 85,
        tier: "tier1",
        owner: "Sarah Johnson",
      },
      {
        id: "acc2",
        name: "Global Finance Inc",
        industry: "Financial Services",
        size: "Enterprise",
        revenue: 8000000000,
        contacts: 8,
        engagementScore: 72,
        tier: "tier1",
        owner: "Michael Chen",
      },
      {
        id: "acc3",
        name: "Healthcare Solutions Co",
        industry: "Healthcare",
        size: "Mid-Market",
        revenue: 500000000,
        contacts: 5,
        engagementScore: 68,
        tier: "tier2",
        owner: "Emily Davis",
      },
      {
        id: "acc4",
        name: "Retail Dynamics",
        industry: "Retail",
        size: "Enterprise",
        revenue: 3000000000,
        contacts: 15,
        engagementScore: 91,
        tier: "tier1",
        owner: "Sarah Johnson",
      },
    ];

    setAvailableAccounts(mockAccounts);
  };

  const createCampaign = async (campaignData: Partial<Campaign>) => {
    const newCampaign: Campaign = {
      id: `c${Date.now()}`,
      name: campaignData.name || "Untitled Campaign",
      description: campaignData.description || "",
      type: campaignData.type || "standard",
      status: "draft",
      startDate: campaignData.startDate || new Date().toISOString(),
      audience: campaignData.audience || { type: "segment", totalSize: 0 },
      channels: campaignData.channels || [],
      templates: campaignData.templates || [],
      performance: {
        sent: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        converted: 0,
        revenue: 0,
        roi: 0,
      },
      owner: user?.name || "User",
      createdAt: new Date().toISOString(),
      tags: campaignData.tags || [],
    };

    setCampaigns([...campaigns, newCampaign]);
    setShowCampaignBuilder(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "paused":
        return "bg-yellow-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "in-app":
        return <Zap className="h-4 w-4" />;
      case "retargeting":
        return <Target className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const CampaignBuilder = () => {
    const [step, setStep] = useState(1);
    const [campaignData, setCampaignData] = useState<Partial<Campaign>>({
      type: campaignType,
      channels: [],
      templates: [],
    });

    const steps =
      campaignType === "account-based"
        ? [
            "Basics",
            "Target Accounts",
            "Channels & Content",
            "Schedule",
            "Review",
          ]
        : ["Basics", "Audience", "Channels & Content", "Schedule", "Review"];

    return (
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((stepName, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  step > index + 1
                    ? "bg-primary border-primary text-primary-foreground"
                    : step === index + 1
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground",
                )}
              >
                {step > index + 1 ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium",
                  step >= index + 1
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {stepName}
              </span>
              {index < steps.length - 1 && (
                <ChevronDown className="h-4 w-4 mx-4 rotate-[-90deg] text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                value={campaignData.name || ""}
                onChange={(e) =>
                  setCampaignData({ ...campaignData, name: e.target.value })
                }
                placeholder="Enter campaign name..."
              />
            </div>

            <div>
              <Label htmlFor="campaign-description">Description</Label>
              <Textarea
                id="campaign-description"
                value={campaignData.description || ""}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe your campaign objectives..."
                rows={3}
              />
            </div>

            <div>
              <Label>Campaign Tags</Label>
              <Input
                placeholder="Add tags (comma separated)..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const tags = e.currentTarget.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t);
                    setCampaignData({
                      ...campaignData,
                      tags: [...(campaignData.tags || []), ...tags],
                    });
                    e.currentTarget.value = "";
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {campaignData.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                    <button
                      onClick={() => {
                        const newTags = campaignData.tags?.filter(
                          (_, i) => i !== index,
                        );
                        setCampaignData({ ...campaignData, tags: newTags });
                      }}
                      className="ml-1"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {campaignType === "standard" && (
              <div>
                <Label>Campaign Budget (Optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    className="pl-9"
                    placeholder="0.00"
                    value={campaignData.budget || ""}
                    onChange={(e) =>
                      setCampaignData({
                        ...campaignData,
                        budget: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && campaignType === "account-based" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold">Select Target Accounts</h4>
                <p className="text-sm text-muted-foreground">
                  Choose high-value accounts for personalized outreach
                </p>
              </div>
              <Badge variant="outline">
                {selectedAccounts.length} accounts selected
              </Badge>
            </div>

            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search accounts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="tier1">Tier 1</SelectItem>
                  <SelectItem value="tier2">Tier 2</SelectItem>
                  <SelectItem value="tier3">Tier 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[300px] border rounded-lg">
              <div className="p-4 space-y-3">
                {availableAccounts
                  .filter(
                    (acc) =>
                      acc.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      acc.industry
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((account) => (
                    <div
                      key={account.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-colors",
                        selectedAccounts.find((a) => a.id === account.id) &&
                          "border-primary bg-primary/5",
                      )}
                      onClick={() => {
                        const isSelected = selectedAccounts.find(
                          (a) => a.id === account.id,
                        );
                        if (isSelected) {
                          setSelectedAccounts(
                            selectedAccounts.filter((a) => a.id !== account.id),
                          );
                        } else {
                          setSelectedAccounts([...selectedAccounts, account]);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={
                              !!selectedAccounts.find(
                                (a) => a.id === account.id,
                              )
                            }
                            onCheckedChange={() => {}}
                          />
                          <div>
                            <h5 className="font-semibold">{account.name}</h5>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{account.industry}</span>
                              <span>{account.size}</span>
                              <Badge variant="outline" className="text-xs">
                                {account.tier.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm">
                            <Activity className="h-4 w-4" />
                            <span className="font-medium">
                              {account.engagementScore}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {account.contacts} contacts
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Selected accounts will receive personalized, multi-threaded
                campaigns with account-specific messaging and coordination
                across your sales team.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-4">Select Channels</h4>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { id: "email", label: "Email", icon: Mail },
                  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
                  { id: "phone", label: "Phone", icon: Phone },
                  { id: "sms", label: "SMS", icon: MessageSquare },
                  { id: "facebook", label: "Facebook", icon: Facebook },
                  { id: "twitter", label: "Twitter", icon: Twitter },
                  { id: "in-app", label: "In-App", icon: Zap },
                  { id: "retargeting", label: "Ads", icon: Target },
                ].map((channel) => (
                  <Button
                    key={channel.id}
                    variant={
                      campaignData.channels?.includes(channel.id)
                        ? "default"
                        : "outline"
                    }
                    onClick={() => {
                      const channels = campaignData.channels || [];
                      if (channels.includes(channel.id)) {
                        setCampaignData({
                          ...campaignData,
                          channels: channels.filter((c) => c !== channel.id),
                        });
                      } else {
                        setCampaignData({
                          ...campaignData,
                          channels: [...channels, channel.id],
                        });
                      }
                    }}
                    className="h-20 flex flex-col gap-2"
                  >
                    <channel.icon className="h-5 w-5" />
                    <span className="text-xs">{channel.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Content Templates</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTemplateLibrary(true)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Library
                </Button>
              </div>

              {campaignData.templates && campaignData.templates.length > 0 ? (
                <div className="space-y-3">
                  {campaignData.templates.map((templateId) => {
                    const template = templates.find((t) => t.id === templateId);
                    if (!template) return null;

                    return (
                      <div key={templateId} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getChannelIcon(template.channel)}
                            <div>
                              <h5 className="font-medium">{template.name}</h5>
                              <p className="text-sm text-muted-foreground">
                                {template.performance?.usage} uses •{" "}
                                {template.performance?.replyRate}% reply rate
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCampaignData({
                                ...campaignData,
                                templates: campaignData.templates?.filter(
                                  (t) => t !== templateId,
                                ),
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No templates selected</p>
                  <p className="text-sm text-muted-foreground">
                    Add templates from the library or create custom ones
                  </p>
                </div>
              )}
            </div>

            {campaignType === "account-based" && (
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  AI will personalize these templates for each account using
                  company-specific data, recent news, and trigger events.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (step === steps.length) {
                createCampaign({
                  ...campaignData,
                  audience:
                    campaignType === "account-based"
                      ? {
                          type: "account-list",
                          totalSize: selectedAccounts.length,
                          accounts: selectedAccounts,
                        }
                      : campaignData.audience,
                });
              } else {
                setStep(step + 1);
              }
            }}
          >
            {step === steps.length ? "Create Campaign" : "Next"}
          </Button>
        </div>
      </div>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      // Handle node drop on canvas
      if (over.id === "canvas" && active.data.current) {
        const newNode: CampaignNode = {
          id: `node-${Date.now()}`,
          type: active.data.current.type,
          data: {
            label: active.data.current.label,
            type: active.data.current.subtype,
            config: {},
          },
          position: { x: 100, y: campaignNodes.length * 100 + 50 },
          connections: [],
        };
        setCampaignNodes([...campaignNodes, newNode]);
      }
    }

    setActiveId(null);
  };

  const VisualCampaignBuilder = () => {
    const [builderMode, setBuilderMode] = useState<"visual" | "form">("visual");
    const [showNodeConfig, setShowNodeConfig] = useState(false);

    const nodeTypes: DragItem[] = [
      // Triggers
      {
        id: "trigger-form",
        type: "trigger",
        label: "Form Submission",
        icon: FileText,
        category: "triggers",
      },
      {
        id: "trigger-tag",
        type: "trigger",
        label: "Tag Added",
        icon: Tag,
        category: "triggers",
      },
      {
        id: "trigger-score",
        type: "trigger",
        label: "Score Change",
        icon: TrendingUp,
        category: "triggers",
      },
      {
        id: "trigger-date",
        type: "trigger",
        label: "Date Based",
        icon: CalendarIcon,
        category: "triggers",
      },

      // Actions
      {
        id: "action-email",
        type: "action",
        label: "Send Email",
        icon: Mail,
        category: "actions",
      },
      {
        id: "action-linkedin",
        type: "action",
        label: "LinkedIn Message",
        icon: Linkedin,
        category: "actions",
      },
      {
        id: "action-sms",
        type: "action",
        label: "Send SMS",
        icon: MessageSquare,
        category: "actions",
      },
      {
        id: "action-task",
        type: "action",
        label: "Create Task",
        icon: CheckCircle,
        category: "actions",
      },
      {
        id: "action-notify",
        type: "action",
        label: "Notify Team",
        icon: Bell,
        category: "actions",
      },
      {
        id: "action-score",
        type: "action",
        label: "Update Score",
        icon: Target,
        category: "actions",
      },

      // Conditions
      {
        id: "condition-if",
        type: "condition",
        label: "If/Then",
        icon: GitBranch,
        category: "conditions",
      },
      {
        id: "condition-score",
        type: "condition",
        label: "Score Check",
        icon: Activity,
        category: "conditions",
      },
      {
        id: "condition-engagement",
        type: "condition",
        label: "Engagement",
        icon: BarChart3,
        category: "conditions",
      },

      // Delays
      {
        id: "delay-time",
        type: "delay",
        label: "Wait Time",
        icon: Clock,
        category: "delays",
      },
      {
        id: "delay-condition",
        type: "delay",
        label: "Wait Until",
        icon: Timer,
        category: "delays",
      },

      // End
      {
        id: "end-success",
        type: "end",
        label: "Success",
        icon: CheckCircle,
        category: "end",
      },
      {
        id: "end-remove",
        type: "end",
        label: "Remove from Campaign",
        icon: XCircle,
        category: "end",
      },
    ];

    const NodeComponent = ({ node }: { node: CampaignNode }) => {
      const getNodeIcon = () => {
        const nodeItem = nodeTypes.find(
          (n) => n.type === node.type && n.label === node.data.label,
        );
        return nodeItem ? (
          <nodeItem.icon className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        );
      };

      const getNodeColor = () => {
        switch (node.type) {
          case "trigger":
            return "border-green-500 bg-green-50";
          case "action":
            return "border-blue-500 bg-blue-50";
          case "condition":
            return "border-yellow-500 bg-yellow-50";
          case "delay":
            return "border-purple-500 bg-purple-50";
          case "end":
            return "border-red-500 bg-red-50";
          default:
            return "border-gray-500 bg-gray-50";
        }
      };

      return (
        <div
          className={cn(
            "p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg",
            getNodeColor(),
            selectedNode?.id === node.id && "ring-2 ring-primary",
          )}
          style={{
            position: "absolute",
            left: node.position.x,
            top: node.position.y,
            minWidth: "200px",
          }}
          onClick={() => {
            setSelectedNode(node);
            setShowNodeConfig(true);
          }}
        >
          <div className="flex items-center gap-2">
            {getNodeIcon()}
            <span className="font-medium">{node.data.label}</span>
          </div>
          {node.data.config?.template && (
            <p className="text-xs text-muted-foreground mt-2">
              Template: {node.data.config.template}
            </p>
          )}
        </div>
      );
    };

    return (
      <div className="h-full flex flex-col">
        {/* Toolbar */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">Visual Campaign Builder</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={builderMode === "visual" ? "default" : "outline"}
                  onClick={() => setBuilderMode("visual")}
                >
                  <Workflow className="mr-2 h-4 w-4" />
                  Visual Mode
                </Button>
                <Button
                  size="sm"
                  variant={builderMode === "form" ? "default" : "outline"}
                  onClick={() => setBuilderMode("form")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Form Mode
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>

        {builderMode === "visual" ? (
          <div className="flex flex-1 overflow-hidden">
            {/* Node Palette */}
            <div className="w-64 border-r bg-muted/10 p-4 overflow-y-auto">
              <h4 className="font-semibold mb-4">Campaign Elements</h4>

              <div className="space-y-4">
                {/* Triggers */}
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    Triggers
                  </h5>
                  <div className="space-y-2">
                    {nodeTypes
                      .filter((n) => n.category === "triggers")
                      .map((node) => (
                        <DraggableNode key={node.id} item={node} />
                      ))}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    Actions
                  </h5>
                  <div className="space-y-2">
                    {nodeTypes
                      .filter((n) => n.category === "actions")
                      .map((node) => (
                        <DraggableNode key={node.id} item={node} />
                      ))}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    Conditions
                  </h5>
                  <div className="space-y-2">
                    {nodeTypes
                      .filter((n) => n.category === "conditions")
                      .map((node) => (
                        <DraggableNode key={node.id} item={node} />
                      ))}
                  </div>
                </div>

                {/* Delays */}
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    Delays
                  </h5>
                  <div className="space-y-2">
                    {nodeTypes
                      .filter((n) => n.category === "delays")
                      .map((node) => (
                        <DraggableNode key={node.id} item={node} />
                      ))}
                  </div>
                </div>

                {/* End */}
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    End Points
                  </h5>
                  <div className="space-y-2">
                    {nodeTypes
                      .filter((n) => n.category === "end")
                      .map((node) => (
                        <DraggableNode key={node.id} item={node} />
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 relative bg-grid-pattern">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div
                  id="canvas"
                  className="absolute inset-0 overflow-auto p-8"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  {campaignNodes.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Workflow className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">
                          Drag elements here to start building
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Start with a trigger, add actions, and define the flow
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative"
                      style={{ minHeight: "600px", minWidth: "800px" }}
                    >
                      {/* Render connections */}
                      {campaignNodes.map((node) =>
                        node.connections.map((targetId) => {
                          const targetNode = campaignNodes.find(
                            (n) => n.id === targetId,
                          );
                          if (!targetNode) return null;

                          return (
                            <svg
                              key={`${node.id}-${targetId}`}
                              className="absolute pointer-events-none"
                              style={{
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "100%",
                                zIndex: 0,
                              }}
                            >
                              <line
                                x1={node.position.x + 100}
                                y1={node.position.y + 40}
                                x2={targetNode.position.x + 100}
                                y2={targetNode.position.y}
                                stroke="#94a3b8"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                              />
                              <defs>
                                <marker
                                  id="arrowhead"
                                  markerWidth="10"
                                  markerHeight="7"
                                  refX="9"
                                  refY="3.5"
                                  orient="auto"
                                >
                                  <polygon
                                    points="0 0, 10 3.5, 0 7"
                                    fill="#94a3b8"
                                  />
                                </marker>
                              </defs>
                            </svg>
                          );
                        }),
                      )}

                      {/* Render nodes */}
                      {campaignNodes.map((node) => (
                        <NodeComponent key={node.id} node={node} />
                      ))}
                    </div>
                  )}
                </div>

                <DragOverlay>
                  {activeId ? (
                    <div className="p-3 bg-white border rounded-lg shadow-lg opacity-80">
                      {nodeTypes.find((n) => n.id === activeId)?.label}
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>

            {/* Node Configuration Panel */}
            {showNodeConfig && selectedNode && (
              <div className="w-80 border-l bg-background p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">
                    Configure {selectedNode.data.label}
                  </h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setShowNodeConfig(false);
                      setSelectedNode(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {selectedNode.type === "action" &&
                  selectedNode.data.label === "Send Email" && (
                    <div className="space-y-4">
                      <div>
                        <Label>Email Template</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates
                              .filter((t) => t.channel === "email")
                              .map((template) => (
                                <SelectItem
                                  key={template.id}
                                  value={template.id}
                                >
                                  {template.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Send From</Label>
                        <Input placeholder="sender@company.com" />
                      </div>
                      <div>
                        <Label>Reply To</Label>
                        <Input placeholder="replies@company.com" />
                      </div>
                    </div>
                  )}

                {selectedNode.type === "delay" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Delay Duration</Label>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="1" />
                        <Select>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {selectedNode.type === "condition" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Condition Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="opened">Email Opened</SelectItem>
                          <SelectItem value="clicked">Link Clicked</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="score">Lead Score</SelectItem>
                          <SelectItem value="field">Field Value</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-3">
                    <Button className="w-full" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Connection
                    </Button>
                    <Button className="w-full" size="sm" variant="outline">
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate Node
                    </Button>
                    <Button
                      className="w-full"
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setCampaignNodes(
                          campaignNodes.filter((n) => n.id !== selectedNode.id),
                        );
                        setSelectedNode(null);
                        setShowNodeConfig(false);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Node
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 p-6">
            <CampaignBuilder />
          </div>
        )}
      </div>
    );
  };

  const DraggableNode = ({ item }: { item: DragItem }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: item.id,
      data: {
        type: item.type,
        label: item.label,
        subtype: item.id.split("-")[1],
      },
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "p-3 bg-background border rounded-lg cursor-grab active:cursor-grabbing",
          "hover:bg-muted/50 transition-colors",
          isDragging && "opacity-50",
        )}
      >
        <div className="flex items-center gap-2">
          <item.icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.label}</span>
          <GripVertical className="h-4 w-4 text-muted-foreground ml-auto" />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* A/B Testing View */}
      {showABTesting ? (
        <>
          <div className="mb-4">
            <Button onClick={() => setShowABTesting(false)} variant="ghost">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Campaigns
            </Button>
          </div>
          <ABTesting />
        </>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Campaigns</h1>
              <p className="text-muted-foreground">
                Create and manage multi-channel outreach campaigns
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowABTesting(true)}>
                <FlaskConical className="mr-2 h-4 w-4" />
                A/B Testing
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTemplateLibrary(true)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Template Library
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Campaign
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setCampaignType("standard");
                      setShowCampaignBuilder(true);
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Standard Campaign
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setCampaignType("account-based");
                      setShowCampaignBuilder(true);
                    }}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Account-Based Campaign
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Use AI Assistant
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Campaign Builder Dialog */}
          <Dialog
            open={showCampaignBuilder}
            onOpenChange={setShowCampaignBuilder}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Create{" "}
                  {campaignType === "account-based"
                    ? "Account-Based"
                    : "Standard"}{" "}
                  Campaign
                </DialogTitle>
                <DialogDescription>
                  {campaignType === "account-based"
                    ? "Build personalized campaigns for high-value target accounts"
                    : "Create multi-channel campaigns to reach your audience at scale"}
                </DialogDescription>
              </DialogHeader>

              <CampaignBuilder />
            </DialogContent>
          </Dialog>

          {/* Template Library Dialog */}
          <Dialog
            open={showTemplateLibrary}
            onOpenChange={setShowTemplateLibrary}
          >
            <DialogContent className="max-w-6xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Template Library</DialogTitle>
                <DialogDescription>
                  Pre-built templates optimized for conversion across channels
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="all" className="mt-4">
                <TabsList className="grid grid-cols-6 w-full">
                  <TabsTrigger value="all">All Templates</TabsTrigger>
                  {templateCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="grid grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getChannelIcon(template.channel)}
                                <CardTitle className="text-base">
                                  {template.name}
                                </CardTitle>
                              </div>
                              <Badge variant="outline">
                                {template.performance?.usage} uses
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              {template.subject ||
                                template.content.substring(0, 100)}
                              ...
                            </p>

                            <div className="flex items-center justify-between mb-3">
                              <div className="flex gap-4 text-sm">
                                {template.performance?.openRate && (
                                  <div>
                                    <span className="text-muted-foreground">
                                      Open
                                    </span>
                                    <p className="font-medium">
                                      {template.performance.openRate}%
                                    </p>
                                  </div>
                                )}
                                {template.performance?.clickRate && (
                                  <div>
                                    <span className="text-muted-foreground">
                                      Click
                                    </span>
                                    <p className="font-medium">
                                      {template.performance.clickRate}%
                                    </p>
                                  </div>
                                )}
                                <div>
                                  <span className="text-muted-foreground">
                                    Reply
                                  </span>
                                  <p className="font-medium">
                                    {template.performance?.replyRate}%
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {template.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="default">
                                  Use Template
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {templateCategories.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="mt-4"
                  >
                    <ScrollArea className="h-[500px]">
                      {category.templates.length === 0 ? (
                        <div className="text-center py-12">
                          <category.icon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            No templates in this category yet
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {category.templates.map((template) => (
                            <Card key={template.id}>
                              {/* Template card content */}
                            </Card>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>

              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplateLibrary(false)}
                >
                  Close
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Visual Campaign Builder Dialog */}
          <Dialog open={showVisualBuilder} onOpenChange={setShowVisualBuilder}>
            <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0">
              <VisualCampaignBuilder />
            </DialogContent>
          </Dialog>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    if (range) {
                      setDateRange({
                        from: range.from,
                        to: range.to || undefined,
                      });
                    } else {
                      setDateRange({ from: undefined, to: undefined });
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.filter((c) => c.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {campaigns.filter((c) => c.status === "scheduled").length}{" "}
                  scheduled
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns
                    .reduce((acc, c) => acc + c.performance.sent, 0)
                    .toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all channels
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3%</div>
                <p className="text-xs text-green-600 mt-1">
                  +5.2% vs last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Revenue Attributed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {campaigns
                    .reduce((acc, c) => acc + c.performance.revenue, 0)
                    .toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {campaigns.reduce(
                    (acc, c) => acc + c.performance.converted,
                    0,
                  )}{" "}
                  conversions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns List */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="account-based">Account-Based</TabsTrigger>
              <TabsTrigger value="nurture">Nurture</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {campaigns
                .filter(
                  (campaign) =>
                    filterStatus === "all" || campaign.status === filterStatus,
                )
                .map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                            <h3 className="text-lg font-semibold">
                              {campaign.name}
                            </h3>
                            {campaign.type === "account-based" && (
                              <Badge variant="outline" className="gap-1">
                                <Building className="h-3 w-3" />
                                ABM
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {campaign.description}
                          </p>

                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {campaign.audience.totalSize} contacts
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {campaign.channels.map((channel) => (
                                <span key={channel}>
                                  {getChannelIcon(channel)}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>
                                Started{" "}
                                {format(
                                  new Date(campaign.startDate),
                                  "MMM d, yyyy",
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{campaign.owner}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-5 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Sent
                              </p>
                              <p className="text-lg font-semibold">
                                {campaign.performance.sent.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Opened
                              </p>
                              <p className="text-lg font-semibold">
                                {campaign.performance.opened.toLocaleString()}
                                <span className="text-sm text-muted-foreground ml-1">
                                  (
                                  {campaign.performance.sent > 0
                                    ? (
                                        (campaign.performance.opened /
                                          campaign.performance.sent) *
                                        100
                                      ).toFixed(1)
                                    : 0}
                                  %)
                                </span>
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Clicked
                              </p>
                              <p className="text-lg font-semibold">
                                {campaign.performance.clicked.toLocaleString()}
                                <span className="text-sm text-muted-foreground ml-1">
                                  (
                                  {campaign.performance.sent > 0
                                    ? (
                                        (campaign.performance.clicked /
                                          campaign.performance.sent) *
                                        100
                                      ).toFixed(1)
                                    : 0}
                                  %)
                                </span>
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Converted
                              </p>
                              <p className="text-lg font-semibold">
                                {campaign.performance.converted}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Revenue
                              </p>
                              <p className="text-lg font-semibold">
                                ${campaign.performance.revenue.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {campaign.performance.sent > 0 && (
                            <Progress
                              value={
                                (campaign.performance.converted /
                                  campaign.performance.sent) *
                                100
                              }
                              className="mt-4"
                            />
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {campaign.status === "active" ? (
                            <Button size="sm" variant="outline">
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </Button>
                          ) : campaign.status === "paused" ? (
                            <Button size="sm" variant="outline">
                              <Play className="mr-2 h-4 w-4" />
                              Resume
                            </Button>
                          ) : null}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Campaign
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
