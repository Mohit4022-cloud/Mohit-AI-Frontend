import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { io, Socket } from "socket.io-client";

export type CallStatus =
  | "QUEUED"
  | "CONNECTING"
  | "ACTIVE"
  | "COMPLETED"
  | "FAILED";
export type CallMode = "AI" | "HUMAN" | "HYBRID";
export type AgentStatus = "LISTENING" | "PROCESSING" | "SPEAKING" | "IDLE";

export interface AICall {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  phone: string;
  status: CallStatus;
  mode: CallMode;
  agentStatus: AgentStatus;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  sentiment: number; // 0-100
  aiAgentId: string;
  tags: string[];
}

export interface TranscriptEntry {
  id: string;
  callId: string;
  speaker: "AI" | "LEAD" | "AGENT";
  text: string;
  timestamp: Date;
  sentiment?: number;
  keywords?: string[];
}

export interface CallMetrics {
  activeAICalls: number;
  completedToday: number;
  avgSentimentScore: number;
  conversionRate: number;
}

export interface AIInsight {
  id: string;
  callId: string;
  type: "SENTIMENT" | "TOPIC" | "COMPETITOR" | "PRICING" | "ACTION";
  title: string;
  content: string;
  confidence: number;
  timestamp: Date;
}

export interface QueuedCall {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  phone: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  scheduledTime?: Date;
  attempts: number;
  lastAttempt?: Date;
}

interface AICallStore {
  // State
  activeCalls: AICall[];
  queuedCalls: QueuedCall[];
  selectedCallId: string | null;
  transcripts: Map<string, TranscriptEntry[]>;
  insights: Map<string, AIInsight[]>;
  callMetrics: CallMetrics;
  socket: Socket | null;
  isConnected: boolean;

  // Actions
  initializeSocket: () => void;
  loadActiveCalls: () => Promise<void>;
  loadQueuedCalls: () => Promise<void>;
  addCall: (call: AICall) => void;
  updateCallStatus: (id: string, status: CallStatus) => void;
  updateAgentStatus: (id: string, status: AgentStatus) => void;
  appendTranscript: (callId: string, entry: TranscriptEntry) => void;
  addInsight: (callId: string, insight: AIInsight) => void;
  selectCall: (id: string | null) => void;
  takeOverCall: (id: string) => Promise<void>;
  pauseAI: (id: string) => Promise<void>;
  resumeAI: (id: string) => Promise<void>;
  endCall: (id: string) => Promise<void>;
  initiateCall: (leadId: string) => Promise<void>;
  updateMetrics: (metrics: Partial<CallMetrics>) => void;
  addToQueue: (call: QueuedCall) => void;
  removeFromQueue: (id: string) => void;
  updateQueuePriority: (
    id: string,
    priority: "HIGH" | "MEDIUM" | "LOW",
  ) => void;
  startNewCall: (params: {
    phoneNumber: string;
    contactName: string;
    company?: string;
    objective?: string;
    script?: string;
    notes?: string;
  }) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000";

export const useAICallStore = create<AICallStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        activeCalls: [],
        queuedCalls: [],
        selectedCallId: null,
        transcripts: new Map(),
        insights: new Map(),
        callMetrics: {
          activeAICalls: 0,
          completedToday: 0,
          avgSentimentScore: 85,
          conversionRate: 62,
        },
        socket: null,
        isConnected: false,

        // Initialize WebSocket connection
        initializeSocket: () => {
          const socket = io(WS_URL, {
            path: "/socket.io",
            transports: ["websocket"],
          });

          socket.on("connect", () => {
            console.log("Connected to AI Calls WebSocket");
            set({ isConnected: true });
          });

          socket.on("disconnect", () => {
            console.log("Disconnected from AI Calls WebSocket");
            set({ isConnected: false });
          });

          // Real-time event handlers
          socket.on("call:started", (call: AICall) => {
            get().addCall(call);
          });

          socket.on(
            "call:status",
            ({ callId, status }: { callId: string; status: CallStatus }) => {
              get().updateCallStatus(callId, status);
            },
          );

          socket.on("transcript:update", (entry: TranscriptEntry) => {
            get().appendTranscript(entry.callId, entry);
          });

          socket.on(
            "ai:status",
            ({ callId, status }: { callId: string; status: AgentStatus }) => {
              get().updateAgentStatus(callId, status);
            },
          );

          socket.on("insight:new", (insight: AIInsight) => {
            get().addInsight(insight.callId, insight);
          });

          socket.on("metrics:update", (metrics: Partial<CallMetrics>) => {
            get().updateMetrics(metrics);
          });

          set({ socket });
        },

        // Load active calls from API
        loadActiveCalls: async () => {
          try {
            const response = await fetch(`${API_URL}/calls/active`);
            if (!response.ok) throw new Error("Failed to load active calls");

            const data = await response.json();
            set({ activeCalls: data.calls });

            // Update metrics
            set((state) => ({
              callMetrics: {
                ...state.callMetrics,
                activeAICalls: data.calls.filter((c: AICall) => c.mode === "AI")
                  .length,
              },
            }));
          } catch (error) {
            console.error("Error loading active calls:", error);
          }
        },

        // Load queued calls
        loadQueuedCalls: async () => {
          try {
            const response = await fetch(`${API_URL}/calls/queue`);
            if (!response.ok) throw new Error("Failed to load call queue");

            const data = await response.json();
            set({ queuedCalls: data.queue });
          } catch (error) {
            console.error("Error loading call queue:", error);
          }
        },

        // Add new call
        addCall: (call) => {
          set((state) => ({
            activeCalls: [...state.activeCalls, call],
            callMetrics: {
              ...state.callMetrics,
              activeAICalls:
                state.callMetrics.activeAICalls + (call.mode === "AI" ? 1 : 0),
            },
          }));
        },

