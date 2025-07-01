import { Phone, Mail, Users, Check } from "lucide-react";

export function FeaturesSection() {
  return (
    <section
      className="py-32 bg-white relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 to-white/0"
        aria-hidden="true"
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:sticky top-24 h-full">
            <h2
              id="features-heading"
              className="text-5xl font-bold text-black tracking-tight mb-6"
            >
              Your AI SDR&apos;s Complete Toolkit
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Mohit AI handles all aspects of prospecting and outreach,
              delivering only qualified, interested leads to your human SDRs.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 animate-fade-in-up">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Phone
                    className="w-6 h-6 text-purple-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-3xl font-bold text-black">
                  AI Calling
                </h3>
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Make hundreds of personalized calls daily using natural voice
                AI. Our system handles objections, qualifies prospects, and
                books meetings automatically.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">
                    Natural voice conversations
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">
                    Real-time objection handling
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">
                    Automatic meeting scheduling
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-bold text-black">
                  AI Messaging
                </h3>
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Send personalized emails, LinkedIn messages, and SMS based on
                prospect research and buying signals. Follow up automatically
                until you get a response.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">
                    Multi-channel outreach
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">
                    Personalized messaging
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">
                    Smart follow-up sequences
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users
                    className="w-6 h-6 text-purple-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-3xl font-bold text-black">
                  Platform
                </h3>
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                A comprehensive platform that integrates with your existing
                tools and provides powerful analytics to optimize your sales
                process.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">CRM integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-neutral-700">Custom workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
