"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { 
  Plus, Phone, Mail, Building, User, Search, Filter, 
  Download, Upload, Trash2, Edit, Copy, MoreVertical,
  AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown,
  Globe, Linkedin, Twitter, Calendar, MapPin, DollarSign,
  Target, Activity, BarChart3, PieChart, Users, Briefcase,
  FileText, ExternalLink, ChevronRight, ChevronLeft, Settings,
  RefreshCw, Zap, Brain, Sparkles, Shield, Hash, Link2,
  UserCheck, UserX, GitMerge, Database, Info, Star, Code, X, Route
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import { AdvancedFilterBuilder } from "@/components/advanced-filter-builder";
import { LeadRoutingManager } from "@/components/lead-routing-manager";
import { BehavioralScoring } from "@/components/behavioral-scoring";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
  qualificationData: any;
  createdAt: string;
  lastActivity?: string;
  tags?: string[];
  duplicates?: DuplicateLead[];
  enrichedData?: EnrichedData;
  activities?: Activity[];
  customFields?: Record<string, any>;
  assignedTo?: string;
  assignedAt?: string;
  behavioralScore?: number;
  lastWebsiteVisit?: string;
  pageViews?: number;
  engagementLevel?: 'low' | 'medium' | 'high' | 'hot';
}

interface DuplicateLead {
  id: string;
  confidence: number;
  matchFields: string[];
  lead: Partial<Lead>;
}

interface EnrichedData {
  company: {
    name: string;
    industry: string;
    size: string;
    revenue: string;
    location: string;
    website: string;
    description: string;
    technologies: string[];
    fundingTotal?: string;
    lastFunding?: string;
  };
  person: {
    linkedin?: string;
    twitter?: string;
    bio?: string;
    experience?: number;
    education?: string[];
    skills?: string[];
  };
  insights: {
    buyingSignals: string[];
    competitorUsage: string[];
    recentNews: string[];
    painPoints: string[];
  };
}

interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'status_change';
  description: string;
  timestamp: string;
  user: string;
  metadata?: any;
}

interface SavedView {
  id: string;
  name: string;
  filters: any;
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
}

