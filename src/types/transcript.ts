export interface TranscriptSegment {
  id: string;
  speaker: 'AI' | 'LEAD' | 'HUMAN';
  text: string;
  timestamp: string;
  confidence?: number;
}

export interface Transcript {
  id: string;
  callId: string;
  segments: TranscriptSegment[];
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  keyTopics: string[];
  actionItems: string[];
  summary: string;
}