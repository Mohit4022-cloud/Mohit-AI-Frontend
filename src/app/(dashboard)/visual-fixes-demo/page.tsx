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
  BarChart,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

export default function VisualFixesDemo() {
  return (
    <div className="layout-workspace">
      {/* Premium Dark Navigation */}
      <nav className="app-navigation-panel">
        <div className="app-navigation-brand">Mohit AI</div>
        
        <a href="#" className="app-navigation-link active">
          <Activity className="w-5 h-5" />
          Dashboard
        </a>
        <a href="#" className="app-navigation-link">
          <Users className="w-5 h-5" />
          Leads
        </a>
        <a href="#" className="app-navigation-link">
          <Phone className="w-5 h-5" />
          Calls
        </a>
        <a href="#" className="app-navigation-link">
          <Mail className="w-5 h-5" />
          Campaigns
        </a>
        <a href="#" className="app-navigation-link">
          <Calendar className="w-5 h-5" />
          Calendar
        </a>
        <a href="#" className="app-navigation-link">
          <BarChart className="w-5 h-5" />
          Analytics
        </a>
        
        <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
          <a href="#" className="app-navigation-link">
            <Settings className="w-5 h-5" />
            Settings
          </a>
          <a href="#" className="app-navigation-link">
            <LogOut className="w-5 h-5" />
            Logout
          </a>
        </div>
      </nav>

      {/* Main Content with Subtle Gradient */}
      <div className="layout-main-content" data-nav-open="true">
        <div className="layout-content">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your leads today.</p>
          </div>

          {/* Metrics Grid - Clean White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="data-metric-box">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">+12.5%</span>
              </div>
              <div className="data-metric-value">2,847</div>
              <div className="data-metric-label">Total Leads</div>
            </div>

            <div className="data-metric-box">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
              </div>
              <div className="data-metric-value">429</div>
              <div className="data-metric-label">Active Conversations</div>
            </div>

            <div className="data-metric-box">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">-3.1%</span>
              </div>
              <div className="data-metric-value">$94.2k</div>
              <div className="data-metric-label">Pipeline Value</div>
            </div>

            <div className="data-metric-box">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">-15.3%</span>
              </div>
              <div className="data-metric-value">47s</div>
              <div className="data-metric-label">Avg Response Time</div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="data-table-container">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Lead Activity</h2>
                </div>
                <div className="p-6">
                  <table className="data-table w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Lead</th>
                        <th className="text-left">Company</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3">
                          <div className="font-medium">Sarah Johnson</div>
                          <div className="text-sm text-gray-600">sarah@techcorp.com</div>
                        </td>
                        <td className="py-3">Tech Corp</td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Qualified
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">2 min ago</td>
                      </tr>
                      <tr>
                        <td className="py-3">
                          <div className="font-medium">Michael Chen</div>
                          <div className="text-sm text-gray-600">m.chen@startup.io</div>
                        </td>
                        <td className="py-3">StartupXYZ</td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            In Progress
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">15 min ago</td>
                      </tr>
                      <tr>
                        <td className="py-3">
                          <div className="font-medium">Emily Davis</div>
                          <div className="text-sm text-gray-600">emily@enterprise.com</div>
                        </td>
                        <td className="py-3">Enterprise Inc</td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            New
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">1 hour ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="control-panel">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="control-button control-button-primary w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Start Call Campaign
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="control-button w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Send Email Blast
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="control-button w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Import Leads
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="control-panel mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Calls Made</span>
                      <span className="font-medium">124 / 150</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Emails Sent</span>
                      <span className="font-medium">89 / 100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Meetings Booked</span>
                      <span className="font-medium">12 / 10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}