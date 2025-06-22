import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-helpers";
import { logSecurityEvent } from "@/lib/security";
import { z } from "zod";

// Request validation schema for POST
const GenerateSummarySchema = z.object({
  includeActionItems: z.boolean().default(true),
  includeKeyPoints: z.boolean().default(true),
  includeNextSteps: z.boolean().default(true),
  customPrompt: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);
    const { id: callId } = params;

    // Get call from database
    const call = global.aiCallsDb?.[callId];

    if (!call) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    // Check if summary exists
    const existingSummary = global.summariesDb?.[callId];

    if (!existingSummary) {
      return NextResponse.json(
        { error: "Summary not found. Generate one first." },
        { status: 404 },
      );
    }

    // Log security event
    logSecurityEvent({
      ip: request.ip || "unknown",
      method: "GET",
      path: `/api/calls/${callId}/summary`,
      userAgent: request.headers.get("user-agent") || "unknown",
      userId: user.userId,
      action: "view_summary",
      result: "success",
      details: { callId },
    });

    return NextResponse.json(existingSummary);
  } catch (error) {
    console.error("Error fetching summary:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

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
    const validationResult = GenerateSummarySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    const {
      includeActionItems,
      includeKeyPoints,
      includeNextSteps,
      customPrompt,
    } = validationResult.data;

    // Get call from database
    const call = global.aiCallsDb?.[callId];

    if (!call) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    // Check if call has ended
    if (call.status !== "COMPLETED" && call.status !== "FAILED") {
      return NextResponse.json(
        { error: "Call must be completed before generating summary" },
        { status: 400 },
      );
    }

    // Get transcript
    const transcript = global.transcriptsDb?.[callId] || [];

    if (transcript.length === 0) {
      return NextResponse.json(
        { error: "No transcript available for this call" },
        { status: 400 },
      );
    }

    // Generate summary (mock implementation)
    // In a real implementation, this would use an AI service
    const summary = generateMockSummary(call, transcript, {
      includeActionItems,
      includeKeyPoints,
      includeNextSteps,
      customPrompt,
    });

    // Store summary
    global.summariesDb = global.summariesDb || {};
    global.summariesDb[callId] = summary;

    // Update call with summary status
    global.aiCallsDb[callId] = {
      ...call,
      hasSummary: true,
      summaryGeneratedAt: new Date(),
      summaryGeneratedBy: user.userId,
    };

    // Send WebSocket notification
    if (global.io) {
      global.io.emit("call:summary-generated", {
        callId,
        summary,
        generatedBy: user.userId,
      });
    }

    // Log security event
    logSecurityEvent({
      ip: request.ip || "unknown",
      method: "POST",
      path: `/api/calls/${callId}/summary`,
      userAgent: request.headers.get("user-agent") || "unknown",
      userId: user.userId,
      action: "generate_summary",
      result: "success",
      details: { callId },
    });

    return NextResponse.json({
      success: true,
      summary,
      message: "Summary generated successfully",
    });
  } catch (error) {
    console.error("Error generating summary:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Mock summary generation function
function generateMockSummary(call: any, transcript: any[], options: any) {
  const summary: any = {
    id: `summary_${call.id}`,
    callId: call.id,
    generatedAt: new Date(),
    callDetails: {
      leadName: call.leadName,
      company: call.company,
      duration: call.duration,
      outcome: call.outcome || "Completed",
      sentiment: call.sentiment,
      mode: call.mode,
    },
    overview: `Call with ${call.leadName} from ${call.company} lasted ${Math.floor(call.duration / 60)} minutes. The conversation covered product features, pricing, and implementation timeline.`,
  };

  if (options.includeKeyPoints) {
    summary.keyPoints = [
      "Lead expressed interest in the enterprise pricing tier",
      "Primary use case is sales automation for their 50-person team",
      "Concerns about integration with existing CRM system",
      "Requested a follow-up demo with their technical team",
    ];
  }

  if (options.includeActionItems) {
    summary.actionItems = [
      {
        id: "1",
        task: "Send enterprise pricing proposal",
        assignedTo: "Sales Team",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
        priority: "high",
      },
      {
        id: "2",
        task: "Schedule technical demo",
        assignedTo: "Solutions Engineer",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
        priority: "medium",
      },
      {
        id: "3",
        task: "Share CRM integration documentation",
        assignedTo: "Customer Success",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
        priority: "medium",
      },
    ];
  }

  if (options.includeNextSteps) {
    summary.nextSteps = [
      "Follow up with pricing proposal by end of week",
      "Coordinate with technical team for demo scheduling",
      "Prepare custom integration plan for their CRM",
    ];
  }

  summary.transcriptHighlights = [
    {
      speaker: "LEAD",
      text: "We're looking to scale our sales team and need better automation.",
      timestamp: "00:02:15",
      importance: "high",
    },
    {
      speaker: "AI",
      text: "Our platform can help you automate up to 80% of initial outreach.",
      timestamp: "00:03:42",
      importance: "medium",
    },
    {
      speaker: "LEAD",
      text: "The ROI numbers look compelling. Let's schedule that technical demo.",
      timestamp: "00:14:28",
      importance: "high",
    },
  ];

  summary.metrics = {
    talkRatio: {
      ai: 45,
      lead: 55,
    },
    objections: {
      raised: 3,
      handled: 3,
    },
    questionsAsked: {
      byAI: 8,
      byLead: 5,
    },
  };

  return summary;
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
  var transcriptsDb: Record<string, any[]>;
  var summariesDb: Record<string, any>;
  var io: any;
}
