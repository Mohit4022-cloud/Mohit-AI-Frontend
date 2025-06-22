export interface CoachingCard {
  id: string;
  type: 'suggestion' | 'warning' | 'insight';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionItems?: string[];
}

export interface CallEvent {
  id: string;
  type: string;
  timestamp: string;
  data: any;
}

export interface AICallAnalytics {
  sentiment: {
    score: number;
    label: 'positive' | 'neutral' | 'negative';
  };
  talkRatio: {
    ai: number;
    lead: number;
  };
  keyMoments: Array<{
    timestamp: string;
    type: string;
    description: string;
  }>;
  suggestions: Array<{
    id: string;
    text: string;
    confidence: number;
    applied: boolean;
  }>;
}