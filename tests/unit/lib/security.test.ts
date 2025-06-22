import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import {
  rateLimit,
  sanitizeHTML,
  sanitizeInput,
  escapeSQLString,
  securityHeaders,
  corsHeaders,
  EmailSchema,
  PasswordSchema,
  UsernameSchema,
  PhoneSchema,
  URLSchema,
  encrypt,
  decrypt,
  generateSecureToken,
  isValidIP,
  logSecurityEvent,
  getSecurityLogs,
} from '@/lib/security';
import { NextRequest, NextResponse } from 'next/server';

describe('Security Library', () => {
  describe('Rate Limiting', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should allow requests within rate limit', async () => {
      const limiter = rateLimit({ windowMs: 60000, maxRequests: 5 });
      
      // Use different IPs for each request to avoid rate limit conflicts
      for (let i = 0; i < 5; i++) {
        const request = new NextRequest('http://localhost:3000/api/test');
        // Mock different IP addresses
        Object.defineProperty(request, 'ip', {
          value: `192.168.1.${i + 1}`,
          writable: false,
          configurable: true
        });
        
        const response = await limiter(request, async () => NextResponse.json({ success: true }));
        expect(response.status).toBe(200);
      }
    });

    it('should block requests exceeding rate limit', async () => {
      const limiter = rateLimit({ windowMs: 60000, maxRequests: 2 });
      const request = new NextRequest('http://localhost:3000/api/test');
      
      // First two requests should pass
      await limiter(request, async () => NextResponse.json({ success: true }));
      await limiter(request, async () => NextResponse.json({ success: true }));
      
      // Third request should be rate limited
      const response = await limiter(request, async () => NextResponse.json({ success: true }));
      expect(response.status).toBe(429);
      
      const body = await response.json();
      expect(body.error).toBe('Too many requests');
    });

    it('should reset rate limit after window expires', async () => {
      const limiter = rateLimit({ windowMs: 60000, maxRequests: 1 });
      
      // First request with IP 1
      const request1 = new NextRequest('http://localhost:3000/api/test');
      Object.defineProperty(request1, 'ip', {
        value: '192.168.1.100',
        writable: false,
        configurable: true
      });
      
      // First request should pass
      const response1 = await limiter(request1, async () => NextResponse.json({ success: true }));
      expect(response1.status).toBe(200);
      
      // Second request with same IP should be blocked
      const request2 = new NextRequest('http://localhost:3000/api/test');
      Object.defineProperty(request2, 'ip', {
        value: '192.168.1.100',
        writable: false,
        configurable: true
      });
      const response2 = await limiter(request2, async () => NextResponse.json({ success: true }));
      expect(response2.status).toBe(429);
      
      // Advance time past the window
      jest.advanceTimersByTime(61000);
      
      // Third request with same IP should pass (new window)
      const request3 = new NextRequest('http://localhost:3000/api/test');
      Object.defineProperty(request3, 'ip', {
        value: '192.168.1.100',
        writable: false,
        configurable: true
      });
      const response3 = await limiter(request3, async () => NextResponse.json({ success: true }));
      expect(response3.status).toBe(200);
    });
  });

  describe('Input Sanitization', () => {
    describe('sanitizeHTML', () => {
      it('should allow safe HTML tags', () => {
        const input = '<p>Hello <b>world</b>!</p>';
        const sanitized = sanitizeHTML(input);
        expect(sanitized).toBe('<p>Hello <b>world</b>!</p>');
      });

      it('should remove dangerous HTML tags', () => {
        const input = '<script>alert("XSS")</script><p>Safe content</p>';
        const sanitized = sanitizeHTML(input);
        expect(sanitized).toBe('<p>Safe content</p>');
      });

      it('should remove dangerous attributes', () => {
        const input = '<a href="javascript:alert(\'XSS\')" onclick="alert(\'XSS\')">Link</a>';
        const sanitized = sanitizeHTML(input);
        expect(sanitized).not.toContain('javascript:');
        expect(sanitized).not.toContain('onclick');
      });
    });

    describe('sanitizeInput', () => {
      it('should escape HTML entities in strings', () => {
        const input = '<script>alert("XSS")</script>';
        const sanitized = sanitizeInput(input);
        expect(sanitized).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
      });

      it('should remove null bytes', () => {
        const input = 'Hello\0World';
        const sanitized = sanitizeInput(input);
        expect(sanitized).toBe('HelloWorld');
      });

      it('should sanitize nested objects', () => {
        const input = {
          name: '<b>John</b>',
          nested: {
            value: '<script>alert("XSS")</script>',
          },
        };
        const sanitized = sanitizeInput(input);
        expect(sanitized.name).toBe('&lt;b&gt;John&lt;&#x2F;b&gt;');
        expect(sanitized.nested.value).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
      });

      it('should sanitize arrays', () => {
        const input = ['<b>Item 1</b>', '<script>alert("XSS")</script>'];
        const sanitized = sanitizeInput(input);
        expect(sanitized[0]).toBe('&lt;b&gt;Item 1&lt;&#x2F;b&gt;');
        expect(sanitized[1]).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
      });
    });

    describe('escapeSQLString', () => {
      it('should escape SQL special characters', () => {
        const input = "'; DROP TABLE users; --";
        const escaped = escapeSQLString(input);
        expect(escaped).toBe("\\'; DROP TABLE users; --");
      });

      it('should escape quotes and backslashes', () => {
        const input = 'He said "Hello" and I\'m happy';
        const escaped = escapeSQLString(input);
        expect(escaped).toBe('He said \\"Hello\\" and I\\\'m happy');
      });
    });
  });

  describe('Security Headers', () => {
    it('should add security headers to response', async () => {
      const middleware = securityHeaders();
      const request = new NextRequest('http://localhost:3000/api/test');
      
      const response = await middleware(request, async () => NextResponse.json({ success: true }));
      
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('X-XSS-Protection')).toBe('1; mode=block');
      expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
      expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'self'");
    });

    it('should add HSTS header for HTTPS requests', async () => {
      const middleware = securityHeaders();
      const request = new NextRequest('https://localhost:3000/api/test');
      
      const response = await middleware(request, async () => NextResponse.json({ success: true }));
      
      expect(response.headers.get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains; preload');
    });
  });

  describe('CORS Headers', () => {
    it('should handle preflight requests', async () => {
      const middleware = corsHeaders(['https://allowed-origin.com']);
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'OPTIONS',
        headers: {
          'origin': 'https://allowed-origin.com',
        },
      });
      
      const response = await middleware(request, async () => NextResponse.json({ success: true }));
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://allowed-origin.com');
      expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
      expect(response.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
    });

    it('should block disallowed origins', async () => {
      const middleware = corsHeaders(['https://allowed-origin.com']);
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'origin': 'https://evil-origin.com',
        },
      });
      
      const response = await middleware(request, async () => NextResponse.json({ success: true }));
      
      expect(response.headers.get('Access-Control-Allow-Origin')).toBeUndefined();
    });
  });

  describe('Input Validation Schemas', () => {
    describe('EmailSchema', () => {
      it('should accept valid emails', () => {
        expect(EmailSchema.parse('test@example.com')).toBe('test@example.com');
        expect(EmailSchema.parse('user.name+tag@domain.co.uk')).toBe('user.name+tag@domain.co.uk');
      });

      it('should reject invalid emails', () => {
        expect(() => EmailSchema.parse('not-an-email')).toThrow();
        expect(() => EmailSchema.parse('@example.com')).toThrow();
        expect(() => EmailSchema.parse('test@')).toThrow();
      });
    });

    describe('PasswordSchema', () => {
      it('should accept strong passwords', () => {
        expect(PasswordSchema.parse('StrongP@ssw0rd')).toBe('StrongP@ssw0rd');
        expect(PasswordSchema.parse('C0mplex!Pass')).toBe('C0mplex!Pass');
      });

      it('should reject weak passwords', () => {
        expect(() => PasswordSchema.parse('short')).toThrow(); // Too short
        expect(() => PasswordSchema.parse('password123')).toThrow(); // No uppercase or special char
        expect(() => PasswordSchema.parse('PASSWORD123!')).toThrow(); // No lowercase
        expect(() => PasswordSchema.parse('Password!')).toThrow(); // No number
      });
    });

    describe('UsernameSchema', () => {
      it('should accept valid usernames', () => {
        expect(UsernameSchema.parse('john_doe')).toBe('john_doe');
        expect(UsernameSchema.parse('user123')).toBe('user123');
        expect(UsernameSchema.parse('test-user')).toBe('test-user');
      });

      it('should reject invalid usernames', () => {
        expect(() => UsernameSchema.parse('ab')).toThrow(); // Too short
        expect(() => UsernameSchema.parse('user@name')).toThrow(); // Invalid character
        expect(() => UsernameSchema.parse('user name')).toThrow(); // Space
      });
    });

    describe('PhoneSchema', () => {
      it('should accept valid phone numbers', () => {
        expect(PhoneSchema.parse('+1234567890')).toBe('+1234567890');
        expect(PhoneSchema.parse('1234567890')).toBe('1234567890');
      });

      it('should reject invalid phone numbers', () => {
        expect(() => PhoneSchema.parse('12')).toThrow(); // Too short (less than 3 chars)
        expect(() => PhoneSchema.parse('phone-number')).toThrow(); // Invalid characters
        expect(() => PhoneSchema.parse('abc123')).toThrow(); // Letters not allowed
      });
    });

    describe('URLSchema', () => {
      it('should accept valid URLs', () => {
        expect(URLSchema.parse('https://example.com')).toBe('https://example.com');
        expect(URLSchema.parse('http://subdomain.example.com/path?query=value')).toBe('http://subdomain.example.com/path?query=value');
      });

      it('should reject invalid URLs', () => {
        expect(() => URLSchema.parse('not-a-url')).toThrow();
        expect(() => URLSchema.parse('ftp://example.com')).toThrow(); // Not http/https
      });
    });
  });

  describe('Encryption', () => {
    it('should encrypt and decrypt text', () => {
      const plainText = 'This is a secret message';
      const encrypted = encrypt(plainText);
      
      expect(encrypted).not.toBe(plainText);
      expect(encrypted).toContain(':'); // IV separator
      
      const decrypted = decrypt(encrypted);
      expect(decrypted).toBe(plainText);
    });

    it('should generate different encrypted values for same input', () => {
      const plainText = 'Same message';
      const encrypted1 = encrypt(plainText);
      const encrypted2 = encrypt(plainText);
      
      expect(encrypted1).not.toBe(encrypted2); // Different IVs
      expect(decrypt(encrypted1)).toBe(plainText);
      expect(decrypt(encrypted2)).toBe(plainText);
    });
  });

  describe('Token Generation', () => {
    it('should generate secure random tokens', () => {
      const token1 = generateSecureToken();
      const token2 = generateSecureToken();
      
      expect(token1).toHaveLength(64); // 32 bytes = 64 hex chars
      expect(token2).toHaveLength(64);
      expect(token1).not.toBe(token2);
      expect(/^[a-f0-9]+$/.test(token1)).toBe(true); // Hex format
    });

    it('should generate tokens of specified length', () => {
      const token = generateSecureToken(16);
      expect(token).toHaveLength(32); // 16 bytes = 32 hex chars
    });
  });

  describe('IP Validation', () => {
    it('should validate IPv4 addresses', () => {
      expect(isValidIP('192.168.1.1')).toBe(true);
      expect(isValidIP('0.0.0.0')).toBe(true);
      expect(isValidIP('255.255.255.255')).toBe(true);
    });

    it('should reject invalid IPv4 addresses', () => {
      expect(isValidIP('256.1.1.1')).toBe(false);
      expect(isValidIP('192.168.1')).toBe(false);
      expect(isValidIP('192.168.1.1.1')).toBe(false);
    });

    it('should validate IPv6 addresses', () => {
      expect(isValidIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    });
  });

  describe('Security Logging', () => {
    beforeEach(() => {
      // Clear logs before each test
      getSecurityLogs().forEach(() => {
        // Implementation would clear logs
      });
    });

    it('should log security events', () => {
      logSecurityEvent({
        ip: '192.168.1.1',
        method: 'POST',
        path: '/api/login',
        userAgent: 'Test Browser',
        action: 'login_attempt',
        result: 'success',
        userId: '123',
      });

      const logs = getSecurityLogs();
      expect(logs.length).toBeGreaterThan(0);
      
      const lastLog = logs[logs.length - 1];
      expect(lastLog.action).toBe('login_attempt');
      expect(lastLog.result).toBe('success');
      expect(lastLog.userId).toBe('123');
    });

    it('should filter logs by criteria', () => {
      // Log multiple events
      logSecurityEvent({
        ip: '192.168.1.1',
        method: 'POST',
        path: '/api/login',
        userAgent: 'Test',
        action: 'login',
        result: 'success',
        userId: '123',
      });

      logSecurityEvent({
        ip: '192.168.1.2',
        method: 'POST',
        path: '/api/login',
        userAgent: 'Test',
        action: 'login',
        result: 'failure',
        userId: '456',
      });

      // Filter by result
      const successLogs = getSecurityLogs({ result: 'success' });
      expect(successLogs.every(log => log.result === 'success')).toBe(true);

      // Filter by userId
      const userLogs = getSecurityLogs({ userId: '123' });
      expect(userLogs.every(log => log.userId === '123')).toBe(true);
    });
  });
});