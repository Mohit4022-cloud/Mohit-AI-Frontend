import { z } from 'zod';

// Contact status enum
export const ContactStatus = z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']);

// Contact Schema
export const ContactSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  company: z.string().optional(),
  title: z.string().optional(),
  status: ContactStatus.default('new'),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  lastContactedAt: z.string().optional(), // ISO string
  createdAt: z.string(), // ISO string
  updatedAt: z.string(), // ISO string
});

// Create Contact Schema (for new contacts)
export const CreateContactSchema = ContactSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update Contact Schema (for updating existing contacts)
export const UpdateContactSchema = ContactSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types inferred from schemas
export type Contact = z.infer<typeof ContactSchema>;
export type ContactStatus = z.infer<typeof ContactStatus>;
export type CreateContact = z.infer<typeof CreateContactSchema>;
export type UpdateContact = z.infer<typeof UpdateContactSchema>;