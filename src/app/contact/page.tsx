"use client";

import { Metadata } from "next";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Note: Metadata is not used in client components
// export const metadata: Metadata = {
//   title: "Contact - Mohit AI",
//   description: "Get in Touch - Have questions? We're here to help.",
// };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 mb-8">
            Have questions? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-8">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-300 to-purple-500 text-white font-medium hover:from-purple-400 hover:to-purple-600"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-black mb-6">
                  Other Ways to Connect
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Sales Inquiries
                    </h3>
                    <p className="text-gray-600">Email: sales@mohitai.com</p>
                    <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Support
                    </h3>
                    <p className="text-gray-600">Email: support@mohitai.com</p>
                    <p className="text-gray-600">Phone: +1 (555) 987-6543</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Office Location
                    </h3>
                    <p className="text-gray-600">123 AI Boulevard</p>
                    <p className="text-gray-600">San Francisco, CA 94105</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black mb-6">FAQ</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      What are your support hours?
                    </h3>
                    <p className="text-gray-600">
                      Our support team is available 24/7 to assist you with any
                      questions or concerns.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      How quickly do you respond?
                    </h3>
                    <p className="text-gray-600">
                      We typically respond to all inquiries within 1 business
                      day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}