"use client";

import { useState } from "react";
import { 
  Search, 
  Bell, 
  Plus,
  Download,
  Filter,
  ChevronDown,
  MoreVertical,
  Mail,
  Phone,
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Activity
} from "lucide-react";
import "@/app/platform-optimizations.css";
import "@/app/top-navigation.css";
import "@/app/navigation-optimizations.css";
import "@/app/dashboard-optimizations.css";
import "@/app/table-optimizations.css";
import "@/app/form-controls.css";

export default function PlatformDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="layout-workspace with-sidebar with-top-nav">
      {/* Sidebar Navigation */}
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
        {/* Top Navigation */}
        <header className="layout-top-bar">
          <div className="layout-top-left">
            <h1 className="app-page-title">Dashboard Overview</h1>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Main Content */}
        <main className="layout-main-content">
          {/* Metrics Grid */}
          <section className="layout-section">
            <div className="layout-metrics-grid">
              <div className="data-metric-box">
                <div className="data-metric-icon data-metric-icon-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div className="data-metric-value">1,234</div>
                <div className="data-metric-label">Total Leads</div>
                <div className="data-metric-change data-metric-change-positive">
                  <TrendingUp className="h-4 w-4" />
                  <span>12.5%</span>
                </div>
              </div>

              <div className="data-metric-box">
                <div className="data-metric-icon data-metric-icon-success">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="data-metric-value">$45.2K</div>
                <div className="data-metric-label">Revenue</div>
                <div className="data-metric-change data-metric-change-positive">
                  <TrendingUp className="h-4 w-4" />
                  <span>8.1%</span>
                </div>
              </div>

              <div className="data-metric-box">
                <div className="data-metric-icon data-metric-icon-warning">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="data-metric-value">89%</div>
                <div className="data-metric-label">Open Rate</div>
                <div className="data-metric-change data-metric-change-negative">
                  <TrendingUp className="h-4 w-4 rotate-180" />
                  <span>-2.3%</span>
                </div>
              </div>

              <div className="data-metric-box">
                <div className="data-metric-icon data-metric-icon-danger">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="data-metric-value">423</div>
                <div className="data-metric-label">Active Now</div>
                <div className="data-metric-change data-metric-change-positive">
                  <TrendingUp className="h-4 w-4" />
                  <span>15.8%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Data Table */}
          <section className="layout-section">
            <div className="layout-section-header">
              <h2 className="layout-section-title">Recent Leads</h2>
              <div className="layout-section-actions">
                <button className="control-action control-action-secondary control-action-sm">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                <button className="control-action control-action-primary control-action-sm">
                  <Plus className="h-4 w-4" />
                  Add Lead
                </button>
              </div>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead className="data-table-header">
                  <tr>
                    <th className="data-table-head">Name</th>
                    <th className="data-table-head">Company</th>
                    <th className="data-table-head">Email</th>
                    <th className="data-table-head">Status</th>
                    <th className="data-table-head">Score</th>
                    <th className="data-table-head text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="data-table-body">
                  {Array.from({ length: 10 }, (_, i) => (
                    <tr key={i} className="data-record-row">
                      <td className="data-table-cell">
                        <div className="flex items-center gap-3">
                          <div className="data-table-avatar">JD</div>
                          <span className="font-medium">John Doe {i + 1}</span>
                        </div>
                      </td>
                      <td className="data-table-cell">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>Company {i + 1}</span>
                        </div>
                      </td>
                      <td className="data-table-cell">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>john{i + 1}@example.com</span>
                        </div>
                      </td>
                      <td className="data-table-cell">
                        <span className={`data-table-badge ${i % 3 === 0 ? 'data-table-badge-success' : i % 3 === 1 ? 'data-table-badge-warning' : 'data-table-badge-default'}`}>
                          {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'New'}
                        </span>
                      </td>
                      <td className="data-table-cell">
                        <div className="data-table-score">
                          <div className="data-table-score-value">{85 - i * 5}</div>
                          <div className="data-table-score-bar">
                            <div className="data-table-score-fill" style={{ width: `${85 - i * 5}%` }} />
                          </div>
                        </div>
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
                  Showing 1 to 10 of 234 results
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

          {/* Form Section */}
          <section className="layout-section">
            <div className="layout-section-header">
              <h2 className="layout-section-title">Quick Add Lead</h2>
            </div>

            <div className="data-container" style={{ padding: '20px' }}>
              <div className="control-grid control-grid-2">
                <div className="control-group">
                  <label className="control-label control-label-required">First Name</label>
                  <input type="text" className="control-input" placeholder="John" />
                </div>
                <div className="control-group">
                  <label className="control-label control-label-required">Last Name</label>
                  <input type="text" className="control-input" placeholder="Doe" />
                </div>
                <div className="control-group">
                  <label className="control-label control-label-required">Email</label>
                  <input type="email" className="control-input" placeholder="john@example.com" />
                </div>
                <div className="control-group">
                  <label className="control-label">Phone</label>
                  <input type="tel" className="control-input" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button className="control-action control-action-primary">
                  <Plus className="h-4 w-4" />
                  Add Lead
                </button>
                <button className="control-action control-action-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}