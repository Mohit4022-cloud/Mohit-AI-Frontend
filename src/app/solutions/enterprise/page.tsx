"use client";

import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Shield, Users, Zap, BarChart } from "lucide-react";
import { useState } from "react";

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enterprise contact form submitted:", formData);
    alert(
      "Thank you for your interest! Our enterprise team will contact you shortly.",
    );
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white leading-tight mb-8">
              Enterprise-Grade AI Sales Platform
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Scale your sales operations with the security, compliance, and
              support that enterprise organizations demand.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="#contact">
                <Button className="bg-gradient-to-r from-purple-300 to-purple-500 text-white hover:from-purple-400 hover:to-purple-600">
                  Contact Sales
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  Request Demo
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>99.9% SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Built for Enterprise Scale
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to deploy AI-powered sales at scale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-300">
                Bank-level encryption, SSO, role-based access control, and
                comprehensive audit logs.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Dedicated Support
              </h3>
              <p className="text-gray-300">
                24/7 priority support, dedicated success manager, and custom
                onboarding.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Custom Integrations
              </h3>
              <p className="text-gray-300">
                Seamless integration with your existing CRM, sales tools, and
                data warehouse.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Advanced Analytics
              </h3>
              <p className="text-gray-300">
                Custom dashboards, unlimited data retention, and API access for
                deep insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Compliance & Security First
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      SOC 2 Type II Certified
                    </h3>
                    <p className="text-gray-300">
                      Annual third-party audits ensure the highest security
                      standards
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      GDPR & CCPA Compliant
                    </h3>
                    <p className="text-gray-300">
                      Full compliance with global data privacy regulations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Enterprise SSO
                    </h3>
                    <p className="text-gray-300">
                      Support for SAML, OIDC, and major identity providers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Data Residency Options
                    </h3>
                    <p className="text-gray-300">
                      Choose where your data is stored with multi-region
                      deployment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">
                Enterprise Security Features
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>256-bit AES encryption at rest</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>TLS 1.3 encryption in transit</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Regular penetration testing</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Real-time threat monitoring</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Custom data retention policies</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>IP allowlisting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              White-Glove Support
            </h2>
            <p className="text-xl text-gray-300">
              Your success is our priority with dedicated support at every step
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Dedicated Success Manager
              </h3>
              <p className="text-gray-300 mb-4">
                Your single point of contact for strategic guidance and best
                practices.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Weekly check-ins</li>
                <li>• Quarterly business reviews</li>
                <li>• Strategic planning sessions</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                24/7 Priority Support
              </h3>
              <p className="text-gray-300 mb-4">
                Get help whenever you need it with guaranteed response times.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• 15-minute response SLA</li>
                <li>• Direct access to engineers</li>
                <li>• Priority issue resolution</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Custom Onboarding
              </h3>
              <p className="text-gray-300 mb-4">
                Tailored implementation plan to ensure smooth deployment.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Custom training programs</li>
                <li>• Data migration assistance</li>
                <li>• Integration support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Let&apos;s Talk About Your Needs
            </h2>
            <p className="text-xl text-gray-300">
              Get in touch with our enterprise team to discuss custom pricing
              and implementation
            </p>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-200">
                    Full name
                  </Label>
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
                  <Label htmlFor="email" className="text-gray-200">
                    Work email
                  </Label>
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company" className="text-gray-200">
                    Company name
                  </Label>
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
                  <Label htmlFor="phone" className="text-gray-200">
                    Phone number
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-200">
                  Tell us about your requirements
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  placeholder="Number of users, current tech stack, specific requirements..."
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-300 to-purple-500 text-white hover:from-purple-400 hover:to-purple-600"
              >
                Contact Enterprise Sales
              </Button>
              <p className="text-xs text-gray-400 text-center">
                We&apos;ll respond within 1 business day
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Scale Your Sales with AI?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join Fortune 500 companies using Mohit AI to transform their sales
            operations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#contact">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-200"
              >
                Contact Sales
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
