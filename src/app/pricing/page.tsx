import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "Pricing - Mohit AI",
  description: "Transparent Pricing Starting at $75/month | 14-Day Free Trial",
};

export default function PricingPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Transparent pricing that scales with you
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No hidden fees. No setup costs. No surprises.
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">14-Day</span> Free Trial
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">No</span> Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Setup in 5 Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">Starter</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$399</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">
                  Perfect for growing teams
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Up to 500 leads/month</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>All channels (voice, chat, email, SMS)</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>3 CRM integrations</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Basic analytics dashboard</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
                </ul>
              <p className="text-sm text-gray-500 italic mb-6">
                Ideal for: Teams of 1-10 capturing their first automated leads
              </p>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-black hover:text-white"
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-2xl border-2 border-purple-500 shadow-xl relative transform hover:scale-105 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-300 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Professional
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$799</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">
                  Everything you need to scale
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Up to 2,000 leads/month</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Everything in Starter, plus:</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Unlimited CRM integrations</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Advanced lead scoring</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Custom AI training</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>A/B testing tools</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Ideal for: Growing teams of 10-50 ready to scale revenue</span>
                </li>
              </ul>
              <Link href="/register">
                <Button className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Scale
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-gray-600">
                  For high-volume operations
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Unlimited leads</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Everything in Professional, plus:</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>API access</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>White-label options</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Dedicated success manager</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>SLA guarantees</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Ideal for: Teams of 50+ with complex workflows</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-black hover:text-white"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-black mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                Can I change plans at any time?
              </h3>
              <p className="text-gray-600">
                Yes! Switch plans anytime as you grow. We&apos;ll prorate any changes.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                What happens after my free trial ends?
              </h3>
              <p className="text-gray-600">
                After 14 days, you&apos;ll be enrolled in your selected plan. Cancel anytime before to avoid charges.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                Do you offer annual billing?
              </h3>
              <p className="text-gray-600">
                Yes! Get 2 months free with annual billing. Contact sales for details.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                How quickly can I get started?
              </h3>
              <p className="text-gray-600">
                Setup takes under 5 minutes. Most customers see their first qualified lead within an hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to never miss another lead?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 500+ teams responding to every lead in under 60 seconds.
          </p>
          <Link href="/register">
            <Button className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 text-lg font-semibold rounded-xl">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
