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

// Simple resampler class for audio resampling
class Resampler {
  fromSampleRate: number;
  toSampleRate: number;
  channels: number;
  inputBufferSize: number;
  outputBufferSize: number;
  resampler: (input: Float32Array) => Float32Array;

  constructor(fromSampleRate: number, toSampleRate: number, channels: number, inputBufferSize: number) {
    this.fromSampleRate = fromSampleRate;
    this.toSampleRate = toSampleRate;
    this.channels = channels;
    this.inputBufferSize = inputBufferSize;
    
    const resampleRatio = toSampleRate / fromSampleRate;
    this.outputBufferSize = Math.round(inputBufferSize * resampleRatio);
    
    this.resampler = (input: Float32Array): Float32Array => {
      const output = new Float32Array(this.outputBufferSize);
      const resampleRatio = this.toSampleRate / this.fromSampleRate;
      
      for (let i = 0; i < this.outputBufferSize; i++) {
        const srcIndex = i / resampleRatio;
        const srcIndexFloor = Math.floor(srcIndex);
        const srcIndexCeil = Math.ceil(srcIndex);
        const fraction = srcIndex - srcIndexFloor;
        
        if (srcIndexCeil >= input.length) {
          output[i] = input[input.length - 1];
        } else {
          // Linear interpolation
          output[i] = input[srcIndexFloor] * (1 - fraction) + input[srcIndexCeil] * fraction;
        }
      }
      
      return output;
    };
  }
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
  const audioContextRef = useRef<AudioContext | null>(null);
  const isRecordingRef = useRef(false);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const resamplerRef = useRef<any>(null);
  
