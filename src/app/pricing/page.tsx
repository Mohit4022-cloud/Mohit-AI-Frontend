"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  ChevronDown,
  Plus,
  Shield,
  Zap,
  Users,
  BarChart3,
  Bot,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Clock,
  Headphones,
  Building,
} from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pricing = {
    starter: {
      monthly: 75,
      annual: 750, // 2 months free
    },
    professional: {
      monthly: 299,
      annual: 2990, // 2 months free
    },
    scale: {
      monthly: 799,
      annual: 7990, // 2 months free
    },
  };

  return (
    <>
      {/* Skip to content for accessibility */}
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>

      {/* Fixed Navigation - Reused from product page */}
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
        {/* Pricing Hero Section */}
        <section className="hero-section pricing-hero">
          <div className="hero-container">
            <div className="pricing-hero-content">
              <div className="section-badge">
                <Sparkles className="w-4 h-4" />
                <span>Simple, Transparent Pricing</span>
              </div>
              
              <h1 className="hero-heading">
                Pricing That Scales<br />
                <span className="text-pink">With Your Growth</span>
              </h1>
              
              <p className="hero-description">
                Start with just $75/month. No setup fees, no hidden costs.
                Upgrade, downgrade, or cancel anytime. See why 500+ teams
                trust Mohit AI to accelerate their sales.
              </p>
              
              {/* Billing Toggle */}
              <div className="billing-toggle-container">
                <button
                  className={`billing-option ${billingPeriod === "monthly" ? "active" : ""}`}
                  onClick={() => setBillingPeriod("monthly")}
                >
                  Monthly billing
                </button>
                <div className="billing-toggle">
                  <button
                    className={`toggle-switch ${billingPeriod === "annual" ? "active" : ""}`}
                    onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
                    aria-label="Toggle billing period"
                  >
                    <span className="toggle-slider" />
                  </button>
                </div>
                <button
                  className={`billing-option ${billingPeriod === "annual" ? "active" : ""}`}
                  onClick={() => setBillingPeriod("annual")}
                >
                  Annual billing
                  <span className="billing-badge">Save 2 months</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="pricing-section">
          <div className="pricing-container">
            <div className="pricing-grid">
              {/* Starter Plan */}
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="pricing-title">Starter</h3>
                  <p className="pricing-description">
                    Perfect for small teams getting started with AI sales
                  </p>
                </div>
                
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="price">
                    {billingPeriod === "monthly" ? pricing.starter.monthly : Math.floor(pricing.starter.annual / 12)}
                  </span>
                  <span className="period">/month</span>
                  {billingPeriod === "annual" && (
                    <span className="annual-label">billed annually</span>
                  )}
                </div>
                
                <div className="pricing-cta">
                  <Link href="/register" className="btn btn-outline-primary">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <div className="pricing-features">
                  <h4 className="features-heading">Everything you need to start:</h4>
                  <ul className="features-list">
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Up to 100 conversations/month</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>AI Voice calling</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Email & SMS automation</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Live chat widget</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>1 user seat</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Basic analytics</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>CRM integration (1)</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pricing-footer">
                  <p className="footer-text">No credit card required • 14-day free trial</p>
                </div>
              </div>

              {/* Professional Plan - Recommended */}
              <div className="pricing-card featured">
                <div className="pricing-badge">
                  <Zap className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
                
                <div className="pricing-header">
                  <h3 className="pricing-title">Professional</h3>
                  <p className="pricing-description">
                    For growing teams ready to scale their outbound
                  </p>
                </div>
                
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="price">
                    {billingPeriod === "monthly" ? pricing.professional.monthly : Math.floor(pricing.professional.annual / 12)}
                  </span>
                  <span className="period">/month</span>
                  {billingPeriod === "annual" && (
                    <span className="annual-label">billed annually</span>
                  )}
                </div>
                
                <div className="pricing-cta">
                  <Link href="/register" className="btn btn-primary">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <div className="pricing-features">
                  <h4 className="features-heading">Everything in Starter, plus:</h4>
                  <ul className="features-list">
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span><strong>500 conversations/month</strong></span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Advanced AI training</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Multi-language support</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>A/B testing</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span><strong>5 user seats</strong></span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Advanced analytics & reporting</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Unlimited CRM integrations</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Priority support & onboarding</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Custom AI personality</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Lead scoring & routing</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pricing-footer">
                  <p className="footer-text">Most chosen by growing sales teams</p>
                </div>
              </div>

              {/* Scale Plan */}
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="pricing-title">Scale</h3>
                  <p className="pricing-description">
                    For teams that need advanced features and control
                  </p>
                </div>
                
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="price">
                    {billingPeriod === "monthly" ? pricing.scale.monthly : Math.floor(pricing.scale.annual / 12)}
                  </span>
                  <span className="period">/month</span>
                  {billingPeriod === "annual" && (
                    <span className="annual-label">billed annually</span>
                  )}
                </div>
                
                <div className="pricing-cta">
                  <Link href="/register" className="btn btn-outline-primary">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <div className="pricing-features">
                  <h4 className="features-heading">Everything in Professional, plus:</h4>
                  <ul className="features-list">
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span><strong>2,000 conversations/month</strong></span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>White-label options</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>API access</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Custom integrations</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span><strong>20 user seats</strong></span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Dedicated success manager</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>SLA guarantee</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Advanced security features</span>
                    </li>
                    <li>
                      <Check className="w-5 h-5 text-pink" />
                      <span>Custom AI workflows</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pricing-footer">
                  <p className="footer-text">Perfect for scaling sales teams</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise CTA Section */}
        <section className="enterprise-section">
          <div className="enterprise-container">
            <div className="enterprise-card">
              <div className="enterprise-content">
                <div className="enterprise-icon">
                  <Building className="h-12 w-12 text-pink" />
                </div>
                <h2 className="enterprise-heading">
                  Need More Than 2,000 Conversations?
                </h2>
                <p className="enterprise-description">
                  Get custom pricing, unlimited seats, dedicated infrastructure,
                  and enterprise-grade security for your high-volume sales operations.
                </p>
                <div className="enterprise-features">
                  <div className="enterprise-feature">
                    <Shield className="w-5 h-5 text-pink" />
                    <span>SOC 2 Type II certified</span>
                  </div>
                  <div className="enterprise-feature">
                    <Users className="w-5 h-5 text-pink" />
                    <span>Unlimited users</span>
                  </div>
                  <div className="enterprise-feature">
                    <Globe className="w-5 h-5 text-pink" />
                    <span>Global infrastructure</span>
                  </div>
                  <div className="enterprise-feature">
                    <Headphones className="w-5 h-5 text-pink" />
                    <span>24/7 phone support</span>
                  </div>
                </div>
                <Link href="/contact-sales" className="btn btn-secondary">
                  <span>Contact Sales</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Section */}
        <section className="comparison-section">
          <div className="comparison-container">
            <div className="comparison-header">
              <h2 className="comparison-heading">
                Compare Plans &<br />
                <span className="text-pink">Choose What&apos;s Right</span>
              </h2>
              <p className="comparison-description">
                All plans include our core AI SDR features. Scale up as you grow.
              </p>
            </div>
            
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="feature-col">Features</th>
                    <th className="plan-col">
                      <div className="plan-header">
                        <h4>Starter</h4>
                        <p>${pricing.starter.monthly}/mo</p>
                      </div>
                    </th>
                    <th className="plan-col featured">
                      <div className="plan-header">
                        <h4>Professional</h4>
                        <p>${pricing.professional.monthly}/mo</p>
                      </div>
                    </th>
                    <th className="plan-col">
                      <div className="plan-header">
                        <h4>Scale</h4>
                        <p>${pricing.scale.monthly}/mo</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="category-row">
                    <td colSpan={4}>
                      <div className="category-title">
                        <Bot className="w-5 h-5" />
                        <span>AI Capabilities</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Monthly conversations</td>
                    <td>100</td>
                    <td className="featured">500</td>
                    <td>2,000</td>
                  </tr>
                  <tr>
                    <td>AI voice calling</td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Email & SMS</td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Live chat</td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Custom AI training</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Multi-language support</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  
                  <tr className="category-row">
                    <td colSpan={4}>
                      <div className="category-title">
                        <Users className="w-5 h-5" />
                        <span>Team & Collaboration</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>User seats</td>
                    <td>1</td>
                    <td className="featured">5</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>Team inbox</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Role-based permissions</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  
                  <tr className="category-row">
                    <td colSpan={4}>
                      <div className="category-title">
                        <BarChart3 className="w-5 h-5" />
                        <span>Analytics & Insights</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Basic analytics</td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Advanced reporting</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>A/B testing</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Custom dashboards</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  
                  <tr className="category-row">
                    <td colSpan={4}>
                      <div className="category-title">
                        <Globe className="w-5 h-5" />
                        <span>Integrations & API</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CRM integrations</td>
                    <td>1</td>
                    <td className="featured">Unlimited</td>
                    <td>Unlimited</td>
                  </tr>
                  <tr>
                    <td>API access</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Webhooks</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  
                  <tr className="category-row">
                    <td colSpan={4}>
                      <div className="category-title">
                        <Headphones className="w-5 h-5" />
                        <span>Support & Success</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Email support</td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Priority support</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><Check className="w-5 h-5 text-pink mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>Dedicated success manager</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                  <tr>
                    <td>SLA guarantee</td>
                    <td><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="featured"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td><Check className="w-5 h-5 text-pink mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section pricing-faq">
          <div className="faq-container">
            <div className="faq-header">
              <h2 className="faq-heading">
                Frequently Asked<br />
                <span className="text-pink">Questions</span>
              </h2>
            </div>
            
            <div className="faq-grid">
              <FAQItem 
                question="Can I change my plan anytime?"
                answer="Absolutely! You can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged a prorated amount for the remainder of your billing cycle. When you downgrade, we'll credit your account for future use."
                isOpen={openFaq === 0}
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              />
              <FAQItem 
                question="What happens after my 14-day free trial?"
                answer="At the end of your 14-day trial, you'll be automatically enrolled in your selected plan. You'll receive reminders before the trial ends, and you can cancel anytime during the trial period without any charges."
                isOpen={openFaq === 1}
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              />
              <FAQItem 
                question="Do you offer discounts for annual billing?"
                answer="Yes! When you choose annual billing, you get 2 months free. That's a 16.7% discount compared to monthly billing. Annual plans are paid upfront for the full year."
                isOpen={openFaq === 2}
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              />
              <FAQItem 
                question="What counts as a conversation?"
                answer="A conversation is any interaction between Mohit AI and a lead across any channel (voice, email, SMS, or chat). Multiple messages within a single engagement session count as one conversation."
                isOpen={openFaq === 3}
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              />
              <FAQItem 
                question="What happens if I exceed my conversation limit?"
                answer="We'll notify you when you reach 80% of your limit. If you exceed it, you can either upgrade your plan or purchase additional conversations at $0.50 per conversation. Your AI agent will never stop working unexpectedly."
                isOpen={openFaq === 4}
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
              />
              <FAQItem 
                question="Can I add more user seats to my plan?"
                answer="Yes! You can add additional user seats to any plan. Extra seats are $25/month per user on Starter and Professional plans. Scale plans can add unlimited users at no extra cost."
                isOpen={openFaq === 5}
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
              />
              <FAQItem 
                question="Is there a setup fee or long-term contract?"
                answer="No setup fees, no hidden costs, and no long-term contracts. Mohit AI is a month-to-month service (or annual if you choose). You can cancel anytime with just one click."
                isOpen={openFaq === 6}
                onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
              />
              <FAQItem 
                question="Do you offer a money-back guarantee?"
                answer="Yes! If you're not satisfied within your first 30 days as a paying customer, we'll give you a full refund. No questions asked. We're confident you'll love Mohit AI."
                isOpen={openFaq === 7}
                onClick={() => setOpenFaq(openFaq === 7 ? null : 7)}
              />
            </div>
          </div>
        </section>

        {/* CTA Section - Matching product page style */}
        <section className="cta-section">
          <div className="stats-container">
            <div className="cta-container">
              <div className="cta-content">
                <h2 className="cta-heading">
                  Start Your 14-Day Free Trial
                </h2>
                <p className="cta-description">
                  Join 500+ teams using Mohit AI to respond to every lead in 
                  under 60 seconds. No credit card required.
                </p>
              </div>
              
              <div className="cta-buttons">
                <Link href="/register" className="btn">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                </Link>
                <Link href="/demo" className="btn">
                  Watch 3-Min Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// FAQ Item Component - Matching product page
function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <div className={`faq-icon ${isOpen ? 'open' : ''}`}>
          <Plus className="w-5 h-5" />
        </div>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}