"use client";

import { 
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";

export default function TypographyDemo() {
  return (
    <div className="layout-workspace">
      <div className="layout-main-content">
        {/* Page Header */}
        <section className="layout-section">
          <h1 className="text-4xl font-bold tracking-tight">Typography & Color System</h1>
          <p className="text-large text-muted mt-2">
            Enhanced typography with Inter font and cohesive gradients
          </p>
        </section>

        {/* Typography Scale */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-6">Typography Scale</h2>
          <div className="data-container p-8">
            <div className="space-y-6">
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Display Large • 48px</p>
                <p className="data-metric-value-large">$1,234,567.89</p>
              </div>
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Display • 32px</p>
                <p className="data-metric-value">$234,567.89</p>
              </div>
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Display Small • 24px</p>
                <p className="data-metric-value-small">$34,567.89</p>
              </div>
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Heading 1 • 36px</p>
                <h1>Platform Dashboard Overview</h1>
              </div>
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Heading 2 • 28px</p>
                <h2>Analytics & Performance</h2>
              </div>
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Body Large • 16px</p>
                <p className="text-large">This is large body text used for important content that needs emphasis.</p>
              </div>
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Body • 14px</p>
                <p>This is standard body text used throughout the application for regular content.</p>
              </div>
              <div>
                <p className="text-tiny text-muted uppercase tracking-wide mb-2">Small • 13px</p>
                <p className="text-small text-muted">This is small text used for secondary information and descriptions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Text Examples */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-6">Gradient Text</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="data-container p-6 text-center">
              <div className="data-metric-value highlight mb-2">$89,420</div>
              <p className="data-metric-label">Primary Gradient</p>
            </div>
            <div className="data-container p-6 text-center">
              <div className="data-metric-value highlight-success mb-2">+24.5%</div>
              <p className="data-metric-label">Success Gradient</p>
            </div>
            <div className="data-container p-6 text-center">
              <div className="data-metric-value highlight-info mb-2">1,234</div>
              <p className="data-metric-label">Info Gradient</p>
            </div>
          </div>
        </section>

        {/* Metric Cards with Enhanced Typography */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-6">Enhanced Metric Cards</h2>
          <div className="layout-metrics-grid">
            <div className="data-metric-box">
              <div className="data-metric-icon">
                <Users className="h-5 w-5" />
              </div>
              <div className="data-metric-value">12,543</div>
              <div className="data-metric-label">Total Users</div>
              <div className="data-metric-change positive">
                <TrendingUp className="h-4 w-4" />
                <span>24.5%</span>
              </div>
            </div>

            <div className="data-metric-box">
              <div className="data-metric-icon data-metric-icon-success">
                <DollarSign className="h-5 w-5" />
              </div>
              <div className="data-metric-value highlight">$89,420</div>
              <div className="data-metric-label">Revenue</div>
              <div className="data-metric-change positive">
                <TrendingUp className="h-4 w-4" />
                <span>12.3%</span>
              </div>
            </div>

            <div className="data-metric-box">
              <div className="data-metric-icon data-metric-icon-warning">
                <Activity className="h-5 w-5" />
              </div>
              <div className="data-metric-value">3,247</div>
              <div className="data-metric-label">Active Sessions</div>
              <div className="data-metric-change negative">
                <TrendingDown className="h-4 w-4" />
                <span>5.4%</span>
              </div>
            </div>

            <div className="data-metric-box">
              <div className="data-metric-icon data-metric-icon-info">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="data-metric-value">847</div>
              <div className="data-metric-label">Orders Today</div>
              <div className="data-metric-change neutral">
                <Minus className="h-4 w-4" />
                <span>0.0%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Color System */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-6">Color System</h2>
          
          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Primary Palette</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--color-primary)' }}></div>
                <p className="font-medium">Primary</p>
                <p className="text-small text-muted">#8b5cf6</p>
              </div>
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--color-accent)' }}></div>
                <p className="font-medium">Accent</p>
                <p className="text-small text-muted">#ec4899</p>
              </div>
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--color-success)' }}></div>
                <p className="font-medium">Success</p>
                <p className="text-small text-muted">#10b981</p>
              </div>
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--color-warning)' }}></div>
                <p className="font-medium">Warning</p>
                <p className="text-small text-muted">#f59e0b</p>
              </div>
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--color-danger)' }}></div>
                <p className="font-medium">Danger</p>
                <p className="text-small text-muted">#ef4444</p>
              </div>
            </div>
          </div>

          {/* Gradients */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Gradient System</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--gradient-primary)' }}></div>
                <p className="font-medium">Primary</p>
                <p className="text-small text-muted">Pink → Purple</p>
              </div>
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--gradient-success)' }}></div>
                <p className="font-medium">Success</p>
                <p className="text-small text-muted">Green → Blue</p>
              </div>
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--gradient-warning)' }}></div>
                <p className="font-medium">Warning</p>
                <p className="text-small text-muted">Orange → Red</p>
              </div>
              <div className="text-center">
                <div className="h-24 rounded-lg mb-3" style={{ background: 'var(--gradient-info)' }}></div>
                <p className="font-medium">Info</p>
                <p className="text-small text-muted">Blue → Purple</p>
              </div>
            </div>
          </div>

          {/* Neutral Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Neutral Palette</h3>
            <div className="grid grid-cols-6 gap-4">
              {[
                { name: "Dark", var: "--color-dark", value: "#1a1a2e" },
                { name: "Gray 900", var: "--color-gray-900", value: "#111827" },
                { name: "Gray 700", var: "--color-gray-700", value: "#374151" },
                { name: "Gray 500", var: "--color-gray-500", value: "#6b7280" },
                { name: "Gray 300", var: "--color-gray-300", value: "#d1d5db" },
                { name: "Gray 100", var: "--color-gray-100", value: "#f3f4f6" }
              ].map((color) => (
                <div key={color.name} className="text-center">
                  <div 
                    className="h-20 rounded-lg mb-2 border" 
                    style={{ 
                      background: `var(${color.var})`,
                      borderColor: color.name.includes("100") ? "#e5e7eb" : "transparent"
                    }}
                  ></div>
                  <p className="text-small font-medium">{color.name}</p>
                  <p className="text-tiny text-muted">{color.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chart Color Example */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-6">Chart Colors</h2>
          <div className="data-container p-6">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ background: 'var(--gradient-chart-pink)' }}></div>
                <p className="chart-label text-center">Pink Chart Fill</p>
              </div>
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ background: 'var(--gradient-chart-purple)' }}></div>
                <p className="chart-label text-center">Purple Chart Fill</p>
              </div>
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ background: 'var(--gradient-chart-blue)' }}></div>
                <p className="chart-label text-center">Blue Chart Fill</p>
              </div>
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ background: 'var(--gradient-chart-green)' }}></div>
                <p className="chart-label text-center">Green Chart Fill</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Weights */}
        <section className="layout-section">
          <h2 className="layout-section-title mb-6">Font Weights</h2>
          <div className="data-container p-6">
            <div className="space-y-3">
              <p className="font-normal text-large">Font Weight 400 - Normal</p>
              <p className="font-medium text-large">Font Weight 500 - Medium</p>
              <p className="font-semibold text-large">Font Weight 600 - Semibold</p>
              <p className="font-bold text-large">Font Weight 700 - Bold</p>
              <p className="font-extrabold text-large">Font Weight 800 - Extra Bold</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}