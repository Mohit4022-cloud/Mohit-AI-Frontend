import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Mohit AI",
  description:
    "Everything you need to succeed with Mohit AI. Explore our blog, customer stories, webinars, and more.",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}