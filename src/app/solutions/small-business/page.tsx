"use client";

import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  DollarSign,
  Clock,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";
import { useState } from "react";

export default function SmallBusinessPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Small business form submitted:", formData);
    alert("Welcome aboard! Check your email for next steps.");
    setFormData({ name: "", email: "", company: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black leading-tight mb-8">
              AI-Powered Sales for Growing Businesses
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Get enterprise-level sales capabilities without the enterprise
              price tag. Start booking more meetings today.
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-300 to-purple-500 text-white hover:from-purple-400 hover:to-purple-600">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  See It In Action
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              No credit card required • 14-day free trial • Setup in 5 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Why Small Businesses Love Mohit AI
            </h2>
            <p className="text-xl text-gray-600">
              We understand the unique challenges of growing businesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Affordable Pricing
              </h3>
              <p className="text-gray-600">
                Pay only for what you use with transparent, scalable pricing
                that grows with your business.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Quick Setup</h3>
              <p className="text-gray-600">
                Get up and running in minutes, not months. No complex
                integrations or lengthy onboarding.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Proven Results
              </h3>
              <p className="text-gray-600">
                Small businesses see 3x more qualified meetings within the first
                30 days.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Dedicated Support
              </h3>
              <p className="text-gray-600">
                Get help when you need it with responsive support and helpful
                resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">
                Everything You Need to Grow
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      AI-Powered Prospecting
                    </h3>
                    <p className="text-gray-600">
                      Find and engage your ideal customers automatically
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Personalized Outreach
                    </h3>
                    <p className="text-gray-600">
                      Every message is tailored to resonate with prospects
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Smart Follow-ups
                    </h3>
                    <p className="text-gray-600">
                      Never miss an opportunity with automated sequences
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Simple Analytics
                    </h3>
                    <p className="text-gray-600">
                      Track what matters with easy-to-understand metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-12">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Meetings Booked
                    </span>
                    <span className="text-sm text-purple-600">+247%</span>
                  </div>
                  <div className="text-3xl font-bold text-black">43</div>
                  <div className="text-sm text-gray-500">This month</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Response Rate
                    </span>
                    <span className="text-sm text-purple-600">+18%</span>
                  </div>
                  <div className="text-3xl font-bold text-black">32%</div>
                  <div className="text-sm text-gray-500">
                    Above industry average
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Time Saved
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-black">20 hrs</div>
                  <div className="text-sm text-gray-500">
                    Per week on outreach
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-500">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">
                  Small Business
                </h3>
                <div className="text-4xl font-bold text-black mb-1">
                  $299
                  <span className="text-lg text-gray-600 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-gray-600">Perfect for growing teams</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">
                    Up to 1,000 AI-powered outreaches/month
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Unlimited team members</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">CRM integrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Email & chat support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">
                    Weekly performance reports
                  </span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-300 to-purple-500 text-white hover:from-purple-400 hover:to-purple-600">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Small Businesses Winning Big
            </h2>
            <p className="text-xl text-gray-600">
              See how businesses like yours are growing with Mohit AI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="mb-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  312%
                </div>
                <p className="text-gray-600">increase in qualified leads</p>
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;Mohit AI helped us triple our pipeline in just 2 months.
                It&apos;s like having a full sales team at a fraction of the
                cost.&rdquo;
              </p>
              <div>
                <p className="font-semibold text-black">Sarah Chen</p>
                <p className="text-sm text-gray-600">
                  CEO, TechStart Solutions
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="mb-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  28
                </div>
                <p className="text-gray-600">hours saved per week</p>
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;We went from spending all day on cold outreach to
                focusing on closing deals. Game changer for our small
                team.&rdquo;
              </p>
              <div>
                <p className="font-semibold text-black">Mike Rodriguez</p>
                <p className="text-sm text-gray-600">Founder, GrowthLabs</p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="mb-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  $2.4M
                </div>
                <p className="text-gray-600">in new revenue</p>
              </div>
              <p className="text-gray-700 mb-4">
                &ldquo;The ROI has been incredible. Mohit AI paid for itself in
                the first week and has been driving growth ever since.&rdquo;
              </p>
              <div>
                <p className="font-semibold text-black">Lisa Park</p>
                <p className="text-sm text-gray-600">VP Sales, CloudFirst</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Ready to Grow Your Business?
                </h2>
                <p className="text-gray-600 mb-8">
                  Join thousands of small businesses using Mohit AI to compete
                  with the big players.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">14-day free trial</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">
                      No credit card required
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">Cancel anytime</span>
                  </li>
                </ul>
              </div>
              <div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Work email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company name</Label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-900"
                  >
                    Start Your Free Trial
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Your Competition is Already Using AI
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Don&apos;t get left behind. Start your free trial today.
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
            <Link href="/pricing">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-200">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
