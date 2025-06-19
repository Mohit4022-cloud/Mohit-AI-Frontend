import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-helpers';
import { logSecurityEvent } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const mode = searchParams.get('mode') || 'all';
    
    // Get active calls from mock database
    const allCalls = Object.values(global.aiCallsDb || {});
    
    // Filter active calls
    let activeCalls = allCalls.filter(call => 
      call.status === 'CONNECTING' || 
      call.status === 'RINGING' || 
      call.status === 'IN_PROGRESS'
    );
    
    // Apply filters
    if (status !== 'all') {
      activeCalls = activeCalls.filter(call => call.status === status);
    }
    
    if (mode !== 'all') {
      activeCalls = activeCalls.filter(call => call.mode === mode);
    }
    
    // Sort by start time (most recent first)
    activeCalls.sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
    
    // Calculate real-time metrics
    const metrics = {
      totalActive: activeCalls.length,
      aiCalls: activeCalls.filter(c => c.mode === 'AI').length,
      humanCalls: activeCalls.filter(c => c.mode === 'HUMAN').length,
      hybridCalls: activeCalls.filter(c => c.mode === 'HYBRID').length,
      avgDuration: activeCalls.length > 0 
        ? Math.round(activeCalls.reduce((sum, call) => {
            const duration = Math.floor((Date.now() - new Date(call.startTime).getTime()) / 1000);
            return sum + duration;
          }, 0) / activeCalls.length)
        : 0,
    };
    
    // Log security event
    logSecurityEvent({
      ip: request.ip || 'unknown',
      method: 'GET',
      path: '/api/calls/active',
      userAgent: request.headers.get('user-agent') || 'unknown',
      userId: user.userId,
      action: 'view_active_calls',
      result: 'success',
    });
    
    return NextResponse.json({
      calls: activeCalls,
      metrics,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error fetching active calls:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
}