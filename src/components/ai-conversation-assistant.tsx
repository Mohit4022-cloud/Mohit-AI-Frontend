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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Target,
  Zap,
  Bot,
  Hash,
  Search,
  Filter,
  Eye,
  Activity,
  BarChart3,
  Lightbulb,
  Flag,
  Heart,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Info,
  ChevronRight,
  Copy,
  RefreshCw,
  Settings,
  Mic,
  Send,
  Clock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Message {
  id: string;
  content: string;
  sender: "lead" | "agent";
  timestamp: string;
  sentiment?: "positive" | "neutral" | "negative";
  intent?: string;
  keywords?: string[];
  suggestions?: string[];
}

interface Keyword {
  word: string;
  count: number;
  sentiment: "positive" | "neutral" | "negative";
  category: string;
}

interface SmartSuggestion {
  id: string;
  text: string;
  type: "response" | "question" | "objection_handler" | "closing";
  confidence: number;
  context: string;
}

interface ConversationMetrics {
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    trend: "improving" | "stable" | "declining";
  };
  engagement: {
    responseTime: number;
    messageLength: number;
    questionCount: number;
    interactionScore: number;
  };
  intent: {
    primary: string;
    confidence: number;
    alternatives: { intent: string; confidence: number }[];
  };
  buyingSignals: {
    score: number;
    signals: string[];
  };
}

interface AIConversationAssistantProps {
  conversationId?: string;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onSuggestionSelect?: (suggestion: string) => void;
  className?: string;
}

