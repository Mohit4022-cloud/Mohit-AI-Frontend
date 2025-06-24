"use client";

import { useState, useEffect, useRef } from "react";
import { useAICallStore } from "@/stores/aiCallStore";
import { CallQueue } from "@/components/ai-calls/CallQueue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  Upload,
  Filter,
  Search,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  Play,
  Settings,
  Download,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useContactsStore } from "@/stores/contactsStore";

export default function CallQueuePage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { queuedCalls, loadQueuedCalls, addToQueue } = useAICallStore();
  const { contacts } = useContactsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [newQueuePriority, setNewQueuePriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    loadQueuedCalls();
    const interval = setInterval(loadQueuedCalls, 30000);
    return () => clearInterval(interval);
  }, [loadQueuedCalls]);

  const filteredCalls = queuedCalls.filter((call) => {
    const matchesSearch =
      call.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === "all" || call.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const stats = {
    total: queuedCalls.length,
    high: queuedCalls.filter((c) => c.priority === "HIGH").length,
    medium: queuedCalls.filter((c) => c.priority === "MEDIUM").length,
    low: queuedCalls.filter((c) => c.priority === "LOW").length,
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
      
      // Find column indexes
      const nameIndex = headers.findIndex(h => h.includes('name'));
      const companyIndex = headers.findIndex(h => h.includes('company'));
      const phoneIndex = headers.findIndex(h => h.includes('phone'));
      
      if (nameIndex === -1 || phoneIndex === -1) {
        throw new Error("CSV must contain 'name' and 'phone' columns");
      }

      const newCalls = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim());
        const name = values[nameIndex];
        const phone = values[phoneIndex];
        const company = companyIndex !== -1 ? values[companyIndex] : "Unknown";
        
        if (name && phone) {
          newCalls.push({
            id: `import-${Date.now()}-${i}`,
            leadId: `lead-${Date.now()}-${i}`,
            leadName: name,
            company: company,
            phone: phone,
            priority: "MEDIUM" as const,
            attempts: 0,
          });
        }
      }

      // Add all calls to queue
      newCalls.forEach(call => addToQueue(call));
      
      toast({
        title: "Import Successful",
        description: `Imported ${newCalls.length} contacts to the call queue`,
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to parse CSV file",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleAddToQueue = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No contacts selected",
        description: "Please select at least one contact to add to the queue",
        variant: "destructive",
      });
      return;
    }

    const contactsToAdd = contacts.filter(c => selectedContacts.includes(c.id));
    contactsToAdd.forEach(contact => {
      addToQueue({
        id: `queue-${Date.now()}-${contact.id}`,
        leadId: contact.id,
        leadName: contact.name,
        company: contact.company || "Unknown",
        phone: contact.phone,
        priority: newQueuePriority,
        attempts: 0,
      });
    });

    toast({
      title: "Added to Queue",
      description: `Added ${contactsToAdd.length} contacts to the call queue`,
    });

    setSelectedContacts([]);
    setShowAddDialog(false);
  };

  const exportTemplate = () => {
    const csv = "Name,Company,Phone\nJohn Doe,Acme Corp,+1234567890\nJane Smith,Tech Inc,+0987654321";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "call_queue_template.csv";
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      description: "CSV template downloaded",
    });
  };

  return (
    <div className="flex flex-col h-full p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/ai-calls")}
          className="mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Call Queue Management</h1>
            <p className="text-muted-foreground">
              Manage and prioritize upcoming AI calls
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleImport}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isImporting ? "Importing..." : "Import"}
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Queue
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Contacts to Call Queue</DialogTitle>
                  <DialogDescription>
                    Select contacts to add to the AI call queue
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <Select value={newQueuePriority} onValueChange={(v) => setNewQueuePriority(v as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIGH">High Priority</SelectItem>
                        <SelectItem value="MEDIUM">Medium Priority</SelectItem>
                        <SelectItem value="LOW">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Contacts</Label>
                    <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                      {contacts.map((contact) => (
                        <label
                          key={contact.id}
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedContacts([...selectedContacts, contact.id]);
                              } else {
                                setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                              }
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {contact.company} • {contact.phone}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddToQueue}>
                    Add {selectedContacts.length} to Queue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total in Queue"
          value={stats.total}
          icon={Users}
          color="text-blue-600"
        />
        <StatsCard
          title="High Priority"
          value={stats.high}
          icon={AlertCircle}
          color="text-red-600"
        />
        <StatsCard
          title="Medium Priority"
          value={stats.medium}
          icon={Clock}
          color="text-yellow-600"
        />
        <StatsCard
          title="Low Priority"
          value={stats.low}
          icon={Calendar}
          color="text-green-600"
        />
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="HIGH">High Priority</SelectItem>
                <SelectItem value="MEDIUM">Medium Priority</SelectItem>
                <SelectItem value="LOW">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {showMoreFilters && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Date Added</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Attempts</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No attempts</SelectItem>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="2+">2+ attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Scheduled Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unscheduled">Unscheduled</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterPriority("all");
                    toast({ description: "Filters cleared" });
                  }}
                >
                  Clear Filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportTemplate}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV Template
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="queue" className="flex-1">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="queue">Queue ({filteredCalls.length})</TabsTrigger>
          <TabsTrigger value="settings">Automation</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="mt-4">
          <CallQueue 
            calls={filteredCalls} 
            onViewAll={() => {
              toast({
                title: "Full Queue View",
                description: "Showing all queued calls",
              });
            }}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Call Scheduling</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-dial queued calls</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically initiate calls from the queue
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Time-based calling</p>
                      <p className="text-sm text-muted-foreground">
                        Only call during business hours
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Set Hours</Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">AI Agent Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Knowledge Base</p>
                      <p className="text-sm text-muted-foreground">
                        Configure AI agent knowledge and responses
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Knowledge Base",
                          description: "Opening knowledge base configuration...",
                        });
                        router.push("/ai-calls/settings#knowledge-base");
                      }}
                    >
                      Manage Knowledge Base
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Integration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Access</p>
                      <p className="text-sm text-muted-foreground">
                        Programmatically manage your call queue
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        window.open("/docs/api/ai-calls", "_blank");
                      }}
                    >
                      View API Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Queue Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Optimal Call Times</p>
                  <p className="text-2xl font-bold">10:00 AM - 2:00 PM</p>
                  <p className="text-sm text-muted-foreground">
                    Based on historical connection rates
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Average Wait Time</p>
                  <p className="text-2xl font-bold">2.5 days</p>
                  <p className="text-sm text-muted-foreground">
                    From queue entry to first call attempt
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Connection Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-sm text-muted-foreground">
                    Successfully connected calls from queue
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );
}