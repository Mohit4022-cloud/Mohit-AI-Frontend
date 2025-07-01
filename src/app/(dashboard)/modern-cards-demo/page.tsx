"use client";

import { 
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  Mail,
  ShoppingCart,
  Target,
  Clock,
  Building,
  Phone,
  MoreVertical,
  Plus,
  Filter,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import "@/app/dashboard-optimizations.css";
import "@/app/table-optimizations.css";
import "@/app/queue-optimizations.css";
import "@/app/form-controls.css";

export default function ModernCardsDemo() {
  return (
    <div className="layout-workspace">
      <div className="layout-main-content">
        {/* Page Header */}
        <section className="layout-section">
          <div className="layout-section-header">
            <div>
              <h1 className="text-2xl font-semibold">Modern Card Design System</h1>
              <p className="text-muted mt-1">Clean, modern cards with gradient accents</p>
            </div>
            <div className="layout-section-actions">
              <button className="control-action control-action-secondary control-action-sm">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="control-action control-action-primary control-action-sm">
                <Plus className="h-4 w-4" />
                Add Widget
              </button>
            </div>
          </div>
        </section>

        {/* Modern Metric Cards */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-4">Metric Cards with Gradient Accents</h2>
          <div className="layout-metrics-grid">
            <div className="data-metric-box">
              <div className="data-metric-icon">
                <Users className="h-5 w-5" />
              </div>
              <div className="data-metric-value">12,543</div>
              <div className="data-metric-label">Total Users</div>
              <div className="data-metric-change data-metric-change-positive">
                <TrendingUp className="h-4 w-4" />
                <span>24.5% from last month</span>
              </div>
            </div>

            <div className="data-metric-box">
              <div className="data-metric-icon data-metric-icon-primary">
                <DollarSign className="h-5 w-5" />
              </div>
              <div className="data-metric-value">$89,420</div>
              <div className="data-metric-label">Revenue</div>
              <div className="data-metric-change data-metric-change-positive">
                <TrendingUp className="h-4 w-4" />
                <span>12.3% increase</span>
              </div>
            </div>

            <div className="data-metric-box">
              <div className="data-metric-icon data-metric-icon-success">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div className="data-metric-value">3,247</div>
              <div className="data-metric-label">Orders</div>
              <div className="data-metric-change data-metric-change-negative">
                <TrendingUp className="h-4 w-4 rotate-180" />
                <span>-5.4% from last week</span>
              </div>
            </div>

            <div className="data-metric-box">
              <div className="data-metric-icon data-metric-icon-warning">
                <Target className="h-5 w-5" />
              </div>
              <div className="data-metric-value">94.2%</div>
              <div className="data-metric-label">Goal Progress</div>
              <div className="data-metric-change data-metric-change-positive">
                <TrendingUp className="h-4 w-4" />
                <span>On track</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Container Example */}
        <section className="layout-section">
          <div className="layout-charts-grid">
            <div className="data-chart-container">
              <div className="data-chart-header">
                <div>
                  <h3 className="data-chart-title">Sales Overview</h3>
                  <p className="data-chart-subtitle">Monthly performance metrics</p>
                </div>
                <button className="control-action control-action-ghost control-action-sm">
                  <Calendar className="h-4 w-4" />
                  Last 30 days
                </button>
              </div>
              <div className="h-48 flex items-center justify-center text-muted">
                Chart visualization here
              </div>
            </div>

            <div className="data-chart-container">
              <div className="data-chart-header">
                <div>
                  <h3 className="data-chart-title">User Activity</h3>
                  <p className="data-chart-subtitle">Real-time engagement</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-muted">Live</span>
                  </span>
                </div>
              </div>
              <div className="h-48 flex items-center justify-center text-muted">
                Activity chart here
              </div>
            </div>
          </div>
        </section>

        {/* Modern Data Table */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-4">Modern Table Design</h2>
          <div className="data-table-container">
            <div className="layout-filter-bar">
              <div className="flex items-center gap-4">
                <div className="control-search">
                  <input type="text" className="control-input" placeholder="Search..." />
                </div>
                <select className="control-select">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>
                <button className="control-action control-action-secondary control-action-sm">
                  <Filter className="h-4 w-4" />
                  More Filters
                </button>
              </div>
            </div>

            <table className="data-table">
              <thead className="data-table-header">
                <tr>
                  <th className="data-table-head">Customer</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Progress</th>
                  <th className="data-table-head">Activity</th>
                  <th className="data-table-head text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {Array.from({ length: 5 }, (_, i) => (
                  <tr key={i} className="data-record-row">
                    <td className="data-table-cell">
                      <div className="flex items-center gap-3">
                        <div className="data-table-avatar">
                          {["AK", "SJ", "ML", "RD", "JW"][i]}
                        </div>
                        <div>
                          <div className="font-medium">{["Alex Kim", "Sarah Johnson", "Mike Lee", "Rachel Davis", "John Wilson"][i]}</div>
                          <div className="text-sm text-muted">{["alex@company.com", "sarah@startup.io", "mike@corp.com", "rachel@tech.co", "john@biz.com"][i]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <span className={`data-table-badge ${i === 0 ? 'data-table-badge-success' : i === 1 ? 'data-table-badge-warning' : i === 2 ? 'data-table-badge-danger' : 'data-table-badge-default'}`}>
                        {i === 0 ? 'Completed' : i === 1 ? 'In Progress' : i === 2 ? 'Delayed' : 'Pending'}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="data-table-score">
                        <div className="data-table-score-value">{[98, 75, 45, 60, 88][i]}%</div>
                        <div className="data-table-score-bar">
                          <div className="data-table-score-fill" style={{ width: `${[98, 75, 45, 60, 88][i]}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Clock className="h-4 w-4" />
                        {["2 min ago", "1 hour ago", "3 hours ago", "Yesterday", "2 days ago"][i]}
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
          </div>
        </section>

        {/* Queue Items with Modern Cards */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-4">Queue Items</h2>
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="data-queue-item">
                <div className="data-queue-primary">
                  <div className="data-queue-avatar">
                    {["TC", "BD", "KL"][i]}
                  </div>
                  <div className="data-queue-info">
                    <div className="data-queue-name">
                      {["Tom Chen", "Barbara Davis", "Kevin Lee"][i]}
                    </div>
                    <div className="data-queue-details">
                      <div className="data-queue-detail-item">
                        <Building className="data-queue-detail-icon" />
                        <span>{["TechCorp", "DataSystems", "CloudNet"][i]}</span>
                      </div>
                      <div className="data-queue-detail-item">
                        <Phone className="data-queue-detail-icon" />
                        <span>+1-555-{["0123", "4567", "8901"][i]}</span>
                      </div>
                      <div className="data-queue-detail-item">
                        <Mail className="data-queue-detail-icon" />
                        <span>{["Priority", "Standard", "Express"][i]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="data-queue-badges">
                  <span className={`data-queue-priority data-queue-priority-${['high', 'medium', 'low'][i]}`}>
                    {['HIGH', 'MEDIUM', 'LOW'][i]}
                  </span>
                  <button className="data-queue-action">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Form Card Example */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-4">Form Container</h2>
          <div className="data-container form-card">
            <h3 className="text-lg font-semibold mb-4">Quick Contact Form</h3>
            <div className="control-grid control-grid-2">
              <div className="control-group">
                <label className="control-label">First Name</label>
                <input type="text" className="control-input" placeholder="Enter first name" />
              </div>
              <div className="control-group">
                <label className="control-label">Last Name</label>
                <input type="text" className="control-input" placeholder="Enter last name" />
              </div>
              <div className="control-group">
                <label className="control-label">Email</label>
                <input type="email" className="control-input" placeholder="email@example.com" />
              </div>
              <div className="control-group">
                <label className="control-label">Priority</label>
                <select className="control-select">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="control-action control-action-primary">
                Submit Request
              </button>
              <button className="control-action control-action-secondary">
                Save Draft
              </button>
            </div>
          </div>
        </section>

        {/* Status Cards */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-4">Status Indicators</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="data-container p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">All Systems Operational</p>
                  <p className="text-sm text-muted">Last checked 5 min ago</p>
                </div>
              </div>
            </div>
            
            <div className="data-container p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Performance Degraded</p>
                  <p className="text-sm text-muted">Response time elevated</p>
                </div>
              </div>
            </div>

            <div className="data-container p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Service Disruption</p>
                  <p className="text-sm text-muted">API endpoint offline</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}