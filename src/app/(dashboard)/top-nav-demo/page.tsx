"use client";

import { useState } from "react";
import { 
  Search, 
  Bell, 
  Settings, 
  ChevronDown, 
  Home,
  LogOut,
  User,
  HelpCircle,
  Menu,
  Plus,
  Download,
  RefreshCw
} from "lucide-react";
import "@/app/top-navigation.css";

export default function TopNavDemo() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standard Top Navigation */}
      <header className="layout-top-bar">
        <div className="layout-top-left">
          <h1 className="app-page-title">Dashboard</h1>
          <nav className="app-breadcrumb">
            <a href="/" className="app-breadcrumb-link">Home</a>
            <span className="app-breadcrumb-separator">/</span>
            <a href="/analytics" className="app-breadcrumb-link">Analytics</a>
            <span className="app-breadcrumb-separator">/</span>
            <span className="app-breadcrumb-current">Performance</span>
          </nav>
        </div>

        <div className="layout-header-actions">
          {/* Search */}
          <div className="layout-header-search">
            <Search className="control-search-icon" />
            <input
              type="text"
              className="control-input"
              placeholder="Search..."
            />
          </div>

          {/* Quick Actions */}
          <div className="app-quick-actions">
            <button className="app-quick-action" title="Add New">
              <Plus className="app-quick-action-icon" />
            </button>
            <button className="app-quick-action" title="Export">
              <Download className="app-quick-action-icon" />
            </button>
            <button className="app-quick-action" title="Refresh">
              <RefreshCw className="app-quick-action-icon" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="app-notification-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="app-notification-icon" />
              {hasNotifications && <span className="app-notification-badge" />}
            </button>
            
            {showNotifications && (
              <div className="app-dropdown-menu active">
                <div className="app-dropdown-item">
                  <div className="flex-1">
                    <div className="font-medium text-sm">New lead assigned</div>
                    <div className="text-xs text-gray-500">2 minutes ago</div>
                  </div>
                </div>
                <div className="app-dropdown-item">
                  <div className="flex-1">
                    <div className="font-medium text-sm">Campaign completed</div>
                    <div className="text-xs text-gray-500">1 hour ago</div>
                  </div>
                </div>
                <div className="app-dropdown-divider" />
                <div className="app-dropdown-item">
                  <span className="text-sm">View all notifications</span>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button 
              className="app-user-menu"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="app-user-avatar">JD</div>
              <div className="app-user-info">
                <span className="app-user-name">John Doe</span>
                <span className="app-user-role">Admin</span>
              </div>
              <ChevronDown className="app-user-dropdown-icon" />
            </button>

            {showUserMenu && (
              <div className="app-dropdown-menu active">
                <div className="app-dropdown-item">
                  <User className="app-dropdown-icon" />
                  <span>Profile</span>
                </div>
                <div className="app-dropdown-item">
                  <Settings className="app-dropdown-icon" />
                  <span>Settings</span>
                </div>
                <div className="app-dropdown-item">
                  <HelpCircle className="app-dropdown-icon" />
                  <span>Help & Support</span>
                </div>
                <div className="app-dropdown-divider" />
                <div className="app-dropdown-item">
                  <LogOut className="app-dropdown-icon" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button className="app-mobile-menu-toggle">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Compact Navigation Example */}
      <div className="mt-20">
        <header className="layout-top-bar layout-top-bar-compact">
          <div className="layout-top-left">
            <h1 className="app-page-title">Leads Management</h1>
          </div>

          <div className="layout-header-actions">
            <div className="layout-header-search">
              <Search className="control-search-icon" />
              <input
                type="text"
                className="control-input"
                placeholder="Search..."
              />
            </div>

            <button className="app-notification-button">
              <Bell className="app-notification-icon" />
            </button>

            <button className="app-user-menu">
              <div className="app-user-avatar">
                <img src="/api/placeholder/32/32" alt="User" />
              </div>
            </button>
          </div>
        </header>
      </div>

      {/* Dark Mode Example */}
      <div className="mt-20">
        <header className="layout-top-bar layout-top-bar-dark">
          <div className="layout-top-left">
            <h1 className="app-page-title">Dark Mode Navigation</h1>
            <nav className="app-breadcrumb">
              <a href="/" className="app-breadcrumb-link">Dashboard</a>
              <span className="app-breadcrumb-separator">/</span>
              <span className="app-breadcrumb-current">Settings</span>
            </nav>
          </div>

          <div className="layout-header-actions">
            <button className="app-notification-button">
              <Bell className="app-notification-icon" />
            </button>

            <button className="app-user-menu">
              <div className="app-user-avatar">MS</div>
              <div className="app-user-info">
                <span className="app-user-name">Mary Smith</span>
                <span className="app-user-role">Manager</span>
              </div>
            </button>
          </div>
        </header>
      </div>

      {/* Example Content */}
      <div className="p-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Navigation Features</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Fixed height of 56px (48px for compact variant)</li>
            <li>• Sticky positioning with subtle shadow on scroll</li>
            <li>• Responsive breadcrumb navigation</li>
            <li>• Integrated search with 240px width</li>
            <li>• Quick action buttons for common tasks</li>
            <li>• Notification bell with badge indicator</li>
            <li>• User menu with avatar and dropdown</li>
            <li>• Mobile-responsive with menu toggle</li>
            <li>• Dark mode support</li>
            <li>• Seamless integration with sidebar layout</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
          <h2 className="text-lg font-semibold mb-4">Implementation Notes</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium mb-1">Basic Usage:</h3>
              <code className="block bg-gray-100 p-3 rounded">
                {`<header className="layout-top-bar">
  <div className="layout-top-left">
    <h1 className="app-page-title">Page Title</h1>
  </div>
  <div className="layout-header-actions">
    <!-- Actions here -->
  </div>
</header>`}
              </code>
            </div>

            <div>
              <h3 className="font-medium mb-1">With Sidebar:</h3>
              <code className="block bg-gray-100 p-3 rounded">
                {`<div className="with-sidebar">
  <header className="layout-top-bar">
    <!-- Navigation content -->
  </header>
</div>`}
              </code>
            </div>

            <div>
              <h3 className="font-medium mb-1">Compact Version:</h3>
              <code className="block bg-gray-100 p-3 rounded">
                {`<header className="layout-top-bar layout-top-bar-compact">
  <!-- Reduced height navigation -->
</header>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}