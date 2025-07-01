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
      <div className="layout-fixed layout-inset-vertical layout-left-0 layout-width-80 app-surface-glass app-corner-right-32 layout-margin-0">
        <div className="layout-flex layout-height-24 layout-items-center layout-pad-x-8">
          <div className="app-icon-container app-icon-container-accent">
            <Zap className="layout-height-8 layout-width-8" />
          </div>
          <span className="app-title-tertiary layout-margin-left-4">Mohit AI</span>
        </div>
        
        <div className="app-separator layout-margin-x-8" />

        <nav className="layout-flex-grow layout-space-y-4 layout-pad-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "layout-flex layout-items-center layout-gap-4 app-corner-24 layout-pad-x-6 layout-pad-y-4 app-text-sm app-font-semibold app-transition-full app-scan-animation",
                  isActive
                    ? "app-bg-black app-text-white app-shadow-large app-transform app-scale-105"
                    : "app-text-gray-600 app-hover-bg-gray-100 app-hover-text-black app-hover-shadow-medium app-hover-transform app-hover-scale-105",
                )}
              >
                <div className={cn(
                  "layout-height-8 layout-width-8 app-corner-16 layout-flex layout-items-center layout-justify-center app-transition-full",
                  isActive ? "app-bg-primary" : "app-bg-gray-200"
                )}>
                  <item.icon className={cn(
                    "layout-height-5 layout-width-5",
                    isActive ? "app-text-white" : "app-text-gray-600"
                  )} />
                </div>
                {item.name}
              </Link>
            );
          })}
          
          
          <div className="layout-gap-large" />
          
          {/* Try AI Button */}
          <button
            onClick={() => setIsTryAIModalOpen(true)}
            className="control-action control-action-primary layout-width-full layout-flex layout-items-center layout-justify-center layout-gap-3 app-scan-animation"
          >
            <Sparkles className="layout-height-5 layout-width-5" />
            <span>Try AI</span>
            <span className="app-status-indicator layout-margin-left-auto">
              LIVE
            </span>
          </button>
        </nav>

        <div className="layout-pad-8">
          <div className="app-surface-glass app-surface-accent">
            <h3 className="app-font-bold app-text-lg layout-margin-bottom-4">System Status</h3>
            <div className="layout-flex layout-items-center layout-gap-3 layout-margin-bottom-3">
              <div className="layout-height-3 layout-width-3 app-corner-circle app-bg-primary app-anim-pulse" />
              <span className="app-text-sm app-font-medium">
                All systems active
              </span>
            </div>
            <div className="layout-gap-small" />
            <p className="app-text-xs app-opacity-60">
              Avg response: <span className="app-text-primary app-font-bold">47s</span>
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
