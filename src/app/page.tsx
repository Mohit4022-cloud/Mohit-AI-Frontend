"use client";

import Link from "next/link";
import { CounterAnimation } from "@/components/CounterAnimation";
import { useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  Users,
  Shield,
  Zap,
  Lock,
  Play,
  Star,
  Clock,
  TrendingUp,
  Target,
  Sparkles,
  ChevronDown,
  MessageCircle,
  Smartphone,
  Bot,
  Brain,
  CheckCircle2,
  Briefcase,
  Award,
  BarChart3,
  HeadphonesIcon,
  Globe,
  Gauge,
  Building2,
  Rocket,
  LineChart,
  FileText,
  ChevronRight,
  Calendar,
  DollarSign,
} from "lucide-react";

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState<"without" | "with">("without");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      {/* Skip to content for accessibility */}
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>

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

          <div className="navbar-actions">
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
        {/* Hero Section with Demo Form */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-heading">
                Never Miss<br />
                <span className="text-pink">Another Lead</span>
              </h1>
              
              <p className="hero-description">
                Respond to every lead in under 60 seconds with AI that works
                across voice, chat, email, and SMS for the price of lunch.
              </p>
              
              <div className="hero-buttons">
                <Link href="/register" className="btn btn-secondary">
                  <span>Start Your Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/demo" className="btn btn-outline">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </Link>
              </div>
            </div>

            {/* Demo Request Form */}
            <div className="demo-form-card">
              <h2 className="demo-form-title">Get Started Today</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workEmail" className="form-label">
                    Work email address
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    className="form-input"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Company name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-input"
                    placeholder="Acme Inc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="employees" className="form-label">
                    Number of employees
                  </label>
                  <select id="employees" name="employees" className="form-select" required>
                    <option value="">Select...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501+">501+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  Get Started
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Ultra Modern AI Animation Section */}
        <section className="animation-section">
          {/* Background particles */}
          <div className="background-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`bg-particle bg-particle-${i + 1}`}></div>
            ))}
          </div>
          
          <div className="animation-container">
            <div className="ultra-modern-animation">
              <div className="neural-network">
                {/* Central AI Core */}
                <div className="ai-core-3d">
                  <div className="core-inner">
                    <Sparkles className="bot-icon" />
                  </div>
                  <div className="core-outer"></div>
                  <div className="core-particles">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`particle particle-${i + 1}`}></div>
                    ))}
                  </div>
                </div>
                
                {/* Orbiting Channels */}
                <div className="orbit-container">
                  <div className="orbit-path">
                    <div className="channel-orb orb-1">
                      <Phone className="w-5 h-5" />
                      <div className="orb-trail"></div>
                    </div>
                    <div className="channel-orb orb-2">
                      <MessageCircle className="w-5 h-5" />
                      <div className="orb-trail"></div>
                    </div>
                    <div className="channel-orb orb-3">
                      <Mail className="w-5 h-5" />
                      <div className="orb-trail"></div>
                    </div>
                    <div className="channel-orb orb-4">
                      <Smartphone className="w-5 h-5" />
                      <div className="orb-trail"></div>
                    </div>
                  </div>
                </div>
                
                {/* Data Streams */}
                <div className="data-streams">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`stream stream-${i + 1}`}>
                      <div className="stream-particle"></div>
                    </div>
                  ))}
                </div>
                
                {/* Holographic Grid */}
                <div className="holo-grid">
                  <div className="grid-line horizontal"></div>
                  <div className="grid-line vertical"></div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="floating-stats">
                <div className="stat stat-1">
                  <span className="stat-value">47s</span>
                  <span className="stat-label">Response</span>
                </div>
                <div className="stat stat-2">
                  <span className="stat-value">24/7</span>
                  <span className="stat-label">Active</span>
                </div>
                <div className="stat stat-3">
                  <span className="stat-value">4</span>
                  <span className="stat-label">Channels</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="stats-container">
            <div className="section-header">
              <h2 className="section-heading">
                How Mohit AI <span className="text-pink">Works</span>
              </h2>
              <p className="section-description">
                Capture every inbound lead instantly, plus supercharge your outbound efforts
              </p>
            </div>
            
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number pulse-animation">1</div>
                <div className="step-icon floating">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="step-title">Instant Lead Capture</h3>
                <p className="step-description">
                  Connect your forms, website, CRM, and phone. AI responds to every inbound lead in under 60 seconds, 24/7.
                </p>
              </div>
              
              <div className="process-connector flow-animation">
                <ChevronRight className="w-6 h-6" />
              </div>
              
              <div className="process-step">
                <div className="step-number pulse-animation">2</div>
                <div className="step-icon floating" style={{animationDelay: '0.5s'}}>
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="step-title">AI Engages & Qualifies</h3>
                <p className="step-description">
                  AI instantly researches each lead, has natural conversations via voice/text, and identifies buying intent.
                </p>
              </div>
              
              <div className="process-connector flow-animation" style={{animationDelay: '0.3s'}}>
                <ChevronRight className="w-6 h-6" />
              </div>
              
              <div className="process-step">
                <div className="step-number pulse-animation">3</div>
                <div className="step-icon floating" style={{animationDelay: '1s'}}>
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="step-title">Book Hot Meetings</h3>
                <p className="step-description">
                  Qualified leads get meetings booked instantly. Your team only talks to interested, qualified prospects.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Section - Redesigned */}
        <section className="trust-section">
          <div className="trust-container">
            <div className="trust-header">
              <div className="trust-badge-floating">
                <Award className="w-6 h-6" />
                <span>Trusted by Industry Leaders</span>
              </div>
              <h2 className="trust-heading">
                Join <span className="trust-number"><CounterAnimation target={500} />+</span> Sales Teams
              </h2>
              <p className="trust-subtitle">
                Who are crushing their quotas with Mohit AI
              </p>
            </div>
            
            <div className="impact-metrics">
              <div className="impact-card">
                <div className="impact-visual">
                  <div className="impact-circle">
                    <Target className="w-12 h-12" />
                  </div>
                  <div className="impact-line"></div>
                </div>
                <div className="impact-content">
                  <h3 className="impact-value">
                    <CounterAnimation target={15} />-<CounterAnimation target={20} />
                  </h3>
                  <p className="impact-label">Hot Leads Daily</p>
                </div>
              </div>
              
              <div className="impact-card" style={{animationDelay: '0.2s'}}>
                <div className="impact-visual">
                  <div className="impact-circle">
                    <Calendar className="w-12 h-12" />
                  </div>
                  <div className="impact-line"></div>
                </div>
                <div className="impact-content">
                  <h3 className="impact-value">
                    <CounterAnimation target={3} />x
                  </h3>
                  <p className="impact-label">More Meetings Booked</p>
                </div>
              </div>
              
              <div className="impact-card" style={{animationDelay: '0.4s'}}>
                <div className="impact-visual">
                  <div className="impact-circle">
                    <TrendingUp className="w-12 h-12" />
                  </div>
                  <div className="impact-line"></div>
                </div>
                <div className="impact-content">
                  <h3 className="impact-value">
                    <CounterAnimation target={80} />%
                  </h3>
                  <p className="impact-label">Less Cold Calling</p>
                </div>
              </div>
            </div>
            
          </div>
        </section>
        
        {/* Integration Partners */}
        <section className="integrations-section">
          <div className="stats-container">
            <div className="section-header">
              <h2 className="section-heading">
                Seamlessly Integrates With Your <span className="text-pink">Tech Stack</span>
              </h2>
            </div>
            
            <div className="integrations-grid">
              <div className="integration-card">
                <div className="integration-icon">
                  <Building2 className="w-8 h-8" />
                </div>
                <span>Salesforce</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">
                  <Building2 className="w-8 h-8" />
                </div>
                <span>HubSpot</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">
                  <Building2 className="w-8 h-8" />
                </div>
                <span>Pipedrive</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <span>Slack</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">
                  <Mail className="w-8 h-8" />
                </div>
                <span>Gmail</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">
                  <Calendar className="w-8 h-8" />
                </div>
                <span>Calendly</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">
                  <Users className="w-8 h-8" />
                </div>
                <span>LinkedIn</span>
              </div>
              <div className="integration-card">
                <div className="integration-icon">
                  <Globe className="w-8 h-8" />
                </div>
                <span>Zoom</span>
              </div>
            </div>
            
            <div className="integration-cta">
              <p>Don&apos;t see your tool? <Link href="/integrations" className="text-pink hover:underline">View all integrations</Link> or request a new one.</p>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <div className="features-header">
              <h2 className="features-heading">
                Your AI SDR&apos;s<br />
                <span className="text-pink">Complete Toolkit</span>
              </h2>
              
              <p className="features-description">
                Mohit AI handles all aspects of prospecting and outreach,
                delivering only qualified, interested leads to your human SDRs.
              </p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="feature-title">AI Voice Calling</h3>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Intelligent Email</h3>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Multi-Channel Outreach</h3>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Smart Lead Scoring</h3>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Real-Time Analytics</h3>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <HeadphonesIcon className="h-8 w-8" />
                </div>
                <h3 className="feature-title">24/7 Coverage</h3>
              </div>
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        <section className="results-section">
          <div className="stats-container">
            <div className="section-header">
              <h2 className="section-heading">
                Real Results From <span className="text-pink">Real Companies</span>
              </h2>
              <p className="section-description">
                See how companies like yours are transforming their sales with Mohit AI
              </p>
            </div>
            
            <div className="results-grid">
              <div className="result-card hover-lift">
                <div className="result-metric">
                  <TrendingUp className="w-10 h-10 text-pink rotate-animation" />
                  <div>
                    <div className="metric-value">
                      <CounterAnimation target={391} suffix="%" />
                    </div>
                    <span className="metric-label">Increase in Inbound Conversion</span>
                    <span className="metric-description">vs. industry average of 2%</span>
                  </div>
                </div>
              </div>
              
              <div className="result-card hover-lift">
                <div className="result-metric">
                  <Clock className="w-10 h-10 text-pink pulse-icon" />
                  <div>
                    <div className="metric-value">
                      <CounterAnimation target={47} suffix="s" />
                    </div>
                    <span className="metric-label">Average Response Time</span>
                    <span className="metric-description">24/7 instant engagement</span>
                  </div>
                </div>
              </div>
              
              <div className="result-card hover-lift">
                <div className="result-metric">
                  <Calendar className="w-10 h-10 text-pink bounce-animation" />
                  <div>
                    <div className="metric-value">
                      <CounterAnimation target={156} suffix="%" />
                    </div>
                    <span className="metric-label">More Qualified Meetings</span>
                    <span className="metric-description">Booked automatically</span>
                  </div>
                </div>
              </div>
              
              <div className="result-card hover-lift">
                <div className="result-metric">
                  <DollarSign className="w-10 h-10 text-pink shimmer-icon" />
                  <div>
                    <div className="metric-value">
                      <CounterAnimation target={5.2} prefix="$" suffix="M" decimal={true} />
                    </div>
                    <span className="metric-label">Additional Revenue</span>
                    <span className="metric-description">Generated per customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Day in the Life Comparison */}
        <section className="comparison-section">
          <div className="stats-container">
            <div className="section-header">
              <h2 className="section-heading">
                Day in the Life: <span className="text-pink">With vs Without AI</span>
              </h2>
              <p className="section-description">
                See how Mohit AI transforms your sales team&apos;s daily workflow
              </p>
            </div>
            
            <div className="day-toggle">
              <button 
                className={`toggle-btn ${selectedDay === 'without' ? 'active' : ''}`}
                onClick={() => setSelectedDay('without')}
              >
                😫 Without AI
              </button>
              <button 
                className={`toggle-btn ${selectedDay === 'with' ? 'active' : ''}`}
                onClick={() => setSelectedDay('with')}
              >
                🚀 With AI
              </button>
            </div>
            
            <div className="day-comparison">
              <div className={`day-column ${selectedDay === 'without' ? 'without-ai active' : 'without-ai'}`}>
                <h3 className="day-title">😫 Without Mohit AI</h3>
                
                <div className="timeline">
                  <div className="time-block">
                    <span className="time">8:00 AM</span>
                    <div className="activity">
                      <h4>Check Yesterday&apos;s Leads</h4>
                      <p>Find 47 new inbound leads from overnight. Start manual follow-up.</p>
                    </div>
                  </div>
                  
                  <div className="time-block">
                    <span className="time">10:30 AM</span>
                    <div className="activity">
                      <h4>Still Following Up</h4>
                      <p>Only reached 12 leads. Most aren&apos;t answering. Energy dropping.</p>
                    </div>
                  </div>
                  
                  <div className="time-block">
                    <span className="time">2:00 PM</span>
                    <div className="activity">
                      <h4>Lunch Lead Surge</h4>
                      <p>23 new leads came in during lunch. Now 58 leads behind.</p>
                    </div>
                  </div>
                  
                  <div className="time-block">
                    <span className="time">5:30 PM</span>
                    <div className="activity">
                      <h4>Giving Up</h4>
                      <p>Contacted 31 leads total. 39 will go cold. 0 meetings booked.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`day-column ${selectedDay === 'with' ? 'with-ai active' : 'with-ai'}`}>
                <h3 className="day-title">🚀 With Mohit AI</h3>
                
                <div className="timeline">
                  <div className="time-block">
                    <span className="time">8:00 AM</span>
                    <div className="activity">
                      <h4>AI Already Working</h4>
                      <p>All 47 overnight leads contacted. 12 qualified, 3 meetings booked.</p>
                    </div>
                  </div>
                  
                  <div className="time-block">
                    <span className="time">10:30 AM</span>
                    <div className="activity">
                      <h4>Focus on Hot Leads</h4>
                      <p>Deep conversations with 5 qualified prospects. High energy.</p>
                    </div>
                  </div>
                  
                  <div className="time-block">
                    <span className="time">2:00 PM</span>
                    <div className="activity">
                      <h4>AI Handles Surge</h4>
                      <p>23 lunch leads auto-contacted. You close 2 deals from morning.</p>
                    </div>
                  </div>
                  
                  <div className="time-block">
                    <span className="time">5:30 PM</span>
                    <div className="activity">
                      <h4>Record Day</h4>
                      <p>100% lead coverage. 8 meetings booked. 2 deals closed. Going home happy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Common Objections */}
        <section className="objections-section">
          <div className="stats-container">
            <div className="section-header">
              <h2 className="section-heading">
                Common <span className="text-pink">Concerns</span> Addressed
              </h2>
            </div>
            
            <div className="objections-grid">
              <div className="objection-card">
                <div className="objection-icon">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3>&quot;Will it sound robotic?&quot;</h3>
                <p>Our AI uses natural voice technology that adapts to each conversation. Prospects often don&apos;t realize they&apos;re talking to AI.</p>
              </div>
              
              <div className="objection-card">
                <div className="objection-icon">
                  <Shield className="w-8 h-8" />
                </div>
                <h3>&quot;Is my data secure?&quot;</h3>
                <p>SOC 2 Type II certified with bank-level encryption. Your data never trains our models. Full compliance guaranteed.</p>
              </div>
              
              <div className="objection-card">
                <div className="objection-icon">
                  <Users className="w-8 h-8" />
                </div>
                <h3>&quot;Will it replace my team?&quot;</h3>
                <p>No. It handles repetitive tasks so your team can focus on high-value activities like closing deals and building relationships.</p>
              </div>
              
              <div className="objection-card">
                <div className="objection-icon">
                  <Zap className="w-8 h-8" />
                </div>
                <h3>&quot;How fast is setup?&quot;</h3>
                <p>Connect your CRM and go live in under 15 minutes. No complex workflows or coding required. We handle everything.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Capabilities Showcase */}
        <section className="ai-showcase-section">
          <div className="showcase-container">
            <div className="showcase-header">
              <div className="showcase-badge">
                <Sparkles className="w-5 h-5" />
                <span>Advanced AI Technology</span>
              </div>
              <h2 className="showcase-heading">
                Experience the Future of <span className="text-pink">Sales Automation</span>
              </h2>
              <p className="showcase-description">
                Watch our AI in action as it seamlessly handles complex sales scenarios
              </p>
            </div>
            
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="ai-brain">
                    <div className="brain-core">
                      <Brain className="w-8 h-8" />
                    </div>
                    <div className="neural-paths">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`path path-${i + 1}`}></div>
                      ))}
                    </div>
                  </div>
                  <h3>Natural Language Processing</h3>
                  <p>Understands context, sentiment, and intent in real-time conversations</p>
                </div>
              </div>
              
              <div className="showcase-card" style={{animationDelay: '0.2s'}}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="voice-wave">
                    <div className="wave-bars">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className={`bar bar-${i + 1}`}></div>
                      ))}
                    </div>
                    <Phone className="w-8 h-8 voice-icon" />
                  </div>
                  <h3>Human-Like Voice AI</h3>
                  <p>Natural conversations that build trust and rapport with prospects</p>
                </div>
              </div>
              
              <div className="showcase-card" style={{animationDelay: '0.4s'}}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="learning-animation">
                    <div className="data-flow">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`data-point point-${i + 1}`}></div>
                      ))}
                    </div>
                    <TrendingUp className="w-8 h-8 learning-icon" />
                  </div>
                  <h3>Continuous Learning</h3>
                  <p>Gets smarter with every interaction, improving conversion rates over time</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Metrics Dashboard */}
        <section className="metrics-dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h2 className="dashboard-heading">
                Real-Time <span className="text-pink">Performance Metrics</span>
              </h2>
              <p className="dashboard-description">
                Live data from our customers showing the impact of Mohit AI
              </p>
            </div>
            
            <div className="dashboard-grid">
              <div className="metric-display">
                <div className="metric-graph">
                  <svg viewBox="0 0 100 60" className="graph-svg">
                    <path
                      d="M 0,50 Q 25,40 50,20 T 100,10"
                      className="graph-line"
                      strokeDasharray="200"
                      strokeDashoffset="200"
                    />
                    <circle cx="100" cy="10" r="4" className="graph-dot" />
                  </svg>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Leads Captured Today</span>
                  <div className="metric-value">
                    <CounterAnimation target={1847} />
                  </div>
                  <div className="metric-change positive">
                    <TrendingUp className="w-4 h-4" />
                    <span>+23% from yesterday</span>
                  </div>
                </div>
              </div>
              
              <div className="metric-display" style={{animationDelay: '0.2s'}}>
                <div className="metric-graph">
                  <div className="circular-progress">
                    <svg viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="progress-bg"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="progress-fill"
                        strokeDasharray="283"
                        strokeDashoffset="23"
                      />
                    </svg>
                    <div className="progress-text">92%</div>
                  </div>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Lead Response Rate</span>
                  <div className="metric-value">
                    <CounterAnimation target={92} suffix="%" />
                  </div>
                  <div className="metric-change positive">
                    <Award className="w-4 h-4" />
                    <span>Industry leading</span>
                  </div>
                </div>
              </div>
              
              <div className="metric-display" style={{animationDelay: '0.4s'}}>
                <div className="metric-graph">
                  <div className="bar-chart">
                    {[65, 78, 82, 91, 95].map((height, i) => (
                      <div
                        key={i}
                        className="bar"
                        style={{
                          height: `${height}%`,
                          animationDelay: `${1 + i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Meetings Booked</span>
                  <div className="metric-value">
                    <CounterAnimation target={437} />
                  </div>
                  <div className="metric-change positive">
                    <Calendar className="w-4 h-4" />
                    <span>This week</span>
                  </div>
                </div>
              </div>
              
              <div className="metric-display" style={{animationDelay: '0.6s'}}>
                <div className="metric-graph">
                  <div className="pulse-indicator">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring"></div>
                    <div className="pulse-core">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Average Response Time</span>
                  <div className="metric-value">
                    <CounterAnimation target={47} suffix="s" />
                  </div>
                  <div className="metric-change">
                    <Clock className="w-4 h-4" />
                    <span>24/7 availability</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-footer">
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span>Live data from last 24 hours</span>
              </div>
              <div className="customer-count">
                <Users className="w-4 h-4" />
                <span><CounterAnimation target={500} />+ active customers</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Horizontal Layout */}
        <section className="cta-section">
          <div className="stats-container">
            <div className="cta-container">
              <div className="cta-content">
                <h2 className="cta-heading">
                  Never Miss Another Lead
                </h2>
                <p className="cta-description">
                  Join 500+ teams responding to every lead in under 60 seconds. 
                  Start your free trial and see results today.
                </p>
              </div>
              
              <div className="cta-buttons">
                <Link href="/register" className="btn">
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </Link>
                <Link href="/pricing" className="btn">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}