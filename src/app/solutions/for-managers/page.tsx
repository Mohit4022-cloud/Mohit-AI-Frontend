"use client";

import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { useState } from "react";

export default function ForManagersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Manager demo form submitted:", formData);
    alert("Thank you for scheduling a demo! We'll contact you shortly.");
    setFormData({ name: "", email: "", company: "", teamSize: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      teamSize: value,
    });
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="text-5xl font-bold text-white leading-tight mb-8">
                Empower Your Sales Team with AI-Driven Insights
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Get complete visibility into your team&apos;s performance, automate routine tasks, and coach your reps to success with Mohit AI&apos;s manager tools.
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
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8">
                  Manager Dashboard Overview
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Real-Time Analytics
                      </h4>
                      <p className="text-gray-300">
                        Monitor team performance and track key metrics in real-time
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        AI-Powered Coaching
                      </h4>
                      <p className="text-gray-300">
                        Get AI-generated insights and coaching recommendations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Automated Reporting
                      </h4>
                      <p className="text-gray-300">
                        Customizable reports delivered automatically to your inbox
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
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Tools Built for Sales Leaders
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to manage, coach, and scale your sales team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                Performance Analytics
              </h3>
              <p className="text-gray-300">
                Track individual and team performance metrics, identify trends, and spot opportunities for improvement.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                Call Coaching
              </h3>
              <p className="text-gray-300">
                AI-powered call analysis provides insights and coaching recommendations for every conversation.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pipeline Management
              </h3>
              <p className="text-gray-300">
                Get a clear view of your team&apos;s pipeline with AI-driven forecasting and risk analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Transform Your Sales Leadership
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Data-Driven Decisions
                    </h3>
                    <p className="text-gray-300">
                      Make informed decisions with real-time data and AI-powered insights into your team&apos;s performance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Efficient Coaching
                    </h3>
                    <p className="text-gray-300">
                      Scale your coaching efforts with AI-generated insights and recommendations for each team member.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Increased Productivity
                    </h3>
                    <p className="text-gray-300">
                      Automate routine tasks and reporting to focus on strategic initiatives and team development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Schedule a Demo
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name" className="text-gray-200">Full name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-200">Work email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-gray-200">Company name</Label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1 bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-size" className="text-gray-200">Team size</Label>
                    <Select value={formData.teamSize} onValueChange={handleSelectChange}>
                      <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 SDRs</SelectItem>
                        <SelectItem value="6-15">6-15 SDRs</SelectItem>
                        <SelectItem value="16-30">16-30 SDRs</SelectItem>
                        <SelectItem value="31+">31+ SDRs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-300 to-purple-500 text-white hover:from-purple-400 hover:to-purple-600"
                  >
                    Schedule Demo
                  </Button>
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
            Ready to Transform Your Sales Team?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join hundreds of sales leaders who use Mohit AI to drive better results
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
              <Button className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}