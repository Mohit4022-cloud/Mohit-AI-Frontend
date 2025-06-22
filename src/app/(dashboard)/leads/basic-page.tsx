"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { Plus, Phone, Mail, Building, User } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  source: string;
  status: string;
  score: number;
  createdAt: string;
  qualificationData?: {
    notes?: string;
    budget?: string;
    timeline?: string;
    interest?: string;
  };
}

export default function LeadsPage() {
  const { token } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLead, setNewLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    source: "Website",
    status: "NEW",
    score: 50,
    qualificationData: {
      notes: "",
      budget: "",
      timeline: "",
      interest: "Medium",
    },
  });

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API_URL}/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(response.data.leads || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = async () => {
    setIsAddingLead(true);
    try {
      await axios.post(`${API_URL}/leads`, newLead, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Reset form
      setNewLead({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        source: "Website",
        status: "NEW",
        score: 50,
        qualificationData: {
          notes: "",
          budget: "",
          timeline: "",
          interest: "Medium",
        },
      });

      // Refresh leads
      await fetchLeads();
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setIsAddingLead(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: "bg-blue-500",
      CONTACTED: "bg-yellow-500",
      QUALIFIED: "bg-green-500",
      UNQUALIFIED: "bg-gray-500",
      OPPORTUNITY: "bg-purple-500",
      CUSTOMER: "bg-emerald-500",
      LOST: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage your inbound leads</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Create a new lead manually</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newLead.firstName}
                    onChange={(e) =>
                      setNewLead({ ...newLead, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newLead.lastName}
                    onChange={(e) =>
                      setNewLead({ ...newLead, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) =>
                    setNewLead({ ...newLead, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                  onChange={(e) =>
                    setNewLead({ ...newLead, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newLead.company}
                  onChange={(e) =>
                    setNewLead({ ...newLead, company: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={newLead.jobTitle}
                  onChange={(e) =>
                    setNewLead({ ...newLead, jobTitle: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Source</Label>
                  <Select
                    value={newLead.source}
                    onValueChange={(value) =>
                      setNewLead({ ...newLead, source: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Email Campaign">
                        Email Campaign
                      </SelectItem>
                      <SelectItem value="Webinar">Webinar</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Trade Show">Trade Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newLead.status}
                    onValueChange={(value) =>
                      setNewLead({ ...newLead, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="CONTACTED">Contacted</SelectItem>
                      <SelectItem value="QUALIFIED">Qualified</SelectItem>
                      <SelectItem value="UNQUALIFIED">Unqualified</SelectItem>
                      <SelectItem value="OPPORTUNITY">Opportunity</SelectItem>
                      <SelectItem value="CUSTOMER">Customer</SelectItem>
                      <SelectItem value="LOST">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="score">Lead Score: {newLead.score}</Label>
                <Input
                  id="score"
                  type="range"
                  min="0"
                  max="100"
                  value={newLead.score}
                  onChange={(e) =>
                    setNewLead({ ...newLead, score: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newLead.qualificationData.notes}
                  onChange={(e) =>
                    setNewLead({
                      ...newLead,
                      qualificationData: {
                        ...newLead.qualificationData,
                        notes: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Select
                    value={newLead.qualificationData.budget}
                    onValueChange={(value) =>
                      setNewLead({
                        ...newLead,
                        qualificationData: {
                          ...newLead.qualificationData,
                          budget: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< $10k">Less than $10k</SelectItem>
                      <SelectItem value="$10k-$50k">$10k - $50k</SelectItem>
                      <SelectItem value="$50k-$100k">$50k - $100k</SelectItem>
                      <SelectItem value="$100k+">$100k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select
                    value={newLead.qualificationData.timeline}
                    onValueChange={(value) =>
                      setNewLead({
                        ...newLead,
                        qualificationData: {
                          ...newLead.qualificationData,
                          timeline: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="6+ months">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interest">Interest Level</Label>
                  <Select
                    value={newLead.qualificationData.interest}
                    onValueChange={(value) =>
                      setNewLead({
                        ...newLead,
                        qualificationData: {
                          ...newLead.qualificationData,
                          interest: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleCreateLead} disabled={isAddingLead}>
                {isAddingLead ? "Creating..." : "Create Lead"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            {leads.length} total leads in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No leads yet. Add your first lead to get started!
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  (
                    document.querySelector(
                      "[data-dialog-trigger]",
                    ) as HTMLElement
                  )?.click()
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Lead
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {lead.jobTitle}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {lead.company}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {lead.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${getScoreColor(lead.score)}`}
                      >
                        {lead.score}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
