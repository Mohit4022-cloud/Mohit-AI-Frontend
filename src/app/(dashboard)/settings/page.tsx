"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthStore } from "@/stores/authStore";
import { 
  Shield, Users, Globe, Bell, Database, Zap, Brain, 
  Lock, Key, UserCheck, LogIn, FileText, History,
  Palette, Upload, Download, Settings, Eye, EyeOff,
  Mail, Phone, MessageSquare, Calendar, Clock, 
  DollarSign, CreditCard, Building, User, ChevronRight,
  AlertTriangle, Info, CheckCircle, XCircle, RefreshCw,
  Smartphone, Monitor, Tablet, Sun, Moon, Laptop,
  Share2, Link, Code, Webhook, Server, Cloud,
  GitBranch, Package, Layers, Bot, Sparkles,
  ShieldCheck, ShieldAlert, UserX, UserPlus,
  FileCheck, FileClock, FileX, Search, Filter, Copy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { UserManagement } from "@/components/user-management";
import { ComplianceManager } from "@/components/compliance-manager";
import { MonitoringDashboard } from "@/components/monitoring-dashboard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed';
}

interface SSOProvider {
  id: string;
  name: string;
  type: 'saml' | 'oauth' | 'oidc';
  enabled: boolean;
  configured: boolean;
  icon: any;
  users: number;
  lastSync: string;
}

interface WhiteLabelConfig {
  companyName: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  emailDomain: string;
  supportEmail: string;
  customCSS?: string;
  hideAttribution: boolean;
}

