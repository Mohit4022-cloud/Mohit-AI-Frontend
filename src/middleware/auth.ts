import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, AuthError } from '@/lib/auth';
import { rateLimit, securityHeaders, logSecurityEvent } from '@/lib/security';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/health',
  '/api/status',
];

// Rate limit configurations for different route types
const RATE_LIMITS = {
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes
  api: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  sensitive: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 requests per minute
};

export async function authMiddleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;
  
  // Apply security headers to all responses
  const secHeaders = securityHeaders();
  
  // Skip authentication for public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    // Apply rate limiting to auth routes
    if (pathname.startsWith('/api/auth/')) {
      const rateLimited = await rateLimit(RATE_LIMITS.auth)(request, async () => {
        return NextResponse.next();
      });
      
      if (rateLimited.status === 429) {
        logSecurityEvent({
          ip: request.ip || 'unknown',
          method: request.method,
          path: pathname,
          userAgent: request.headers.get('user-agent') || 'unknown',
          action: 'rate_limit_exceeded',
          result: 'failure',
        });
        return rateLimited;
      }
    }
    
    return secHeaders(request, async () => NextResponse.next());
  }
  
  try {
    // Authenticate the request
    const user = await authenticateRequest(request);
    
    // Apply rate limiting based on route type
    const rateConfig = pathname.includes('/admin/') || pathname.includes('/settings/') 
      ? RATE_LIMITS.sensitive 
      : RATE_LIMITS.api;
      
    const rateLimited = await rateLimit(rateConfig)(request, async () => {
      // Add user context to request headers for downstream use
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', user.userId);
      requestHeaders.set('x-user-email', user.email);
      requestHeaders.set('x-user-role', user.role);
      if (user.organizationId) {
        requestHeaders.set('x-user-org', user.organizationId);
      }
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    });
    
    if (rateLimited.status === 429) {
      logSecurityEvent({
        ip: request.ip || 'unknown',
        method: request.method,
        path: pathname,
        userAgent: request.headers.get('user-agent') || 'unknown',
        userId: user.userId,
        action: 'rate_limit_exceeded',
        result: 'failure',
      });
      return rateLimited;
    }
    
    // Log successful authentication
    logSecurityEvent({
      ip: request.ip || 'unknown',
      method: request.method,
      path: pathname,
      userAgent: request.headers.get('user-agent') || 'unknown',
      userId: user.userId,
      action: 'api_access',
      result: 'success',
    });
    
    return secHeaders(request, async () => rateLimited);
    
  } catch (error) {
    // Log authentication failure
    logSecurityEvent({
      ip: request.ip || 'unknown',
      method: request.method,
      path: pathname,
      userAgent: request.headers.get('user-agent') || 'unknown',
      action: 'authentication_failed',
      result: 'failure',
      details: error instanceof AuthError ? error.code : 'unknown_error',
    });
    
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper to extract user from authenticated request
export function getUserFromRequest(request: NextRequest) {
  return {
    userId: request.headers.get('x-user-id') || '',
    email: request.headers.get('x-user-email') || '',
    role: request.headers.get('x-user-role') || '',
    organizationId: request.headers.get('x-user-org') || undefined,
  };
}

// WebSocket authentication helper
export async function authenticateWebSocket(token: string): Promise<any> {
  try {
    // This would be imported from your auth library
    // For now, we'll create a simple validation
    if (!token) {
      throw new AuthError('No token provided', 'NO_TOKEN', 401);
    }
    
    // In a real implementation, validate the JWT token
    // and return the user data
    return {
      userId: 'websocket-user',
      email: 'user@example.com',
      role: 'user',
    };
  } catch (error) {
    throw new AuthError('Invalid WebSocket token', 'INVALID_TOKEN', 401);
  }
}