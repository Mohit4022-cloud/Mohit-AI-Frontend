import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section
      className="py-32 bg-neutral-50 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/50 to-neutral-50/0"
        aria-hidden="true"
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2
            id="testimonials-heading"
            className="text-4xl font-bold text-black tracking-tight mb-6"
          >
            What Our Customers Say
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Join hundreds of sales teams capturing every inbound opportunity
            with Mohit AI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            className="bg-white p-10 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-2 mb-8" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="text-xl text-neutral-600 leading-relaxed mb-8 group-hover:text-black transition-colors duration-300">
              <p>
                &ldquo;We went from missing 40% of our inbound leads to
                capturing every single one. Mohit AI paid for itself in the
                first week by booking 15 extra demos we would have lost.&rdquo;
              </p>
            </blockquote>
            <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
              <div
                className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-purple-500"
                aria-hidden="true"
              ></div>
              <div>
                <div className="font-semibold text-black">Sarah Chen</div>
                <div className="text-neutral-500">VP Sales at TechFlow</div>
              </div>
            </div>
          </div>
          <div
            className="bg-white p-10 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 mb-8" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="text-xl text-neutral-600 leading-relaxed mb-8 group-hover:text-black transition-colors duration-300">
              <p>
                &ldquo;$75/month for an AI that books more meetings than our
                $65k/year SDR? It&apos;s not even a question. We&apos;re saving
                $5,000/month and converting 3x more leads.&rdquo;
              </p>
            </blockquote>
            <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
              <div
                className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-purple-500"
                aria-hidden="true"
              ></div>
              <div>
                <div className="font-semibold text-black">Marcus Johnson</div>
                <div className="text-neutral-500">Founder at GrowthLab</div>
              </div>
            </div>
          </div>
          <div
            className="bg-white p-10 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-2 mb-8" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="text-xl text-neutral-600 leading-relaxed mb-8 group-hover:text-black transition-colors duration-300">
              <p>
                &ldquo;Finally, an AI that actually works across all channels.
                Our leads come from everywhere—website chat, email, phone calls.
                Mohit AI handles them all perfectly.&rdquo;
              </p>
            </blockquote>
            <div className="flex items-center gap-4 pt-8 border-t border-neutral-100">
              <div
                className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-purple-500"
                aria-hidden="true"
              ></div>
              <div>
                <div className="font-semibold text-black">Jennifer Park</div>
                <div className="text-neutral-500">
                  Revenue Operations at CloudFirst
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
