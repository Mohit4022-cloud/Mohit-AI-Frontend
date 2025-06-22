import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "Features - Mohit AI",
  description: "Powerful Features for Modern Sales Teams - Everything you need to identify, engage, and close deals faster",
};

export default function FeaturesPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-black mb-6">
              Powerful Features for Modern Sales Teams
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to identify, engage, and close deals faster
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Real-Time Prospect Monitoring */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                Real-Time Prospect Monitoring
              </h3>
              <p className="text-gray-600 mb-6">
                Never miss a buying signal again. Mohit AI monitors your
                prospects across multiple channels and alerts you instantly when
                they:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Visit your website or pricing page
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Engage with your content or emails
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Mention your company on social media
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Experience leadership changes or funding events
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Show increased product usage or engagement
                </li>
              </ul>
            </div>

            {/* AI-Powered Lead Scoring */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                AI-Powered Lead Scoring
              </h3>
              <p className="text-gray-600 mb-6">
                Our machine learning algorithms analyze hundreds of data points
                to score and prioritize your leads:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Behavioral scoring based on engagement patterns
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Firmographic fit analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Intent data from first and third-party sources
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Predictive modeling for conversion likelihood
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Dynamic scoring that updates in real-time
                </li>
              </ul>
            </div>

            {/* Intelligent Email Automation */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                Intelligent Email Automation
              </h3>
              <p className="text-gray-600 mb-6">
                Engage prospects at scale without losing the personal touch:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  AI-generated personalized email content
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Optimal send time prediction
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Multi-touch campaign automation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  A/B testing and optimization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Response detection and routing
                </li>
              </ul>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-6">
                Advanced Analytics & Reporting
              </h3>
              <p className="text-gray-600 mb-6">
                Make data-driven decisions with comprehensive insights:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Pipeline velocity and conversion metrics
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Team and individual performance dashboards
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Revenue forecasting and predictions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Campaign ROI analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Custom reports and data exports
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
            More Features to Accelerate Your Sales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">Mobile App</h3>
              <p className="text-gray-600">
                Access Mohit AI on the go with our iOS and Android apps
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">
                Chrome Extension
              </h3>
              <p className="text-gray-600">
                Get insights directly in LinkedIn, Gmail, and your CRM
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">
                Data Enrichment
              </h3>
              <p className="text-gray-600">
                Automatically enrich leads with accurate contact and company
                data
              </p>
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
            See how Mohit AI&apos;s features can revolutionize your sales
            team&apos;s performance
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