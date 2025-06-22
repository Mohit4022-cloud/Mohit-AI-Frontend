import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-helpers";
import { logSecurityEvent } from "@/lib/security";
import { subDays, startOfDay, endOfDay } from "date-fns";

// Force dynamic rendering since we use searchParams
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const user = await authenticateRequest(request);

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") || "7d"; // 7d, 30d, 90d, all
    const groupBy = searchParams.get("groupBy") || "day"; // day, week, month

    // Calculate date range
    let startDate: Date;
    const endDate = new Date();

    switch (period) {
      case "7d":
        startDate = subDays(endDate, 7);
        break;
      case "30d":
        startDate = subDays(endDate, 30);
        break;
      case "90d":
        startDate = subDays(endDate, 90);
        break;
      case "all":
      default:
        startDate = new Date(2024, 0, 1); // Beginning of 2024
    }

    // Get all calls from database
    const allCalls = Object.values(global.aiCallsDb || {});

    // Filter calls by date range
    const filteredCalls = allCalls.filter((call) => {
      const callDate = new Date(call.startTime);
      return callDate >= startDate && callDate <= endDate;
    });

    // Calculate metrics
    const totalCalls = filteredCalls.length;
    const completedCalls = filteredCalls.filter(
      (c) => c.status === "COMPLETED",
    );
    const failedCalls = filteredCalls.filter((c) => c.status === "FAILED");
    const aiCalls = filteredCalls.filter((c) => c.mode === "AI");
    const humanCalls = filteredCalls.filter((c) => c.mode === "HUMAN");
    const hybridCalls = filteredCalls.filter((c) => c.mode === "HYBRID");

    // Calculate success metrics
    const qualifiedLeads = completedCalls.filter(
      (c) => c.outcome === "Qualified",
    ).length;
    const avgDuration =
      completedCalls.length > 0
        ? Math.round(
            completedCalls.reduce((sum, c) => sum + (c.duration || 0), 0) /
              completedCalls.length,
          )
        : 0;
    const avgSentiment =
      completedCalls.length > 0
        ? Math.round(
            completedCalls.reduce((sum, c) => sum + (c.sentiment || 50), 0) /
              completedCalls.length,
          )
        : 50;

    // Calculate AI performance
    const aiSuccessRate =
      aiCalls.length > 0
        ? Math.round(
            (aiCalls.filter(
              (c) => c.status === "COMPLETED" && !c.transferredToHuman,
            ).length /
              aiCalls.length) *
              100,
          )
        : 0;
    const aiQualificationRate =
      aiCalls.length > 0
        ? Math.round(
            (aiCalls.filter((c) => c.outcome === "Qualified").length /
              aiCalls.length) *
              100,
          )
        : 0;

    // Calculate cost metrics (mock values)
    const costPerCall = {
      ai: 4.8,
      human: 26.5,
      hybrid: 15.2,
    };

    const totalCost =
      aiCalls.length * costPerCall.ai +
      humanCalls.length * costPerCall.human +
      hybridCalls.length * costPerCall.hybrid;

    const avgCostPerCall = totalCalls > 0 ? totalCost / totalCalls : 0;

    // Time series data
    const timeSeriesData = generateTimeSeriesData(filteredCalls, groupBy);

    // Top performing campaigns
    const campaignMetrics = calculateCampaignMetrics(filteredCalls);

    // Objection analysis
    const objectionAnalysis = generateObjectionAnalysis(filteredCalls);

    // AI learning metrics
    const learningMetrics = {
      responseAccuracy: {
        current: 91,
        baseline: 72,
        improvement: 19,
      },
      objectionHandling: {
        current: 88,
        baseline: 65,
        improvement: 23,
      },
      leadQualification: {
        current: 82,
        baseline: 58,
        improvement: 24,
      },
      naturalConversation: {
        current: 89,
        baseline: 70,
        improvement: 19,
      },
    };

    const response = {
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        days: Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ),
      },
      overview: {
        totalCalls,
        completedCalls: completedCalls.length,
        failedCalls: failedCalls.length,
        successRate:
          totalCalls > 0
            ? Math.round((completedCalls.length / totalCalls) * 100)
            : 0,
      },
      callTypes: {
        ai: aiCalls.length,
        human: humanCalls.length,
        hybrid: hybridCalls.length,
      },
      performance: {
        qualifiedLeads,
        qualificationRate:
          completedCalls.length > 0
            ? Math.round((qualifiedLeads / completedCalls.length) * 100)
            : 0,
        avgDuration,
        avgSentiment,
        aiSuccessRate,
        aiQualificationRate,
      },
      cost: {
        total: Math.round(totalCost * 100) / 100,
        avgPerCall: Math.round(avgCostPerCall * 100) / 100,
        breakdown: {
          ai: Math.round(aiCalls.length * costPerCall.ai * 100) / 100,
          human: Math.round(humanCalls.length * costPerCall.human * 100) / 100,
          hybrid:
            Math.round(hybridCalls.length * costPerCall.hybrid * 100) / 100,
        },
        savings:
          Math.round(
            (humanCalls.length * costPerCall.human - totalCost) * 100,
          ) / 100,
      },
      timeSeries: timeSeriesData,
      campaigns: campaignMetrics,
      objections: objectionAnalysis,
      aiLearning: learningMetrics,
    };

    // Log security event
    logSecurityEvent({
      ip: request.ip || "unknown",
      method: "GET",
      path: "/api/calls/analytics",
      userAgent: request.headers.get("user-agent") || "unknown",
      userId: user.userId,
      action: "view_analytics",
      result: "success",
      details: { period, groupBy },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching analytics:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function generateTimeSeriesData(calls: any[], groupBy: string) {
  // Group calls by date
  const grouped = new Map<string, any[]>();

  calls.forEach((call) => {
    const date = new Date(call.startTime);
    let key: string = "";

    switch (groupBy) {
      case "day":
        key = date.toISOString().split("T")[0]!;
        break;
      case "week":
        // Get week number
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split("T")[0]!;
        break;
      case "month":
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
        break;
      default:
        key = date.toISOString().split("T")[0]!;
    }

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(call);
  });

  // Convert to array and calculate metrics
  return Array.from(grouped.entries())
    .map(([date, dateCalls]) => ({
      date,
      totalCalls: dateCalls.length,
      completedCalls: dateCalls.filter((c) => c.status === "COMPLETED").length,
      qualifiedLeads: dateCalls.filter((c) => c.outcome === "Qualified").length,
      aiCalls: dateCalls.filter((c) => c.mode === "AI").length,
      humanCalls: dateCalls.filter((c) => c.mode === "HUMAN").length,
      avgDuration:
        dateCalls.length > 0
          ? Math.round(
              dateCalls.reduce((sum, c) => sum + (c.duration || 0), 0) /
                dateCalls.length,
            )
          : 0,
      avgSentiment:
        dateCalls.length > 0
          ? Math.round(
              dateCalls.reduce((sum, c) => sum + (c.sentiment || 50), 0) /
                dateCalls.length,
            )
          : 50,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function calculateCampaignMetrics(calls: any[]) {
  const campaignMap = new Map<string, any[]>();

  calls.forEach((call) => {
    const campaignId = call.campaignId || "default";
    if (!campaignMap.has(campaignId)) {
      campaignMap.set(campaignId, []);
    }
    campaignMap.get(campaignId)!.push(call);
  });

  return Array.from(campaignMap.entries())
    .map(([campaignId, campaignCalls]) => ({
      campaignId,
      name: `Campaign ${campaignId}`, // In real implementation, fetch campaign name
      totalCalls: campaignCalls.length,
      qualifiedLeads: campaignCalls.filter((c) => c.outcome === "Qualified")
        .length,
      conversionRate:
        campaignCalls.length > 0
          ? Math.round(
              (campaignCalls.filter((c) => c.outcome === "Qualified").length /
                campaignCalls.length) *
                100,
            )
          : 0,
      avgDuration:
        campaignCalls.length > 0
          ? Math.round(
              campaignCalls.reduce((sum, c) => sum + (c.duration || 0), 0) /
                campaignCalls.length,
            )
          : 0,
    }))
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5); // Top 5 campaigns
}

function generateObjectionAnalysis(calls: any[]) {
  // Mock objection data
  const objections = [
    { type: "Too expensive", count: 145, handled: 89, avgHandleTime: 45 },
    {
      type: "Happy with current solution",
      count: 132,
      handled: 78,
      avgHandleTime: 38,
    },
    {
      type: "Need to think about it",
      count: 98,
      handled: 92,
      avgHandleTime: 25,
    },
    {
      type: "Not the decision maker",
      count: 87,
      handled: 95,
      avgHandleTime: 20,
    },
    { type: "Bad timing", count: 76, handled: 84, avgHandleTime: 15 },
  ];

  return objections.map((obj) => ({
    objection: obj.type,
    occurrences: obj.count,
    handledSuccessfully: obj.handled,
    handlingRate: Math.round((obj.handled / obj.count) * 100),
    avgHandleTime: obj.avgHandleTime,
  }));
}

// Global type declarations
declare global {
  var aiCallsDb: Record<string, any>;
}
