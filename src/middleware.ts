import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/dev-login', // Development bypass route
  '/pricing',
  '/features',
  '/about',
  '/contact',
  '/demo',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Create response
  const response = NextResponse.next();
  
  // Add CSP headers to allow blob URLs for audio
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https:; " +
    "media-src 'self' blob: data:; " +
    "connect-src 'self' ws://localhost:3002 wss://api.elevenlabs.io https://api.elevenlabs.io; " +
    "font-src 'self' data:; " +
    "frame-src 'self';"
  );

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return response;
  }

  // In development, allow dev token
  if (process.env.NODE_ENV === 'development') {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.includes('dev-token')) {
      return response;
    }
  }

  // Allow all other requests to pass through for now
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
