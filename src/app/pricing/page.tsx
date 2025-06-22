import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { PublicLayout } from '@/components/layouts/PublicLayout'

export const metadata: Metadata = {
  title: 'Pricing - Mohit AI',
  description: 'Simple, transparent pricing for every team size',
}

export default function PricingPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">Choose the plan that fits your team&apos;s needs. All plans include a 14-day free trial.</p>
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">14-Day</span> Free Trial
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">No</span> Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Cancel</span> Anytime
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
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-600">/user/month</span>
                </div>
                <p className="text-gray-600">Perfect for small sales teams getting started with AI</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Up to 1,000 monitored contacts</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Basic lead scoring</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Email tracking and automation</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>CRM integration (1 platform)</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Real-time alerts</span>
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
              <Link href="/register">
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-2xl border-2 border-purple-500 shadow-xl relative transform hover:scale-105 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-300 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">Professional</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-600">/user/month</span>
                </div>
                <p className="text-gray-600">Ideal for growing teams that need advanced features</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Up to 10,000 monitored contacts</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>AI-powered lead scoring</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Multi-channel automation</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>CRM integration (3 platforms)</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Intent data insights</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>AI voice calling (500 min/month)</span>
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
                <h3 className="text-2xl font-bold text-black mb-4">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-gray-600">For large teams with custom requirements</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Unlimited contacts</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Custom AI models</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Enterprise-grade security</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Unlimited integrations</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Custom workflows</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Dedicated success manager</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>24/7 phone support</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Unlimited AI voice calling</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-black mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">Can I change plans at any time?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll prorate any charges or credits.</p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">What happens after my free trial ends?</h3>
              <p className="text-gray-600">After your 14-day free trial, you&apos;ll be automatically enrolled in your selected plan. You can cancel anytime before the trial ends to avoid charges.</p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">Do you offer annual billing?</h3>
              <p className="text-gray-600">Yes! We offer a 20% discount for annual billing. Contact our sales team to learn more about annual plans.</p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-black mb-4">What integrations are available?</h3>
              <p className="text-gray-600">We integrate with all major CRMs including Salesforce, HubSpot, Pipedrive, and more. Enterprise plans can request custom integrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Sales Process?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of teams using Mohit AI to accelerate their sales pipeline.</p>
          <Link href="/register">
            <Button className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 text-lg font-semibold rounded-xl">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}