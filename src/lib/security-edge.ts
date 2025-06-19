// Edge-compatible security utilities (no Node.js crypto)
import { NextRequest, NextResponse } from 'next/server';

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitStore>();

// Rate limiting middleware
export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest, next: () => Promise<NextResponse>) => {
    const identifier = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const key = `${identifier}:${request.nextUrl.pathname}`;
    const now = Date.now();

    let store = rateLimitStore.get(key);

    if (!store || now > store.resetTime) {
      store = {
        count: 0,
        resetTime: now + config.windowMs,
      };
    }

    store.count++;
    rateLimitStore.set(key, store);

    if (store.count > config.maxRequests) {
      return NextResponse.json(
        { error: config.message || 'Too many requests' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(store.resetTime).toISOString(),
          }
        }
      );
    }

    const response = await next();
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', (config.maxRequests - store.count).toString());
    response.headers.set('X-RateLimit-Reset', new Date(store.resetTime).toISOString());

    return response;
  };
}

// Security headers middleware
export function securityHeaders() {
  return async (request: NextRequest, next: () => Promise<NextResponse>) => {
    const response = await next();
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Strict Transport Security (only for HTTPS)
    if (request.nextUrl.protocol === 'https:') {
      response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );
    }
    
    // Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.google-analytics.com wss://*.onrender.com https://*.twilio.com https://*.elevenlabs.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; ');
    
    response.headers.set('Content-Security-Policy', csp);
    
    return response;
  };
}

// Request logging for security auditing
export interface SecurityLog {
  timestamp: Date;
  ip: string;
  method: string;
  path: string;
  userAgent: string;
  userId?: string;
  action: string;
  result: 'success' | 'failure';
  details?: any;
}

const securityLogs: SecurityLog[] = [];

export function logSecurityEvent(log: Omit<SecurityLog, 'timestamp'>) {
  securityLogs.push({
    ...log,
    timestamp: new Date(),
  });
  
  // In production, send to logging service
  console.log('[SECURITY]', JSON.stringify(log));
}

// Generate secure token using Web Crypto API (Edge-compatible)
export async function generateSecureToken(length: number = 32): Promise<string> {
  const buffer = new Uint8Array(length);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// Input sanitization (Edge-compatible)
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove null bytes
    input = input.replace(/\0/g, '');
    // Trim whitespace
    input = input.trim();
    // Escape HTML entities
    input = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  } else if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  } else if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  return input;
}