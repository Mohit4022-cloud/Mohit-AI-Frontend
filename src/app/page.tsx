import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Ultra Hero Section */}
      <section className="ultra-container">
        <div className="ultra-spacer-5xl" />
        
        <div className="text-center">
          <h1 className="ultra-heading-1" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
            Never Miss<br />
            <span className="text-accent">Another Lead</span>
          </h1>
          
          <div className="ultra-spacer-xl" />
          
          <p className="text-2xl opacity-60 max-w-3xl mx-auto leading-relaxed">
            Respond to every lead in under 60 seconds with AI that works
            across voice, chat, email, and SMS—all for the price of lunch.
          </p>
          
          <div className="ultra-spacer-2xl" />
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/register">
              <button className="ultra-button ultra-button-accent scan-effect">
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            <Link href="/demo">
              <button className="ultra-button ultra-button-primary">
                <Play className="w-5 h-5 mr-2" />
                <span>Watch Demo</span>
              </button>
            </Link>
          </div>
        </div>
        
        <div className="ultra-spacer-5xl" />
        
        {/* Ultra Stats Grid */}
        <div className="ultra-grid ultra-grid-3 max-w-5xl mx-auto">
          <div className="glass-card glass-card-accent text-center scan-effect">
            <div className="ultra-icon-box ultra-icon-box-accent mx-auto">
              <Clock className="h-8 w-8" />
            </div>
            <div className="ultra-number text-accent">47</div>
            <h3 className="text-lg font-bold">Second</h3>
            <p className="text-sm opacity-60">Response Time</p>
          </div>
          
          <div className="glass-card text-center scan-effect" style={{ animationDelay: "0.1s" }}>
            <div className="ultra-icon-box ultra-icon-box-black mx-auto">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div className="ultra-number">391%</div>
            <h3 className="text-lg font-bold">Higher</h3>
            <p className="text-sm opacity-60">Conversion Rate</p>
          </div>
          
          <div className="glass-card text-center scan-effect" style={{ animationDelay: "0.2s" }}>
            <div className="ultra-icon-box ultra-icon-box-black mx-auto">
              <Target className="h-8 w-8" />
            </div>
            <div className="ultra-number">21×</div>
            <h3 className="text-lg font-bold">More Qualified</h3>
            <p className="text-sm opacity-60">Leads Generated</p>
          </div>
        </div>
      </section>
      
      <div className="ultra-spacer-5xl" />
      <div className="ultra-divider" />
      <div className="ultra-spacer-5xl" />
      
      {/* Trust Section */}
      <section className="ultra-container text-center">
        <h2 className="ultra-heading-1">
          <span className="text-accent">500+</span> Sales Teams<br />
          Trust Mohit AI
        </h2>
        
        <div className="ultra-spacer-3xl" />
        
        <div className="ultra-grid ultra-grid-3 max-w-6xl mx-auto">
          <div className="glass-card p-16 text-center">
            <div className="ultra-number text-accent">10-15</div>
            <p className="text-xl font-semibold mt-4">Hot Leads Daily</p>
          </div>
          
          <div className="glass-card p-16 text-center">
            <div className="ultra-number">3x</div>
            <p className="text-xl font-semibold mt-4">More Meetings</p>
          </div>
          
          <div className="glass-card p-16 text-center">
            <div className="ultra-number">80%</div>
            <p className="text-xl font-semibold mt-4">Less Cold Calling</p>
          </div>
        </div>
        
        <div className="ultra-spacer-3xl" />
        
        <div className="flex flex-wrap gap-8 justify-center">
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
      </section>
      
      <div className="ultra-spacer-5xl" />
      <div className="ultra-divider ultra-divider-accent" />
      <div className="ultra-spacer-5xl" />
      
      {/* Features Section */}
      <section className="ultra-container">
        <div className="text-center">
          <h2 className="ultra-heading-2">
            Your AI SDR&apos;s<br />
            <span className="text-accent">Complete Toolkit</span>
          </h2>
          
          <div className="ultra-spacer-lg" />
          
          <p className="text-xl opacity-60 max-w-3xl mx-auto">
            Mohit AI handles all aspects of prospecting and outreach,
            delivering only qualified, interested leads to your human SDRs.
          </p>
        </div>
        
        <div className="ultra-spacer-3xl" />
        
        <div className="ultra-grid ultra-grid-3">
          <div className="glass-card glass-card-accent scan-effect">
            <div className="ultra-icon-box ultra-icon-box-accent">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="ultra-heading-3">AI Voice Calling</h3>
            <p className="text-lg opacity-70 leading-relaxed">
              Your AI SDR makes hundreds of personalized calls daily using
              natural voice AI, qualifies interest, and books meetings
              automatically.
            </p>
          </div>
          
          <div className="glass-card scan-effect" style={{ animationDelay: "0.1s" }}>
            <div className="ultra-icon-box ultra-icon-box-black">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="ultra-heading-3">Intelligent Email</h3>
            <p className="text-lg opacity-70 leading-relaxed">
              AI writes and sends personalized emails based on prospect
              research, company news, and buying signals. Follows up
              automatically.
            </p>
          </div>
          
          <div className="glass-card scan-effect" style={{ animationDelay: "0.2s" }}>
            <div className="ultra-icon-box ultra-icon-box-black">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="ultra-heading-3">Multi-Channel</h3>
            <p className="text-lg opacity-70 leading-relaxed">
              Seamlessly engage prospects across email, LinkedIn, SMS, and
              phone calls. Maintains consistent messaging while adapting to
              preferences.
            </p>
          </div>
        </div>
      </section>
      
      <div className="ultra-spacer-5xl" />
      <div className="ultra-divider" />
      <div className="ultra-spacer-5xl" />
      
      {/* Testimonials */}
      <section className="ultra-container">
        <div className="text-center">
          <h2 className="ultra-heading-2">
            What Our <span className="text-accent">Customers Say</span>
          </h2>
        </div>
        
        <div className="ultra-spacer-3xl" />
        
        <div className="ultra-grid ultra-grid-3">
          <div className="glass-card">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-accent-pink fill-current"
                />
              ))}
            </div>
            <p className="text-lg leading-relaxed mb-8">
              &ldquo;We went from missing 40% of our inbound leads to
              capturing every single one. Mohit AI paid for itself in the
              first week.&rdquo;
            </p>
            <div className="ultra-divider" />
            <div className="mt-6">
              <p className="font-bold text-lg">Sarah Chen</p>
              <p className="text-sm opacity-60">VP Sales at TechFlow</p>
            </div>
          </div>
          
          <div className="glass-card">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-accent-pink fill-current"
                />
              ))}
            </div>
            <p className="text-lg leading-relaxed mb-8">
              &ldquo;$75/month for an AI that books more meetings than our
              $65k/year SDR? We&apos;re saving $5,000/month and converting 3x more.&rdquo;
            </p>
            <div className="ultra-divider" />
            <div className="mt-6">
              <p className="font-bold text-lg">Marcus Johnson</p>
              <p className="text-sm opacity-60">Founder at GrowthLab</p>
            </div>
          </div>
          
          <div className="glass-card">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-accent-pink fill-current"
                />
              ))}
            </div>
            <p className="text-lg leading-relaxed mb-8">
              &ldquo;Finally, an AI that actually works across all channels.
              Our leads come from everywhere. Mohit AI handles them all.&rdquo;
            </p>
            <div className="ultra-divider" />
            <div className="mt-6">
              <p className="font-bold text-lg">Jennifer Park</p>
              <p className="text-sm opacity-60">RevOps at CloudFirst</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="ultra-spacer-5xl" />
      
      {/* CTA Section */}
      <section className="ultra-container">
        <div className="glass-card glass-card-accent p-20 text-center">
          <h2 className="ultra-heading-2">
            Never Miss <span className="text-accent">Another Lead</span>
          </h2>
          
          <div className="ultra-spacer-lg" />
          
          <p className="text-xl opacity-70 max-w-3xl mx-auto">
            Join 500+ teams responding to every lead in under 60 seconds. 
            Start your free trial and see results today.
          </p>
          
          <div className="ultra-spacer-2xl" />
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/register">
              <button className="ultra-button ultra-button-accent scan-effect">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
            </Link>
            <Link href="/pricing">
              <button className="ultra-button ultra-button-primary">
                View Pricing
              </button>
            </Link>
          </div>
          
          <div className="ultra-spacer-xl" />
          
          <p className="text-sm opacity-60">
            ✓ No credit card required &nbsp;&nbsp;✓ Setup in 5 minutes &nbsp;&nbsp;✓ Cancel anytime
          </p>
        </div>
      </section>
      
      <div className="ultra-spacer-5xl" />
    </PublicLayout>
  );
}