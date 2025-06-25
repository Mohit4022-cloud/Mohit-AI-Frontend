import React, { useState, useRef } from 'react';
import { X, MessageCircle, Volume2, VolumeX, Loader2 } from 'lucide-react';

interface TryAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const TryAIModalSimple: React.FC<TryAIModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize with welcome message
  useState(() => {
    setMessages([{
      role: 'assistant',
      content: 'Hi! I\'m Mohit AI. Ask me about our pricing, features, or book a demo!',
      timestamp: new Date()
    }]);
  });

  const generateSpeech = async (text: string) => {
    if (isMuted) return;
    
    try {
      const response = await fetch('/api/elevenlabs/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voiceId: '9BWtsMINqrJLrRacOk9x' // Aria voice
        })
      });

      if (!response.ok) {
        console.error('Failed to generate speech');
        return;
      }

      // Get the audio data
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play the audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(console.error);
      }
      
    } catch (error) {
      console.error('Error generating speech:', error);
    }
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simple mock responses - replace with actual AI integration
    const responses: { [key: string]: string } = {
      pricing: "Our pricing starts at $99/month for the basic plan, which includes 1,000 AI-powered calls. The Pro plan at $299/month includes 5,000 calls and advanced analytics. Enterprise pricing is customized based on your needs.",
      features: "Mohit AI offers automated outbound calling, real-time AI conversations, call transcription, sentiment analysis, CRM integration, and detailed analytics. Our AI can handle objections, book meetings, and qualify leads automatically.",
      demo: "I'd be happy to schedule a demo for you! Our demos typically last 30 minutes and show you exactly how Mohit AI can transform your sales process. Would you prefer a morning or afternoon slot?",
      default: "I can help you learn about our pricing plans, key features, or schedule a demo. What would you like to know more about?"
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return responses.pricing;
    } else if (lowerMessage.includes('feature') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
      return responses.features;
    } else if (lowerMessage.includes('demo') || lowerMessage.includes('schedule') || lowerMessage.includes('book')) {
      return responses.demo;
    }
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    try {
      // Get AI response (mock for now)
      const aiResponse = await getAIResponse(userMessage);
      
      // Add AI message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }]);

      // Generate speech for the response
      await generateSpeech(aiResponse);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
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
                Experience our AI Sales Assistant
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about pricing, features, or book a demo..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by ElevenLabs Text-to-Speech
          </p>
        </div>

        {/* Hidden audio element for playing responses */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
};