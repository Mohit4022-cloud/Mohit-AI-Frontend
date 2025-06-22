import { z } from 'zod';

// User Settings Schema
export const UserSettingsSchema = z.object({
  general: z.object({
    companyName: z.string(),
    timezone: z.string(),
    dateFormat: z.string(),
  }),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
  integrations: z.object({
    twilio: z.object({
      enabled: z.boolean(),
      accountSid: z.string(),
      authToken: z.string(),
    }).optional(),
    salesforce: z.object({
      enabled: z.boolean(),
      instanceUrl: z.string(),
    }).optional(),
  }),
});

// Default user settings
export const defaultUserSettings = {
  general: {
    companyName: '',
    timezone: 'UTC',
    dateFormat: 'MM/dd/yyyy',
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
  integrations: {},
};

export interface Settings {
  general: {
    companyName: string;
    timezone: string;
    dateFormat: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  integrations: {
    twilio?: {
      enabled: boolean;
      accountSid: string;
      authToken: string;
    };
    salesforce?: {
      enabled: boolean;
      instanceUrl: string;
    };
  };
}

export type UserSettings = z.infer<typeof UserSettingsSchema>;