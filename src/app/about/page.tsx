import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export const metadata: Metadata = {
  title: "About - Mohit AI",
  description:
    "The World's Fastest Inbound SDR Platform | 391% Higher Conversions",
};

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Revolutionizing Inbound Sales with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We believe no business should ever miss an opportunity because they couldn&apos;t respond fast enough.
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
                Speed wins deals. That&apos;s why we built Mohit AI—to ensure every inbound lead gets an instant, intelligent response that converts interest into revenue. We&apos;re helping 500+ sales teams respond in seconds, not hours.
              </p>
              <p className="text-lg text-gray-600">
                Our AI doesn&apos;t replace your sales team—it empowers them to focus on what humans do best: building relationships and closing deals.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Speed
                </h3>
                <p className="text-gray-600">
                  Sub-60 second responses, always
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Intelligence
                </h3>
                <p className="text-gray-600">
                  Natural conversations that convert
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">Reliability</h3>
                <p className="text-gray-600">
                  99.9% uptime, 24/7 operation
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-3">
                  ROI
                </h3>
                <p className="text-gray-600">
                  Measurable impact on your bottom line
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
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"></div>
              <h3 className="text-xl font-semibold text-black mb-2">
                David Kim
              </h3>
              <p className="text-gray-600 mb-4">Chief Executive Officer</p>
              <p className="text-gray-600">
                Former VP Sales who missed too many leads. Now ensuring no one else does.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"></div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Lisa Wang
              </h3>
              <p className="text-gray-600 mb-4">Chief Technology Officer</p>
              <p className="text-gray-600">
                AI pioneer focused on natural language processing for sales conversations.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"></div>
              <h3 className="text-xl font-semibold text-black mb-2">
                James Mitchell
              </h3>
              <p className="text-gray-600 mb-4">VP Customer Success</p>
              <p className="text-gray-600">
                Helping 500+ teams achieve 391% higher conversion rates.
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
              <div className="text-4xl font-bold text-black mb-2">10M+</div>
              <p className="text-gray-600">Leads Processed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">391%</div>
              <p className="text-gray-600">Average Conversion Increase</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">47 Second</div>
              <p className="text-gray-600">Average Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Capture Every Opportunity?</h2>
          <p className="text-xl text-gray-300 mb-12">
            See why 78% of deals go to the fastest responder
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/careers">
              <Button
                variant="outline"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-medium rounded-lg transition-all duration-200"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-200">
                Get Your Custom Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
