"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  FileCheck,
  Lock,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar as CalendarIcon,
  Clock,
  Download,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Info,
  XCircle,
  UserCheck,
  UserX,
  FileText,
  History,
  Database,
  Search,
  Filter,
  MoreVertical,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Key,
  Globe,
  Mail,
  Phone,
  Building,
  CreditCard,
  Flag,
  Archive,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow, addDays } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface ConsentRecord {
  id: string;
  leadId: string;
  leadName: string;
  email: string;
  type: "marketing" | "analytics" | "functional" | "necessary";
  status: "granted" | "denied" | "pending";
  timestamp: string;
  ipAddress: string;
  method: "explicit" | "implicit" | "imported";
  expiresAt?: string;
  source: string;
  version: string;
}

interface DataRetentionPolicy {
  id: string;
  dataType: string;
  description: string;
  retentionPeriod: number;
  unit: "days" | "months" | "years";
  action: "delete" | "anonymize" | "archive";
  lastRun?: string;
  nextRun: string;
  affectedRecords: number;
  enabled: boolean;
}

interface DataRequest {
  id: string;
  type: "access" | "deletion" | "portability" | "rectification";
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  status: "pending" | "in_progress" | "completed" | "rejected";
  submittedAt: string;
  completedAt?: string;
  deadline: string;
  assignedTo?: string;
  notes?: string;
  attachments?: string[];
}

interface PrivacyPolicy {
  id: string;
  version: string;
  effectiveDate: string;
  changes: string[];
  status: "draft" | "active" | "archived";
  publishedBy?: string;
  approvedBy?: string;
}

interface ComplianceScore {
  overall: number;
  categories: {
    consent: number;
    dataRetention: number;
    requests: number;
    documentation: number;
    security: number;
  };
  issues: ComplianceIssue[];
}

interface ComplianceIssue {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  description: string;
  recommendation: string;
  affectedRecords?: number;
}

interface ComplianceManagerProps {
  className?: string;
}

