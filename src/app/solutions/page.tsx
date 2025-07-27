"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ShoppingCart,
  Heart,
  GraduationCap,
  BriefcaseBusiness,
  Smartphone,
  Users,
  Sparkles,
  ChevronDown,
  Plus,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Globe,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Bot,
  Rocket,
} from "lucide-react";
import { useState } from "react";

export default function SolutionsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("saas");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const industries = [
    {
      id: "saas",
      name: "SaaS & Technology",
      icon: Smartphone,
      color: "pink",
      description: "Accelerate your sales cycle and improve conversion rates",
      stats: {
        conversion: "+391%",
        responseTime: "47 sec",
        meetings: "3x more",
      },
      features: [
        "Instant response to demo requests",
        "Technical qualification questions",
        "Multi-touch nurture campaigns",
        "Integration with your tech stack",
      ],
      testimonial: {
        quote: "Mohit AI helped us achieve a 391% increase in conversion rates. Our SDRs now focus on closing deals instead of chasing leads.",
        author: "Sarah Chen",
        role: "VP Sales at TechFlow",
      },
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      icon: ShoppingCart,
      color: "purple",
      description: "Convert browsers into buyers with personalized engagement",
      stats: {
        cartRecovery: "67%",
        aov: "+$47",
        customerLifetime: "2.3x",
      },
      features: [
        "Abandoned cart recovery",
        "Product recommendations",
        "Order status updates",
        "VIP customer handling",
      ],
      testimonial: {
        quote: "Our abandoned cart recovery rate jumped from 18% to 67%. Mohit AI pays for itself every single day.",
        author: "Marcus Rodriguez",
        role: "CEO at StyleHub",
      },
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: Heart,
      color: "red",
      description: "Improve patient experience while reducing administrative burden",
      stats: {
        appointments: "+45%",
        noShows: "-62%",
        satisfaction: "4.8/5",
      },
      features: [
        "Appointment scheduling",
        "Insurance verification",
        "Follow-up reminders",
        "HIPAA compliant",
      ],
      testimonial: {
        quote: "We've reduced no-shows by 62% and our staff saves 20 hours per week on phone calls.",
        author: "Dr. Emily Watson",
        role: "Practice Manager",
      },
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      color: "blue",
      description: "Engage prospective students and boost enrollment rates",
      stats: {
        enrollment: "+38%",
        responseTime: "2 min",
        satisfaction: "94%",
      },
      features: [
        "Student inquiry handling",
        "Campus tour scheduling",
        "Financial aid guidance",
        "Parent communication",
      ],
      testimonial: {
        quote: "Enrollment is up 38% since implementing Mohit AI. We never miss a prospective student inquiry.",
        author: "James Mitchell",
        role: "Director of Admissions",
      },
    },
    {
      id: "realestate",
      name: "Real Estate",
      icon: Building2,
      color: "green",
      description: "Capture and qualify property leads around the clock",
      stats: {
        leads: "+156%",
        showings: "2.8x",
        closingRate: "+41%",
      },
      features: [
        "Property inquiry response",
        "Showing scheduling",
        "Mortgage pre-qualification",
        "Neighborhood information",
      ],
      testimonial: {
        quote: "We're booking 2.8x more showings and our agents love having pre-qualified leads delivered to them.",
        author: "Lisa Thompson",
        role: "Broker at Premier Realty",
      },
    },
    {
      id: "professional",
      name: "Professional Services",
      icon: BriefcaseBusiness,
      color: "indigo",
      description: "Streamline client acquisition and consultation booking",
      stats: {
        consultations: "+72%",
        clientValue: "+$2.3k",
        retention: "91%",
      },
      features: [
        "Consultation scheduling",
        "Service matching",
        "Budget qualification",
        "Follow-up sequences",
      ],
      testimonial: {
        quote: "Our consultation bookings are up 72% and average client value has increased by $2,300.",
        author: "Robert Chang",
        role: "Managing Partner",
      },
    },
  ];

  const selectedIndustryData = industries.find((i) => i.id === selectedIndustry)!;

  return (
    <>

      {/* Fixed Navigation - Reused from other pages */}
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
        {/* Solutions Hero Section */}
        <section className="hero-section solutions-hero">
          <div className="hero-container">
            <div className="solutions-hero-content">
              <div className="section-badge">
                <Target className="w-4 h-4" />
                <span>Industry Solutions</span>
              </div>
              
              <h1 className="hero-heading">
                AI That Speaks<br />
                <span className="text-pink">Your Industry&apos;s Language</span>
              </h1>
              
              <p className="hero-description">
                Mohit AI adapts to your specific industry needs, delivering
                specialized engagement that converts. See how we&apos;re transforming
                sales across every sector.
              </p>
              
              <div className="hero-buttons">
                <Link href="/demo" className="btn btn-secondary">
                  <span>See Your Industry Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/register" className="btn btn-outline">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Selector Section */}
        <section className="solutions-selector-section">
          <div className="solutions-container">
            <div className="industry-selector">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <button
                    key={industry.id}
                    className={`industry-tab ${
                      selectedIndustry === industry.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedIndustry(industry.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{industry.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Selected Industry Detail Section */}
        <section className="industry-detail-section">
          <div className="solutions-container">
            <div className="industry-detail-grid">
              <div className="industry-content">
                <div className={`industry-icon-large ${selectedIndustryData.color}`}>
                  <selectedIndustryData.icon className="h-12 w-12" />
                </div>
                
                <h2 className="industry-heading">
                  {selectedIndustryData.name}
                </h2>
                
                <p className="industry-description">
                  {selectedIndustryData.description}
                </p>
                
                <div className="industry-stats">
                  {Object.entries(selectedIndustryData.stats).map(([key, value]) => (
                    <div key={key} className="industry-stat">
                      <div className="stat-value">{value}</div>
                      <div className="stat-label">
                        {key === "conversion" && "Conversion Rate"}
                        {key === "responseTime" && "Avg Response"}
                        {key === "meetings" && "Meetings Booked"}
                        {key === "cartRecovery" && "Cart Recovery"}
                        {key === "aov" && "Average Order"}
                        {key === "customerLifetime" && "Customer LTV"}
                        {key === "appointments" && "Appointments"}
                        {key === "noShows" && "No-Show Rate"}
                        {key === "satisfaction" && "Satisfaction"}
                        {key === "enrollment" && "Enrollment Rate"}
                        {key === "leads" && "Lead Growth"}
                        {key === "showings" && "More Showings"}
                        {key === "closingRate" && "Closing Rate"}
                        {key === "consultations" && "Consultations"}
                        {key === "clientValue" && "Avg Client Value"}
                        {key === "retention" && "Retention Rate"}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="industry-features">
                  <h3 className="features-heading">Key Features</h3>
                  <ul className="features-list">
                    {selectedIndustryData.features.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle className="w-5 h-5 text-pink" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="industry-cta">
                  <Link href="/register" className="btn btn-primary">
                    <span>Start Your Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href={`/demo?industry=${selectedIndustry}`} className="btn btn-outline">
                    <span>Watch Industry Demo</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              
              <div className="industry-testimonial-card">
                <div className="testimonial-quote">
                  <Sparkles className="w-8 h-8 text-pink mb-4" />
                  <p>{selectedIndustryData.testimonial.quote}</p>
                </div>
                <div className="testimonial-author">
                  <p className="author-name">{selectedIndustryData.testimonial.author}</p>
                  <p className="author-role">{selectedIndustryData.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="use-cases-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                Solutions for Every<br />
                <span className="text-pink">Sales Challenge</span>
              </h2>
              <p className="section-description">
                Whether you&apos;re a solo founder or enterprise team, Mohit AI scales
                with your needs and delivers consistent results.
              </p>
            </div>
            
            <div className="use-cases-grid">
              <Link href="/solutions/for-sdrs" className="use-case-card">
                <div className="use-case-icon">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="use-case-title">For SDRs</h3>
                <p className="use-case-description">
                  Amplify your outreach and focus on high-value activities
                  while AI handles the repetitive tasks.
                </p>
                <div className="use-case-benefits">
                  <div className="benefit-item">
                    <Zap className="w-4 h-4 text-pink" />
                    <span>10x more touchpoints</span>
                  </div>
                  <div className="benefit-item">
                    <Clock className="w-4 h-4 text-pink" />
                    <span>Save 4+ hours daily</span>
                  </div>
                  <div className="benefit-item">
                    <TrendingUp className="w-4 h-4 text-pink" />
                    <span>3x pipeline growth</span>
                  </div>
                </div>
                <div className="use-case-cta">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
              
              <Link href="/solutions/for-managers" className="use-case-card">
                <div className="use-case-icon">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="use-case-title">For Sales Managers</h3>
                <p className="use-case-description">
                  Get complete visibility into your pipeline and optimize
                  team performance with AI-powered insights.
                </p>
                <div className="use-case-benefits">
                  <div className="benefit-item">
                    <Target className="w-4 h-4 text-pink" />
                    <span>Real-time analytics</span>
                  </div>
                  <div className="benefit-item">
                    <Users className="w-4 h-4 text-pink" />
                    <span>Team coaching insights</span>
                  </div>
                  <div className="benefit-item">
                    <Shield className="w-4 h-4 text-pink" />
                    <span>Quality assurance</span>
                  </div>
                </div>
                <div className="use-case-cta">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
              
              <Link href="/solutions/enterprise" className="use-case-card featured">
                <div className="use-case-badge">
                  <Rocket className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
                <div className="use-case-icon">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="use-case-title">Enterprise</h3>
                <p className="use-case-description">
                  Scale your sales operations with enterprise-grade security,
                  custom integrations, and dedicated support.
                </p>
                <div className="use-case-benefits">
                  <div className="benefit-item">
                    <Globe className="w-4 h-4 text-pink" />
                    <span>Global deployment</span>
                  </div>
                  <div className="benefit-item">
                    <Shield className="w-4 h-4 text-pink" />
                    <span>SOC 2 certified</span>
                  </div>
                  <div className="benefit-item">
                    <Bot className="w-4 h-4 text-pink" />
                    <span>Custom AI training</span>
                  </div>
                </div>
                <div className="use-case-cta">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
              
              <Link href="/solutions/small-business" className="use-case-card">
                <div className="use-case-icon">
                  <Smartphone className="h-8 w-8" />
                </div>
                <h3 className="use-case-title">Small Business</h3>
                <p className="use-case-description">
                  Get enterprise-level sales capabilities at a price that
                  makes sense for growing businesses.
                </p>
                <div className="use-case-benefits">
                  <div className="benefit-item">
                    <Clock className="w-4 h-4 text-pink" />
                    <span>Setup in minutes</span>
                  </div>
                  <div className="benefit-item">
                    <MessageSquare className="w-4 h-4 text-pink" />
                    <span>All channels included</span>
                  </div>
                  <div className="benefit-item">
                    <Calendar className="w-4 h-4 text-pink" />
                    <span>No contracts</span>
                  </div>
                </div>
                <div className="use-case-cta">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Integration Showcase Section */}
        <section className="integration-showcase-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                Works With Your<br />
                <span className="text-pink">Entire Tech Stack</span>
              </h2>
              <p className="section-description">
                Mohit AI integrates seamlessly with the tools you already use,
                creating a unified workflow that amplifies your team&apos;s productivity.
              </p>
            </div>
            
            <div className="integration-categories">
              <div className="integration-category">
                <h3 className="category-title">
                  <Phone className="w-5 h-5" />
                  <span>Communication</span>
                </h3>
                <div className="integration-logos">
                  <div className="integration-logo">Twilio</div>
                  <div className="integration-logo">RingCentral</div>
                  <div className="integration-logo">Aircall</div>
                  <div className="integration-logo">Zoom</div>
                </div>
              </div>
              
              <div className="integration-category">
                <h3 className="category-title">
                  <Mail className="w-5 h-5" />
                  <span>Email & Calendar</span>
                </h3>
                <div className="integration-logos">
                  <div className="integration-logo">Gmail</div>
                  <div className="integration-logo">Outlook</div>
                  <div className="integration-logo">Calendly</div>
                  <div className="integration-logo">SendGrid</div>
                </div>
              </div>
              
              <div className="integration-category">
                <h3 className="category-title">
                  <Users className="w-5 h-5" />
                  <span>CRM & Sales</span>
                </h3>
                <div className="integration-logos">
                  <div className="integration-logo">Salesforce</div>
                  <div className="integration-logo">HubSpot</div>
                  <div className="integration-logo">Pipedrive</div>
                  <div className="integration-logo">Close</div>
                </div>
              </div>
              
              <div className="integration-category">
                <h3 className="category-title">
                  <MessageSquare className="w-5 h-5" />
                  <span>Team Collaboration</span>
                </h3>
                <div className="integration-logos">
                  <div className="integration-logo">Slack</div>
                  <div className="integration-logo">Teams</div>
                  <div className="integration-logo">Discord</div>
                  <div className="integration-logo">Notion</div>
                </div>
              </div>
            </div>
            
            <div className="integration-cta">
              <p className="integration-note">
                Don&apos;t see your tool? We support 100+ integrations and can build custom connections.
              </p>
              <Link href="/integrations" className="btn btn-outline">
                <span>View All Integrations</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ROI Calculator Preview */}
        <section className="roi-section">
          <div className="solutions-container">
            <div className="roi-card">
              <div className="roi-content">
                <h2 className="roi-heading">
                  Calculate Your ROI with<br />
                  <span className="text-pink">Mohit AI</span>
                </h2>
                <p className="roi-description">
                  See exactly how much time and money you&apos;ll save by automating
                  your lead response and qualification process.
                </p>
                
                <div className="roi-preview">
                  <div className="roi-stat">
                    <div className="roi-value">$5,342</div>
                    <div className="roi-label">Monthly Savings</div>
                  </div>
                  <div className="roi-stat">
                    <div className="roi-value">156 hrs</div>
                    <div className="roi-label">Time Saved</div>
                  </div>
                  <div className="roi-stat">
                    <div className="roi-value">72x</div>
                    <div className="roi-label">ROI</div>
                  </div>
                </div>
                
                <Link href="/roi-calculator" className="btn btn-secondary">
                  <span>Calculate Your ROI</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="success-stories-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                Success Stories Across<br />
                <span className="text-pink">Every Industry</span>
              </h2>
            </div>
            
            <div className="stories-grid">
              <div className="story-card">
                <div className="story-metric">
                  <div className="metric-value">391%</div>
                  <div className="metric-label">Higher Conversion</div>
                </div>
                <div className="story-content">
                  <div className="story-logo">TechFlow</div>
                  <p className="story-description">
                    &quot;We went from a 2.3% to 9% conversion rate in just 30 days.
                    Mohit AI responds to every lead instantly.&quot;
                  </p>
                  <Link href="/case-studies/techflow" className="story-link">
                    Read Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="story-card">
                <div className="story-metric">
                  <div className="metric-value">$2.4M</div>
                  <div className="metric-label">Pipeline Generated</div>
                </div>
                <div className="story-content">
                  <div className="story-logo">CloudFirst</div>
                  <p className="story-description">
                    &quot;In 6 months, we generated $2.4M in qualified pipeline
                    with Mohit AI handling first-touch engagement.&quot;
                  </p>
                  <Link href="/case-studies/cloudfirst" className="story-link">
                    Read Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="story-card">
                <div className="story-metric">
                  <div className="metric-value">67%</div>
                  <div className="metric-label">Cart Recovery</div>
                </div>
                <div className="story-content">
                  <div className="story-logo">StyleHub</div>
                  <p className="story-description">
                    &quot;Our abandoned cart recovery went from 18% to 67%.
                    The ROI is absolutely incredible.&quot;
                  </p>
                  <Link href="/case-studies/stylehub" className="story-link">
                    Read Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section solutions-faq">
          <div className="faq-container">
            <div className="faq-header">
              <h2 className="faq-heading">
                Frequently Asked<br />
                <span className="text-pink">Questions</span>
              </h2>
            </div>
            
            <div className="faq-grid">
              <FAQItem 
                question="How does Mohit AI adapt to my specific industry?"
                answer="Mohit AI comes pre-trained with industry-specific knowledge and can be further customized with your unique sales scripts, qualification criteria, and compliance requirements. Our AI learns from every interaction to continuously improve its performance for your specific use case."
                isOpen={openFaq === 0}
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              />
              <FAQItem 
                question="Can I customize the AI for multiple brands or product lines?"
                answer="Absolutely! You can create multiple AI agents, each with their own personality, scripts, and qualification criteria. This is perfect for businesses with multiple brands, product lines, or target markets."
                isOpen={openFaq === 1}
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              />
              <FAQItem 
                question="How quickly can I see results in my industry?"
                answer="Most customers see immediate impact within the first week. Response times drop to under 60 seconds, and conversion rates typically increase by 2-3x within the first 30 days. Industry-specific results vary, but improvement is consistent across all sectors."
                isOpen={openFaq === 2}
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              />
              <FAQItem 
                question="Does Mohit AI comply with industry regulations?"
                answer="Yes! Mohit AI is built with compliance in mind. We&apos;re SOC 2 Type II certified, GDPR compliant, and can be configured to meet industry-specific regulations like HIPAA for healthcare or TCPA for telecommunications."
                isOpen={openFaq === 3}
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              />
              <FAQItem 
                question="What if my industry requires specialized knowledge?"
                answer="Our Professional Services team works with you to train Mohit AI on your specific products, services, and industry terminology. We can import your knowledge base, FAQs, and sales materials to ensure accurate responses."
                isOpen={openFaq === 4}
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
              />
              <FAQItem 
                question="Can Mohit AI handle complex B2B sales cycles?"
                answer="Yes! Mohit AI excels at complex B2B sales. It can handle multi-stakeholder engagement, long sales cycles, technical qualification, and sophisticated nurture sequences. Our enterprise customers use it for deals ranging from $10K to $1M+."
                isOpen={openFaq === 5}
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
              />
            </div>
          </div>
        </section>

        {/* CTA Section - Matching other pages */}
        <section className="cta-section">
          <div className="stats-container">
            <div className="cta-container">
              <div className="cta-content">
                <h2 className="cta-heading">
                  Ready to Transform Your Sales?
                </h2>
                <p className="cta-description">
                  Join 500+ teams across every industry using Mohit AI to 
                  accelerate their sales. Start your free trial today.
                </p>
              </div>
              
              <div className="cta-buttons">
                <Link href="/register" className="btn">
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </Link>
                <Link href="/demo" className="btn">
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

// FAQ Item Component - Matching other pages
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
