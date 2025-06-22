import { NextRequest, NextResponse } from "next/server";
import { logSecurityEvent } from "@/lib/security";
import { z } from "zod";

// Twilio recording callback schema
const TwilioRecordingSchema = z.object({
  RecordingSid: z.string(),
  RecordingUrl: z.string(),
  RecordingStatus: z.enum(["in-progress", "completed", "failed"]),
  RecordingDuration: z.string().optional(),
  RecordingChannels: z.string().optional(),
  RecordingSource: z.string().optional(),
  CallSid: z.string(),
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
    const validationResult = TwilioRecordingSchema.safeParse(data);

    if (!validationResult.success) {
      console.error("Invalid Twilio recording data:", validationResult.error);
      return NextResponse.json(
        { error: "Invalid recording data" },
        { status: 400 },
      );
    }

    const recordingData = validationResult.data;

    // Find call by Twilio SID
    const calls = Object.values(global.aiCallsDb || {});
    const call = calls.find((c) => c.twilioCallSid === recordingData.CallSid);

    if (!call) {
      console.error("Call not found for SID:", recordingData.CallSid);
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    // Update call with recording information
    if (recordingData.RecordingStatus === "completed") {
      const recording = {
        id: recordingData.RecordingSid,
        url: recordingData.RecordingUrl,
        duration: recordingData.RecordingDuration
          ? parseInt(recordingData.RecordingDuration)
          : null,
        channels: recordingData.RecordingChannels
          ? parseInt(recordingData.RecordingChannels)
          : 1,
        status: "completed",
        createdAt: new Date(),
      };

      // Update call
      const updatedCall = {
        ...call,
        recording,
        hasRecording: true,
        events: [
          ...(call.events || []),
          {
            type: "recording_completed",
            timestamp: new Date(),
            data: recording,
          },
        ],
      };

      // Update in database
      global.aiCallsDb[call.id] = updatedCall;

      // Store recording reference
      global.recordingsDb = global.recordingsDb || {};
      global.recordingsDb[call.id] = recording;

      // Send WebSocket notification
      if (global.io) {
        global.io.emit("call:recording-ready", {
          callId: call.id,
          recording,
        });

        global.io.emit("call:updated", updatedCall);
      }

      // Process recording for insights (async)
      processRecordingForInsights(call.id, recording);
    } else if (recordingData.RecordingStatus === "failed") {
      // Handle recording failure
      const updatedCall = {
        ...call,
        recordingError: recordingData.ErrorMessage || "Recording failed",
        events: [
          ...(call.events || []),
          {
            type: "recording_failed",
            timestamp: new Date(),
            data: {
              errorCode: recordingData.ErrorCode,
              errorMessage: recordingData.ErrorMessage,
            },
          },
        ],
      };

      global.aiCallsDb[call.id] = updatedCall;

      if (global.io) {
        global.io.emit("call:recording-failed", {
          callId: call.id,
          error: recordingData.ErrorMessage,
        });
      }
    }

    // Log event
    logSecurityEvent({
      ip: request.ip || "unknown",
      method: "POST",
      path: "/api/calls/recording",
      userAgent: request.headers.get("user-agent") || "unknown",
      action: "recording_status_update",
      result: "success",
      details: {
        callId: call.id,
        recordingStatus: recordingData.RecordingStatus,
        recordingSid: recordingData.RecordingSid,
      },
    });

    // Return success response to Twilio
    return new NextResponse("", { status: 200 });
  } catch (error) {
    console.error("Error processing recording callback:", error);

    // Return 200 to prevent Twilio retries
    return new NextResponse("", { status: 200 });
  }
}

// Process recording for additional insights
async function processRecordingForInsights(callId: string, recording: any) {
  try {
    // In a real implementation, this would:
    // 1. Download the recording from Twilio
    // 2. Process with speech analytics
    // 3. Extract additional insights
    // 4. Update call metrics

    const call = global.aiCallsDb?.[callId];
    if (!call) return;

    // Mock insights generation
    const insights = {
      emotions: {
        positive: 65,
        neutral: 25,
        negative: 10,
      },
      speakingRate: {
        ai: 145, // words per minute
        lead: 132,
      },
      interruptions: 3,
      silences: {
        count: 8,
        totalDuration: 24, // seconds
      },
      keywords: [
        { word: "pricing", count: 5 },
        { word: "features", count: 8 },
        { word: "implementation", count: 3 },
      ],
      compliance: {
        disclosureGiven: true,
        consentRecorded: true,
        gdprCompliant: true,
      },
    };

    // Update call with insights
    const updatedCall = {
      ...call,
      insights,
      insightsGeneratedAt: new Date(),
    };

    global.aiCallsDb[callId] = updatedCall;

    // Store insights
    global.insightsDb = global.insightsDb || {};
    global.insightsDb[callId] = insights;

    // Notify clients
    if (global.io) {
      global.io.emit("call:insights-ready", {
        callId,
        insights,
      });
    }
  } catch (error) {
    console.error("Error processing recording insights:", error);
  }
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
  var recordingsDb: Record<string, any>;
  var insightsDb: Record<string, any>;
  var io: any;
}
