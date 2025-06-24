"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Pause, 
  Play,
  Delete,
  Volume2,
  VolumeX,
  PhoneCall,
  Users,
  PhoneForwarded,
  Hash,
  Asterisk
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DialerProps {
  onCall?: (phoneNumber: string) => void;
  onEndCall?: () => void;
  onToggleMute?: (muted: boolean) => void;
  onToggleHold?: (onHold: boolean) => void;
  isCallActive?: boolean;
  isMuted?: boolean;
  isOnHold?: boolean;
}

export function Dialer({
  onCall,
  onEndCall,
  onToggleMute,
  onToggleHold,
  isCallActive = false,
  isMuted = false,
  isOnHold = false,
}: DialerProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dtmfEnabled, setDtmfEnabled] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio for DTMF tones
    audioRef.current = new Audio();
  }, []);

  const playDTMF = (digit: string) => {
    // In a real implementation, this would play DTMF tones
    if (audioRef.current && dtmfEnabled) {
      // Mock implementation - in production, use actual DTMF tone files
      toast({
        description: `DTMF tone: ${digit}`,
        duration: 500,
      });
    }
  };

  const handleNumberClick = (digit: string) => {
    if (!isCallActive || dtmfEnabled) {
      setPhoneNumber(prev => prev + digit);
      playDTMF(digit);
    }
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPhoneNumber("");
  };

  const formatPhoneNumber = (number: string) => {
    // Format as US phone number: +1 (XXX) XXX-XXXX
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    if (cleaned.length <= 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handleCall = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a phone number",
        variant: "destructive",
      });
      return;
    }

    if (isCallActive) {
      if (onEndCall) {
        onEndCall();
      }
      setPhoneNumber("");
      setDtmfEnabled(false);
    } else {
      const formattedNumber = formatPhoneNumber(phoneNumber);
      toast({
        title: "Calling",
        description: `Dialing ${formattedNumber}...`,
      });
      if (onCall) {
        onCall(phoneNumber);
      }
      setDtmfEnabled(true);
    }
  };

  const handleMute = () => {
    const newMutedState = !isMuted;
    if (onToggleMute) {
      onToggleMute(newMutedState);
    }
    toast({
      description: newMutedState ? "Microphone muted" : "Microphone unmuted",
      duration: 2000,
    });
  };

  const handleHold = () => {
    const newHoldState = !isOnHold;
    if (onToggleHold) {
      onToggleHold(newHoldState);
    }
    toast({
      description: newHoldState ? "Call on hold" : "Call resumed",
      duration: 2000,
    });
  };

  const handleTransfer = () => {
    toast({
      title: "Transfer Call",
      description: "Call transfer feature coming soon",
    });
  };

  const handleConference = () => {
    toast({
      title: "Conference Call",
      description: "Conference call feature coming soon",
    });
  };

  const handleSpeaker = () => {
    toast({
      description: "Speaker toggled",
      duration: 2000,
    });
  };

  const numberPadButtons = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "", icon: Asterisk },
    { number: "0", letters: "+" },
    { number: "#", letters: "", icon: Hash },
  ];

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-6">
        {/* Phone Number Display */}
        <div className="relative">
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formatPhoneNumber(phoneNumber)}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            disabled={isCallActive && !dtmfEnabled}
            className="text-xl text-center pr-12 h-14 font-mono"
          />
          {phoneNumber && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="absolute right-2 top-1/2 -translate-y-1/2"
              disabled={isCallActive && !dtmfEnabled}
            >
              <Delete className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3">
          {numberPadButtons.map((btn) => (
            <Button
              key={btn.number}
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick(btn.number)}
              disabled={isCallActive && !dtmfEnabled}
              className="h-16 relative group hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <div className="text-center">
                {btn.icon ? (
                  <btn.icon className="h-6 w-6 mx-auto" />
                ) : (
                  <>
                    <div className="text-2xl font-semibold">{btn.number}</div>
                    {btn.letters && (
                      <div className="text-[10px] text-muted-foreground group-hover:text-primary-foreground/70 absolute bottom-2 left-1/2 -translate-x-1/2">
                        {btn.letters}
                      </div>
                    )}
                  </>
                )}
              </div>
            </Button>
          ))}
        </div>

        {/* Call Controls */}
        <div className="space-y-3">
          {/* Primary Call Button */}
          <Button
            onClick={handleCall}
            variant={isCallActive ? "destructive" : "default"}
            size="lg"
            className="w-full h-14 text-lg font-semibold"
            disabled={!phoneNumber && !isCallActive}
          >
            {isCallActive ? (
              <>
                <PhoneOff className="mr-2 h-5 w-5" />
                End Call
              </>
            ) : (
              <>
                <Phone className="mr-2 h-5 w-5" />
                Start Call
              </>
            )}
          </Button>

          {/* Active Call Controls */}
          {isCallActive && (
            <div className="grid grid-cols-3 gap-3">
              {/* Mute */}
              <Button
                variant={isMuted ? "secondary" : "outline"}
                size="lg"
                onClick={handleMute}
                className="h-14"
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>

              {/* Hold */}
              <Button
                variant={isOnHold ? "secondary" : "outline"}
                size="lg"
                onClick={handleHold}
                className="h-14"
              >
                {isOnHold ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Pause className="h-5 w-5" />
                )}
              </Button>

              {/* Speaker */}
              <Button
                variant="outline"
                size="lg"
                onClick={handleSpeaker}
                className="h-14"
              >
                <Volume2 className="h-5 w-5" />
              </Button>

              {/* Transfer */}
              <Button
                variant="outline"
                size="lg"
                onClick={handleTransfer}
                className="h-14"
              >
                <PhoneForwarded className="h-5 w-5" />
              </Button>

              {/* Conference */}
              <Button
                variant="outline"
                size="lg"
                onClick={handleConference}
                className="h-14"
              >
                <Users className="h-5 w-5" />
              </Button>

              {/* DTMF Toggle */}
              <Button
                variant={dtmfEnabled ? "secondary" : "outline"}
                size="lg"
                onClick={() => setDtmfEnabled(!dtmfEnabled)}
                className="h-14"
              >
                <Hash className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!isCallActive && phoneNumber && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(phoneNumber);
                toast({
                  description: "Phone number copied to clipboard",
                  duration: 2000,
                });
              }}
              className="flex-1"
            >
              Copy
            </Button>
          </div>
        )}

        {/* Status Indicators */}
        {isCallActive && (
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground">
              {isOnHold ? "Call on Hold" : "Call Active"}
            </div>
            {dtmfEnabled && (
              <div className="text-xs text-muted-foreground">
                DTMF tones enabled - press numbers to send
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}