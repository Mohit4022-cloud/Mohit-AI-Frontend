import { Shield, Zap, Lock } from "lucide-react";

export function TrustedBySection() {
  return (
    <section className="py-24 bg-black" aria-labelledby="trusted-by-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-16">
          <h2
            id="trusted-by-heading"
            className="text-6xl md:text-7xl font-extrabold text-white tracking-tight"
          >
            500+ Sales Teams Trust Mohit AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-20">
            <div className="group relative bg-white/20 backdrop-blur-md rounded-3xl p-12 transform hover:scale-105 transition-all duration-500 border border-white/10 shadow-lg overflow-hidden">
              <div
                className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine"
                aria-hidden="true"
              />
              <div className="text-7xl font-extrabold text-white mb-4">
                10-15
              </div>
              <div className="text-2xl text-white/90 font-semibold">
                Hot Leads Daily
              </div>
            </div>
            <div className="group relative bg-white/20 backdrop-blur-md rounded-3xl p-12 transform hover:scale-105 transition-all duration-500 border border-white/10 shadow-lg overflow-hidden">
              <div
                className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine"
                aria-hidden="true"
              />
              <div className="text-7xl font-extrabold text-white mb-4">3x</div>
              <div className="text-2xl text-white/90 font-semibold">
                More Meetings
              </div>
            </div>
            <div className="group relative bg-white/20 backdrop-blur-md rounded-3xl p-12 transform hover:scale-105 transition-all duration-500 border border-white/10 shadow-lg overflow-hidden">
              <div
                className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine"
                aria-hidden="true"
              />
              <div className="text-7xl font-extrabold text-white mb-4">
                80%
              </div>
              <div className="text-2xl text-white/90 font-semibold">
                Less Cold Calling
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-20 text-white">
            <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                <Shield className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-2xl font-semibold">
                SOC 2 Type II Certified
              </span>
            </div>
            <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                <Zap className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-2xl font-semibold">99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center justify-center gap-5 bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-md">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                <Lock className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-2xl font-semibold">
                Bank-Level Encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
