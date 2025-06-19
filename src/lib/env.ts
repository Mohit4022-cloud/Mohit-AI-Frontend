import { z } from 'zod';

// Define the schema for your environment variables
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Application URLs
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_WS_URL: z.string().default('ws://localhost:3000'),
  
  // Database
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().optional(),
  
  // Authentication & Security
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  ENCRYPTION_KEY: z.string().length(32),
  
  // Session
  SESSION_SECRET: z.string().min(32).optional(),
  SESSION_NAME: z.string().default('mohit_ai_session'),
  SESSION_MAX_AGE: z.string().transform(Number).default('86400000'),
  
  // External Services
  OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
  ELEVENLABS_API_KEY: z.string().optional(),
  ELEVENLABS_VOICE_ID: z.string().optional(),
  
  // Twilio
  TWILIO_ACCOUNT_SID: z.string().startsWith('AC').optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  TWILIO_API_KEY: z.string().optional(),
  TWILIO_API_SECRET: z.string().optional(),
  TWILIO_SYNC_SERVICE_SID: z.string().optional(),
  
  // Email
  EMAIL_SERVER: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  
  // Error Tracking
  SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  
  // Feature Flags
  ENABLE_VOICE_CALLS: z.string().transform(val => val === 'true').default('true'),
  ENABLE_SMS: z.string().transform(val => val === 'true').default('true'),
  ENABLE_EMAIL: z.string().transform(val => val === 'true').default('true'),
  ENABLE_AI_COACHING: z.string().transform(val => val === 'true').default('true'),
  
  // Development
  ANALYZE: z.string().transform(val => val === 'true').default('false'),
  NEXT_TELEMETRY_DISABLED: z.string().default('1'),
});

// Validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
      throw new Error(
        `❌ Invalid environment variables: ${missingVars}\n` +
        `Please check your .env file against .env.example`
      );
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Type-safe environment variable access
export type Env = z.infer<typeof envSchema>;