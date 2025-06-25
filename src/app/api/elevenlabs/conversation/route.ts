import { NextRequest, NextResponse } from "next/server";

// This endpoint creates a conversation session and returns the WebSocket URL
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

    console.log('Setting up ElevenLabs WebSocket for agent:', agent_id);

    // ElevenLabs Conversational AI WebSocket URL
    // Based on their documentation, the WebSocket URL includes the agent ID as a query parameter
    const websocketUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agent_id}`;
    
    // We'll pass the API key to the client to authenticate after connection
    return NextResponse.json({
      websocket_url: websocketUrl,
      agent_id: agent_id,
      api_key: apiKey, // The client needs this for authentication
      requires_auth: true
    });

  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}