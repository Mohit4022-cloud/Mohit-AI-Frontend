// Full authentication utilities for API routes (includes bcrypt)
// This file is NOT Edge-compatible and should only be used in API routes

import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';

import { env } from './env';

// Environment configuration
const JWT_SECRET = env.JWT_SECRET;
const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = env.JWT_REFRESH_EXPIRES_IN;

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

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Token generation utilities
export function generateAccessToken(payload: Omit<TokenPayload, 'exp' | 'iat'>): string {
  return jwt.sign(payload as any, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

export function generateRefreshToken(payload: Omit<TokenPayload, 'exp' | 'iat'>): string {
  return jwt.sign(payload as any, JWT_REFRESH_SECRET as string, { expiresIn: JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions);
}

// CSRF Protection
export function generateCSRFToken(): string {
  return jwt.sign({ csrf: true }, JWT_SECRET as string, { expiresIn: '1h' } as jwt.SignOptions);
}