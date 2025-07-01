"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  ArrowUpRight,
  Layers,
  Activity,
} from "lucide-react";

export default function PremiumHomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Animated background */}
      <div className="gradient-background" />
      <div 
        className="mesh-gradient" 
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Floating shapes */}
      <div className="floating-shape shape-1" />
      <div className="floating-shape shape-2" />

      {/* Premium Navigation */}
      <nav className={`nav-premium ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-premium-inner">
          <Link href="/" className="nav-brand-modern">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span className="gradient-text font-bold text-xl">Mohit AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/product" className="nav-link-modern">
              Product
            </Link>
            <Link href="/pricing" className="nav-link-modern">
              Pricing
            </Link>

            <div className="relative group">
              <button className="nav-link-modern flex items-center gap-1">
                Solutions
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="glass-card-modern p-2">
                  <Link href="/solutions" className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                    By Industry
                  </Link>
                  <Link href="/solutions/for-sdrs" className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                    For SDRs
                  </Link>
                  <Link href="/solutions/for-managers" className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                    For Managers
                  </Link>
                  <Link href="/solutions/enterprise" className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                    Enterprise
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/resources" className="nav-link-modern">
              Resources
            </Link>
            <Link href="/security" className="nav-link-modern">
              Security
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard" className="button-premium button-glass">
              Check out the platform
            </Link>
            <Link href="/register" className="button-premium button-primary-modern">
              Get Started
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-modern">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                <Activity className="w-4 h-4 text-pink-500" />
                <span className="text-sm text-white/80">AI-Powered Sales Platform</span>
              </div>
              
              <h1 className="hero-heading-modern">
                Never Miss<br />
                <span className="gradient-text-animated">Another Lead</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Respond to every lead in under 60 seconds with AI that works
                across voice, chat, email, and SMS for the price of lunch.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="button-premium button-primary-modern button-magnetic">
                  <Sparkles className="w-5 h-5" />
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/demo" className="button-premium button-glass">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-black"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-white/60 text-sm">Trusted by 500+ sales teams</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Form */}
            <div className="reveal-scale">
              <form className="form-modern">
                <h3 className="text-2xl font-bold mb-6 gradient-text">Get Started Today</h3>
                
                <div className="form-group-modern">
                  <input
                    type="text"
                    className="form-input-modern"
                    placeholder=" "
                    required
                  />
                  <label className="form-label-modern">Full name</label>
                </div>

                <div className="form-group-modern">
                  <input
                    type="email"
                    className="form-input-modern"
                    placeholder=" "
                    required
                  />
                  <label className="form-label-modern">Work email</label>
                </div>

                <div className="form-group-modern">
                  <input
                    type="text"
                    className="form-input-modern"
                    placeholder=" "
                    required
                  />
                  <label className="form-label-modern">Company name</label>
                </div>

                <div className="form-group-modern">
                  <select className="form-input-modern" required>
                    <option value="">Select employees...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501+">501+</option>
                  </select>
                </div>

                <div className="form-group-modern">
                  <input
                    type="tel"
                    className="form-input-modern"
                    placeholder=" "
                    required
                  />
                  <label className="form-label-modern">Phone number</label>
                </div>

                <button type="submit" className="button-premium button-primary-modern w-full">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-sm text-white/50 mt-4">
                  No credit card required • 14-day free trial
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                <span className="gradient-text">Impressive Results</span>
              </h2>
              <p className="text-xl text-white/60">Powered by cutting-edge AI technology</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="stat-card-premium reveal stagger gpu-accelerated">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 mb-4">
                  <Clock className="w-8 h-8 text-pink-500" />
                </div>
                <div className="stat-number-premium count-up">47</div>
                <h3 className="text-xl font-semibold mb-2">Second</h3>
                <p className="text-white/60">Average response time</p>
              </div>

              <div className="stat-card-premium reveal stagger gpu-accelerated">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 mb-4">
                  <TrendingUp className="w-8 h-8 text-pink-500" />
                </div>
                <div className="stat-number-premium count-up">391%</div>
                <h3 className="text-xl font-semibold mb-2">Higher</h3>
                <p className="text-white/60">Conversion rate</p>
              </div>

              <div className="stat-card-premium reveal stagger gpu-accelerated">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 mb-4">
                  <Target className="w-8 h-8 text-pink-500" />
                </div>
                <div className="stat-number-premium count-up">21×</div>
                <h3 className="text-xl font-semibold mb-2">More Qualified</h3>
                <p className="text-white/60">Leads generated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-6xl font-bold">
                <span className="gradient-text-animated">500+</span>
                <span className="text-white"> Sales Teams</span>
              </h2>
              <p className="text-2xl text-white/60 mt-4">Trust Mohit AI</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card-modern p-8 text-center reveal stagger">
                <div className="stat-number-premium">10-15</div>
                <p className="text-xl text-white/80">Hot Leads Daily</p>
              </div>

              <div className="glass-card-modern p-8 text-center reveal stagger">
                <div className="stat-number-premium">3x</div>
                <p className="text-xl text-white/80">More Meetings</p>
              </div>

              <div className="glass-card-modern p-8 text-center reveal stagger">
                <div className="text-6xl font-bold text-white mb-2">80%</div>
                <p className="text-xl text-white/80">Less Cold Calling</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-pink-500" />
                  <span className="text-white/80">SOC 2 Type II Certified</span>
                </div>
              </div>
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/20">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-pink-500" />
                  <span className="text-white/80">99.9% Uptime SLA</span>
                </div>
              </div>
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/20">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-pink-500" />
                  <span className="text-white/80">Bank-Level Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                Your AI SDR&apos;s<br />
                <span className="gradient-text">Complete Toolkit</span>
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Mohit AI handles all aspects of prospecting and outreach,
                delivering only qualified, interested leads to your human SDRs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="feature-card-modern reveal stagger">
                <div className="feature-icon-modern">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Voice Calling</h3>
                <p className="text-white/60 flex-grow">
                  Your AI SDR makes hundreds of personalized calls daily using
                  natural voice AI, qualifies interest, and books meetings
                  automatically.
                </p>
                <Link href="/features/voice" className="inline-flex items-center gap-2 text-pink-500 mt-6 hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="feature-card-modern reveal stagger">
                <div className="feature-icon-modern">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Intelligent Email</h3>
                <p className="text-white/60 flex-grow">
                  AI writes and sends personalized emails based on prospect
                  research, company news, and buying signals. Follows up
                  automatically.
                </p>
                <Link href="/features/email" className="inline-flex items-center gap-2 text-pink-500 mt-6 hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="feature-card-modern reveal stagger">
                <div className="feature-icon-modern">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Multi-Channel</h3>
                <p className="text-white/60 flex-grow">
                  Seamlessly engage prospects across email, LinkedIn, SMS, and
                  phone calls. Maintains consistent messaging while adapting to
                  preferences.
                </p>
                <Link href="/features/multi-channel" className="inline-flex items-center gap-2 text-pink-500 mt-6 hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                What Our <span className="gradient-text">Customers Say</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card-modern p-8 reveal stagger">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-pink-500 text-pink-500" />
                  ))}
                </div>
                <p className="text-lg text-white/80 mb-6">
                  &ldquo;We went from missing 40% of our inbound leads to
                  capturing every single one. Mohit AI paid for itself in the
                  first week.&rdquo;
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-white/60">VP Sales at TechFlow</p>
                </div>
              </div>

              <div className="glass-card-modern p-8 reveal stagger">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-pink-500 text-pink-500" />
                  ))}
                </div>
                <p className="text-lg text-white/80 mb-6">
                  &ldquo;$75/month for an AI that books more meetings than our
                  $65k/year SDR? We&apos;re saving $5,000/month and converting 3x more.&rdquo;
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="font-semibold">Marcus Johnson</p>
                  <p className="text-white/60">Founder at GrowthLab</p>
                </div>
              </div>

              <div className="glass-card-modern p-8 reveal stagger">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-pink-500 text-pink-500" />
                  ))}
                </div>
                <p className="text-lg text-white/80 mb-6">
                  &ldquo;Finally, an AI that actually works across all channels.
                  Our leads come from everywhere. Mohit AI handles them all.&rdquo;
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="font-semibold">Jennifer Park</p>
                  <p className="text-white/60">RevOps at CloudFirst</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="cta-premium reveal">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">
                    Never Miss Another Lead
                  </h2>
                  <p className="text-xl text-white/70">
                    Join 500+ teams responding to every lead in under 60 seconds.
                    Start your free trial and see results today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register" className="button-premium button-primary-modern">
                    <Sparkles className="w-5 h-5" />
                    Start Free Trial
                  </Link>
                  <Link href="/pricing" className="button-premium button-glass">
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}