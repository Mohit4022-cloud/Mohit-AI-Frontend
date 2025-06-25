interface ElevenLabsConfig {
  apiKey: string;
  agentId: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class ElevenLabsConversationalAI {
  private config: ElevenLabsConfig;
  private websocket: WebSocket | null = null;
  private isConnected = false;
  private audioContext: AudioContext | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(config: ElevenLabsConfig) {
    this.config = config;
  }

  // Initialize WebSocket connection for real-time conversation
  async initializeConnection(): Promise<void> {
    try {
      console.log('Initializing ElevenLabs connection...');
      console.log('Agent ID:', this.config.agentId);

      // First, create a conversation session through our API
      const response = await fetch('/api/elevenlabs/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: this.config.agentId
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create conversation session');
      }

      const { websocket_url, api_key } = await response.json();
      console.log('Got WebSocket URL, connecting...');

      // Connect to the WebSocket URL
      this.websocket = new WebSocket(websocket_url);

      return new Promise((resolve, reject) => {
        this.websocket!.onopen = () => {
          console.log('WebSocket connected, authenticating...');
          
          // Send authentication with API key from server
          const authMessage = {
            type: "authentication",
            payload: {
              xi_api_key: api_key
            }
          };
          
          this.websocket!.send(JSON.stringify(authMessage));
          
          // Wait a bit then send initialization
          setTimeout(() => {
            const initMessage = {
              type: "conversation_initiation_client_data",
              conversation_config_override: {
                agent: {
                  agent_id: this.config.agentId,
                  voice: {
                    voice_id: "21m00Tcm4TlvDq8ikWAM" // Default voice
                  }
                }
              }
            };
            
            this.websocket!.send(JSON.stringify(initMessage));
            
            this.isConnected = true;
            console.log('ElevenLabs Conversational AI ready');
            resolve();
          }, 100);
        };

        this.websocket!.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(new Error('WebSocket connection failed'));
        };

        this.websocket!.onclose = () => {
          this.isConnected = false;
          console.log('ElevenLabs connection closed');
        };
      });
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }

  // Send text message to AI
  async sendTextMessage(message: string): Promise<void> {
    if (!this.websocket || !this.isConnected) {
      throw new Error('Not connected to ElevenLabs');
    }

    const payload = {
      user_audio_chunk: null,
      text: message,
      try_trigger_generation: true
    };

    this.websocket.send(JSON.stringify(payload));
  }

  // Start voice recording
  async startVoiceRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialize AudioContext for real-time processing
      this.audioContext = new AudioContext({ sampleRate: 16000 });
      
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          // Send audio chunk to ElevenLabs in real-time
          this.sendAudioChunk(event.data);
        }
      };

      this.mediaRecorder.start(100); // Send chunks every 100ms for real-time processing
    } catch (error) {
      console.error('Error starting voice recording:', error);
      throw error;
    }
  }

  // Send audio chunk to ElevenLabs
  private async sendAudioChunk(audioBlob: Blob): Promise<void> {
    if (!this.websocket || !this.isConnected) return;

    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const payload = {
      user_audio_chunk: base64Audio,
      text: null,
      try_trigger_generation: false
    };

    this.websocket.send(JSON.stringify(payload));
  }

  // Stop voice recording
  stopVoiceRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }

  // Set up message handlers
  onMessage(callback: (message: any) => void): void {
    if (this.websocket) {
      this.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
      };
    }
  }

  // Clean up connection
  disconnect(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.stopVoiceRecording();
  }
}

export type { ConversationMessage };