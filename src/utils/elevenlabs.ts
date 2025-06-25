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
    return new Promise((resolve, reject) => {
      try {
        // ElevenLabs WebSocket endpoint for Conversational AI 2.0
        // Include API key in the URL as a query parameter for browser compatibility
        const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.config.agentId}&xi_api_key=${this.config.apiKey}`;
        
        this.websocket = new WebSocket(wsUrl);

        this.websocket.onopen = () => {
          this.isConnected = true;
          console.log('ElevenLabs Conversational AI connected');
          resolve();
        };

        this.websocket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.websocket.onclose = () => {
          this.isConnected = false;
          console.log('ElevenLabs connection closed');
        };

      } catch (error) {
        reject(error);
      }
    });
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