export default function EnhancedLeadsPage() {
  const { token } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [showEnrichment, setShowEnrichment] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [useNaturalLanguage, setUseNaturalLanguage] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importMapping, setImportMapping] = useState<Record<string, string>>({});
  const [isImporting, setIsImporting] = useState(false);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<string>('all');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState<any>(null);
  const [savedAdvancedFilters, setSavedAdvancedFilters] = useState<{id: string; name: string; filter: any}[]>([]);
  const [showRouting, setShowRouting] = useState(false);
  const [showBehavioralScoring, setShowBehavioralScoring] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    score: 'all',
    dateRange: 'all',
    tags: [] as string[],
    customFields: {} as Record<string, any>
  });
  const [newLead, setNewLead] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    source: 'Website',
    status: 'NEW',
    score: 50,
    qualificationData: {
      notes: '',
      budget: '',
      timeline: '',
      interest: 'Medium'
    }
  });
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // Simulate API call with mock data
      const mockLeads: Lead[] = [
        {
          id: '1',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@techcorp.com',
          phone: '+1-415-555-0123',
          company: 'TechCorp Solutions',
          jobTitle: 'VP of Sales',
          source: 'LinkedIn',
          status: 'QUALIFIED',
          score: 95,
          qualificationData: { 
            budget: '$100k+', 
            timeline: 'Q1 2024', 
            interest: 'High',
            notes: 'Very interested in enterprise features'
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastActivity: new Date(Date.now() - 3600000).toISOString(),
          tags: ['Enterprise', 'Hot Lead', 'Decision Maker'],
          duplicates: [
            {
              id: '101',
              confidence: 85,
              matchFields: ['email', 'company'],
              lead: {
                firstName: 'S.',
                lastName: 'Johnson',
                email: 'sjohnson@techcorp.com',
                company: 'TechCorp'
              }
            }
          ],
          enrichedData: {
            company: {
              name: 'TechCorp Solutions',
              industry: 'Software',
              size: '1000-5000',
              revenue: '$100M-$500M',
              location: 'San Francisco, CA',
              website: 'https://techcorp.com',
              description: 'Leading provider of enterprise software solutions',
              technologies: ['Salesforce', 'AWS', 'Slack', 'Microsoft 365'],
              fundingTotal: '$250M',
              lastFunding: 'Series D - $100M (2023)'
            },
            person: {
              linkedin: 'https://linkedin.com/in/sarahjohnson',
              twitter: '@sarahj_sales',
              bio: '15+ years in enterprise sales',
              experience: 15,
              education: ['MBA - Stanford', 'BA Business - UC Berkeley'],
              skills: ['Enterprise Sales', 'SaaS', 'Team Leadership']
            },
            insights: {
              buyingSignals: ['Recently posted about sales automation', 'Company expanding sales team'],
              competitorUsage: ['Currently using Outreach.io'],
              recentNews: ['TechCorp raises $100M Series D', 'Expanding to European markets'],
              painPoints: ['Manual lead qualification', 'Slow response times']
            }
          },
          activities: [
            {
              id: 'a1',
              type: 'email',
              description: 'Sent introduction email',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              user: 'john@company.com'
            },
            {
              id: 'a2',
              type: 'call',
              description: 'Discovery call - 30 mins',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              user: 'john@company.com'
            }
          ]
        },
        {
          id: '2',
          firstName: 'Michael',
          lastName: 'Chen',
          email: 'mchen@innovate.io',
          phone: '+1-408-555-0456',
          company: 'Innovate.io',
          jobTitle: 'CTO',
          source: 'Website Demo',
          status: 'CONTACTED',
          score: 78,
          qualificationData: { 
            budget: '$50k-$100k', 
            timeline: 'Q2 2024', 
            interest: 'Medium' 
          },
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastActivity: new Date(Date.now() - 7200000).toISOString(),
          tags: ['Mid-Market', 'Technical Buyer'],
          enrichedData: {
            company: {
              name: 'Innovate.io',
              industry: 'Technology',
              size: '50-200',
              revenue: '$10M-$50M',
              location: 'San Jose, CA',
              website: 'https://innovate.io',
              description: 'AI-powered analytics platform',
              technologies: ['Python', 'React', 'AWS', 'MongoDB']
            },
            person: {
              linkedin: 'https://linkedin.com/in/michaelchen',
              bio: 'Former Google engineer, 10+ years in tech leadership',
              experience: 12,
              education: ['MS Computer Science - Stanford'],
              skills: ['Python', 'Machine Learning', 'Cloud Architecture']
            },
            insights: {
              buyingSignals: ['Looking for sales automation tools'],
              competitorUsage: [],
              recentNews: ['Innovate.io launches new AI product'],
              painPoints: ['Need better lead tracking']
            }
          }
        }
      ];
      
      setLeads(mockLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = async () => {
    setIsAddingLead(true);
    
    // Check for duplicates
    const duplicates = checkDuplicates(newLead);
    if (duplicates.length > 0) {
      setShowDuplicates(true);
      // Show duplicate warning
      return;
    }
    
    try {
      // Simulate API call
      const createdLead: Lead = {
        ...newLead,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        tags: [],
        activities: []
      };
      
      setLeads([createdLead, ...leads]);
      
      // Reset form
      setNewLead({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        source: 'Website',
        status: 'NEW',
        score: 50,
        qualificationData: {
          notes: '',
          budget: '',
          timeline: '',
          interest: 'Medium'
        }
      });
      
      // Trigger enrichment
      enrichLead(createdLead);
    } catch (error) {
      console.error('Error creating lead:', error);
    } finally {
      setIsAddingLead(false);
    }
  };

  const checkDuplicates = (leadData: any): DuplicateLead[] => {
    const duplicates: DuplicateLead[] = [];
    
    leads.forEach(lead => {
      const matchFields: string[] = [];
      let confidence = 0;
      
      if (lead.email === leadData.email) {
        matchFields.push('email');
        confidence += 50;
      }
      
      if (lead.phone === leadData.phone && leadData.phone) {
        matchFields.push('phone');
        confidence += 30;
      }
      
      if (lead.company === leadData.company && 
          lead.lastName === leadData.lastName) {
        matchFields.push('name', 'company');
        confidence += 20;
      }
      
      if (confidence > 0) {
        duplicates.push({
          id: lead.id,
          confidence,
          matchFields,
          lead
        });
      }
    });
    
    return duplicates.sort((a, b) => b.confidence - a.confidence);
  };

  const assignLeadWithAI = (lead: Lead) => {
    // Calculate match scores for each rep
    const repScores = mockReps.map(rep => {
      let score = 0;
      
      // Industry match
      if (lead.enrichedData?.company.industry && 
          rep.industries.includes(lead.enrichedData.company.industry)) {
        score += 20;
      }
      
      // Company size match
      const companySize = lead.enrichedData?.company.size;
      if (companySize) {
        if (companySize === '1000-5000' && rep.team === 'Enterprise Sales') score += 15;
        else if (companySize === '100-1000' && rep.team === 'Mid-Market') score += 15;
        else if (parseInt(companySize) < 100 && rep.team === 'SMB Sales') score += 15;
      }
      
      // Lead score match
      if (lead.score >= 80 && rep.role.includes('Senior')) score += 10;
      
      // Workload balance
      const workloadRatio = rep.currentLeads / rep.maxLeads;
      score += (1 - workloadRatio) * 10;
      
      // Performance bonus
      score += (rep.performance.conversionRate / 100) * 10;
      
      // Availability
      if (rep.availability === 'available') score += 10;
      else if (rep.availability === 'busy') score += 5;
      
      return { rep, score };
    });
    
    // Sort by score and assign to best match
    const bestMatch = repScores.sort((a, b) => b.score - a.score)[0];
    
    if (!bestMatch) {
      alert('No available reps to assign this lead to.');
      return;
    }
    
    // Update lead with assignment
    const updatedLeads = leads.map(l => 
      l.id === lead.id 
        ? { ...l, assignedTo: bestMatch.rep.name, assignedAt: new Date().toISOString() }
        : l
    );
    setLeads(updatedLeads);
    
    // Show success message (in real app, this would be a toast notification)
    alert(`Lead assigned to ${bestMatch.rep.name} (Match Score: ${bestMatch.score.toFixed(0)}%)`);
  };

  const enrichLead = async (lead: Lead) => {
    setIsEnriching(true);
    
    // Simulate enrichment API call
    setTimeout(() => {
      const enrichedData: EnrichedData = {
        company: {
          name: lead.company,
          industry: 'Technology',
          size: '50-200',
          revenue: '$10M-$50M',
          location: 'San Francisco, CA',
          website: `https://${lead.company.toLowerCase().replace(/\s+/g, '')}.com`,
          description: 'Innovative technology company',
          technologies: ['React', 'Node.js', 'AWS']
        },
        person: {
          linkedin: `https://linkedin.com/in/${lead.firstName.toLowerCase()}${lead.lastName.toLowerCase()}`,
          bio: 'Experienced professional',
          experience: 10,
          education: ['Bachelor\'s Degree'],
          skills: ['Leadership', 'Sales', 'Technology']
        },
        insights: {
          buyingSignals: ['Recent job change', 'Company growth'],
          competitorUsage: [],
          recentNews: ['Company expansion'],
          painPoints: ['Process automation']
        }
      };
      
      setLeads(prev => prev.map(l => 
        l.id === lead.id ? { ...l, enrichedData } : l
      ));
      
      setIsEnriching(false);
    }, 2000);
  };

  const handleFileImport = async (file: File) => {
    setIsImporting(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0]?.split(',').map(h => h.trim()) || [];
      
      // Auto-detect mapping
      const mapping: Record<string, string> = {};
      const fieldMap: Record<string, string[]> = {
        firstName: ['first name', 'firstname', 'first', 'name'],
        lastName: ['last name', 'lastname', 'last', 'surname'],
        email: ['email', 'email address', 'e-mail'],
        phone: ['phone', 'telephone', 'mobile', 'cell'],
        company: ['company', 'organization', 'business'],
        jobTitle: ['title', 'job title', 'position', 'role']
      };
      
      headers.forEach((header, index) => {
        const lowerHeader = header.toLowerCase();
        Object.entries(fieldMap).forEach(([field, aliases]) => {
          if (aliases.some(alias => lowerHeader.includes(alias))) {
            mapping[field] = index.toString();
          }
        });
      });
      
      setImportMapping(mapping);
      
      // Parse CSV data
      const importedLeads: Lead[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i]?.split(',').map(v => v.trim()) || [];
        if (values.length > 1) {
          const lead: Lead = {
            id: Date.now().toString() + '-' + i,
            firstName: values[parseInt(mapping.firstName || '0')] || '',
            lastName: values[parseInt(mapping.lastName || '1')] || '',
            email: values[parseInt(mapping.email || '2')] || '',
            phone: values[parseInt(mapping.phone || '3')] || '',
            company: values[parseInt(mapping.company || '4')] || '',
            jobTitle: values[parseInt(mapping.jobTitle || '5')] || '',
            source: 'CSV Import',
            status: 'NEW',
            score: 50,
            qualificationData: {},
            createdAt: new Date().toISOString(),
            tags: ['imported']
          };
          importedLeads.push(lead);
        }
      }
      
      // Check for duplicates
      const duplicateCheck = importedLeads.filter(importedLead => 
        leads.some(existingLead => 
          existingLead.email === importedLead.email || 
          (existingLead.phone === importedLead.phone && importedLead.phone)
        )
      );
      
      if (duplicateCheck.length > 0) {
        alert(`Found ${duplicateCheck.length} potential duplicates. Skipping duplicates.`);
      }
      
      const uniqueLeads = importedLeads.filter(importedLead => 
        !leads.some(existingLead => 
          existingLead.email === importedLead.email || 
          (existingLead.phone === importedLead.phone && importedLead.phone)
        )
      );
      
      setLeads([...leads, ...uniqueLeads]);
      setShowImportDialog(false);
      setImportFile(null);
    } catch (error) {
      console.error('Import error:', error);
      alert('Error importing file. Please check the format.');
    } finally {
      setIsImporting(false);
    }
  };

  const exportLeads = (format: 'csv' | 'json' = 'csv') => {
    const dataToExport = selectedLeads.length > 0 
      ? leads.filter(lead => selectedLeads.includes(lead.id))
      : filteredLeads;
    
    if (format === 'csv') {
      const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Job Title', 'Status', 'Score', 'Source', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(lead => [
          lead.firstName,
          lead.lastName,
          lead.email,
          lead.phone,
          lead.company,
          lead.jobTitle,
          lead.status,
          lead.score,
          lead.source,
          lead.createdAt
        ].map(val => `"${val}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else {
      const jsonContent = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedLeads.length === 0) {
      alert('Please select leads first');
      return;
    }
    
    switch (action) {
      case 'delete':
        if (confirm(`Delete ${selectedLeads.length} leads?`)) {
          setLeads(leads.filter(lead => !selectedLeads.includes(lead.id)));
          setSelectedLeads([]);
        }
        break;
      case 'assign':
        // Implement bulk assignment
        break;
      case 'tag':
        // Implement bulk tagging
        break;
      case 'status':
        // Implement bulk status change
        break;
      case 'export':
        exportLeads('csv');
        break;
    }
  };

  const saveView = () => {
    const viewName = prompt('Enter view name:');
    if (viewName) {
      const newView: SavedView = {
        id: Date.now().toString(),
        name: viewName,
        filters: { ...filters, searchQuery },
        isPrivate: true,
        createdBy: 'current-user',
        createdAt: new Date().toISOString()
      };
      setSavedViews([...savedViews, newView]);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-500',
      CONTACTED: 'bg-yellow-500',
      QUALIFIED: 'bg-green-500',
      UNQUALIFIED: 'bg-gray-500',
      OPPORTUNITY: 'bg-purple-500',
      CUSTOMER: 'bg-emerald-500',
      LOST: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const applyAdvancedFilter = (lead: Lead, filterGroup: any): boolean => {
    const evaluateCondition = (condition: any): boolean => {
      const fieldValue = lead[condition.field as keyof Lead];
      const conditionValue = condition.value;
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === conditionValue;
        case 'not_equals':
          return fieldValue !== conditionValue;
        case 'contains':
          return String(fieldValue).toLowerCase().includes(String(conditionValue).toLowerCase());
        case 'not_contains':
          return !String(fieldValue).toLowerCase().includes(String(conditionValue).toLowerCase());
        case 'starts_with':
          return String(fieldValue).toLowerCase().startsWith(String(conditionValue).toLowerCase());
        case 'ends_with':
          return String(fieldValue).toLowerCase().endsWith(String(conditionValue).toLowerCase());
        case 'greater_than':
          return Number(fieldValue) > Number(conditionValue);
        case 'less_than':
          return Number(fieldValue) < Number(conditionValue);
        case 'greater_or_equal':
          return Number(fieldValue) >= Number(conditionValue);
        case 'less_or_equal':
          return Number(fieldValue) <= Number(conditionValue);
        case 'between':
          return Number(fieldValue) >= Number(conditionValue[0]) && 
                 Number(fieldValue) <= Number(conditionValue[1]);
        case 'is_empty':
          return !fieldValue || fieldValue === '';
        case 'is_not_empty':
          return !!fieldValue && fieldValue !== '';
        case 'before':
          return new Date(String(fieldValue)) < new Date(conditionValue);
        case 'after':
          return new Date(String(fieldValue)) > new Date(conditionValue);
        case 'in':
          return Array.isArray(conditionValue) && conditionValue.includes(fieldValue);
        case 'not_in':
          return Array.isArray(conditionValue) && !conditionValue.includes(fieldValue);
        default:
          return true;
      }
    };

    const evaluateGroup = (group: any): boolean => {
      const conditionResults = group.conditions.map(evaluateCondition);
      const groupResults = group.groups.map(evaluateGroup);
      const allResults = [...conditionResults, ...groupResults];
      
      if (allResults.length === 0) return true;
      
      return group.operator === 'AND' 
        ? allResults.every(Boolean)
        : allResults.some(Boolean);
    };

    return evaluateGroup(filterGroup);
  };

  // Mock reps data for lead routing
  const mockReps = [
    {
      id: '1',
      name: 'Alex Chen',
      email: 'alex.chen@company.com',
      team: 'Enterprise Sales',
      role: 'Senior Account Executive',
      availability: 'available' as const,
      skills: ['SaaS', 'Enterprise', 'Security', 'Cloud Infrastructure'],
      industries: ['Technology', 'Finance', 'Healthcare'],
      languages: ['English', 'Mandarin'],
      timezone: '-8',
      maxLeads: 50,
      currentLeads: 32,
      performance: {
        conversionRate: 28,
        avgResponseTime: 2.5,
        satisfaction: 94,
        deals: 45
      },
      specialties: {
        dealSize: ['$100k+', '$500k+'],
        productLines: ['Enterprise', 'Security'],
        regions: ['North America', 'APAC']
      }
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@company.com',
      team: 'Mid-Market',
      role: 'Account Executive',
      availability: 'available' as const,
      skills: ['Mid-Market', 'Retail', 'E-commerce', 'Marketing Tech'],
      industries: ['Retail', 'E-commerce', 'Marketing'],
      languages: ['English', 'Spanish', 'Portuguese'],
      timezone: '-5',
      maxLeads: 60,
      currentLeads: 48,
      performance: {
        conversionRate: 32,
        avgResponseTime: 1.8,
        satisfaction: 96,
        deals: 62
      },
      specialties: {
        dealSize: ['$50k-$100k', '$100k+'],
        productLines: ['Growth', 'Professional'],
        regions: ['North America', 'LATAM']
      }
    },
    {
      id: '3',
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      team: 'SMB Sales',
      role: 'Sales Representative',
      availability: 'busy' as const,
      skills: ['SMB', 'Startups', 'Quick Closes', 'Volume Sales'],
      industries: ['Startups', 'Small Business', 'Professional Services'],
      languages: ['English'],
      timezone: '-6',
      maxLeads: 80,
      currentLeads: 75,
      performance: {
        conversionRate: 22,
        avgResponseTime: 1.2,
        satisfaction: 91,
        deals: 120
      },
      specialties: {
        dealSize: ['<$50k'],
        productLines: ['Starter', 'Professional'],
        regions: ['North America']
      }
    }
  ];

  const filteredLeads = useMemo(() => {
    let filtered = [...leads];
    
    // Apply advanced filter if set
    if (advancedFilter) {
      filtered = filtered.filter(lead => applyAdvancedFilter(lead, advancedFilter));
    } else {
      // Apply basic filters
      if (filters.status !== 'all') {
        filtered = filtered.filter(lead => lead.status === filters.status);
      }
    
      if (filters.source !== 'all') {
        filtered = filtered.filter(lead => lead.source === filters.source);
      }
      
      if (filters.score !== 'all') {
        const scoreRange = filters.score.split('-').map(Number);
        filtered = filtered.filter(lead => 
          lead.score >= (scoreRange[0] || 0) && lead.score <= (scoreRange[1] || 100)
        );
      }
    }
    
    // Apply search
    if (debouncedSearch) {
      if (useNaturalLanguage) {
        // Simulate AI-powered natural language search
        const searchLower = debouncedSearch.toLowerCase();
        filtered = filtered.filter(lead => {
          // Check for intent-based queries
          if (searchLower.includes('hot') || searchLower.includes('high score')) {
            return lead.score >= 80;
          }
          if (searchLower.includes('qualified')) {
            return lead.status === 'QUALIFIED';
          }
          if (searchLower.includes('enterprise')) {
            return lead.tags?.includes('Enterprise') || 
                   lead.enrichedData?.company.size === '1000-5000';
          }
          if (searchLower.includes('recent') || searchLower.includes('new')) {
            const dayAgo = new Date(Date.now() - 86400000);
            return new Date(lead.createdAt) > dayAgo;
          }
          
          // Fallback to regular search
          return `${lead.firstName} ${lead.lastName} ${lead.company} ${lead.email}`
            .toLowerCase()
            .includes(searchLower);
        });
      } else {
        // Regular search
        filtered = filtered.filter(lead =>
          `${lead.firstName} ${lead.lastName} ${lead.company} ${lead.email} ${lead.jobTitle}`
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        );
      }
    }
    
    return filtered;
  }, [leads, filters, debouncedSearch, useNaturalLanguage, advancedFilter]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage your inbound leads with AI-powered insights</p>
        </div>
        
        <div className="flex items-center gap-2">
          {savedViews.length > 0 && (
            <Select value={currentView} onValueChange={setCurrentView}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                {savedViews.map(view => (
                  <SelectItem key={view.id} value={view.id}>
                    {view.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Button variant="outline" size="sm" onClick={saveView}>
            <Star className="h-4 w-4 mr-1" />
            Save View
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setShowImportDialog(true)}>
                <FileText className="mr-2 h-4 w-4" />
                Import from CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Database className="mr-2 h-4 w-4" />
                Import from API
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" />
                Web-to-Lead Form
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => exportLeads('csv')}>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportLeads('json')}>
                <Code className="mr-2 h-4 w-4" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
                <DialogDescription>
                  Create a new lead with automatic duplicate detection and enrichment
                </DialogDescription>
              </DialogHeader>
              
              {showDuplicates && (
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Potential duplicate leads detected. Please review before creating.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={newLead.firstName}
                      onChange={(e) => setNewLead({...newLead, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newLead.lastName}
                      onChange={(e) => setNewLead({...newLead, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newLead.company}
                    onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={newLead.jobTitle}
                    onChange={(e) => setNewLead({...newLead, jobTitle: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <Select value={newLead.source} onValueChange={(value) => setNewLead({...newLead, source: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                        <SelectItem value="Webinar">Webinar</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Trade Show">Trade Show</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newLead.status} onValueChange={(value) => setNewLead({...newLead, status: value})}>
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
                
                <Button onClick={handleCreateLead} disabled={isAddingLead}>
                  {isAddingLead ? 'Creating...' : 'Create Lead'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={useNaturalLanguage ? "Ask anything about your leads..." : "Search leads..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Switch
                id="natural-language"
                checked={useNaturalLanguage}
                onCheckedChange={setUseNaturalLanguage}
              />
              <Label htmlFor="natural-language" className="text-sm">
                <div className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  AI Search
                </div>
              </Label>
            </div>
            
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="CONTACTED">Contacted</SelectItem>
                <SelectItem value="QUALIFIED">Qualified</SelectItem>
                <SelectItem value="OPPORTUNITY">Opportunity</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.score} onValueChange={(value) => setFilters({...filters, score: value})}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="80-100">High (80-100)</SelectItem>
                <SelectItem value="60-79">Medium (60-79)</SelectItem>
                <SelectItem value="0-59">Low (0-59)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative">
              <Button 
                variant={advancedFilter ? "default" : "outline"}
                size="icon"
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              {advancedFilter && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </div>
          </div>
          
          {useNaturalLanguage && debouncedSearch && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              AI is interpreting your search query...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filter Builder */}
      {showAdvancedFilter && (
        <AdvancedFilterBuilder
          fields={[
            { name: 'firstName', label: 'First Name', type: 'text' },
            { name: 'lastName', label: 'Last Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'company', label: 'Company', type: 'text' },
            { name: 'jobTitle', label: 'Job Title', type: 'text' },
            { name: 'score', label: 'Score', type: 'number' },
            { name: 'status', label: 'Status', type: 'select', options: [
              { value: 'NEW', label: 'New' },
              { value: 'CONTACTED', label: 'Contacted' },
              { value: 'QUALIFIED', label: 'Qualified' },
              { value: 'UNQUALIFIED', label: 'Unqualified' },
              { value: 'OPPORTUNITY', label: 'Opportunity' },
              { value: 'CUSTOMER', label: 'Customer' },
              { value: 'LOST', label: 'Lost' }
            ]},
            { name: 'source', label: 'Source', type: 'select', options: [
              { value: 'Website', label: 'Website' },
              { value: 'LinkedIn', label: 'LinkedIn' },
              { value: 'Referral', label: 'Referral' },
              { value: 'Cold Outreach', label: 'Cold Outreach' },
              { value: 'Event', label: 'Event' },
              { value: 'Partner', label: 'Partner' }
            ]},
            { name: 'createdAt', label: 'Created Date', type: 'date' },
            { name: 'lastActivity', label: 'Last Activity', type: 'date' },
            { name: 'budget', label: 'Budget', type: 'text' },
            { name: 'timeline', label: 'Timeline', type: 'text' },
            { name: 'industry', label: 'Industry', type: 'text' },
            { name: 'companySize', label: 'Company Size', type: 'select', options: [
              { value: '1-10', label: '1-10' },
              { value: '11-50', label: '11-50' },
              { value: '51-200', label: '51-200' },
              { value: '201-500', label: '201-500' },
              { value: '500+', label: '500+' }
            ]}
          ]}
          onApply={(filter) => {
            setAdvancedFilter(filter);
            setShowAdvancedFilter(false);
            // Reset basic filters when using advanced
            setFilters({
              status: 'all',
              source: 'all',
              score: 'all',
              dateRange: 'all',
              tags: [],
              customFields: {}
            });
          }}
          onSave={(name, filter) => {
            setSavedAdvancedFilters([...savedAdvancedFilters, {
              id: Date.now().toString(),
              name,
              filter
            }]);
          }}
          savedFilters={savedAdvancedFilters}
          className="mb-6"
        />
      )}

      {/* Behavioral Scoring */}
      {showBehavioralScoring && (
        <BehavioralScoring
          onScoreUpdate={(leadId, score) => {
            // Update lead score based on behavior
            const updatedLeads = leads.map(lead => 
              lead.id === leadId 
                ? { ...lead, score: Math.min(100, lead.score + score) }
                : lead
            );
            setLeads(updatedLeads);
          }}
          className="mb-6"
        />
      )}

      {/* Lead Routing Manager */}
      {showRouting && (
        <LeadRoutingManager
          reps={mockReps}
          onRoutingChange={(rules) => {
            console.log('Routing rules updated:', rules);
          }}
          className="mb-6"
        />
      )}

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Leads</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span>{filteredLeads.length} leads found</span>
                {selectedLeads.length > 0 && <span>• {selectedLeads.length} selected</span>}
                {advancedFilter && (
                  <>
                    <span>•</span>
                    <Badge variant="secondary" className="gap-1">
                      <Filter className="h-3 w-3" />
                      Advanced Filter Active
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setAdvancedFilter(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBehavioralScoring(!showBehavioralScoring)}
              >
                <Activity className="h-4 w-4 mr-1" />
                Behavioral Scoring
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRouting(!showRouting)}
              >
                <Route className="h-4 w-4 mr-1" />
                Lead Routing
              </Button>
              {selectedLeads.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAction('assign')}>
                      <User className="mr-2 h-4 w-4" />
                      Assign to...
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('tag')}>
                      <Hash className="mr-2 h-4 w-4" />
                      Add Tags
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('status')}>
                      <Target className="mr-2 h-4 w-4" />
                      Change Status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAction('export')}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('delete')} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading leads...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No leads found matching your criteria</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedLeads(filteredLeads.map(l => l.id));
                        } else {
                          setSelectedLeads([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="cursor-pointer">
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLeads([...selectedLeads, lead.id]);
                          } else {
                            setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={() => setSelectedLead(lead)}>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {lead.firstName[0]}{lead.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {lead.email}
                          </div>
                        </div>
                        {lead.duplicates && lead.duplicates.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <GitMerge className="h-3 w-3 mr-1" />
                            {lead.duplicates.length} duplicates
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div>{lead.company}</div>
                          <div className="text-sm text-muted-foreground">{lead.jobTitle}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={cn("font-semibold", getScoreColor(lead.score))}>
                          {lead.score}
                        </span>
                        {lead.enrichedData && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {lead.behavioralScore && lead.behavioralScore > 50 && (
                          <div className="flex items-center gap-1">
                            <Activity className={cn(
                              "h-4 w-4",
                              lead.behavioralScore > 80 ? "text-red-500" : 
                              lead.behavioralScore > 60 ? "text-orange-500" : 
                              "text-yellow-500"
                            )} />
                            {lead.behavioralScore > 80 && (
                              <Badge variant="destructive" className="text-xs">Hot</Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.assignedTo ? (
                        <Badge variant="outline">
                          <User className="h-3 w-3 mr-1" />
                          {lead.assignedTo}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>
                      {lead.lastActivity ? (
                        <div className="text-sm">
                          {formatDistanceToNow(new Date(lead.lastActivity), { addSuffix: true })}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No activity</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedLead(lead)}>
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => enrichLead(lead)}>
                            <Database className="mr-2 h-4 w-4" />
                            Enrich Data
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => assignLeadWithAI(lead)}>
                            <Brain className="mr-2 h-4 w-4" />
                            AI Assign to Rep
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Lead Profile Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle>Lead Profile</DialogTitle>
                <DialogDescription>
                  360-degree view of {selectedLead.firstName} {selectedLead.lastName}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="enrichment">Enrichment</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.jobTitle}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Lead Scoring</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Overall Score</span>
                              <span className={cn("font-semibold", getScoreColor(selectedLead.score))}>
                                {selectedLead.score}/100
                              </span>
                            </div>
                            <Progress value={selectedLead.score} className="h-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <Label className="text-xs">Engagement</Label>
                              <div className="font-medium">High</div>
                            </div>
                            <div>
                              <Label className="text-xs">Fit Score</Label>
                              <div className="font-medium">85%</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Qualification Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs">Budget</Label>
                          <div className="font-medium">{selectedLead.qualificationData.budget || 'Not specified'}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Timeline</Label>
                          <div className="font-medium">{selectedLead.qualificationData.timeline || 'Not specified'}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Interest Level</Label>
                          <div className="font-medium">{selectedLead.qualificationData.interest || 'Not specified'}</div>
                        </div>
                      </div>
                      {selectedLead.qualificationData.notes && (
                        <div className="mt-4">
                          <Label className="text-xs">Notes</Label>
                          <p className="text-sm mt-1">{selectedLead.qualificationData.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="enrichment" className="space-y-4">
                  {selectedLead.enrichedData ? (
                    <>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Company Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs">Industry</Label>
                              <div className="font-medium">{selectedLead.enrichedData.company.industry}</div>
                            </div>
                            <div>
                              <Label className="text-xs">Company Size</Label>
                              <div className="font-medium">{selectedLead.enrichedData.company.size} employees</div>
                            </div>
                            <div>
                              <Label className="text-xs">Revenue</Label>
                              <div className="font-medium">{selectedLead.enrichedData.company.revenue}</div>
                            </div>
                            <div>
                              <Label className="text-xs">Location</Label>
                              <div className="font-medium">{selectedLead.enrichedData.company.location}</div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Label className="text-xs">Technologies Used</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedLead.enrichedData.company.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          {selectedLead.enrichedData.company.fundingTotal && (
                            <div className="mt-4">
                              <Label className="text-xs">Funding</Label>
                              <div className="font-medium">{selectedLead.enrichedData.company.fundingTotal}</div>
                              <div className="text-sm text-muted-foreground">{selectedLead.enrichedData.company.lastFunding}</div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Insights & Signals</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-xs">Buying Signals</Label>
                            <ul className="mt-2 space-y-1">
                              {selectedLead.enrichedData.insights.buyingSignals.map((signal, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>{signal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <Label className="text-xs">Recent News</Label>
                            <ul className="mt-2 space-y-1">
                              {selectedLead.enrichedData.insights.recentNews.map((news, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                                  <span>{news}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">No enrichment data available</p>
                        <Button onClick={() => enrichLead(selectedLead)} disabled={isEnriching}>
                          {isEnriching ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Enriching...
                            </>
                          ) : (
                            <>
                              <Database className="mr-2 h-4 w-4" />
                              Enrich Lead Data
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Activity Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedLead.activities && selectedLead.activities.length > 0 ? (
                        <div className="space-y-4">
                          {selectedLead.activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">
                              <div className="mt-1">
                                {activity.type === 'email' && <Mail className="h-4 w-4 text-blue-500" />}
                                {activity.type === 'call' && <Phone className="h-4 w-4 text-green-500" />}
                                {activity.type === 'meeting' && <Calendar className="h-4 w-4 text-purple-500" />}
                                {activity.type === 'note' && <FileText className="h-4 w-4 text-gray-500" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })} by {activity.user}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">No activity recorded</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="duplicates" className="space-y-4">
                  {selectedLead.duplicates && selectedLead.duplicates.length > 0 ? (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Potential Duplicates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedLead.duplicates.map((dup) => (
                            <div key={dup.id} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant={dup.confidence >= 80 ? "destructive" : "secondary"}>
                                    {dup.confidence}% match
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    Matching: {dup.matchFields.join(', ')}
                                  </span>
                                </div>
                                <Button size="sm" variant="outline">
                                  <GitMerge className="h-4 w-4 mr-1" />
                                  Merge
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Name:</span> {dup.lead.firstName} {dup.lead.lastName}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Email:</span> {dup.lead.email}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Company:</span> {dup.lead.company}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                        <p className="text-muted-foreground">No duplicate leads detected</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Leads from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file to bulk import leads. The system will automatically map columns.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImportFile(file);
                    handleFileImport(file);
                  }
                }}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Drop CSV file here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supported columns: First Name, Last Name, Email, Phone, Company, Job Title
                </p>
              </label>
            </div>
            
            {importFile && (
              <Alert>
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>Selected file: {importFile.name}</span>
                    {isImporting && <RefreshCw className="h-4 w-4 animate-spin" />}
                  </div>
                </AlertDescription>
              </Alert>
            )}
            
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Import Guidelines:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• First row should contain column headers</li>
                <li>• Email is required for each lead</li>
                <li>• Duplicate leads will be automatically detected and skipped</li>
                <li>• All imported leads will be tagged as &quot;imported&quot;</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Cancel
            </Button>
            <Button disabled={!importFile || isImporting} onClick={() => importFile && handleFileImport(importFile)}>
              {isImporting ? 'Importing...' : 'Import Leads'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}