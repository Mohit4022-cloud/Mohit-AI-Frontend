import { useEffect, useState } from "react";
import { useAICallStore, AIInsight } from "@/stores/aiCallStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, TrendingUp, Users, DollarSign, Zap, 
  AlertCircle, Target, Lightbulb, ChevronRight,
  Sparkles, MessageSquare, Building, ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightsProps {
  callId: string;
}

export function AIInsights({ callId }: AIInsightsProps) {
  const { insights } = useAICallStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const callInsights = insights.get(callId) || [];
  
  // Group insights by type
  const groupedInsights = callInsights.reduce((acc, insight) => {
    if (!acc[insight.type]) acc[insight.type] = [];
    acc[insight.type].push(insight);
    return acc;
  }, {} as Record<string, AIInsight[]>);

  // Mock real-time insights for demo
  useEffect(() => {
    // In production, these would come from WebSocket
    const mockInsights: AIInsight[] = [
      {
        id: "1",
        callId,
        type: "SENTIMENT",
        title: "Positive Engagement",
        content: "Lead showing strong interest in pricing discussion",
        confidence: 92,
        timestamp: new Date(),
      },
      {
        id: "2",
        callId,
        type: "COMPETITOR",
        title: "Competitor Mentioned",
        content: "Lead currently using Salesforce, open to alternatives",
        confidence: 88,
        timestamp: new Date(),
      },
      {
        id: "3",
        callId,
        type: "ACTION",
        title: "Next Best Action",
        content: "Offer product demo - lead expressed interest in seeing features",
        confidence: 95,
        timestamp: new Date(),
      },
    ];
    
    // Simulate adding insights over time
    mockInsights.forEach((insight, index) => {
      setTimeout(() => {
        useAICallStore.getState().addInsight(callId, insight);
      }, (index + 1) * 2000);
    });
  }, [callId]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Insights
          <Badge variant="secondary">{callInsights.length}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 px-3">
        <ScrollArea className="h-full pr-3">
          {/* Real-time Sentiment Gauge */}
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Call Sentiment</span>
              <span className="text-sm text-muted-foreground">Real-time</span>
            </div>
            <SentimentGauge value={85} />
          </div>

          {/* Key Topics */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Key Topics Detected</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Pricing</Badge>
              <Badge variant="outline">Integration</Badge>
              <Badge variant="outline">Timeline</Badge>
              <Badge variant="outline">Budget</Badge>
            </div>
          </div>

          {/* Insight Categories */}
          <div className="space-y-3">
            {Object.entries(groupedInsights).map(([type, insights]) => (
              <InsightCategory
                key={type}
                type={type}
                insights={insights}
                isExpanded={selectedCategory === type}
                onToggle={() => setSelectedCategory(
                  selectedCategory === type ? null : type
                )}
              />
            ))}
          </div>

          {/* Suggested Responses */}
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Suggested Talking Points</h4>
            <TalkingPoint
              icon={Target}
              text="Highlight ROI - Lead concerned about budget"
              confidence={90}
            />
            <TalkingPoint
              icon={Zap}
              text="Mention quick implementation - Timeline is important"
              confidence={85}
            />
            <TalkingPoint
              icon={Users}
              text="Share similar customer success story"
              confidence={88}
            />
          </div>

          {/* Content Cards */}
          <div className="mt-4 space-y-2">
            <ContentCard
              type="pricing"
              title="Pricing Guidelines"
              content="Standard: $99/user/month | Enterprise: Custom"
              icon={DollarSign}
            />
            <ContentCard
              type="competitor"
              title="vs. Salesforce"
              content="50% faster implementation, 30% lower TCO"
              icon={Building}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface SentimentGaugeProps {
  value: number;
}

function SentimentGauge({ value }: SentimentGaugeProps) {
  const getColor = () => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const getEmoji = () => {
    if (value >= 80) return "😊";
    if (value >= 60) return "😐";
    return "😟";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2">
          <span className="text-2xl">{getEmoji()}</span>
          <span className="font-medium">{value}%</span>
        </span>
        <span className="text-muted-foreground">
          {value >= 80 ? "Very Positive" : value >= 60 ? "Neutral" : "Needs Attention"}
        </span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}

interface InsightCategoryProps {
  type: string;
  insights: AIInsight[];
  isExpanded: boolean;
  onToggle: () => void;
}

function InsightCategory({ type, insights, isExpanded, onToggle }: InsightCategoryProps) {
  const getTypeConfig = () => {
    switch (type) {
      case "SENTIMENT":
        return { icon: TrendingUp, color: "text-green-600", label: "Sentiment" };
      case "TOPIC":
        return { icon: MessageSquare, color: "text-blue-600", label: "Topics" };
      case "COMPETITOR":
        return { icon: Building, color: "text-purple-600", label: "Competitors" };
      case "PRICING":
        return { icon: DollarSign, color: "text-amber-600", label: "Pricing" };
      case "ACTION":
        return { icon: Zap, color: "text-red-600", label: "Actions" };
      default:
        return { icon: Lightbulb, color: "text-gray-600", label: type };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", config.color)} />
          <span className="text-sm font-medium">{config.label}</span>
          <Badge variant="secondary" className="text-xs">
            {insights.length}
          </Badge>
        </div>
        <ChevronRight className={cn(
          "h-4 w-4 transition-transform",
          isExpanded && "rotate-90"
        )} />
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2">
          {insights.map((insight) => (
            <InsightItem key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
}

interface InsightItemProps {
  insight: AIInsight;
}

function InsightItem({ insight }: InsightItemProps) {
  return (
    <div className="p-2 bg-muted/30 rounded-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h5 className="text-sm font-medium">{insight.title}</h5>
          <p className="text-xs text-muted-foreground mt-0.5">
            {insight.content}
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {insight.confidence}%
        </Badge>
      </div>
    </div>
  );
}

interface TalkingPointProps {
  icon: React.ElementType;
  text: string;
  confidence: number;
}

function TalkingPoint({ icon: Icon, text, confidence }: TalkingPointProps) {
  return (
    <div className="flex items-start gap-2 p-2 bg-muted/30 rounded-md group hover:bg-muted/50 transition-colors cursor-pointer">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
      <div className="flex-1">
        <p className="text-sm">{text}</p>
      </div>
      <Badge variant="ghost" className="text-xs opacity-0 group-hover:opacity-100">
        {confidence}%
      </Badge>
    </div>
  );
}

interface ContentCardProps {
  type: string;
  title: string;
  content: string;
  icon: React.ElementType;
}

function ContentCard({ type, title, content, icon: Icon }: ContentCardProps) {
  return (
    <div className="p-3 border rounded-lg bg-card hover:shadow-sm transition-all cursor-pointer">
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          type === "pricing" ? "bg-amber-100 text-amber-600 dark:bg-amber-950" :
          type === "competitor" ? "bg-purple-100 text-purple-600 dark:bg-purple-950" :
          "bg-gray-100 text-gray-600 dark:bg-gray-800"
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h5 className="text-sm font-medium">{title}</h5>
          <p className="text-xs text-muted-foreground mt-0.5">{content}</p>
        </div>
        <Sparkles className="h-3 w-3 text-muted-foreground" />
      </div>
    </div>
  );
}