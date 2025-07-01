"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Phone,
  BarChart3,
  Settings,
  Zap,
  MessageSquare,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";
import { TryAIVoice } from "@/components/TryAIVoice";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Live Queue", href: "/queue", icon: Clock },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Campaigns", href: "/campaigns", icon: Target },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isTryAIModalOpen, setIsTryAIModalOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-80 glass-card rounded-r-[32px] m-0">
        <div className="flex h-24 items-center px-8">
          <div className="ultra-icon-box ultra-icon-box-accent">
            <Zap className="h-8 w-8" />
          </div>
          <span className="ultra-heading-3 ml-4">Mohit AI</span>
        </div>
        
        <div className="ultra-divider mx-8" />

        <nav className="flex-1 space-y-4 p-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-24 px-6 py-4 text-sm font-semibold transition-all scan-effect",
                  isActive
                    ? "bg-black text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black hover:shadow-md hover:transform hover:scale-105",
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-16 flex items-center justify-center transition-all",
                  isActive ? "bg-accent-pink" : "bg-gray-200"
                )}>
                  <item.icon className={cn(
                    "h-5 w-5",
                    isActive ? "text-white" : "text-gray-600"
                  )} />
                </div>
                {item.name}
              </Link>
            );
          })}
          
          
          <div className="ultra-spacer-lg" />
          
          {/* Try AI Button */}
          <button
            onClick={() => setIsTryAIModalOpen(true)}
            className="ultra-button ultra-button-accent w-full flex items-center justify-center gap-3 scan-effect"
          >
            <Sparkles className="h-5 w-5" />
            <span>Try AI</span>
            <span className="ultra-badge ml-auto">
              LIVE
            </span>
          </button>
        </nav>

        <div className="p-8">
          <div className="glass-card glass-card-accent">
            <h3 className="font-bold text-lg mb-4">System Status</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-3 w-3 rounded-full bg-accent-pink animate-pulse" />
              <span className="text-sm font-medium">
                All systems active
              </span>
            </div>
            <div className="ultra-spacer-sm" />
            <p className="text-xs opacity-60">
              Avg response: <span className="text-accent-pink font-bold">47s</span>
            </p>
          </div>
        </div>
      </div>

      <TryAIVoice 
        isOpen={isTryAIModalOpen} 
        onClose={() => setIsTryAIModalOpen(false)} 
      />
    </>
  );
}
