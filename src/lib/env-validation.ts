import { z } from "zod";

// Environment variable schema
const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Application
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_WS_URL: z.string().default("ws://localhost:3000"),

  // Database (Required)
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().optional(),

  // Authentication (Required)
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("1h"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  // Session
  SESSION_SECRET: z.string().min(32).optional(),

  // Twilio (Optional)
  TWILIO_ACCOUNT_SID: z.string().startsWith("AC").optional(),
  TWILIO_AUTH_TOKEN: z.string().min(1).optional(),
  TWILIO_PHONE_NUMBER: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/)
    .optional(),
  TWILIO_API_KEY: z.string().optional(),
  TWILIO_API_SECRET: z.string().optional(),

  // OpenAI (Optional)
  OPENAI_API_KEY: z.string().startsWith("sk-").optional(),

  // Google AI (Optional)
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),

  // ElevenLabs (Optional)
  ELEVENLABS_API_KEY: z.string().optional(),
  ELEVENLABS_VOICE_ID: z.string().optional(),

  // Email (Optional)
  EMAIL_SERVER: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),

  // Security
  ALLOWED_ORIGINS: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default("60000"),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default("100"),

  // Monitoring (Optional)
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Analytics (Optional)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),

  // Feature flags
  ENABLE_VOICE_CALLS: z
    .string()
    .transform((v) => v === "true")
    .default("true"),
  ENABLE_SMS: z
    .string()
    .transform((v) => v === "true")
    .default("true"),
  ENABLE_EMAIL: z
    .string()
    .transform((v) => v === "true")
    .default("true"),
  ENABLE_AI_COACHING: z
    .string()
    .transform((v) => v === "true")
    .default("true"),
  ENABLE_DEBUG_ENDPOINTS: z
    .string()
    .transform((v) => v === "true")
    .default("false"),
});

// Export the schema type
export type Env = z.infer<typeof envSchema>;

// Cached environment variables
let cachedEnv: Env | null = null;

/**
 * Validate and parse environment variables
 */
export function validateEnv(): Env {
  // Return cached env if already validated
  if (cachedEnv) return cachedEnv;

  try {
    // Parse and validate
    cachedEnv = envSchema.parse(process.env);
    return cachedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:");
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join(".")}: ${err.message}`);
      });

      throw new Error(
        "Environment validation failed. Please check your .env file and ensure all required variables are set correctly.",
      );
    }
    throw error;
  }
}

/**
 * Get validated environment variables
 */
export function getEnv(): Env {
  if (!cachedEnv) {
    validateEnv();
  }
  return cachedEnv!;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getEnv().NODE_ENV === "production";
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getEnv().NODE_ENV === "development";
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return getEnv().NODE_ENV === "test";
}

/**
 * Get feature flags
 */
export function getFeatureFlags() {
  const env = getEnv();
  return {
    voiceCalls: env.ENABLE_VOICE_CALLS,
    sms: env.ENABLE_SMS,
    email: env.ENABLE_EMAIL,
    aiCoaching: env.ENABLE_AI_COACHING,
    debugEndpoints: env.ENABLE_DEBUG_ENDPOINTS && !isProduction(),
  };
}

// Validate environment on module load
if (typeof window === "undefined") {
  validateEnv();
}
