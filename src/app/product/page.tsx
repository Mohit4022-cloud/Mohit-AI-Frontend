import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, LayoutGrid, Check } from "lucide-react";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "Product - Mohit AI",
  description: "One Platform for All Your Sales Outreach - AI-powered calling, intelligent messaging, and advanced analytics",
};

export default function ProductPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-black mb-6">
              One Platform for All Your Sales Outreach
            </h1>
            <p className="text-xl text-gray-600">
              Mohit AI combines AI-powered calling, intelligent messaging, and
              advanced analytics to automate your entire sales development
              process.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gray-100 rounded-2xl p-8 aspect-video flex items-center justify-center">
              <p className="text-gray-500">Platform Demo Video Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Calling */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                AI Calling
              </h3>
              <p className="text-gray-600 mb-6">
                Make hundreds of personalized calls daily using natural voice
                AI. Our system handles objections, qualifies prospects, and
                books meetings automatically.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Natural voice conversations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Real-time objection handling
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Automatic meeting scheduling
                  </span>
                </li>
              </ul>
            </div>

            {/* AI Messaging */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                AI Messaging
              </h3>
              <p className="text-gray-600 mb-6">
                Send personalized emails, LinkedIn messages, and SMS based on
                prospect research and buying signals. Follow up automatically
                until you get a response.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Multi-channel outreach
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Personalized messaging
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Smart follow-up sequences
                  </span>
                </li>
              </ul>
            </div>

            {/* Platform */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <LayoutGrid className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Platform</h3>
              <p className="text-gray-600 mb-6">
                A comprehensive platform that integrates with your existing
                tools and provides powerful analytics to optimize your sales
                process.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">CRM integration</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Custom workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600">
              Mohit AI combines powerful features to streamline your sales
              development process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Intelligent Lead Generation
                </h3>
                <p className="text-gray-600">
                  Our AI analyzes millions of data points to find and
                  prioritize the best prospects for your business.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Smart Engagement
                </h3>
                <p className="text-gray-600">
                  Automatically engage prospects across multiple channels with
                  personalized messaging that gets responses.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Meeting Scheduling
                </h3>
                <p className="text-gray-600">
                  When prospects show interest, Mohit AI automatically
                  schedules meetings with your sales team.
                </p>
              </div>
            </div>
            {/* Right Column */}
            <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
              <p className="text-gray-500">Platform Screenshot Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Works With Your Existing Tools
            </h2>
            <p className="text-xl text-gray-600">
              Mohit AI integrates seamlessly with your favorite CRM and sales
              tools.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Salesforce</span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">HubSpot</span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Outreach</span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">SalesLoft</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of companies using Mohit AI to automate their sales
            development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button
                variant="outline"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-medium rounded-lg transition-all duration-200"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-200">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}