  // Audio playback system
  const playbackContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const nextStartTimeRef = useRef(0);
  const gainNodeRef = useRef<GainNode | null>(null);
  const mp3QueueRef = useRef<string[]>([]);
  const isPlayingMP3Ref = useRef(false);

  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      connectToVoiceAI();
    }
    
    return () => {
      disconnect().catch(console.error);
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
        stopRecording().catch(console.error);
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
        // Check for audio format - ElevenLabs defaults to MP3
        if (data.conversation_initiation_metadata_event?.agent_output_audio_format) {
          console.log('Audio format:', data.conversation_initiation_metadata_event.agent_output_audio_format);
        }
        break;
        
      case 'audio':
        if (data.audio_event?.audio_base_64) {
          console.log('Processing audio chunk, length:', data.audio_event.audio_base_64.length, 'muted:', isMuted);
          if (!isMuted) {
            // ElevenLabs sends MP3 audio by default
            playMP3Audio(data.audio_event.audio_base_64);
          }
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
          stopRecording().catch(console.error);
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

  const playMP3Audio = async (base64Audio: string) => {
    // Add to MP3 queue
    mp3QueueRef.current.push(base64Audio);
    console.log('Added MP3 to queue, size:', mp3QueueRef.current.length);
    
    // Process queue if not already playing
    if (!isPlayingMP3Ref.current) {
      processMP3Queue();
    }
  };

  const processMP3Queue = async () => {
    if (isPlayingMP3Ref.current || mp3QueueRef.current.length === 0) {
      return;
    }
    
    isPlayingMP3Ref.current = true;
    
    while (mp3QueueRef.current.length > 0) {
      const base64Audio = mp3QueueRef.current.shift();
      if (base64Audio) {
        await playMP3Chunk(base64Audio);
      }
    }
    
    isPlayingMP3Ref.current = false;
  };

  const playMP3Chunk = async (base64Audio: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // Initialize audio context if needed
        initializeAudioContext();
        
        // Decode base64 to binary
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Create a blob with MP3 mime type
        const audioBlob = new Blob([bytes], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create audio element
        const audio = new Audio(audioUrl);
        audio.volume = isMuted ? 0 : 1;
        
        // Resolve when playback ends
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          console.log('MP3 chunk playback finished');
          resolve();
        };
        
        // Handle errors
        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          URL.revokeObjectURL(audioUrl);
          resolve(); // Continue with next chunk even if this one fails
        };
        
        // Play the audio
        audio.play().then(() => {
          console.log('Started MP3 chunk playback');
        }).catch((error) => {
          console.error('Failed to play audio:', error);
          URL.revokeObjectURL(audioUrl);
          resolve();
        });
        
      } catch (error) {
        console.error('Error in playMP3Chunk:', error);
        resolve();
      }
    });
  };

  const addToAudioQueue = (base64Audio: string) => {
    console.log('Adding audio to queue, current queue size:', audioQueueRef.current.length);
    audioQueueRef.current.push(base64Audio);
    
    if (!isPlayingRef.current) {
      processAudioQueue();
    }
  };

  const processAudioQueue = async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return;
    }
    
    isPlayingRef.current = true;
    
    while (audioQueueRef.current.length > 0) {
      const base64Audio = audioQueueRef.current.shift();
      if (base64Audio) {
        await playAudioChunk(base64Audio);
      }
    }
    
    isPlayingRef.current = false;
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
        
        // Play the audio buffer
        await playBuffer(audioBuffer);
      }
    } catch (error) {
      console.error('Error processing audio chunk:', error);
    }
  };

  // Convert Float32Array to 16-bit PCM
  const float32ToPCM16 = (float32Array: Float32Array): Uint8Array => {
    const pcm16 = new Uint8Array(float32Array.length * 2);
    
    for (let i = 0; i < float32Array.length; i++) {
      // Clamp to [-1, 1]
      let sample = Math.max(-1, Math.min(1, float32Array[i]));
      
      // Convert to 16-bit signed integer
      const int16 = Math.round(sample * 32767);
      
      // Write as little-endian bytes
      pcm16[i * 2] = int16 & 0xFF;
      pcm16[i * 2 + 1] = (int16 >> 8) & 0xFF;
    }
    
    return pcm16;
  };

  // Convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const pcmToAudioBuffer = async (pcmData: Uint8Array, audioContext: AudioContext): Promise<AudioBuffer | null> => {
    try {
      // PCM parameters: 16-bit, mono, 16kHz
      const inputSampleRate = 16000;
      const numChannels = 1;
      const bytesPerSample = 2; // 16-bit
      
      // Calculate number of samples
      const numSamples = pcmData.length / bytesPerSample;
      
      // Create AudioBuffer at the audio context's sample rate
      const outputSampleRate = audioContext.sampleRate;
      const resampledLength = Math.ceil(numSamples * outputSampleRate / inputSampleRate);
      const audioBuffer = audioContext.createBuffer(numChannels, resampledLength, outputSampleRate);
      
      // Get channel data
      const channelData = audioBuffer.getChannelData(0);
      
      // Convert 16-bit PCM to float32 with resampling
      const resampleRatio = outputSampleRate / inputSampleRate;
      
      for (let i = 0; i < resampledLength; i++) {
        const srcIndex = i / resampleRatio;
        const srcIndexFloor = Math.floor(srcIndex);
        const srcIndexCeil = Math.ceil(srcIndex);
        const fraction = srcIndex - srcIndexFloor;
        
        if (srcIndexCeil >= numSamples) {
          // Use last sample
          const lastIndex = numSamples - 1;
          const sample = (pcmData[lastIndex * 2] | (pcmData[lastIndex * 2 + 1] << 8));
          const signedSample = sample > 32767 ? sample - 65536 : sample;
          channelData[i] = signedSample / 32768;
        } else {
          // Linear interpolation between samples
          const sample1 = (pcmData[srcIndexFloor * 2] | (pcmData[srcIndexFloor * 2 + 1] << 8));
          const signedSample1 = sample1 > 32767 ? sample1 - 65536 : sample1;
          
          const sample2 = (pcmData[srcIndexCeil * 2] | (pcmData[srcIndexCeil * 2 + 1] << 8));
          const signedSample2 = sample2 > 32767 ? sample2 - 65536 : sample2;
          
          // Interpolate
          const float1 = signedSample1 / 32768;
          const float2 = signedSample2 / 32768;
          channelData[i] = float1 * (1 - fraction) + float2 * fraction;
        }
      }
      
      return audioBuffer;
    } catch (error) {
      console.error('Error converting PCM to AudioBuffer:', error);
      return null;
    }
  };

  const playBuffer = async (audioBuffer: AudioBuffer): Promise<void> => {
    if (!playbackContextRef.current) {
      console.error('Audio context not available');
      return;
    }
    
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
      
      // Wait for this chunk to finish
      await new Promise<void>((resolve) => {
        source.onended = () => resolve();
      });
    } catch (error) {
      console.error('Error playing audio buffer:', error);
    }
  };

  const startRecording = async () => {
    try {
      console.log('Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1, // Mono
          sampleRate: { ideal: 16000 }, // Request 16kHz if possible
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      console.log('Microphone permission granted');
      
      // Store the stream reference
      mediaStreamRef.current = stream;
      
      // Initialize audio context for processing
      // Try to create with native sample rate first
      const track = stream.getAudioTracks()[0];
      const settings = track.getSettings();
      const sampleRate = settings.sampleRate || 48000; // Default to 48kHz if not available
      
      console.log('Microphone sample rate:', sampleRate);
      
      audioContextRef.current = new AudioContext({ sampleRate });
      
      // Create source node from stream
      const source = audioContextRef.current.createMediaStreamSource(stream);
      
      // Create script processor for real-time processing
      // Buffer size: 4096 samples (good balance between latency and performance)
      const bufferSize = 4096;
      scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(bufferSize, 1, 1);
      
      // Set up resampler if needed
      if (sampleRate !== 16000) {
        resamplerRef.current = new Resampler(sampleRate, 16000, 1, bufferSize);
      }
      
      // Process audio in real-time
      scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
        if (!isRecordingRef.current || wsRef.current?.readyState !== WebSocket.OPEN) {
          return;
        }
        
        // Get input samples
        const inputBuffer = audioProcessingEvent.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);
        
        // Clear output to prevent hearing your own voice
        const outputBuffer = audioProcessingEvent.outputBuffer;
        const outputData = outputBuffer.getChannelData(0);
        outputData.fill(0);
        
        // Resample if necessary
        let processedData: Float32Array;
        if (resamplerRef.current) {
          processedData = resamplerRef.current.resampler(inputData);
        } else {
          processedData = new Float32Array(inputData);
        }
        
        // Convert to 16-bit PCM
        const pcmData = float32ToPCM16(processedData);
        
        // Convert to base64
        const base64 = arrayBufferToBase64(pcmData.buffer);
        
        // Send to WebSocket
        if (wsRef.current?.readyState === WebSocket.OPEN && isRecordingRef.current) {
          wsRef.current.send(JSON.stringify({
            user_audio_chunk: base64
          }));
        }
      };
      
      // Connect the audio graph
      source.connect(scriptProcessorRef.current);
      scriptProcessorRef.current.connect(audioContextRef.current.destination);
      
      setIsRecording(true);
      isRecordingRef.current = true;
      console.log('Started real-time PCM recording');
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Microphone access denied. Please allow microphone access.');
    }
  };


  const stopRecording = async () => {
    // Stop recording first
    setIsRecording(false);
    isRecordingRef.current = false;
    
    // Disconnect script processor
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    
    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    // Clear resampler
    resamplerRef.current = null;
    
    // Send end of stream signal
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('Sending end of audio signal');
      wsRef.current.send(JSON.stringify({
        user_audio_chunk: ""  // Empty chunk signals end of audio
      }));
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const disconnect = async () => {
    await stopRecording();
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
    // Clear audio queues
    audioQueueRef.current = [];
    mp3QueueRef.current = [];
    isPlayingRef.current = false;
    isPlayingMP3Ref.current = false;
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