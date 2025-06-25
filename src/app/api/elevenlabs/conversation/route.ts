import { NextRequest, NextResponse } from "next/server";

// This endpoint gets a signed URL for private agents
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent_id } = body;

    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    console.log('Getting signed URL for agent:', agent_id);

    // Try to get a signed URL for the agent
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agent_id}`, {
      method: 'GET',
      headers: {
        'xi-api-key': apiKey,
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Got signed URL successfully');
      return NextResponse.json({
        websocket_url: data.signed_url,
        agent_id: agent_id,
        is_public: false
      });
    } else if (response.status === 404 || response.status === 403) {
      // Agent might be public, use direct URL
      console.log('Agent appears to be public, using direct WebSocket URL');
      const websocketUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agent_id}`;
      return NextResponse.json({
        websocket_url: websocketUrl,
        agent_id: agent_id,
        is_public: true
      });
    } else {
      const errorText = await response.text();
      console.error('Error getting signed URL:', response.status, errorText);
      throw new Error(`Failed to get signed URL: ${response.status}`);
    }

  } catch (error) {
    console.error('Error in conversation endpoint:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}