export default function SettingsPage() {
  const { token, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("general");
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [ssoProviders, setSSOProviders] = useState<SSOProvider[]>([
    {
      id: 'okta',
      name: 'Okta',
      type: 'saml',
      enabled: true,
      configured: true,
      icon: Shield,
      users: 45,
      lastSync: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'google',
      name: 'Google Workspace',
      type: 'oauth',
      enabled: true,
      configured: true,
      icon: Globe,
      users: 128,
      lastSync: new Date(Date.now() - 1800000).toISOString()
    },
    {
      id: 'azure',
      name: 'Azure AD',
      type: 'saml',
      enabled: false,
      configured: false,
      icon: Cloud,
      users: 0,
      lastSync: ''
    }
  ]);
  const [whiteLabelConfig, setWhiteLabelConfig] = useState<WhiteLabelConfig>({
    companyName: 'Mohit AI',
    logo: '',
    favicon: '',
    primaryColor: '#0088FE',
    secondaryColor: '#00C49F',
    emailDomain: 'notifications@mohitai.com',
    supportEmail: 'support@mohitai.com',
    hideAttribution: false
  });
  const [showSSOSetup, setShowSSOSetup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [auditFilter, setAuditFilter] = useState({
    user: '',
    action: '',
    dateRange: 'last7days'
  });

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      companyName: 'TechCorp Inc',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      language: 'en',
      currency: 'USD'
    },
    notifications: {
      email: true,
      sms: false,
      desktop: true,
      mobile: true,
      leadAlerts: true,
      performanceReports: true,
      systemUpdates: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      ipWhitelist: [],
      passwordPolicy: 'strong',
      dataRetention: 365
    },
    integrations: {
      crm: 'salesforce',
      calendar: 'google',
      phone: 'twilio',
      email: 'sendgrid'
    }
  });

  // Mock audit logs
  useState(() => {
    const mockLogs: AuditLog[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        user: 'john.doe@company.com',
        action: 'user.login',
        resource: 'authentication',
        details: { method: 'sso', provider: 'okta' },
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome/119.0',
        status: 'success'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        user: 'sarah.johnson@company.com',
        action: 'lead.update',
        resource: 'leads/lead-123',
        details: { fields: ['status', 'score'], previous: { status: 'new' }, new: { status: 'qualified' } },
        ipAddress: '192.168.1.101',
        userAgent: 'Firefox/120.0',
        status: 'success'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        user: 'admin@company.com',
        action: 'settings.update',
        resource: 'settings/security',
        details: { setting: 'passwordPolicy', value: 'strong' },
        ipAddress: '192.168.1.50',
        userAgent: 'Safari/17.0',
        status: 'success'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        user: 'michael.chen@company.com',
        action: 'campaign.create',
        resource: 'campaigns/campaign-456',
        details: { name: 'Q4 Enterprise ABM', type: 'account-based' },
        ipAddress: '192.168.1.102',
        userAgent: 'Chrome/119.0',
        status: 'success'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        user: 'unknown',
        action: 'user.login',
        resource: 'authentication',
        details: { method: 'password', error: 'invalid_credentials' },
        ipAddress: '203.0.113.45',
        userAgent: 'Unknown',
        status: 'failed'
      }
    ];
    
    setAuditLogs(mockLogs);
  });

  const getActionIcon = (action: string) => {
    if (action.includes('login')) return <LogIn className="h-4 w-4" />;
    if (action.includes('update')) return <RefreshCw className="h-4 w-4" />;
    if (action.includes('create')) return <Plus className="h-4 w-4" />;
    if (action.includes('delete')) return <Trash2 className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getActionColor = (action: string, status: string) => {
    if (status === 'failed') return 'text-red-600';
    if (action.includes('delete')) return 'text-orange-600';
    if (action.includes('create')) return 'text-green-600';
    if (action.includes('update')) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
        
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Settings
        </Button>
      </div>

      {/* Main Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-10 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="whitelabel">White Label</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic information about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={settings.general.companyName}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, companyName: e.target.value }
                  })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.general.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                      <SelectItem value="Europe/Paris">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={settings.general.dateFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.general.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.general.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize your interface appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme</Label>
                <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                      <Sun className="h-4 w-4" />
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                      <Moon className="h-4 w-4" />
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                      <Laptop className="h-4 w-4" />
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        {/* Security & SSO Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Single Sign-On (SSO)</CardTitle>
              <CardDescription>Configure SSO providers for secure authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ssoProviders.map(provider => (
                <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      provider.enabled ? "bg-primary/10" : "bg-muted"
                    )}>
                      <provider.icon className={cn(
                        "h-5 w-5",
                        provider.enabled ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{provider.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {provider.type.toUpperCase()} • {provider.users} users
                        {provider.lastSync && ` • Last sync ${format(new Date(provider.lastSync), 'MMM d, h:mm a')}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={provider.configured ? "outline" : "secondary"}>
                      {provider.configured ? 'Configured' : 'Not Configured'}
                    </Badge>
                    <Switch
                      checked={provider.enabled}
                      onCheckedChange={(checked) => {
                        setSSOProviders(providers => providers.map(p => 
                          p.id === provider.id ? { ...p, enabled: checked } : p
                        ));
                      }}
                      disabled={!provider.configured}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedProvider(provider);
                        setShowSSOSetup(true);
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add SSO Provider
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>Configure security settings and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all users
                  </p>
                </div>
                <Switch checked={settings.security.twoFactorAuth} />
              </div>
              
              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically log out users after inactivity
                </p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[settings.security.sessionTimeout]}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: value[0] || 30 }
                    })}
                    max={120}
                    min={5}
                    step={5}
                    className="flex-1"
                  />
                  <span className="w-20 text-sm font-medium">
                    {settings.security.sessionTimeout} minutes
                  </span>
                </div>
              </div>
              
              <div>
                <Label>Password Policy</Label>
                <Select value={settings.security.passwordPolicy}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                    <SelectItem value="custom">Custom Requirements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Data Retention</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  How long to keep historical data
                </p>
                <Select value={settings.security.dataRetention.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="1825">5 years</SelectItem>
                    <SelectItem value="-1">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Settings */}
        <TabsContent value="compliance" className="space-y-4">
          <ComplianceManager />
        </TabsContent>

        {/* White Label Settings */}
        <TabsContent value="whitelabel" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              White-label features allow you to customize the platform with your brand identity. Changes will be reflected across all user interfaces.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>Customize the platform appearance with your brand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  id="brand-name"
                  value={whiteLabelConfig.companyName}
                  onChange={(e) => setWhiteLabelConfig({
                    ...whiteLabelConfig,
                    companyName: e.target.value
                  })}
                  placeholder="Your Company Name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Logo</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                    {whiteLabelConfig.logo ? (
                      <div className="relative mx-auto h-16 w-32">
                        <Image 
                          src={whiteLabelConfig.logo} 
                          alt="Logo" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Upload your logo
                        </p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Favicon</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                    {whiteLabelConfig.favicon ? (
                      <div className="relative mx-auto h-16 w-16">
                        <Image 
                          src={whiteLabelConfig.favicon} 
                          alt="Favicon" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Upload favicon
                        </p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Favicon
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Brand Colors</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="primary-color" className="text-sm">Primary Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={whiteLabelConfig.primaryColor}
                        onChange={(e) => setWhiteLabelConfig({
                          ...whiteLabelConfig,
                          primaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={whiteLabelConfig.primaryColor}
                        onChange={(e) => setWhiteLabelConfig({
                          ...whiteLabelConfig,
                          primaryColor: e.target.value
                        })}
                        placeholder="#0088FE"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondary-color" className="text-sm">Secondary Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={whiteLabelConfig.secondaryColor}
                        onChange={(e) => setWhiteLabelConfig({
                          ...whiteLabelConfig,
                          secondaryColor: e.target.value
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={whiteLabelConfig.secondaryColor}
                        onChange={(e) => setWhiteLabelConfig({
                          ...whiteLabelConfig,
                          secondaryColor: e.target.value
                        })}
                        placeholder="#00C49F"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email-domain">Email Domain</Label>
                  <Input
                    id="email-domain"
                    value={whiteLabelConfig.emailDomain}
                    onChange={(e) => setWhiteLabelConfig({
                      ...whiteLabelConfig,
                      emailDomain: e.target.value
                    })}
                    placeholder="notifications@yourdomain.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    value={whiteLabelConfig.supportEmail}
                    onChange={(e) => setWhiteLabelConfig({
                      ...whiteLabelConfig,
                      supportEmail: e.target.value
                    })}
                    placeholder="support@yourdomain.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="custom-css">Custom CSS (Advanced)</Label>
                <Textarea
                  id="custom-css"
                  value={whiteLabelConfig.customCSS}
                  onChange={(e) => setWhiteLabelConfig({
                    ...whiteLabelConfig,
                    customCSS: e.target.value
                  })}
                  placeholder="/* Add custom CSS here */"
                  rows={5}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hide Platform Attribution</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove &quot;Powered by Mohit AI&quot; from footer
                  </p>
                </div>
                <Switch
                  checked={whiteLabelConfig.hideAttribution}
                  onCheckedChange={(checked) => setWhiteLabelConfig({
                    ...whiteLabelConfig,
                    hideAttribution: checked
                  })}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit Trail</CardTitle>
                  <CardDescription>Track all system activities and changes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={auditFilter.dateRange} onValueChange={(value) => setAuditFilter({
                    ...auditFilter,
                    dateRange: value
                  })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="last30days">Last 30 days</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by user, action, or resource..."
                    className="pl-9"
                    value={auditFilter.user}
                    onChange={(e) => setAuditFilter({
                      ...auditFilter,
                      user: e.target.value
                    })}
                  />
                </div>
                <Select value={auditFilter.action} onValueChange={(value) => setAuditFilter({
                  ...auditFilter,
                  action: value
                })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All actions</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="update">Updates</SelectItem>
                    <SelectItem value="create">Creates</SelectItem>
                    <SelectItem value="delete">Deletes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {auditLogs
                    .filter(log => {
                      if (auditFilter.user && !log.user.includes(auditFilter.user)) return false;
                      if (auditFilter.action && !log.action.includes(auditFilter.action)) return false;
                      return true;
                    })
                    .map(log => (
                      <div key={log.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center",
                            log.status === 'success' ? "bg-green-100" : "bg-red-100"
                          )}>
                            <span className={getActionColor(log.action, log.status)}>
                              {getActionIcon(log.action)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{log.user}</span>
                              <span className="text-sm text-muted-foreground">
                                {format(new Date(log.timestamp), 'MMM d, yyyy h:mm:ss a')}
                              </span>
                            </div>
                            <p className="text-sm mt-1">
                              <span className={cn("font-medium", getActionColor(log.action, log.status))}>
                                {log.action}
                              </span>
                              {' on '}
                              <span className="font-medium">{log.resource}</span>
                            </p>
                            {log.details && (
                              <div className="mt-2 text-xs text-muted-foreground">
                                {log.action.includes('update') && log.details.fields && (
                                  <span>Modified: {log.details.fields.join(', ')}</span>
                                )}
                                {log.action.includes('login') && log.details.method && (
                                  <span>Method: {log.details.method} {log.details.provider && `(${log.details.provider})`}</span>
                                )}
                                {log.status === 'failed' && log.details.error && (
                                  <span className="text-red-600">Error: {log.details.error}</span>
                                )}
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>IP: {log.ipAddress}</span>
                              <span>Browser: {log.userAgent}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={log.status === 'success' ? 'outline' : 'destructive'}>
                          {log.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4">
          <MonitoringDashboard />
        </TabsContent>

        {/* Other tabs remain similar to original but with enhanced features */}
      </Tabs>

      {/* SSO Setup Dialog */}
      <Dialog open={showSSOSetup} onOpenChange={setShowSSOSetup}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {selectedProvider?.name} SSO</DialogTitle>
            <DialogDescription>
              Set up single sign-on for your organization
            </DialogDescription>
          </DialogHeader>
          
          {selectedProvider && (
            <div className="space-y-4 py-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Configure your {selectedProvider.name} {selectedProvider.type.toUpperCase()} settings below. 
                  You&apos;ll need administrator access to your identity provider.
                </AlertDescription>
              </Alert>
              
              {selectedProvider.type === 'saml' && (
                <>
                  <div>
                    <Label>Entity ID</Label>
                    <Input
                      value="https://app.mohitai.com/saml/metadata"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  
                  <div>
                    <Label>ACS URL</Label>
                    <Input
                      value="https://app.mohitai.com/saml/acs"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  
                  <div>
                    <Label>IdP Metadata URL</Label>
                    <Input
                      placeholder="https://your-idp.com/metadata"
                      className="font-mono text-sm"
                    />
                  </div>
                </>
              )}
              
              {selectedProvider.type === 'oauth' && (
                <>
                  <div>
                    <Label>Client ID</Label>
                    <Input
                      placeholder="Enter your OAuth client ID"
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label>Client Secret</Label>
                    <Input
                      type="password"
                      placeholder="Enter your OAuth client secret"
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label>Redirect URI</Label>
                    <Input
                      value="https://app.mohitai.com/auth/callback"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </>
              )}
              
              <Separator />
              
              <div>
                <Label>Attribute Mapping</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Map your IdP attributes to Mohit AI user fields
                </p>
                <div className="space-y-2">
                  {['email', 'firstName', 'lastName', 'department', 'role'].map(attr => (
                    <div key={attr} className="grid grid-cols-2 gap-2">
                      <Input value={attr} disabled />
                      <Input placeholder={`IdP attribute for ${attr}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSSOSetup(false)}>
              Cancel
            </Button>
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
            <Button>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

function Trash2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
}

function Save({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );
}