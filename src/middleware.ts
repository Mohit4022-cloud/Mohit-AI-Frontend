import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middleware/auth';
import { applyRateLimit } from './middleware/rate-limit';
import { securityMiddleware } from './middleware/security-headers';

// Middleware configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt (static files)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|public).*)',
  ],
};

/**
 * Main middleware function that combines all middleware
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.txt')
  ) {
    return NextResponse.next();
  }
  
  try {
    // Apply security headers to all requests
    return await securityMiddleware(request, async () => {
      // Apply rate limiting
      return await applyRateLimit(request, async () => {
        // Apply authentication for API routes
        if (pathname.startsWith('/api')) {
          return await authMiddleware(request);
        }
        
        // For non-API routes, just continue
        return NextResponse.next();
      });
    });
  } catch (error) {
    console.error('Middleware error:', error);
    
    // Return a generic error response
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to create API response with proper headers
 */
export function createApiResponse(
  data: any,
  status: number = 200,
  headers?: HeadersInit
): NextResponse {
  const response = NextResponse.json(data, { status, headers });
  
  // Add API-specific headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  
  return response;
}

/**
 * Helper function for API error responses
 */
export function createApiError(
  message: string,
  status: number = 400,
  code?: string,
  details?: any
): NextResponse {
  return createApiResponse(
    {
      error: true,
      message,
      code,
      details,
      timestamp: new Date().toISOString()
    },
    status
  );
}