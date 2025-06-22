import type { Metadata } from "next";
import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security - Mohit AI",
  description:
    "Enterprise-grade security and compliance. Mohit AI maintains the highest standards of data protection.",
};

export default function SecurityPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-8">
              Enterprise-Grade Security
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Mohit AI is built with security-first architecture and maintains
              the highest standards of data protection and compliance.
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold">SOC 2</span> Compliant
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">GDPR</span> Compliant
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">ISO 27001</span> Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Data Encryption
              </h3>
              <p className="text-gray-600">
                All data is encrypted at rest and in transit using
                industry-standard AES-256 encryption and TLS 1.3 protocols.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Access Control
              </h3>
              <p className="text-gray-600">
                Role-based access control, SSO integration, and multi-factor
                authentication ensure secure user access.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Compliance</h3>
              <p className="text-gray-600">
                Maintain compliance with SOC 2, GDPR, CCPA, and other major
                security and privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">
                Our Security Measures
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Infrastructure Security
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Regular security audits and penetration testing</li>
                      <li>• 24/7 infrastructure monitoring</li>
                      <li>• Automated vulnerability scanning</li>
                      <li>• DDoS protection and mitigation</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Data Protection
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• End-to-end encryption for all data</li>
                      <li>• Regular backup and disaster recovery</li>
                      <li>• Data retention and deletion policies</li>
                      <li>• Secure data transfer protocols</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center text-white">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Compliance & Certifications
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• SOC 2 Type II certified</li>
                      <li>• GDPR and CCPA compliant</li>
                      <li>• ISO 27001 certified</li>
                      <li>• Regular compliance audits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-0 mt-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-black mb-8">
                  Security Documentation
                </h3>
                <div className="space-y-6">
                  <Link
                    href="#"
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <h4 className="text-lg font-semibold text-black mb-2">
                      Security Whitepaper
                    </h4>
                    <p className="text-gray-600">
                      Detailed overview of our security architecture and
                      practices
                    </p>
                  </Link>
                  <Link
                    href="#"
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <h4 className="text-lg font-semibold text-black mb-2">
                      Compliance Reports
                    </h4>
                    <p className="text-gray-600">
                      Access our latest compliance certifications and reports
                    </p>
                  </Link>
                  <Link
                    href="#"
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <h4 className="text-lg font-semibold text-black mb-2">
                      Privacy Policy
                    </h4>
                    <p className="text-gray-600">
                      Learn about our data privacy practices and policies
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-300 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Learn More About Our Security?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Schedule a call with our security team to discuss your specific
            requirements
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Schedule Security Review
            </Button>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-200">
              Download Security Whitepaper
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
