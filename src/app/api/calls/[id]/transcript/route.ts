import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/middleware/auth';
import { logSecurityEvent } from '@/lib/security';

// Mock transcript database
const getTranscriptForCall = (callId: string) => {
  // In a real implementation, this would fetch from your database
  return global.transcriptsDb?.[callId] || [];
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);
    const { id: callId } = params;
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'json';
    const realtime = searchParams.get('realtime') === 'true';
    
    // Get call from database
    const call = global.aiCallsDb?.[callId];
    
    if (!call) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }
    
    // Get transcript entries
    const transcript = getTranscriptForCall(callId);
    
    // If realtime is requested and call is active, set up SSE
    if (realtime && (call.status === 'IN_PROGRESS' || call.status === 'CONNECTING')) {
      // Set up Server-Sent Events for real-time transcript
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // Send initial transcript
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'initial',
              transcript,
              callId,
            })}\n\n`)
          );
          
          // Set up listener for new transcript entries
          const transcriptListener = (data: any) => {
            if (data.callId === callId) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({
                  type: 'update',
                  entry: data.entry,
                })}\n\n`)
              );
            }
          };
          
          // Register listener (in real implementation, this would use your event system)
          if (global.transcriptListeners) {
            global.transcriptListeners.push(transcriptListener);
          } else {
            global.transcriptListeners = [transcriptListener];
          }
          
          // Clean up on close
          request.signal.addEventListener('abort', () => {
            const index = global.transcriptListeners?.indexOf(transcriptListener);
            if (index > -1) {
              global.transcriptListeners.splice(index, 1);
            }
            controller.close();
          });
        },
      });
      
      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }
    
    // Format transcript based on requested format
    if (format === 'text') {
      const textTranscript = transcript
        .map(entry => `[${entry.timestamp}] ${entry.speaker}: ${entry.text}`)
        .join('\n');
      
      return new NextResponse(textTranscript, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    } else if (format === 'vtt') {
      // WebVTT format for video players
      let vttContent = 'WEBVTT\n\n';
      transcript.forEach((entry, index) => {
        const startTime = formatVTTTime(entry.startTime || index * 2);
        const endTime = formatVTTTime(entry.endTime || (index + 1) * 2);
        vttContent += `${index + 1}\n`;
        vttContent += `${startTime} --> ${endTime}\n`;
        vttContent += `<v ${entry.speaker}>${entry.text}\n\n`;
      });
      
      return new NextResponse(vttContent, {
        headers: {
          'Content-Type': 'text/vtt',
        },
      });
    }
    
    // Default JSON format
    const response = {
      callId,
      leadName: call.leadName,
      company: call.company,
      startTime: call.startTime,
      duration: call.duration,
      transcript,
      metadata: {
        totalEntries: transcript.length,
        speakers: [...new Set(transcript.map(e => e.speaker))],
        lastUpdated: transcript[transcript.length - 1]?.timestamp || null,
      },
    };
    
    // Log security event
    logSecurityEvent({
      ip: request.ip || 'unknown',
      method: 'GET',
      path: `/api/calls/${callId}/transcript`,
      userAgent: request.headers.get('user-agent') || 'unknown',
      userId: user.userId,
      action: 'view_transcript',
      result: 'success',
      details: { callId, format },
    });
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching transcript:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to format time for WebVTT
function formatVTTTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const milliseconds = Math.floor((secs % 1) * 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${Math.floor(secs)
    .toString()
    .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Mock transcript entry type
interface TranscriptEntry {
  id: string;
  speaker: 'AI' | 'LEAD' | 'HUMAN';
  text: string;
  timestamp: string;
  startTime?: number;
  endTime?: number;
  confidence?: number;
  sentiment?: number;
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
  var transcriptsDb: Record<string, TranscriptEntry[]>;
  var transcriptListeners: ((data: any) => void)[];
}