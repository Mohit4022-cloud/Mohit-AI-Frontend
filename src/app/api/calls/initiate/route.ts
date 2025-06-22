import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authenticateRequest, getUserFromRequest } from "@/lib/auth-helpers";
import { logSecurityEvent } from "@/lib/security";
import twilio from "twilio";

// Twilio configuration
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || "";
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || "";
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || "";

// Only initialize Twilio client if credentials are available
const twilioClient =
  twilioAccountSid && twilioAuthToken && twilioAccountSid.startsWith("AC")
    ? twilio(twilioAccountSid, twilioAuthToken)
    : null;

// Request validation schema
const InitiateCallSchema = z.object({
  leadId: z.string().min(1),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  campaignId: z.string().optional(),
  script: z.string().optional(),
  agentSettings: z
    .object({
      voice: z.string().default("professional"),
      formality: z
        .enum(["casual", "professional", "formal"])
        .default("professional"),
      speed: z.number().min(0.75).max(1.25).default(1.0),
    })
    .optional(),
});

// Mock lead database (replace with actual database)
const getLeadById = (leadId: string) => {
  return {
    id: leadId,
    name: "John Doe",
    company: "TechCorp",
    phone: "+1234567890",
    email: "john.doe@techcorp.com",
  };
};

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);

    // Parse and validate request body
    const body = await request.json();
    const validationResult = InitiateCallSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    const { leadId, phoneNumber, campaignId, script, agentSettings } =
      validationResult.data;

    // Get lead information
    const lead = getLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Generate unique call ID
    const callId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create TwiML for ConversationRelay
    const twimlResponse = `
      <Response>
        <Connect>
          <ConversationRelay 
            url="wss://${request.headers.get("host")}/api/calls/websocket"
            ttsProvider="elevenlabs"
            voice="${agentSettings?.voice || "professional-sales-voice"}"
            dtmfDetection="true"
            interruptible="true"
            timeout="3600">
            <Parameter name="call_id" value="${callId}"/>
            <Parameter name="lead_id" value="${leadId}"/>
            <Parameter name="agent_id" value="mohit-ai-agent"/>
            <Parameter name="user_id" value="${user.userId}"/>
            <Parameter name="script" value="${script || "default"}"/>
            <Parameter name="formality" value="${agentSettings?.formality || "professional"}"/>
            <Parameter name="speed" value="${agentSettings?.speed || 1.0}"/>
          </ConversationRelay>
        </Connect>
      </Response>
    `;

    // Check if Twilio is configured
    if (!twilioClient) {
      return NextResponse.json(
        {
          error:
            "Twilio not configured. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables.",
        },
        { status: 503 },
      );
    }

    // Create Twilio call
    try {
      const call = await twilioClient.calls.create({
        to: phoneNumber,
        from: twilioPhoneNumber,
        twiml: twimlResponse,
        statusCallback: `https://${request.headers.get("host")}/api/calls/status`,
        statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
        statusCallbackMethod: "POST",
        record: true,
        recordingStatusCallback: `https://${request.headers.get("host")}/api/calls/recording`,
        recordingStatusCallbackMethod: "POST",
      });

      // Create call record in database
      const aiCall = {
        id: callId,
        twilioCallSid: call.sid,
        leadId: leadId,
        leadName: lead.name,
        company: lead.company,
        phone: phoneNumber,
        status: "CONNECTING",
        mode: "AI",
        agentStatus: "IDLE",
        startTime: new Date(),
        duration: 0,
        sentiment: 50,
        aiAgentId: "mohit-ai-agent",
        userId: user.userId,
        campaignId,
        tags: [],
      };

      // Store in database (mock for now)
      global.aiCallsDb = global.aiCallsDb || {};
      global.aiCallsDb[callId] = aiCall;

      // Log security event
      logSecurityEvent({
        ip: request.ip || "unknown",
        method: "POST",
        path: "/api/calls/initiate",
        userAgent: request.headers.get("user-agent") || "unknown",
        userId: user.userId,
        action: "call_initiated",
        result: "success",
        details: { callId, leadId, phoneNumber },
      });

      // Emit socket event
      if (global.io) {
        global.io.emit("call:started", aiCall);
      }

      return NextResponse.json({
        success: true,
        call: aiCall,
        twilioCallSid: call.sid,
      });
    } catch (twilioError: any) {
      console.error("Twilio error:", twilioError);

      return NextResponse.json(
        {
          error: "Failed to initiate call",
          details: twilioError.message,
          code: twilioError.code,
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Call initiation error:", error);

    logSecurityEvent({
      ip: request.ip || "unknown",
      method: "POST",
      path: "/api/calls/initiate",
      userAgent: request.headers.get("user-agent") || "unknown",
      action: "call_initiation_failed",
      result: "failure",
      details: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
  var io: any;
}
