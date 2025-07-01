"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useContactsStore } from "@/stores/contactsStore";
import { Contact } from "@/types/contact";
import { AddContactForm } from "@/components/contacts/AddContactForm";
import { EditContactForm } from "@/components/contacts/EditContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash,
  Phone,
  Mail,
  Download,
  RefreshCw,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks/useDebounce";

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

export default function ContactsPage() {
  const { 
    contacts, 
    loading, 
    error, 
    loadContacts, 
    deleteContact,
    page,
    limit,
    total 
  } = useContactsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const { toast } = useToast();
  
  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    loadContacts(page, limit);
  }, [loadContacts, page, limit]);

  const filteredContacts = useMemo(() => {
    if (!debouncedSearchQuery) return contacts;
    
    const query = debouncedSearchQuery.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.company?.toLowerCase().includes(query) ||
        contact.phone.includes(debouncedSearchQuery)
    );
  }, [contacts, debouncedSearchQuery]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await deleteContact(id);
      toast({
        title: "Contact deleted",
        description: `${name} has been removed from your contacts.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      });
    }
  };

  const exportContacts = () => {
    const csv = [
      ["Name", "Email", "Phone", "Company", "Title", "Status", "Lead Score"],
      ...filteredContacts.map((c) => [
        c.name,
        c.email,
        c.phone,
        c.company || "",
        c.title || "",
        c.status || "",
        c.leadScore?.toString() || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const stats = {
    total: total || contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    qualified: contacts.filter((c) => c.status === "qualified").length,
    converted: contacts.filter((c) => c.status === "converted").length,
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    loadContacts(newPage, limit);
  };

  // Virtual scrolling setup
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: filteredContacts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">{stats.total} total contacts</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => loadContacts(page, limit)}
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
          <Button variant="outline" onClick={exportContacts}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Leads</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Qualified</p>
                <p className="text-2xl font-bold">{stats.qualified}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Converted</p>
                <p className="text-2xl font-bold">{stats.converted}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Contacts</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 text-center py-4">Error: {error}</div>
          )}

          {loading && contacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Loading contacts...
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery
                ? "No contacts found matching your search."
                : "No contacts yet. Add your first contact!"}
            </div>
          ) : (
            <>
              {/* Virtual scrolling container */}
              <div
                ref={parentRef}
                className="h-[600px] overflow-auto border rounded-lg"
              >
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {/* Header */}
                  <div className="sticky top-0 bg-white z-10 border-b">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm text-gray-700">
                      <div>Name</div>
                      <div>Contact Info</div>
                      <div>Company</div>
                      <div>Status</div>
                      <div>Lead Score</div>
                      <div className="text-right">Actions</div>
                    </div>
                  </div>

                  {/* Virtual rows */}
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const contact = filteredContacts[virtualRow.index];
                    return (
                      <div
                        key={contact.id}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start + 48}px)`,
                        }}
                      >
                        <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                          <div className="font-medium">{contact.name}</div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3" />
                              {contact.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3" />
                              {contact.phone}
                            </div>
                          </div>
                          <div>
                            {contact.company && (
                              <div>
                                <div className="font-medium">{contact.company}</div>
                                {contact.title && (
                                  <div className="text-sm text-gray-500">
                                    {contact.title}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div>
                            <Badge
                              className={cn(
                                statusColors[contact.status || "new"],
                              )}
                            >
                              {contact.status || "new"}
                            </Badge>
                          </div>
                          <div className="text-center">
                            {contact.leadScore || 50}
                          </div>
                          <div className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => setEditingContact(contact)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDelete(contact.id, contact.name)
                                  }
                                  className="text-red-600"
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} contacts
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || loading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <AddContactForm open={showAddForm} onOpenChange={setShowAddForm} />
      <EditContactForm
        contact={editingContact}
        open={!!editingContact}
        onOpenChange={(open) => !open && setEditingContact(null)}
      />
    </div>
  );
}