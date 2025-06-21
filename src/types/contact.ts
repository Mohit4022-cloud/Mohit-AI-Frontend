export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  leadStatus?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  tags?: string[];
  lastContactedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}