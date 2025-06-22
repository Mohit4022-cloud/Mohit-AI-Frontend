// Centralized configuration to avoid hardcoded values
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    wsUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000",
    timeout: 30000,
    retries: 3,
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Mohit AI",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    description: "AI-powered inbound SDR platform",
    keywords: "SDR, AI, sales, lead management, automation",
  },
  features: {
    enablePWA: process.env.NEXT_PUBLIC_ENABLE_PWA === "true",
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  },
  auth: {
    tokenKey: "mohit-ai-token",
    refreshKey: "mohit-ai-refresh",
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;

// Type-safe environment check
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

// API URL builder
export const getApiUrl = (path: string) => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// WebSocket URL builder
export const getWsUrl = (path?: string) => {
  const baseUrl = config.api.wsUrl.replace(/\/$/, "");
  if (!path) return baseUrl;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
