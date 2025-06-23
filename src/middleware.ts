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

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // In development, allow dev token
  if (process.env.NODE_ENV === 'development') {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.includes('dev-token')) {
      return NextResponse.next();
    }
  }

  // Allow all other requests to pass through for now
  return NextResponse.next();
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
