import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  extractTokenFromRequest,
  authenticateRequest,
  requireRole,
  requireOrganization,
  generateCSRFToken,
  verifyCSRFToken,
  createSession,
  getSession,
  deleteSession,
  AuthError,
  TokenPayload,
} from '@/lib/auth';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock environment variables
process.env.JWT_SECRET = 'test-jwt-secret-at-least-32-characters';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-at-least-32-chars';

describe('Authentication Library', () => {
  describe('Password Hashing', () => {
    it('should hash a password', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(50);
    });

    it('should verify a correct password', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(password, hash);
      
      expect(isValid).toBe(true);
    });

    it('should reject an incorrect password', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword('WrongPassword123!', hash);
      
      expect(isValid).toBe(false);
    });
  });

  describe('Token Generation', () => {
    const mockPayload: Omit<TokenPayload, 'exp' | 'iat'> = {
      userId: '123',
      email: 'test@example.com',
      role: 'user',
      organizationId: 'org-1',
    };

    it('should generate an access token', () => {
      const token = generateAccessToken(mockPayload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT format
    });

    it('should generate a refresh token', () => {
      const token = generateRefreshToken(mockPayload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT format
    });

    it('should generate different tokens for same payload', () => {
      const token1 = generateAccessToken(mockPayload);
      const token2 = generateAccessToken(mockPayload);
      
      expect(token1).not.toBe(token2);
    });
  });

  describe('Token Verification', () => {
    const mockPayload: Omit<TokenPayload, 'exp' | 'iat'> = {
      userId: '123',
      email: 'test@example.com',
      role: 'user',
      organizationId: 'org-1',
    };

    it('should verify a valid access token', () => {
      const token = generateAccessToken(mockPayload);
      const decoded = verifyAccessToken(token);
      
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
      expect(decoded.organizationId).toBe(mockPayload.organizationId);
    });

    it('should verify a valid refresh token', () => {
      const token = generateRefreshToken(mockPayload);
      const decoded = verifyRefreshToken(token);
      
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
    });

    it('should throw AuthError for invalid access token', () => {
      expect(() => verifyAccessToken('invalid-token')).toThrow(AuthError);
    });

    it('should throw AuthError for expired token', () => {
      const expiredToken = jwt.sign(
        { ...mockPayload, exp: Math.floor(Date.now() / 1000) - 3600 },
        process.env.JWT_SECRET!
      );
      
      expect(() => verifyAccessToken(expiredToken)).toThrow(AuthError);
      expect(() => verifyAccessToken(expiredToken)).toThrow('Token expired');
    });
  });

  describe('Request Authentication', () => {
    it('should extract token from Authorization header', () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'Authorization': 'Bearer test-token-123',
        },
      });
      
      const token = extractTokenFromRequest(request);
      expect(token).toBe('test-token-123');
    });

    it('should extract token from cookie', () => {
      const request = new NextRequest('http://localhost:3000/api/test');
      // Mock cookie
      Object.defineProperty(request.cookies, 'get', {
        value: jest.fn().mockReturnValue({ value: 'cookie-token-123' }),
      });
      
      const token = extractTokenFromRequest(request);
      expect(token).toBe('cookie-token-123');
    });

    it('should return null if no token found', () => {
      const request = new NextRequest('http://localhost:3000/api/test');
      
      const token = extractTokenFromRequest(request);
      expect(token).toBeNull();
    });

    it('should authenticate a valid request', async () => {
      const mockPayload: Omit<TokenPayload, 'exp' | 'iat'> = {
        userId: '123',
        email: 'test@example.com',
        role: 'user',
      };
      const token = generateAccessToken(mockPayload);
      
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const user = await authenticateRequest(request);
      expect(user.userId).toBe(mockPayload.userId);
      expect(user.email).toBe(mockPayload.email);
    });

    it('should throw AuthError for unauthenticated request', async () => {
      const request = new NextRequest('http://localhost:3000/api/test');
      
      await expect(authenticateRequest(request)).rejects.toThrow(AuthError);
      await expect(authenticateRequest(request)).rejects.toThrow('No authentication token provided');
    });
  });

  describe('Authorization Helpers', () => {
    it('should allow user with required role', () => {
      expect(() => requireRole('admin', ['admin', 'user'])).not.toThrow();
    });

    it('should deny user without required role', () => {
      expect(() => requireRole('user', ['admin'])).toThrow(AuthError);
      expect(() => requireRole('user', ['admin'])).toThrow('Insufficient permissions');
    });

    it('should allow user from required organization', () => {
      expect(() => requireOrganization('org-1', 'org-1')).not.toThrow();
    });

    it('should deny user from different organization', () => {
      expect(() => requireOrganization('org-2', 'org-1')).toThrow(AuthError);
      expect(() => requireOrganization('org-2', 'org-1')).toThrow('Access denied to this organization');
    });
  });

  describe('CSRF Protection', () => {
    it('should generate a CSRF token', () => {
      const token = generateCSRFToken();
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT format
    });

    it('should verify a valid CSRF token', () => {
      const token = generateCSRFToken();
      const isValid = verifyCSRFToken(token);
      
      expect(isValid).toBe(true);
    });

    it('should reject an invalid CSRF token', () => {
      const isValid = verifyCSRFToken('invalid-csrf-token');
      
      expect(isValid).toBe(false);
    });
  });

  describe('Session Management', () => {
    const mockUser: TokenPayload = {
      userId: '123',
      email: 'test@example.com',
      role: 'user',
      organizationId: 'org-1',
    };

    beforeEach(() => {
      // Clear all sessions before each test
      const sessionId = 'test-session-123';
      deleteSession(sessionId);
    });

    it('should create a session', () => {
      const sessionId = 'test-session-123';
      createSession(mockUser, sessionId);
      
      const session = getSession(sessionId);
      expect(session).toBeDefined();
      expect(session?.userId).toBe(mockUser.userId);
      expect(session?.email).toBe(mockUser.email);
    });

    it('should get an existing session', () => {
      const sessionId = 'test-session-123';
      createSession(mockUser, sessionId);
      
      const session = getSession(sessionId);
      expect(session).toBeDefined();
      expect(session?.userId).toBe(mockUser.userId);
    });

    it('should return null for non-existent session', () => {
      const session = getSession('non-existent-session');
      expect(session).toBeNull();
    });

    it('should delete a session', () => {
      const sessionId = 'test-session-123';
      createSession(mockUser, sessionId);
      
      deleteSession(sessionId);
      const session = getSession(sessionId);
      expect(session).toBeNull();
    });

    it('should expire old sessions', () => {
      const sessionId = 'test-session-123';
      createSession(mockUser, sessionId);
      
      // Manually set expiration to past
      const session = getSession(sessionId);
      if (session) {
        session.expiresAt = new Date(Date.now() - 1000);
      }
      
      // Try to get expired session
      const expiredSession = getSession(sessionId);
      expect(expiredSession).toBeNull();
    });
  });
});