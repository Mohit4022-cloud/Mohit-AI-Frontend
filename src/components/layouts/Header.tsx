"use client";

import { Bell, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CompactThemeSwitcher } from "@/components/UI/ThemeSwitcher";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications] = useState(3);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="quantum-header">
      {/* Search Section */}
      <div className="header-left">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="search" 
            placeholder="Search leads, conversations..." 
            className="search-input"
          />
          <div className="search-shortcut">⌘K</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Theme Switcher */}
        <CompactThemeSwitcher />
        
        {/* Notifications */}
        <motion.button 
          className="header-button notifications"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={20} />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </motion.button>
        
        {/* User Profile */}
        <div className="user-dropdown-container">
          <motion.button 
            className="user-profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="user-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.name || "User"}</div>
              <div className="user-role">{user?.email || "user@example.com"}</div>
            </div>
            <ChevronDown size={16} className="dropdown-icon" />
          </motion.button>

          <AnimatePresence>
            {showDropdown && (
              <>
                <motion.div 
                  className="dropdown-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowDropdown(false)}
                />
                <motion.div 
                  className="user-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="dropdown-header">
                    <div className="dropdown-user-avatar">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="dropdown-user-name">{user?.name || "User"}</div>
                      <div className="dropdown-user-email">{user?.email}</div>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider" />
                  
                  <a href="/settings" className="dropdown-item">
                    <User size={16} />
                    <span>Profile</span>
                  </a>
                  <a href="/settings/team" className="dropdown-item">
                    <Settings size={16} />
                    <span>Team Settings</span>
                  </a>
                  
                  <div className="dropdown-divider" />
                  
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .quantum-header {
          height: 64px;
          background: #0f0f0f;
          border-bottom: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: relative;
          z-index: 40;
        }

        /* Search Section */
        .header-left {
          flex: 1;
          max-width: 500px;
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: #737373;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 3.5rem 0.75rem 3rem;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 0.75rem;
          color: #fafafa;
          font-size: 0.875rem;
          transition: all 0.2s;
          outline: none;
        }

        .search-input::placeholder {
          color: #737373;
        }

        .search-input:focus {
          border-color: #ec4899;
          background: #262626;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
        }

        .search-shortcut {
          position: absolute;
          right: 1rem;
          background: #262626;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          color: #737373;
          border: 1px solid #3a3a3a;
          font-family: ui-monospace, monospace;
        }

        /* Right Section */
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Header Button */
        .header-button {
          position: relative;
          background: transparent;
          border: none;
          color: #a3a3a3;
          padding: 0.75rem;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .header-button:hover {
          background: #1a1a1a;
          color: #fafafa;
        }

        .notification-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: #ec4899;
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
          min-width: 18px;
          text-align: center;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }

        /* User Profile */
        .user-dropdown-container {
          position: relative;
        }

        .user-profile-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: transparent;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-profile-button:hover {
          background: #1a1a1a;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }

        .user-info {
          text-align: left;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #fafafa;
        }

        .user-role {
          font-size: 0.75rem;
          color: #737373;
        }

        .dropdown-icon {
          color: #737373;
          margin-left: 0.5rem;
        }

        /* Dropdown */
        .dropdown-overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          width: 280px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 0.75rem;
          box-shadow: 0 10px 50px -20px rgba(0, 0, 0, 0.5);
          z-index: 50;
          overflow: hidden;
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #262626;
        }

        .dropdown-user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.25rem;
        }

        .dropdown-user-name {
          font-weight: 600;
          color: #fafafa;
          margin-bottom: 0.25rem;
        }

        .dropdown-user-email {
          font-size: 0.875rem;
          color: #737373;
        }

        .dropdown-divider {
          height: 1px;
          background: #2a2a2a;
          margin: 0.5rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #d4d4d4;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          font-size: 0.875rem;
        }

        .dropdown-item:hover {
          background: #262626;
          color: #fafafa;
        }

        .dropdown-item.logout {
          color: #ef4444;
        }

        .dropdown-item.logout:hover {
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </header>
  );
}