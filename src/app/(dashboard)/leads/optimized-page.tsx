"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableContainer,
  DataTableToolbar,
  DataTablePagination,
  StatusBadge,
} from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Plus,
  Download,
  MoreVertical,
  User,
  Mail,
  Phone,
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

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
  lastActivity?: string;
  assignedTo?: string;
}

// Generate more mock data for testing
const generateMockLeads = (count: number): Lead[] => {
  const firstNames = ["Sarah", "Michael", "Jennifer", "David", "Emily", "James", "Lisa", "Robert", "Maria", "William"];
  const lastNames = ["Johnson", "Chen", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"];
  const companies = ["TechCorp", "Innovate.io", "StartupXYZ", "Enterprise Co", "Global Solutions", "Digital Dynamics", "Cloud Systems", "Data Insights", "AI Labs", "Future Tech"];
  const statuses = ["NEW", "CONTACTED", "QUALIFIED", "OPPORTUNITY", "CUSTOMER"];
  const sources = ["Website", "LinkedIn", "Email Campaign", "Webinar", "Referral"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `lead-${i + 1}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${i + 1}@${companies[Math.floor(Math.random() * companies.length)].toLowerCase().replace(/\s+/g, '')}.com`,
    phone: `+1-${Math.floor(Math.random() * 900 + 100)}-555-${Math.floor(Math.random() * 9000 + 1000)}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    jobTitle: ["VP Sales", "Director", "Manager", "CTO", "CEO", "COO", "Head of Sales"][Math.floor(Math.random() * 7)],
    source: sources[Math.floor(Math.random() * sources.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    score: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString() : undefined,
    assignedTo: Math.random() > 0.5 ? ["John Doe", "Jane Smith", "Mike Johnson"][Math.floor(Math.random() * 3)] : undefined,
  }));
};

export default function OptimizedLeadsPage() {
  const [leads] = useState<Lead[]>(generateMockLeads(100));
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    if (statusFilter !== "all") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((lead) =>
        `${lead.firstName} ${lead.lastName} ${lead.company} ${lead.email}`
          .toLowerCase()
          .includes(query)
      );
    }

    return filtered;
  }, [leads, statusFilter, searchQuery]);

  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(paginatedLeads.map((lead) => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter((id) => id !== leadId));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "data-score-high";
    if (score >= 60) return "data-score-medium";
    return "data-score-low";
  };

  const getStatusType = (status: string): "new" | "active" | "qualified" | "paused" | "completed" => {
    switch (status) {
      case "NEW":
        return "new";
      case "CONTACTED":
        return "active";
      case "QUALIFIED":
      case "OPPORTUNITY":
        return "qualified";
      case "CUSTOMER":
        return "completed";
      default:
        return "new";
    }
  };

  return (
    <div className="layout-page-container">
      {/* Page Header */}
      <div className="layout-page-header">
        <div>
          <h1 className="layout-page-title">Leads</h1>
          <p className="layout-page-subtitle">
            Manage and track your sales leads efficiently
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="layout-section">
        <DataTableContainer>
          {/* Toolbar */}
          <DataTableToolbar>
            <div className="data-table-search">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>
            <div className="data-table-filters">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                  <SelectItem value="QUALIFIED">Qualified</SelectItem>
                  <SelectItem value="OPPORTUNITY">Opportunity</SelectItem>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </DataTableToolbar>

          {/* Bulk Actions Bar */}
          {selectedLeads.length > 0 && (
            <div className="data-bulk-actions">
              <span className="data-bulk-actions-count">
                {selectedLeads.length} selected
              </span>
              <div className="data-bulk-actions-buttons">
                <button className="data-bulk-action-button">Assign</button>
                <button className="data-bulk-action-button">Tag</button>
                <button className="data-bulk-action-button">Delete</button>
              </div>
            </div>
          )}

          {/* Table */}
          <DataTable className="data-grid-fixed">
            <DataTableHeader>
              <DataTableRow>
                <DataTableHead className="data-col-checkbox">
                  <Checkbox
                    checked={
                      paginatedLeads.length > 0 &&
                      selectedLeads.length === paginatedLeads.length
                    }
                    onCheckedChange={handleSelectAll}
                    className="data-checkbox"
                  />
                </DataTableHead>
                <DataTableHead className="data-col-name">Name</DataTableHead>
                <DataTableHead className="data-col-email">Email</DataTableHead>
                <DataTableHead className="data-col-company">Company</DataTableHead>
                <DataTableHead className="data-col-status">Status</DataTableHead>
                <DataTableHead className="data-col-score">Score</DataTableHead>
                <DataTableHead className="data-col-date">Created</DataTableHead>
                <DataTableHead className="data-col-actions"></DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableBody>
              {paginatedLeads.map((lead) => (
                <DataTableRow 
                  key={lead.id}
                  className={selectedLeads.includes(lead.id) ? "data-record-row-selected" : ""}
                >
                  <DataTableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                      className="data-checkbox"
                    />
                  </DataTableCell>
                  <DataTableCell>
                    <div className="flex items-center">
                      <div className="data-avatar">
                        {lead.firstName[0]}{lead.lastName[0]}
                      </div>
                      <div>
                        <div className="data-cell-primary">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="data-cell-secondary">{lead.jobTitle}</div>
                      </div>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="flex items-center">
                      <Mail className="data-inline-icon" />
                      {lead.email}
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="flex items-center">
                      <Building className="data-inline-icon" />
                      {lead.company}
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <StatusBadge status={getStatusType(lead.status)}>
                      {lead.status}
                    </StatusBadge>
                  </DataTableCell>
                  <DataTableCell>
                    <span className={`data-score-value ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </DataTableCell>
                  <DataTableCell>
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </DataTableCell>
                  <DataTableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>

          {/* Pagination */}
          <DataTablePagination>
            <div className="data-pagination-info">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of{" "}
              {filteredLeads.length} results
            </div>
            <div className="data-pagination-controls">
              <button
                className="data-pagination-button"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button
                className="data-pagination-button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage + i - 2;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    className={`data-pagination-button ${
                      pageNum === currentPage ? "data-pagination-button-active" : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                className="data-pagination-button"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                className="data-pagination-button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          </DataTablePagination>
        </DataTableContainer>
      </div>
    </div>
  );
}