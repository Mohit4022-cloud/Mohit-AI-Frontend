import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "About - Mohit AI",
  description: "Empowering Sales Teams with AI - We're on a mission to revolutionize how sales teams work",
};

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Empowering Sales Teams with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re on a mission to revolutionize how sales teams work by
            harnessing the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Mohit AI, we believe in transforming the way sales teams
                operate. Our mission is to empower sales professionals with
                cutting-edge AI tools that enhance productivity, improve
                decision-making, and drive better results.
              </p>
              <p className="text-lg text-gray-600">
                We&apos;re committed to innovation, excellence, and providing
                solutions that make a real difference in the sales industry.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  Pushing boundaries with cutting-edge AI technology
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  Delivering outstanding results for our clients
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Trust
                </h3>
                <p className="text-gray-600">
                  Building lasting relationships through reliability
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Impact
                </h3>
                <p className="text-gray-600">
                  Making a real difference in sales success
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-16">
            Meet Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"></div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Sarah Johnson
              </h3>
              <p className="text-gray-600 mb-4">Chief Executive Officer</p>
              <p className="text-gray-600">
                Leading Mohit AI&apos;s mission to transform sales through
                artificial intelligence.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"></div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Michael Chen
              </h3>
              <p className="text-gray-600 mb-4">Chief Technology Officer</p>
              <p className="text-gray-600">
                Driving innovation in AI and machine learning for sales
                optimization.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"></div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Emily Rodriguez
              </h3>
              <p className="text-gray-600 mb-4">Head of Product</p>
              <p className="text-gray-600">
                Shaping the future of sales technology through user-centric
                design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <p className="text-gray-600">Companies Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">50k+</div>
              <p className="text-gray-600">Sales Professionals</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">98%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-300 mb-12">
            Be part of the future of AI-powered sales
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/careers">
              <Button
                variant="outline"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-medium rounded-lg transition-all duration-200"
              >
                View Careers
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-200">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}