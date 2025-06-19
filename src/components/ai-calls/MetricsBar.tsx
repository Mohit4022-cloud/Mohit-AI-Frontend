import { Card } from "@/components/ui/card";
import { CallMetrics } from "@/stores/aiCallStore";
import { Phone, TrendingUp, Brain, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsBarProps {
  metrics: CallMetrics;
}

export function MetricsBar({ metrics }: MetricsBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Active AI Calls"
        value={metrics.activeAICalls}
        icon={Phone}
        color="blue"
        pulse={metrics.activeAICalls > 0}
      />
      <MetricCard
        title="Calls Completed Today"
        value={metrics.completedToday}
        icon={TrendingUp}
        color="green"
      />
      <MetricCard
        title="Average AI Sentiment"
        value={`${metrics.avgSentimentScore}%`}
        icon={Brain}
        color="purple"
        indicator={getSentimentIndicator(metrics.avgSentimentScore)}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${metrics.conversionRate}%`}
        icon={Target}
        color="amber"
        trend={getTrend(metrics.conversionRate)}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: "blue" | "green" | "purple" | "amber";
  pulse?: boolean;
  indicator?: string;
  trend?: "up" | "down" | "neutral";
}

function MetricCard({
  title,
  value,
  icon: Icon,
  color,
  pulse,
  indicator,
  trend,
}: MetricCardProps) {
  const colorClasses = {
    blue: "text-ai-blue bg-ai-blue/10",
    green: "text-ai-green bg-ai-green/10",
    purple: "text-purple-600 bg-purple-50 dark:bg-purple-950",
    amber: "text-ai-amber bg-ai-amber/10",
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            {indicator && (
              <span className="text-sm font-medium text-muted-foreground">
                {indicator}
              </span>
            )}
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              {trend === "up" && (
                <span className="text-ai-green">↑ +5%</span>
              )}
              {trend === "down" && (
                <span className="text-ai-red">↓ -3%</span>
              )}
              {trend === "neutral" && (
                <span className="text-ai-gray">→ 0%</span>
              )}
              <span className="text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          colorClasses[color],
          pulse && "animate-pulse"
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function getSentimentIndicator(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Attention";
}

function getTrend(value: number): "up" | "down" | "neutral" {
  // In a real app, compare with historical data
  if (value > 60) return "up";
  if (value < 50) return "down";
  return "neutral";
}