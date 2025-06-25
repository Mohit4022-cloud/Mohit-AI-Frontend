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
  const isRecordingRef = useRef(false);
  
  // Audio playback system
  const playbackContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const nextStartTimeRef = useRef(0);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      connectToVoiceAI();
    }
    
    return () => {
      disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    // Update gain when mute state changes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : 1;
    }
  }, [isMuted]);

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
        // Don't send any initialization - let ElevenLabs handle it
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
            console.log('Received message type:', data.type);
            if (data.type === 'audio') {
              console.log('Received audio event, has audio:', !!data.audio_event?.audio_base_64);
            }
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
        isRecordingRef.current = false;
        stopRecording();
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
        if (data.audio_event?.audio_base_64) {
          console.log('Processing audio chunk, length:', data.audio_event.audio_base_64.length);
          playAudioChunk(data.audio_event.audio_base_64);
        } else {
          console.warn('Received audio event without audio data');
        }
        break;
        
      case 'agent_response':
        if (data.agent_response_event?.agent_response) {
          console.log('Agent said:', data.agent_response_event.agent_response);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: data.agent_response_event.agent_response,
            timestamp: new Date()
          }]);
          // Stop recording immediately after agent responds
          stopRecording();
          // Close the connection after a short delay to allow audio to finish playing
          setTimeout(() => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              console.log('Closing connection after agent response');
              wsRef.current.close();
            }
          }, 2000);
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

  const initializeAudioContext = async () => {
    if (!playbackContextRef.current) {
      try {
        // Try to create with 16kHz sample rate
        playbackContextRef.current = new AudioContext({ sampleRate: 16000 });
      } catch (error) {
        console.warn('Failed to create 16kHz context, using default sample rate');
        playbackContextRef.current = new AudioContext();
      }
      
      console.log('Audio context initialized with sample rate:', playbackContextRef.current.sampleRate);
      
      // Create gain node for volume control
      gainNodeRef.current = playbackContextRef.current.createGain();
      gainNodeRef.current.connect(playbackContextRef.current.destination);
      gainNodeRef.current.gain.value = isMuted ? 0 : 1;
    }
    
    // Resume audio context if it's suspended (browser autoplay policy)
    if (playbackContextRef.current.state === 'suspended') {
      try {
        await playbackContextRef.current.resume();
        console.log('Audio context resumed');
      } catch (error) {
        console.error('Failed to resume audio context:', error);
      }
    }
  };

  const playAudioChunk = async (base64Audio: string) => {
    try {
      // Initialize audio context if needed
      await initializeAudioContext();
      
      if (!playbackContextRef.current) {
        console.error('Audio context not initialized');
        return;
      }

      // Decode base64 to binary
      const binaryString = atob(base64Audio);
      const length = binaryString.length;
      const bytes = new Uint8Array(length);
      
      for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Convert PCM data to AudioBuffer
      // ElevenLabs sends 16-bit PCM at 16kHz, mono
      const audioBuffer = await pcmToAudioBuffer(bytes, playbackContextRef.current);
      
      if (audioBuffer) {
        console.log('Created audio buffer:', {
          duration: audioBuffer.duration,
          length: audioBuffer.length,
          sampleRate: audioBuffer.sampleRate,
          numberOfChannels: audioBuffer.numberOfChannels
        });
        
        // Add to queue
        audioQueueRef.current.push(audioBuffer);
        
        // Start playback if not already playing
        if (!isPlayingRef.current) {
          console.log('Starting audio playback');
          processAudioQueue();
        }
      }
    } catch (error) {
      console.error('Error processing audio chunk:', error);
    }
  };

  const pcmToAudioBuffer = async (pcmData: Uint8Array, audioContext: AudioContext): Promise<AudioBuffer | null> => {
    try {
      // PCM parameters: 16-bit, mono, 16kHz
      const sampleRate = 16000;
      const numChannels = 1;
      const bytesPerSample = 2; // 16-bit
      
      // Calculate number of samples
      const numSamples = pcmData.length / bytesPerSample;
      
      // Create AudioBuffer - use context's sample rate to avoid resampling issues
      const audioBuffer = audioContext.createBuffer(numChannels, numSamples, audioContext.sampleRate);
      
      // Get channel data
      const channelData = audioBuffer.getChannelData(0);
      
      // Convert 16-bit PCM to float32
      for (let i = 0; i < numSamples; i++) {
        // Read 16-bit signed integer (little-endian)
        const sample = (pcmData[i * 2] | (pcmData[i * 2 + 1] << 8));
        // Convert to signed 16-bit
        const signedSample = sample > 32767 ? sample - 65536 : sample;
        // Normalize to -1 to 1 range
        channelData[i] = signedSample / 32768;
      }
      
      return audioBuffer;
    } catch (error) {
      console.error('Error converting PCM to AudioBuffer:', error);
      return null;
    }
  };

  const processAudioQueue = async () => {
    if (!playbackContextRef.current || audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }
    
    isPlayingRef.current = true;
    
    while (audioQueueRef.current.length > 0) {
      const audioBuffer = audioQueueRef.current.shift();
      if (!audioBuffer) continue;
      
      try {
        // Create buffer source
        const source = playbackContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        
        // Connect to gain node instead of directly to destination
        if (gainNodeRef.current) {
          source.connect(gainNodeRef.current);
        } else {
          source.connect(playbackContextRef.current.destination);
        }
        
        // Calculate when to start this chunk
        const currentTime = playbackContextRef.current.currentTime;
        const startTime = Math.max(currentTime, nextStartTimeRef.current);
        
        // Schedule playback
        source.start(startTime);
        
        // Update next start time to ensure gapless playback
        nextStartTimeRef.current = startTime + audioBuffer.duration;
        
        // Wait for this chunk to finish before processing next
        await new Promise<void>((resolve) => {
          source.onended = () => resolve();
        });
      } catch (error) {
        console.error('Error playing audio buffer:', error);
      }
    }
    
    isPlayingRef.current = false;
  };

  const startRecording = async () => {
    try {
      console.log('Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone permission granted');
      
      // Initialize audio context
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      
      // Try different mime types based on browser support
      const mimeTypes = [
        'audio/webm;codecs=pcm',
        'audio/webm;codecs=opus', 
        'audio/webm',
        'audio/ogg;codecs=opus'
      ];
      
      let selectedMimeType = 'audio/webm';
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          console.log('Using mime type:', selectedMimeType);
          break;
        }
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: selectedMimeType,
        audioBitsPerSecond: 16000
      });
      console.log('MediaRecorder created');

      mediaRecorderRef.current.ondataavailable = async (event) => {
        console.log('Data available event fired, size:', event.data.size, 'isRecording:', isRecordingRef.current);
        // Send any non-empty chunks
        if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN && isRecordingRef.current) {
          console.log('Sending audio chunk, size:', event.data.size);
          // Convert audio to base64 and send
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result?.toString().split(',')[1];
            console.log('Base64 length:', base64?.length);
            if (base64 && wsRef.current?.readyState === WebSocket.OPEN && isRecordingRef.current) {
              wsRef.current.send(JSON.stringify({
                user_audio_chunk: base64
              }));
              console.log('Sent audio chunk to WebSocket');
            }
          };
          reader.readAsDataURL(event.data);
        } else {
          console.log('Not sending - conditions not met:', {
            size: event.data.size,
            wsOpen: wsRef.current?.readyState === WebSocket.OPEN,
            isRecording: isRecordingRef.current
          });
        }
      };

      mediaRecorderRef.current.start(100); // Send chunks every 100ms
      setIsRecording(true);
      isRecordingRef.current = true;
      console.log('Started recording, isRecording:', true);
      
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
      isRecordingRef.current = false;
      
      // Send end of stream signal
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        console.log('Sending end of audio signal');
        wsRef.current.send(JSON.stringify({
          user_audio_chunk: ""  // Empty chunk signals end of audio
        }));
      }
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
    if (playbackContextRef.current) {
      playbackContextRef.current.close();
      playbackContextRef.current = null;
    }
    // Clear audio queue
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    nextStartTimeRef.current = 0;
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
          <div className="flex items-center justify-center space-x-4"
               onClick={() => initializeAudioContext()}>
            {isConnected ? (
              <>
                <button
                  onClick={toggleRecording}
                  disabled={!isConnected}
                  className={`p-4 rounded-full transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white hover:bg-red-600 scale-110 animate-pulse' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <span className="text-sm text-gray-500">
                  {isRecording ? 'Recording... Click to stop' : 'Click to start speaking'}
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