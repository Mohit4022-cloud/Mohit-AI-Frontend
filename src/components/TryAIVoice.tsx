import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';
import { AudioDiagnostics } from './AudioDiagnostics';

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
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const nextStartTimeRef = useRef(0);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioFormatRef = useRef<string>('pcm_48000');
  const mp3QueueRef = useRef<string[]>([]);
  const isPlayingMP3Ref = useRef(false);
  const lastBase64AudioRef = useRef<string>('');

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
    // Prevent multiple simultaneous connections
    if (wsRef.current?.readyState === WebSocket.CONNECTING || 
        wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected or connecting');
      return;
    }
    
    setIsConnecting(true);
    setError(null);

    try {
      // Close any existing connection
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      
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
        try {
          // Check if the message is a Blob (binary data)
          if (event.data instanceof Blob) {
            console.log('Received binary message, size:', event.data.size);
            
            // Small blobs (< 1000 bytes) are likely JSON messages
            if (event.data.size < 1000) {
              // Convert small blob to text and try to parse as JSON
              const text = await event.data.text();
              try {
                const data = JSON.parse(text);
                console.log('Parsed JSON from blob:', data.type);
                handleWebSocketMessage(data);
              } catch (e) {
                // If not JSON, it might be small audio chunk
                console.log('Small binary data, might be audio');
                handleBinaryAudio(event.data);
              }
            } else {
              // Large blobs are audio data
              console.log('Received audio chunk, size:', event.data.size);
              handleBinaryAudio(event.data);
            }
          } 
          // If it's already a string, parse it as JSON
          else if (typeof event.data === 'string') {
            const data = JSON.parse(event.data);
            console.log('Received JSON message:', data.type);
            handleWebSocketMessage(data);
          }
        } catch (error) {
          console.error('Error processing message:', error);
          console.log('Raw data type:', typeof event.data);
          console.log('Raw data:', event.data);
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
        // Check for audio format
        if (data.conversation_initiation_metadata_event?.agent_output_audio_format) {
          audioFormatRef.current = data.conversation_initiation_metadata_event.agent_output_audio_format;
          console.log('Audio format:', audioFormatRef.current);
        }
        // Auto-start recording for seamless conversation
        if (!isRecording) {
          console.log('Auto-starting recording for conversation...');
          startRecording().catch(console.error);
        }
        break;
        
      case 'audio':
        if (data.audio_event?.audio_base_64) {
          // THIS IS THE FIX - Extract the actual audio data!
          const actualAudioBase64 = data.audio_event.audio_base_64;
          console.log('Audio format:', audioFormatRef.current);
          console.log('Processing audio chunk, base64 length:', actualAudioBase64.length);
          console.log('First 50 chars:', actualAudioBase64.substring(0, 50));
          
          if (!isMuted) {
            // If format says PCM but data looks like MP3, try MP3 playback
            const firstBytes = atob(actualAudioBase64.substring(0, 8));
            
            if (firstBytes.charCodeAt(0) === 0xFF && firstBytes.charCodeAt(1) === 0xFB) {
              console.log('Detected MP3 header, using MP3 playback');
              playMP3Audio(actualAudioBase64); // Pass ONLY the audio data
            } else if (audioFormatRef.current.startsWith('pcm_')) {
              // PCM audio format
              playPCMAudio(actualAudioBase64); // Pass ONLY the audio data
            } else {
              // MP3 format (fallback)
              playMP3Audio(actualAudioBase64); // Pass ONLY the audio data
            }
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
          // Keep connection open for continued conversation
          // Don't stop recording - let the user continue speaking
          console.log('Agent finished speaking, user can continue...');
        }
        break;
        
      case 'user_transcript':
        if (data.user_transcript_event?.text) {
          console.log('User said:', data.user_transcript_event.text);
          setMessages(prev => [...prev, {
            role: 'user',
            content: data.user_transcript_event.text,
            timestamp: new Date()
          }]);
        }
        break;
        
      case 'ping':
        // Handle ping messages - don't try to play them as audio!
        if (data.ping_event?.event_id && wsRef.current?.readyState === WebSocket.OPEN) {
          console.log('Responding to ping:', data.ping_event.event_id);
          wsRef.current.send(JSON.stringify({
            type: 'pong',
            event_id: data.ping_event.event_id
          }));
        }
        break;
        
      case 'error':
        setError(data.message || 'An error occurred');
        break;
        
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  const initializeAudioContext = async () => {
    if (!playbackContextRef.current) {
      try {
        // Create audio context with default sample rate (usually 48kHz)
        playbackContextRef.current = new AudioContext();
      } catch (error) {
        console.error('Failed to create audio context:', error);
        return;
      }
      
      console.log('Audio context initialized with sample rate:', playbackContextRef.current.sampleRate);
      
      // Create gain node for volume control
      gainNodeRef.current = playbackContextRef.current.createGain();
      gainNodeRef.current.connect(playbackContextRef.current.destination);
      gainNodeRef.current.gain.value = isMuted ? 0 : 1;
      console.log('Gain node created with volume:', gainNodeRef.current.gain.value);
    }
    
    // Resume audio context if it's suspended (browser autoplay policy)
    if (playbackContextRef.current.state === 'suspended') {
      try {
        await playbackContextRef.current.resume();
        console.log('Audio context resumed, state:', playbackContextRef.current.state);
      } catch (error) {
        console.error('Failed to resume audio context:', error);
      }
    }
  };

  const handleBinaryAudio = async (blob: Blob) => {
    try {
      console.log('Processing binary audio blob, size:', blob.size);
      
      // Option 1: If it's MP3 audio, play directly
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.volume = isMuted ? 0 : 1;
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        console.log('Binary audio playback finished');
      };
      
      audio.onerror = (e) => {
        console.error('Binary audio playback error:', e);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
      console.log('Started binary audio playback');
      
    } catch (error) {
      console.error('Error playing binary audio:', error);
    }
  };

  const playPCMAudio = async (base64Audio: string) => {
    try {
      console.log('=== PCM AUDIO DEBUG START ===');
      console.log('Base64 length:', base64Audio.length);
      console.log('First 50 chars of base64:', base64Audio.substring(0, 50));
      
      // Initialize audio context if needed
      await initializeAudioContext();
      
      if (!playbackContextRef.current) {
        console.error('Audio context not initialized');
        return;
      }
      
      // Decode base64 to binary
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      console.log('Binary size:', bytes.length);
      console.log('First 20 bytes:', Array.from(bytes.slice(0, 20)));
      
      // Handle odd-sized buffers
      let processedBytes = bytes;
      if (bytes.length % 2 !== 0) {
        console.warn('Odd-sized buffer, padding...');
        processedBytes = new Uint8Array(bytes.length + 1);
        processedBytes.set(bytes);
        processedBytes[bytes.length] = 0;
      }
      
      // Try different byte orders to see which one works
      console.log('=== TESTING BYTE ORDERS ===');
      
      // Method 1: Direct Int16Array (assumes little-endian)
      const pcmData = new Int16Array(processedBytes.buffer, 0, processedBytes.length / 2);
      
      // Check the range of PCM values
      let min = 32767, max = -32768;
      for (let i = 0; i < Math.min(1000, pcmData.length); i++) {
        if (pcmData[i] < min) min = pcmData[i];
        if (pcmData[i] > max) max = pcmData[i];
      }
      console.log('PCM value range:', { min, max });
      console.log('First 10 PCM samples:', Array.from(pcmData.slice(0, 10)));
      
      // If values are all near zero or very small, might be wrong format
      if (Math.abs(max) < 100 && Math.abs(min) < 100) {
        console.warn('⚠️ PCM values are suspiciously small - might be wrong format!');
      }
      
      // Convert to Float32
      const float32Data = new Float32Array(pcmData.length);
      for (let i = 0; i < pcmData.length; i++) {
        float32Data[i] = pcmData[i] / 32768.0;
      }
      
      // Check float values
      console.log('First 10 float samples:', Array.from(float32Data.slice(0, 10)));
      
      // Get sample rate
      let sampleRate = 48000;
      if (audioFormatRef.current && audioFormatRef.current.includes('_')) {
        sampleRate = parseInt(audioFormatRef.current.split('_')[1]) || 48000;
      }
      console.log('Sample rate:', sampleRate);
      console.log('Audio format:', audioFormatRef.current);
      
      // Create audio buffer
      const audioBuffer = playbackContextRef.current.createBuffer(1, float32Data.length, sampleRate);
      audioBuffer.copyToChannel(float32Data, 0);
      
      console.log('Audio buffer created:', {
        duration: audioBuffer.duration,
        length: audioBuffer.length,
        sampleRate: audioBuffer.sampleRate
      });
      
      // Add to queue
      if (audioQueueRef.current.length > 10) {
        console.warn('Audio queue too large, clearing old entries');
        audioQueueRef.current = audioQueueRef.current.slice(-5);
      }
      
      audioQueueRef.current.push(audioBuffer);
      console.log('Queue size:', audioQueueRef.current.length);
      console.log('=== PCM AUDIO DEBUG END ===');
      
      // Store for testing
      lastBase64AudioRef.current = base64Audio;
      
      // Process queue
      processAudioQueue();
      
    } catch (error) {
      console.error('Error in playPCMAudio:', error);
    }
  };

  const testAudioSystem = async () => {
    console.log('=== TESTING AUDIO SYSTEM WITH KNOWN GOOD AUDIO ===');
    
    await initializeAudioContext();
    if (!playbackContextRef.current) return;
    
    // Generate a 440Hz sine wave for 0.5 seconds
    const sampleRate = playbackContextRef.current.sampleRate;
    const duration = 0.5;
    const numSamples = sampleRate * duration;
    
    const audioBuffer = playbackContextRef.current.createBuffer(1, numSamples, sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    // Generate sine wave
    for (let i = 0; i < numSamples; i++) {
      channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.3;
    }
    
    // Play it
    const source = playbackContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    
    if (gainNodeRef.current) {
      source.connect(gainNodeRef.current);
    } else {
      source.connect(playbackContextRef.current.destination);
    }
    
    source.start();
    console.log('Test tone should be playing now - do you hear it?');
  };

  const checkAudioContextState = async () => {
    if (!playbackContextRef.current) {
      console.error('No audio context!');
      return;
    }
    
    console.log('Audio Context State:', {
      state: playbackContextRef.current.state,
      sampleRate: playbackContextRef.current.sampleRate,
      baseLatency: (playbackContextRef.current as any).baseLatency,
      currentTime: playbackContextRef.current.currentTime
    });
    
    if (playbackContextRef.current.state === 'suspended') {
      console.log('Resuming suspended audio context...');
      await playbackContextRef.current.resume();
    }
    
    // Check gain node
    if (gainNodeRef.current) {
      console.log('Gain node value:', gainNodeRef.current.gain.value);
    }
  };

  const testAlternativePCMProcessing = async (base64Audio: string) => {
    console.log('=== TESTING ALTERNATIVE PCM PROCESSING ===');
    
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Method 2: Manual byte order (try big-endian)
    const dataView = new DataView(bytes.buffer);
    const samples = bytes.length / 2;
    const pcmBigEndian = new Int16Array(samples);
    
    for (let i = 0; i < samples; i++) {
      // Try big-endian
      pcmBigEndian[i] = dataView.getInt16(i * 2, false); // false = big-endian
    }
    
    console.log('Big-endian first 10 samples:', Array.from(pcmBigEndian.slice(0, 10)));
    
    // Method 3: Try swapping bytes manually
    const pcmSwapped = new Int16Array(samples);
    for (let i = 0; i < samples; i++) {
      const low = bytes[i * 2];
      const high = bytes[i * 2 + 1];
      pcmSwapped[i] = (high << 8) | low; // Swap bytes
    }
    
    console.log('Byte-swapped first 10 samples:', Array.from(pcmSwapped.slice(0, 10)));
    
    // Method 4: Check if it's actually 8-bit data
    const pcm8bit = new Int16Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      // Convert 8-bit to 16-bit
      pcm8bit[i] = (bytes[i] - 128) * 256;
    }
    
    console.log('8-bit converted first 10 samples:', Array.from(pcm8bit.slice(0, 10)));
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

  const processAudioQueue = async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return;
    }
    
    isPlayingRef.current = true;
    
    while (audioQueueRef.current.length > 0) {
      const audioBuffer = audioQueueRef.current.shift();
      if (audioBuffer) {
        await playBuffer(audioBuffer);
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
      console.log('Started PCM chunk playback', {
        duration: audioBuffer.duration,
        sampleRate: audioBuffer.sampleRate,
        startTime: startTime,
        currentTime: currentTime,
        audioContextState: playbackContextRef.current.state,
        volume: gainNodeRef.current?.gain.value
      });
      
      // Update next start time to ensure gapless playback
      nextStartTimeRef.current = startTime + audioBuffer.duration;
      
      // Wait for this chunk to finish
      await new Promise<void>((resolve) => {
        source.onended = () => {
          console.log('PCM chunk playback finished');
          resolve();
        };
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
        
        {/* Audio Diagnostics - show when not connected */}
        {!isConnected && !isConnecting && (
          <div className="mx-4 mt-4">
            <AudioDiagnostics />
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
          
          {/* Add these test buttons in development mode */}
          {process.env.NODE_ENV === 'development' && (
            <div className="flex gap-2 mt-2 justify-center">
              <button
                onClick={testAudioSystem}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Test Tone
              </button>
              <button
                onClick={checkAudioContextState}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                Check Audio
              </button>
              <button
                onClick={() => {
                  if (lastBase64AudioRef.current) {
                    testAlternativePCMProcessing(lastBase64AudioRef.current);
                  } else {
                    console.log('No audio data stored yet');
                  }
                }}
                className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
              >
                Test Alt Processing
              </button>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Powered by ElevenLabs Conversational AI
          </p>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Note: Make sure the WebSocket server is running (npm run proxy)
          </p>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
};