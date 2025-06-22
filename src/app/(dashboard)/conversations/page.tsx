"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
import { io, Socket } from "socket.io-client";
import {
  Phone,
  PhoneOff,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Headphones,
  Video,
  VideoOff,
  Mail,
  MessageSquare,
  Send,
  Clock,
  Calendar,
  User,
  Building,
  Star,
  StarOff,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Settings,
  Download,
  Upload,
  FileText,
  Copy,
  Edit,
  Trash2,
  Plus,
  Check,
  X,
  Info,
  Bot,
  Brain,
  Sparkles,
  Shield,
  Zap,
  Target,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Flag,
  BookOpen,
  Save,
  Play,
  Pause,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Linkedin,
  MessageCircle as WhatsApp,
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
import { AIConversationAssistant } from "@/components/ai-conversation-assistant";
import { ConversationChannels } from "@/components/conversation-channels";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";

interface Conversation {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  company: string;
  type: "email" | "call" | "chat" | "sms" | "whatsapp" | "linkedin";
  status: "active" | "completed" | "scheduled" | "missed";
  startTime: string;
  endTime?: string;
  duration?: number;
  messages: Message[];
  qualityScore?: number;
  sentiment?: "positive" | "neutral" | "negative";
  summary?: string;
  nextSteps?: string[];
  tags: string[];
  recording?: string;
  transcript?: string;
  linkedinProfile?: string;
  whatsappNumber?: string;
}

interface Message {
  id: string;
  sender: "agent" | "lead" | "system";
  content: string;
  timestamp: string;
  type: "text" | "email" | "call" | "note";
  metadata?: any;
  qualityScore?: number;
  sentiment?: string;
  suggestions?: string[];
}

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  variables: string[];
  usage: number;
  effectiveness: number;
  lastUsed?: string;
}

interface CallState {
  isActive: boolean;
  isIncoming: boolean;
  isMuted: boolean;
  isOnHold: boolean;
  duration: number;
  remoteStream?: MediaStream;
  localStream?: MediaStream;
  callerId?: string;
  callId?: string;
}

interface QualityMetrics {
  responseTime: number;
  sentiment: number;
  relevance: number;
  grammar: number;
  persuasiveness: number;
  overall: number;
}

