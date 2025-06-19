"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Sparkles
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: React.ReactNode;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Live Queue", href: "/queue", icon: Clock },
  { 
    name: "AI Calls", 
    href: "/ai-calls", 
    icon: Phone,
    badge: <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-blue-500" />
  },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Campaigns", href: "/campaigns", icon: Target },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
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
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge}
              </div>
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className="rounded-lg bg-primary/10 p-4">
          <h3 className="font-semibold mb-1">Response Status</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 pulse-dot" />
            <span className="text-sm text-muted-foreground">All systems active</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Avg response time: 47 seconds
          </p>
        </div>
      </div>
    </div>
  );
}