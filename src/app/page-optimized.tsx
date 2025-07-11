"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useCallback, memo } from "react";
import { useOptimizedScroll, useLazyImages } from "@/hooks/useOptimizedScroll";
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

// Lazy load heavy components
const CounterAnimation = dynamic(() => import("@/components/CounterAnimation").then(mod => ({ default: mod.CounterAnimation })), {
  ssr: false,
  loading: () => <div className="h-24 animate-pulse bg-gray-100 rounded" />
});

const AIFlowAnimation = dynamic(() => import("@/components/AIFlowAnimation"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-50 rounded" />
});

const TryAIModal = dynamic(() => import("@/components/TryAIModal").then(mod => ({ default: mod.TryAIModal })), {
  ssr: false
});

// Memoized navigation component for better performance
const Navigation = memo(({ mobileMenuOpen, setMobileMenuOpen }: { 
  mobileMenuOpen: boolean; 
  setMobileMenuOpen: (open: boolean) => void;
}) => (
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

      <button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
));

Navigation.displayName = 'Navigation';

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState<"without" | "with">("without");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Use optimized scroll hook
  useOptimizedScroll({
    enableParallax: true,
    rootMargin: '100px'
  });

  // Use lazy image loading
  useLazyImages();

  // Memoized callbacks
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main id="main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content observe-element">
              <h1 className="hero-heading">
                Never Miss Another Lead with <span className="text-pink">AI-Powered</span> Response
              </h1>
              <p className="hero-description">
                Mohit AI responds to every lead in under 60 seconds, 24/7. 
                Our human-like AI qualifies, nurtures, and books meetings 
                while you focus on closing deals.
              </p>
              <div className="hero-buttons">
                <button 
                  onClick={openModal}
                  className="btn btn-secondary gpu-transition"
                >
                  <span>Try AI Voice</span>
                  <Phone className="w-5 h-5" />
                </button>
                <Link href="/demo" className="btn btn-outline gpu-transition">
                  <span>Watch Demo</span>
                  <Play className="w-5 h-5" />
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <CounterAnimation end={3.2} decimals={1} suffix="M+" />
                  <span>Conversations</span>
                </div>
                <div className="stat-item">
                  <CounterAnimation end={47} suffix="s" />
                  <span>Avg Response</span>
                </div>
                <div className="stat-item">
                  <CounterAnimation end={391} suffix="%" />
                  <span>More Meetings</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-card observe-scale">
                <div className="card-header">
                  <div className="card-status">
                    <span className="status-dot"></span>
                    <span>AI Agent Active</span>
                  </div>
                  <div className="card-time">2 min ago</div>
                </div>
                <div className="card-content">
                  <div className="message-bubble ai">
                    <p>Hi Sarah! I noticed you downloaded our ROI calculator. I'd love to show you how other SaaS companies are seeing 3x more qualified meetings. Do you have 15 minutes this week?</p>
                  </div>
                  <div className="message-bubble user">
                    <p>Actually yes, I'm free Thursday at 2pm ET</p>
                  </div>
                  <div className="message-bubble ai">
                    <p>Perfect! I've sent you a calendar invite for Thursday at 2pm ET. Looking forward to showing you how we can help TechCorp accelerate sales!</p>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="action-item">
                    <Calendar className="w-4 h-4" />
                    <span>Meeting booked</span>
                  </div>
                  <div className="action-item">
                    <Users className="w-4 h-4" />
                    <span>Assigned to: Alex Chen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="trust-section">
          <div className="trust-container">
            <p className="trust-text">Trusted by 500+ high-growth sales teams</p>
            <div className="trust-logos observe-stagger">
              <div className="trust-logo">TechCorp</div>
              <div className="trust-logo">SalesForce</div>
              <div className="trust-logo">Growth Inc</div>
              <div className="trust-logo">StartupXYZ</div>
              <div className="trust-logo">Enterprise Co</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <div className="features-header">
              <h2 className="features-heading observe-element">
                Everything Your Sales Team Needs to <span className="text-pink">Win More Deals</span>
              </h2>
              <p className="features-description observe-element">
                From first touch to closed deal, Mohit AI handles the heavy lifting 
                so your team can focus on what matters most - building relationships.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card observe-stagger">
                <div className="feature-icon">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Human-Like Voice AI</h3>
                <p className="feature-description">
                  Natural conversations that qualify leads, handle objections, 
                  and book meetings - indistinguishable from your best SDRs.
                </p>
              </div>
              <div className="feature-card observe-stagger">
                <div className="feature-icon">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Instant SMS & Email</h3>
                <p className="feature-description">
                  Engage leads on their preferred channel within seconds. 
                  Personalized messages that actually get responses.
                </p>
              </div>
              <div className="feature-card observe-stagger">
                <div className="feature-icon">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Smart Lead Scoring</h3>
                <p className="feature-description">
                  AI analyzes every interaction to identify hot leads and 
                  prioritize them for your sales team automatically.
                </p>
              </div>
              <div className="feature-card observe-stagger">
                <div className="feature-icon">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="feature-title">CRM Integration</h3>
                <p className="feature-description">
                  Seamlessly syncs with Salesforce, HubSpot, and more. 
                  Every conversation logged, every insight captured.
                </p>
              </div>
              <div className="feature-card observe-stagger">
                <div className="feature-icon">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Smart Scheduling</h3>
                <p className="feature-description">
                  Books meetings directly into your team's calendar. 
                  Handles rescheduling and sends reminders automatically.
                </p>
              </div>
              <div className="feature-card observe-stagger">
                <div className="feature-icon">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Real-Time Analytics</h3>
                <p className="feature-description">
                  Track performance, conversation quality, and ROI. 
                  Know exactly what's working and optimize on the fly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Flow Animation Section */}
        <AIFlowAnimation />

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stats-header observe-element">
              <h2 className="stats-heading">
                The Numbers Speak for <span className="text-pink">Themselves</span>
              </h2>
              <p className="stats-description">
                See what happens when AI handles your lead response
              </p>
            </div>
            
            <div className="day-comparison">
              <div className="day-toggle">
                <button 
                  className={`toggle-option ${selectedDay === 'without' ? 'active' : ''}`}
                  onClick={() => setSelectedDay('without')}
                >
                  Without Mohit AI
                </button>
                <button 
                  className={`toggle-option ${selectedDay === 'with' ? 'active' : ''}`}
                  onClick={() => setSelectedDay('with')}
                >
                  With Mohit AI
                </button>
              </div>
              
              <div className="comparison-content">
                {selectedDay === 'without' ? (
                  <div className="day-stats observe-element">
                    <div className="time-stat negative">
                      <Clock className="w-5 h-5" />
                      <span className="stat-value">2.5 hours</span>
                      <span className="stat-label">Average response time</span>
                    </div>
                    <div className="time-stat negative">
                      <TrendingUp className="w-5 h-5" />
                      <span className="stat-value">67%</span>
                      <span className="stat-label">Leads gone cold</span>
                    </div>
                    <div className="time-stat negative">
                      <Target className="w-5 h-5" />
                      <span className="stat-value">23%</span>
                      <span className="stat-label">Contact rate</span>
                    </div>
                  </div>
                ) : (
                  <div className="day-stats observe-element">
                    <div className="time-stat positive">
                      <Clock className="w-5 h-5" />
                      <span className="stat-value">47 seconds</span>
                      <span className="stat-label">Average response time</span>
                    </div>
                    <div className="time-stat positive">
                      <TrendingUp className="w-5 h-5" />
                      <span className="stat-value">94%</span>
                      <span className="stat-label">Lead engagement</span>
                    </div>
                    <div className="time-stat positive">
                      <Target className="w-5 h-5" />
                      <span className="stat-value">78%</span>
                      <span className="stat-label">Contact rate</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="stats-container">
            <div className="cta-container observe-element">
              <div className="cta-content">
                <h2 className="cta-heading">
                  Ready to Never Miss Another Lead?
                </h2>
                <p className="cta-description">
                  Join 500+ sales teams using Mohit AI to respond instantly, 
                  qualify better, and close more deals.
                </p>
              </div>
              
              <div className="cta-buttons">
                <Link href="/register" className="btn gpu-transition">
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </Link>
                <Link href="/demo" className="btn gpu-transition">
                  Schedule Demo
                </Link>
              </div>
              
              <div className="cta-features">
                <div className="cta-feature">
                  <CheckCircle2 className="w-5 h-5 text-pink" />
                  <span>14-day free trial</span>
                </div>
                <div className="cta-feature">
                  <CheckCircle2 className="w-5 h-5 text-pink" />
                  <span>No credit card required</span>
                </div>
                <div className="cta-feature">
                  <CheckCircle2 className="w-5 h-5 text-pink" />
                  <span>Setup in 10 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {modalOpen && <TryAIModal onClose={() => setModalOpen(false)} />}
    </>
  );
}