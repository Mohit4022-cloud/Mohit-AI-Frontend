"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Shield,
  Eye,
  DollarSign,
  Activity,
  Target,
  Award,
  ChartLine,
  BrainCircuit,
  Building2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  MinusCircle,
  Phone,
  ChevronDown,
  FileBarChart,
  UserCheck,
  AlertCircle,
  Gauge,
  LineChart,
  PieChart,
  LockKeyhole,
  BadgeCheck,
} from "lucide-react";

export default function ForManagersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>

      {/* Fixed Navigation */}
      <nav className="navbar-fixed">
        <div className="navbar-container">
          <Link href="/" className="navbar-brand">
            Mohit AI
          </Link>

          <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <Link href="/product" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Product
            </Link>
            <Link href="/pricing" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>

            {/* Solutions Dropdown */}
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-toggle">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="navbar-dropdown-menu">
                <Link href="/solutions" className="navbar-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  By Industry
                </Link>
                <Link href="/solutions/for-sdrs" className="navbar-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  For SDRs
                </Link>
                <Link href="/solutions/for-managers" className="navbar-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  For Managers
                </Link>
                <Link href="/solutions/enterprise" className="navbar-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  Enterprise
                </Link>
                <Link href="/solutions/small-business" className="navbar-dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                  Small Business
                </Link>
              </div>
            </div>

            <Link href="/resources" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Resources
            </Link>
            <Link href="/security" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Security
            </Link>
            
            {/* Mobile Actions */}
            <div className="navbar-actions">
              <Link href="/dashboard" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
                Check out the platform
              </Link>
              <Link href="/register" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>

          <div className="navbar-actions desktop-only">
            <Link href="/dashboard" className="btn btn-outline">
              Check out the platform
            </Link>
            <Link href="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main id="main">
        {/* Executive Hero Section */}
        <section className="hero-section managers-hero">
          <div className="hero-container">
            <div className="hero-content managers-hero-content">
              <div className="manager-badge">
                <BrainCircuit className="w-4 h-4" />
                <span>For Sales Leaders</span>
              </div>
              
              <h1 className="hero-heading">
                Turn Your Sales Team Into<br />
                <span className="text-pink">A 24/7 Revenue Machine</span>
              </h1>
              
              <p className="hero-description">
                Scale your team's capacity without scaling headcount. Get real-time visibility 
                into every lead interaction while reducing cost-per-lead by 73%.
              </p>
              
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="stat-value">73%</div>
                  <div className="stat-label">Lower Cost-Per-Lead</div>
                </div>
                <div className="hero-stat">
                  <div className="stat-value">391%</div>
                  <div className="stat-label">Increase in Conversions</div>
                </div>
                <div className="hero-stat">
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Lead Coverage</div>
                </div>
              </div>
              
              <div className="hero-buttons">
                <Link href="/demo" className="btn btn-secondary">
                  <span>Book Strategy Call</span>
                  <Phone className="w-5 h-5" />
                </Link>
                <Link href="/roi-calculator" className="btn btn-outline">
                  <DollarSign className="w-5 h-5" />
                  <span>Calculate Your ROI</span>
                </Link>
              </div>
              
              <div className="trust-indicators">
                <div className="trust-item">
                  <ShieldCheck className="w-5 h-5" />
                  <span>SOC 2 Type II Certified</span>
                </div>
                <div className="trust-item">
                  <Building2 className="w-5 h-5" />
                  <span>Trusted by Fortune 500</span>
                </div>
              </div>
            </div>

            {/* Executive Dashboard Preview */}
            <div className="manager-dashboard-preview">
              <div className="dashboard-mockup">
                <div className="dashboard-header">
                  <h3>Sales Performance Dashboard</h3>
                  <div className="date-range">Last 30 Days</div>
                </div>
                
                <div className="dashboard-metrics">
                  <div className="metric-card">
                    <div className="metric-icon">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="metric-content">
                      <div className="metric-value">$2.4M</div>
                      <div className="metric-label">Pipeline Generated</div>
                      <div className="metric-change positive">+156%</div>
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-icon">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="metric-content">
                      <div className="metric-value">847</div>
                      <div className="metric-label">Qualified Leads</div>
                      <div className="metric-change positive">+89%</div>
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-icon">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="metric-content">
                      <div className="metric-value">0:47</div>
                      <div className="metric-label">Avg Response Time</div>
                      <div className="metric-change positive">-92%</div>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-chart">
                  <div className="chart-header">
                    <h4>Team Performance Overview</h4>
                    <div className="chart-legend">
                      <span className="legend-item human">Human SDRs</span>
                      <span className="legend-item ai">AI SDR</span>
                    </div>
                  </div>
                  <div className="performance-bars">
                    <div className="performance-row">
                      <span className="label">Leads Handled</span>
                      <div className="bar-container">
                        <div className="bar human" style={{width: '35%'}}>127</div>
                        <div className="bar ai" style={{width: '65%'}}>847</div>
                      </div>
                    </div>
                    <div className="performance-row">
                      <span className="label">Meetings Booked</span>
                      <div className="bar-container">
                        <div className="bar human" style={{width: '25%'}}>31</div>
                        <div className="bar ai" style={{width: '75%'}}>124</div>
                      </div>
                    </div>
                    <div className="performance-row">
                      <span className="label">Response Rate</span>
                      <div className="bar-container">
                        <div className="bar human" style={{width: '40%'}}>38%</div>
                        <div className="bar ai" style={{width: '100%'}}>100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management Challenges Section */}
        <section className="challenges-section">
          <div className="challenges-container">
            <div className="section-header">
              <h2 className="section-heading">
                The <span className="text-pink">Hidden Costs</span> of Traditional Sales Teams
              </h2>
              <p className="section-description">
                Every sales leader faces these challenges. Here's how Mohit AI eliminates them.
              </p>
            </div>
            
            <div className="challenges-grid">
              <div className="challenge-card">
                <div className="challenge-icon">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3>Inconsistent Lead Handling</h3>
                <p>Different reps, different approaches. Some follow up in minutes, others in days.</p>
                <div className="solution">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>AI ensures 100% consistent engagement</span>
                </div>
              </div>
              
              <div className="challenge-card">
                <div className="challenge-icon">
                  <Eye className="w-8 h-8" />
                </div>
                <h3>Limited Visibility</h3>
                <p>Can't see what's happening in every conversation until it's too late.</p>
                <div className="solution">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Real-time dashboards for every interaction</span>
                </div>
              </div>
              
              <div className="challenge-card">
                <div className="challenge-icon">
                  <Clock className="w-8 h-8" />
                </div>
                <h3>After-Hours Gaps</h3>
                <p>Leads come in 24/7, but your team works 40 hours. Revenue leaks through the gaps.</p>
                <div className="solution">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>24/7 coverage without overtime costs</span>
                </div>
              </div>
              
              <div className="challenge-card">
                <div className="challenge-icon">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3>Scaling Costs</h3>
                <p>Each new SDR costs $65K+/year. Training, ramp time, and turnover add more.</p>
                <div className="solution">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Scale infinitely at a fraction of the cost</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Breakdown Section */}
        <section className="roi-section">
          <div className="roi-container">
            <div className="roi-header">
              <h2 className="section-heading">
                The <span className="text-pink">Economics</span> Are Undeniable
              </h2>
              <p className="section-description">
                See exactly how Mohit AI transforms your sales economics
              </p>
            </div>
            
            <div className="roi-comparison">
              <div className="roi-column traditional">
                <h3>Traditional SDR Team</h3>
                <div className="cost-breakdown">
                  <div className="cost-item">
                    <span className="label">10 SDRs Annual Cost</span>
                    <span className="value">$650,000</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Tools & Software</span>
                    <span className="value">$84,000</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Management Overhead</span>
                    <span className="value">$125,000</span>
                  </div>
                  <div className="cost-item total">
                    <span className="label">Total Annual Cost</span>
                    <span className="value">$859,000</span>
                  </div>
                </div>
                
                <div className="performance-metrics">
                  <h4>Performance Metrics</h4>
                  <ul>
                    <li>
                      <MinusCircle className="w-4 h-4" />
                      <span>200 leads/day capacity</span>
                    </li>
                    <li>
                      <MinusCircle className="w-4 h-4" />
                      <span>40-hour coverage</span>
                    </li>
                    <li>
                      <MinusCircle className="w-4 h-4" />
                      <span>15% average response rate</span>
                    </li>
                    <li>
                      <MinusCircle className="w-4 h-4" />
                      <span>3-week ramp time per rep</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="roi-column mohit-ai">
                <h3>With Mohit AI</h3>
                <div className="cost-breakdown">
                  <div className="cost-item">
                    <span className="label">5 Human SDRs</span>
                    <span className="value">$325,000</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Mohit AI Platform</span>
                    <span className="value">$60,000</span>
                  </div>
                  <div className="cost-item">
                    <span className="label">Reduced Management</span>
                    <span className="value">$75,000</span>
                  </div>
                  <div className="cost-item total savings">
                    <span className="label">Total Annual Cost</span>
                    <span className="value">$460,000</span>
                  </div>
                </div>
                
                <div className="performance-metrics">
                  <h4>Performance Metrics</h4>
                  <ul>
                    <li>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>1000+ leads/day capacity</span>
                    </li>
                    <li>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>24/7 coverage</span>
                    </li>
                    <li>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>92% response rate</span>
                    </li>
                    <li>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Instant deployment</span>
                    </li>
                  </ul>
                </div>
                
                <div className="savings-highlight">
                  <div className="savings-amount">$399,000</div>
                  <div className="savings-label">Annual Savings</div>
                  <div className="roi-percentage">46% Cost Reduction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Performance Features */}
        <section className="performance-section">
          <div className="performance-container">
            <div className="section-header">
              <h2 className="section-heading">
                Tools to Make Your Team <span className="text-pink">Unstoppable</span>
              </h2>
            </div>
            
            <div className="performance-features">
              <div className="feature-block">
                <div className="feature-visual">
                  <div className="analytics-preview">
                    <LineChart className="w-12 h-12 text-pink" />
                    <div className="data-visualization">
                      <div className="data-point" style={{height: '40%'}}></div>
                      <div className="data-point" style={{height: '60%'}}></div>
                      <div className="data-point" style={{height: '55%'}}></div>
                      <div className="data-point" style={{height: '80%'}}></div>
                      <div className="data-point" style={{height: '90%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Real-Time Performance Analytics</h3>
                  <p>Track every metric that matters. Response times, conversion rates, meeting quality scores - all in one dashboard.</p>
                  <ul className="feature-list">
                    <li>Individual and team scorecards</li>
                    <li>AI-powered performance insights</li>
                    <li>Predictive pipeline forecasting</li>
                    <li>Custom KPI tracking</li>
                  </ul>
                </div>
              </div>
              
              <div className="feature-block reverse">
                <div className="feature-visual">
                  <div className="coaching-preview">
                    <UserCheck className="w-12 h-12 text-pink" />
                    <div className="coaching-cards">
                      <div className="coaching-card">
                        <span className="score">87%</span>
                        <span className="label">Call Quality</span>
                      </div>
                      <div className="coaching-card">
                        <span className="score">94%</span>
                        <span className="label">Follow-up Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>AI-Powered Coaching at Scale</h3>
                  <p>Every conversation analyzed. Every rep gets personalized coaching recommendations based on their actual performance.</p>
                  <ul className="feature-list">
                    <li>Automated call scoring</li>
                    <li>Best practice identification</li>
                    <li>Personalized improvement plans</li>
                    <li>Team training insights</li>
                  </ul>
                </div>
              </div>
              
              <div className="feature-block">
                <div className="feature-visual">
                  <div className="consistency-preview">
                    <Target className="w-12 h-12 text-pink" />
                    <div className="consistency-rings">
                      <div className="ring ring-1"></div>
                      <div className="ring ring-2"></div>
                      <div className="ring ring-3"></div>
                    </div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Guaranteed Consistency</h3>
                  <p>Your best practices, automated. Every lead gets the perfect experience, every time, based on your proven playbooks.</p>
                  <ul className="feature-list">
                    <li>Standardized qualification process</li>
                    <li>Consistent messaging and positioning</li>
                    <li>Automatic best-time engagement</li>
                    <li>Zero human error or bias</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Comparison */}
        <section className="transformation-section">
          <div className="transformation-container">
            <div className="section-header">
              <h2 className="section-heading">
                Life <span className="text-pink">Before & After</span> Mohit AI
              </h2>
            </div>
            
            <div className="transformation-timeline">
              <div className="timeline-column before">
                <h3>Before Mohit AI</h3>
                <div className="timeline-items">
                  <div className="timeline-item">
                    <div className="time">Monday 8:00 AM</div>
                    <div className="event negative">
                      47 leads came in over weekend. SDRs overwhelmed, cherry-picking best ones.
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time">Tuesday 2:00 PM</div>
                    <div className="event negative">
                      Top SDR calls in sick. 80+ leads reassigned, causing delays and confusion.
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time">Wednesday 5:30 PM</div>
                    <div className="event negative">
                      Hot lead comes in after hours. No response until next morning. Lost to competitor.
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time">Friday 4:00 PM</div>
                    <div className="event negative">
                      Weekly report shows 38% of leads never contacted. No visibility into why.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="timeline-divider">
                <div className="divider-icon">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              
              <div className="timeline-column after">
                <h3>After Mohit AI</h3>
                <div className="timeline-items">
                  <div className="timeline-item">
                    <div className="time">Monday 8:00 AM</div>
                    <div className="event positive">
                      All 47 weekend leads already qualified. 12 meetings booked. Team focuses on closing.
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time">Tuesday 2:00 PM</div>
                    <div className="event positive">
                      AI handles routine qualification. Human SDRs focus on high-value conversations.
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time">Wednesday 5:30 PM</div>
                    <div className="event positive">
                      Hot lead engaged in 47 seconds. Meeting booked for next morning. Deal won.
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="time">Friday 4:00 PM</div>
                    <div className="event positive">
                      100% lead coverage. Real-time dashboard shows exactly where every lead stands.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="case-studies-section">
          <div className="case-studies-container">
            <div className="section-header">
              <h2 className="section-heading">
                Sales Leaders <span className="text-pink">Getting Results</span>
              </h2>
            </div>
            
            <div className="case-studies-grid">
              <div className="case-study-card">
                <div className="company-info">
                  <div className="company-logo">TechCorp</div>
                  <div className="company-details">
                    <h4>Sarah Chen</h4>
                    <p>VP of Sales, TechCorp</p>
                  </div>
                </div>
                <blockquote>
                  "We went from 38% lead coverage to 100% overnight. Our cost per qualified lead dropped 73% while our pipeline grew 4x. It's transformed how we think about scaling."
                </blockquote>
                <div className="case-metrics">
                  <div className="metric">
                    <div className="value">4x</div>
                    <div className="label">Pipeline Growth</div>
                  </div>
                  <div className="metric">
                    <div className="value">73%</div>
                    <div className="label">Cost Reduction</div>
                  </div>
                  <div className="metric">
                    <div className="value">100%</div>
                    <div className="label">Lead Coverage</div>
                  </div>
                </div>
              </div>
              
              <div className="case-study-card">
                <div className="company-info">
                  <div className="company-logo">SaaSCo</div>
                  <div className="company-details">
                    <h4>Michael Rodriguez</h4>
                    <p>Director of Revenue Ops</p>
                  </div>
                </div>
                <blockquote>
                  "The visibility is game-changing. I can see every conversation, identify bottlenecks instantly, and our AI learns from our best reps to lift the entire team."
                </blockquote>
                <div className="case-metrics">
                  <div className="metric">
                    <div className="value">156%</div>
                    <div className="label">Meeting Increase</div>
                  </div>
                  <div className="metric">
                    <div className="value">0:47</div>
                    <div className="label">Response Time</div>
                  </div>
                  <div className="metric">
                    <div className="value">$2.4M</div>
                    <div className="label">New Pipeline</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Visualization */}
        <section className="integration-section">
          <div className="integration-container">
            <div className="section-header">
              <h2 className="section-heading">
                Seamlessly Integrates With Your <span className="text-pink">Entire Stack</span>
              </h2>
              <p className="section-description">
                Deploy in minutes, not months. Works with the tools your team already uses.
              </p>
            </div>
            
            <div className="integration-ecosystem">
              <div className="ecosystem-center">
                <div className="mohit-hub">
                  <BrainCircuit className="w-12 h-12" />
                  <span>Mohit AI</span>
                </div>
              </div>
              
              <div className="integration-categories">
                <div className="integration-category crm">
                  <h4>CRM Systems</h4>
                  <div className="integration-items">
                    <div className="integration-item">Salesforce</div>
                    <div className="integration-item">HubSpot</div>
                    <div className="integration-item">Pipedrive</div>
                  </div>
                </div>
                
                <div className="integration-category communication">
                  <h4>Communication</h4>
                  <div className="integration-items">
                    <div className="integration-item">Slack</div>
                    <div className="integration-item">Teams</div>
                    <div className="integration-item">Email</div>
                  </div>
                </div>
                
                <div className="integration-category analytics">
                  <h4>Analytics</h4>
                  <div className="integration-items">
                    <div className="integration-item">Tableau</div>
                    <div className="integration-item">PowerBI</div>
                    <div className="integration-item">Looker</div>
                  </div>
                </div>
                
                <div className="integration-category phone">
                  <h4>Phone Systems</h4>
                  <div className="integration-items">
                    <div className="integration-item">RingCentral</div>
                    <div className="integration-item">Aircall</div>
                    <div className="integration-item">Twilio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="security-section">
          <div className="security-container">
            <div className="section-header">
              <h2 className="section-heading">
                Enterprise-Grade <span className="text-pink">Security & Compliance</span>
              </h2>
              <p className="section-description">
                Your data is protected by the same standards trusted by Fortune 500 companies
              </p>
            </div>
            
            <div className="security-grid">
              <div className="security-card">
                <div className="security-icon">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3>SOC 2 Type II</h3>
                <p>Annual audits ensure the highest standards of data security and availability</p>
              </div>
              
              <div className="security-card">
                <div className="security-icon">
                  <LockKeyhole className="w-10 h-10" />
                </div>
                <h3>End-to-End Encryption</h3>
                <p>All data encrypted in transit and at rest using industry-leading standards</p>
              </div>
              
              <div className="security-card">
                <div className="security-icon">
                  <BadgeCheck className="w-10 h-10" />
                </div>
                <h3>GDPR & CCPA Compliant</h3>
                <p>Full compliance with global data privacy regulations</p>
              </div>
              
              <div className="security-card">
                <div className="security-icon">
                  <Shield className="w-10 h-10" />
                </div>
                <h3>99.9% Uptime SLA</h3>
                <p>Enterprise SLA with 24/7 monitoring and support</p>
              </div>
            </div>
            
            <div className="compliance-badges">
              <div className="badge-item">
                <Award className="w-8 h-8" />
                <span>ISO 27001</span>
              </div>
              <div className="badge-item">
                <Award className="w-8 h-8" />
                <span>HIPAA</span>
              </div>
              <div className="badge-item">
                <Award className="w-8 h-8" />
                <span>PCI DSS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Call CTA */}
        <section className="cta-section executive-cta">
          <div className="cta-container">
            <div className="cta-content">
              <div className="cta-badge">
                <Gauge className="w-5 h-5" />
                <span>Limited Availability</span>
              </div>
              <h2 className="cta-heading">
                Ready to Transform Your Sales Organization?
              </h2>
              <p className="cta-description">
                Book a 30-minute strategy call with our revenue experts. We'll analyze your 
                current metrics and show you exactly how Mohit AI can impact your bottom line.
              </p>
              
              <div className="cta-value-props">
                <div className="value-prop">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Custom ROI analysis for your team</span>
                </div>
                <div className="value-prop">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Implementation roadmap</span>
                </div>
                <div className="value-prop">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Live platform demonstration</span>
                </div>
              </div>
              
              <div className="cta-buttons">
                <Link href="/book-strategy-call" className="btn btn-primary">
                  <Phone className="w-5 h-5" />
                  <span>Book Your Strategy Call</span>
                </Link>
                <Link href="/roi-calculator" className="btn btn-outline">
                  <FileBarChart className="w-5 h-5" />
                  <span>See ROI Calculator</span>
                </Link>
              </div>
              
              <p className="cta-note">
                Join 500+ sales leaders who've already transformed their teams with Mohit AI
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Add required styles */}
      <style jsx>{`
        /* Manager-specific styles */
        .managers-hero {
          background: #FF6EC7;
          padding: 120px 0 80px;
        }

        .manager-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 110, 199, 0.1);
          color: #FF6EC7;
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .hero-stats {
          display: flex;
          gap: 48px;
          margin: 40px 0;
        }

        .hero-stat {
          text-align: left;
        }

        .stat-value {
          font-size: 48px;
          font-weight: 800;
          color: #FF6EC7;
          line-height: 1;
        }

        .stat-label {
          font-size: 16px;
          color: #6B7280;
          margin-top: 8px;
        }

        .trust-indicators {
          display: flex;
          gap: 24px;
          margin-top: 32px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6B7280;
          font-size: 14px;
        }

        .trust-item svg {
          color: #FF6EC7;
        }

        /* Dashboard Preview */
        .manager-dashboard-preview {
          flex: 1;
          max-width: 600px;
        }

        .dashboard-mockup {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 32px;
          border: 1px solid #E5E7EB;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .dashboard-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }

        .date-range {
          font-size: 14px;
          color: #6B7280;
          background: #F3F4F6;
          padding: 6px 12px;
          border-radius: 6px;
        }

        .dashboard-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .metric-card {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 20px;
        }

        .metric-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 110, 199, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .metric-icon svg {
          color: #FF6EC7;
        }

        .metric-value {
          font-size: 28px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 13px;
          color: #6B7280;
          margin-bottom: 8px;
        }

        .metric-change {
          font-size: 14px;
          font-weight: 600;
          color: #10B981;
        }

        .metric-change.positive::before {
          content: "↑ ";
        }

        .dashboard-chart {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-header h4 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .chart-legend {
          display: flex;
          gap: 16px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6B7280;
        }

        .legend-item::before {
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 3px;
          display: block;
        }

        .legend-item.human::before {
          background: #6B7280;
        }

        .legend-item.ai::before {
          background: #FF6EC7;
        }

        .performance-bars {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .performance-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .performance-row .label {
          width: 120px;
          font-size: 14px;
          color: #6B7280;
        }

        .bar-container {
          flex: 1;
          display: flex;
          background: #E5E7EB;
          border-radius: 8px;
          height: 32px;
          overflow: hidden;
        }

        .bar {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          color: white;
          transition: width 0.3s ease;
        }

        .bar.human {
          background: #6B7280;
        }

        .bar.ai {
          background: #FF6EC7;
        }

        /* Challenges Section */
        .challenges-section {
          padding: 80px 0;
          background: #F9FAFB;
        }

        .challenges-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 48px;
        }

        .challenge-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .challenge-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .challenge-icon {
          width: 56px;
          height: 56px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .challenge-icon svg {
          color: #EF4444;
        }

        .challenge-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }

        .challenge-card p {
          color: #6B7280;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .solution {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #065F46;
        }

        .solution svg {
          color: #10B981;
          flex-shrink: 0;
        }

        /* ROI Section */
        .roi-section {
          padding: 80px 0;
          background: white;
        }

        .roi-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .roi-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .roi-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .roi-column {
          background: #F9FAFB;
          border-radius: 16px;
          padding: 40px;
          border: 1px solid #E5E7EB;
        }

        .roi-column.mohit-ai {
          background: #FF6EC7;
          border-color: rgba(255, 110, 199, 0.2);
        }

        .roi-column h3 {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 32px;
          text-align: center;
        }

        .cost-breakdown {
          margin-bottom: 32px;
        }

        .cost-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #E5E7EB;
        }

        .cost-item.total {
          border-bottom: none;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 2px solid #E5E7EB;
        }

        .cost-item .label {
          color: #6B7280;
          font-size: 15px;
        }

        .cost-item .value {
          font-weight: 600;
          color: #111827;
          font-size: 16px;
        }

        .cost-item.total .label,
        .cost-item.total .value {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .cost-item.savings .value {
          color: #10B981;
        }

        .performance-metrics h4 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }

        .performance-metrics ul {
          list-style: none;
          padding: 0;
        }

        .performance-metrics li {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-size: 14px;
          color: #6B7280;
        }

        .performance-metrics li svg {
          flex-shrink: 0;
        }

        .roi-column.traditional li svg {
          color: #EF4444;
        }

        .roi-column.mohit-ai li svg {
          color: #10B981;
        }

        .savings-highlight {
          background: #FF6EC7;
          color: white;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          margin-top: 24px;
        }

        .savings-amount {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .savings-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .roi-percentage {
          font-size: 20px;
          font-weight: 600;
        }

        /* Performance Section */
        .performance-section {
          padding: 80px 0;
          background: #F9FAFB;
        }

        .performance-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .performance-features {
          display: flex;
          flex-direction: column;
          gap: 80px;
          margin-top: 64px;
        }

        .feature-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .feature-block.reverse {
          direction: rtl;
        }

        .feature-block.reverse .feature-content {
          direction: ltr;
        }

        .feature-visual {
          display: flex;
          justify-content: center;
        }

        .analytics-preview {
          background: white;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
          position: relative;
        }

        .data-visualization {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          height: 120px;
          margin-top: 32px;
        }

        .data-point {
          flex: 1;
          background: #FF6EC7;
          border-radius: 8px 8px 0 0;
          position: relative;
          transition: height 0.3s ease;
        }

        .data-point:hover {
          opacity: 0.8;
        }

        .coaching-preview {
          background: white;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
        }

        .coaching-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
        }

        .coaching-card {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
        }

        .coaching-card .score {
          font-size: 32px;
          font-weight: 800;
          color: #FF6EC7;
          display: block;
          margin-bottom: 8px;
        }

        .coaching-card .label {
          font-size: 13px;
          color: #6B7280;
        }

        .consistency-preview {
          background: white;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
          position: relative;
        }

        .consistency-rings {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 32px auto 0;
        }

        .ring {
          position: absolute;
          border: 3px solid rgba(255, 110, 199, 0.2);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }

        .ring-1 {
          inset: 0;
          animation-delay: 0s;
        }

        .ring-2 {
          inset: 20px;
          animation-delay: 1s;
        }

        .ring-3 {
          inset: 40px;
          animation-delay: 2s;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        .feature-content h3 {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }

        .feature-content p {
          font-size: 18px;
          line-height: 1.6;
          color: #6B7280;
          margin-bottom: 32px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
        }

        .feature-list li {
          padding: 12px 0;
          font-size: 16px;
          color: #4B5563;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feature-list li::before {
          content: "→";
          color: #FF6EC7;
          font-weight: 600;
          font-size: 18px;
        }

        /* Transformation Timeline */
        .transformation-section {
          padding: 80px 0;
          background: white;
        }

        .transformation-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .transformation-timeline {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 48px;
          margin-top: 64px;
        }

        .timeline-column h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 32px;
          text-align: center;
        }

        .timeline-column.before h3 {
          color: #EF4444;
        }

        .timeline-column.after h3 {
          color: #10B981;
        }

        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .timeline-item {
          background: #F9FAFB;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #E5E7EB;
        }

        .timeline-item .time {
          font-size: 13px;
          font-weight: 600;
          color: #6B7280;
          margin-bottom: 8px;
        }

        .timeline-item .event {
          font-size: 15px;
          line-height: 1.6;
        }

        .timeline-item .event.negative {
          color: #DC2626;
        }

        .timeline-item .event.positive {
          color: #059669;
        }

        .timeline-divider {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .divider-icon {
          width: 60px;
          height: 60px;
          background: #FF6EC7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 16px rgba(255, 110, 199, 0.3);
        }

        /* Case Studies */
        .case-studies-section {
          padding: 80px 0;
          background: #F9FAFB;
        }

        .case-studies-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .case-studies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 48px;
          margin-top: 48px;
        }

        .case-study-card {
          background: white;
          border-radius: 16px;
          padding: 40px;
          border: 1px solid #E5E7EB;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .company-logo {
          width: 60px;
          height: 60px;
          background: #FF6EC7;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 14px;
        }

        .company-details h4 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .company-details p {
          font-size: 14px;
          color: #6B7280;
        }

        blockquote {
          font-size: 17px;
          line-height: 1.6;
          color: #4B5563;
          font-style: italic;
          margin-bottom: 32px;
        }

        .case-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid #E5E7EB;
        }

        .case-metrics .metric {
          text-align: center;
        }

        .case-metrics .value {
          font-size: 28px;
          font-weight: 800;
          color: #FF6EC7;
          margin-bottom: 4px;
        }

        .case-metrics .label {
          font-size: 13px;
          color: #6B7280;
        }

        /* Integration Ecosystem */
        .integration-section {
          padding: 80px 0;
          background: white;
        }

        .integration-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .integration-ecosystem {
          position: relative;
          max-width: 800px;
          margin: 64px auto 0;
          height: 500px;
        }

        .ecosystem-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .mohit-hub {
          width: 140px;
          height: 140px;
          background: #FF6EC7;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 20px 40px rgba(255, 110, 199, 0.3);
        }

        .mohit-hub span {
          font-size: 16px;
          font-weight: 700;
          margin-top: 8px;
        }

        .integration-categories {
          position: absolute;
          inset: 0;
        }

        .integration-category {
          position: absolute;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 20px;
          width: 180px;
        }

        .integration-category.crm {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .integration-category.communication {
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }

        .integration-category.analytics {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .integration-category.phone {
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }

        .integration-category h4 {
          font-size: 14px;
          font-weight: 600;
          color: #6B7280;
          margin-bottom: 12px;
        }

        .integration-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .integration-item {
          font-size: 13px;
          color: #4B5563;
          padding: 6px 12px;
          background: white;
          border-radius: 6px;
          border: 1px solid #E5E7EB;
        }

        /* Security Section */
        .security-section {
          padding: 80px 0;
          background: #F9FAFB;
        }

        .security-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .security-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
          margin-top: 48px;
        }

        .security-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid #E5E7EB;
          text-align: center;
          transition: all 0.3s ease;
        }

        .security-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .security-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 110, 199, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .security-icon svg {
          color: #FF6EC7;
        }

        .security-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }

        .security-card p {
          font-size: 15px;
          line-height: 1.6;
          color: #6B7280;
        }

        .compliance-badges {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 64px;
          padding-top: 48px;
          border-top: 1px solid #E5E7EB;
        }

        .badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .badge-item svg {
          color: #FF6EC7;
        }

        .badge-item span {
          font-size: 14px;
          font-weight: 600;
          color: #4B5563;
        }

        /* Executive CTA */
        .executive-cta {
          background: #FF6EC7;
          color: white;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 110, 199, 0.2);
          color: #FFB6E1;
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .cta-value-props {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin: 32px 0;
          justify-content: center;
        }

        .value-prop {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }

        .value-prop svg {
          color: #10B981;
        }

        .cta-note {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 24px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .dashboard-metrics {
            grid-template-columns: 1fr;
          }

          .roi-comparison {
            grid-template-columns: 1fr;
          }

          .feature-block {
            grid-template-columns: 1fr;
          }

          .transformation-timeline {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .timeline-divider {
            display: none;
          }

          .case-studies-grid {
            grid-template-columns: 1fr;
          }

          .case-metrics {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .integration-ecosystem {
            height: auto;
            padding: 40px 0;
          }

          .integration-categories {
            position: static;
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin-top: 40px;
          }

          .integration-category {
            position: static;
            transform: none;
            width: 100%;
          }

          .hero-content {
            text-align: center;
          }

          .hero-stats {
            align-items: center;
          }

          .hero-stat {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}