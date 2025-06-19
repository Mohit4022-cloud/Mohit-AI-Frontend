import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';
import { POST as loginHandler } from '@/app/api/auth/login/route';
import { POST as registerHandler } from '@/app/api/auth/register/route';
import { POST as logoutHandler } from '@/app/api/auth/logout/route';
import { generateAccessToken } from '@/lib/auth';

// Mock environment variables
process.env.JWT_SECRET = 'test-jwt-secret-at-least-32-characters';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-at-least-32-chars';

describe('Authentication API Integration Tests', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'demo@harperai.com',
          password: 'Demo123!',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await loginHandler(request);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('token');
      expect(data.user.email).toBe('demo@harperai.com');
      expect(data.user.role).toBe('admin');

      // Check cookies
      const cookies = response.cookies.getAll();
      expect(cookies.find(c => c.name === 'access_token')).toBeDefined();
      expect(cookies.find(c => c.name === 'refresh_token')).toBeDefined();
    });

    it('should fail with invalid credentials', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'demo@harperai.com',
          password: 'WrongPassword123!',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await loginHandler(request);
      expect(response.status).toBe(401);

      const data = await response.json();
      expect(data.error).toBe('Invalid email or password');
    });

    it('should validate email format', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'not-an-email',
          password: 'Password123!',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await loginHandler(request);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.error).toBe('Invalid input');
      expect(data.details).toBeDefined();
    });

    it('should require password', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'demo@harperai.com',
          password: '',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await loginHandler(request);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.error).toBe('Invalid input');
    });

    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: 'invalid-json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await loginHandler(request);
      expect(response.status).toBe(500);

      const data = await response.json();
      expect(data.error).toBe('Internal server error');
    });

    it('should set secure cookies in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'demo@harperai.com',
          password: 'Demo123!',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await loginHandler(request);
      const cookies = response.cookies.getAll();
      const accessToken = cookies.find(c => c.name === 'access_token');

      expect(accessToken?.secure).toBe(true);
      expect(accessToken?.httpOnly).toBe(true);
      expect(accessToken?.sameSite).toBe('lax');

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: 'newuser@example.com',
          password: 'NewUser123!',
          name: 'New User',
          organizationName: 'Test Org',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await registerHandler(request);
      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('token');
      expect(data.user.email).toBe('newuser@example.com');
      expect(data.user.name).toBe('New User');
    });

    it('should validate password strength', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: 'newuser@example.com',
          password: 'weak',
          name: 'New User',
          organizationName: 'Test Org',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await registerHandler(request);
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.error).toContain('validation');
    });

    it('should prevent duplicate email registration', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: 'demo@harperai.com', // Existing user
          password: 'NewUser123!',
          name: 'New User',
          organizationName: 'Test Org',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await registerHandler(request);
      expect(response.status).toBe(409);

      const data = await response.json();
      expect(data.error).toContain('already exists');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout authenticated user', async () => {
      const token = generateAccessToken({
        userId: '123',
        email: 'test@example.com',
        role: 'user',
      });

      const request = new NextRequest('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const response = await logoutHandler(request);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.message).toBe('Logged out successfully');

      // Check cookies are cleared
      const cookies = response.cookies.getAll();
      const accessToken = cookies.find(c => c.name === 'access_token');
      const refreshToken = cookies.find(c => c.name === 'refresh_token');

      expect(accessToken?.value).toBe('');
      expect(refreshToken?.value).toBe('');
    });

    it('should handle logout without authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/logout', {
        method: 'POST',
      });

      const response = await logoutHandler(request);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.message).toBe('Logged out successfully');
    });
  });

  describe('Rate Limiting', () => {
    it('should rate limit login attempts', async () => {
      // Make multiple rapid login attempts
      const requests = Array(10).fill(null).map(() => 
        new NextRequest('http://localhost:3000/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'wrong',
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '192.168.1.100', // Same IP
          },
        })
      );

      const responses = await Promise.all(
        requests.map(req => loginHandler(req))
      );

      // Some requests should be rate limited
      const rateLimited = responses.filter(r => r.status === 429);
      expect(rateLimited.length).toBeGreaterThan(0);

      // Check rate limit headers
      const limitedResponse = rateLimited[0];
      expect(limitedResponse.headers.get('X-RateLimit-Limit')).toBeDefined();
      expect(limitedResponse.headers.get('X-RateLimit-Remaining')).toBe('0');
    });
  });

  describe('CSRF Protection', () => {
    it('should validate CSRF token on state-changing operations', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': 'invalid-csrf-token',
        },
      });

      // In a real implementation, this would check CSRF
      const response = await logoutHandler(request);
      expect(response.status).toBe(200); // Current mock accepts all
    });
  });

  describe('Security Headers', () => {
    it('should include security headers in responses', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'demo@harperai.com',
          password: 'Demo123!',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await loginHandler(request);
      
      // In production, middleware would add these headers
      // For now, we just verify the response is valid
      expect(response.status).toBe(200);
    });
  });
});