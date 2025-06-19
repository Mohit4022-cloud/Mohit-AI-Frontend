import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import crypto from 'crypto';

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

// Input sanitization
export function sanitizeHTML(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

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

// SQL injection prevention for raw queries (if needed)
export function escapeSQLString(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\b/g, '\\b')
    .replace(/\f/g, '\\f');
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

// CORS configuration
export function corsHeaders(allowedOrigins: string[] = []) {
  return async (request: NextRequest, next: () => Promise<NextResponse>) => {
    const origin = request.headers.get('origin') || '';
    const isAllowed = allowedOrigins.length === 0 || allowedOrigins.includes(origin);
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': isAllowed ? origin : '',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
    
    const response = await next();
    
    if (isAllowed) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    return response;
  };
}

// Input validation schemas
export const EmailSchema = z.string().email().max(255);
export const PasswordSchema = z.string().min(8).max(128).regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
);
export const UsernameSchema = z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/);
export const PhoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);
export const URLSchema = z.string().url().max(2048);

// Encryption utilities
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string): string {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Session security
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// IP address validation
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;
  
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.');
    return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
  }
  
  return ipv6Regex.test(ip);
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

export function getSecurityLogs(filters?: {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  action?: string;
  result?: 'success' | 'failure';
}): SecurityLog[] {
  let filtered = [...securityLogs];
  
  if (filters?.startDate) {
    filtered = filtered.filter(log => log.timestamp >= filters.startDate!);
  }
  if (filters?.endDate) {
    filtered = filtered.filter(log => log.timestamp <= filters.endDate!);
  }
  if (filters?.userId) {
    filtered = filtered.filter(log => log.userId === filters.userId);
  }
  if (filters?.action) {
    filtered = filtered.filter(log => log.action === filters.action);
  }
  if (filters?.result) {
    filtered = filtered.filter(log => log.result === filters.result);
  }
  
  return filtered;
}