export function AIConversationAssistant({
  conversationId,
  messages = [],
  onSendMessage,
  onSuggestionSelect,
  className,
}: AIConversationAssistantProps) {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [metrics, setMetrics] = useState<ConversationMetrics>({
    sentiment: { positive: 0, neutral: 0, negative: 0, trend: "stable" },
    engagement: {
      responseTime: 0,
      messageLength: 0,
      questionCount: 0,
      interactionScore: 0,
    },
    intent: { primary: "unknown", confidence: 0, alternatives: [] },
    buyingSignals: { score: 0, signals: [] },
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [keywordTracking, setKeywordTracking] = useState(true);
  const [sentimentTracking, setSentimentTracking] = useState(true);
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(true);

  useEffect(() => {
    if (messages.length > 0 && realTimeAnalysis) {
      analyzeConversation();
    }
  }, [messages, realTimeAnalysis]); // eslint-disable-line react-hooks/exhaustive-deps

  const analyzeConversation = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      // Extract keywords
      const extractedKeywords = extractKeywords(messages);
      setKeywords(extractedKeywords);

      // Generate smart suggestions
      const generatedSuggestions = generateSuggestions(messages);
      setSuggestions(generatedSuggestions);

      // Calculate metrics
      const calculatedMetrics = calculateMetrics(messages);
      setMetrics(calculatedMetrics);

      setIsAnalyzing(false);
    }, 1000);
  };

  const extractKeywords = (msgs: Message[]): Keyword[] => {
    // Simulate keyword extraction
    const keywordMap: Record<string, Keyword> = {};
    const importantWords = [
      "pricing",
      "demo",
      "features",
      "integration",
      "security",
      "compliance",
      "budget",
      "timeline",
      "decision",
      "compare",
      "competitor",
      "implementation",
      "support",
      "training",
      "contract",
      "discount",
      "trial",
      "pilot",
    ];

    msgs.forEach((msg) => {
      const words = msg.content.toLowerCase().split(/\s+/);
      words.forEach((word) => {
        if (importantWords.includes(word)) {
          if (keywordMap[word]) {
            keywordMap[word].count++;
          } else {
            keywordMap[word] = {
              word,
              count: 1,
              sentiment: msg.sentiment || "neutral",
              category: categorizeKeyword(word),
            };
          }
        }
      });
    });

    return Object.values(keywordMap).sort((a, b) => b.count - a.count);
  };

  const categorizeKeyword = (word: string): string => {
    const categories: Record<string, string[]> = {
      Commercial: ["pricing", "budget", "discount", "contract", "cost"],
      Product: ["features", "integration", "security", "compliance", "demo"],
      Decision: ["decision", "compare", "competitor", "timeline", "pilot"],
      Support: ["support", "training", "implementation", "documentation"],
    };

    for (const [category, words] of Object.entries(categories)) {
      if (words.includes(word)) return category;
    }
    return "General";
  };

  const generateSuggestions = (msgs: Message[]): SmartSuggestion[] => {
    const lastMessage = msgs[msgs.length - 1];
    if (!lastMessage || lastMessage.sender !== "lead") return [];

    const suggestions: SmartSuggestion[] = [];

    // Pricing inquiry response
    if (
      lastMessage.content.toLowerCase().includes("pricing") ||
      lastMessage.content.toLowerCase().includes("cost")
    ) {
      suggestions.push({
        id: "1",
        text: "I'd be happy to discuss our pricing options. We offer flexible plans starting at $X/month for small teams, with enterprise pricing available for larger organizations. Would you like me to prepare a custom quote based on your specific needs?",
        type: "response",
        confidence: 0.95,
        context: "Pricing inquiry",
      });
    }

    // Feature question
    if (
      lastMessage.content.toLowerCase().includes("feature") ||
      lastMessage.content.toLowerCase().includes("can it")
    ) {
      suggestions.push({
        id: "2",
        text: "Yes, our platform includes [specific feature]. I can show you exactly how it works in a quick 15-minute demo. Would tomorrow at 2 PM or 4 PM work better for you?",
        type: "response",
        confidence: 0.9,
        context: "Feature inquiry",
      });
    }

    // Objection about competitors
    if (
      lastMessage.content.toLowerCase().includes("competitor") ||
      lastMessage.content.toLowerCase().includes("compare")
    ) {
      suggestions.push({
        id: "3",
        text: "Great question! While [competitor] is a solid choice, our clients typically choose us because of [unique value prop]. We also offer [specific advantage]. Would you like to see a side-by-side comparison?",
        type: "objection_handler",
        confidence: 0.88,
        context: "Competitive comparison",
      });
    }

    // Timeline urgency
    if (
      lastMessage.content.toLowerCase().includes("when") ||
      lastMessage.content.toLowerCase().includes("timeline")
    ) {
      suggestions.push({
        id: "4",
        text: "We can have you up and running within 24-48 hours. Our onboarding team will provide white-glove support throughout the process. What's your ideal go-live date?",
        type: "response",
        confidence: 0.92,
        context: "Timeline inquiry",
      });
    }

    // Closing suggestion
    if (msgs.length > 5) {
      suggestions.push({
        id: "5",
        text: "Based on our conversation, it seems like [our solution] could really help with [their pain point]. What would need to happen on your end to move forward with a pilot?",
        type: "closing",
        confidence: 0.85,
        context: "Closing question",
      });
    }

    return suggestions;
  };

  const calculateMetrics = (msgs: Message[]): ConversationMetrics => {
    // Sentiment analysis
    const sentiments = msgs.map((m) => m.sentiment || "neutral");
    const sentimentCounts = {
      positive: sentiments.filter((s) => s === "positive").length,
      neutral: sentiments.filter((s) => s === "neutral").length,
      negative: sentiments.filter((s) => s === "negative").length,
    };

    // Determine trend
    const recentSentiments = sentiments.slice(-5);
    const recentPositive = recentSentiments.filter(
      (s) => s === "positive",
    ).length;
    const recentNegative = recentSentiments.filter(
      (s) => s === "negative",
    ).length;
    const trend =
      recentPositive > recentNegative
        ? "improving"
        : recentNegative > recentPositive
          ? "declining"
          : "stable";

    // Engagement metrics
    const leadMessages = msgs.filter((m) => m.sender === "lead");
    const avgMessageLength =
      leadMessages.reduce((sum, m) => sum + m.content.length, 0) /
      leadMessages.length;
    const questionCount = leadMessages.filter((m) =>
      m.content.includes("?"),
    ).length;

    // Intent detection
    const intents = detectIntent(msgs);

    // Buying signals
    const buyingSignals = detectBuyingSignals(msgs);

    return {
      sentiment: {
        ...sentimentCounts,
        trend,
      },
      engagement: {
        responseTime: 2.5, // minutes
        messageLength: avgMessageLength,
        questionCount,
        interactionScore: 85,
      },
      intent: intents,
      buyingSignals,
    };
  };

  const detectIntent = (msgs: Message[]) => {
    const content = msgs
      .map((m) => m.content)
      .join(" ")
      .toLowerCase();

    const intents = [
      {
        intent: "Purchase Evaluation",
        keywords: ["pricing", "cost", "budget", "buy", "purchase"],
        confidence: 0,
      },
      {
        intent: "Feature Inquiry",
        keywords: ["feature", "can it", "does it", "capability"],
        confidence: 0,
      },
      {
        intent: "Technical Assessment",
        keywords: ["integration", "api", "security", "technical"],
        confidence: 0,
      },
      {
        intent: "Comparison Shopping",
        keywords: ["compare", "competitor", "alternative", "vs"],
        confidence: 0,
      },
      {
        intent: "Implementation Planning",
        keywords: ["timeline", "implement", "deploy", "setup"],
        confidence: 0,
      },
    ];

    intents.forEach((intent) => {
      intent.confidence =
        intent.keywords.filter((kw) => content.includes(kw)).length /
        intent.keywords.length;
    });

    intents.sort((a, b) => b.confidence - a.confidence);

    return {
      primary: intents[0]?.intent || "Unknown",
      confidence: intents[0]?.confidence || 0,
      alternatives: intents
        .slice(1, 3)
        .map((i) => ({ intent: i.intent, confidence: i.confidence })),
    };
  };

  const detectBuyingSignals = (msgs: Message[]) => {
    const signals: string[] = [];
    let score = 0;

    const content = msgs
      .map((m) => m.content)
      .join(" ")
      .toLowerCase();

    if (content.includes("budget") || content.includes("pricing")) {
      signals.push("Budget discussion");
      score += 20;
    }

    if (content.includes("timeline") || content.includes("when")) {
      signals.push("Timeline urgency");
      score += 15;
    }

    if (content.includes("decision") || content.includes("decide")) {
      signals.push("Decision process inquiry");
      score += 25;
    }

    if (content.includes("demo") || content.includes("trial")) {
      signals.push("Demo/trial interest");
      score += 20;
    }

    if (content.includes("team") || content.includes("stakeholder")) {
      signals.push("Multiple stakeholders involved");
      score += 10;
    }

    return { score: Math.min(score, 100), signals };
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Heart className="h-4 w-4 text-green-500" />;
      case "negative":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50";
      case "negative":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  // Mock conversation data
  const mockMessages: Message[] =
    messages.length > 0
      ? messages
      : [
          {
            id: "1",
            content:
              "Hi, I'm interested in learning more about your platform. We're currently evaluating solutions for our sales team.",
            sender: "lead",
            timestamp: new Date(Date.now() - 600000).toISOString(),
            sentiment: "positive",
            keywords: ["interested", "platform", "evaluating", "solutions"],
          },
          {
            id: "2",
            content:
              "Great to hear from you! I'd be happy to help. Could you tell me a bit about your team size and current sales process?",
            sender: "agent",
            timestamp: new Date(Date.now() - 540000).toISOString(),
          },
          {
            id: "3",
            content:
              "We have about 50 sales reps across 3 offices. Our main challenge is lead response time and tracking conversations across multiple channels. What's your pricing like for a team our size?",
            sender: "lead",
            timestamp: new Date(Date.now() - 480000).toISOString(),
            sentiment: "neutral",
            keywords: ["sales reps", "challenge", "response time", "pricing"],
          },
          {
            id: "4",
            content:
              "For a team of 50, we'd recommend our Business plan. It includes multi-channel tracking, automated lead routing, and response time analytics. Pricing starts at $79/user/month with volume discounts available.",
            sender: "agent",
            timestamp: new Date(Date.now() - 420000).toISOString(),
          },
          {
            id: "5",
            content:
              "That's within our budget. How does your solution compare to Outreach or Salesloft? We're also looking at those options.",
            sender: "lead",
            timestamp: new Date(Date.now() - 360000).toISOString(),
            sentiment: "positive",
            keywords: ["budget", "compare", "Outreach", "Salesloft"],
          },
        ];

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <CardTitle>AI Conversation Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {isAnalyzing && (
                <Badge variant="outline" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  Analyzing...
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={analyzeConversation}
                disabled={isAnalyzing}
              >
                <RefreshCw
                  className={cn("h-4 w-4 mr-2", isAnalyzing && "animate-spin")}
                />
                Refresh Analysis
              </Button>
            </div>
          </div>
          <CardDescription>
            Real-time conversation analysis with smart suggestions and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">
                  Auto-suggest responses
                </Label>
                <Switch
                  checked={autoSuggest}
                  onCheckedChange={setAutoSuggest}
                />
              </div>

              {suggestions.length > 0 ? (
                <div className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <Card
                      key={suggestion.id}
                      className="cursor-pointer hover:bg-accent/50 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {suggestion.type.replace("_", " ")}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {suggestion.context}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {Math.round(suggestion.confidence * 100)}% match
                              </Badge>
                            </div>
                            <p className="text-sm">{suggestion.text}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                navigator.clipboard.writeText(suggestion.text);
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                onSuggestionSelect?.(suggestion.text)
                              }
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    Suggestions will appear here as the conversation progresses
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="keywords" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Track keywords</Label>
                <Switch
                  checked={keywordTracking}
                  onCheckedChange={setKeywordTracking}
                />
              </div>

              {keywords.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {keywords.slice(0, 10).map((keyword) => (
                      <Badge
                        key={keyword.word}
                        variant="secondary"
                        className={cn(
                          "gap-1",
                          getSentimentColor(keyword.sentiment),
                        )}
                      >
                        <Hash className="h-3 w-3" />
                        {keyword.word}
                        <span className="ml-1 text-xs opacity-70">
                          ×{keyword.count}
                        </span>
                      </Badge>
                    ))}
                  </div>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Keyword Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {["Commercial", "Product", "Decision", "Support"].map(
                          (category) => {
                            const categoryKeywords = keywords.filter(
                              (k) => k.category === category,
                            );
                            const percentage =
                              (categoryKeywords.length / keywords.length) * 100;

                            return (
                              <div key={category} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span>{category}</span>
                                  <span className="text-muted-foreground">
                                    {categoryKeywords.length} keywords
                                  </span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                              </div>
                            );
                          },
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Alert>
                  <Search className="h-4 w-4" />
                  <AlertDescription>
                    Keywords will be extracted from the conversation in
                    real-time
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="sentiment" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Track sentiment</Label>
                <Switch
                  checked={sentimentTracking}
                  onCheckedChange={setSentimentTracking}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Positive
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {metrics.sentiment.positive}
                        </p>
                      </div>
                      <Heart className="h-8 w-8 text-green-500 opacity-20" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Neutral</p>
                        <p className="text-2xl font-bold text-gray-600">
                          {metrics.sentiment.neutral}
                        </p>
                      </div>
                      <Info className="h-8 w-8 text-gray-500 opacity-20" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Negative
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          {metrics.sentiment.negative}
                        </p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-red-500 opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sentiment Trend</CardTitle>
                  <CardDescription>
                    Currently {metrics.sentiment.trend}
                    {metrics.sentiment.trend === "improving" && (
                      <TrendingUp className="h-4 w-4 inline ml-1 text-green-500" />
                    )}
                    {metrics.sentiment.trend === "declining" && (
                      <TrendingUp className="h-4 w-4 inline ml-1 text-red-500 rotate-180" />
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      data={[
                        {
                          time: "5m ago",
                          positive: 1,
                          neutral: 0,
                          negative: 0,
                        },
                        {
                          time: "4m ago",
                          positive: 1,
                          neutral: 1,
                          negative: 0,
                        },
                        {
                          time: "3m ago",
                          positive: 1,
                          neutral: 2,
                          negative: 0,
                        },
                        {
                          time: "2m ago",
                          positive: 2,
                          neutral: 2,
                          negative: 0,
                        },
                        {
                          time: "1m ago",
                          positive: 3,
                          neutral: 2,
                          negative: 0,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="positive"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="neutral"
                        stackId="1"
                        stroke="#6b7280"
                        fill="#6b7280"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="negative"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Lead Intent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {metrics.intent.primary}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(metrics.intent.confidence * 100)}%
                            confidence
                          </span>
                        </div>
                        <Progress
                          value={metrics.intent.confidence * 100}
                          className="h-2"
                        />
                      </div>
                      {metrics.intent.alternatives.map((alt, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-muted-foreground"
                        >
                          • {alt.intent} ({Math.round(alt.confidence * 100)}%)
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Buying Signals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            Signal Strength
                          </span>
                          <span className="text-sm font-bold">
                            {metrics.buyingSignals.score}%
                          </span>
                        </div>
                        <Progress
                          value={metrics.buyingSignals.score}
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-1">
                        {metrics.buyingSignals.signals.map((signal, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{signal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Engagement Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Response Time
                        </p>
                        <p className="text-lg font-semibold">
                          {metrics.engagement.responseTime}m
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Questions Asked
                        </p>
                        <p className="text-lg font-semibold">
                          {metrics.engagement.questionCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Avg Message Length
                        </p>
                        <p className="text-lg font-semibold">
                          {Math.round(metrics.engagement.messageLength)} chars
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Interaction Score
                        </p>
                        <p className="text-lg font-semibold">
                          {metrics.engagement.interactionScore}/100
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    <strong>AI Recommendation:</strong> This lead shows strong
                    buying signals and positive sentiment. Consider proposing a
                    demo or trial to move the conversation forward.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
