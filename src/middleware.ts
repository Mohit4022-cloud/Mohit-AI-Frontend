import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from '@/middleware/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Apply authentication middleware to API routes
  if (pathname.startsWith('/api/')) {
    return authMiddleware(request);
  }
  
  // For non-API routes, check if user is authenticated for protected pages
  const protectedPaths = ['/dashboard', '/settings', '/admin'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (isProtectedPath) {
    const token = request.cookies.get('access_token')?.value;
    
    if (!token) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, manifest.json (public files)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|manifest.json|public).*)',
  ],
};