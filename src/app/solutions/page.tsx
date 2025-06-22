import type { Metadata } from "next";
import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import {
  Building2,
  DollarSign,
  Heart,
  Monitor,
  Factory,
  Briefcase,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions - Mohit AI",
  description:
    "AI Sales Development for Every Industry. Discover how Mohit AI adapts to your industry's unique needs.",
};

export default function SolutionsPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-black mb-6">
              AI Sales Development for Every Industry
            </h1>
            <p className="text-xl text-gray-600">
              Discover how Mohit AI adapts to your industry&apos;s unique needs
              and helps you close more deals.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-12">
            Solutions by Industry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Construction */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Construction
              </h3>
              <p className="text-gray-600 mb-6">
                Automate outreach to contractors, suppliers, and property
                developers. Book more meetings with decision-makers in the
                construction industry.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Project-based lead targeting
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Bid opportunity tracking
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Contractor relationship management
                  </span>
                </li>
              </ul>
            </div>

            {/* Financial Services */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Financial Services
              </h3>
              <p className="text-gray-600 mb-6">
                Reach financial advisors, wealth managers, and institutional
                investors with compliant, personalized outreach.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Regulatory compliance built-in
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    AUM-based targeting
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Investment strategy matching
                  </span>
                </li>
              </ul>
            </div>

            {/* Healthcare */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Healthcare</h3>
              <p className="text-gray-600 mb-6">
                Connect with healthcare providers, administrators, and
                decision-makers while maintaining HIPAA compliance.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    HIPAA-compliant communication
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Provider network targeting
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Specialty-based outreach
                  </span>
                </li>
              </ul>
            </div>

            {/* Technology */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Technology</h3>
              <p className="text-gray-600 mb-6">
                Reach CTOs, IT directors, and technology decision-makers with
                technically relevant outreach.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Tech stack analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Integration-based targeting
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Developer-friendly messaging
                  </span>
                </li>
              </ul>
            </div>

            {/* Manufacturing */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Manufacturing
              </h3>
              <p className="text-gray-600 mb-6">
                Connect with plant managers, operations directors, and supply
                chain leaders.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Production capacity analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Supply chain targeting
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Industry compliance tracking
                  </span>
                </li>
              </ul>
            </div>

            {/* Professional Services */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Professional Services
              </h3>
              <p className="text-gray-600 mb-6">
                Reach law firms, consulting agencies, and other professional
                service providers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Practice area targeting
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Client portfolio analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Professional network mapping
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Size Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-12">
            Solutions by Company Size
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Startups */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Startups</h3>
              <p className="text-gray-600 mb-6">
                Perfect for early-stage companies looking to build their first
                sales pipeline.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Quick setup</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Flexible scaling</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">
                    Startup-friendly pricing
                  </span>
                </li>
              </ul>
            </div>

            {/* Small Business */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Small Business
              </h3>
              <p className="text-gray-600 mb-6">
                Designed for growing businesses ready to accelerate their sales
                efforts.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Essential features</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Basic integrations</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Email support</span>
                </li>
              </ul>
            </div>

            {/* Mid-Market */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Mid-Market</h3>
              <p className="text-gray-600 mb-6">
                Advanced features for established companies with dedicated sales
                teams.
              </p>
              <ul className="space-y-4">
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
                  <span className="ml-3 text-gray-600">Full integrations</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Priority support</span>
                </li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Enterprise</h3>
              <p className="text-gray-600 mb-6">
                Customized solutions for large organizations with complex needs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Custom deployment</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white text-sm">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">SLA guarantees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join thousands of companies using Mohit AI to automate their sales
            development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-200"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-200">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
