import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, CreditCard, Clock } from "lucide-react";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "Pricing - Mohit AI",
  description: "Transparent Pricing Starting at $75/month | 14-Day Free Trial",
};

export default function PricingPage() {
  return (
    <PublicLayout>
      {/* Animated background mesh */}
      <div className="mesh-background" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 reveal">
            <span className="text-gradient-light">Transparent pricing</span>
            <br />
            <span className="text-gradient-light opacity-80">that scales with you</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 reveal reveal-delay-1 max-w-2xl mx-auto">
            No hidden fees. No setup costs. No surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-8 reveal reveal-delay-2">
            <div className="glass-card-dark px-6 py-4 flex items-center gap-3">
              <div className="icon-container">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="label text-gray-400">Free Trial</p>
                <p className="text-lg font-semibold text-white">14 Days</p>
              </div>
            </div>
            <div className="glass-card-dark px-6 py-4 flex items-center gap-3">
              <div className="icon-container">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="label text-gray-400">Credit Card</p>
                <p className="text-lg font-semibold text-white">Not Required</p>
              </div>
            </div>
            <div className="glass-card-dark px-6 py-4 flex items-center gap-3">
              <div className="icon-container">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="label text-gray-400">Setup Time</p>
                <p className="text-lg font-semibold text-white">5 Minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="glass-card p-8 reveal reveal-delay-1">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gradient mb-4">Starter</h3>
                <div className="mb-4">
                  <span className="number-display text-gradient">$399</span>
                  <span className="text-gray-600 text-lg ml-2">/month</span>
                </div>
                <p className="text-gray-600">Perfect for growing teams</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>Up to 500 leads/month</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>All channels (voice, chat, email, SMS)</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>3 CRM integrations</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>Basic analytics dashboard</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>Email support</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 italic mb-6 opacity-80">
                Ideal for: Teams of 1-10 capturing their first automated leads
              </p>
              <Link href="/register">
                <button className="btn btn-secondary w-full">
                  Start Free Trial
                </button>
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="glass-card-dark p-8 reveal reveal-delay-2 relative pulse">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold text-gradient-light mb-4">
                  Professional
                </h3>
                <div className="mb-4">
                  <span className="number-display text-gradient-light">$799</span>
                  <span className="text-gray-400 text-lg ml-2">/month</span>
                </div>
                <p className="text-gray-400">Everything you need to scale</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>Up to 2,000 leads/month</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>Everything in Starter, plus:</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>Unlimited CRM integrations</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>Advanced lead scoring</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>Custom AI training</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>A/B testing tools</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>Priority support</span>
                </li>
              </ul>
              <p className="text-sm text-gray-400 italic mb-6 opacity-80">
                Ideal for: Growing teams of 10-50 ready to scale revenue
              </p>
              <Link href="/register">
                <button className="btn btn-primary w-full">
                  Start Free Trial
                </button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card p-8 reveal reveal-delay-3">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gradient mb-4">Scale</h3>
                <div className="mb-4">
                  <span className="number-display text-gradient">Custom</span>
                </div>
                <p className="text-gray-600">For high-volume operations</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>Unlimited leads</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>Everything in Professional, plus:</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>API access</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>White-label options</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>Dedicated success manager</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-gray-700" />
                  </div>
                  <span>SLA guarantees</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 italic mb-6 opacity-80">
                Ideal for: Teams of 50+ with complex workflows
              </p>
              <Link href="/contact">
                <button className="btn btn-secondary w-full">
                  Talk to Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 reveal">
            <span className="text-gradient-light">Frequently Asked Questions</span>
          </h2>
          <div className="space-y-6">
            <div className="glass-card-dark p-6 reveal reveal-delay-1">
              <h3 className="text-xl font-semibold text-white mb-3">
                Can I change plans at any time?
              </h3>
              <p className="text-gray-400">
                Yes! Switch plans anytime as you grow. We&apos;ll prorate any
                changes.
              </p>
            </div>
            <div className="glass-card-dark p-6 reveal reveal-delay-2">
              <h3 className="text-xl font-semibold text-white mb-3">
                What happens after my free trial ends?
              </h3>
              <p className="text-gray-400">
                After 14 days, you&apos;ll be enrolled in your selected plan.
                Cancel anytime before to avoid charges.
              </p>
            </div>
            <div className="glass-card-dark p-6 reveal reveal-delay-3">
              <h3 className="text-xl font-semibold text-white mb-3">
                Do you offer annual billing?
              </h3>
              <p className="text-gray-400">
                Yes! Get 2 months free with annual billing. Contact sales for
                details.
              </p>
            </div>
            <div className="glass-card-dark p-6 reveal reveal-delay-4">
              <h3 className="text-xl font-semibold text-white mb-3">
                How quickly can I get started?
              </h3>
              <p className="text-gray-400">
                Setup takes under 5 minutes. Most customers see their first
                qualified lead within an hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card-dark p-12 reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-light">Ready to never miss another lead?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join 500+ teams responding to every lead in under 60 seconds.
            </p>
            <Link href="/register">
              <button className="btn btn-primary px-8 py-4 text-lg">
                Start Your Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