        // Update call status
        updateCallStatus: (id, status) => {
          set((state) => {
            const calls = state.activeCalls.map((call) =>
              call.id === id ? { ...call, status } : call,
            );

            // Remove completed/failed calls after a delay
            if (status === "COMPLETED" || status === "FAILED") {
              setTimeout(() => {
                set((state) => ({
                  activeCalls: state.activeCalls.filter((c) => c.id !== id),
                }));
              }, 5000);
            }

            return { activeCalls: calls };
          });
        },

        // Update agent status
        updateAgentStatus: (id, agentStatus) => {
          set((state) => ({
            activeCalls: state.activeCalls.map((call) =>
              call.id === id ? { ...call, agentStatus } : call,
            ),
          }));
        },

        // Append transcript entry
        appendTranscript: (callId, entry) => {
          set((state) => {
            const transcripts = new Map(state.transcripts);
            const entries = transcripts.get(callId) || [];
            transcripts.set(callId, [...entries, entry]);
            return { transcripts };
          });
        },

        // Add insight
        addInsight: (callId, insight) => {
          set((state) => {
            const insights = new Map(state.insights);
            const callInsights = insights.get(callId) || [];
            insights.set(callId, [...callInsights, insight]);
            return { insights };
          });
        },

        // Select call
        selectCall: (id) => {
          set({ selectedCallId: id });
        },

        // Take over call
        takeOverCall: async (id) => {
          try {
            const response = await fetch(`${API_URL}/calls/${id}/takeover`, {
              method: "POST",
            });

            if (!response.ok) throw new Error("Failed to take over call");

            set((state) => ({
              activeCalls: state.activeCalls.map((call) =>
                call.id === id ? { ...call, mode: "HUMAN" } : call,
              ),
            }));
          } catch (error) {
            console.error("Error taking over call:", error);
          }
        },

        // Pause AI
        pauseAI: async (id) => {
          try {
            const response = await fetch(`${API_URL}/calls/${id}/pause-ai`, {
              method: "POST",
            });

            if (!response.ok) throw new Error("Failed to pause AI");

            set((state) => ({
              activeCalls: state.activeCalls.map((call) =>
                call.id === id ? { ...call, mode: "HYBRID" } : call,
              ),
            }));
          } catch (error) {
            console.error("Error pausing AI:", error);
          }
        },

        // Resume AI
        resumeAI: async (id) => {
          try {
            const response = await fetch(`${API_URL}/calls/${id}/resume-ai`, {
              method: "POST",
            });

            if (!response.ok) throw new Error("Failed to resume AI");

            set((state) => ({
              activeCalls: state.activeCalls.map((call) =>
                call.id === id ? { ...call, mode: "AI" } : call,
              ),
            }));
          } catch (error) {
            console.error("Error resuming AI:", error);
          }
        },

        // End call
        endCall: async (id) => {
          try {
            const response = await fetch(`${API_URL}/calls/${id}/end`, {
              method: "POST",
            });

            if (!response.ok) throw new Error("Failed to end call");

            get().updateCallStatus(id, "COMPLETED");
          } catch (error) {
            console.error("Error ending call:", error);
          }
        },

        // Initiate new call
        initiateCall: async (leadId) => {
          try {
            const response = await fetch(`${API_URL}/calls/initiate`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ leadId }),
            });

            if (!response.ok) throw new Error("Failed to initiate call");

            const data = await response.json();
            get().addCall(data.call);

            return data.call;
          } catch (error) {
            console.error("Error initiating call:", error);
            throw error;
          }
        },

        // Update metrics
        updateMetrics: (metrics) => {
          set((state) => ({
            callMetrics: { ...state.callMetrics, ...metrics },
          }));
        },

        // Queue management
        addToQueue: (call) => {
          set((state) => ({
            queuedCalls: [...state.queuedCalls, call].sort((a, b) => {
              const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            }),
          }));
        },

        removeFromQueue: (id) => {
          set((state) => ({
            queuedCalls: state.queuedCalls.filter((c) => c.id !== id),
          }));
        },

        updateQueuePriority: (id, priority) => {
          set((state) => ({
            queuedCalls: state.queuedCalls
              .map((call) => (call.id === id ? { ...call, priority } : call))
              .sort((a, b) => {
                const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              }),
          }));
        },

        // Start a new AI call
        startNewCall: async (params) => {
          try {
            const response = await fetch(`${API_URL}/calls/start`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phoneNumber: params.phoneNumber,
                contactName: params.contactName,
                company: params.company || "Unknown",
                objective: params.objective || "sales",
                script: params.script,
                notes: params.notes,
              }),
            });

            if (!response.ok) throw new Error("Failed to start AI call");

            const data = await response.json();
            
            // Add the new call to active calls
            const newCall: AICall = {
              id: data.callId,
              leadId: data.leadId || `lead-${Date.now()}`,
              leadName: params.contactName,
              company: params.company || "Unknown",
              phone: params.phoneNumber,
              status: "CONNECTING",
              mode: "AI",
              agentStatus: "IDLE",
              startTime: new Date(),
              duration: 0,
              sentiment: 50,
              aiAgentId: data.aiAgentId || "default-agent",
              tags: [params.objective || "sales"],
            };
            
            get().addCall(newCall);
            
            // Emit socket event if connected
            const socket = get().socket;
            if (socket && get().isConnected) {
              socket.emit("call:start", newCall);
            }

            return data;
          } catch (error) {
            console.error("Error starting new AI call:", error);
            throw error;
          }
        },
      }),
      {
        name: "ai-call-store",
        partialize: (state) => ({
          selectedCallId: state.selectedCallId,
        }),
      },
    ),
  ),
);
