// Mock user data for authentication
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@harperai.com',
    name: 'Demo User',
    role: 'admin',
    organizationId: 'org-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'admin@harperai.com',
    name: 'Admin User',
    role: 'admin',
    organizationId: 'org-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    email: 'user@harperai.com',
    name: 'Standard User',
    role: 'user',
    organizationId: 'org-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Get user by email
export function getUserByEmail(email: string): User | null {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

// Get user by ID
export function getUserById(id: string): User | null {
  return mockUsers.find(user => user.id === id) || null;
}

// Update user
export function updateUser(id: string, updates: Partial<User>): User | null {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
    updatedAt: new Date(),
  };
  
  return mockUsers[userIndex];
}

// Mock contacts data
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  leadScore: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Global contacts database (for mock API)
if (!global.contactsDb) {
  global.contactsDb = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      company: 'Acme Corp',
      title: 'CEO',
      leadScore: 85,
      status: 'qualified',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@techcorp.com',
      phone: '+1234567891',
      company: 'TechCorp',
      title: 'CTO',
      leadScore: 92,
      status: 'engaged',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16'),
    },
  ];
}

// Mock settings data
export interface Settings {
  organizationId: string;
  emailSettings: {
    provider: string;
    apiKey: string;
    fromEmail: string;
    fromName: string;
  };
  twilioSettings: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };
  elevenlabsSettings: {
    apiKey: string;
    voiceId: string;
  };
  securitySettings: {
    twoFactorEnabled: boolean;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
    sessionTimeout: number;
  };
}

// Global settings database
if (!global.settingsDb) {
  global.settingsDb = {
    'org-1': {
      organizationId: 'org-1',
      emailSettings: {
        provider: 'sendgrid',
        apiKey: 'mock-sendgrid-key',
        fromEmail: 'noreply@harperai.com',
        fromName: 'Harper AI',
      },
      twilioSettings: {
        accountSid: 'mock-twilio-sid',
        authToken: 'mock-twilio-token',
        phoneNumber: '+1234567890',
      },
      elevenlabsSettings: {
        apiKey: 'mock-elevenlabs-key',
        voiceId: 'mock-voice-id',
      },
      securitySettings: {
        twoFactorEnabled: false,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        },
        sessionTimeout: 3600000, // 1 hour
      },
    },
  };
}

// TypeScript global declarations
declare global {
  var contactsDb: Contact[];
  var settingsDb: Record<string, Settings>;
}