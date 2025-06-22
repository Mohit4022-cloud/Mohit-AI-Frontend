import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest, getUserFromRequest } from "@/lib/auth-helpers";
import { logSecurityEvent } from "@/lib/security";
import { z } from "zod";

// Request validation schema
const TakeoverSchema = z.object({
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);
    const { id: callId } = params;

    // Parse request body
    const body = await request.json();
    const validationResult = TakeoverSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    const { reason, notes } = validationResult.data;

    // Get call from database
    const call = global.aiCallsDb?.[callId];

    if (!call) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    // Check if call is active
    if (call.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: "Call is not active" },
        { status: 400 },
      );
    }

    // Check if call is already in human mode
    if (call.mode === "HUMAN") {
      return NextResponse.json(
        { error: "Call is already in human mode" },
        { status: 400 },
      );
    }

    // Update call to human mode
    const updatedCall = {
      ...call,
      mode: "HUMAN",
      previousMode: call.mode,
      takeoverTime: new Date(),
      takeoverUserId: user.userId,
      takeoverReason: reason,
      takeoverNotes: notes,
      events: [
        ...(call.events || []),
        {
          type: "human_takeover",
          timestamp: new Date(),
          userId: user.userId,
          data: { reason, notes },
        },
      ],
    };

    // Update in database
    global.aiCallsDb[callId] = updatedCall;

    // Send WebSocket notification to pause AI
    if (global.io) {
      global.io.to(`call:${callId}`).emit("ai:pause", {
        callId,
        userId: user.userId,
        timestamp: new Date(),
      });

      // Notify all clients about the takeover
      global.io.emit("call:updated", updatedCall);
    }

    // Send command to Twilio/AI system to pause AI
    // This would integrate with your actual telephony system
    try {
      // Example: await twilioClient.calls(call.twilioCallSid).update({ ... })
      console.log(`Pausing AI for call ${callId}`);
    } catch (twilioError) {
      console.error("Error pausing AI in telephony system:", twilioError);
    }

    // Log security event
    logSecurityEvent({
      ip: request.ip || "unknown",
      method: "POST",
      path: `/api/calls/${callId}/takeover`,
      userAgent: request.headers.get("user-agent") || "unknown",
      userId: user.userId,
      action: "human_takeover",
      result: "success",
      details: { callId, reason },
    });

    return NextResponse.json({
      success: true,
      call: updatedCall,
      message: "Successfully taken over call",
    });
  } catch (error) {
    console.error("Error taking over call:", error);

    logSecurityEvent({
      ip: request.ip || "unknown",
      method: "POST",
      path: `/api/calls/${params.id}/takeover`,
      userAgent: request.headers.get("user-agent") || "unknown",
      action: "human_takeover_failed",
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
