"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, PhoneOff } from "lucide-react";

export function Dialer() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);

  const handleCall = () => {
    if (phoneNumber) {
      setIsCallActive(!isCallActive);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Dialer</h3>
      <div className="space-y-4">
        <Input
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isCallActive}
        />
        <Button
          onClick={handleCall}
          variant={isCallActive ? "destructive" : "default"}
          className="w-full"
        >
          {isCallActive ? (
            <>
              <PhoneOff className="mr-2 h-4 w-4" />
              End Call
            </>
          ) : (
            <>
              <Phone className="mr-2 h-4 w-4" />
              Start Call
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
