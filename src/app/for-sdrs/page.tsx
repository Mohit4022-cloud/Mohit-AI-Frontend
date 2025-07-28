"use client";

import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useState } from "react";

export default function ForSDRsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SDR Trial form submitted:", formData);
    alert("Thank you for signing up! We'll contact you shortly.");
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="text-5xl font-bold text-black leading-tight mb-8">
                Double Your Meetings Booked with AI-Powered Outreach
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Let Mohit AI handle cold outreach while you focus on building
                relationships and closing deals. Our AI assistant works 24/7 to
                find and engage perfect-fit prospects.
              </p>
              <div className="flex gap-4 mb-12">
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
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">3x</span> More Meetings
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">80%</span> Less Cold Calling
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">24/7</span> Outreach
                </div>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-black mb-8">
                  How Mohit AI Helps SDRs
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-black mb-2">
                        Automated Prospecting
                      </h4>
                      <p className="text-gray-600">
                        AI finds and engages perfect-fit prospects 24/7
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-black mb-2">
                        Smart Follow-ups
                      </h4>
                      <p className="text-gray-600">
                        Never miss a follow-up with AI-powered sequencing
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-black mb-2">
                        Meeting Scheduling
                      </h4>
                      <p className="text-gray-600">
                        AI handles scheduling and calendar coordination
                      </p>
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
            <h2 className="text-4xl font-bold text-black mb-6">
              Tools Built for Modern SDRs
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to exceed your quota without the grind
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                AI Prospecting
              </h3>
              <p className="text-gray-600">
                Mohit AI analyzes millions of companies to find your ideal
                prospects and engages them with personalized outreach.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Smart Sequences
              </h3>
              <p className="text-gray-600">
                AI creates and executes personalized multi-channel sequences
                that adapt based on prospect engagement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Meeting Booking
              </h3>
              <p className="text-gray-600">
                Automatically qualify prospects, handle objections, and book
                meetings directly into your calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">
                Real Results for SDRs
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      More Quality Meetings
                    </h3>
                    <p className="text-gray-600">
                      Book 3x more meetings with qualified prospects who are
                      ready to buy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Less Busy Work
                    </h3>
                    <p className="text-gray-600">
                      Eliminate manual prospecting and follow-up tasks to focus
                      on building relationships.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Consistent Pipeline
                    </h3>
                    <p className="text-gray-600">
                      Maintain a steady flow of qualified opportunities with
                      24/7 AI-powered outreach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-black mb-8 text-center">
                  Start Your Free Trial
                </h3>
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
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Hit Your Numbers?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join thousands of SDRs who use Mohit AI to exceed their quotas
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
