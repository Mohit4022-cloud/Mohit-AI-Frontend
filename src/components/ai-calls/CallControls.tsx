import { useState } from "react";
import { useAICallStore } from "@/stores/aiCallStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Mic, MicOff, Volume2, VolumeX, PhoneOff, Pause, Play,
  UserPlus, Settings, FileText, Headphones, Users, Brain,
  SlidersHorizontal, Sparkles, MessageSquare, Zap, Gauge
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface CallControlsProps {
  callId: string;
}

export function CallControls({ callId }: CallControlsProps) {
  const { activeCalls, takeOverCall, pauseAI, resumeAI, endCall } = useAICallStore();
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isCoachMode, setIsCoachMode] = useState(false);
  const [isAdjustingBehavior, setIsAdjustingBehavior] = useState(false);
  const [aiSpeed, setAiSpeed] = useState(50);
  const [aiFormality, setAiFormality] = useState(75);
  const [aiEmpathy, setAiEmpathy] = useState(60);
  const [aiTechnicality, setAiTechnicality] = useState(50);
  
  const call = activeCalls.find(c => c.id === callId);
  if (!call) return null;

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // In production, this would control actual audio
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] ?? 100);
    // In production, this would control actual audio volume
  };

  const handleGetSummary = () => {
    toast({
      title: "Generating call summary...",
      description: "AI is analyzing the conversation",
    });
    // In production, this would trigger AI summary generation
    setTimeout(() => {
      toast({
        title: "Summary ready!",
        description: "Check the call details panel",
      });
    }, 2000);
  };

  const handleCoachModeToggle = (enabled: boolean) => {
    setIsCoachMode(enabled);
    if (enabled) {
      toast({
        title: "Coach Mode activated",
        description: "You can now whisper to the agent without the customer hearing",
      });
    }
  };

  const applyAIBehaviorChanges = () => {
    toast({
      title: "AI behavior updated",
      description: "Settings will take effect immediately",
    });
    setIsAdjustingBehavior(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Call Controls</CardTitle>
          <Badge variant={call.mode === "AI" ? "default" : call.mode === "HUMAN" ? "secondary" : "outline"}>
            {call.mode} Mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Controls */}
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            className="h-12"
            onClick={handleMuteToggle}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
          </Button>
          
          <Button
            variant="secondary"
            className="h-12"
            disabled
          >
            <Pause className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Hold</span>
          </Button>
          
          <Button
            variant="secondary"
            className="h-12"
            onClick={() => takeOverCall(callId)}
            disabled={call.mode === "HUMAN"}
          >
            <UserPlus className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Take Over</span>
          </Button>
          
          <Button
            variant="destructive"
            className="h-12"
            onClick={() => endCall(callId)}
          >
            <PhoneOff className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">End</span>
          </Button>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center gap-2">
              <Volume2 className="h-3.5 w-3.5 text-purple-500" />
              Volume Control
            </Label>
            <span className="text-sm font-medium text-purple-600">{volume}%</span>
          </div>
          <div className="flex items-center gap-3">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1 [&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_.relative]:bg-purple-100 [&_[data-orientation]]:bg-purple-600"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* AI Controls */}
        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-pause" className="text-sm flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 text-purple-500" />
              AI Agent Control
            </Label>
            <div className="flex items-center gap-2">
              {call.mode === "AI" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => pauseAI(callId)}
                  className="border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                >
                  <Pause className="h-3 w-3 mr-1 text-purple-600" />
                  <span className="text-purple-700">Pause AI</span>
                </Button>
              ) : call.mode === "HYBRID" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => resumeAI(callId)}
                  className="border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                >
                  <Play className="h-3 w-3 mr-1 text-purple-600" />
                  <span className="text-purple-700">Resume AI</span>
                </Button>
              ) : null}
            </div>
          </div>

          {/* AI Behavior Quick Adjust */}
          <div className="flex gap-2">
            <Popover open={isAdjustingBehavior} onOpenChange={setIsAdjustingBehavior}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-purple-700">Adjust AI Behavior</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <h4 className="font-medium flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      AI Behavior Settings
                    </h4>
                    <Button 
                      size="sm" 
                      onClick={applyAIBehaviorChanges}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Apply
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-purple-500" />
                          Response Speed
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {aiSpeed < 30 ? "Thoughtful" : aiSpeed > 70 ? "Quick" : "Balanced"}
                        </span>
                      </div>
                      <Slider
                        value={[aiSpeed]}
                        onValueChange={(value) => setAiSpeed(value[0] ?? 50)}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_.relative]:bg-purple-100 [&_[data-orientation]]:bg-purple-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm flex items-center gap-2">
                          <MessageSquare className="h-3.5 w-3.5 text-purple-500" />
                          Formality Level
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {aiFormality < 30 ? "Casual" : aiFormality > 70 ? "Formal" : "Professional"}
                        </span>
                      </div>
                      <Slider
                        value={[aiFormality]}
                        onValueChange={(value) => setAiFormality(value[0] ?? 50)}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_.relative]:bg-purple-100 [&_[data-orientation]]:bg-purple-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                          Empathy Level
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {aiEmpathy < 30 ? "Direct" : aiEmpathy > 70 ? "Empathetic" : "Balanced"}
                        </span>
                      </div>
                      <Slider
                        value={[aiEmpathy]}
                        onValueChange={(value) => setAiEmpathy(value[0] ?? 50)}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_.relative]:bg-purple-100 [&_[data-orientation]]:bg-purple-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm flex items-center gap-2">
                          <Gauge className="h-3.5 w-3.5 text-purple-500" />
                          Technical Detail
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {aiTechnicality < 30 ? "Simple" : aiTechnicality > 70 ? "Technical" : "Moderate"}
                        </span>
                      </div>
                      <Slider
                        value={[aiTechnicality]}
                        onValueChange={(value) => setAiTechnicality(value[0] ?? 50)}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_.relative]:bg-purple-100 [&_[data-orientation]]:bg-purple-600"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button 
              variant="outline" 
              className="flex-1 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
              onClick={handleGetSummary}
              disabled={call.duration < 30}
            >
              <FileText className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-purple-700">Get Summary</span>
            </Button>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="space-y-3 pt-2 border-t">
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-purple-600" />
                <Label htmlFor="coach-mode" className="text-sm font-medium text-purple-900">
                  Coach Mode
                </Label>
              </div>
              <Switch
                id="coach-mode"
                checked={isCoachMode}
                onCheckedChange={handleCoachModeToggle}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
            <p className="text-xs text-purple-700">
              {isCoachMode 
                ? "Active - Your voice is only heard by the agent" 
                : "Enable to whisper guidance to your agent"}
            </p>
            {isCoachMode && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-100 rounded-full">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-purple-700">Whisper Active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}