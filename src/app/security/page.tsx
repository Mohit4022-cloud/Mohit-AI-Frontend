"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Lock,
  CheckCircle2,
  ArrowRight,
  Globe,
  Key,
  FileCheck,
  UserCheck,
  Server,
  RefreshCw,
  AlertCircle,
  Award,
  Building2,
  Sparkles,
  ChevronDown,
  Plus,
  Minus,
  ShieldCheck,
  Database,
  Cloud,
  Zap,
  Eye,
  Users,
  Timer,
  BarChart3,
  BadgeCheck,
  ClipboardCheck,
  ScrollText,
  Fingerprint,
  Activity,
  GitBranch,
  HardDrive,
  Network,
  Laptop,
  Smartphone,
} from "lucide-react";
import "@/app/security-page-styles.css";

// FAQ data
const faqs = [
  {
    question: "How does Mohit AI protect my customer data?",
    answer: "We use 256-bit AES encryption for all data at rest and in transit. Your data is stored in SOC 2 Type II certified data centers with strict access controls. We never use customer data to train our models, and all data processing happens in isolated environments."
  },
  {
    question: "What compliance certifications does Mohit AI have?",
    answer: "Mohit AI is SOC 2 Type II certified and compliant with GDPR, CCPA, and HIPAA requirements. We undergo annual third-party security audits and maintain comprehensive compliance documentation available upon request."
  },
  {
    question: "Can I control who has access to my data?",
    answer: "Yes! We provide granular role-based access control (RBAC) that lets you define exactly who can access what data. Combined with mandatory two-factor authentication and detailed audit logs, you have complete visibility and control over data access."
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer: "You own your data. Upon cancellation, you have 30 days to export all your data. After this period, we securely delete all your data from our systems following industry-standard data destruction protocols. We can provide a certificate of deletion upon request."
  },
  {
    question: "How reliable is the Mohit AI platform?",
    answer: "We maintain a 99.9% uptime SLA backed by redundant infrastructure across multiple availability zones. Our platform includes automatic failover, real-time monitoring, and 24/7 incident response to ensure your AI SDR is always available when leads come in."
  },
  {
    question: "Do you share data with third parties?",
    answer: "Never. We have a strict zero data sharing policy. Your data is never sold, shared, or used for any purpose other than providing you with our services. Even our AI models are trained on synthetic data, not customer information."
  }
];

