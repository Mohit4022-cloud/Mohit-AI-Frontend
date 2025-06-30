import type { Metadata } from "next";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedBySection } from "@/components/landing/TrustedBySection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CtaSection } from "@/components/landing/CtaSection";

export const metadata: Metadata = {
  title:
    "Mohit AI - Never Miss Another Inbound Lead | Respond in Under 60 Seconds",
  description:
    "Mohit AI - Never Miss Another Inbound Lead | Respond in Under 60 Seconds",
};

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </PublicLayout>
  );
}
