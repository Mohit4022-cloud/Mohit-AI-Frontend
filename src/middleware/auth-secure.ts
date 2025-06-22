import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ensure environment variables are set
const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? undefined
    : "dev-jwt-secret-min-32-characters-long");
if (
  typeof window === "undefined" &&
  process.env.NODE_ENV === "production" &&
  (!JWT_SECRET || JWT_SECRET.length < 32)
) {
  console.warn(
    "WARNING: JWT_SECRET must be set and at least 32 characters long in production",
  );
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  organizationId?: string;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401,
    public code: string = "UNAUTHORIZED",
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Extract and verify JWT token from request
 */
export async function verifyToken(token: string): Promise<AuthUser> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as any;

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        organizationId: true,
      },
    });

    if (!user) {
      throw new AuthError("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId || undefined,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError("Token expired", 401, "TOKEN_EXPIRED");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError("Invalid token", 401, "INVALID_TOKEN");
    }
    throw error;
  }
}

/**
 * Authenticate request and extract user
 */
export async function authenticateRequest(
  request: NextRequest,
): Promise<AuthUser> {
  // Check for token in Authorization header
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthError("No token provided", 401, "NO_TOKEN");
  }

  const token = authHeader.substring(7);
  return verifyToken(token);
}

/**
 * Check if user has required role
 */
export function requireRole(user: AuthUser, allowedRoles: string[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw new AuthError(
      `Insufficient permissions. Required role: ${allowedRoles.join(" or ")}`,
      403,
      "INSUFFICIENT_PERMISSIONS",
    );
  }
}

/**
 * Main authentication middleware
 */
export async function authMiddleware(
  request: NextRequest,
): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/refresh",
    "/api/auth/forgot-password",
    "/api/health",
    "/api/status",
  ];

  // Skip auth for public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    // Authenticate the request
    const user = await authenticateRequest(request);

    // Add user context to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-email", user.email);
    requestHeaders.set("x-user-role", user.role);
    if (user.organizationId) {
      requestHeaders.set("x-user-org", user.organizationId);
    }

    // Check role-based access
    if (pathname.startsWith("/api/admin")) {
      requireRole(user, ["ADMIN", "SUPER_ADMIN"]);
    }

    if (pathname.startsWith("/api/manager")) {
      requireRole(user, ["MANAGER", "ADMIN", "SUPER_ADMIN"]);
    }

    // TODO: Add audit logging when AuditLog model is added to Prisma schema
    // await prisma.auditLog.create({
    //   data: {
    //     userId: user.id,
    //     action: 'api_access',
    //     resource: pathname,
    //     ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    //     userAgent: request.headers.get('user-agent') || 'unknown'
    //   }
    // });

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // TODO: Add audit logging when AuditLog model is added to Prisma schema
    // await prisma.auditLog.create({
    //   data: {
    //     action: 'auth_failed',
    //     resource: pathname,
    //     ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    //     userAgent: request.headers.get('user-agent') || 'unknown',
    //     metadata: {
    //       error: error instanceof Error ? error.message : 'Unknown error'
    //     }
    //   }
    // });

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Helper to get user from authenticated request
 */
export function getUserFromRequest(request: NextRequest): AuthUser {
  return {
    id: request.headers.get("x-user-id") || "",
    email: request.headers.get("x-user-email") || "",
    role: request.headers.get("x-user-role") || "",
    organizationId: request.headers.get("x-user-org") || undefined,
  };
}
