"use client";

import { useState } from "react";
import { 
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  Mail,
  Phone,
  Building,
  MoreVertical,
  Filter,
  Plus,
  Bell,
  ChevronDown,
  Search
} from "lucide-react";
import "@/app/dashboard-optimizations.css";
import "@/app/table-optimizations.css";
import "@/app/top-navigation.css";
import "@/app/navigation-optimizations.css";

export default function ModernBgDemo() {
  return (
    <div className="layout-workspace with-sidebar with-top-nav">
      {/* Dark Premium Sidebar */}
      <nav className="app-navigation-panel">
        <div className="app-logo-container">
          <div className="app-logo">Platform</div>
        </div>
        
        <div className="app-nav-section">
          <div className="app-nav-label">Main</div>
          <a href="#" className="app-nav-item app-nav-item-active">
            <Activity className="app-nav-icon" />
            <span className="app-nav-text">Dashboard</span>
          </a>
          <a href="#" className="app-nav-item">
            <Users className="app-nav-icon" />
            <span className="app-nav-text">Leads</span>
          </a>
          <a href="#" className="app-nav-item">
            <Mail className="app-nav-icon" />
            <span className="app-nav-text">Campaigns</span>
          </a>
        </div>
      </nav>

      {/* Content Area */}
      <div className="layout-content-area">
        {/* Clean White Top Navigation */}
        <header className="layout-top-bar">
          <div className="layout-top-left">
            <h1 className="app-page-title">Modern Background Demo</h1>
            <nav className="app-breadcrumb">
              <a href="/" className="app-breadcrumb-link">Home</a>
              <span className="app-breadcrumb-separator">/</span>
              <span className="app-breadcrumb-current">Dashboard</span>
            </nav>
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
              <span className="app-notification-badge" />
            </button>

            <button className="app-user-menu">
              <div className="app-user-avatar">JD</div>
              <div className="app-user-info">
                <span className="app-user-name">John Doe</span>
                <span className="app-user-role">Admin</span>
              </div>
              <ChevronDown className="app-user-dropdown-icon" />
            </button>
          </div>
        </header>

        {/* Main Content with Subtle Gradient */}
        <main className="layout-main-content">
          {/* Clean White Metrics */}
          <section className="layout-section">
            <h2 className="layout-section-title mb-4">Key Metrics</h2>
            <div className="layout-metrics-grid">
              <div className="data-metric-box">
                <div className="data-metric-icon" style={{ background: '#ede9fe', color: '#5850ec' }}>
                  <Users className="h-5 w-5" />
                </div>
                <div className="data-metric-value">2,847</div>
                <div className="data-metric-label">Total Users</div>
                <div className="data-metric-change data-metric-change-positive">
                  <TrendingUp className="h-4 w-4" />
                  <span>12.5%</span>
                </div>
              </div>

              <div className="data-metric-box">
                <div className="data-metric-icon" style={{ background: '#dcfce7', color: '#10b981' }}>
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="data-metric-value">$125.4K</div>
                <div className="data-metric-label">Revenue</div>
                <div className="data-metric-change data-metric-change-positive">
                  <TrendingUp className="h-4 w-4" />
                  <span>8.3%</span>
                </div>
              </div>

              <div className="data-metric-box">
                <div className="data-metric-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                  <Mail className="h-5 w-5" />
                </div>
                <div className="data-metric-value">94.2%</div>
                <div className="data-metric-label">Open Rate</div>
                <div className="data-metric-change data-metric-change-negative">
                  <TrendingUp className="h-4 w-4 rotate-180" />
                  <span>-1.2%</span>
                </div>
              </div>

              <div className="data-metric-box">
                <div className="data-metric-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
                  <Activity className="h-5 w-5" />
                </div>
                <div className="data-metric-value">647</div>
                <div className="data-metric-label">Active Now</div>
                <div className="data-metric-change data-metric-change-positive">
                  <TrendingUp className="h-4 w-4" />
                  <span>23.1%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Clean White Table */}
          <section className="layout-section">
            <div className="layout-section-header">
              <h2 className="layout-section-title">Recent Activity</h2>
              <div className="layout-section-actions">
                <button className="control-action control-action-secondary control-action-sm">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                <button className="control-action control-action-primary control-action-sm">
                  <Plus className="h-4 w-4" />
                  Add New
                </button>
              </div>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead className="data-table-header">
                  <tr>
                    <th className="data-table-head">Contact</th>
                    <th className="data-table-head">Company</th>
                    <th className="data-table-head">Status</th>
                    <th className="data-table-head">Last Activity</th>
                    <th className="data-table-head text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="data-table-body">
                  {Array.from({ length: 5 }, (_, i) => (
                    <tr key={i} className="data-record-row">
                      <td className="data-table-cell">
                        <div className="flex items-center gap-3">
                          <div className="data-table-avatar" style={{ 
                            background: ['#ede9fe', '#dcfce7', '#fef3c7', '#fee2e2', '#e0e7ff'][i],
                            color: ['#5850ec', '#10b981', '#f59e0b', '#ef4444', '#3730a3'][i]
                          }}>
                            {["JD", "AS", "MK", "LW", "RB"][i]}
                          </div>
                          <div>
                            <div className="font-medium">{["John Doe", "Anna Smith", "Mike King", "Lisa Wang", "Rob Brown"][i]}</div>
                            <div className="text-sm text-gray-500">
                              {["john", "anna", "mike", "lisa", "rob"][i]}@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="data-table-cell">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{["TechCorp", "Innovate", "StartupXYZ", "Enterprise", "Global"][i]}</span>
                        </div>
                      </td>
                      <td className="data-table-cell">
                        <span className={`data-table-badge ${i % 3 === 0 ? 'data-table-badge-success' : i % 3 === 1 ? 'data-table-badge-warning' : 'data-table-badge-default'}`}>
                          {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'New'}
                        </span>
                      </td>
                      <td className="data-table-cell text-muted">
                        {i + 1} hours ago
                      </td>
                      <td className="data-table-cell text-right">
                        <button className="data-table-action">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="data-table-footer">
                <div className="data-table-info">
                  Showing 1 to 5 of 234 results
                </div>
                <div className="data-table-pagination">
                  <button className="data-pagination-button" disabled>Previous</button>
                  <button className="data-pagination-page data-pagination-page-active">1</button>
                  <button className="data-pagination-page">2</button>
                  <button className="data-pagination-page">3</button>
                  <button className="data-pagination-button">Next</button>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Confirmation Section */}
          <section className="layout-section">
            <h2 className="layout-section-title mb-4">Visual System Check</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="data-container p-6">
                <h3 className="font-semibold mb-2">Clean White Background</h3>
                <p className="text-muted mb-3">All containers use clean white backgrounds with subtle shadows for depth.</p>
                <div className="flex gap-2">
                  <button className="control-action control-action-primary control-action-sm">Primary</button>
                  <button className="control-action control-action-secondary control-action-sm">Secondary</button>
                </div>
              </div>
              
              <div className="data-container p-6">
                <h3 className="font-semibold mb-2">Text Readability</h3>
                <p className="mb-2">Primary text: Clear and readable (#111827)</p>
                <p className="text-muted">Secondary text: Proper contrast (#6b7280)</p>
                <div className="mt-3">
                  <span className="data-table-badge data-table-badge-success mr-2">Success</span>
                  <span className="data-table-badge data-table-badge-warning mr-2">Warning</span>
                  <span className="data-table-badge">Default</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}