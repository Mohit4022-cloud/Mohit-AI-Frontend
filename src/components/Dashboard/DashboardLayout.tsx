'use client';

import React, { useState } from 'react';
import { 
  Home, Users, Activity, MessageSquare, BarChart3, 
  Settings, Menu, X, Bell, Search,
  Calendar, ChevronRight
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [notifications] = useState(3);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'live-queue', label: 'Live Queue', icon: Activity },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="tw-int-flex tw-int-h-screen tw-int-bg-int-dark-950 tw-int-relative tw-int-overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="tw-int-fixed tw-int-inset-0 tw-int-pointer-events-none">
        <div className="tw-int-absolute tw-int-top-0 tw-int-right-0 tw-int-w-[800px] tw-int-h-[800px] tw-int-opacity-20">
          <div className="tw-int-w-full tw-int-h-full tw-int-bg-gradient-radial tw-int-from-int-primary-500/30 tw-int-to-transparent" />
        </div>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`tw-int-bg-int-dark-50 tw-int-border-r tw-int-border-int-dark-200 tw-int-flex tw-int-flex-col tw-int-relative tw-int-z-10 tw-int-transition-all tw-int-duration-300 ${
          sidebarOpen ? 'tw-int-w-[280px]' : 'tw-int-w-[80px]'
        }`}
      >
        {/* Logo Section */}
        <div className="tw-int-p-6 tw-int-border-b tw-int-border-int-dark-200">
          <div className="tw-int-flex tw-int-items-center tw-int-justify-between">
            <div className="tw-int-flex tw-int-items-center tw-int-gap-3">
              <div className="tw-int-w-10 tw-int-h-10 tw-int-bg-gradient-to-br tw-int-from-int-primary-500 tw-int-to-int-primary-700 tw-int-rounded-int-lg tw-int-flex tw-int-items-center tw-int-justify-center tw-int-font-bold tw-int-text-white">
                M
              </div>
              {sidebarOpen && (
                <span className="int-heading-5 tw-int-text-int-neutral-50 int-animate-fadeIn">
                  Mohit AI
                </span>
              )}
            </div>
            <button 
              className="tw-int-p-2 tw-int-rounded-int-md tw-int-text-int-neutral-400 hover:tw-int-bg-int-dark-100 hover:tw-int-text-int-neutral-100 tw-int-transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="tw-int-flex-1 tw-int-p-4 tw-int-overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`tw-int-flex tw-int-items-center tw-int-gap-3 tw-int-px-4 tw-int-py-3 tw-int-mb-1 tw-int-rounded-int-lg tw-int-relative tw-int-transition-all tw-int-group ${
                  isActive 
                    ? 'tw-int-bg-int-primary-500/10 tw-int-text-int-primary-400' 
                    : 'tw-int-text-int-neutral-400 hover:tw-int-bg-int-dark-100 hover:tw-int-text-int-neutral-100'
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                {isActive && (
                  <div className="tw-int-absolute tw-int-left-0 tw-int-top-0 tw-int-bottom-0 tw-int-w-[3px] tw-int-bg-int-primary-500 tw-int-rounded-r-full" />
                )}
                <Icon size={20} className="tw-int-flex-shrink-0" />
                {sidebarOpen && (
                  <span className="tw-int-font-medium int-animate-fadeIn">{item.label}</span>
                )}
                {isActive && sidebarOpen && (
                  <ChevronRight size={16} className="tw-int-ml-auto int-animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Try AI Button */}
        <div className="tw-int-p-4 tw-int-border-t tw-int-border-int-dark-200">
          <button className="int-quantum-button int-quantum-button-primary tw-int-w-full tw-int-relative tw-int-overflow-hidden group">
            <span className="tw-int-text-xl">✨</span>
            {sidebarOpen && (
              <>
                <span className="int-animate-fadeIn">Try AI</span>
                <span className="tw-int-ml-2 tw-int-bg-white/20 tw-int-px-2 tw-int-py-0.5 tw-int-rounded-full tw-int-text-xs tw-int-font-bold">
                  BETA
                </span>
              </>
            )}
            <div className="tw-int-absolute tw-int-inset-0 tw-int-bg-gradient-to-r tw-int-from-transparent tw-int-via-white/10 tw-int-to-transparent tw-int-translate-x-[-100%] group-hover:tw-int-translate-x-[100%] tw-int-transition-transform tw-int-duration-700" />
          </button>
          
          {/* System Status */}
          {sidebarOpen && (
            <div className="tw-int-mt-4 tw-int-p-3 tw-int-bg-int-dark-100 tw-int-rounded-int-lg int-animate-fadeIn">
              <div className="tw-int-flex tw-int-items-center tw-int-gap-2 tw-int-mb-2">
                <span className="int-status-indicator active"></span>
                <span className="tw-int-text-xs tw-int-text-int-neutral-400">All systems active</span>
              </div>
              <div className="tw-int-flex tw-int-justify-between tw-int-text-xs">
                <span className="tw-int-text-int-neutral-500">Avg response:</span>
                <span className="tw-int-text-int-primary-400 tw-int-font-semibold">47s</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="tw-int-flex-1 tw-int-flex tw-int-flex-col tw-int-overflow-hidden">
        {/* Top Bar */}
        <header className="tw-int-bg-int-dark-50 tw-int-border-b tw-int-border-int-dark-200 tw-int-px-8 tw-int-py-4">
          <div className="tw-int-flex tw-int-items-center tw-int-justify-between">
            <div className="tw-int-flex-1 tw-int-max-w-xl">
              <div className="tw-int-relative">
                <Search size={20} className="tw-int-absolute tw-int-left-4 tw-int-top-1/2 tw-int-transform tw-int--translate-y-1/2 tw-int-text-int-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search leads, conversations..." 
                  className="tw-int-w-full tw-int-pl-12 tw-int-pr-20 tw-int-py-3 tw-int-bg-int-dark-100 tw-int-border tw-int-border-int-dark-200 tw-int-rounded-int-lg tw-int-text-int-neutral-100 tw-int-placeholder-int-neutral-500 focus:tw-int-border-int-primary-500 focus:tw-int-outline-none focus:tw-int-ring-1 focus:tw-int-ring-int-primary-500 tw-int-transition-all"
                />
                <div className="tw-int-absolute tw-int-right-3 tw-int-top-1/2 tw-int-transform tw-int--translate-y-1/2 tw-int-bg-int-dark-200 tw-int-px-2 tw-int-py-1 tw-int-rounded tw-int-text-xs tw-int-text-int-neutral-500 tw-int-border tw-int-border-int-dark-300">
                  ⌘K
                </div>
              </div>
            </div>
            
            <div className="tw-int-flex tw-int-items-center tw-int-gap-4 tw-int-ml-8">
              {/* Notifications */}
              <button className="tw-int-relative tw-int-p-3 tw-int-rounded-int-lg tw-int-text-int-neutral-400 hover:tw-int-bg-int-dark-100 hover:tw-int-text-int-neutral-100 tw-int-transition-all">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="tw-int-absolute tw-int-top-2 tw-int-right-2 tw-int-bg-int-primary-500 tw-int-text-white tw-int-text-xs tw-int-font-bold tw-int-w-5 tw-int-h-5 tw-int-rounded-full tw-int-flex tw-int-items-center tw-int-justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* User Profile */}
              <div className="tw-int-flex tw-int-items-center tw-int-gap-3 tw-int-p-2 tw-int-rounded-int-lg hover:tw-int-bg-int-dark-100 tw-int-cursor-pointer tw-int-transition-all">
                <div className="tw-int-w-10 tw-int-h-10 tw-int-rounded-full tw-int-bg-gradient-to-br tw-int-from-int-primary-400 tw-int-to-int-primary-600 tw-int-flex tw-int-items-center tw-int-justify-center tw-int-text-white tw-int-font-semibold">
                  JD
                </div>
                <div className="tw-int-text-left">
                  <div className="tw-int-text-sm tw-int-font-semibold tw-int-text-int-neutral-100">John Doe</div>
                  <div className="tw-int-text-xs tw-int-text-int-neutral-500">SDR at Productiv</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="tw-int-flex-1 tw-int-p-8 tw-int-overflow-y-auto">
          <div className="int-animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;