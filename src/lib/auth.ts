// Main auth module that re-exports from appropriate modules
// This helps with import organization

import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";
import { z } from "zod";

// Environment configuration with strict validation
const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? undefined
    : "dev-jwt-secret-min-32-characters-long");
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  (process.env.NODE_ENV === "production"
    ? undefined
    : "dev-jwt-refresh-secret-min-32-chars");
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

// Only throw error at runtime in production, not during build
if (
  typeof window === "undefined" &&
  process.env.NODE_ENV === "production" &&
  (!JWT_SECRET || !JWT_REFRESH_SECRET)
) {
  console.error(
    "WARNING: JWT secrets must be configured in production environment variables",
  );
}

// User token payload schema
export const TokenPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.string(),
  organizationId: z.string().optional(),
  exp: z.number().optional(),
  iat: z.number().optional(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

// Authentication error class
export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401,
    public code: string = "AUTH_ERROR",
  ) {
    super(message);
    this.name = "AuthError";
  }
}

// Password hashing utilities - these should only be used in API routes
// NOT in middleware or Edge Runtime contexts
export async function hashPassword(password: string): Promise<string> {
  // Only use in API routes, not in Edge Runtime
  if (process.env.NEXT_RUNTIME === "edge") {
    throw new Error("hashPassword cannot be used in Edge Runtime");
  }
  const bcrypt = await import("bcryptjs");
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  // Only use in API routes, not in Edge Runtime
  if (process.env.NEXT_RUNTIME === "edge") {
    throw new Error("verifyPassword cannot be used in Edge Runtime");
  }
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hash);
}

// Token generation utilities
export function generateAccessToken(
  payload: Omit<TokenPayload, "exp" | "iat">,
): string {
  return jwt.sign(
    payload as any,
    JWT_SECRET as string,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions,
  );
}

export function generateRefreshToken(
  payload: Omit<TokenPayload, "exp" | "iat">,
): string {
  return jwt.sign(
    payload as any,
    JWT_REFRESH_SECRET as string,
    { expiresIn: JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions,
  );
}

// Token verification
export function verifyAccessToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as any;
    return TokenPayloadSchema.parse(decoded);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError("Token expired", 401, "TOKEN_EXPIRED");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError("Invalid token", 401, "INVALID_TOKEN");
    }
    throw new AuthError(
      "Token verification failed",
      401,
      "TOKEN_VERIFICATION_FAILED",
    );
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET as string) as any;
    return TokenPayloadSchema.parse(decoded);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError(
        "Refresh token expired",
        401,
        "REFRESH_TOKEN_EXPIRED",
      );
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError(
        "Invalid refresh token",
        401,
        "INVALID_REFRESH_TOKEN",
      );
    }
    throw new AuthError(
      "Refresh token verification failed",
      401,
      "REFRESH_TOKEN_VERIFICATION_FAILED",
    );
  }
}

// Extract token from request
export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Also check cookies for token
  const cookieToken = request.cookies.get("access_token")?.value;
  return cookieToken || null;
}

// Authentication middleware
export async function authenticateRequest(
  request: NextRequest,
): Promise<TokenPayload> {
  const token = extractTokenFromRequest(request);

  if (!token) {
    throw new AuthError("No authentication token provided", 401, "NO_TOKEN");
  }

  return verifyAccessToken(token);
}

// Authorization helpers
export function requireRole(userRole: string, requiredRoles: string[]): void {
  if (!requiredRoles.includes(userRole)) {
    throw new AuthError("Insufficient permissions", 403, "FORBIDDEN");
  }
}

export function requireOrganization(
  userOrgId: string | undefined,
  requiredOrgId: string,
): void {
  if (userOrgId !== requiredOrgId) {
    throw new AuthError(
      "Access denied to this organization",
      403,
      "WRONG_ORGANIZATION",
    );
  }
}

// CSRF Protection
export function generateCSRFToken(): string {
  return jwt.sign(
    { csrf: true },
    JWT_SECRET as string,
    { expiresIn: "1h" } as jwt.SignOptions,
  );
}

export function verifyCSRFToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET as string);
    return true;
  } catch {
    return false;
  }
}

// Session management utilities
export interface Session {
  userId: string;
  email: string;
  role: string;
  organizationId?: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessions = new Map<string, Session>();

export function createSession(user: TokenPayload, sessionId: string): void {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour sessions

  sessions.set(sessionId, {
    userId: user.userId,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
    createdAt: new Date(),
    expiresAt,
  });
}

export function getSession(sessionId: string): Session | null {
  const session = sessions.get(sessionId);
  if (!session) return null;

  if (new Date() > session.expiresAt) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

// Clean up expired sessions periodically
setInterval(
  () => {
    const now = new Date();
    for (const [id, session] of sessions.entries()) {
      if (now > session.expiresAt) {
        sessions.delete(id);
      }
    }
  },
  60 * 60 * 1000,
); // Run every hour
