import { NextRequest, NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

// Rate limit configuration
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
  keyGenerator?: (req: NextRequest) => string;
}

// Create different caches for different rate limit tiers
const caches = new Map<string, LRUCache<string, number[]>>();

function getCache(tier: string): LRUCache<string, number[]> {
  if (!caches.has(tier)) {
    caches.set(tier, new LRUCache<string, number[]>({
      max: 10000, // Max number of keys
      ttl: 900000, // 15 minutes
    }));
  }
  return caches.get(tier)!;
}

/**
 * Default key generator - uses IP address
 */
function defaultKeyGenerator(req: NextRequest): string {
  return req.ip || req.headers.get('x-forwarded-for') || 'unknown';
}

/**
 * Rate limiting middleware factory
 */
export function rateLimit(config: RateLimitConfig) {
  const {
    windowMs,
    maxRequests,
    message = 'Too many requests, please try again later',
    skipSuccessfulRequests = false,
    keyGenerator = defaultKeyGenerator
  } = config;

  return async (
    request: NextRequest,
    handler: () => Promise<NextResponse>
  ): Promise<NextResponse> => {
    const key = keyGenerator(request);
    const cache = getCache(`${windowMs}-${maxRequests}`);
    
    // Get current timestamp
    const now = Date.now();
    
    // Get previous requests for this key
    const requests = cache.get(key) || [];
    
    // Filter out requests outside the current window
    const recentRequests = requests.filter(
      timestamp => now - timestamp < windowMs
    );
    
    // Check if limit exceeded
    if (recentRequests.length >= maxRequests && recentRequests[0] !== undefined) {
      const retryAfter = Math.ceil(
        (recentRequests[0] + windowMs - now) / 1000
      );
      
      return NextResponse.json(
        { 
          error: message,
          retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(recentRequests[0] + windowMs).toISOString()
          }
        }
      );
    }
    
    // Process the request
    const response = await handler();
    
    // Only count the request if we're not skipping successful requests
    // or if the request was not successful
    if (!skipSuccessfulRequests || response.status >= 400) {
      recentRequests.push(now);
      cache.set(key, recentRequests);
    }
    
    // Add rate limit headers to response
    const remaining = Math.max(0, maxRequests - recentRequests.length);
    const reset = recentRequests.length > 0 && recentRequests[0] !== undefined
      ? new Date(recentRequests[0] + windowMs).toISOString()
      : new Date(now + windowMs).toISOString();
    
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', reset);
    
    return response;
  };
}

// Pre-configured rate limiters
export const rateLimiters = {
  // Strict rate limit for auth endpoints
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Too many authentication attempts, please try again later'
  }),
  
  // Standard API rate limit
  api: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    skipSuccessfulRequests: false
  }),
  
  // Lenient rate limit for read operations
  read: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200,
    skipSuccessfulRequests: true
  }),
  
  // Strict rate limit for write operations
  write: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    message: 'Too many write requests, please slow down'
  }),
  
  // Very strict rate limit for sensitive operations
  sensitive: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
    message: 'Too many sensitive operations, please try again later'
  })
};

/**
 * Apply rate limiting based on route
 */
export async function applyRateLimit(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  
  // Determine which rate limiter to use
  if (pathname.startsWith('/api/auth')) {
    return rateLimiters.auth(request, handler);
  }
  
  if (pathname.includes('/admin') || pathname.includes('/settings')) {
    return rateLimiters.sensitive(request, handler);
  }
  
  if (method === 'GET' || method === 'HEAD') {
    return rateLimiters.read(request, handler);
  }
  
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    return rateLimiters.write(request, handler);
  }
  
  // Default to standard API rate limit
  return rateLimiters.api(request, handler);
}