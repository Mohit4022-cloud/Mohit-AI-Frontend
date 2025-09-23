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
} from "lucide-react";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title:
    "Mohit AI - Never Miss Another Inbound Lead | Respond in Under 60 Seconds",
  description:
    "Mohit AI - Never Miss Another Inbound Lead | Respond in Under 60 Seconds",
};

export default function HomePageFixed() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="layout-container">
          <div className="hero-content">
            <h1 className="heading-hero text-balance">
              Never Miss<br />
              <span className="text-accent">Another Lead</span>
            </h1>
            
            <p className="text-lead hero-subtitle">
              Respond to every lead in under 60 seconds with AI that works
              across voice, chat, email, and SMS—all for the price of lunch.
            </p>
            
            <div className="hero-buttons">
              <Link href="https://platform.mohit-ai.com" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/demo" className="btn btn-primary">
                <Play className="w-5 h-5 mr-2" />
                <span>Watch Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="layout-section">
        <div className="layout-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <div className="stat-value text-accent">47</div>
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
      <section className="layout-section text-center">
        <div className="layout-container">
          <h2 className="heading-section text-balance">
            <span className="text-accent">500+</span> Sales Teams<br />
            Trust Mohit AI
          </h2>
          
          <div className="stats-grid" style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="stat-card">
              <div className="stat-value text-accent">10-15</div>
              <p className="stat-label">Hot Leads Daily</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">3x</div>
              <p className="stat-label">More Meetings</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">80%</div>
              <p className="stat-label">Less Cold Calling</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center" style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="ultra-badge ultra-badge-accent">
              <Shield className="h-4 w-4 mr-2" />
              SOC 2 Type II Certified
            </div>
            <div className="ultra-badge">
              <Zap className="h-4 w-4 mr-2" />
              99.9% Uptime SLA
            </div>
            <div className="ultra-badge">
              <Lock className="h-4 w-4 mr-2" />
              Bank-Level Encryption
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="layout-section">
        <div className="layout-container">
          <div className="text-center">
            <h2 className="heading-section text-balance">
              Your AI SDR&apos;s<br />
              <span className="text-accent">Complete Toolkit</span>
            </h2>
            
            <p className="text-lead" style={{ marginTop: 'var(--space-xl)', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
              Mohit AI handles all aspects of prospecting and outreach,
              delivering only qualified, interested leads to your human SDRs.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'var(--color-primary-pink)' }}>
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
      <section className="layout-section">
        <div className="layout-container">
          <div className="text-center">
            <h2 className="heading-section">
              What Our <span className="text-accent">Customers Say</span>
            </h2>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-accent fill-current"
                  />
                ))}
              </div>
              <p className="testimonial-quote">
                &ldquo;We went from missing 40% of our inbound leads to
                capturing every single one. Mohit AI paid for itself in the
                first week.&rdquo;
              </p>
              <div className="testimonial-divider" />
              <div>
                <p className="testimonial-author">Sarah Chen</p>
                <p className="testimonial-company">VP Sales at TechFlow</p>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-accent fill-current"
                  />
                ))}
              </div>
              <p className="testimonial-quote">
                &ldquo;$75/month for an AI that books more meetings than our
                $65k/year SDR? We&apos;re saving $5,000/month and converting 3x more.&rdquo;
              </p>
              <div className="testimonial-divider" />
              <div>
                <p className="testimonial-author">Marcus Johnson</p>
                <p className="testimonial-company">Founder at GrowthLab</p>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-accent fill-current"
                  />
                ))}
              </div>
              <p className="testimonial-quote">
                &ldquo;Finally, an AI that actually works across all channels.
                Our leads come from everywhere. Mohit AI handles them all.&rdquo;
              </p>
              <div className="testimonial-divider" />
              <div>
                <p className="testimonial-author">Jennifer Park</p>
                <p className="testimonial-company">RevOps at CloudFirst</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="layout-section">
        <div className="layout-container">
          <div className="glass-card glass-card-accent" style={{ padding: 'var(--space-4xl)', textAlign: 'center' }}>
            <h2 className="heading-section">
              Never Miss <span className="text-accent">Another Lead</span>
            </h2>
            
            <p className="text-lead" style={{ marginTop: 'var(--space-xl)', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
              Join 500+ teams responding to every lead in under 60 seconds. 
              Start your free trial and see results today.
            </p>
            
            <div className="hero-buttons" style={{ marginTop: 'var(--space-2xl)' }}>
              <Link href="https://platform.mohit-ai.com" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
              </Link>
              <Link href="/pricing" className="btn btn-primary">
                View Pricing
              </Link>
            </div>
            
            <p className="text-body" style={{ marginTop: 'var(--space-xl)', opacity: 0.7 }}>
              ✓ No credit card required &nbsp;&nbsp;✓ Setup in 5 minutes &nbsp;&nbsp;✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}