import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Clock, TrendingUp, Target } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-12 pb-20" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <h1
              id="hero-heading"
              className="text-7xl font-bold text-black tracking-tight leading-[1.1] mb-8 animate-fade-in"
            >
              Never Miss Another Inbound Lead
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              Respond to every lead in under 60 seconds with AI that works
              across voice, chat, email, and SMS—all for the price of lunch.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Link href="/register" passHref>
                <Button
                  as="a"
                  aria-label="Start Your Free Trial"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-black text-white font-medium rounded-xl hover:bg-neutral-900 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg text-base"
                >
                  <span>Start Your Free Trial</span>
                  <ArrowRight
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
              <Link href="/demo" passHref>
                <Button
                  as="a"
                  variant="outline"
                  aria-label="Watch Demo"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-200 text-neutral-900 font-medium rounded-xl hover:border-neutral-300 transition-all duration-300 transform hover:translate-y-[-2px] text-base"
                >
                  <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                  <span>Watch Demo</span>
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-neutral-100 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock
                        className="w-8 h-8 text-purple-600"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="text-6xl font-black mb-2 bg-gradient-to-r from-custom-pink to-pink-600 bg-clip-text text-transparent animate-pulse">
                    47
                  </div>
                  <div className="text-lg font-semibold text-neutral-800 mb-1">
                    Second
                  </div>
                  <div className="text-sm text-neutral-600">
                    Response Time
                  </div>
                </div>
              </div>
              <div
                className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-neutral-100 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp
                        className="w-8 h-8 text-purple-600"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="text-6xl font-black mb-2 bg-gradient-to-r from-custom-pink to-pink-600 bg-clip-text text-transparent">
                    391%
                  </div>
                  <div className="text-lg font-semibold text-neutral-800 mb-1">
                    Higher
                  </div>
                  <div className="text-sm text-neutral-600">
                    Conversion Rate
                  </div>
                </div>
              </div>
              <div
                className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-neutral-100 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target
                        className="w-8 h-8 text-purple-600"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="text-6xl font-black mb-2 bg-gradient-to-r from-custom-pink to-pink-600 bg-clip-text text-transparent">
                    21×
                  </div>
                  <div className="text-lg font-semibold text-neutral-800 mb-1">
                    More Qualified
                  </div>
                  <div className="text-sm text-neutral-600">
                    Leads Generated
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mt-0 mt-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-100 hover:border-neutral-200 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-black mb-8 text-center">
                Start Your Free Trial
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
                    aria-required="true"
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
                    aria-required="true"
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
                    aria-required="true"
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
                    aria-required="true"
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
                    aria-required="true"
                  />
                </div>
                <Link href="/register" passHref>
                  <Button
                    as="a"
                    type="button"
                    aria-label="Get Started"
                    className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-neutral-900 transition-all duration-200 font-medium"
                  >
                    Get Started
                  </Button>
                </Link>
                <p className="text-xs text-neutral-500 text-center mt-4">
                  ✓ No credit card required ✓ Setup in 5 minutes ✓ Cancel
                  anytime
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
