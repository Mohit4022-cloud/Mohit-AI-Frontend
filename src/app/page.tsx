import type { Metadata } from "next";
import Link from "next/link";
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
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Mohit AI - Never Miss Another Inbound Lead | Respond in Under 60 Seconds",
  description:
    "Mohit AI - Never Miss Another Inbound Lead | Respond in Under 60 Seconds",
};

export default function HomePage() {
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

          <div className="navbar-menu">
            <Link href="/product" className="navbar-link">
              Product
            </Link>
            <Link href="/pricing" className="navbar-link">
              Pricing
            </Link>

            {/* Solutions Dropdown */}
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-toggle">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="navbar-dropdown-menu">
                <Link href="/solutions" className="navbar-dropdown-item">
                  By Industry
                </Link>
                <Link href="/solutions/for-sdrs" className="navbar-dropdown-item">
                  For SDRs
                </Link>
                <Link href="/solutions/for-managers" className="navbar-dropdown-item">
                  For Managers
                </Link>
                <Link href="/solutions/enterprise" className="navbar-dropdown-item">
                  Enterprise
                </Link>
                <Link href="/solutions/small-business" className="navbar-dropdown-item">
                  Small Business
                </Link>
              </div>
            </div>

            <Link href="/resources" className="navbar-link">
              Resources
            </Link>
            <Link href="/security" className="navbar-link">
              Security
            </Link>
          </div>

          <div className="navbar-actions">
            <Link href="/dashboard" className="btn btn-outline">
              Check out the platform
            </Link>
            <Link href="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
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
        
        {/* Statistics Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <Clock className="h-8 w-8 text-pink" />
                </div>
                <div className="stat-value">47</div>
                <h3 className="stat-label">Second</h3>
                <p className="stat-description">Response Time</p>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="stat-value">391%</div>
                <h3 className="stat-label">Higher</h3>
                <p className="stat-description">Conversion Rate</p>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Target className="h-8 w-8" />
                </div>
                <div className="stat-value">21×</div>
                <h3 className="stat-label">More Qualified</h3>
                <p className="stat-description">Leads Generated</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="trust-section">
          <div className="stats-container">
            <h2 className="trust-heading">
              <span className="text-pink">500+</span> Sales Teams<br />
              Trust Mohit AI
            </h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">10-15</div>
                <p className="stat-label">Hot Leads Daily</p>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">3x</div>
                <p className="stat-label">More Meetings</p>
              </div>
              
              <div className="stat-card">
                <div className="stat-value text-black">80%</div>
                <p className="stat-label">Less Cold Calling</p>
              </div>
            </div>
            
            <div className="trust-badges">
              <div className="trust-badge">
                <Shield className="h-4 w-4" />
                SOC 2 Type II Certified
              </div>
              <div className="trust-badge">
                <Zap className="h-4 w-4" />
                99.9% Uptime SLA
              </div>
              <div className="trust-badge">
                <Lock className="h-4 w-4" />
                Bank-Level Encryption
              </div>
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
                <p className="feature-description">
                  Your AI SDR makes hundreds of personalized calls daily using
                  natural voice AI, qualifies interest, and books meetings
                  automatically.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Intelligent Email</h3>
                <p className="feature-description">
                  AI writes and sends personalized emails based on prospect
                  research, company news, and buying signals. Follows up
                  automatically.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Multi-Channel</h3>
                <p className="feature-description">
                  Seamlessly engage prospects across email, LinkedIn, SMS, and
                  phone calls. Maintains consistent messaging while adapting to
                  preferences.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="trust-section">
          <div className="features-container">
            <div className="text-center">
              <h2 className="features-heading">
                What Our <span className="text-pink">Customers Say</span>
              </h2>
            </div>
            
            <div className="features-grid" style={{ marginTop: 'var(--space-3xl)' }}>
              <div className="feature-card">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-pink fill-current"
                    />
                  ))}
                </div>
                <p className="feature-description" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>
                  &ldquo;We went from missing 40% of our inbound leads to
                  capturing every single one. Mohit AI paid for itself in the
                  first week.&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--border-gray)', paddingTop: 'var(--space-md)' }}>
                  <p className="feature-title" style={{ fontSize: '1.125rem' }}>Sarah Chen</p>
                  <p className="stat-description">VP Sales at TechFlow</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-pink fill-current"
                    />
                  ))}
                </div>
                <p className="feature-description" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>
                  &ldquo;$75/month for an AI that books more meetings than our
                  $65k/year SDR? We&apos;re saving $5,000/month and converting 3x more.&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--border-gray)', paddingTop: 'var(--space-md)' }}>
                  <p className="feature-title" style={{ fontSize: '1.125rem' }}>Marcus Johnson</p>
                  <p className="stat-description">Founder at GrowthLab</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-pink fill-current"
                    />
                  ))}
                </div>
                <p className="feature-description" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>
                  &ldquo;Finally, an AI that actually works across all channels.
                  Our leads come from everywhere. Mohit AI handles them all.&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--border-gray)', paddingTop: 'var(--space-md)' }}>
                  <p className="feature-title" style={{ fontSize: '1.125rem' }}>Jennifer Park</p>
                  <p className="stat-description">RevOps at CloudFirst</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-pink fill-current"
                    />
                  ))}
                </div>
                <p className="feature-description" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>
                  &ldquo;The ROI is incredible. Our conversion rate jumped 391% and we&apos;re closing deals faster than ever before.&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--border-gray)', paddingTop: 'var(--space-md)' }}>
                  <p className="feature-title" style={{ fontSize: '1.125rem' }}>David Kim</p>
                  <p className="stat-description">CEO at ScaleUp Inc</p>
                </div>
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