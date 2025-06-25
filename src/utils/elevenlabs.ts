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
  public websocket: WebSocket | null = null;
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
        console.log('Initializing ElevenLabs connection...');
        console.log('Agent ID:', this.config.agentId);

        // Direct WebSocket connection to ElevenLabs
        const websocketUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.config.agentId}`;
        console.log('Connecting to:', websocketUrl);
        
        this.websocket = new WebSocket(websocketUrl);

        this.websocket.onopen = () => {
          console.log('WebSocket connected');
          this.isConnected = true;
          console.log('ElevenLabs Conversational AI ready');
          resolve();
        };

        this.websocket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(new Error('WebSocket connection failed'));
        };

        this.websocket.onclose = () => {
          this.isConnected = false;
          console.log('ElevenLabs connection closed');
        };
      } catch (error) {
        console.error('Connection error:', error);
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
      type: 'user_text_input',
      text: message
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
      type: 'user_audio_input',
      audio: base64Audio
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