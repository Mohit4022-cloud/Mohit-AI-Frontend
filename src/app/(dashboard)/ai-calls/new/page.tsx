"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Phone, Sparkles, Users } from "lucide-react";
import { useAICallStore } from "@/stores/aiCallStore";
import { useContactsStore } from "@/stores/contactsStore";

export default function NewAICallPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { startNewCall } = useAICallStore();
  const { contacts } = useContactsStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    contactId: "",
    phoneNumber: "",
    name: "",
    company: "",
    callObjective: "sales",
    script: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Start the AI call
      await startNewCall({
        phoneNumber: formData.phoneNumber,
        contactName: formData.name || "Unknown",
        company: formData.company,
        objective: formData.callObjective,
        script: formData.script,
        notes: formData.notes,
      });
      
      toast({
        title: "AI Call Started",
        description: `Initiating call to ${formData.phoneNumber}...`,
      });
      
      // Redirect to active calls
      router.push("/ai-calls/active");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start AI call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSelect = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setFormData({
        ...formData,
        contactId,
        phoneNumber: contact.phone,
        name: contact.name,
        company: contact.company || "",
      });
    }
  };

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/ai-calls")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to AI Calls
        </Button>
        
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Phone className="h-8 w-8 text-ai-blue" />
          New AI Call
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure and start a new AI-powered call
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Select an existing contact or enter new details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contact">Select Contact</Label>
              <Select
                value={formData.contactId}
                onValueChange={handleContactSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a contact..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">New Contact</SelectItem>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name} - {contact.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="name">Contact Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Configuration</CardTitle>
            <CardDescription>
              Set the objective and behavior for the AI agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="objective">Call Objective</Label>
              <Select
                value={formData.callObjective}
                onValueChange={(value) => setFormData({ ...formData, callObjective: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Call</SelectItem>
                  <SelectItem value="followup">Follow-up Call</SelectItem>
                  <SelectItem value="support">Support Call</SelectItem>
                  <SelectItem value="survey">Survey Call</SelectItem>
                  <SelectItem value="appointment">Appointment Setting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="script">Custom Script (Optional)</Label>
              <Textarea
                id="script"
                placeholder="Enter a custom script or talking points for the AI..."
                value={formData.script}
                onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes or context for this call..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/ai-calls")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                Starting Call...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-4 w-4" />
                Start AI Call
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}