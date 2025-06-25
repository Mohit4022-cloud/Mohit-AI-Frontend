import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "For SDRs - Mohit AI",
  description: "Double Your Meetings Booked with AI-Powered Outreach",
};

export default function ForSDRsPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-8">
                Double Your Meetings Booked with AI-Powered Outreach
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Let Mohit AI handle cold outreach while you focus on building relationships and closing deals. Our AI assistant works 24/7 to find and engage perfect-fit prospects.
              </p>
              <div className="flex gap-4 mb-12">
                <Link href="/register">
                  <Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" className="px-8 py-6 text-lg">
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-2xl text-purple-600">3x</span> 
                  <span>More Meetings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-2xl text-purple-600">80%</span> 
                  <span>Less Cold Calling</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-2xl text-purple-600">24/7</span> 
                  <span>Outreach</span>
                </div>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">How Mohit AI Helps SDRs</h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Automated Prospecting</h4>
                      <p className="text-gray-600">AI finds and engages perfect-fit prospects 24/7</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Follow-ups</h4>
                      <p className="text-gray-600">Never miss a follow-up with AI-powered sequencing</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Meeting Scheduling</h4>
                      <p className="text-gray-600">AI handles scheduling and calendar coordination</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tools Built for Modern SDRs</h2>
            <p className="text-xl text-gray-600">Everything you need to exceed your quota without the grind</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Prospecting</h3>
              <p className="text-gray-600">Mohit AI analyzes millions of companies to find your ideal prospects and engages them with personalized outreach.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Sequences</h3>
              <p className="text-gray-600">AI creates and executes personalized multi-channel sequences that adapt based on prospect engagement.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Meeting Booking</h3>
              <p className="text-gray-600">Automatically qualify prospects, handle objections, and book meetings directly into your calendar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Real Results for SDRs</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">More Quality Meetings</h3>
                    <p className="text-gray-600">Book 3x more meetings with qualified prospects who are ready to buy.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Less Busy Work</h3>
                    <p className="text-gray-600">Eliminate manual prospecting and follow-up tasks to focus on building relationships.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Consistent Pipeline</h3>
                    <p className="text-gray-600">Maintain a steady flow of qualified opportunities with 24/7 AI-powered outreach.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Start Your Free Trial</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                      Work email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="company">
                      Company name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium"
                  >
                    Start Free Trial
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    No credit card required. 14-day free trial.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-400 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Hit Your Numbers?</h2>
          <p className="text-xl text-white/90 mb-12">Join thousands of SDRs who use Mohit AI to exceed their quotas</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button className="px-8 py-3 bg-white text-purple-600 hover:bg-gray-100 font-medium rounded-lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-purple-600 font-medium rounded-lg"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}