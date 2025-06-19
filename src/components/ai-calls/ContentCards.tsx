"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Shield, DollarSign, MapPin, Lightbulb, 
  AlertCircle, ChevronRight, X, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAICallStore } from "@/stores/aiCallStore";

interface ContentCard {
  id: string;
  type: "battlecard" | "pricing" | "objection" | "insight" | "local";
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  icon: React.ElementType;
  color: string;
  details?: string[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ContentCardsProps {
  callId: string;
  className?: string;
}

export function ContentCards({ callId, className }: ContentCardsProps) {
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [dismissedCards, setDismissedCards] = useState<Set<string>>(new Set());
  const { transcripts } = useAICallStore();

  useEffect(() => {
    // Simulate keyword detection from transcript
    const transcript = transcripts.get(callId) || [];
    const lastEntries = transcript.slice(-5);
    const keywords = lastEntries.map(e => e.text.toLowerCase()).join(" ");

    const newCards: ContentCard[] = [];

    // Competitive Battlecard (Outreach Kaia style)
    if (keywords.includes("competitor") || keywords.includes("alternative")) {
      newCards.push({
        id: "battlecard-1",
        type: "battlecard",
        title: "Competitor Mentioned",
        content: "Lead is considering SalesLoft",
        priority: "high",
        icon: Shield,
        color: "text-ai-red",
        details: [
          "We offer 30% better AI accuracy",
          "No per-seat pricing like SalesLoft",
          "24/7 support vs business hours only",
          "Native CRM integration"
        ],
        action: {
          label: "View Full Comparison",
          onClick: () => console.log("Show battlecard")
        }
      });
    }

    // Pricing Guideline Card
    if (keywords.includes("price") || keywords.includes("cost") || keywords.includes("expensive")) {
      newCards.push({
        id: "pricing-1",
        type: "pricing",
        title: "Pricing Discussion",
        content: "Negotiation flexibility available",
        priority: "high",
        icon: DollarSign,
        color: "text-ai-green",
        details: [
          "10% discount for annual commitment",
          "20% discount for 2+ years",
          "Volume pricing: 50+ seats",
          "Approved to offer payment terms"
        ],
        action: {
          label: "Calculate Custom Price",
          onClick: () => console.log("Open pricing calculator")
        }
      });
    }

    // Local Presence (Apollo style)
    if (keywords.includes("local") || keywords.includes("area") || keywords.includes("region")) {
      newCards.push({
        id: "local-1",
        type: "local",
        title: "Local Presence",
        content: "Calling from San Francisco area",
        priority: "medium",
        icon: MapPin,
        color: "text-ai-blue",
        details: [
          "415 area code matches lead location",
          "3 customers in 10 mile radius",
          "Local office: 123 Market St"
        ]
      });
    }

    // Objection Insight
    if (keywords.includes("budget") || keywords.includes("timing") || keywords.includes("think about")) {
      newCards.push({
        id: "objection-1",
        type: "objection",
        title: "Common Objection Detected",
        content: "Budget/Timing concern",
        priority: "medium",
        icon: AlertCircle,
        color: "text-ai-amber",
        details: [
          "80% success with ROI focus",
          "Offer pilot program option",
          "Share case study: Similar company saved $50k"
        ],
        action: {
          label: "Use Recommended Response",
          onClick: () => console.log("Insert response")
        }
      });
    }

    // AI Insight Card
    if (transcript.length > 10) {
      newCards.push({
        id: "insight-1",
        type: "insight",
        title: "AI Insight",
        content: "Lead showing high interest signals",
        priority: "low",
        icon: Lightbulb,
        color: "text-purple-600",
        details: [
          "Asked 3+ qualifying questions",
          "Positive sentiment trending up",
          "Mentioned timeline: Q2 2024"
        ]
      });
    }

    // Filter out dismissed cards
    setCards(newCards.filter(card => !dismissedCards.has(card.id)));
  }, [callId, transcripts, dismissedCards]);

  const dismissCard = (cardId: string) => {
    setDismissedCards(prev => new Set(prev).add(cardId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-ai-red bg-ai-red/5";
      case "medium":
        return "border-ai-amber bg-ai-amber/5";
      case "low":
        return "border-ai-blue bg-ai-blue/5";
      default:
        return "";
    }
  };

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-purple-600" />
        <h3 className="text-sm font-medium">Live Insights</h3>
        <Badge variant="secondary" className="text-xs">
          {cards.length} active
        </Badge>
      </div>

      <div className="space-y-2">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={cn(
              "relative overflow-hidden transition-all hover:shadow-md",
              getPriorityColor(card.priority)
            )}
          >
            <button
              onClick={() => dismissCard(card.id)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>

            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg bg-white/50",
                  card.color
                )}>
                  <card.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {card.content}
                  </p>
                </div>
              </div>
            </CardHeader>

            {card.details && (
              <CardContent className="pt-0 pb-3">
                <ul className="space-y-1">
                  {card.details.map((detail, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {card.action && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full mt-3 h-7 text-xs"
                    onClick={card.action.onClick}
                  >
                    {card.action.label}
                  </Button>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}