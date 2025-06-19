"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, UserPlus, Shield, Settings, Mail, Phone,
  Lock, Unlock, Key, AlertTriangle, CheckCircle,
  Clock, Calendar, Activity, MoreVertical, Edit,
  Trash2, RefreshCw, Download, Upload, Search,
  Filter, UserCheck, UserX, ShieldCheck, ShieldOff,
  Eye, EyeOff, Copy, Send, LogOut, UserCog, Info,
  Plus, MessageSquare, ArrowRight, XCircle
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

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  department?: string;
  manager?: string;
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
  permissions: Permission[];
  teams: string[];
  twoFactorEnabled: boolean;
  loginAttempts: number;
  passwordLastChanged?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  userCount: number;
  createdAt: string;
}

interface Permission {
  id: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'execute' | '*';
  scope?: 'own' | 'team' | 'all';
  conditions?: Record<string, any>;
}

interface Team {
  id: string;
  name: string;
  description: string;
  manager: string;
  members: string[];
  createdAt: string;
}

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'success' | 'failure';
}

interface UserManagementProps {
  className?: string;
}

export function UserManagement({ className }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1-555-0123',
      role: {
        id: '1',
        name: 'Admin',
        description: 'Full system access',
        permissions: [],
        isSystem: true,
        userCount: 3,
        createdAt: new Date().toISOString()
      },
      status: 'active',
      department: 'Sales',
      lastLogin: new Date(Date.now() - 3600000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      permissions: [],
      teams: ['sales-team-1'],
      twoFactorEnabled: true,
      loginAttempts: 0,
      passwordLastChanged: new Date(Date.now() - 86400000 * 45).toISOString()
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '+1-555-0124',
      role: {
        id: '2',
        name: 'Sales Manager',
        description: 'Manage sales team and view reports',
        permissions: [],
        isSystem: false,
        userCount: 8,
        createdAt: new Date().toISOString()
      },
      status: 'active',
      department: 'Sales',
      manager: 'John Smith',
      lastLogin: new Date(Date.now() - 7200000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
      permissions: [],
      teams: ['sales-team-1', 'sales-team-2'],
      twoFactorEnabled: true,
      loginAttempts: 0
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: {
        id: '3',
        name: 'SDR',
        description: 'Sales Development Representative',
        permissions: [],
        isSystem: false,
        userCount: 25,
        createdAt: new Date().toISOString()
      },
      status: 'active',
      department: 'Sales',
      manager: 'Sarah Johnson',
      lastLogin: new Date(Date.now() - 1800000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
      permissions: [],
      teams: ['sales-team-1'],
      twoFactorEnabled: false,
      loginAttempts: 0
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@company.com',
      role: {
        id: '3',
        name: 'SDR',
        description: 'Sales Development Representative',
        permissions: [],
        isSystem: false,
        userCount: 25,
        createdAt: new Date().toISOString()
      },
      status: 'suspended',
      department: 'Sales',
      manager: 'Sarah Johnson',
      lastLogin: new Date(Date.now() - 86400000 * 7).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 120).toISOString(),
      permissions: [],
      teams: ['sales-team-2'],
      twoFactorEnabled: false,
      loginAttempts: 5
    }
  ];

  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access with all permissions',
      permissions: [
        { id: '1', resource: '*', action: '*', scope: 'all' }
      ],
      isSystem: true,
      userCount: 3,
      createdAt: new Date(Date.now() - 86400000 * 365).toISOString()
    },
    {
      id: '2',
      name: 'Sales Manager',
      description: 'Manage sales team, view reports, approve deals',
      permissions: [
        { id: '2', resource: 'leads', action: '*', scope: 'team' },
        { id: '3', resource: 'conversations', action: '*', scope: 'team' },
        { id: '4', resource: 'reports', action: 'read', scope: 'all' },
        { id: '5', resource: 'users', action: 'read', scope: 'team' },
        { id: '6', resource: 'users', action: 'update', scope: 'team' }
      ],
      isSystem: false,
      userCount: 8,
      createdAt: new Date(Date.now() - 86400000 * 180).toISOString()
    },
    {
      id: '3',
      name: 'SDR',
      description: 'Sales Development Representative - manage own leads',
      permissions: [
        { id: '7', resource: 'leads', action: '*', scope: 'own' },
        { id: '8', resource: 'conversations', action: '*', scope: 'own' },
        { id: '9', resource: 'campaigns', action: 'read', scope: 'all' },
        { id: '10', resource: 'reports', action: 'read', scope: 'own' }
      ],
      isSystem: false,
      userCount: 25,
      createdAt: new Date(Date.now() - 86400000 * 150).toISOString()
    },
    {
      id: '4',
      name: 'Marketing',
      description: 'Manage campaigns and view analytics',
      permissions: [
        { id: '11', resource: 'campaigns', action: '*', scope: 'all' },
        { id: '12', resource: 'analytics', action: 'read', scope: 'all' },
        { id: '13', resource: 'leads', action: 'read', scope: 'all' }
      ],
      isSystem: false,
      userCount: 5,
      createdAt: new Date(Date.now() - 86400000 * 120).toISOString()
    }
  ];

  const mockAuditLogs: AuditLog[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Smith',
      action: 'user.create',
      resource: 'users',
      resourceId: '5',
      details: 'Created new user: alex.wilson@company.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'success'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah Johnson',
      action: 'user.update',
      resource: 'users',
      resourceId: '3',
      details: 'Updated user role from SDR to Sales Manager',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0...',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'success'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Chen',
      action: 'auth.login',
      resource: 'auth',
      details: 'User logged in successfully',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0...',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      status: 'success'
    },
    {
      id: '4',
      userId: '4',
      userName: 'Emily Davis',
      action: 'auth.login',
      resource: 'auth',
      details: 'Failed login attempt - invalid password',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0...',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'failure'
    }
  ];

  useState(() => {
    setUsers(mockUsers);
    setRoles(mockRoles);
    setAuditLogs(mockAuditLogs);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'suspended': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPermissionIcon = (action: string) => {
    switch (action) {
      case 'create': return <UserPlus className="h-3 w-3" />;
      case 'read': return <Eye className="h-3 w-3" />;
      case 'update': return <Edit className="h-3 w-3" />;
      case 'delete': return <Trash2 className="h-3 w-3" />;
      case 'execute': return <Activity className="h-3 w-3" />;
      case '*': return <ShieldCheck className="h-3 w-3" />;
      default: return <Shield className="h-3 w-3" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.id === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users, roles, permissions, and access control
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account and assign role
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name</Label>
                          <Input placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name</Label>
                          <Input placeholder="Smith" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="john.smith@company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone (Optional)</Label>
                        <Input type="tel" placeholder="+1-555-0123" />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.id} value={role.id}>
                                <div>
                                  <div className="font-medium">{role.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {role.description}
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Manager (Optional)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manager" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.filter(u => u.role.name === 'Admin' || u.role.name === 'Sales Manager').map(user => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send-invite" defaultChecked />
                        <Label htmlFor="send-invite" className="text-sm font-normal">
                          Send invitation email to set up password
                        </Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateUser(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowCreateUser(false)}>
                        Create User
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Security</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role.name}</Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge className={cn("text-xs", getStatusColor(user.status))}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.lastLogin ? (
                            <div className="text-sm">
                              <div>{formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}</div>
                              <div className="text-xs text-muted-foreground">
                                {format(new Date(user.lastLogin), 'MMM d, h:mm a')}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Never</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.twoFactorEnabled ? (
                              <Badge variant="outline" className="text-xs gap-1">
                                <ShieldCheck className="h-3 w-3" />
                                2FA
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs gap-1 text-orange-600">
                                <ShieldOff className="h-3 w-3" />
                                No 2FA
                              </Badge>
                            )}
                            {user.loginAttempts > 3 && (
                              <Badge variant="destructive" className="text-xs gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {user.loginAttempts}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === 'active' ? (
                                <DropdownMenuItem className="text-orange-600">
                                  <UserX className="mr-2 h-4 w-4" />
                                  Suspend User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate User
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
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

            <TabsContent value="roles" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Roles & Permissions</h3>
                <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
                  <DialogTrigger asChild>
                    <Button>
                      <Shield className="h-4 w-4 mr-2" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create New Role</DialogTitle>
                      <DialogDescription>
                        Define a new role with specific permissions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Role Name</Label>
                        <Input placeholder="e.g., Sales Analyst" />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input placeholder="Brief description of the role" />
                      </div>
                      <div className="space-y-2">
                        <Label>Permissions</Label>
                        <div className="border rounded-lg p-4 space-y-3 max-h-[300px] overflow-y-auto">
                          {['leads', 'conversations', 'campaigns', 'analytics', 'reports', 'users', 'settings'].map(resource => (
                            <div key={resource} className="space-y-2">
                              <h4 className="font-medium capitalize">{resource}</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {['create', 'read', 'update', 'delete'].map(action => (
                                  <div key={action} className="flex items-center space-x-2">
                                    <Checkbox id={`${resource}-${action}`} />
                                    <Label 
                                      htmlFor={`${resource}-${action}`} 
                                      className="text-sm font-normal capitalize flex items-center gap-1"
                                    >
                                      {getPermissionIcon(action)}
                                      {action}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                              <Separator />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateRole(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowCreateRole(false)}>
                        Create Role
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {roles.map((role) => (
                  <Card key={role.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{role.name}</CardTitle>
                            {role.isSystem && (
                              <Badge variant="secondary" className="text-xs">
                                System
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{role.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {role.userCount} users
                          </Badge>
                          {!role.isSystem && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedRole(role)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Role
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Role
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Permissions</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.slice(0, 5).map((permission) => (
                            <Badge key={permission.id} variant="outline" className="text-xs gap-1">
                              {getPermissionIcon(permission.action)}
                              {permission.resource}:{permission.action}
                              {permission.scope && permission.scope !== 'all' && ` (${permission.scope})`}
                            </Badge>
                          ))}
                          {role.permissions.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="teams" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Teams allow you to group users for easier permission management and reporting.
                </AlertDescription>
              </Alert>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Teams Management Coming Soon</h3>
                <p className="text-muted-foreground">
                  Create and manage teams to organize your users
                </p>
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Audit Log</CardTitle>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Activities</SelectItem>
                        <SelectItem value="auth">Authentication</SelectItem>
                        <SelectItem value="users">User Management</SelectItem>
                        <SelectItem value="permissions">Permission Changes</SelectItem>
                        <SelectItem value="data">Data Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {auditLogs.map((log) => (
                        <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                          <div className={cn(
                            "p-2 rounded-full",
                            log.status === 'success' ? "bg-green-100" : "bg-red-100"
                          )}>
                            {log.status === 'success' ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{log.userName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {log.action.replace('.', ' → ')}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            {log.details && (
                              <p className="text-sm mt-1">{log.details}</p>
                            )}
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span>IP: {log.ipAddress}</span>
                              <span>•</span>
                              <span>{format(new Date(log.timestamp), 'MMM d, yyyy h:mm a')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={cn("text-xs", getStatusColor(selectedUser.status))}>
                      {selectedUser.status}
                    </Badge>
                    <Badge variant="outline">{selectedUser.role.name}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="font-medium">{selectedUser.department}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Manager</Label>
                  <p className="font-medium">{selectedUser.manager || 'None'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <p className="font-medium">
                    {format(new Date(selectedUser.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Login</Label>
                  <p className="font-medium">
                    {selectedUser.lastLogin ? 
                      format(new Date(selectedUser.lastLogin), 'MMM d, yyyy h:mm a') : 
                      'Never'
                    }
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-2">Security Settings</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">Two-Factor Authentication</span>
                    </div>
                    <Switch checked={selectedUser.twoFactorEnabled} />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span className="text-sm">Password Last Changed</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedUser.passwordLastChanged ? 
                        formatDistanceToNow(new Date(selectedUser.passwordLastChanged), { addSuffix: true }) :
                        'Never'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Failed Login Attempts</span>
                    </div>
                    <span className="text-sm font-medium">{selectedUser.loginAttempts}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}