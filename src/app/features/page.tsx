import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "Features - Mohit AI",
  description:
    "AI-Powered Inbound SDR | Voice, Chat, Email & SMS in One Platform",
};

export default function FeaturesPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-black mb-6">
              Powerful Features for Inbound Sales Excellence
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to capture, qualify, and convert every inbound lead
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Real-Time Lead Response */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                Real-Time Lead Response
              </h3>
              <p className="text-gray-600 mb-6">
                Never let another lead go cold. Mohit AI instantly engages when prospects:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Submit a form on your website
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Start a live chat conversation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Call your sales number
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Reply to your emails
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Request a demo or pricing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Download content or sign up for trials
                </li>
              </ul>
            </div>

            {/* Intelligent Lead Qualification */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                Intelligent Lead Qualification
              </h3>
              <p className="text-gray-600 mb-6">
                Our AI qualifies leads using proven frameworks while they&apos;re still hot:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  BANT/FAINT/MEDDIC qualification frameworks
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Dynamic conversation flows based on responses
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Lead scoring based on qualification criteria
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Automatic CRM updates with qualification notes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Smart routing to appropriate sales reps
                </li>
              </ul>
            </div>

            {/* Natural Multi-Channel Conversations */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                Natural Multi-Channel Conversations
              </h3>
              <p className="text-gray-600 mb-6">
                Engage leads naturally across every channel:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  AI voice calls that book meetings
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Live chat with instant responses
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Personalized email follow-ups
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  SMS with 98% open rates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Seamless channel switching
                </li>
              </ul>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                Advanced Analytics & ROI Tracking
              </h3>
              <p className="text-gray-600 mb-6">
                Prove the value with comprehensive insights:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Response time analytics (average: 47 seconds)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Conversion rate improvements
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Lead source performance
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  ROI and revenue impact
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Missed opportunity tracking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-16">
            More Features to Maximize Every Lead
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">CRM Integration</h3>
              <p className="text-gray-600">
                Works with Salesforce, HubSpot, Pipedrive, and 20+ CRMs
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">
                Smart Handoffs
              </h3>
              <p className="text-gray-600">
                Knows exactly when to loop in your human sales team
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">
                Custom AI Training
              </h3>
              <p className="text-gray-600">
                Train the AI on your specific products and qualification criteria
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Capture Every Opportunity?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            See why 78% of deals go to the fastest responder—and how to be first every time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button
                variant="outline"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-medium rounded-lg transition-all duration-200"
              >
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-200">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
