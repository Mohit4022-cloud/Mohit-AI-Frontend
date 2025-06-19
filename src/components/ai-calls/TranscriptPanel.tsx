import { useEffect, useRef, useState, useMemo } from "react";
import { useAICallStore } from "@/stores/aiCallStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  X, Search, Copy, Download, Maximize2, Minimize2,
  Bot, User, Headphones, Clock, PanelLeftClose, Subtitles,
  CircleDot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TranscriptPanelProps {
  callId: string;
  onClose?: () => void;
  initialMode?: "panel" | "subtitle";
}

// Color palette for speaker identification (max 5 speakers)
const SPEAKER_COLORS = [
  { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
  { bg: "bg-green-50 dark:bg-green-950", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
  { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
  { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
  { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-600 dark:text-pink-400", border: "border-pink-200 dark:border-pink-800" }
];

// Important keywords to highlight
const IMPORTANT_KEYWORDS = [
  "pricing", "price", "cost", "budget", "payment",
  "competitor", "competition", "alternative",
  "decision", "decide", "purchase", "buy",
  "concern", "issue", "problem", "challenge",
  "timeline", "deadline", "when", "timeframe",
  "feature", "benefit", "advantage", "capability"
];

export function TranscriptPanel({ callId, onClose, initialMode = "panel" }: TranscriptPanelProps) {
  const { transcripts } = useAICallStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [displayMode, setDisplayMode] = useState<"panel" | "subtitle">(() => {
    // Try to get saved preference from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("transcriptDisplayMode");
      return (saved as "panel" | "subtitle") || initialMode;
    }
    return initialMode;
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastScrollPositionRef = useRef<number>(0);

  const callTranscripts = useMemo(() => {
    return transcripts.get(callId) || [];
  }, [transcripts, callId]);
  
  // Map speakers to colors
  const speakerColorMap = useMemo(() => {
    const map = new Map<string, typeof SPEAKER_COLORS[0]>();
    const uniqueSpeakers = Array.from(new Set(callTranscripts.map(t => t.speaker)));
    
    // Pre-assign colors for known speakers
    if (uniqueSpeakers.includes('AI')) {
      map.set('AI', SPEAKER_COLORS[0]); // Blue for AI
    }
    
    // Assign colors to other speakers
    let colorIndex = 1;
    uniqueSpeakers.forEach(speaker => {
      if (!map.has(speaker) && colorIndex < SPEAKER_COLORS.length) {
        map.set(speaker, SPEAKER_COLORS[colorIndex]);
        colorIndex++;
      }
    });
    
    return map;
  }, [callTranscripts]);
  
  const filteredTranscripts = callTranscripts.filter(entry =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (autoScroll && bottomRef.current && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [callTranscripts, autoScroll]);
  
  // Handle manual scroll detection
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 10;
    
    // If user scrolled up manually, disable auto-scroll
    if (target.scrollTop < lastScrollPositionRef.current && !isAtBottom) {
      setAutoScroll(false);
    }
    // Re-enable auto-scroll if user scrolled to bottom
    else if (isAtBottom) {
      setAutoScroll(true);
    }
    
    lastScrollPositionRef.current = target.scrollTop;
  };

  useEffect(() => {
    // Save display mode preference
    if (typeof window !== "undefined") {
      localStorage.setItem("transcriptDisplayMode", displayMode);
    }
  }, [displayMode]);

  const handleCopy = () => {
    const text = callTranscripts
      .map(entry => `[${format(entry.timestamp, "HH:mm:ss")}] ${entry.speaker}: ${entry.text}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const text = callTranscripts
      .map(entry => `[${format(entry.timestamp, "HH:mm:ss")}] ${entry.speaker}: ${entry.text}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${callId}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (displayMode === "subtitle") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-t shadow-lg animate-in slide-in-from-bottom-5 duration-300">
        <div className="container mx-auto p-4 max-h-48">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Subtitles className="h-4 w-4" />
              Live Transcript
            </h3>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setDisplayMode("panel")}
                title="Switch to panel view"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
              {onClose && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <ScrollArea className="h-24">
            <div className="space-y-1">
              {callTranscripts.slice(-4).map((entry) => (
                <TranscriptSubtitleEntry key={entry.id} entry={entry} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn(
      "flex flex-col min-w-[400px] animate-in fade-in-0 duration-300",
      isExpanded ? "fixed inset-4 z-50" : "h-full"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <PanelLeftClose className="h-4 w-4" />
            Live Transcript
            {callTranscripts.length > 0 && (
              <Badge variant="secondary">{callTranscripts.length} messages</Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setDisplayMode("subtitle")}
              title="Switch to subtitle view"
            >
              <Subtitles className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-2">
              <CircleDot className={cn("h-3 w-3", autoScroll ? "text-green-500 animate-pulse" : "text-muted-foreground")} />
              <Switch
                checked={autoScroll}
                onCheckedChange={setAutoScroll}
                className="h-4 w-8"
              />
              <span className="text-xs text-muted-foreground">Auto-scroll</span>
            </div>
            <div className="flex items-center gap-2 px-2 border-l">
              <Switch
                checked={highlightKeywords}
                onCheckedChange={setHighlightKeywords}
                className="h-4 w-8"
              />
              <span className="text-xs text-muted-foreground">Keywords</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleCopy}
              title="Copy transcript"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleDownload}
              title="Download transcript"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            {onClose && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8"
          />
        </div>
      </div>

      <CardContent className="flex-1 px-3 pb-3">
        <ScrollArea 
          ref={scrollAreaRef}
          className="h-full pr-3"
          onScroll={handleScroll}
        >
          <div className="space-y-3">
            {filteredTranscripts.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                {searchQuery ? "No matching messages" : "No transcript yet"}
              </div>
            ) : (
              <>
                {/* Timestamp markers */}
                {filteredTranscripts.map((entry, index) => {
                  const showTimestamp = index === 0 || 
                    (index > 0 && 
                     entry.timestamp.getTime() - filteredTranscripts[index - 1].timestamp.getTime() > 30000);
                  
                  return (
                    <div key={entry.id}>
                      {showTimestamp && (
                        <div className="flex items-center gap-2 my-3">
                          <div className="flex-1 h-px bg-border" />
                          <span className="text-xs text-muted-foreground px-2">
                            {format(entry.timestamp, "HH:mm:ss")}
                          </span>
                          <div className="flex-1 h-px bg-border" />
                        </div>
                      )}
                      <TranscriptEntry 
                        entry={entry} 
                        highlight={searchQuery}
                        speakerColor={speakerColorMap.get(entry.speaker)}
                        highlightKeywords={highlightKeywords}
                      />
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface TranscriptEntryProps {
  entry: {
    speaker: string;
    text: string;
    timestamp: Date;
    sentiment?: number;
    keywords?: string[];
  };
  highlight?: string;
  speakerColor?: typeof SPEAKER_COLORS[0];
  highlightKeywords?: boolean;
}

function TranscriptEntry({ entry, highlight, speakerColor, highlightKeywords }: TranscriptEntryProps) {
  const getSpeakerIcon = () => {
    if (entry.speaker === "AI") {
      return <Bot className="h-4 w-4" />;
    } else if (entry.speaker === "AGENT") {
      return <Headphones className="h-4 w-4" />;
    }
    return <User className="h-4 w-4" />;
  };

  const colors = speakerColor || SPEAKER_COLORS[0];

  const highlightText = (text: string) => {
    let processedText: React.ReactNode[] = [text];
    
    // First highlight search query if present
    if (highlight) {
      processedText = processedText.flatMap((part) => {
        if (typeof part !== 'string') return part;
        
        const parts = part.split(new RegExp(`(${highlight})`, "gi"));
        return parts.map((p, i) => 
          p.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={`search-${i}`} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
              {p}
            </mark>
          ) : (
            p
          )
        );
      });
    }
    
    // Then highlight important keywords if enabled
    if (highlightKeywords && !highlight) {
      processedText = processedText.flatMap((part, partIndex) => {
        if (typeof part !== 'string') return part;
        
        // Create regex pattern for all keywords
        const keywordPattern = IMPORTANT_KEYWORDS.join('|');
        const regex = new RegExp(`\\b(${keywordPattern})\\b`, 'gi');
        const parts = part.split(regex);
        
        return parts.map((p, i) => {
          const isKeyword = IMPORTANT_KEYWORDS.some(k => 
            k.toLowerCase() === p.toLowerCase()
          );
          
          if (isKeyword) {
            return (
              <span 
                key={`keyword-${partIndex}-${i}`} 
                className="font-medium text-primary underline decoration-dotted underline-offset-2"
              >
                {p}
              </span>
            );
          }
          return p;
        });
      });
    }
    
    return processedText;
  };

  return (
    <div className={cn(
      "flex gap-3 p-3 rounded-lg transition-colors",
      entry.speaker === "AI" && "bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent",
      "hover:bg-muted/20"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-offset-1",
        colors.bg,
        colors.text,
        colors.border,
        `ring-${colors.border}`
      )}>
        {getSpeakerIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-medium">{entry.speaker}</span>
          <span className="text-xs text-muted-foreground">
            {format(entry.timestamp, "HH:mm:ss")}
          </span>
          {entry.sentiment && (
            <Badge variant="outline" className="text-xs px-1.5 py-0">
              {entry.sentiment}%
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-foreground/90 break-words">
          {highlightText(entry.text)}
        </p>
        
        {entry.keywords && entry.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {entry.keywords.map((keyword, i) => (
              <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TranscriptSubtitleEntry({ entry }: { entry: any }) {
  // Use the same color mapping logic
  const speakerColors = useMemo(() => {
    if (entry.speaker === 'AI') return SPEAKER_COLORS[0];
    if (entry.speaker === 'AGENT') return SPEAKER_COLORS[1];
    if (entry.speaker === 'LEAD') return SPEAKER_COLORS[2];
    return SPEAKER_COLORS[3];
  }, [entry.speaker]);

  return (
    <div className={cn(
      "flex items-start gap-3 py-1.5 px-2 rounded-md transition-colors",
      "hover:bg-muted/50",
      entry.speaker === "AI" && "bg-gradient-to-r from-blue-50/30 to-transparent dark:from-blue-950/20"
    )}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-0.5 rounded-full",
          speakerColors.bg,
          speakerColors.border,
          "border"
        )}>
          {entry.speaker === "AI" && <Bot className="h-3 w-3" />}
          <span className={cn("text-xs font-semibold uppercase", speakerColors.text)}>
            {entry.speaker}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {format(entry.timestamp, "HH:mm:ss")}
        </span>
      </div>
      <span className="text-sm flex-1 break-words">{entry.text}</span>
    </div>
  );
}