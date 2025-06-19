import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-helpers';
import { logSecurityEvent } from '@/lib/security';
import { z } from 'zod';

// Request validation schema
const PauseAISchema = z.object({
  duration: z.number().min(0).optional(), // Duration in seconds, 0 means indefinite
  reason: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);
    const { id: callId } = params;
    
    // Parse request body
    const body = await request.json();
    const validationResult = PauseAISchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    const { duration, reason } = validationResult.data;
    
    // Get call from database
    const call = global.aiCallsDb?.[callId];
    
    if (!call) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }
    
    // Check if call is active
    if (call.status !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: 'Call is not active' },
        { status: 400 }
      );
    }
    
    // Check if AI is already paused
    if (call.aiPaused) {
      return NextResponse.json(
        { error: 'AI is already paused' },
        { status: 400 }
      );
    }
    
    // Calculate resume time if duration is specified
    const resumeAt = duration ? new Date(Date.now() + duration * 1000) : null;
    
    // Update call
    const updatedCall = {
      ...call,
      aiPaused: true,
      aiPausedAt: new Date(),
      aiPausedBy: user.userId,
      aiResumeAt: resumeAt,
      aiPauseReason: reason,
      events: [
        ...(call.events || []),
        {
          type: 'ai_paused',
          timestamp: new Date(),
          userId: user.userId,
          data: { duration, reason, resumeAt },
        },
      ],
    };
    
    // Update in database
    global.aiCallsDb[callId] = updatedCall;
    
    // Send WebSocket notification
    if (global.io) {
      global.io.to(`call:${callId}`).emit('ai:paused', {
        callId,
        pausedBy: user.userId,
        duration,
        resumeAt,
        timestamp: new Date(),
      });
      
      // Notify all clients
      global.io.emit('call:updated', updatedCall);
    }
    
    // If duration is specified, schedule resume
    if (duration && duration > 0) {
      setTimeout(() => {
        // Resume AI after duration
        const currentCall = global.aiCallsDb?.[callId];
        if (currentCall && currentCall.aiPaused && currentCall.status === 'IN_PROGRESS') {
          const resumedCall = {
            ...currentCall,
            aiPaused: false,
            aiResumedAt: new Date(),
            events: [
              ...(currentCall.events || []),
              {
                type: 'ai_resumed',
                timestamp: new Date(),
                data: { automatic: true },
              },
            ],
          };
          
          global.aiCallsDb[callId] = resumedCall;
          
          if (global.io) {
            global.io.to(`call:${callId}`).emit('ai:resumed', {
              callId,
              automatic: true,
              timestamp: new Date(),
            });
            global.io.emit('call:updated', resumedCall);
          }
        }
      }, duration * 1000);
    }
    
    // Log security event
    logSecurityEvent({
      ip: request.ip || 'unknown',
      method: 'POST',
      path: `/api/calls/${callId}/pause-ai`,
      userAgent: request.headers.get('user-agent') || 'unknown',
      userId: user.userId,
      action: 'pause_ai',
      result: 'success',
      details: { callId, duration, reason },
    });
    
    return NextResponse.json({
      success: true,
      call: updatedCall,
      message: duration 
        ? `AI paused for ${duration} seconds` 
        : 'AI paused indefinitely',
    });
    
  } catch (error) {
    console.error('Error pausing AI:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);
    const { id: callId } = params;
    
    // Get call from database
    const call = global.aiCallsDb?.[callId];
    
    if (!call) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }
    
    // Check if AI is paused
    if (!call.aiPaused) {
      return NextResponse.json(
        { error: 'AI is not paused' },
        { status: 400 }
      );
    }
    
    // Resume AI
    const updatedCall = {
      ...call,
      aiPaused: false,
      aiResumedAt: new Date(),
      aiResumedBy: user.userId,
      events: [
        ...(call.events || []),
        {
          type: 'ai_resumed',
          timestamp: new Date(),
          userId: user.userId,
          data: { manual: true },
        },
      ],
    };
    
    // Update in database
    global.aiCallsDb[callId] = updatedCall;
    
    // Send WebSocket notification
    if (global.io) {
      global.io.to(`call:${callId}`).emit('ai:resumed', {
        callId,
        resumedBy: user.userId,
        manual: true,
        timestamp: new Date(),
      });
      
      // Notify all clients
      global.io.emit('call:updated', updatedCall);
    }
    
    // Log security event
    logSecurityEvent({
      ip: request.ip || 'unknown',
      method: 'DELETE',
      path: `/api/calls/${callId}/pause-ai`,
      userAgent: request.headers.get('user-agent') || 'unknown',
      userId: user.userId,
      action: 'resume_ai',
      result: 'success',
      details: { callId },
    });
    
    return NextResponse.json({
      success: true,
      call: updatedCall,
      message: 'AI resumed successfully',
    });
    
  } catch (error) {
    console.error('Error resuming AI:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
  var io: any;
}