export default function ConversationsPage() {
  const { token, user } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [callState, setCallState] = useState<CallState>({
    isActive: false,
    isIncoming: false,
    isMuted: false,
    isOnHold: false,
    duration: 0,
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [showTemplates, setShowTemplates] = useState(false);
  const [showQualityAnalysis, setShowQualityAnalysis] = useState(false);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics>({
    responseTime: 0,
    sentiment: 0,
    relevance: 0,
    grammar: 0,
    persuasiveness: 0,
    overall: 0,
  });
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [callVolume, setCallVolume] = useState(50);
  const [micVolume, setMicVolume] = useState(50);
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [showChannels, setShowChannels] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load mock data
    const mockConversations: Conversation[] = [
      {
        id: "1",
        leadId: "1",
        leadName: "Sarah Johnson",
        leadEmail: "sarah.johnson@techcorp.com",
        leadPhone: "+1-415-555-0123",
        company: "TechCorp Solutions",
        type: "call",
        status: "active",
        startTime: new Date(Date.now() - 300000).toISOString(),
        messages: [
          {
            id: "1",
            sender: "system",
            content: "Call connected",
            timestamp: new Date(Date.now() - 300000).toISOString(),
            type: "call",
          },
          {
            id: "2",
            sender: "agent",
            content:
              "Hi Sarah, this is " +
              user?.name +
              " from Mohit AI. Thanks for taking my call.",
            timestamp: new Date(Date.now() - 280000).toISOString(),
            type: "call",
            qualityScore: 92,
            sentiment: "positive",
          },
          {
            id: "3",
            sender: "lead",
            content:
              "Hi! Yes, I was expecting your call. I saw your demo request form.",
            timestamp: new Date(Date.now() - 260000).toISOString(),
            type: "call",
          },
        ],
        qualityScore: 88,
        sentiment: "positive",
        tags: ["Demo Scheduled", "Decision Maker", "High Interest"],
      },
      {
        id: "2",
        leadId: "2",
        leadName: "Michael Chen",
        leadEmail: "mchen@innovate.io",
        leadPhone: "+1-408-555-0456",
        company: "Innovate.io",
        type: "email",
        status: "completed",
        startTime: new Date(Date.now() - 7200000).toISOString(),
        endTime: new Date(Date.now() - 3600000).toISOString(),
        messages: [
          {
            id: "1",
            sender: "agent",
            content:
              "Subject: Following up on our conversation\n\nHi Michael,\n\nIt was great speaking with you earlier today about how Mohit AI can help streamline your SDR operations...",
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            type: "email",
            qualityScore: 85,
            suggestions: ["Add specific metrics", "Include case study"],
          },
          {
            id: "2",
            sender: "lead",
            content:
              "Thanks for the follow-up. Can you send me the pricing information we discussed?",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            type: "email",
          },
        ],
        qualityScore: 82,
        sentiment: "neutral",
        tags: ["Pricing Requested", "Follow-up Required"],
      },
      {
        id: "3",
        leadId: "3",
        leadName: "Jessica Williams",
        leadEmail: "jessica.w@startupx.com",
        leadPhone: "+1-650-555-0789",
        company: "StartupX",
        type: "whatsapp",
        status: "active",
        startTime: new Date(Date.now() - 1800000).toISOString(),
        whatsappNumber: "+1-650-555-0789",
        messages: [
          {
            id: "1",
            sender: "lead",
            content:
              "Hi! I saw your message on LinkedIn about your SDR platform. Can you tell me more?",
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            type: "text",
          },
          {
            id: "2",
            sender: "agent",
            content:
              "Hello Jessica! Thanks for reaching out. I'd be happy to tell you more about Mohit AI. Are you currently facing any challenges with your SDR team?",
            timestamp: new Date(Date.now() - 1700000).toISOString(),
            type: "text",
            qualityScore: 90,
          },
          {
            id: "3",
            sender: "lead",
            content:
              "Yes, we're struggling with response times and lead qualification. Our team is overwhelmed.",
            timestamp: new Date(Date.now() - 1600000).toISOString(),
            type: "text",
          },
        ],
        qualityScore: 90,
        sentiment: "positive",
        tags: ["WhatsApp", "Interested", "Pain Points Identified"],
      },
      {
        id: "4",
        leadId: "4",
        leadName: "Robert Martinez",
        leadEmail: "robert.m@enterprise.com",
        leadPhone: "+1-212-555-0234",
        company: "Enterprise Solutions",
        type: "linkedin",
        status: "active",
        startTime: new Date(Date.now() - 900000).toISOString(),
        linkedinProfile: "https://linkedin.com/in/robertmartinez",
        messages: [
          {
            id: "1",
            sender: "agent",
            content:
              "Hi Robert, I noticed you're the VP of Sales at Enterprise Solutions. I've been following your company's impressive growth and thought you might be interested in how we're helping similar companies scale their SDR operations. Would you be open to a brief conversation?",
            timestamp: new Date(Date.now() - 900000).toISOString(),
            type: "text",
            qualityScore: 88,
          },
          {
            id: "2",
            sender: "lead",
            content:
              "Thanks for reaching out. We are actually evaluating SDR tools right now. What makes Mohit AI different from other solutions?",
            timestamp: new Date(Date.now() - 600000).toISOString(),
            type: "text",
          },
        ],
        qualityScore: 88,
        sentiment: "neutral",
        tags: ["LinkedIn", "Decision Maker", "Evaluating"],
      },
    ];

    const mockTemplates: Template[] = [
      {
        id: "1",
        name: "Initial Outreach - Tech Companies",
        category: "Cold Outreach",
        content:
          "Hi {{firstName}},\n\nI noticed {{company}} is growing rapidly and thought you might be interested in how we're helping similar companies scale their sales development efforts...",
        variables: ["firstName", "company"],
        usage: 156,
        effectiveness: 78,
        lastUsed: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "2",
        name: "Demo Follow-up",
        category: "Follow-up",
        content:
          "Hi {{firstName}},\n\nThank you for taking the time to see our demo today. As discussed, here are the key points...",
        variables: ["firstName"],
        usage: 89,
        effectiveness: 92,
        lastUsed: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: "3",
        name: "Objection Handling - Budget",
        category: "Objection Handling",
        content:
          "I understand budget is a concern. Many of our customers initially had the same worry, but found that the ROI from increased conversions more than justified the investment...",
        variables: [],
        usage: 45,
        effectiveness: 71,
      },
      {
        id: "4",
        name: "WhatsApp Initial Contact",
        category: "WhatsApp",
        content:
          "Hi {{firstName}}! 👋\n\nI hope this message finds you well. I'm reaching out from Mohit AI regarding your interest in improving your SDR operations.\n\nWould you have 5 minutes for a quick chat about your current challenges?",
        variables: ["firstName"],
        usage: 67,
        effectiveness: 85,
      },
      {
        id: "5",
        name: "LinkedIn Connection Request",
        category: "LinkedIn",
        content:
          "Hi {{firstName}},\n\nI noticed we're both in the {{industry}} space. I've been following {{company}}'s impressive growth and would love to connect to share insights on scaling SDR teams.\n\nLooking forward to connecting!",
        variables: ["firstName", "industry", "company"],
        usage: 112,
        effectiveness: 73,
      },
      {
        id: "6",
        name: "LinkedIn Follow-up",
        category: "LinkedIn",
        content:
          "Hi {{firstName}},\n\nThanks for connecting! I wanted to reach out because I noticed {{company}} is {{growthIndicator}}. We've helped similar companies automate their SDR processes and increase conversion rates by 40%.\n\nWould you be open to a brief conversation about your current sales development challenges?",
        variables: ["firstName", "company", "growthIndicator"],
        usage: 89,
        effectiveness: 81,
      },
    ];

    setConversations(mockConversations);
    setTemplates(mockTemplates);

    // Initialize WebSocket for real-time communication
    const socketInstance = io(WS_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    socketInstance.on("connect", () => {
      // Logging removed for production
    });

    socketInstance.on("incoming_call", (data) => {
      handleIncomingCall(data);
    });

    socketInstance.on("message", (data) => {
      handleNewMessage(data);
    });

    socketInstance.on("quality_analysis", (data) => {
      setQualityMetrics(data.metrics);
      setAiSuggestions(data.suggestions || []);
    });

    socketInstance.on("whatsapp_status", (data) => {
      // Handle WhatsApp message status updates (sent, delivered, read)
      handleNewMessage({
        conversationId: data.conversationId,
        message: {
          id: Date.now().toString(),
          sender: "system",
          content: `Message ${data.status}`,
          timestamp: new Date().toISOString(),
          type: "note",
        },
      });
    });

    socketInstance.on("linkedin_connection_accepted", (data) => {
      // Handle LinkedIn connection acceptance
      // Logging removed for production
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  const initializeWebRTC = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const configuration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      };

      peerConnectionRef.current = new RTCPeerConnection(configuration);

      localStream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStream);
      });

      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0] || null;
        }
      };

      setCallState((prev) => ({ ...prev, localStream }));
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const handleIncomingCall = (data: any) => {
    setCallState({
      isActive: false,
      isIncoming: true,
      isMuted: false,
      isOnHold: false,
      duration: 0,
      callerId: data.callerId,
      callId: data.callId,
    });
  };

  const handleNewMessage = (data: any) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === data.conversationId
          ? { ...conv, messages: [...conv.messages, data.message] }
          : conv,
      ),
    );

    if (activeConversation?.id === data.conversationId) {
      setActiveConversation((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, data.message],
            }
          : null,
      );
    }
  };

  const acceptCall = async () => {
    await initializeWebRTC();
    setCallState((prev) => ({
      ...prev,
      isActive: true,
      isIncoming: false,
    }));

    // Start call timer
    callTimerRef.current = setInterval(() => {
      setCallState((prev) => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);

    socket?.emit("accept_call", { callId: callState.callId });
  };

  const rejectCall = () => {
    setCallState({
      isActive: false,
      isIncoming: false,
      isMuted: false,
      isOnHold: false,
      duration: 0,
    });
    socket?.emit("reject_call", { callId: callState.callId });
  };

  const endCall = () => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    callState.localStream?.getTracks().forEach((track) => track.stop());

    setCallState({
      isActive: false,
      isIncoming: false,
      isMuted: false,
      isOnHold: false,
      duration: 0,
    });

    socket?.emit("end_call", { callId: callState.callId });
  };

  const toggleMute = () => {
    if (callState.localStream) {
      const audioTrack = callState.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setCallState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
      }
    }
  };

  const toggleHold = () => {
    setCallState((prev) => ({ ...prev, isOnHold: !prev.isOnHold }));
    socket?.emit("toggle_hold", {
      callId: callState.callId,
      onHold: !callState.isOnHold,
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "agent",
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: activeConversation.type === "email" ? "email" : "text",
    };

    socket?.emit("send_message", {
      conversationId: activeConversation.id,
      message,
    });

    setNewMessage("");

    // Trigger quality analysis
    analyzeMessageQuality(message);
  };

  const analyzeMessageQuality = async (message: Message) => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockQuality: QualityMetrics = {
        responseTime: Math.random() * 100,
        sentiment: 65 + Math.random() * 35,
        relevance: 70 + Math.random() * 30,
        grammar: 80 + Math.random() * 20,
        persuasiveness: 60 + Math.random() * 40,
        overall: 75 + Math.random() * 25,
      };

      setQualityMetrics(mockQuality);

      // Generate AI suggestions
      const suggestions = [
        "Consider adding specific value propositions",
        "Include a clear call-to-action",
        "Reference their company's recent achievements",
      ];
      setAiSuggestions(suggestions.slice(0, Math.floor(Math.random() * 3) + 1));

      setIsAnalyzing(false);
    }, 1500);
  };

  const applyTemplate = (template: Template) => {
    let content = template.content;

    // Replace variables with actual values
    if (activeConversation) {
      content = content.replace(
        "{{firstName}}",
        activeConversation.leadName.split(" ")[0] || "",
      );
      content = content.replace("{{company}}", activeConversation.company);
    }

    setNewMessage(content);
    setShowTemplates(false);
  };

  const formatCallDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]">
      {/* Header with Channels Toggle */}
      {!showChannels && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Conversations</h1>
            <p className="text-muted-foreground">
              Manage all your customer conversations
            </p>
          </div>
          <Button onClick={() => setShowChannels(true)} variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Manage Channels
          </Button>
        </div>
      )}

      {/* Show Channels or Conversations */}
      {showChannels ? (
        <div>
          <div className="mb-4">
            <Button onClick={() => setShowChannels(false)} variant="ghost">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Conversations
            </Button>
          </div>
          <ConversationChannels />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Conversations List */}
          <div className="col-span-3 space-y-4">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    placeholder="Search conversations..."
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setActiveConversation(conv)}
                        className={cn(
                          "p-3 rounded-lg cursor-pointer transition-colors",
                          activeConversation?.id === conv.id
                            ? "bg-primary/10 border border-primary"
                            : "hover:bg-muted",
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{conv.leadName}</h4>
                              {conv.status === "active" && (
                                <Badge variant="default" className="text-xs">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {conv.company}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(conv.startTime), {
                                  addSuffix: true,
                                })}
                              </span>
                              {conv.qualityScore && (
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    conv.qualityScore >= 80
                                      ? "text-green-600"
                                      : conv.qualityScore >= 60
                                        ? "text-yellow-600"
                                        : "text-red-600",
                                  )}
                                >
                                  {conv.qualityScore}% quality
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-2xl">
                            {conv.type === "call" && (
                              <Phone className="h-5 w-5" />
                            )}
                            {conv.type === "email" && (
                              <Mail className="h-5 w-5" />
                            )}
                            {conv.type === "chat" && (
                              <MessageSquare className="h-5 w-5" />
                            )}
                            {conv.type === "sms" && (
                              <MessageSquare className="h-5 w-5" />
                            )}
                            {conv.type === "whatsapp" && (
                              <WhatsApp className="h-5 w-5 text-green-600" />
                            )}
                            {conv.type === "linkedin" && (
                              <Linkedin className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Active Conversation */}
          <div
            className={cn(
              "space-y-4",
              showAIAssistant ? "col-span-6" : "col-span-9",
            )}
          >
            {/* VoIP Call Interface */}
            {(callState.isIncoming || callState.isActive) && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {callState.callerId?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {callState.callerId || "Unknown Caller"}
                        </h3>
                        {callState.isActive && (
                          <p className="text-sm text-muted-foreground">
                            {formatCallDuration(callState.duration)}
                          </p>
                        )}
                        {callState.isIncoming && (
                          <p className="text-sm text-green-600 animate-pulse">
                            Incoming call...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {callState.isIncoming ? (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={acceptCall}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={rejectCall}
                          >
                            <PhoneOff className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            variant={
                              callState.isMuted ? "destructive" : "outline"
                            }
                            onClick={toggleMute}
                          >
                            {callState.isMuted ? (
                              <MicOff className="h-4 w-4" />
                            ) : (
                              <Mic className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant={
                              callState.isOnHold ? "secondary" : "outline"
                            }
                            onClick={toggleHold}
                          >
                            {callState.isOnHold ? (
                              <Play className="h-4 w-4" />
                            ) : (
                              <Pause className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="flex items-center gap-2 mx-4">
                            <Volume2 className="h-4 w-4" />
                            <Slider
                              value={[callVolume]}
                              onValueChange={([value]) =>
                                setCallVolume(value || 50)
                              }
                              max={100}
                              className="w-24"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={endCall}
                          >
                            <PhoneOff className="h-4 w-4 mr-1" />
                            End Call
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeConversation ? (
              <Card className="flex-1 flex flex-col h-[calc(100%-8rem)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{activeConversation.leadName}</CardTitle>
                      <CardDescription>
                        {activeConversation.company} •{" "}
                        {activeConversation.leadEmail}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setShowQualityAnalysis(!showQualityAnalysis)
                        }
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Quality Analysis
                      </Button>
                      <Button
                        size="sm"
                        variant={showAIAssistant ? "default" : "outline"}
                        onClick={() => setShowAIAssistant(!showAIAssistant)}
                      >
                        <Brain className="h-4 w-4 mr-1" />
                        AI Assistant
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Start Call
                          </DropdownMenuItem>
                          {activeConversation?.type === "whatsapp" && (
                            <DropdownMenuItem>
                              <WhatsApp className="mr-2 h-4 w-4" />
                              Open in WhatsApp Web
                            </DropdownMenuItem>
                          )}
                          {activeConversation?.type === "linkedin" && (
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(
                                  activeConversation.linkedinProfile,
                                  "_blank",
                                )
                              }
                            >
                              <Linkedin className="mr-2 h-4 w-4" />
                              View LinkedIn Profile
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Meeting
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Lead Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Conversation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col overflow-hidden">
                  {/* Quality Analysis Panel */}
                  {showQualityAnalysis && (
                    <Card className="mb-4">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                              Response Quality Analysis
                            </h4>
                            <Badge
                              variant={
                                qualityMetrics.overall >= 80
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {qualityMetrics.overall.toFixed(0)}% Overall
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-xs">Response Time</Label>
                              <Progress
                                value={qualityMetrics.responseTime}
                                className="h-2 mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Sentiment</Label>
                              <Progress
                                value={qualityMetrics.sentiment}
                                className="h-2 mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Relevance</Label>
                              <Progress
                                value={qualityMetrics.relevance}
                                className="h-2 mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Grammar</Label>
                              <Progress
                                value={qualityMetrics.grammar}
                                className="h-2 mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Persuasiveness</Label>
                              <Progress
                                value={qualityMetrics.persuasiveness}
                                className="h-2 mt-1"
                              />
                            </div>
                          </div>

                          {aiSuggestions.length > 0 && (
                            <div>
                              <Label className="text-xs">AI Suggestions</Label>
                              <div className="mt-2 space-y-1">
                                {aiSuggestions.map((suggestion, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 text-sm"
                                  >
                                    <Sparkles className="h-3 w-3 text-yellow-500 mt-0.5" />
                                    <span className="text-muted-foreground">
                                      {suggestion}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Messages */}
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4 p-4">
                      {activeConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.sender === "agent"
                              ? "justify-end"
                              : "justify-start",
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] rounded-lg p-3",
                              message.sender === "agent"
                                ? "bg-primary text-primary-foreground"
                                : message.sender === "system"
                                  ? "bg-muted text-center w-full"
                                  : "bg-muted",
                            )}
                          >
                            {message.type === "call" && (
                              <div className="flex items-center gap-2 mb-1">
                                <Phone className="h-3 w-3" />
                                <span className="text-xs font-medium">
                                  Voice Call
                                </span>
                              </div>
                            )}
                            {activeConversation?.type === "whatsapp" && (
                              <div className="flex items-center gap-2 mb-1">
                                <WhatsApp className="h-3 w-3" />
                                <span className="text-xs font-medium">
                                  WhatsApp
                                </span>
                              </div>
                            )}
                            {activeConversation?.type === "linkedin" && (
                              <div className="flex items-center gap-2 mb-1">
                                <Linkedin className="h-3 w-3" />
                                <span className="text-xs font-medium">
                                  LinkedIn Message
                                </span>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs opacity-70">
                                {format(new Date(message.timestamp), "HH:mm")}
                              </span>
                              {message.qualityScore && (
                                <Badge variant="secondary" className="text-xs">
                                  {message.qualityScore}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="space-y-2">
                    {isAnalyzing && (
                      <Alert>
                        <AlertDescription className="flex items-center gap-2">
                          <Brain className="h-4 w-4 animate-pulse" />
                          Analyzing message quality...
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex items-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setShowTemplates(!showTemplates)}
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={
                          activeConversation?.type === "whatsapp"
                            ? "Type a WhatsApp message..."
                            : activeConversation?.type === "linkedin"
                              ? "Type a LinkedIn message..."
                              : activeConversation?.type === "email"
                                ? "Type your email..."
                                : "Type your message..."
                        }
                        className="flex-1"
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                      <Button onClick={sendMessage}>
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex-1 flex items-center justify-center">
                <CardContent>
                  <div className="text-center space-y-4">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">
                        No conversation selected
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Select a conversation from the list to view details
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Assistant Panel */}
          {showAIAssistant && (
            <div className="col-span-3 space-y-4">
              <AIConversationAssistant
                conversationId={activeConversation?.id}
                messages={
                  activeConversation?.messages?.map((msg) => ({
                    id: msg.id,
                    content: msg.content,
                    sender: msg.sender === "agent" ? "agent" : "lead",
                    timestamp: msg.timestamp,
                    sentiment: msg.sentiment as any,
                    keywords: [],
                    suggestions: msg.suggestions,
                  })) || []
                }
                onSendMessage={(message) => {
                  setNewMessage(message);
                  sendMessage();
                }}
                onSuggestionSelect={(suggestion) => {
                  setNewMessage(suggestion);
                }}
                className="h-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Templates Dialog */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Message Templates</DialogTitle>
            <DialogDescription>
              Select a template to use in your message
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[400px] mt-4">
            <div className="space-y-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => applyTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{template.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span>{template.effectiveness}% effective</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Used {template.usage} times
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {template.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
