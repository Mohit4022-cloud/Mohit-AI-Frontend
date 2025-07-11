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
  Menu,
  X,
  ChevronRight,
  Activity,
  Calendar,
} from "lucide-react";
import { TryAIVoice } from "@/components/TryAIVoice";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Live Queue", href: "/queue", icon: Activity },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Campaigns", href: "/campaigns", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isTryAIModalOpen, setIsTryAIModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <motion.aside 
        className="quantum-sidebar"
        initial={false}
        animate={{ width: isExpanded ? 280 : 80 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Gradient Background Effect */}
        <div className="sidebar-gradient-bg" />
        
        {/* Header */}
        <div className="sidebar-header">
          <motion.div 
            className="sidebar-header-content"
            animate={{ justifyContent: isExpanded ? 'space-between' : 'center' }}
          >
            <div className="sidebar-logo-group">
              <div className="sidebar-logo">
                <Zap className="w-5 h-5" />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span 
                    className="sidebar-title"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    Mohit AI
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <button 
              className="sidebar-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <motion.div key={item.name} className="nav-item-wrapper">
                <Link
                  href={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  title={!isExpanded ? item.name : undefined}
                >
                  <motion.div 
                    className="nav-item-content"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="nav-icon" size={20} />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span 
                          className="nav-label"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isExpanded && isActive && (
                      <ChevronRight className="nav-chevron" size={16} />
                    )}
                  </motion.div>
                  {isActive && (
                    <motion.div 
                      className="nav-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Try AI Button */}
          <motion.button
            onClick={() => setIsTryAIModalOpen(true)}
            className="try-ai-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="try-ai-content">
              <Sparkles className="try-ai-icon" size={20} />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Try AI
                  </motion.span>
                )}
              </AnimatePresence>
              {isExpanded && <span className="try-ai-badge">LIVE</span>}
            </div>
            <div className="try-ai-glow" />
          </motion.button>

          {/* System Status */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                className="system-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="status-header">
                  <span className="status-title">System Status</span>
                </div>
                <div className="status-indicator-row">
                  <div className="status-dot active" />
                  <span className="status-text">All systems active</span>
                </div>
                <div className="status-metrics">
                  <span className="metric-label">Avg response:</span>
                  <span className="metric-value">47s</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      <TryAIVoice 
        isOpen={isTryAIModalOpen} 
        onClose={() => setIsTryAIModalOpen(false)} 
      />

      <style jsx>{`
        .quantum-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          background: #0f0f0f;
          border-right: 1px solid #2a2a2a;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 50;
        }

        .sidebar-gradient-bg {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at 30% 50%,
            rgba(236, 72, 153, 0.05) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* Header */
        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid #2a2a2a;
        }

        .sidebar-header-content {
          display: flex;
          align-items: center;
        }

        .sidebar-logo-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sidebar-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
        }

        .sidebar-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fafafa;
          letter-spacing: -0.025em;
        }

        .sidebar-toggle {
          background: transparent;
          border: none;
          color: #737373;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .sidebar-toggle:hover {
          background: #1a1a1a;
          color: #fafafa;
        }

        /* Navigation */
        .sidebar-nav {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .nav-item-wrapper {
          margin-bottom: 0.25rem;
        }

        .nav-item {
          display: block;
          position: relative;
          text-decoration: none;
          border-radius: 0.75rem;
          transition: all 0.2s;
        }

        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          position: relative;
          z-index: 2;
        }

        .nav-icon {
          flex-shrink: 0;
          color: #a3a3a3;
          transition: color 0.2s;
        }

        .nav-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #a3a3a3;
          transition: color 0.2s;
        }

        .nav-chevron {
          margin-left: auto;
          color: #ec4899;
        }

        .nav-item:hover .nav-item-content {
          background: #1a1a1a;
        }

        .nav-item:hover .nav-icon,
        .nav-item:hover .nav-label {
          color: #fafafa;
        }

        .nav-item.active .nav-item-content {
          background: rgba(236, 72, 153, 0.1);
        }

        .nav-item.active .nav-icon,
        .nav-item.active .nav-label {
          color: #ec4899;
        }

        .nav-indicator {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #ec4899;
          border-radius: 0 3px 3px 0;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }

        /* Footer */
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #2a2a2a;
        }

        /* Try AI Button */
        .try-ai-button {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          border: none;
          border-radius: 0.75rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .try-ai-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          z-index: 2;
        }

        .try-ai-icon {
          flex-shrink: 0;
        }

        .try-ai-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .try-ai-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          border-radius: 0.75rem;
          opacity: 0;
          filter: blur(10px);
          transition: opacity 0.3s;
        }

        .try-ai-button:hover .try-ai-glow {
          opacity: 0.4;
        }

        /* System Status */
        .system-status {
          background: #1a1a1a;
          border-radius: 0.75rem;
          padding: 1rem;
          border: 1px solid #2a2a2a;
        }

        .status-header {
          margin-bottom: 0.75rem;
        }

        .status-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #a3a3a3;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-indicator-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #737373;
        }

        .status-dot.active {
          background: #10b981;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }

        .status-text {
          font-size: 0.75rem;
          color: #d4d4d4;
        }

        .status-metrics {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          margin-top: 0.5rem;
        }

        .metric-label {
          color: #737373;
        }

        .metric-value {
          color: #ec4899;
          font-weight: 600;
        }

        /* Scrollbar */
        .sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 2px;
        }

        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: #3a3a3a;
        }

        /* Collapsed State */
        :global(.quantum-sidebar[style*="width: 80px"] .sidebar-toggle) {
          margin: 0 auto;
        }

        :global(.quantum-sidebar[style*="width: 80px"] .nav-item-content) {
          justify-content: center;
        }
      `}</style>
    </>
  );
}