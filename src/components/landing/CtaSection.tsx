import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-32 bg-black" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="cta-heading"
          className="text-5xl md:text-6xl font-bold text-white mb-8"
        >
          Never Miss Another Lead
        </h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Join 500+ teams responding to every lead in under 60 seconds. Start
          your free trial and see results today.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/register" passHref>
            <Button
              as="a"
              aria-label="Start Free Trial"
              className="px-8 py-4 bg-white text-black hover:bg-gray-100 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Start Free Trial
            </Button>
          </Link>
          <Link href="/pricing" passHref>
            <Button
              as="a"
              variant="outline"
              aria-label="View Pricing"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black text-lg font-semibold rounded-xl transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
