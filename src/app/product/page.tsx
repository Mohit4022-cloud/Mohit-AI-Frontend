"use client";

import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  Zap,
  Shield,
  Clock,
  BarChart3,
  Users,
  Bot,
  CheckCircle,
  Globe,
  Sparkles,
  Play,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";

export default function ProductPage() {
  return (
    <>

      {/* Fixed Navigation - Reused from main page */}
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
            <Link href="https://platform.mohit-ai.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Check out the platform
            </Link>
            <Link href="https://platform.mohit-ai.com" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main id="main">
        {/* Product Hero Section */}
        <section className="hero-section product-hero">
          <div className="hero-container">
            <div className="hero-content product-hero-content">
              <div className="product-badge">
                <Bot className="w-4 h-4" />
                <span>AI-Powered Sales Platform</span>
              </div>
              
              <h1 className="hero-heading">
                Your AI SDR That<br />
                <span className="text-pink">Never Sleeps</span>
              </h1>
              
              
              <div className="hero-buttons">
                <Link href="https://platform.mohit-ai.com" className="btn btn-secondary">
                  <span>See It In Action</span>
                  <Play className="w-5 h-5" />
                </Link>
                <Link href="https://platform.mohit-ai.com" className="btn btn-outline">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Product Demo Visual */}
            <div className="product-demo-visual">
              <div className="demo-screen">
                <div className="demo-header">
                  <div className="demo-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="demo-title">Mohit AI Dashboard</span>
                </div>
                <div className="demo-content">
                  <div className="demo-stats-row">
                    <div className="demo-stat">
                      <h4>Active Conversations</h4>
                      <div className="demo-stat-value">
                        <span className="stat-number">127</span>
                        <span className="stat-badge positive">+23%</span>
                      </div>
                    </div>
                    <div className="demo-stat">
                      <h4>Meetings Booked</h4>
                      <div className="demo-stat-value">
                        <span className="stat-number">48</span>
                        <span className="stat-badge positive">+15%</span>
                      </div>
                    </div>
                    <div className="demo-stat">
                      <h4>Response Time</h4>
                      <div className="demo-stat-value">
                        <span className="stat-number">0:47</span>
                        <span className="stat-unit">seconds</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="demo-conversation">
                    <div className="conversation-header">
                      <Bot className="w-5 h-5 text-pink" />
                      <span>AI Agent • Sarah Chen</span>
                      <span className="conversation-badge">Qualifying</span>
                    </div>
                    <div className="conversation-messages">
                      <div className="message ai">
                        Hi Sarah! I noticed you downloaded our ROI calculator. 
                        I&apos;d love to show you how other companies in SaaS are 
                        seeing 391% higher conversion rates.
                      </div>
                      <div className="message user">
                        That sounds interesting! We&apos;re struggling with lead 
                        response times right now.
                      </div>
                      <div className="message ai">
                        I hear that a lot. Most teams we work with were 
                        missing 40% of leads before Mohit AI. Would you 
                        be open to a quick 15-minute demo tomorrow at 2pm?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* How It Works Section */}
        <section className="features-section how-it-works">
          <div className="features-container">
            <div className="features-header">
              <div className="section-badge">
                <Zap className="w-4 h-4" />
                <span>How It Works</span>
              </div>
              <h2 className="features-heading">
                From Lead to Meeting in<br />
                <span className="text-pink">Three Simple Steps</span>
              </h2>
              <p className="features-description">
                Mohit AI seamlessly integrates with your existing workflow,
                qualifying and nurturing leads while your team focuses on closing deals.
              </p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card step-card">
                <div className="feature-icon">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Instant Response</h3>
                <p className="feature-description">
                  The moment a lead comes in - whether from your website, ads, 
                  or campaigns - Mohit AI responds within 60 seconds across 
                  their preferred channel.
                </p>
              </div>
              
              <div className="feature-card step-card">
                <div className="feature-icon">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Intelligent Qualification</h3>
                <p className="feature-description">
                  Our AI engages in natural conversations, asking the right 
                  questions to understand needs, budget, timeline, and 
                  decision-making process.
                </p>
              </div>
              
              <div className="feature-card step-card">
                <div className="feature-icon">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="feature-title">Seamless Handoff</h3>
                <p className="feature-description">
                  Qualified leads are automatically booked for meetings with 
                  your sales team, complete with conversation history and 
                  key insights.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Features Section */}
        <section className="trust-section core-features">
          <div className="features-container">
            <div className="features-header">
              <h2 className="features-heading">
                Everything You Need to<br />
                <span className="text-pink">Accelerate Sales</span>
              </h2>
            </div>
            
            <div className="features-two-column">
              <div className="feature-row">
                <div className="feature-content">
                  <div className="feature-icon-large">
                    <Phone className="h-10 w-10 text-pink" />
                  </div>
                  <h3 className="feature-title-large">AI Voice Calling</h3>
                  <p className="feature-description-large">
                    Natural-sounding AI that conducts full sales conversations, 
                    handles objections, and books meetings - indistinguishable 
                    from your best SDRs.
                  </p>
                  <ul className="feature-checklist">
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Human-like voice with perfect pitch and tone</span>
                    </li>
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Handles interruptions and complex questions</span>
                    </li>
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Automatic CRM logging and call recording</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-visual">
                  <div className="voice-wave-animation">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                </div>
              </div>
              
              <div className="feature-row reverse">
                <div className="feature-content">
                  <div className="feature-icon-large">
                    <Mail className="h-10 w-10 text-pink" />
                  </div>
                  <h3 className="feature-title-large">Intelligent Email & SMS</h3>
                  <p className="feature-description-large">
                    Personalized outreach that reads like it was written by 
                    your top performers, with perfect timing and follow-up 
                    sequences.
                  </p>
                  <ul className="feature-checklist">
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Company and prospect research built-in</span>
                    </li>
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Dynamic personalization at scale</span>
                    </li>
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Optimal send time prediction</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-visual">
                  <div className="email-preview">
                    <div className="email-header">
                      <div className="email-from">Mohit AI</div>
                      <div className="email-subject">Re: Your interest in automation</div>
                    </div>
                    <div className="email-body">
                      <p>Hi Sarah,</p>
                      <p>I noticed you&apos;re expanding your sales team at TechCorp...</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="feature-row">
                <div className="feature-content">
                  <div className="feature-icon-large">
                    <BarChart3 className="h-10 w-10 text-pink" />
                  </div>
                  <h3 className="feature-title-large">Real-Time Analytics</h3>
                  <p className="feature-description-large">
                    Complete visibility into every interaction, with insights 
                    that help you optimize your sales process and coach your 
                    human team.
                  </p>
                  <ul className="feature-checklist">
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Conversation analytics and sentiment scoring</span>
                    </li>
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Lead quality and conversion tracking</span>
                    </li>
                    <li>
                      <CheckCircle className="w-5 h-5 text-pink" />
                      <span>Team performance benchmarking</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-visual">
                  <div className="analytics-chart">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '45%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Integration Section */}
        <section className="stats-section integrations">
          <div className="stats-container">
            <div className="integration-header">
              <h2 className="features-heading">
                Works With Your<br />
                <span className="text-pink">Entire Tech Stack</span>
              </h2>
              <p className="features-description">
                Mohit AI integrates seamlessly with the tools you already use,
                creating a unified workflow that amplifies your team&apos;s productivity.
              </p>
            </div>
            
            <div className="integration-grid">
              <div className="integration-card">
                <div className="integration-logo">CRM</div>
                <p>Salesforce, HubSpot, Pipedrive</p>
              </div>
              <div className="integration-card">
                <div className="integration-logo">Email</div>
                <p>Gmail, Outlook, SendGrid</p>
              </div>
              <div className="integration-card">
                <div className="integration-logo">Calendar</div>
                <p>Google Calendar, Calendly, Outlook</p>
              </div>
              <div className="integration-card">
                <div className="integration-logo">Comms</div>
                <p>Slack, Teams, Discord</p>
              </div>
              <div className="integration-card">
                <div className="integration-logo">Phone</div>
                <p>Twilio, RingCentral, Aircall</p>
              </div>
              <div className="integration-card">
                <div className="integration-logo">Analytics</div>
                <p>Google Analytics, Segment, Mixpanel</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Preview Section */}
        <section className="features-section pricing-preview">
          <div className="features-container">
            <div className="features-header">
              <h2 className="features-heading">
                Pricing That Makes<br />
                <span className="text-pink">Perfect Sense</span>
              </h2>
              <p className="features-description">
                Start with our Starter plan at just $75/month. No setup fees,
                no hidden costs, and you can cancel anytime.
              </p>
            </div>
            
            <div className="pricing-comparison-card">
              <div className="comparison-header">
                <h3>Traditional SDR vs Mohit AI</h3>
              </div>
              <div className="comparison-grid">
                <div className="comparison-column">
                  <h4>Traditional SDR</h4>
                  <div className="comparison-cost">$5,417/mo</div>
                  <ul className="comparison-list">
                    <li className="negative">
                      <Minus className="w-4 h-4" />
                      <span>40 hour work week</span>
                    </li>
                    <li className="negative">
                      <Minus className="w-4 h-4" />
                      <span>2-3 weeks ramp time</span>
                    </li>
                    <li className="negative">
                      <Minus className="w-4 h-4" />
                      <span>50-100 calls per day</span>
                    </li>
                    <li className="negative">
                      <Minus className="w-4 h-4" />
                      <span>Single channel focus</span>
                    </li>
                  </ul>
                </div>
                <div className="comparison-column highlight">
                  <h4>Mohit AI</h4>
                  <div className="comparison-cost">$75/mo</div>
                  <ul className="comparison-list">
                    <li className="positive">
                      <Plus className="w-4 h-4" />
                      <span>24/7 availability</span>
                    </li>
                    <li className="positive">
                      <Plus className="w-4 h-4" />
                      <span>Instant deployment</span>
                    </li>
                    <li className="positive">
                      <Plus className="w-4 h-4" />
                      <span>1000+ interactions daily</span>
                    </li>
                    <li className="positive">
                      <Plus className="w-4 h-4" />
                      <span>Omnichannel engagement</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Link href="/pricing" className="btn btn-secondary comparison-cta">
                <span>View All Pricing Options</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="trust-section faq-section">
          <div className="features-container">
            <div className="features-header">
              <h2 className="features-heading">
                Frequently Asked<br />
                <span className="text-pink">Questions</span>
              </h2>
            </div>
            
            <div className="faq-container">
              <FAQItem 
                question="How quickly can I get started with Mohit AI?"
                answer="You can be up and running in less than 10 minutes. Simply connect your CRM, customize your AI agent's personality and scripts, and start receiving leads. No technical expertise required."
              />
              <FAQItem 
                question="Will leads know they're talking to an AI?"
                answer="Our AI is designed to be indistinguishable from human SDRs. It uses natural language, handles interruptions smoothly, and even adds appropriate pauses and verbal fillers. Most leads never realize they're speaking with AI."
              />
              <FAQItem 
                question="Can I customize the AI's approach and messaging?"
                answer="Absolutely! You have full control over scripts, qualification criteria, objection handling, and even the AI's personality. Update messaging in real-time based on what's working."
              />
              <FAQItem 
                question="What happens when a lead wants to speak to a human?"
                answer="The AI seamlessly transfers qualified leads to your human team with full context. Your reps receive a complete summary of the conversation, key insights, and suggested next steps."
              />
              <FAQItem 
                question="How does Mohit AI integrate with my existing tools?"
                answer="We offer native integrations with all major CRMs, calendaring tools, and communication platforms. Our API also allows for custom integrations. Most customers are fully integrated within 30 minutes."
              />
              <FAQItem 
                question="Is my data secure with Mohit AI?"
                answer="Security is our top priority. We're SOC 2 Type II certified, use bank-level encryption, and never train our models on your data. All conversations are encrypted and stored in compliance with GDPR and CCPA."
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section - Matching main page style */}
        <section className="cta-section">
          <div className="stats-container">
            <div className="cta-container">
              <div className="cta-content">
                <h2 className="cta-heading">
                  Ready to <span className="text-pink">10x Your Sales?</span>
                </h2>
                <p className="cta-description">
                  Join 500+ teams using Mohit AI to respond to every lead in 
                  under 60 seconds. Start your free trial today.
                </p>
              </div>
              
              <div className="cta-buttons">
                <Link href="https://platform.mohit-ai.com" className="btn">
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </Link>
                <Link href="https://platform.mohit-ai.com" className="btn">
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
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
