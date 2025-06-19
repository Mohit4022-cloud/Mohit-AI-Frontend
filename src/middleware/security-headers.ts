import { NextRequest, NextResponse } from 'next/server';

/**
 * Security headers configuration
 */
export const securityHeaders = {
  // Prevent XSS attacks
  'X-XSS-Protection': '1; mode=block',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy (formerly Feature Policy)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'accelerometer=()',
    'gyroscope=()'
  ].join(', '),
  
  // Strict Transport Security
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https: wss: ws:",
    "media-src 'self' https: blob:",
    "object-src 'none'",
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests"
  ].join('; ')
};

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  // Apply all security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Remove potentially sensitive headers
  response.headers.delete('X-Powered-By');
  response.headers.delete('Server');
  
  return response;
}

/**
 * CORS configuration
 */
export interface CorsOptions {
  origin: string | string[] | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

const defaultCorsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? (process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com'])
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Per-Page'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

/**
 * Apply CORS headers
 */
export function applyCorsHeaders(
  request: NextRequest, 
  response: NextResponse,
  options: CorsOptions = defaultCorsOptions
): NextResponse {
  const origin = request.headers.get('origin') || '';
  
  // Check if origin is allowed
  let isAllowed = false;
  if (typeof options.origin === 'string') {
    isAllowed = options.origin === origin || options.origin === '*';
  } else if (Array.isArray(options.origin)) {
    isAllowed = options.origin.includes(origin);
  } else if (typeof options.origin === 'function') {
    isAllowed = options.origin(origin);
  }
  
  if (isAllowed || options.origin === '*') {
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
  }
  
  if (options.credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  
  if (options.methods && options.methods.length > 0) {
    response.headers.set('Access-Control-Allow-Methods', options.methods.join(', '));
  }
  
  if (options.allowedHeaders && options.allowedHeaders.length > 0) {
    response.headers.set('Access-Control-Allow-Headers', options.allowedHeaders.join(', '));
  }
  
  if (options.exposedHeaders && options.exposedHeaders.length > 0) {
    response.headers.set('Access-Control-Expose-Headers', options.exposedHeaders.join(', '));
  }
  
  if (options.maxAge) {
    response.headers.set('Access-Control-Max-Age', options.maxAge.toString());
  }
  
  return response;
}

/**
 * Handle preflight requests
 */
export function handlePreflight(request: NextRequest): NextResponse | null {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    return applyCorsHeaders(request, response);
  }
  return null;
}

/**
 * Security middleware that combines all security features
 */
export async function securityMiddleware(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  // Handle preflight requests
  const preflightResponse = handlePreflight(request);
  if (preflightResponse) {
    return preflightResponse;
  }
  
  // Process the request
  const response = await handler();
  
  // Apply security headers
  applySecurityHeaders(response);
  
  // Apply CORS headers
  applyCorsHeaders(request, response);
  
  return response;
}