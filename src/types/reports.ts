export interface ReportMetrics {
  totalCalls: number;
  successfulCalls: number;
  totalEmails: number;
  emailsOpened: number;
  emailsClicked: number;
  totalContacts: number;
  newContacts: number;
  conversions: number;
}

export interface PerformanceData {
  callSuccess: number;
  emailSuccess: number;
  responseTime: number;
  conversionRate: number;
}

export interface ActivityData {
  date: string;
  calls: number;
  emails: number;
  meetings: number;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: "improvement" | "achievement" | "warning";
  impact: "high" | "medium" | "low";
  suggestions?: string[];
}

export interface Report {
  id: string;
  name: string;
  type: "daily" | "weekly" | "monthly" | "custom";
  metrics: ReportMetrics;
  performance: PerformanceData;
  activities: ActivityData[];
  insights: AIInsight[];
  dateRange: {
    start: string;
    end: string;
  };
  createdAt: string;
  updatedAt: string;
}
