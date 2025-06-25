import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';

interface TryAIVoiceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const TryAIVoice: React.FC<TryAIVoiceProps> = ({ isOpen, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      connectToVoiceAI();
    }
    
    return () => {
      disconnect();
    };
  }, [isOpen]);

  const connectToVoiceAI = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Connect to our WebSocket proxy server
      const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_01jx1w1hf3e68v6n8510t90ww0';
      const wsUrl = `ws://localhost:3002/?agent_id=${agentId}`;
      
      console.log('Connecting to WebSocket proxy...');
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('Connected to proxy server');
      };

      wsRef.current.onmessage = async (event) => {
        // Check if it's binary data (audio)
        if (event.data instanceof Blob) {
          console.log('Received binary audio data, size:', event.data.size);
          // Skip audio playback for now - focus on text conversation
          return;
        } else {
          // It's text/JSON data
          try {
            const data = JSON.parse(event.data);
            console.log('Received message:', data);
            handleWebSocketMessage(data);
          } catch (e) {
            console.error('Failed to parse message:', e);
            console.log('Raw message:', event.data);
          }
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error. Make sure the WebSocket server is running.');
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket closed');
        setIsConnected(false);
        setIsRecording(false);
      };

    } catch (err) {
      console.error('Connection error:', err);
      setError('Failed to connect. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case 'connected':
        setIsConnected(true);
        setMessages([{
          role: 'assistant',
          content: 'Hi! I\'m Mohit AI. You can talk to me using your voice. Click the microphone to start.',
          timestamp: new Date()
        }]);
        break;
        
      case 'conversation_initiation_metadata':
        console.log('Conversation initialized:', data);
        break;
        
      case 'audio':
        if (!isMuted && data.audio_event?.audio_base_64) {
          playAudioChunk(data.audio_event.audio_base_64);
        }
        break;
        
      case 'agent_response':
        if (data.agent_response_event?.text) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: data.agent_response_event.text,
            timestamp: new Date()
          }]);
        }
        break;
        
      case 'user_transcript':
        if (data.user_transcript_event?.text) {
          setMessages(prev => [...prev, {
            role: 'user',
            content: data.user_transcript_event.text,
            timestamp: new Date()
          }]);
        }
        break;
        
      case 'error':
        setError(data.message || 'An error occurred');
        break;
    }
  };

  const playAudioChunk = (base64Audio: string) => {
    try {
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }
      
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(console.error);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialize audio context
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
          // Convert to base64 and send
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result?.toString().split(',')[1];
            if (base64) {
              wsRef.current?.send(JSON.stringify({
                type: 'user_audio_input',
                audio: base64
              }));
            }
          };
          reader.readAsDataURL(event.data);
        }
      };

      mediaRecorderRef.current.start(100); // Send chunks every 100ms
      setIsRecording(true);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const disconnect = () => {
    stopRecording();
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsConnected(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Try Mohit Voice AI</h2>
              <p className="text-sm text-gray-500">
                {isConnecting ? 'Connecting...' : 
                 isConnected ? 'Connected • Speak naturally' : 
                 'Real-time voice conversation'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-lg ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
            <button 
              onClick={connectToVoiceAI}
              className="text-red-600 underline text-sm mt-1"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Control Area */}
        <div className="border-t p-4">
          <div className="flex items-center justify-center space-x-4">
            {isConnected ? (
              <>
                <button
                  onClick={toggleRecording}
                  disabled={!isConnected}
                  className={`p-4 rounded-full transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white hover:bg-red-600 scale-110' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <span className="text-sm text-gray-500">
                  {isRecording ? 'Click to stop' : 'Click to speak'}
                </span>
              </>
            ) : (
              <button
                onClick={connectToVoiceAI}
                disabled={isConnecting}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Start Voice Conversation'}
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Powered by ElevenLabs Conversational AI
          </p>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Note: Make sure the WebSocket server is running (npm run dev:ws)
          </p>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
};