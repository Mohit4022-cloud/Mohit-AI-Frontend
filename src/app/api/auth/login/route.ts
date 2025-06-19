import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { EmailSchema } from '@/lib/validation';
import { sanitizeInput } from '@/lib/security-edge';
import { getUserByEmail } from '@/lib/mockData';

// Ensure this route runs in Node.js runtime, not Edge Runtime
export const runtime = 'nodejs';

// Login request schema
const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const sanitizedBody = sanitizeInput(body);
    
    const validationResult = LoginSchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      // Log validation failure
      console.error('[AUTH] Login validation failed:', validationResult.error.issues);
      
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    const { email, password } = validationResult.data;
    
    // Get user from mock database
    const user = getUserByEmail(email);
    
    // For demo purposes, accept specific test credentials
    // In production, use actual password verification
    const isValidPassword = (
      (email === 'demo@harperai.com' && password === 'Demo123!') ||
      (email === 'admin@harperai.com' && password === 'Admin123!') ||
      (process.env.NODE_ENV === 'development' && password === 'password123')
    );
    
    if (!user || !isValidPassword) {
      // Log login failure
      console.error('[AUTH] Login failed for email:', email);
      
      // Simulate processing delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    };
    
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);
    
    // Log successful login
    console.log('[AUTH] Login successful for user:', user.id);
    
    // Create response with secure cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: user.organizationId,
      },
      token: accessToken,
    });
    
    // Set secure HTTP-only cookies
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });
    
    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    
    // Log error
    console.error('[AUTH] Login error:', error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}