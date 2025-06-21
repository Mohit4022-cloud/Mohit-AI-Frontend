export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: 'call' | 'meeting' | 'task' | 'reminder';
  attendees?: string[];
  location?: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
  color?: string;
}