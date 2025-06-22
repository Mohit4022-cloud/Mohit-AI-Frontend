"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Mail,
  Phone,
  Smartphone,
  Users,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Check,
  X,
  Plus,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  Download,
  Upload,
  Zap,
  Bot,
  Sparkles,
  Palette,
  Code,
  Monitor,
  Clock,
  Calendar,
  Filter,
  Search,
  Send,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Info,
  Shield,
  Key,
  BarChart3,
  TrendingUp,
  MessageCircle,
  Hash,
  AtSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Channel {
  id: string;
  type:
    | "live_chat"
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "whatsapp"
    | "telegram";
  name: string;
  icon: any;
  enabled: boolean;
  configured: boolean;
  stats: {
    conversations: number;
    activeNow: number;
    avgResponseTime: number;
    satisfaction: number;
  };
  config?: any;
}

interface LiveChatConfig {
  widgetColor: string;
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  welcomeMessage: string;
  offlineMessage: string;
  businessHours: {
    enabled: boolean;
    timezone: string;
    schedule: {
      [key: string]: { start: string; end: string; enabled: boolean };
    };
  };
  autoReply: {
    enabled: boolean;
    delay: number;
    message: string;
  };
  customization: {
    logo: string;
    agentAvatars: boolean;
    soundNotifications: boolean;
    fileUploads: boolean;
    emojiPicker: boolean;
  };
  routing: {
    strategy: "round-robin" | "least-busy" | "skill-based";
    defaultTeam: string;
    priorityRules: Array<{
      condition: string;
      priority: number;
      team: string;
    }>;
  };
}

interface SocialMediaConfig {
  platform: string;
  accountId: string;
  accountName: string;
  accessToken: string;
  permissions: string[];
  autoReply: {
    enabled: boolean;
    templates: Array<{
      trigger: string;
      response: string;
    }>;
  };
  monitoring: {
    keywords: string[];
    hashtags: string[];
    mentions: boolean;
    directMessages: boolean;
    comments: boolean;
  };
  posting: {
    enabled: boolean;
    approval: boolean;
    schedule: Array<{
      day: string;
      time: string;
      type: string;
    }>;
  };
}

interface ConversationChannelsProps {
  className?: string;
}

