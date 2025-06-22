"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Target, Activity } from "lucide-react";

const coachingTips = [
  {
    icon: TrendingUp,
    title: "Build Rapport",
    tip: "Start with a warm greeting and find common ground",
    color: "text-green-500",
  },
  {
    icon: Users,
    title: "Active Listening",
    tip: "Let the prospect speak 70% of the time",
    color: "text-blue-500",
  },
  {
    icon: Target,
    title: "Ask Open Questions",
    tip: 'Use "What" and "How" to uncover pain points',
    color: "text-purple-500",
  },
  {
    icon: Activity,
    title: "Handle Objections",
    tip: "Acknowledge, empathize, then provide value",
    color: "text-orange-500",
  },
];

export function CoachingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {coachingTips.map((tip, index) => {
        const Icon = tip.icon;
        return (
          <Card key={index} className="p-4">
            <div className="flex items-start space-x-3">
              <Icon className={`h-5 w-5 ${tip.color} mt-0.5`} />
              <div>
                <h4 className="font-medium">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{tip.tip}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
