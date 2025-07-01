"use client";

import React from "react";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Phone,
  Mail,
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Plus
} from "lucide-react";

export default function CleanFoundationDemo() {
  return (
    <div className="layout-workspace">
      {/* Navigation */}
      <nav className="app-navigation-panel">
        <div className="app-navigation-brand">Mohit AI</div>
        
        <a href="#" className="app-navigation-link active">
          <Activity className="w-5 h-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className="app-navigation-link">
          <Users className="w-5 h-5 mr-3" />
          Leads
        </a>
        <a href="#" className="app-navigation-link">
          <Phone className="w-5 h-5 mr-3" />
          Calls
        </a>
        <a href="#" className="app-navigation-link">
          <Mail className="w-5 h-5 mr-3" />
          Campaigns
        </a>
        <a href="#" className="app-navigation-link">
          <Calendar className="w-5 h-5 mr-3" />
          Calendar
        </a>
      </nav>

      {/* Main Content */}
      <div className="layout-content" style={{ marginLeft: '240px' }}>
        <div className="data-section-header mb-8">
          <h1 className="data-section-title text-3xl">Clean Foundation Dashboard</h1>
          <button className="control-button control-button-primary">
            <Plus className="w-4 h-4" />
            Add New Lead
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="layout-grid mb-8">
          <div className="data-metric-box">
            <div className="data-metric-icon">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="data-metric-value">2,847</div>
            <div className="data-metric-label">Total Leads</div>
            <div className="data-metric-trend positive">
              <TrendingUp className="w-4 h-4" />
              +12.5%
            </div>
          </div>

          <div className="data-metric-box">
            <div className="data-metric-icon">
              <Users className="w-6 h-6" />
            </div>
            <div className="data-metric-value">429</div>
            <div className="data-metric-label">Active Conversations</div>
            <div className="data-metric-trend positive">
              <TrendingUp className="w-4 h-4" />
              +8.2%
            </div>
          </div>

          <div className="data-metric-box">
            <div className="data-metric-icon">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="data-metric-value">$94.2k</div>
            <div className="data-metric-label">Pipeline Value</div>
            <div className="data-metric-trend negative">
              <TrendingUp className="w-4 h-4 rotate-180" />
              -3.1%
            </div>
          </div>

          <div className="data-metric-box">
            <div className="data-metric-icon">
              <Clock className="w-6 h-6" />
            </div>
            <div className="data-metric-value">47s</div>
            <div className="data-metric-label">Avg Response Time</div>
            <div className="data-metric-trend positive">
              <TrendingUp className="w-4 h-4" />
              -15.3%
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="data-section">
          <div className="data-section-header">
            <h2 className="data-section-title">Recent Leads</h2>
            <div className="flex gap-2">
              <button className="control-button control-button-secondary">
                <Search className="w-4 h-4" />
                Search
              </button>
              <button className="control-button control-button-secondary">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="control-button control-button-secondary">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Value</th>
                  <th>Last Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sarah Johnson</td>
                  <td>Tech Corp</td>
                  <td><span className="text-pink">Qualified</span></td>
                  <td>$12,500</td>
                  <td>2 hours ago</td>
                  <td>
                    <button className="control-button control-button-primary" style={{ padding: '4px 12px' }}>
                      Contact
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Michael Chen</td>
                  <td>StartupXYZ</td>
                  <td><span className="text-purple">In Progress</span></td>
                  <td>$8,900</td>
                  <td>5 hours ago</td>
                  <td>
                    <button className="control-button control-button-primary" style={{ padding: '4px 12px' }}>
                      Contact
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Emily Davis</td>
                  <td>Enterprise Inc</td>
                  <td><span className="text-secondary">New</span></td>
                  <td>$25,000</td>
                  <td>1 day ago</td>
                  <td>
                    <button className="control-button control-button-primary" style={{ padding: '4px 12px' }}>
                      Contact
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Section */}
        <div className="data-section mt-8">
          <h2 className="data-section-title mb-6">Quick Add Lead</h2>
          <form className="grid grid-cols-2 gap-4">
            <div className="control-group">
              <label className="control-label">Full Name</label>
              <input type="text" className="control-input" placeholder="John Doe" />
            </div>
            <div className="control-group">
              <label className="control-label">Email</label>
              <input type="email" className="control-input" placeholder="john@example.com" />
            </div>
            <div className="control-group">
              <label className="control-label">Company</label>
              <input type="text" className="control-input" placeholder="Company Inc." />
            </div>
            <div className="control-group">
              <label className="control-label">Phone</label>
              <input type="tel" className="control-input" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="control-group col-span-2">
              <label className="control-label">Notes</label>
              <textarea className="control-textarea" rows={3} placeholder="Add any notes..." />
            </div>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="control-button control-button-primary">
                Add Lead
              </button>
              <button type="button" className="control-button control-button-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}