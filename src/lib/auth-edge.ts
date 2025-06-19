// Edge-compatible authentication utilities (no bcrypt)
import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { z } from 'zod';

// Environment configuration with strict validation
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT secrets must be configured in environment variables');
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
    public code: string = 'AUTH_ERROR'
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// Token verification (Edge-compatible)
export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return TokenPayloadSchema.parse(payload);
  } catch (error: any) {
    if (error?.code === 'ERR_JWT_EXPIRED') {
      throw new AuthError('Token expired', 401, 'TOKEN_EXPIRED');
    }
    if (error?.code === 'ERR_JWT_INVALID' || error?.code === 'ERR_JWS_INVALID') {
      throw new AuthError('Invalid token', 401, 'INVALID_TOKEN');
    }
    throw new AuthError('Token verification failed', 401, 'TOKEN_VERIFICATION_FAILED');
  }
}

// Extract token from request
export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check cookies for token
  const cookieToken = request.cookies.get('access_token')?.value;
  return cookieToken || null;
}

// Authentication middleware (Edge-compatible)
export async function authenticateRequest(request: NextRequest): Promise<TokenPayload> {
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    throw new AuthError('No authentication token provided', 401, 'NO_TOKEN');
  }
  
  return await verifyAccessToken(token);
}

// CSRF Protection (Edge-compatible)
export async function verifyCSRFToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}