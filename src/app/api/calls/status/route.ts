import { NextRequest, NextResponse } from 'next/server';
import { logSecurityEvent } from '@/lib/security';
import { z } from 'zod';

// Twilio status callback schema
const TwilioStatusSchema = z.object({
  CallSid: z.string(),
  CallStatus: z.enum(['queued', 'initiated', 'ringing', 'in-progress', 'completed', 'busy', 'no-answer', 'canceled', 'failed']),
  CallDuration: z.string().optional(),
  Timestamp: z.string().optional(),
  CallbackSource: z.string().optional(),
  From: z.string().optional(),
  To: z.string().optional(),
  Direction: z.string().optional(),
  ErrorCode: z.string().optional(),
  ErrorMessage: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse Twilio webhook data
    const formData = await request.formData();
    const data: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    
    // Validate Twilio signature (in production)
    // const twilioSignature = request.headers.get('x-twilio-signature');
    // if (!validateTwilioSignature(twilioSignature, data)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }
    
    // Validate data
    const validationResult = TwilioStatusSchema.safeParse(data);
    
    if (!validationResult.success) {
      console.error('Invalid Twilio status data:', validationResult.error);
      return NextResponse.json(
        { error: 'Invalid status data' },
        { status: 400 }
      );
    }
    
    const statusData = validationResult.data;
    
    // Find call by Twilio SID
    const calls = Object.values(global.aiCallsDb || {});
    const call = calls.find(c => c.twilioCallSid === statusData.CallSid);
    
    if (!call) {
      console.error('Call not found for SID:', statusData.CallSid);
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }
    
    // Map Twilio status to our status
    let mappedStatus = call.status;
    let outcome = call.outcome;
    
    switch (statusData.CallStatus) {
      case 'initiated':
      case 'queued':
        mappedStatus = 'CONNECTING';
        break;
      case 'ringing':
        mappedStatus = 'RINGING';
        break;
      case 'in-progress':
        mappedStatus = 'IN_PROGRESS';
        break;
      case 'completed':
        mappedStatus = 'COMPLETED';
        if (!outcome) {
          outcome = 'Completed';
        }
        break;
      case 'busy':
        mappedStatus = 'FAILED';
        outcome = 'Busy';
        break;
      case 'no-answer':
        mappedStatus = 'FAILED';
        outcome = 'No Answer';
        break;
      case 'canceled':
      case 'failed':
        mappedStatus = 'FAILED';
        outcome = statusData.ErrorMessage || 'Failed';
        break;
    }
    
    // Calculate duration if completed
    let duration = call.duration;
    if (statusData.CallDuration) {
      duration = parseInt(statusData.CallDuration);
    } else if (mappedStatus === 'COMPLETED' && call.startTime) {
      duration = Math.floor((Date.now() - new Date(call.startTime).getTime()) / 1000);
    }
    
    // Update call
    const updatedCall = {
      ...call,
      status: mappedStatus,
      outcome,
      duration,
      endTime: mappedStatus === 'COMPLETED' || mappedStatus === 'FAILED' ? new Date() : call.endTime,
      lastUpdate: new Date(),
      twilioStatus: statusData.CallStatus,
      errorCode: statusData.ErrorCode,
      errorMessage: statusData.ErrorMessage,
      events: [
        ...(call.events || []),
        {
          type: 'status_update',
          timestamp: new Date(),
          data: statusData,
        },
      ],
    };
    
    // Update in database
    global.aiCallsDb[call.id] = updatedCall;
    
    // Send WebSocket notification
    if (global.io) {
      global.io.emit('call:status-changed', {
        callId: call.id,
        status: mappedStatus,
        twilioStatus: statusData.CallStatus,
        duration,
      });
      
      global.io.emit('call:updated', updatedCall);
    }
    
    // If call completed, generate summary automatically
    if (mappedStatus === 'COMPLETED') {
      // Schedule summary generation after a short delay
      setTimeout(() => {
        generateCallSummary(call.id);
      }, 5000);
    }
    
    // Log event
    logSecurityEvent({
      ip: request.ip || 'unknown',
      method: 'POST',
      path: '/api/calls/status',
      userAgent: request.headers.get('user-agent') || 'unknown',
      action: 'call_status_update',
      result: 'success',
      details: {
        callId: call.id,
        status: mappedStatus,
        twilioStatus: statusData.CallStatus,
      },
    });
    
    // Return success response to Twilio
    return new NextResponse('', { status: 200 });
    
  } catch (error) {
    console.error('Error processing status callback:', error);
    
    // Return 200 to prevent Twilio retries
    return new NextResponse('', { status: 200 });
  }
}

// Helper function to generate call summary
async function generateCallSummary(callId: string) {
  try {
    const call = global.aiCallsDb?.[callId];
    if (!call) return;
    
    const transcript = global.transcriptsDb?.[callId] || [];
    if (transcript.length === 0) return;
    
    // Generate basic summary
    const summary = {
      id: `summary_${callId}`,
      callId,
      generatedAt: new Date(),
      callDetails: {
        leadName: call.leadName,
        company: call.company,
        duration: call.duration,
        outcome: call.outcome,
        sentiment: call.sentiment,
        mode: call.mode,
      },
      overview: `Call completed with ${call.leadName} from ${call.company}. Duration: ${Math.floor(call.duration / 60)} minutes.`,
      keyPoints: [],
      metrics: {
        talkRatio: {
          ai: 50,
          lead: 50,
        },
      },
    };
    
    // Store summary
    global.summariesDb = global.summariesDb || {};
    global.summariesDb[callId] = summary;
    
    // Update call
    global.aiCallsDb[callId] = {
      ...call,
      hasSummary: true,
      summaryGeneratedAt: new Date(),
    };
    
    // Notify clients
    if (global.io) {
      global.io.emit('call:summary-generated', {
        callId,
        summary,
      });
    }
  } catch (error) {
    console.error('Error generating summary:', error);
  }
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
  var transcriptsDb: Record<string, any[]>;
  var summariesDb: Record<string, any>;
  var io: any;
}