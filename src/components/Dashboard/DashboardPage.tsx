import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Users, Phone, MessageCircle,
  BarChart3, Clock, Calendar, ArrowRight, MoreVertical,
  Activity, Target, Zap, Award
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardPage: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Metrics data
  const metrics = [
    {
      id: 'response-time',
      label: 'AVG RESPONSE TIME',
      value: '47s',
      change: -23,
      changeLabel: 'vs last week',
      icon: Clock,
      color: 'primary',
      bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%)'
    },
    {
      id: 'leads-contacted',
      label: 'LEADS CONTACTED',
      value: '1,234',
      change: 12,
      changeLabel: 'this month',
      icon: Users,
      color: 'blue',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
    },
    {
      id: 'qualification-rate',
      label: 'QUALIFICATION RATE',
      value: '68%',
      change: 5,
      changeLabel: 'qualified leads',
      icon: Target,
      color: 'green',
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
    },
    {
      id: 'conversion-rate',
      label: 'CONVERSION RATE',
      value: '24%',
      change: 8,
      changeLabel: 'to opportunities',
      icon: Award,
      color: 'purple',
      bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%)'
    }
  ];

  // Chart data
  const responseMetricsData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        label: 'Response Time',
        data: [45, 52, 38, 42, 35, 48],
        fill: true,
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderColor: '#ec4899',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ec4899',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const channelData = {
    labels: ['Voice Calls', 'Live Chat', 'Email', 'SMS'],
    datasets: [
      {
        data: [245, 189, 126, 87],
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderWidth: 0,
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 14,
          weight: 600
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: 'transparent'
        },
        ticks: {
          color: '#737373',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'transparent'
        },
        ticks: {
          color: '#737373',
          font: {
            size: 12
          }
        }
      }
    }
  };

  // Active leads data
  const activeLeads = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp',
      status: 'qualifying',
      channel: 'voice',
      time: '2m ago',
      avatar: 'SJ',
      score: 85
    },
    {
      id: 2,
      name: 'Mike Chen',
      company: 'StartupXYZ',
      status: 'contacted',
      channel: 'chat',
      time: '5m ago',
      avatar: 'MC',
      score: 72
    },
    {
      id: 3,
      name: 'Emily Davis',
      company: 'Enterprise Co',
      status: 'new',
      channel: 'email',
      time: '8m ago',
      avatar: 'ED',
      score: 90
    }
  ];

  return (
    <motion.div 
      className="dashboard-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div className="page-header" variants={itemVariants}>
        <div className="header-content">
          <h1 className="page-title">
            Performance Dashboard
          </h1>
          <p className="page-subtitle">
            Monitor your inbound lead performance with real-time analytics
          </p>
        </div>
        
        <div className="header-actions">
          <div className="time-range-selector">
            {['day', 'week', 'month'].map((range) => (
              <button
                key={range}
                className={`time-range-btn ${selectedTimeRange === range ? 'active' : ''}`}
                onClick={() => setSelectedTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          
          <motion.button 
            className="quantum-button quantum-button-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar size={18} />
            <span>Custom Range</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div className="metrics-grid" variants={itemVariants}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.change > 0;
          
          return (
            <motion.div
              key={metric.id}
              className="metric-card enhanced"
              style={{ background: metric.bgGradient }}
              onHoverStart={() => setHoveredMetric(metric.id)}
              onHoverEnd={() => setHoveredMetric(null)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="metric-header">
                <div className={`metric-icon ${metric.color}`}>
                  <Icon size={24} />
                </div>
                <button className="metric-menu">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div className="metric-body">
                <motion.div 
                  className="metric-value"
                  animate={{ 
                    scale: hoveredMetric === metric.id ? 1.1 : 1 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {metric.value}
                </motion.div>
                <div className="metric-label">{metric.label}</div>
                
                <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{isPositive ? '+' : ''}{metric.change}%</span>
                  <span className="change-label">{metric.changeLabel}</span>
                </div>
              </div>
              
              {/* Sparkline */}
              <div className="metric-sparkline">
                <svg viewBox="0 0 100 40" className="sparkline-svg">
                  <path
                    d="M0,30 Q25,10 50,20 T100,15"
                    fill="none"
                    stroke={isPositive ? '#10b981' : '#ef4444'}
                    strokeWidth="2"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Response Metrics Chart */}
        <motion.div className="chart-container large" variants={itemVariants}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Response Metrics</h3>
              <p className="chart-subtitle">Average response time today</p>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#ec4899' }} />
                <span>Response Time (seconds)</span>
              </div>
            </div>
          </div>
          
          <div className="chart-wrapper">
            <Line data={responseMetricsData} options={chartOptions} />
          </div>
          
          {/* Animated Background Pattern */}
          <div className="chart-bg-pattern">
            <motion.div 
              className="pattern-circle"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Channel Performance */}
        <motion.div className="chart-container small" variants={itemVariants}>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Channel Performance</h3>
              <p className="chart-subtitle">Lead engagement by channel</p>
            </div>
          </div>
          
          <div className="channel-stats">
            <div className="channel-item">
              <div className="channel-icon voice">
                <Phone size={20} />
              </div>
              <div className="channel-info">
                <div className="channel-name">Voice Calls</div>
                <div className="channel-count">245</div>
              </div>
              <div className="channel-percentage">49%</div>
              <div className="channel-bar">
                <motion.div 
                  className="channel-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '49%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ background: 'linear-gradient(90deg, #ec4899 0%, #db2777 100%)' }}
                />
              </div>
            </div>
            
            <div className="channel-item">
              <div className="channel-icon chat">
                <MessageCircle size={20} />
              </div>
              <div className="channel-info">
                <div className="channel-name">Live Chat</div>
                <div className="channel-count">189</div>
              </div>
              <div className="channel-percentage">38%</div>
              <div className="channel-bar">
                <motion.div 
                  className="channel-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '38%' }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                  style={{ background: 'linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%)' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Leads Section */}
      <motion.div className="active-leads-section" variants={itemVariants}>
        <div className="section-header">
          <h3 className="section-title">Active Leads</h3>
          <p className="section-subtitle">Currently being processed</p>
          <motion.button 
            className="view-all-btn"
            whileHover={{ x: 5 }}
          >
            View All
            <ArrowRight size={16} />
          </motion.button>
        </div>
        
        <div className="leads-list">
          <AnimatePresence>
            {activeLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                className="lead-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="lead-avatar">
                  <div className="avatar-circle" style={{
                    background: `linear-gradient(135deg, 
                      hsl(${lead.score * 3.6}, 70%, 50%) 0%, 
                      hsl(${lead.score * 3.6 + 30}, 70%, 40%) 100%)`
                  }}>
                    {lead.avatar}
                  </div>
                  <div className={`status-dot ${lead.status}`} />
                </div>
                
                <div className="lead-info">
                  <div className="lead-name">{lead.name}</div>
                  <div className="lead-company">{lead.company}</div>
                </div>
                
                <div className="lead-meta">
                  <div className={`lead-badge ${lead.status}`}>
                    {lead.status.toUpperCase()}
                  </div>
                  <div className="lead-channel">
                    {lead.channel === 'voice' && <Phone size={14} />}
                    {lead.channel === 'chat' && <MessageCircle size={14} />}
                    {lead.channel === 'email' && <Activity size={14} />}
                    <span>{lead.channel}</span>
                  </div>
                  <div className="lead-time">{lead.time}</div>
                </div>
                
                <div className="lead-score">
                  <div className="score-label">Score</div>
                  <div className="score-value">{lead.score}</div>
                  <div className="score-bar">
                    <motion.div 
                      className="score-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${lead.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      style={{
                        background: lead.score > 80 ? '#10b981' : 
                                  lead.score > 60 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <style jsx>{`
        .dashboard-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--color-neutral-100);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 1rem;
          color: var(--color-neutral-400);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .time-range-selector {
          display: flex;
          background: var(--dashboard-surface);
          border: 1px solid var(--dashboard-border);
          border-radius: 0.75rem;
          padding: 0.25rem;
        }

        .time-range-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          border-radius: 0.5rem;
          color: var(--color-neutral-400);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-range-btn:hover {
          color: var(--color-neutral-100);
        }

        .time-range-btn.active {
          background: var(--dashboard-surface-hover);
          color: var(--color-primary-400);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card.enhanced {
          position: relative;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--dashboard-border);
          overflow: hidden;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .metric-icon.primary {
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
        }

        .metric-icon.blue {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .metric-icon.green {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .metric-icon.purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
        }

        .metric-menu {
          background: transparent;
          border: none;
          color: var(--color-neutral-500);
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .metric-menu:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-neutral-300);
        }

        .metric-sparkline {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100px;
          height: 40px;
          opacity: 0.3;
        }

        .sparkline-svg {
          width: 100%;
          height: 100%;
        }

        .charts-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-container {
          background: var(--dashboard-surface);
          border: 1px solid var(--dashboard-border);
          border-radius: 1rem;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .chart-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-neutral-100);
          margin-bottom: 0.25rem;
        }

        .chart-subtitle {
          font-size: 0.875rem;
          color: var(--color-neutral-500);
        }

        .chart-wrapper {
          height: 300px;
          position: relative;
          z-index: 1;
        }

        .chart-legend {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--color-neutral-400);
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .chart-bg-pattern {
          position: absolute;
          top: -50%;
          right: -50%;
          width: 300px;
          height: 300px;
          pointer-events: none;
        }

        .pattern-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%);
        }

        .channel-stats {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .channel-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1rem;
          align-items: center;
        }

        .channel-icon {
          width: 40px;
          height: 40px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .channel-icon.voice {
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
        }

        .channel-icon.chat {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
        }

        .channel-info {
          display: flex;
          flex-direction: column;
        }

        .channel-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-neutral-100);
        }

        .channel-count {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-neutral-100);
        }

        .channel-percentage {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-neutral-300);
        }

        .channel-bar {
          grid-column: 1 / -1;
          height: 6px;
          background: var(--dashboard-bg);
          border-radius: 3px;
          overflow: hidden;
        }

        .channel-bar-fill {
          height: 100%;
          border-radius: 3px;
        }

        .active-leads-section {
          background: var(--dashboard-surface);
          border: 1px solid var(--dashboard-border);
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-neutral-100);
        }

        .section-subtitle {
          font-size: 0.875rem;
          color: var(--color-neutral-500);
          flex: 1;
        }

        .view-all-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--color-primary-400);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-all-btn:hover {
          color: var(--color-primary-300);
        }

        .leads-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .lead-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--dashboard-bg);
          border: 1px solid var(--dashboard-border);
          border-radius: 0.75rem;
          transition: all 0.2s;
        }

        .lead-avatar {
          position: relative;
        }

        .avatar-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          font-size: 1rem;
        }

        .status-dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--dashboard-bg);
        }

        .status-dot.new {
          background: #10b981;
        }

        .status-dot.qualifying {
          background: #f59e0b;
        }

        .status-dot.contacted {
          background: #3b82f6;
        }

        .lead-info {
          flex: 1;
        }

        .lead-name {
          font-weight: 600;
          color: var(--color-neutral-100);
          margin-bottom: 0.125rem;
        }

        .lead-company {
          font-size: 0.875rem;
          color: var(--color-neutral-500);
        }

        .lead-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .lead-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .lead-badge.new {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .lead-badge.qualifying {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .lead-badge.contacted {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .lead-channel {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-neutral-400);
        }

        .lead-time {
          font-size: 0.875rem;
          color: var(--color-neutral-500);
        }

        .lead-score {
          text-align: right;
        }

        .score-label {
          font-size: 0.75rem;
          color: var(--color-neutral-500);
          margin-bottom: 0.25rem;
        }

        .score-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-neutral-100);
          margin-bottom: 0.5rem;
        }

        .score-bar {
          width: 80px;
          height: 4px;
          background: var(--dashboard-surface-hover);
          border-radius: 2px;
          overflow: hidden;
        }

        .score-bar-fill {
          height: 100%;
          border-radius: 2px;
        }

        @media (max-width: 1024px) {
          .charts-row {
            grid-template-columns: 1fr;
          }
          
          .metrics-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }
          
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default DashboardPage;