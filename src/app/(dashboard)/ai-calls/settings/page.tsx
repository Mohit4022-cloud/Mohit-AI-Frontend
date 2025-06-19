"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
  ArrowLeft, Save, RotateCw, Mic, Volume2, Brain, 
  Zap, Shield, Globe, FileText, AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AICallSettingsPage() {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);

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
            <h1 className="text-2xl font-bold">AI Call Settings</h1>
            <p className="text-muted-foreground">
              Configure AI agent behavior and call preferences
            </p>
          </div>
          {hasChanges && (
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <RotateCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="agent" className="flex-1">
        <TabsList className="grid w-full max-w-[600px] grid-cols-5">
          <TabsTrigger value="agent">AI Agent</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="agent" className="space-y-6 mt-6">
          <AgentSettings onChange={() => setHasChanges(true)} />
        </TabsContent>

        <TabsContent value="voice" className="space-y-6 mt-6">
          <VoiceSettings onChange={() => setHasChanges(true)} />
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6 mt-6">
          <BehaviorSettings onChange={() => setHasChanges(true)} />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6 mt-6">
          <ComplianceSettings onChange={() => setHasChanges(true)} />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 mt-6">
          <AdvancedSettings onChange={() => setHasChanges(true)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AgentSettings({ onChange }: { onChange: () => void }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Agent Configuration
          </CardTitle>
          <CardDescription>
            Configure the AI agent&apos;s personality and capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Agent Name</Label>
            <Input 
              defaultValue="Mohit AI Sales Assistant" 
              onChange={onChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Agent Role</Label>
            <Textarea
              defaultValue="I'm an AI sales assistant helping to qualify leads and schedule meetings for the sales team."
              onChange={onChange}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label>Personality Traits</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Friendliness</Label>
                  <span className="text-sm text-muted-foreground">80%</span>
                </div>
                <Slider defaultValue={[80]} max={100} onChange={onChange} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Assertiveness</Label>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <Slider defaultValue={[60]} max={100} onChange={onChange} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Empathy</Label>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <Slider defaultValue={[90]} max={100} onChange={onChange} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal">Humor</Label>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <Slider defaultValue={[30]} max={100} onChange={onChange} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Learning Mode</Label>
              <p className="text-sm text-muted-foreground">
                AI learns from successful calls to improve performance
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>
            Information the AI agent can reference during calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Product Knowledge</p>
                  <p className="text-sm text-muted-foreground">Features, pricing, competitors</p>
                </div>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Sales Scripts</p>
                  <p className="text-sm text-muted-foreground">Opening, objection handling, closing</p>
                </div>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Company Information</p>
                  <p className="text-sm text-muted-foreground">About us, case studies, testimonials</p>
                </div>
              </div>
              <Badge>Active</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Manage Knowledge Base
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

function VoiceSettings({ onChange }: { onChange: () => void }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Voice Configuration
          </CardTitle>
          <CardDescription>
            Customize the AI agent&apos;s voice and speech patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Voice Model</Label>
            <Select defaultValue="professional" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional Sales (Rachel)</SelectItem>
                <SelectItem value="friendly">Friendly Consultant (James)</SelectItem>
                <SelectItem value="executive">Executive (Victoria)</SelectItem>
                <SelectItem value="technical">Technical Expert (David)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Speaking Speed</Label>
                <span className="text-sm text-muted-foreground">1.0x</span>
              </div>
              <Slider defaultValue={[100]} min={75} max={125} onChange={onChange} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Pitch Variation</Label>
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              <Slider defaultValue={[50]} max={100} onChange={onChange} />
            </div>
          </div>

          <div>
            <Label>Speech Style</Label>
            <Select defaultValue="conversational" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conversational">Conversational</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                <SelectItem value="calm">Calm & Measured</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Filler Words</Label>
              <p className="text-sm text-muted-foreground">
                Use natural speech patterns like &quot;um&quot; and &quot;uh&quot;
              </p>
            </div>
            <Switch onChange={onChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Active Listening Sounds</Label>
              <p className="text-sm text-muted-foreground">
                &quot;Mm-hmm&quot;, &quot;I see&quot;, &quot;Right&quot; during listening
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voice Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm mb-2">Sample greeting:</p>
              <p className="italic">&quot;Hi, this is Rachel from Mohit AI. I&apos;m calling to follow up on your interest in our sales automation platform. Do you have a few minutes to chat?&quot;</p>
            </div>
            <Button className="w-full">
              <Mic className="h-4 w-4 mr-2" />
              Preview Voice
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function BehaviorSettings({ onChange }: { onChange: () => void }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Call Behavior
          </CardTitle>
          <CardDescription>
            Define how the AI agent handles different call scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Opening Strategy</Label>
            <Select defaultValue="warm" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct - Get to the point quickly</SelectItem>
                <SelectItem value="warm">Warm - Build rapport first</SelectItem>
                <SelectItem value="permission">Permission-based - Ask if it&apos;s a good time</SelectItem>
                <SelectItem value="value">Value-first - Lead with benefit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Objection Handling</Label>
            <Select defaultValue="acknowledge" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acknowledge">Acknowledge & Redirect</SelectItem>
                <SelectItem value="question">Ask Clarifying Questions</SelectItem>
                <SelectItem value="empathize">Empathize & Educate</SelectItem>
                <SelectItem value="defer">Defer to Human Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Maximum Call Duration</Label>
            <Select defaultValue="15" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="0">No limit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Silence Threshold</Label>
            <p className="text-sm text-muted-foreground mb-2">
              How long to wait before prompting after silence
            </p>
            <Select defaultValue="3" onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 seconds</SelectItem>
                <SelectItem value="3">3 seconds</SelectItem>
                <SelectItem value="5">5 seconds</SelectItem>
                <SelectItem value="7">7 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Interrupt Detection</Label>
              <p className="text-sm text-muted-foreground">
                Stop speaking when lead interrupts
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Transfer on Request</Label>
              <p className="text-sm text-muted-foreground">
                Automatically transfer when lead asks for human
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escalation Rules</CardTitle>
          <CardDescription>
            When to involve human agents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium">Pricing Negotiations</p>
                <p className="text-sm text-muted-foreground">Transfer when discussing custom pricing</p>
              </div>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium">Technical Questions</p>
                <p className="text-sm text-muted-foreground">Escalate complex technical inquiries</p>
              </div>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">Angry Customers</p>
                <p className="text-sm text-muted-foreground">Immediate transfer on negative sentiment</p>
              </div>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ComplianceSettings({ onChange }: { onChange: () => void }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance & Legal
          </CardTitle>
          <CardDescription>
            Ensure AI calls comply with regulations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Call Recording Consent</Label>
              <p className="text-sm text-muted-foreground">
                Announce call recording at the beginning
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>AI Disclosure</Label>
              <p className="text-sm text-muted-foreground">
                Inform leads they&apos;re speaking with AI
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>

          <div>
            <Label>Consent Script</Label>
            <Textarea
              defaultValue="This call may be recorded for quality and training purposes. You're speaking with an AI assistant. Is it okay to continue?"
              onChange={onChange}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label>Time Zone Restrictions</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Only call during allowed hours
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Earliest Call Time</Label>
                <Select defaultValue="9" onValueChange={onChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8:00 AM</SelectItem>
                    <SelectItem value="9">9:00 AM</SelectItem>
                    <SelectItem value="10">10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">Latest Call Time</Label>
                <Select defaultValue="17" onValueChange={onChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="17">5:00 PM</SelectItem>
                    <SelectItem value="18">6:00 PM</SelectItem>
                    <SelectItem value="19">7:00 PM</SelectItem>
                    <SelectItem value="20">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Honor Do Not Call Registry</Label>
              <p className="text-sm text-muted-foreground">
                Check DNC lists before calling
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>
            Configure compliance by region
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">United States</p>
                <p className="text-sm text-muted-foreground">TCPA compliant</p>
              </div>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">European Union</p>
                <p className="text-sm text-muted-foreground">GDPR compliant</p>
              </div>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Canada</p>
                <p className="text-sm text-muted-foreground">CASL compliant</p>
              </div>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AdvancedSettings({ onChange }: { onChange: () => void }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization</CardTitle>
          <CardDescription>
            Fine-tune AI performance and resource usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Response Latency</Label>
            <Select defaultValue="balanced" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fastest">Fastest (~75ms) - Lower quality</SelectItem>
                <SelectItem value="balanced">Balanced (~150ms) - Good quality</SelectItem>
                <SelectItem value="quality">Quality (~250ms) - Best quality</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Concurrent Call Limit</Label>
            <Select defaultValue="10" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 calls</SelectItem>
                <SelectItem value="10">10 calls</SelectItem>
                <SelectItem value="25">25 calls</SelectItem>
                <SelectItem value="50">50 calls</SelectItem>
                <SelectItem value="100">100 calls</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Retry Strategy</Label>
            <Select defaultValue="progressive" onValueChange={onChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate retry</SelectItem>
                <SelectItem value="progressive">Progressive delays</SelectItem>
                <SelectItem value="scheduled">Scheduled retry</SelectItem>
                <SelectItem value="manual">Manual only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Call Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Track detailed metrics and AI performance
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Real-time Coaching</Label>
              <p className="text-sm text-muted-foreground">
                Show live suggestions to human agents
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Developer Settings</CardTitle>
          <CardDescription>
            Advanced configuration for developers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>API Endpoint</Label>
            <Input
              value="wss://api.mohitai.com/calls/websocket"
              readOnly
              className="mt-1 font-mono text-sm"
            />
          </div>

          <div>
            <Label>Agent ID</Label>
            <Input
              value="agent_01HJKL3N4P5Q6R7S8T9UVWXYZ"
              readOnly
              className="mt-1 font-mono text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Debug Mode</Label>
              <p className="text-sm text-muted-foreground">
                Log detailed AI decisions and responses
              </p>
            </div>
            <Switch onChange={onChange} />
          </div>

          <div className="pt-2">
            <Button variant="outline" className="w-full">
              View API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}