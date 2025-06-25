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
} from "lucide-react";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "Mohit AI - AI-Powered SDR Automation",
  description: "Mohit AI - Your AI SDR That Never Sleeps",
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <h1 className="text-7xl font-bold text-black tracking-tight leading-[1.1] mb-8">
                Your AI SDR That{" "}
                <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-transform duration-300">
                  Never Sleeps
                </span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-12">
                Mohit AI handles 100% of cold outreach—calls, emails, LinkedIn
                messages—and delivers 10-15 hot, qualified leads daily to your
                human SDRs. Focus on closing, not cold calling.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <Link href="/register">
                  <Button className="group inline-flex items-center justify-center px-8 py-4 bg-black text-white font-medium rounded-xl hover:bg-neutral-900 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg text-base">
                    <span>Start Your Free Trial</span>
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    className="group inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-200 text-neutral-900 font-medium rounded-xl hover:border-neutral-300 transition-all duration-300 transform hover:translate-y-[-2px] text-base"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    <span>Watch Demo</span>
                  </Button>
                </Link>
              </div>
              <div className="flex justify-between space-x-8">
                <div className="flex-1 text-center p-6 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
                  <div className="text-5xl font-bold text-black mb-3 bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    10-15
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Hot Leads Daily
                  </div>
                </div>
                <div className="flex-1 text-center p-6 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
                  <div className="text-5xl font-bold text-black mb-3 bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    3x
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    More Meetings
                  </div>
                </div>
                <div className="flex-1 text-center p-6 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
                  <div className="text-5xl font-bold text-black mb-3 bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    80%
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Less Cold Calling
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-100 hover:border-neutral-200 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-black mb-8 text-center">
                  See Mohit AI in action
                </h3>
                <form className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-neutral-700 mb-2"
                      htmlFor="fullName"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-neutral-700 mb-2"
                      htmlFor="workEmail"
                    >
                      Work email address
                    </label>
                    <input
                      type="email"
                      id="workEmail"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-neutral-700 mb-2"
                      htmlFor="company"
                    >
                      Company name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-neutral-700 mb-2"
                      htmlFor="employees"
                    >
                      Number of employees
                    </label>
                    <select
                      id="employees"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="501+">501+</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-neutral-700 mb-2"
                      htmlFor="phone"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                      required
                    />
                  </div>
                  <Link href="/register">
                    <Button
                      type="button"
                      className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-neutral-900 transition-all duration-200 font-medium"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <p className="text-xs text-neutral-500 text-center mt-4">
                    By clicking &ldquo;Get Started,&rdquo; you agree to our
                    Privacy Policy and Terms of Service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-16">
            <h2 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              500+ Sales Teams Trust Mohit AI
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-20">
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 transform hover:scale-105 transition-all duration-500 border border-white/10 shadow-lg">
                <div className="text-7xl font-extrabold text-white mb-4">
                  10-15
                </div>
                <div className="text-2xl text-white/90 font-semibold">
                  Hot Leads Daily
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 transform hover:scale-105 transition-all duration-500 border border-white/10 shadow-lg">
                <div className="text-7xl font-extrabold text-white mb-4">
                  3x
                </div>
                <div className="text-2xl text-white/90 font-semibold">
                  More Meetings
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 transform hover:scale-105 transition-all duration-500 border border-white/10 shadow-lg">
                <div className="text-7xl font-extrabold text-white mb-4">
                  80%
                </div>
                <div className="text-2xl text-white/90 font-semibold">
                  Less Cold Calling
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-20 text-white">
              <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                  <Shield className="w-8 h-8" />
                </div>
                <span className="text-2xl font-semibold">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                  <Zap className="w-8 h-8" />
                </div>
                <span className="text-2xl font-semibold">99.9% Uptime</span>
              </div>
              <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                  <Lock className="w-8 h-8" />
                </div>
                <span className="text-2xl font-semibold">
                  Enterprise Security
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 to-white/0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-5xl font-bold text-black tracking-tight mb-6">
              Your AI SDR&apos;s Complete Toolkit
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Mohit AI handles all aspects of prospecting and outreach,
              delivering only qualified, interested leads to your human SDRs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                AI Voice Calling
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Your AI SDR makes hundreds of personalized calls daily using
                natural voice AI, qualifies interest, and books meetings
                automatically.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Intelligent Email Outreach
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                AI writes and sends personalized emails based on prospect
                research, company news, and buying signals. Follows up
                automatically.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Multi-Channel Engagement
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Seamlessly engage prospects across email, LinkedIn, SMS, and
                phone calls. Maintains consistent messaging while adapting to
                preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-neutral-50/0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold text-black tracking-tight mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Join hundreds of sales teams who have transformed their outreach
              with Mohit AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8 group-hover:text-black transition-colors duration-300">
                &ldquo;We went from 200 cold calls daily to 15 hot
                conversations. Our close rate jumped from 3% to 28%.&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-purple-500"></div>
                <div>
                  <div className="font-semibold text-black">Sarah Chen</div>
                  <div className="text-neutral-500">
                    VP of Sales at TechFlow
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8 group-hover:text-black transition-colors duration-300">
                &ldquo;Our SDRs now focus entirely on warm leads. Revenue per
                SDR has increased by 218% in 6 months.&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-purple-500"></div>
                <div>
                  <div className="font-semibold text-black">
                    Michael Rodriguez
                  </div>
                  <div className="text-neutral-500">CRO at SalesBoost</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8 group-hover:text-black transition-colors duration-300">
                &ldquo;Mohit AI paid for itself in the first week. We&apos;re
                booking 12 qualified meetings per day now.&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-purple-500"></div>
                <div>
                  <div className="font-semibold text-black">Emma Thompson</div>
                  <div className="text-neutral-500">
                    Head of Sales at DataSync
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to 10x Your Sales Pipeline?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join 500+ companies using Mohit AI to transform their sales process.
            Start your free trial today and see results in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <Button className="px-8 py-4 bg-white text-black hover:bg-gray-100 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black text-lg font-semibold rounded-xl transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
