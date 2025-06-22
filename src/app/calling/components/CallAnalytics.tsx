"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function CallAnalytics() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Call Analytics</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Talk Ratio</span>
            <span>30%</span>
          </div>
          <Progress value={30} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Sentiment Score</span>
            <span>85%</span>
          </div>
          <Progress value={85} className="bg-green-100" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Engagement Level</span>
            <span>72%</span>
          </div>
          <Progress value={72} />
        </div>
      </div>
    </Card>
  );
}