export function ComplianceManager({ className }: ComplianceManagerProps) {
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>([]);
  const [retentionPolicies, setRetentionPolicies] = useState<
    DataRetentionPolicy[]
  >([]);
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([]);
  const [complianceScore, setComplianceScore] = useState<ComplianceScore>({
    overall: 85,
    categories: {
      consent: 92,
      dataRetention: 88,
      requests: 78,
      documentation: 85,
      security: 82,
    },
    issues: [],
  });
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DataRequest | null>(
    null,
  );
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Mock data
  useState(() => {
    const mockConsents: ConsentRecord[] = [
      {
        id: "1",
        leadId: "lead-1",
        leadName: "John Smith",
        email: "john.smith@example.com",
        type: "marketing",
        status: "granted",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        ipAddress: "192.168.1.100",
        method: "explicit",
        expiresAt: addDays(new Date(), 365).toISOString(),
        source: "Website Form",
        version: "2.0",
      },
      {
        id: "2",
        leadId: "lead-2",
        leadName: "Sarah Johnson",
        email: "sarah.j@company.com",
        type: "analytics",
        status: "granted",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        ipAddress: "192.168.1.101",
        method: "explicit",
        source: "Cookie Banner",
        version: "2.0",
      },
      {
        id: "3",
        leadId: "lead-3",
        leadName: "Mike Chen",
        email: "mike.chen@startup.io",
        type: "marketing",
        status: "denied",
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        ipAddress: "192.168.1.102",
        method: "explicit",
        source: "Email Preferences",
        version: "2.0",
      },
    ];

    const mockPolicies: DataRetentionPolicy[] = [
      {
        id: "1",
        dataType: "Lead Contact Information",
        description: "Personal contact details including name, email, phone",
        retentionPeriod: 3,
        unit: "years",
        action: "anonymize",
        lastRun: new Date(Date.now() - 86400000 * 30).toISOString(),
        nextRun: addDays(new Date(), 30).toISOString(),
        affectedRecords: 1250,
        enabled: true,
      },
      {
        id: "2",
        dataType: "Conversation Transcripts",
        description: "Call recordings and chat transcripts",
        retentionPeriod: 1,
        unit: "years",
        action: "delete",
        lastRun: new Date(Date.now() - 86400000 * 15).toISOString(),
        nextRun: addDays(new Date(), 15).toISOString(),
        affectedRecords: 3420,
        enabled: true,
      },
      {
        id: "3",
        dataType: "Analytics Data",
        description: "Website behavior and engagement metrics",
        retentionPeriod: 6,
        unit: "months",
        action: "anonymize",
        nextRun: addDays(new Date(), 7).toISOString(),
        affectedRecords: 8900,
        enabled: true,
      },
      {
        id: "4",
        dataType: "System Logs",
        description: "Application logs and audit trails",
        retentionPeriod: 90,
        unit: "days",
        action: "archive",
        lastRun: new Date(Date.now() - 86400000).toISOString(),
        nextRun: addDays(new Date(), 1).toISOString(),
        affectedRecords: 125000,
        enabled: true,
      },
    ];

    const mockRequests: DataRequest[] = [
      {
        id: "1",
        type: "access",
        requesterId: "user-1",
        requesterName: "Alice Cooper",
        requesterEmail: "alice.cooper@email.com",
        status: "pending",
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        deadline: addDays(new Date(), 28).toISOString(),
        notes: "Requesting all personal data collected",
      },
      {
        id: "2",
        type: "deletion",
        requesterId: "user-2",
        requesterName: "Bob Wilson",
        requesterEmail: "bob.w@company.com",
        status: "in_progress",
        submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        deadline: addDays(new Date(), 25).toISOString(),
        assignedTo: "compliance@company.com",
        notes: "Delete all data except billing records",
      },
      {
        id: "3",
        type: "portability",
        requesterId: "user-3",
        requesterName: "Carol Davis",
        requesterEmail: "carol.d@email.com",
        status: "completed",
        submittedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        deadline: addDays(new Date(), 20).toISOString(),
        assignedTo: "data-team@company.com",
      },
    ];

    const mockIssues: ComplianceIssue[] = [
      {
        id: "1",
        severity: "high",
        category: "Consent",
        description: "15% of active leads have expired consent records",
        recommendation: "Send consent renewal requests to affected leads",
        affectedRecords: 342,
      },
      {
        id: "2",
        severity: "medium",
        category: "Data Retention",
        description:
          "Conversation transcripts older than retention period not yet processed",
        recommendation: "Run data retention job for conversation data",
        affectedRecords: 1250,
      },
      {
        id: "3",
        severity: "low",
        category: "Documentation",
        description: "Privacy policy last updated 6 months ago",
        recommendation: "Review and update privacy policy for recent changes",
      },
    ];

    setConsentRecords(mockConsents);
    setRetentionPolicies(mockPolicies);
    setDataRequests(mockRequests);
    setComplianceScore((prev) => ({ ...prev, issues: mockIssues }));
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "granted":
      case "completed":
        return "text-green-600 bg-green-50";
      case "denied":
      case "rejected":
        return "text-red-600 bg-red-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "in_progress":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "access":
        return <Eye className="h-4 w-4" />;
      case "deletion":
        return <Trash2 className="h-4 w-4" />;
      case "portability":
        return <Download className="h-4 w-4" />;
      case "rectification":
        return <Edit className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Compliance Score Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Compliance Management</CardTitle>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-lg px-3 py-1",
                getScoreColor(complianceScore.overall),
              )}
            >
              {complianceScore.overall}% Compliant
            </Badge>
          </div>
          <CardDescription>
            GDPR compliance tracking, consent management, and data protection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5 mb-6">
            {Object.entries(complianceScore.categories).map(
              ([category, score]) => (
                <div key={category} className="text-center">
                  <div className="text-sm text-muted-foreground capitalize mb-1">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div
                    className={cn("text-2xl font-bold", getScoreColor(score))}
                  >
                    {score}%
                  </div>
                  <Progress value={score} className="h-2 mt-2" />
                </div>
              ),
            )}
          </div>

          {complianceScore.issues.length > 0 && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                <strong>
                  {complianceScore.issues.length} compliance issues
                </strong>{" "}
                require attention
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="consent" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="consent">Consent Management</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="requests">Data Requests</TabsTrigger>
          <TabsTrigger value="policies">Privacy Policies</TabsTrigger>
          <TabsTrigger value="issues">Compliance Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="consent" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search consent records..."
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="functional">Functional</SelectItem>
                  <SelectItem value="necessary">Necessary</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="granted">Granted</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
                    mode="range"
                    selected={dateRange}
                    onSelect={(range: any) =>
                      setDateRange(range || { from: undefined, to: undefined })
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog
                open={showConsentDialog}
                onOpenChange={setShowConsentDialog}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Record Consent
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record New Consent</DialogTitle>
                    <DialogDescription>
                      Manually record consent for a lead
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Lead Email</Label>
                      <Input type="email" placeholder="lead@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Consent Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">
                            Marketing Communications
                          </SelectItem>
                          <SelectItem value="analytics">
                            Analytics & Tracking
                          </SelectItem>
                          <SelectItem value="functional">
                            Functional Cookies
                          </SelectItem>
                          <SelectItem value="necessary">
                            Necessary Cookies
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="granted">Granted</SelectItem>
                          <SelectItem value="denied">Denied</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="explicit">
                            Explicit (Form/Checkbox)
                          </SelectItem>
                          <SelectItem value="implicit">
                            Implicit (Continued Use)
                          </SelectItem>
                          <SelectItem value="imported">
                            Imported from External Source
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Source</Label>
                      <Input placeholder="e.g., Website Contact Form" />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes (Optional)</Label>
                      <Textarea placeholder="Additional context..." rows={3} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowConsentDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setShowConsentDialog(false)}>
                      Record Consent
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consentRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.leadName}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {record.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn("text-xs", getStatusColor(record.status))}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">
                      {record.method}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(record.timestamp), "MMM d, yyyy")}
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(record.timestamp), "h:mm a")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {record.expiresAt ? (
                        <div className="text-sm">
                          {format(new Date(record.expiresAt), "MMM d, yyyy")}
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(record.expiresAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No expiry
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{record.source}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
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
                            Update Consent
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="mr-2 h-4 w-4" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Renewal Request
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Revoke Consent
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Data Retention Policies</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Run All Policies
              </Button>
              <Dialog
                open={showPolicyDialog}
                onOpenChange={setShowPolicyDialog}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Policy
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Retention Policy</DialogTitle>
                    <DialogDescription>
                      Define how long to retain specific types of data
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Data Type</Label>
                      <Input placeholder="e.g., Customer Support Tickets" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Describe what data this policy covers..."
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Retention Period</Label>
                        <Input type="number" placeholder="3" />
                      </div>
                      <div className="space-y-2">
                        <Label>Unit</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Action After Retention Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delete">
                            Delete Permanently
                          </SelectItem>
                          <SelectItem value="anonymize">
                            Anonymize Data
                          </SelectItem>
                          <SelectItem value="archive">
                            Archive to Cold Storage
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-run" defaultChecked />
                      <Label htmlFor="auto-run" className="text-sm font-normal">
                        Automatically run this policy on schedule
                      </Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowPolicyDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setShowPolicyDialog(false)}>
                      Create Policy
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4">
            {retentionPolicies.map((policy) => (
              <Card key={policy.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{policy.dataType}</h4>
                        {policy.enabled ? (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-xs text-muted-foreground"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {policy.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Retain for{" "}
                            <strong>
                              {policy.retentionPeriod} {policy.unit}
                            </strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {policy.action === "delete" && (
                            <Trash2 className="h-4 w-4 text-red-500" />
                          )}
                          {policy.action === "anonymize" && (
                            <EyeOff className="h-4 w-4 text-blue-500" />
                          )}
                          {policy.action === "archive" && (
                            <Archive className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="capitalize">
                            Then {policy.action}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {policy.affectedRecords.toLocaleString()} records
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        {policy.lastRun && (
                          <span>
                            Last run:{" "}
                            {formatDistanceToNow(new Date(policy.lastRun), {
                              addSuffix: true,
                            })}
                          </span>
                        )}
                        <span>
                          Next run:{" "}
                          {format(
                            new Date(policy.nextRun),
                            "MMM d, yyyy h:mm a",
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={policy.enabled}
                        onCheckedChange={(checked) => {
                          // Update policy enabled state
                        }}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Run Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Policy
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview Affected Data
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Policy
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              All data subject requests must be processed within 30 days of
              receipt per GDPR requirements.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Data Subject Requests</CardTitle>
                <Badge variant="outline">
                  {dataRequests.filter((r) => r.status === "pending").length}{" "}
                  pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRequestTypeIcon(request.type)}
                          <span className="capitalize">{request.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {request.requesterName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.requesterEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "text-xs",
                            getStatusColor(request.status),
                          )}
                        >
                          {request.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(request.submittedAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(request.deadline), "MMM d, yyyy")}
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(request.deadline), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.assignedTo || (
                          <span className="text-sm text-muted-foreground">
                            Unassigned
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Assign To Me
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Add Note
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {request.status === "pending" && (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark In Progress
                              </DropdownMenuItem>
                            )}
                            {request.status === "in_progress" && (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Complete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy Management</CardTitle>
              <CardDescription>
                Manage and track privacy policy versions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Privacy Policy Editor
                </h3>
                <p className="text-muted-foreground mb-4">
                  Create and manage privacy policy versions with change tracking
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Version
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <div className="space-y-4">
            {complianceScore.issues.map((issue) => (
              <Card key={issue.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        getSeverityColor(issue.severity),
                      )}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{issue.category}</h4>
                        <Badge
                          className={cn(
                            "text-xs",
                            getSeverityColor(issue.severity),
                          )}
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {issue.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium">Recommendation:</span>
                        <span>{issue.recommendation}</span>
                      </div>
                      {issue.affectedRecords && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Database className="h-3 w-3" />
                          <span>{issue.affectedRecords} records affected</span>
                        </div>
                      )}
                    </div>
                    <Button size="sm">Resolve</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog
          open={!!selectedRequest}
          onOpenChange={() => setSelectedRequest(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Data Request Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Request Type</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getRequestTypeIcon(selectedRequest.type)}
                    <span className="font-medium capitalize">
                      {selectedRequest.type}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge
                    className={cn(
                      "mt-1",
                      getStatusColor(selectedRequest.status),
                    )}
                  >
                    {selectedRequest.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Submitted</Label>
                  <p className="font-medium">
                    {format(
                      new Date(selectedRequest.submittedAt),
                      "MMM d, yyyy h:mm a",
                    )}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Deadline</Label>
                  <p className="font-medium">
                    {format(new Date(selectedRequest.deadline), "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-muted-foreground">
                  Requester Information
                </Label>
                <div className="mt-2 space-y-1">
                  <p className="font-medium">{selectedRequest.requesterName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.requesterEmail}
                  </p>
                </div>
              </div>

              {selectedRequest.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="mt-1 text-sm">{selectedRequest.notes}</p>
                </div>
              )}

              <div>
                <Label className="text-muted-foreground mb-2">Actions</Label>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Requester
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
