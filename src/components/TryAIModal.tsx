import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Phone, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { ElevenLabsConversationalAI, ConversationMessage } from '@/utils/elevenlabs';

interface TryAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TryAIModal: React.FC<TryAIModalProps> = ({ isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const elevenLabsRef = useRef<ElevenLabsConversationalAI | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize ElevenLabs connection when modal opens
  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      initializeElevenLabs();
    }
    
    return () => {
      if (elevenLabsRef.current) {
        elevenLabsRef.current.disconnect();
        elevenLabsRef.current = null;
      }
    };
  }, [isOpen]);

  const initializeElevenLabs = async () => {
    setIsConnecting(true);
    setConnectionError(null);

    try {
      // ElevenLabs configuration with agent ID
      const config = {
        apiKey: '', // Not needed for client-side, handled by server
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_01jx1w1hf3e68v6n8510t90ww0'
      };

      elevenLabsRef.current = new ElevenLabsConversationalAI(config);
      
      await elevenLabsRef.current.initializeConnection();
      
      // Set up message handlers
      elevenLabsRef.current.onMessage(handleElevenLabsMessage);
      
      setIsConnected(true);
      
      // Add welcome message
      setMessages([{
        role: 'assistant',
        content: 'Hi! I\'m Mohit AI powered by ElevenLabs. Try talking to me about our pricing, features, or book a demo! You can type or use voice.',
        timestamp: new Date()
      }]);
      
    } catch (error) {
      console.error('Failed to initialize ElevenLabs:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setConnectionError(`Failed to connect to AI: ${errorMessage}. Please check your API key and try again.`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleElevenLabsMessage = (data: any) => {
    console.log('ElevenLabs message:', data);
    
    // Handle different types of messages from ElevenLabs
    switch (data.type) {
      case 'conversation_initiation_metadata':
        console.log('Conversation initiated');
        break;
        
      case 'audio':
        // Play audio response
        if (!isMuted && data.audio) {
          playAudioResponse(data.audio);
        }
        break;
        
      case 'agent_response':
        // Agent's text response
        if (data.text) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: data.text,
            timestamp: new Date()
          }]);
          setIsTyping(false);
        }
        break;
        
      case 'user_transcript':
        // User's speech transcription
        if (data.text) {
          setMessages(prev => [...prev, {
            role: 'user',
            content: data.text,
            timestamp: new Date()
          }]);
        }
        break;
        
      case 'interruption':
        // Handle interruptions
        console.log('Interruption detected');
        setIsTyping(false);
        break;
        
      case 'ping':
        // Respond to ping with pong
        if (elevenLabsRef.current?.websocket) {
          elevenLabsRef.current.websocket.send(JSON.stringify({
            type: 'pong',
            event_id: data.event_id
          }));
        }
        break;
    }
  };

  const playAudioResponse = (base64Audio: string) => {
    try {
      const audioBlob = new Blob([
        Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))
      ], { type: 'audio/mpeg' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(console.error);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !elevenLabsRef.current || !isConnected) return;

    try {
      // Add user message to UI immediately
      setMessages(prev => [...prev, {
        role: 'user',
        content: inputMessage,
        timestamp: new Date()
      }]);

      // Send to ElevenLabs
      await elevenLabsRef.current.sendTextMessage(inputMessage);
      setInputMessage('');
      setIsTyping(true);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    }
  };

  const toggleVoiceRecording = async () => {
    if (!elevenLabsRef.current || !isConnected) return;

    try {
      if (isRecording) {
        elevenLabsRef.current.stopVoiceRecording();
        setIsRecording(false);
      } else {
        await elevenLabsRef.current.startVoiceRecording();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Error toggling voice recording:', error);
      alert('Voice recording not available. Please check microphone permissions.');
    }
  };

  const handleVoiceCall = () => {
    // Integrate with your existing Twilio setup for phone calls
    // ElevenLabs supports Twilio integration with μ-law 8000 Hz encoding
    alert('Voice call feature - integrate with your Twilio setup using ElevenLabs μ-law encoding');
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
              <h2 className="text-lg font-semibold">Try Mohit AI</h2>
              <p className="text-sm text-gray-500">
                {isConnecting ? 'Connecting...' : 
                 isConnected ? 'Connected • ElevenLabs AI' : 
                 'Experience our AI in action'}
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

        {/* Connection Status */}
        {connectionError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4 rounded">
            <p className="text-red-700 text-sm">{connectionError}</p>
            <button 
              onClick={initializeElevenLabs}
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
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleVoiceCall}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-1"
              disabled={!isConnected}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">Call</span>
            </button>
            <button
              onClick={toggleVoiceRecording}
              disabled={!isConnected}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1 transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="text-sm">{isRecording ? 'Stop' : 'Talk'}</span>
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about pricing, features, or book a demo..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isConnected}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || !isConnected}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by ElevenLabs Conversational AI 2.0 • Real-time voice & text
          </p>
        </div>

        {/* Hidden audio element for playing responses */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
};