export default function SecurityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Fixed Navigation - Consistent with other pages */}
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
                  Overview
                </Link>
                <Link href="/solutions/for-sdrs" className="navbar-dropdown-item">
                  For SDRs
                </Link>
                <Link href="/solutions/for-managers" className="navbar-dropdown-item">
                  For Sales Managers
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
            <Link href="/security" className="navbar-link navbar-link-active">
              Security
            </Link>
          </div>

          <div className="navbar-actions">
            <Link href="/login" className="navbar-btn-secondary">
              Sign In
            </Link>
            <Link href="/dashboard" className="navbar-btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="security-hero pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-pink" />
              <span className="text-sm font-semibold text-pink uppercase tracking-wider">
                Enterprise-Grade Security
              </span>
              <Shield className="w-5 h-5 text-pink" />
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your Data Security is{" "}
              <span className="text-pink">
                Our Top Priority
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Bank-level encryption, zero data sharing, and complete compliance. 
              Trust Mohit AI to protect your most valuable asset - your customer data.
            </p>
            
            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <BadgeCheck className="w-6 h-6" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="trust-badge">
                <ShieldCheck className="w-6 h-6" />
                <span>GDPR Compliant</span>
              </div>
              <div className="trust-badge">
                <Award className="w-6 h-6" />
                <span>ISO 27001</span>
              </div>
              <div className="trust-badge">
                <FileCheck className="w-6 h-6" />
                <span>CCPA Compliant</span>
              </div>
            </div>
          </div>

          {/* Security Metrics */}
          <div className="security-metrics">
            <div className="metric-card">
              <div className="metric-number">256-bit</div>
              <div className="metric-label">AES Encryption</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">99.9%</div>
              <div className="metric-label">Uptime SLA</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">Zero</div>
              <div className="metric-label">Data Breaches</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">24/7</div>
              <div className="metric-label">Security Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Security Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Security at Every Layer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From infrastructure to application, we've built security into every aspect of Mohit AI
            </p>
          </div>

          <div className="security-features-grid">
            <div className="security-feature-card">
              <div className="feature-icon">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="feature-title">Data Encryption</h3>
              <p className="feature-description">
                256-bit AES encryption for all data at rest and in transit. Your conversations, 
                contacts, and analytics are protected with bank-level security standards.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>End-to-end encryption</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>TLS 1.3 protocols</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Encrypted backups</span>
                </div>
              </div>
            </div>

            <div className="security-feature-card">
              <div className="feature-icon">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="feature-title">Access Control</h3>
              <p className="feature-description">
                Granular role-based permissions with mandatory two-factor authentication. 
                Control exactly who can access your data and track every action.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Role-based access</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>2FA required</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>SSO support</span>
                </div>
              </div>
            </div>

            <div className="security-feature-card">
              <div className="feature-icon">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="feature-title">Zero Data Sharing</h3>
              <p className="feature-description">
                Your data never trains our models. We maintain complete data isolation 
                with a strict policy against sharing or selling customer information.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No model training</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Data isolation</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Private instances</span>
                </div>
              </div>
            </div>

            <div className="security-feature-card">
              <div className="feature-icon">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="feature-title">Infrastructure Security</h3>
              <p className="feature-description">
                Multi-layered security with redundant systems across multiple data centers. 
                Continuous monitoring and automated threat detection keep your data safe.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>SOC 2 certified</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>24/7 monitoring</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>DDoS protection</span>
                </div>
              </div>
            </div>

            <div className="security-feature-card">
              <div className="feature-icon">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="feature-title">Business Continuity</h3>
              <p className="feature-description">
                99.9% uptime SLA with automatic failover and disaster recovery. 
                Your AI SDR stays online even during maintenance or incidents.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Auto-failover</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Daily backups</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Instant recovery</span>
                </div>
              </div>
            </div>

            <div className="security-feature-card">
              <div className="feature-icon">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="feature-title">Audit & Compliance</h3>
              <p className="feature-description">
                Complete audit trails for every action. Meet compliance requirements 
                with detailed logs, reports, and data processing agreements.
              </p>
              <div className="feature-benefits">
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Full audit logs</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>DPA available</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Export controls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="compliance-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compliance & Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meeting the highest standards of data protection and privacy regulations worldwide
            </p>
          </div>

          <div className="compliance-grid">
            <div className="compliance-card">
              <div className="compliance-icon">
                <BadgeCheck className="w-12 h-12" />
              </div>
              <h3 className="compliance-title">SOC 2 Type II</h3>
              <p className="compliance-description">
                Annual third-party audits verify our security controls, availability, 
                processing integrity, confidentiality, and privacy practices.
              </p>
            </div>

            <div className="compliance-card">
              <div className="compliance-icon">
                <Globe className="w-12 h-12" />
              </div>
              <h3 className="compliance-title">GDPR Compliant</h3>
              <p className="compliance-description">
                Full compliance with EU data protection regulations including data 
                portability, right to deletion, and privacy by design.
              </p>
            </div>

            <div className="compliance-card">
              <div className="compliance-icon">
                <FileCheck className="w-12 h-12" />
              </div>
              <h3 className="compliance-title">CCPA Ready</h3>
              <p className="compliance-description">
                California Consumer Privacy Act compliance with transparent data 
                practices and consumer rights management.
              </p>
            </div>

            <div className="compliance-card">
              <div className="compliance-icon">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="compliance-title">ISO 27001</h3>
              <p className="compliance-description">
                Information security management system certified to international 
                standards for systematic security risk management.
              </p>
            </div>

            <div className="compliance-card">
              <div className="compliance-icon">
                <Building2 className="w-12 h-12" />
              </div>
              <h3 className="compliance-title">HIPAA Compatible</h3>
              <p className="compliance-description">
                Healthcare data handling capabilities with appropriate safeguards 
                and Business Associate Agreements available.
              </p>
            </div>

            <div className="compliance-card">
              <div className="compliance-icon">
                <ScrollText className="w-12 h-12" />
              </div>
              <h3 className="compliance-title">PCI DSS</h3>
              <p className="compliance-description">
                Payment Card Industry Data Security Standards compliance for secure 
                handling of payment information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Privacy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="privacy-section">
            <div className="privacy-content">
              <div className="section-badge mb-6">
                <Eye className="w-4 h-4" />
                <span>Data Privacy Commitment</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Data Never Trains Our Models
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We believe your competitive advantage should remain yours. That's why we have 
                a strict zero data sharing policy.
              </p>
              
              <div className="privacy-features">
                <div className="privacy-feature">
                  <Lock className="w-6 h-6 text-pink" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Complete Data Isolation</h4>
                    <p className="text-gray-600">Your data is stored in isolated environments, never mixed with other customers</p>
                  </div>
                </div>
                
                <div className="privacy-feature">
                  <Database className="w-6 h-6 text-pink" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Synthetic Training Data</h4>
                    <p className="text-gray-600">Our AI models are trained exclusively on synthetic data, never customer information</p>
                  </div>
                </div>
                
                <div className="privacy-feature">
                  <Users className="w-6 h-6 text-pink" />
                  <div>
                    <h4 className="font-semibold text-gray-900">No Third-Party Sharing</h4>
                    <p className="text-gray-600">We never sell, share, or provide your data to any third parties</p>
                  </div>
                </div>
                
                <div className="privacy-feature">
                  <Key className="w-6 h-6 text-pink" />
                  <div>
                    <h4 className="font-semibold text-gray-900">You Own Your Data</h4>
                    <p className="text-gray-600">Export or delete your data anytime - you maintain complete ownership</p>
                  </div>
                </div>
              </div>
              
              <Link href="/privacy" className="btn btn-primary inline-flex items-center mt-8">
                <span>Read Our Privacy Policy</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="privacy-visual">
              <div className="security-shield">
                <Shield className="w-32 h-32 text-pink opacity-10" />
                <div className="shield-layers">
                  <div className="shield-layer layer-1"></div>
                  <div className="shield-layer layer-2"></div>
                  <div className="shield-layer layer-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Security */}
      <section className="infrastructure-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on world-class infrastructure with multiple layers of security and redundancy
            </p>
          </div>

          <div className="infrastructure-diagram">
            <div className="infra-layer">
              <div className="layer-header">
                <Network className="w-6 h-6" />
                <h3>Network Security</h3>
              </div>
              <div className="layer-items">
                <div className="layer-item">DDoS Protection</div>
                <div className="layer-item">Web Application Firewall</div>
                <div className="layer-item">Rate Limiting</div>
                <div className="layer-item">IP Whitelisting</div>
              </div>
            </div>

            <div className="infra-layer">
              <div className="layer-header">
                <Server className="w-6 h-6" />
                <h3>Application Security</h3>
              </div>
              <div className="layer-items">
                <div className="layer-item">Input Validation</div>
                <div className="layer-item">OWASP Top 10</div>
                <div className="layer-item">Security Headers</div>
                <div className="layer-item">API Authentication</div>
              </div>
            </div>

            <div className="infra-layer">
              <div className="layer-header">
                <Database className="w-6 h-6" />
                <h3>Data Security</h3>
              </div>
              <div className="layer-items">
                <div className="layer-item">Encryption at Rest</div>
                <div className="layer-item">Encrypted Backups</div>
                <div className="layer-item">Access Logging</div>
                <div className="layer-item">Data Residency</div>
              </div>
            </div>

            <div className="infra-layer">
              <div className="layer-header">
                <HardDrive className="w-6 h-6" />
                <h3>Physical Security</h3>
              </div>
              <div className="layer-items">
                <div className="layer-item">SOC 2 Data Centers</div>
                <div className="layer-item">24/7 Surveillance</div>
                <div className="layer-item">Biometric Access</div>
                <div className="layer-item">Redundant Power</div>
              </div>
            </div>
          </div>

          {/* Security Practices Timeline */}
          <div className="security-timeline mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">Our Security Journey</h3>
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Daily</h4>
                  <p>Automated security scans and vulnerability assessments</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Weekly</h4>
                  <p>Security patch reviews and dependency updates</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Monthly</h4>
                  <p>Penetration testing and security training</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Quarterly</h4>
                  <p>Third-party security audits and compliance reviews</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Annually</h4>
                  <p>SOC 2 Type II audit and certification renewal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-badge mb-6">
              <Building2 className="w-4 h-4" />
              <span>Enterprise Ready</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Security for Enterprise Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Additional security features and controls for organizations with advanced requirements
            </p>
          </div>

          <div className="enterprise-features">
            <div className="enterprise-feature">
              <div className="enterprise-icon">
                <Fingerprint className="w-8 h-8" />
              </div>
              <h3>Single Sign-On (SSO)</h3>
              <p>Integrate with your existing identity provider for seamless and secure authentication</p>
              <ul className="feature-list">
                <li>SAML 2.0 support</li>
                <li>OAuth integration</li>
                <li>Active Directory sync</li>
              </ul>
            </div>

            <div className="enterprise-feature">
              <div className="enterprise-icon">
                <GitBranch className="w-8 h-8" />
              </div>
              <h3>Advanced RBAC</h3>
              <p>Create custom roles and permissions tailored to your organization's structure</p>
              <ul className="feature-list">
                <li>Custom role creation</li>
                <li>Granular permissions</li>
                <li>Team hierarchies</li>
              </ul>
            </div>

            <div className="enterprise-feature">
              <div className="enterprise-icon">
                <Cloud className="w-8 h-8" />
              </div>
              <h3>Private Cloud Deployment</h3>
              <p>Deploy Mohit AI in your own cloud environment for maximum control</p>
              <ul className="feature-list">
                <li>VPC deployment</li>
                <li>Custom domains</li>
                <li>Air-gapped options</li>
              </ul>
            </div>

            <div className="enterprise-feature">
              <div className="enterprise-icon">
                <ClipboardCheck className="w-8 h-8" />
              </div>
              <h3>Compliance Support</h3>
              <p>Dedicated compliance team to help meet your regulatory requirements</p>
              <ul className="feature-list">
                <li>Custom DPAs</li>
                <li>Audit support</li>
                <li>Compliance reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Security Questions? We've Got Answers
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our security practices and policies
            </p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-pink" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Security First, Always
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Secure AI Sales?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join 500+ teams who trust Mohit AI to protect their data while accelerating their sales
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="btn btn-secondary inline-flex items-center"
            >
              <span>Request Security Docs</span>
              <FileCheck className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="btn btn-outline inline-flex items-center"
            >
              <span>Talk to Security Team</span>
              <Shield className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-sm text-white/60 mt-8">
            Have specific security requirements? We're here to help.
          </p>
        </div>
      </section>
    </>
  );
}
