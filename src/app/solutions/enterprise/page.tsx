"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Shield,
  Users,
  Globe,
  Building2,
  Lock,
  ChevronDown,
  CheckCircle2,
  Award,
  Zap,
  HeadphonesIcon,
  BarChart3,
  FileText,
  Download,
  Play,
  ShieldCheck,
  Key,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  TrendingUp,
  UserCheck,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  FileCheck,
  Scale,
  Clock,
  Activity,
  AlertTriangle,
  CheckSquare,
  XCircle,
  Brain,
} from "lucide-react";

export default function EnterprisePage() {
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
              <Link href="#contact" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
                Contact Sales
              </Link>
              <Link href="/demo" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Request Demo
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main id="main">
        {/* Hero Section */}
        <section className="enterprise-hero">
          <div className="enterprise-hero-bg">
            <div className="mesh-background">
              <div className="mesh-circle mesh-circle-1"></div>
              <div className="mesh-circle mesh-circle-2"></div>
              <div className="mesh-circle mesh-circle-3"></div>
            </div>
          </div>
          <div className="enterprise-container">
            <div className="enterprise-hero-content">
              <div className="enterprise-badge">
                <Building2 className="w-4 h-4" />
                <span>Enterprise Solution</span>
              </div>
              <h1 className="enterprise-heading">
                Enterprise-Grade AI SDR Platform
                <span className="enterprise-heading-accent">
                  Trusted by Industry Leaders
                </span>
              </h1>
              <p className="enterprise-description">
                Deploy AI-powered sales at scale with the security, compliance, and reliability that 
                Fortune 500 companies demand. White-glove support and custom implementations for 
                organizations with 500+ employees.
              </p>
              <div className="enterprise-hero-stats">
                <div className="enterprise-stat">
                  <div className="stat-value">99.99%</div>
                  <div className="stat-label">Uptime SLA</div>
                </div>
                <div className="enterprise-stat">
                  <div className="stat-value">SOC 2</div>
                  <div className="stat-label">Type II Certified</div>
                </div>
                <div className="enterprise-stat">
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Priority Support</div>
                </div>
                <div className="enterprise-stat">
                  <div className="stat-value">100M+</div>
                  <div className="stat-label">Leads Processed</div>
                </div>
              </div>
              <div className="enterprise-hero-actions">
                <Link href="#contact" className="enterprise-btn-primary">
                  <Phone className="w-5 h-5" />
                  <span>Talk to Sales</span>
                </Link>
                <Link href="#demo" className="enterprise-btn-secondary">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Logos Section */}
        <section className="enterprise-trust">
          <div className="enterprise-container">
            <p className="trust-intro">Trusted by leading enterprises worldwide</p>
            <div className="trust-logos">
              <div className="trust-logo">
                <Building2 className="w-8 h-8" />
                <span>Fortune 500</span>
              </div>
              <div className="trust-logo">
                <Building2 className="w-8 h-8" />
                <span>Global Bank</span>
              </div>
              <div className="trust-logo">
                <Building2 className="w-8 h-8" />
                <span>Tech Giant</span>
              </div>
              <div className="trust-logo">
                <Building2 className="w-8 h-8" />
                <span>Healthcare Leader</span>
              </div>
              <div className="trust-logo">
                <Building2 className="w-8 h-8" />
                <span>Retail Corp</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="enterprise-features">
          <div className="enterprise-container">
            <h2 className="enterprise-section-heading">
              Enterprise Features That Scale
              <span className="heading-underline"></span>
            </h2>
            <p className="enterprise-section-description">
              Built from the ground up for enterprise needs with advanced capabilities, 
              security, and customization options.
            </p>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Users className="w-6 h-6" />
                </div>
                <h3>Dedicated Success Team</h3>
                <p>
                  Your own Customer Success Manager and technical team to ensure 
                  smooth deployment and ongoing optimization.
                </p>
                <ul className="feature-list">
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Weekly strategy sessions
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Custom training programs
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    24/7 priority support
                  </li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Brain className="w-6 h-6" />
                </div>
                <h3>Custom AI Training</h3>
                <p>
                  Train our AI on your specific sales methodology, brand voice, and 
                  unique business requirements.
                </p>
                <ul className="feature-list">
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Industry-specific models
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Custom objection handling
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Proprietary integrations
                  </li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield className="w-6 h-6" />
                </div>
                <h3>Advanced Security</h3>
                <p>
                  Bank-level security with comprehensive compliance certifications 
                  and advanced access controls.
                </p>
                <ul className="feature-list">
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    SOC 2 Type II certified
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    GDPR & CCPA compliant
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Enterprise SSO/SAML
                  </li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3>Unlimited Scale</h3>
                <p>
                  No limits on users, leads, or conversations. Scale your sales 
                  operations without constraints.
                </p>
                <ul className="feature-list">
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Unlimited team seats
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    10M+ daily conversations
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Global infrastructure
                  </li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h3>API & Integrations</h3>
                <p>
                  Deep integrations with your existing tech stack and full API 
                  access for custom workflows.
                </p>
                <ul className="feature-list">
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    REST & GraphQL APIs
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Webhook events
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Custom connectors
                  </li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Globe className="w-6 h-6" />
                </div>
                <h3>Global Deployment</h3>
                <p>
                  Deploy across multiple regions with data residency options and 
                  local compliance support.
                </p>
                <ul className="feature-list">
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Multi-region hosting
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    Data sovereignty
                  </li>
                  <li>
                    <CheckCircle2 className="w-4 h-4" />
                    &lt;45ms global latency
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="enterprise-security">
          <div className="enterprise-container">
            <div className="security-grid">
              <div className="security-content">
                <h2 className="enterprise-section-heading">
                  Bank-Level Security & Compliance
                  <span className="heading-underline"></span>
                </h2>
                <p className="security-intro">
                  Meet the strictest security requirements with our comprehensive 
                  compliance framework and enterprise-grade infrastructure.
                </p>
                
                <div className="compliance-badges">
                  <div className="compliance-badge">
                    <ShieldCheck className="w-8 h-8" />
                    <div>
                      <h4>SOC 2 Type II</h4>
                      <p>Annual audits</p>
                    </div>
                  </div>
                  <div className="compliance-badge">
                    <FileCheck className="w-8 h-8" />
                    <div>
                      <h4>ISO 27001</h4>
                      <p>Certified</p>
                    </div>
                  </div>
                  <div className="compliance-badge">
                    <Scale className="w-8 h-8" />
                    <div>
                      <h4>GDPR & CCPA</h4>
                      <p>Compliant</p>
                    </div>
                  </div>
                  <div className="compliance-badge">
                    <BadgeCheck className="w-8 h-8" />
                    <div>
                      <h4>HIPAA Ready</h4>
                      <p>Available</p>
                    </div>
                  </div>
                </div>

                <div className="security-features">
                  <h3>Advanced Security Features</h3>
                  <div className="feature-grid">
                    <div className="security-feature">
                      <Lock className="w-5 h-5" />
                      <span>256-bit AES encryption at rest</span>
                    </div>
                    <div className="security-feature">
                      <Shield className="w-5 h-5" />
                      <span>TLS 1.3 encryption in transit</span>
                    </div>
                    <div className="security-feature">
                      <Key className="w-5 h-5" />
                      <span>Enterprise SSO (SAML, OIDC)</span>
                    </div>
                    <div className="security-feature">
                      <UserCheck className="w-5 h-5" />
                      <span>Role-based access control</span>
                    </div>
                    <div className="security-feature">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Real-time threat monitoring</span>
                    </div>
                    <div className="security-feature">
                      <FileText className="w-5 h-5" />
                      <span>Comprehensive audit logs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="security-visual">
                <div className="security-diagram">
                  <div className="diagram-layer">
                    <Shield className="w-6 h-6" />
                    <span>Application Layer Security</span>
                  </div>
                  <div className="diagram-layer">
                    <Server className="w-6 h-6" />
                    <span>Infrastructure Protection</span>
                  </div>
                  <div className="diagram-layer">
                    <Database className="w-6 h-6" />
                    <span>Data Encryption</span>
                  </div>
                  <div className="diagram-layer">
                    <Cloud className="w-6 h-6" />
                    <span>Network Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="enterprise-cta" id="contact">
          <div className="enterprise-container">
            <div className="cta-content">
              <h2 className="cta-heading">
                Scale Your Sales with Enterprise AI
              </h2>
              <p className="cta-description">
                Join Fortune 500 companies and industry leaders who trust Mohit AI to power their sales operations. 
                Experience the difference of enterprise-grade AI with white-glove support.
              </p>
              
              <div className="cta-stats">
                <div className="cta-stat">
                  <div className="cta-stat-value">500+</div>
                  <div className="cta-stat-label">Enterprise Clients</div>
                </div>
                <div className="cta-stat">
                  <div className="cta-stat-value">3.2x</div>
                  <div className="cta-stat-label">Average ROI</div>
                </div>
                <div className="cta-stat">
                  <div className="cta-stat-value">45%</div>
                  <div className="cta-stat-label">Lead Conversion Increase</div>
                </div>
              </div>
              
              <div className="cta-actions">
                <Link href="#contact-form" className="enterprise-btn-primary">
                  <Phone className="w-5 h-5" />
                  Get Your Custom Demo
                </Link>
                <Link href="/security" className="enterprise-btn-secondary">
                  <Shield className="w-5 h-5" />
                  Download Security Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}