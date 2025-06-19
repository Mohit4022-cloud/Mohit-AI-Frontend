import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Mock authentication - accept any login for testing
    if (email && password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return NextResponse.json({
        user: {
          id: '1',
          email: email,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          role: 'admin',
          organizationId: 'org-1'
        },
        token: 'mock-jwt-token-' + Date.now()
      });
    }
    
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}