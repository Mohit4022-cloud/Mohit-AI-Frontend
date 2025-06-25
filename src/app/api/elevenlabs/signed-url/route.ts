import { NextRequest, NextResponse } from "next/server";

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

    console.log('Server: Getting signed URL for agent:', agent_id);
    console.log('Server: API Key length:', apiKey.length);

    // ElevenLabs Conversational AI uses a different endpoint
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agent_id}/conversation`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // Optional conversation configuration
        conversation_config: {
          transcription: {
            enabled: true,
            provider: "elevenlabs"
          }
        }
      })
    });

    console.log('Server: ElevenLabs response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server: ElevenLabs error:', errorText);
      return NextResponse.json(
        { error: `ElevenLabs API error: ${response.status} ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Server: Error getting signed URL:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}