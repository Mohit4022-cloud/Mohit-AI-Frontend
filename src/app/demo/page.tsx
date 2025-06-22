"use client";

import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo form submitted:", formData);
    alert(
      "Thank you for your interest! Our team will contact you shortly to schedule your personalized demo.",
    );
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    });
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
      {/* Demo Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-black mb-6">
              Watch Mohit AI in Action
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Mohit AI handles cold outreach, qualifies leads, and books
              meetings automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Video Demo */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="aspect-w-16 aspect-h-9 mb-8">
                <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Demo Video Coming Soon</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                AI-Powered Cold Calling
              </h3>
              <p className="text-gray-600 mb-6">
                Watch Mohit AI make personalized calls, handle objections, and
                book meetings in real-time.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-gray-600">Natural voice AI technology</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-gray-600">Real-time objection handling</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-gray-600">Automatic meeting scheduling</p>
                </div>
              </div>
            </div>

            {/* Live Demo Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-black mb-6">
                Schedule a Live Demo
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
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">
                    What would you like to see in the demo?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
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
      </section>
    </PublicLayout>
  );
}
