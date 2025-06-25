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
import { TryAIModalSimple } from "@/components/TryAIModalSimple";

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
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
        <div className="flex h-16 items-center px-6 border-b">
          <Zap className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold">Mohit AI</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
          
          {/* Try AI Button */}
          <button
            onClick={() => setIsTryAIModalOpen(true)}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-blue-600 hover:bg-blue-50 hover:text-blue-700 relative"
          >
            <Sparkles className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Try AI</span>
            <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              Live
            </span>
          </button>
        </nav>

        <div className="p-4 border-t">
          <div className="rounded-lg bg-primary/10 p-4">
            <h3 className="font-semibold mb-1">Response Status</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 pulse-dot" />
              <span className="text-sm text-muted-foreground">
                All systems active
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Avg response time: 47 seconds
            </p>
          </div>
        </div>
      </div>

      <TryAIModalSimple 
        isOpen={isTryAIModalOpen} 
        onClose={() => setIsTryAIModalOpen(false)} 
      />
    </>
  );
}
