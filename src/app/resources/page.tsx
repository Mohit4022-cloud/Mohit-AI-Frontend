import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import {
  FileText,
  MessageSquare,
  Video,
  ArrowRight,
  BookOpen,
  Calendar,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources - Mohit AI",
  description:
    "Everything you need to succeed with Mohit AI. Explore our blog, customer stories, webinars, and more.",
};

export default function ResourcesPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-black mb-6">Resources</h1>
            <p className="text-xl text-gray-600">
              Everything you need to succeed with Mohit AI. Explore our blog,
              customer stories, webinars, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Blog</h3>
              <p className="text-gray-600 mb-6">
                Latest insights, tips, and best practices for AI-powered sales
                development.
              </p>
              <div className="space-y-4">
                <Link href="#" className="block">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">
                      10 Ways AI is Transforming Sales Development
                    </h4>
                    <p className="text-sm text-gray-600">5 min read</p>
                  </div>
                </Link>
                <Link href="#" className="block">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">
                      The Future of Cold Calling: AI vs Human
                    </h4>
                    <p className="text-sm text-gray-600">7 min read</p>
                  </div>
                </Link>
              </div>
              <Link
                href="#"
                className="inline-flex items-center mt-6 text-purple-600 hover:text-black transition-colors"
              >
                View all posts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Customer Stories */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Customer Stories
              </h3>
              <p className="text-gray-600 mb-6">
                See how leading companies are using Mohit AI to transform their
                sales process.
              </p>
              <div className="space-y-4">
                <Link href="#" className="block">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">
                      How TechCorp 3x&apos;d Their Pipeline
                    </h4>
                    <p className="text-sm text-gray-600">
                      Case Study • 5 min read
                    </p>
                  </div>
                </Link>
                <Link href="#" className="block">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">
                      SaaS Co&apos;s Journey to 10k Leads
                    </h4>
                    <p className="text-sm text-gray-600">
                      Case Study • 4 min read
                    </p>
                  </div>
                </Link>
              </div>
              <Link
                href="#"
                className="inline-flex items-center mt-6 text-purple-600 hover:text-black transition-colors"
              >
                View all stories
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Webinars */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Webinars</h3>
              <p className="text-gray-600 mb-6">
                Join live sessions or watch recordings to learn from our
                experts.
              </p>
              <div className="space-y-4">
                <Link href="#" className="block">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">
                      Getting Started with Mohit AI
                    </h4>
                    <p className="text-sm text-gray-600">
                      Live • June 25, 2024
                    </p>
                  </div>
                </Link>
                <Link href="#" className="block">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">
                      Advanced AI Sales Techniques
                    </h4>
                    <p className="text-sm text-gray-600">
                      On-demand • Watch now
                    </p>
                  </div>
                </Link>
              </div>
              <Link
                href="#"
                className="inline-flex items-center mt-6 text-purple-600 hover:text-black transition-colors"
              >
                View all webinars
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Glossary */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">Glossary</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive guide to AI sales development terms and concepts.
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-black transition-colors"
              >
                Learn more
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Recipes */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">Recipes</h3>
              <p className="text-gray-600 mb-6">
                Step-by-step guides for common sales development workflows.
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-black transition-colors"
              >
                View recipes
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Events */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">Events</h3>
              <p className="text-gray-600 mb-6">
                Join us at conferences, meetups, and online events.
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-black transition-colors"
              >
                See events
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Help Center */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-4">
                Help Center
              </h3>
              <p className="text-gray-600 mb-6">
                Get support, browse FAQs, and find detailed documentation.
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-black transition-colors"
              >
                Get help
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* University Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Mohit AI University
            </h2>
            <p className="text-xl text-gray-600">
              Free online courses to help you master AI-powered sales
              development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold text-black mb-4">
                Getting Started
              </h3>
              <p className="text-gray-600 mb-6">
                Learn the basics of Mohit AI and set up your first campaign.
              </p>
              <span className="text-sm text-gray-400">
                4 lessons • 2 hours
              </span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold text-black mb-4">
                Advanced Techniques
              </h3>
              <p className="text-gray-600 mb-6">
                Master advanced features and optimization strategies.
              </p>
              <span className="text-sm text-gray-400">
                6 lessons • 3 hours
              </span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold text-black mb-4">
                AI Sales Mastery
              </h3>
              <p className="text-gray-600 mb-6">
                Become an expert in AI-powered sales development.
              </p>
              <span className="text-sm text-gray-400">
                8 lessons • 4 hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-white/90 mb-8">
              Get the latest Mohit AI news, tips, and resources delivered to
              your inbox.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button
                type="submit"
                className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}