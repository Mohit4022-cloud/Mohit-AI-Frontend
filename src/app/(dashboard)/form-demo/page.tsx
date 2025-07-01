"use client";

import { useState } from "react";
import { Search, Calendar, Upload, Plus, Filter, Download, X } from "lucide-react";
import "@/app/form-controls.css";

export default function FormDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    subscribe: false,
    plan: "pro",
  });

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    date: "",
  });

  return (
    <div className="layout-page-container">
      {/* Page Header */}
      <div className="layout-page-header">
        <div>
          <h1 className="layout-page-title">Form Controls Demo</h1>
          <p className="layout-page-subtitle">
            Standardized form controls for efficient data entry
          </p>
        </div>
      </div>

      {/* Filter Bar Example */}
      <div className="layout-section">
        <h2 className="text-lg font-semibold mb-4">Filter Bar Example</h2>
        <div className="layout-filter-bar">
          <div className="layout-filter-group">
            <label className="layout-filter-label">Search:</label>
            <div className="control-search">
              <Search className="control-search-icon" />
              <input
                type="text"
                className="control-input"
                placeholder="Search..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>
          <div className="layout-filter-group">
            <label className="layout-filter-label">Status:</label>
            <select
              className="control-select"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="layout-filter-group">
            <label className="layout-filter-label">Date:</label>
            <div className="control-date">
              <input
                type="date"
                className="control-input"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
              <Calendar className="control-date-icon" />
            </div>
          </div>
          <button className="control-action control-action-primary control-action-sm">
            <Filter className="h-4 w-4" />
            Apply Filters
          </button>
          <button className="control-action control-action-secondary control-action-sm">
            Clear
          </button>
        </div>
      </div>

      {/* Form Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Form Controls */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Basic Form Controls</h2>
          
          <div className="control-group">
            <label className="control-label control-label-required">Full Name</label>
            <input
              type="text"
              className="control-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <span className="control-help">Your full legal name</span>
          </div>

          <div className="control-group">
            <label className="control-label control-label-required">Email Address</label>
            <input
              type="email"
              className="control-input"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="control-group">
            <label className="control-label">Company</label>
            <input
              type="text"
              className="control-input control-input-success"
              placeholder="Company name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div className="control-group">
            <label className="control-label">Role</label>
            <select
              className="control-select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="">Select a role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Message</label>
            <textarea
              className="control-textarea"
              placeholder="Enter your message..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="control-group">
            <label className="control-label">Disabled Input</label>
            <input
              type="text"
              className="control-input"
              placeholder="This input is disabled"
              disabled
            />
          </div>

          <div className="control-group">
            <label className="control-label">Error State</label>
            <input
              type="text"
              className="control-input control-input-error"
              placeholder="This field has an error"
            />
            <span className="control-error">This field is required</span>
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Advanced Controls</h2>

          {/* Checkboxes and Radios */}
          <div className="control-group">
            <label className="control-label">Preferences</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="control-checkbox"
                  checked={formData.subscribe}
                  onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                />
                <span className="text-sm">Subscribe to newsletter</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="control-checkbox" />
                <span className="text-sm">Accept terms and conditions</span>
              </label>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Plan Selection</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="plan"
                  className="control-radio"
                  value="basic"
                  checked={formData.plan === "basic"}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                />
                <span className="text-sm">Basic Plan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="plan"
                  className="control-radio"
                  value="pro"
                  checked={formData.plan === "pro"}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                />
                <span className="text-sm">Pro Plan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="plan"
                  className="control-radio"
                  value="enterprise"
                  checked={formData.plan === "enterprise"}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                />
                <span className="text-sm">Enterprise Plan</span>
              </label>
            </div>
          </div>

          {/* Switch */}
          <div className="control-group">
            <label className="control-label">Settings</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable notifications</span>
                <button className="control-switch control-switch-checked">
                  <span className="control-switch-thumb"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-save drafts</span>
                <button className="control-switch">
                  <span className="control-switch-thumb"></span>
                </button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="control-group">
            <label className="control-label">File Upload</label>
            <input type="file" id="file-upload" className="control-file" />
            <label htmlFor="file-upload" className="control-file-trigger">
              <Upload className="h-4 w-4" />
              Choose file
            </label>
          </div>

          {/* Input Groups */}
          <div className="control-group">
            <label className="control-label">Price Range</label>
            <div className="control-input-group">
              <span className="control-input-addon">$</span>
              <input type="number" className="control-input" placeholder="Min" />
              <input type="number" className="control-input" placeholder="Max" />
            </div>
          </div>

          {/* Inline Controls */}
          <div className="control-group">
            <label className="control-label">Quick Add</label>
            <div className="control-inline">
              <input type="text" className="control-input" placeholder="Enter item name" />
              <button className="control-action control-action-primary">
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Button Variations */}
      <div className="bg-white p-6 rounded-lg border mt-6">
        <h2 className="text-lg font-semibold mb-4">Button Variations</h2>
        
        <div className="space-y-4">
          {/* Sizes */}
          <div>
            <h3 className="text-sm font-medium mb-2">Sizes</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="control-action control-action-primary control-action-sm">Small</button>
              <button className="control-action control-action-primary">Default</button>
              <button className="control-action control-action-primary control-action-lg">Large</button>
            </div>
          </div>

          {/* Variants */}
          <div>
            <h3 className="text-sm font-medium mb-2">Variants</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="control-action control-action-primary">Primary</button>
              <button className="control-action control-action-secondary">Secondary</button>
              <button className="control-action control-action-ghost">Ghost</button>
              <button className="control-action control-action-danger">Danger</button>
              <button className="control-action control-action-success">Success</button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-sm font-medium mb-2">States</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="control-action control-action-primary">Normal</button>
              <button className="control-action control-action-primary control-action-loading">Loading</button>
              <button className="control-action control-action-primary" disabled>Disabled</button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-2">Icon Buttons</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="control-action control-action-primary control-action-icon">
                <Plus className="h-4 w-4" />
              </button>
              <button className="control-action control-action-secondary control-action-icon">
                <Download className="h-4 w-4" />
              </button>
              <button className="control-action control-action-ghost control-action-icon control-action-icon-sm">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Full Width */}
          <div>
            <h3 className="text-sm font-medium mb-2">Full Width</h3>
            <button className="control-action control-action-primary control-action-full">
              Submit Form
            </button>
          </div>
        </div>
      </div>

      {/* Form Grid Example */}
      <div className="bg-white p-6 rounded-lg border mt-6">
        <h2 className="text-lg font-semibold mb-4">Form Grid Layout</h2>
        
        <div className="control-grid control-grid-2">
          <div className="control-group">
            <label className="control-label">First Name</label>
            <input type="text" className="control-input" placeholder="John" />
          </div>
          <div className="control-group">
            <label className="control-label">Last Name</label>
            <input type="text" className="control-input" placeholder="Doe" />
          </div>
          <div className="control-group">
            <label className="control-label">Email</label>
            <input type="email" className="control-input" placeholder="john@example.com" />
          </div>
          <div className="control-group">
            <label className="control-label">Phone</label>
            <input type="tel" className="control-input" placeholder="+1 (555) 123-4567" />
          </div>
        </div>
      </div>
    </div>
  );
}