import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { getServerEnv } from './env.validation';

// Token payload schema
const tokenPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.string(),
  organizationId: z.string().optional(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;

// Extended payload with JWT claims
interface JWTPayload extends TokenPayload {
  iat?: number;
  exp?: number;
  iss?: string;
  sub?: string;
  aud?: string | string[];
}

/**
 * Generate access token
 */
export function generateAccessToken(payload: TokenPayload): string {
  const env = getServerEnv();
  
  const jwtPayload: JWTPayload = {
    ...payload,
    sub: payload.userId,
    iss: env.NEXT_PUBLIC_APP_URL || 'mohit-ai-sdr',
    aud: 'mohit-ai-sdr-api',
  };
  
  return jwt.sign(jwtPayload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(payload: TokenPayload): string {
  const env = getServerEnv();
  
  const jwtPayload: JWTPayload = {
    ...payload,
    sub: payload.userId,
    iss: env.NEXT_PUBLIC_APP_URL || 'mohit-ai-sdr',
    aud: 'mohit-ai-sdr-refresh',
  };
  
  return jwt.sign(jwtPayload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    algorithm: 'HS256',
  });
}

/**
 * Verify access token
 */
export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  const env = getServerEnv();
  
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: env.NEXT_PUBLIC_APP_URL || 'mohit-ai-sdr',
      audience: 'mohit-ai-sdr-api',
    }) as JWTPayload;
    
    // Validate payload structure
    const validated = tokenPayloadSchema.parse({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      organizationId: decoded.organizationId,
    });
    
    return validated;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw error;
  }
}

/**
 * Verify refresh token
 */
export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
  const env = getServerEnv();
  
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      algorithms: ['HS256'],
      issuer: env.NEXT_PUBLIC_APP_URL || 'mohit-ai-sdr',
      audience: 'mohit-ai-sdr-refresh',
    }) as JWTPayload;
    
    // Validate payload structure
    const validated = tokenPayloadSchema.parse({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      organizationId: decoded.organizationId,
    });
    
    return validated;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Refresh token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid refresh token');
    }
    throw error;
  }
}

/**
 * Decode token without verification (for client-side use)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded) return null;
    
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      organizationId: decoded.organizationId,
    };
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) return true;
    
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * Get token expiration time
 */
export function getTokenExpiration(token: string): Date | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) return null;
    
    return new Date(decoded.exp * 1000);
  } catch {
    return null;
  }
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  const env = getServerEnv();
  
  return jwt.sign(
    { csrf: true, timestamp: Date.now() },
    env.SESSION_SECRET || env.JWT_SECRET,
    { expiresIn: '1h', algorithm: 'HS256' }
  );
}

/**
 * Verify CSRF token
 */
export function verifyCSRFToken(token: string): boolean {
  const env = getServerEnv();
  
  try {
    jwt.verify(token, env.SESSION_SECRET || env.JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return true;
  } catch {
    return false;
  }
}