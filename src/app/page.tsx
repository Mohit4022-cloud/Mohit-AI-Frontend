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
      {/* Hero Section */}
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <h1 className="text-7xl font-bold text-black tracking-tight leading-[1.1] mb-8">
                Never Miss Another Inbound Lead
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-12">
                Respond to every lead in under 60 seconds with AI that works
                across voice, chat, email, and SMS—all for the price of lunch.
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
              <div className="relative overflow-visible px-8 -mx-8">
                {/* Mesh gradient background */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-neutral-200 to-transparent rounded-full blur-3xl animate-[rotate_20s_linear_infinite]"></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-neutral-200 to-transparent rounded-full blur-3xl animate-[rotate_25s_linear_infinite_reverse]"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative py-4">
                  <div className="group relative overflow-visible rounded-[32px] p-8 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:0ms] isolate">
                    {/* Multiple gradient layers for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                    
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                    </div>
                    
                    {/* Subtle pulse glow */}
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-center justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-[24px] blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                          <div className="w-20 h-20 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-[24px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.8)] group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                            <Clock className="w-8 h-8 text-black/70 group-hover:text-black/90 transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <div className="text-[4rem] font-[900] mb-3 bg-gradient-to-b from-black via-neutral-700 to-neutral-500 bg-clip-text text-transparent leading-none tracking-[-0.06em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] transition-all duration-300">
                          6
                        </div>
                        <div className="absolute inset-0 text-[4rem] font-[900] bg-gradient-to-t from-black/20 to-transparent bg-clip-text text-transparent leading-none tracking-[-0.06em] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                          6
                        </div>
                      </div>
                      <div className="text-[0.7rem] font-semibold text-black/50 mb-2 uppercase tracking-[0.2em] group-hover:text-black/70 transition-colors duration-300 text-center">
                        Seconds
                      </div>
                      <div className="text-sm font-normal text-black/70 leading-relaxed group-hover:text-black/80 transition-colors duration-300 text-center">
                        Response Time
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-visible rounded-[32px] p-8 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:150ms] isolate">
                    {/* Multiple gradient layers for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                    
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                    </div>
                    
                    {/* Subtle pulse glow */}
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-center justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-[24px] blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                          <div className="w-20 h-20 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-[24px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.8)] group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                            <TrendingUp className="w-8 h-8 text-black/70 group-hover:text-black/90 transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <div className="text-[4rem] font-[900] mb-3 bg-gradient-to-b from-black via-neutral-700 to-neutral-500 bg-clip-text text-transparent leading-none tracking-[-0.06em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] transition-all duration-300">
                          4×
                        </div>
                        <div className="absolute inset-0 text-[4rem] font-[900] bg-gradient-to-t from-black/20 to-transparent bg-clip-text text-transparent leading-none tracking-[-0.06em] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                          4×
                        </div>
                      </div>
                      <div className="text-[0.7rem] font-semibold text-black/50 mb-2 uppercase tracking-[0.2em] group-hover:text-black/70 transition-colors duration-300 text-center">
                        Higher
                      </div>
                      <div className="text-sm font-normal text-black/70 leading-relaxed group-hover:text-black/80 transition-colors duration-300 text-center">
                        Conversion Rate
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-visible rounded-[32px] p-8 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:300ms] isolate">
                    {/* Multiple gradient layers for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                    
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                    </div>
                    
                    {/* Subtle pulse glow */}
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex items-center justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-[24px] blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                          <div className="w-20 h-20 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-[24px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.8)] group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                            <Target className="w-8 h-8 text-black/70 group-hover:text-black/90 transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <div className="text-[4rem] font-[900] mb-3 bg-gradient-to-b from-black via-neutral-700 to-neutral-500 bg-clip-text text-transparent leading-none tracking-[-0.06em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] transition-all duration-300">
                          2×
                        </div>
                        <div className="absolute inset-0 text-[4rem] font-[900] bg-gradient-to-t from-black/20 to-transparent bg-clip-text text-transparent leading-none tracking-[-0.06em] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                          2×
                        </div>
                      </div>
                      <div className="text-[0.7rem] font-semibold text-black/50 mb-2 uppercase tracking-[0.2em] group-hover:text-black/70 transition-colors duration-300 text-center">
                        More Qualified
                      </div>
                      <div className="text-sm font-normal text-black/70 leading-relaxed group-hover:text-black/80 transition-colors duration-300 text-center">
                        Leads Generated
                      </div>
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
                    ✓ No credit card required ✓ Setup in 5 minutes ✓ Cancel
                    anytime
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
                <span className="text-2xl font-semibold">
                  SOC 2 Type II Certified
                </span>
              </div>
              <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                  <Zap className="w-8 h-8" />
                </div>
                <span className="text-2xl font-semibold">99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                  <Lock className="w-8 h-8" />
                </div>
                <span className="text-2xl font-semibold">
                  Bank-Level Encryption
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-neutral-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-neutral-200 to-transparent rounded-full blur-3xl animate-[rotate_30s_linear_infinite]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-neutral-200 to-transparent rounded-full blur-3xl animate-[rotate_35s_linear_infinite_reverse]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-5xl font-[800] text-black tracking-tight mb-6 bg-gradient-to-b from-black to-neutral-600 bg-clip-text text-transparent">
              Your AI SDR&apos;s Complete Toolkit
            </h2>
            <p className="text-xl text-neutral-600/80 leading-relaxed">
              Mohit AI handles all aspects of prospecting and outreach,
              delivering only qualified, interested leads to your human SDRs.
            </p>
          </div>
          <div className="relative overflow-visible px-8 -mx-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative py-4">
              <div className="group relative overflow-visible rounded-[32px] p-10 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:0ms] isolate">
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-[24px] blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-[24px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.8)] group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <Phone className="w-8 h-8 text-black/70 group-hover:text-black/90 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-[800] mb-4 bg-gradient-to-b from-black to-neutral-700 bg-clip-text text-transparent tracking-[-0.02em]">
                    AI Voice Calling
                  </h3>
                  <p className="text-sm text-black/70 leading-relaxed group-hover:text-black/80 transition-colors duration-300">
                    Your AI SDR makes hundreds of personalized calls daily using
                    natural voice AI, qualifies interest, and books meetings
                    automatically.
                  </p>
                </div>
              </div>
              
              <div className="group relative overflow-visible rounded-[32px] p-10 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:150ms] isolate">
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-[24px] blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-black via-neutral-800 to-neutral-600 rounded-[24px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)] group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <Mail className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-[800] mb-4 bg-gradient-to-b from-black to-neutral-700 bg-clip-text text-transparent tracking-[-0.02em]">
                    Intelligent Email Outreach
                  </h3>
                  <p className="text-sm text-black/70 leading-relaxed group-hover:text-black/80 transition-colors duration-300">
                    AI writes and sends personalized emails based on prospect
                    research, company news, and buying signals. Follows up
                    automatically.
                  </p>
                </div>
              </div>
              
              <div className="group relative overflow-visible rounded-[32px] p-10 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:300ms] isolate">
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-[24px] blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-[24px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.8)] group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <Users className="w-8 h-8 text-black/70 group-hover:text-black/90 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-[800] mb-4 bg-gradient-to-b from-black to-neutral-700 bg-clip-text text-transparent tracking-[-0.02em]">
                    Multi-Channel Engagement
                  </h3>
                  <p className="text-sm text-black/70 leading-relaxed group-hover:text-black/80 transition-colors duration-300">
                    Seamlessly engage prospects across email, LinkedIn, SMS, and
                    phone calls. Maintains consistent messaging while adapting to
                    preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-white to-neutral-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-40 right-40 w-96 h-96 bg-gradient-to-br from-neutral-200 to-transparent rounded-full blur-3xl animate-[rotate_40s_linear_infinite]"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 bg-gradient-to-tl from-neutral-200 to-transparent rounded-full blur-3xl animate-[rotate_45s_linear_infinite_reverse]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-[800] text-black tracking-tight mb-6 bg-gradient-to-b from-black to-neutral-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-xl text-neutral-600/80 leading-relaxed">
              Join hundreds of sales teams capturing every inbound opportunity
              with Mohit AI.
            </p>
          </div>
          <div className="relative overflow-visible px-8 -mx-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative py-4">
              <div className="group relative overflow-visible rounded-[32px] p-10 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:0ms] isolate">
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-black/80 fill-current group-hover:text-black transition-colors duration-300"
                      />
                    ))}
                  </div>
                  <p className="text-base text-black/70 leading-relaxed mb-10 group-hover:text-black/90 transition-colors duration-300 min-h-[120px]">
                    &ldquo;We went from missing 40% of our inbound leads to
                    capturing every single one. Mohit AI paid for itself in the
                    first week by booking 15 extra demos we would have lost.&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-8 border-t border-black/10">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-[16px] bg-gradient-to-br from-black via-neutral-800 to-neutral-600 shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.1)]"></div>
                    </div>
                    <div>
                      <div className="font-[700] text-black/90 tracking-[-0.01em]">Sarah Chen</div>
                      <div className="text-sm text-black/60">VP Sales at TechFlow</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-visible rounded-[32px] p-10 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:150ms] isolate">
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-black/80 fill-current group-hover:text-black transition-colors duration-300"
                      />
                    ))}
                  </div>
                  <p className="text-base text-black/70 leading-relaxed mb-10 group-hover:text-black/90 transition-colors duration-300 min-h-[120px]">
                    &ldquo;$75/month for an AI that books more meetings than our
                    $65k/year SDR? It&apos;s not even a question. We&apos;re saving
                    $5,000/month and converting 3x more leads.&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-8 border-t border-black/10">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-[16px] bg-gradient-to-br from-white via-neutral-50 to-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.8)]"></div>
                    </div>
                    <div>
                      <div className="font-[700] text-black/90 tracking-[-0.01em]">Marcus Johnson</div>
                      <div className="text-sm text-black/60">Founder at GrowthLab</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-visible rounded-[32px] p-10 backdrop-blur-[30px] backdrop-saturate-[200%] bg-gradient-to-br from-white/80 via-white/50 to-white/30 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_16px_64px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-[-16px] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 [animation-delay:300ms] isolate">
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.02] opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/10"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-black/80 fill-current group-hover:text-black transition-colors duration-300"
                      />
                    ))}
                  </div>
                  <p className="text-base text-black/70 leading-relaxed mb-10 group-hover:text-black/90 transition-colors duration-300 min-h-[120px]">
                    &ldquo;Finally, an AI that actually works across all channels.
                    Our leads come from everywhere—website chat, email, phone calls.
                    Mohit AI handles them all perfectly.&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-8 border-t border-black/10">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-[16px] bg-gradient-to-br from-black via-neutral-800 to-neutral-600 shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.1)]"></div>
                    </div>
                    <div>
                      <div className="font-[700] text-black/90 tracking-[-0.01em]">Jennifer Park</div>
                      <div className="text-sm text-black/60">Revenue Operations at CloudFirst</div>
                    </div>
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
            Never Miss Another Lead
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join 500+ teams responding to every lead in under 60 seconds. Start
            your free trial and see results today.
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