export function ConversationChannels({ className }: ConversationChannelsProps) {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "live_chat",
      type: "live_chat",
      name: "Live Chat Widget",
      icon: MessageSquare,
      enabled: true,
      configured: true,
      stats: {
        conversations: 847,
        activeNow: 23,
        avgResponseTime: 45,
        satisfaction: 94.3,
      },
    },
    {
      id: "facebook",
      type: "facebook",
      name: "Facebook Messenger",
      icon: Facebook,
      enabled: true,
      configured: true,
      stats: {
        conversations: 412,
        activeNow: 8,
        avgResponseTime: 120,
        satisfaction: 91.2,
      },
    },
    {
      id: "twitter",
      type: "twitter",
      name: "Twitter/X",
      icon: Twitter,
      enabled: false,
      configured: false,
      stats: {
        conversations: 0,
        activeNow: 0,
        avgResponseTime: 0,
        satisfaction: 0,
      },
    },
    {
      id: "instagram",
      type: "instagram",
      name: "Instagram DMs",
      icon: Instagram,
      enabled: false,
      configured: false,
      stats: {
        conversations: 0,
        activeNow: 0,
        avgResponseTime: 0,
        satisfaction: 0,
      },
    },
    {
      id: "linkedin",
      type: "linkedin",
      name: "LinkedIn Messages",
      icon: Linkedin,
      enabled: true,
      configured: true,
      stats: {
        conversations: 234,
        activeNow: 5,
        avgResponseTime: 180,
        satisfaction: 88.7,
      },
    },
    {
      id: "whatsapp",
      type: "whatsapp",
      name: "WhatsApp Business",
      icon: Phone,
      enabled: false,
      configured: false,
      stats: {
        conversations: 0,
        activeNow: 0,
        avgResponseTime: 0,
        satisfaction: 0,
      },
    },
  ]);

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [showSetupDialog, setShowSetupDialog] = useState(false);
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Live chat configuration
  const [liveChatConfig, setLiveChatConfig] = useState<LiveChatConfig>({
    widgetColor: "#3b82f6",
    position: "bottom-right",
    welcomeMessage: "Hi! How can we help you today?",
    offlineMessage:
      "We're currently offline. Please leave a message and we'll get back to you soon.",
    businessHours: {
      enabled: true,
      timezone: "America/New_York",
      schedule: {
        monday: { start: "09:00", end: "17:00", enabled: true },
        tuesday: { start: "09:00", end: "17:00", enabled: true },
        wednesday: { start: "09:00", end: "17:00", enabled: true },
        thursday: { start: "09:00", end: "17:00", enabled: true },
        friday: { start: "09:00", end: "17:00", enabled: true },
        saturday: { start: "10:00", end: "14:00", enabled: false },
        sunday: { start: "10:00", end: "14:00", enabled: false },
      },
    },
    autoReply: {
      enabled: true,
      delay: 30,
      message: "Thanks for waiting! An agent will be with you shortly.",
    },
    customization: {
      logo: "",
      agentAvatars: true,
      soundNotifications: true,
      fileUploads: true,
      emojiPicker: true,
    },
    routing: {
      strategy: "round-robin",
      defaultTeam: "support",
      priorityRules: [],
    },
  });

  const generateEmbedCode = () => {
    return `<!-- Mohit AI Live Chat Widget -->
<script>
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://chat.mohitai.com/widget.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'YOUR_WORKSPACE_ID');
</script>
<!-- End Mohit AI Live Chat Widget -->`;
  };

  const handleChannelToggle = (channelId: string, enabled: boolean) => {
    setChannels(
      channels.map((ch) => (ch.id === channelId ? { ...ch, enabled } : ch)),
    );
  };

  const getChannelStatusColor = (channel: Channel) => {
    if (!channel.configured) return "text-gray-500";
    if (!channel.enabled) return "text-yellow-500";
    return "text-green-500";
  };

  const getChannelStatusText = (channel: Channel) => {
    if (!channel.configured) return "Not Configured";
    if (!channel.enabled) return "Disabled";
    return "Active";
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Conversation Channels</h2>
          <p className="text-muted-foreground">
            Manage all your communication channels in one place
          </p>
        </div>
        <Button onClick={() => setShowSetupDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Channel
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Channel Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <Card
                key={channel.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedChannel?.id === channel.id && "ring-2 ring-primary",
                )}
                onClick={() => setSelectedChannel(channel)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center",
                          channel.enabled ? "bg-primary/10" : "bg-muted",
                        )}
                      >
                        <channel.icon
                          className={cn(
                            "h-5 w-5",
                            channel.enabled
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{channel.name}</h3>
                        <p
                          className={cn(
                            "text-sm",
                            getChannelStatusColor(channel),
                          )}
                        >
                          {getChannelStatusText(channel)}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={channel.enabled}
                      onCheckedChange={(checked) =>
                        handleChannelToggle(channel.id, checked)
                      }
                      disabled={!channel.configured}
                    />
                  </div>

                  {channel.configured && channel.enabled && (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Conversations</p>
                        <p className="font-semibold">
                          {channel.stats.conversations}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Active Now</p>
                        <p className="font-semibold">
                          {channel.stats.activeNow}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Response</p>
                        <p className="font-semibold">
                          {channel.stats.avgResponseTime}s
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Satisfaction</p>
                        <p className="font-semibold">
                          {channel.stats.satisfaction}%
                        </p>
                      </div>
                    </div>
                  )}

                  {!channel.configured && (
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedChannel(channel);
                        setShowSetupDialog(true);
                      }}
                    >
                      Configure Channel
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Channel Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>
                Aggregated metrics across all active channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="text-2xl font-bold">1,493</h3>
                  <p className="text-sm text-muted-foreground">
                    Total Conversations
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="text-2xl font-bold">36</h3>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="text-2xl font-bold">87s</h3>
                  <p className="text-sm text-muted-foreground">
                    Avg Response Time
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="text-2xl font-bold">92.4%</h3>
                  <p className="text-sm text-muted-foreground">
                    Avg Satisfaction
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live-chat" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Chat Widget</CardTitle>
                  <CardDescription>
                    Customize your website chat experience
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowCodeDialog(true)}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Get Embed Code
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Widget Preview */}
              <div>
                <Label>Widget Preview</Label>
                <div className="mt-2 relative bg-gray-100 rounded-lg p-8 h-96">
                  <div className="absolute bottom-4 right-4">
                    <div
                      className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden"
                      style={{ borderColor: liveChatConfig.widgetColor }}
                    >
                      <div
                        className="p-4 text-white"
                        style={{ backgroundColor: liveChatConfig.widgetColor }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            <span className="font-semibold">
                              Mohit AI Support
                            </span>
                          </div>
                          <X className="h-4 w-4 cursor-pointer" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="bg-gray-100 rounded-lg p-3 mb-3">
                          <p className="text-sm">
                            {liveChatConfig.welcomeMessage}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Type your message..."
                            className="flex-1"
                          />
                          <Button
                            size="icon"
                            style={{
                              backgroundColor: liveChatConfig.widgetColor,
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold">Appearance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Widget Color</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="color"
                        value={liveChatConfig.widgetColor}
                        onChange={(e) =>
                          setLiveChatConfig({
                            ...liveChatConfig,
                            widgetColor: e.target.value,
                          })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={liveChatConfig.widgetColor}
                        onChange={(e) =>
                          setLiveChatConfig({
                            ...liveChatConfig,
                            widgetColor: e.target.value,
                          })
                        }
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Select
                      value={liveChatConfig.position}
                      onValueChange={(value: any) =>
                        setLiveChatConfig({
                          ...liveChatConfig,
                          position: value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">
                          Bottom Right
                        </SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Messages */}
              <div className="space-y-4">
                <h3 className="font-semibold">Messages</h3>
                <div>
                  <Label>Welcome Message</Label>
                  <Textarea
                    value={liveChatConfig.welcomeMessage}
                    onChange={(e) =>
                      setLiveChatConfig({
                        ...liveChatConfig,
                        welcomeMessage: e.target.value,
                      })
                    }
                    className="mt-2"
                    placeholder="Hi! How can we help you today?"
                  />
                </div>
                <div>
                  <Label>Offline Message</Label>
                  <Textarea
                    value={liveChatConfig.offlineMessage}
                    onChange={(e) =>
                      setLiveChatConfig({
                        ...liveChatConfig,
                        offlineMessage: e.target.value,
                      })
                    }
                    className="mt-2"
                    placeholder="We're currently offline..."
                  />
                </div>
              </div>

              <Separator />

              {/* Business Hours */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Business Hours</h3>
                  <Switch
                    checked={liveChatConfig.businessHours.enabled}
                    onCheckedChange={(checked) =>
                      setLiveChatConfig({
                        ...liveChatConfig,
                        businessHours: {
                          ...liveChatConfig.businessHours,
                          enabled: checked,
                        },
                      })
                    }
                  />
                </div>
                {liveChatConfig.businessHours.enabled && (
                  <div className="space-y-2">
                    {Object.entries(liveChatConfig.businessHours.schedule).map(
                      ([day, hours]) => (
                        <div key={day} className="flex items-center gap-4">
                          <Switch checked={hours.enabled} className="w-12" />
                          <span className="w-24 capitalize">{day}</span>
                          <Input
                            type="time"
                            value={hours.start}
                            className="w-32"
                            disabled={!hours.enabled}
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={hours.end}
                            className="w-32"
                            disabled={!hours.enabled}
                          />
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>

              <Separator />

              {/* Features */}
              <div className="space-y-4">
                <h3 className="font-semibold">Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Agent Avatars</p>
                      <p className="text-sm text-muted-foreground">
                        Show agent profile pictures
                      </p>
                    </div>
                    <Switch
                      checked={liveChatConfig.customization.agentAvatars}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sound Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Play sound for new messages
                      </p>
                    </div>
                    <Switch
                      checked={liveChatConfig.customization.soundNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">File Uploads</p>
                      <p className="text-sm text-muted-foreground">
                        Allow visitors to send files
                      </p>
                    </div>
                    <Switch
                      checked={liveChatConfig.customization.fileUploads}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Emoji Picker</p>
                      <p className="text-sm text-muted-foreground">
                        Enable emoji selection
                      </p>
                    </div>
                    <Switch
                      checked={liveChatConfig.customization.emojiPicker}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Integration</CardTitle>
              <CardDescription>
                Connect and manage your social media channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channels
                  .filter((ch) => ch.type !== "live_chat")
                  .map((channel) => (
                    <div key={channel.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-lg flex items-center justify-center",
                              channel.configured ? "bg-primary/10" : "bg-muted",
                            )}
                          >
                            <channel.icon
                              className={cn(
                                "h-5 w-5",
                                channel.configured
                                  ? "text-primary"
                                  : "text-muted-foreground",
                              )}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{channel.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {channel.configured
                                ? "Connected"
                                : "Not connected"}
                            </p>
                          </div>
                        </div>
                        {channel.configured ? (
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reconnect
                            </Button>
                          </div>
                        ) : (
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>

                      {channel.configured && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Account</p>
                              <p className="font-medium">@mohitai_official</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Followers</p>
                              <p className="font-medium">12.4K</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Sync</p>
                              <p className="font-medium">2 min ago</p>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Direct Messages</span>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <AtSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Mentions</span>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Hashtag Monitoring
                                </span>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Media Automation */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                Set up automated responses and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Bot className="h-4 w-4" />
                  <AlertDescription>
                    Automation helps you respond faster and maintain consistent
                    engagement across channels
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Welcome Message</h4>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Send automated welcome message to new followers
                    </p>
                    <Textarea
                      placeholder="Thanks for following! How can we help you today?"
                      className="text-sm"
                    />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Keyword Triggers</h4>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Respond automatically to specific keywords
                    </p>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input placeholder="Keyword" className="w-32" />
                        <Input placeholder="Response" className="flex-1" />
                        <Button size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Keyword
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Out of Office</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Inform customers when you&apos;re unavailable
                    </p>
                    <Textarea
                      placeholder="We're currently out of office. We'll respond within 24 hours."
                      className="text-sm"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Settings</CardTitle>
              <CardDescription>
                Configure global channel preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Routing & Assignment</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Default Routing Strategy</Label>
                    <Select defaultValue="round-robin">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="least-busy">
                          Least Busy Agent
                        </SelectItem>
                        <SelectItem value="skill-based">Skill Based</SelectItem>
                        <SelectItem value="manual">
                          Manual Assignment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Max Conversations per Agent</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Slider
                        defaultValue={[5]}
                        max={20}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-12 text-right">5</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Response Time Goals</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Response Time</Label>
                    <Select defaultValue="1m">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30s">30 seconds</SelectItem>
                        <SelectItem value="1m">1 minute</SelectItem>
                        <SelectItem value="5m">5 minutes</SelectItem>
                        <SelectItem value="15m">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Resolution Time</Label>
                    <Select defaultValue="30m">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 minutes</SelectItem>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Conversation Alert</p>
                      <p className="text-sm text-muted-foreground">
                        Notify agents of new conversations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SLA Breach Warning</p>
                      <p className="text-sm text-muted-foreground">
                        Alert when response time goals are at risk
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Channel Status Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Notify when channels go offline
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Setup Dialog */}
      <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedChannel
                ? `Configure ${selectedChannel.name}`
                : "Add New Channel"}
            </DialogTitle>
            <DialogDescription>
              Connect your communication channel to start receiving messages
            </DialogDescription>
          </DialogHeader>
          {selectedChannel && (
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You&apos;ll need admin access to your {selectedChannel.name}{" "}
                  account to complete setup
                </AlertDescription>
              </Alert>

              {selectedChannel.type === "facebook" && (
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Facebook className="h-4 w-4 mr-2" />
                    Connect with Facebook
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p>Required permissions:</p>
                    <ul className="list-disc pl-5 mt-1">
                      <li>pages_messaging</li>
                      <li>pages_read_engagement</li>
                      <li>pages_manage_metadata</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedChannel.type === "twitter" && (
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Twitter className="h-4 w-4 mr-2" />
                    Connect with Twitter/X
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p>We&apos;ll request access to:</p>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Read direct messages</li>
                      <li>Send direct messages</li>
                      <li>Read mentions and replies</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedChannel.type === "instagram" && (
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Instagram className="h-4 w-4 mr-2" />
                    Connect Instagram Business
                  </Button>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Instagram DMs require a Business or Creator account
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {selectedChannel.type === "linkedin" && (
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Linkedin className="h-4 w-4 mr-2" />
                    Connect LinkedIn
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p>Access required for:</p>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Company page messaging</li>
                      <li>Member conversations</li>
                      <li>InMail management</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedChannel.type === "whatsapp" && (
                <div className="space-y-4">
                  <div>
                    <Label>WhatsApp Business API Token</Label>
                    <Input
                      type="password"
                      placeholder="Enter your API token"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Phone Number ID</Label>
                    <Input
                      placeholder="Enter your phone number ID"
                      className="mt-2"
                    />
                  </div>
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Connect WhatsApp Business
                  </Button>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSetupDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle setup completion
                setShowSetupDialog(false);
              }}
            >
              Complete Setup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Embed Code Dialog */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Live Chat Widget Installation</DialogTitle>
            <DialogDescription>
              Add this code to your website to enable the live chat widget
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Installation Code</Label>
              <div className="relative mt-2">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{generateEmbedCode()}</code>
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(generateEmbedCode());
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Place this code just before the closing &lt;/body&gt; tag on
                every page where you want the chat widget to appear
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <h4 className="font-medium">Installation Instructions:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Copy the code above</li>
                <li>Open your website&apos;s HTML template or index file</li>
                <li>Paste the code before the closing &lt;/body&gt; tag</li>
                <li>Replace YOUR_WORKSPACE_ID with your actual workspace ID</li>
                <li>Save and deploy your changes</li>
              </ol>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCodeDialog(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generateEmbedCode());
                setShowCodeDialog(false);
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
