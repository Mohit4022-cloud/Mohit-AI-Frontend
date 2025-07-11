"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
import MohitAILogo from "@/components/MohitAILogo";
import "@/app/navigation-optimizations.css";
import "@/app/dashboard-sidebar-fix.css";
import "@/app/dashboard-sidebar-force-desktop.css";
import "@/app/dashboard-sidebar-override.css";
import "@/app/dashboard-sidebar-colors.css";

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
      <div className="app-navigation-panel dashboard-sidebar">
        {/* Compact Header */}
        <div className="app-nav-header">
          <div className="app-nav-logo">
            <MohitAILogo size="small" />
          </div>
          <span className="app-nav-title">Mohit AI</span>
        </div>
        
        <div className="app-nav-divider" />

        {/* Navigation Links */}
        <nav className="app-nav-section">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                data-tooltip={item.name}
                className={`app-nav-link ${isActive ? 'app-nav-link-active' : ''}`}
              >
                <div className="app-nav-icon-box">
                  <item.icon className="app-nav-icon" />
                </div>
                <span className="app-nav-label">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="app-nav-divider" />
        
        {/* Try AI Button */}
        <button
          onClick={() => setIsTryAIModalOpen(true)}
          className="app-nav-action"
        >
          <Sparkles className="app-nav-icon" />
          <span>Try AI</span>
          <span className="app-nav-badge">LIVE</span>
        </button>

        {/* Compact Status Box */}
        <div className="app-nav-status">
          <h3 className="app-nav-status-title">System Status</h3>
          <div className="app-nav-status-indicator">
            <div className="app-nav-status-dot" />
            <span className="app-nav-status-text">All systems active</span>
          </div>
          <p className="app-nav-status-metric">
            Avg response: <span className="app-nav-status-value">47s</span>
          </p>
        </div>
      </div>

      <TryAIVoice 
        isOpen={isTryAIModalOpen} 
        onClose={() => setIsTryAIModalOpen(false)} 
      />
    </>
  );
}