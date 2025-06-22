"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Zap,
  Settings,
  Brain,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DisclosureLevel = "overview" | "basic" | "detailed" | "advanced";

interface ProgressiveSettingsProps {
  onLevelChange?: (level: DisclosureLevel) => void;
}

const LEVELS: {
  id: DisclosureLevel;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
  locked?: boolean;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: "Essential controls only",
    icon: Eye,
    color: "text-ai-blue",
    features: ["Start/End calls", "View active calls", "Basic metrics"],
  },
  {
    id: "basic",
    name: "Basic",
    description: "Common features",
    icon: Zap,
    color: "text-ai-green",
    features: [
      "Human takeover",
      "Call transcripts",
      "Queue management",
      "Basic AI controls",
    ],
  },
  {
    id: "detailed",
    name: "Detailed",
    description: "Advanced controls",
    icon: Settings,
    color: "text-ai-amber",
    features: [
      "AI behavior adjustment",
      "Coach mode",
      "Live insights",
      "Custom scripts",
      "Analytics",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Full system access",
    icon: Brain,
    color: "text-ai-red",
    features: [
      "API configuration",
      "Voice cloning",
      "Custom AI models",
      "Webhook management",
      "Debug mode",
    ],
    locked: true,
  },
];

export function ProgressiveSettings({
  onLevelChange,
}: ProgressiveSettingsProps) {
  const [currentLevel, setCurrentLevel] = useState<DisclosureLevel>("basic");
  const [expandedView, setExpandedView] = useState(false);

  const currentLevelIndex = LEVELS.findIndex((l) => l.id === currentLevel);
  const progress = ((currentLevelIndex + 1) / LEVELS.length) * 100;

  const handleLevelChange = (level: DisclosureLevel) => {
    const targetLevel = LEVELS.find((l) => l.id === level);
    if (targetLevel?.locked) {
      // Show unlock prompt
      console.log("Feature locked - require admin access");
      return;
    }

    setCurrentLevel(level);
    onLevelChange?.(level);
  };

  const getVisibleFeatures = () => {
    const levelIndex = LEVELS.findIndex((l) => l.id === currentLevel);
    return LEVELS.slice(0, levelIndex + 1).flatMap((l) => l.features);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              Progressive Disclosure
              <Badge variant="outline" className="text-xs">
                {currentLevel}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Control UI complexity based on your expertise
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedView(!expandedView)}
          >
            {expandedView ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Progress value={progress} className="mt-3" />
      </CardHeader>

      <CardContent>
        {!expandedView ? (
          // Compact View
          <div className="flex items-center gap-2">
            {LEVELS.map((level, index) => {
              const isActive = level.id === currentLevel;
              const isPast = index < currentLevelIndex;
              const Icon = level.icon;

              return (
                <Button
                  key={level.id}
                  variant={
                    isActive ? "default" : isPast ? "secondary" : "ghost"
                  }
                  size="sm"
                  className={cn(
                    "flex-1 relative",
                    level.locked && "opacity-50",
                  )}
                  onClick={() => handleLevelChange(level.id)}
                  disabled={level.locked}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {level.name}
                  {level.locked && (
                    <Lock className="h-3 w-3 absolute top-1 right-1" />
                  )}
                </Button>
              );
            })}
          </div>
        ) : (
          // Expanded View
          <div className="space-y-3">
            {LEVELS.map((level, index) => {
              const isActive = level.id === currentLevel;
              const isPast = index < currentLevelIndex;
              const isFuture = index > currentLevelIndex;
              const Icon = level.icon;

              return (
                <div
                  key={level.id}
                  className={cn(
                    "p-3 rounded-lg border transition-all cursor-pointer",
                    isActive && "border-primary bg-primary/5",
                    isPast && "border-muted bg-muted/30",
                    isFuture && "opacity-60",
                    level.locked && "opacity-50 cursor-not-allowed",
                  )}
                  onClick={() => !level.locked && handleLevelChange(level.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg bg-white", level.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{level.name}</h4>
                        {isActive && (
                          <Badge variant="default" className="text-xs">
                            Current
                          </Badge>
                        )}
                        {level.locked && <Lock className="h-3 w-3" />}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {level.description}
                      </p>
                      <div className="mt-2 space-y-1">
                        {level.features.map((feature, i) => (
                          <div
                            key={i}
                            className="text-xs flex items-center gap-2"
                          >
                            <ChevronRight className="h-3 w-3" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Rocket className="h-4 w-4 text-purple-600" />
            <span className="font-medium">
              {getVisibleFeatures().length} features enabled
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Upgrade to unlock more advanced capabilities
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
