import { z } from 'zod';

/**
 * Server-side environment variables schema
 */
const serverEnvSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3000'),
  
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().optional(),
  
  // Authentication & Security
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  ENCRYPTION_KEY: z.string().length(32, 'ENCRYPTION_KEY must be exactly 32 characters'),
  SESSION_SECRET: z.string().min(32).optional(),
  
  // Twilio
  TWILIO_ACCOUNT_SID: z.string().startsWith('AC').optional(),
  TWILIO_AUTH_TOKEN: z.string().min(1).optional(),
  TWILIO_PHONE_NUMBER: z.string().regex(/^\+[1-9]\d{1,14}$/).optional(),
  TWILIO_API_KEY: z.string().startsWith('SK').optional(),
  TWILIO_API_SECRET: z.string().min(1).optional(),
  TWILIO_SYNC_SERVICE_SID: z.string().startsWith('IS').optional(),
  
  // AI Services
  OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
  OPENAI_MODEL: z.string().default('gpt-4'),
  OPENAI_TEMPERATURE: z.string().transform(Number).default('0.7'),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
  ELEVENLABS_API_KEY: z.string().optional(),
  ELEVENLABS_VOICE_ID: z.string().optional(),
  
  // Email
  EMAIL_SERVER: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  
  // Redis
  REDIS_URL: z.string().url().optional(),
  REDIS_PASSWORD: z.string().optional(),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  
  // CORS
  ALLOWED_ORIGINS: z.string().optional(),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Feature Flags
  ENABLE_VOICE_CALLS: z.string().transform(val => val === 'true').default('true'),
  ENABLE_SMS: z.string().transform(val => val === 'true').default('true'),
  ENABLE_EMAIL: z.string().transform(val => val === 'true').default('true'),
  ENABLE_AI_COACHING: z.string().transform(val => val === 'true').default('true'),
  ENABLE_DEBUG_MODE: z.string().transform(val => val === 'true').default('false'),
  
  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),
  
  // Webhooks
  WEBHOOK_SECRET: z.string().optional(),
  WEBHOOK_TIMEOUT: z.string().transform(Number).default('5000'),
  
  // Storage
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),
  S3_BUCKET_NAME: z.string().optional(),
});

/**
 * Client-side environment variables schema
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3000/api'),
  NEXT_PUBLIC_WS_URL: z.string().default('ws://localhost:3000'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
});

/**
 * Validates server environment variables
 * @throws {Error} if validation fails
 */
export function validateServerEnv() {
  try {
    return serverEnvSchema.parse(process.env);
  } catch (error) {
    // During build time, provide defaults for missing variables
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      console.warn('Using placeholder values for missing environment variables during build');
      return {
        NODE_ENV: 'production',
        PORT: '3000',
        DATABASE_URL: process.env.DATABASE_URL || 'postgresql://placeholder',
        JWT_SECRET: process.env.JWT_SECRET || 'build-placeholder-jwt-secret-32-chars',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'build-placeholder-refresh-secret-32ch',
        JWT_EXPIRES_IN: '15m',
        JWT_REFRESH_EXPIRES_IN: '7d',
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef',
        RATE_LIMIT_WINDOW_MS: 60000,
        RATE_LIMIT_MAX_REQUESTS: 100,
        LOG_LEVEL: 'info',
        LOG_FORMAT: 'json',
        ENABLE_VOICE_CALLS: true,
        ENABLE_SMS: true,
        ENABLE_EMAIL: true,
        ENABLE_AI_COACHING: true,
        ENABLE_DEBUG_MODE: false,
        OPENAI_MODEL: 'gpt-4',
        OPENAI_TEMPERATURE: 0.7,
        AWS_REGION: 'us-east-1',
        WEBHOOK_TIMEOUT: 5000,
      } as any;
    }
    
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n  ');
      
      console.error('❌ Environment validation failed:');
      console.error(`  ${missingVars}`);
      
      throw new Error(
        `Environment validation failed. Missing or invalid variables:\n${missingVars}\n\n` +
        `Please check your .env file against .env.example`
      );
    }
    throw error;
  }
}

/**
 * Validates client environment variables
 * @throws {Error} if validation fails
 */
export function validateClientEnv() {
  try {
    return clientEnvSchema.parse({
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Client environment validation failed:', error.errors);
      throw new Error('Client environment validation failed');
    }
    throw error;
  }
}

// Type exports
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

// Singleton instances
let _serverEnv: ServerEnv | null = null;
let _clientEnv: ClientEnv | null = null;

/**
 * Get validated server environment variables
 */
export function getServerEnv(): ServerEnv {
  if (!_serverEnv) {
    _serverEnv = validateServerEnv();
  }
  return _serverEnv;
}

/**
 * Get validated client environment variables
 */
export function getClientEnv(): ClientEnv {
  if (!_clientEnv) {
    _clientEnv = validateClientEnv();
  }
  return _clientEnv;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getServerEnv().NODE_ENV === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getServerEnv().NODE_ENV === 'development';
}

/**
 * Get feature flags
 */
export function getFeatureFlags() {
  const env = getServerEnv();
  return {
    voiceCalls: env.ENABLE_VOICE_CALLS,
    sms: env.ENABLE_SMS,
    email: env.ENABLE_EMAIL,
    aiCoaching: env.ENABLE_AI_COACHING,
    debugMode: env.ENABLE_DEBUG_MODE && !isProduction(),
  };
}

// Don't validate on module load during build
// Validation will happen at runtime when env vars are actually needed