import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./ultra-modern.css";
import "./layout-fixes.css";
import "./complete-layout-fix.css";
import "./design-preserving-fixes.css";
import "./premium-complete.css";
import "./navigation-fix.css";
import "./hero-positioning-fix.css";
import "./hero-text-fix.css";
import "./hero-override-fix.css";
import "./hero-final-fix.css";
import "./form-height-fix.css";
import "./white-line-position-fix.css";
import "./feature-icon-fix.css";
import "./feature-icon-color-fix.css";
import "./icon-force-pink.css";
import "./cta-premium-style.css";
import "./pricing-page-styles.css";
import "./solutions-page-styles.css";
import "./enterprise-page-styles.css";
import "./homepage-enhanced-styles.css";
import "./managers-page-styles.css";
import "./ultra-premium-stats.css";
import "./quantum-stats.css";
import "./ultra-animation.css";
import "./sales-ai-animation.css";
import "./minimal-stats.css";
import "./footer-styles.css";
import "./landing-animations.css";
import "./navbar-logo-styles.css";
import "./mobile-responsive-2f33578.css";
import "./body-background-fix.css";
import "./ai-flow-vercel-fix.css";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Mohit AI - Never Miss Another Inbound Lead",
    template: "%s | Mohit AI",
  },
  description: "AI-powered sales platform that responds to every lead in under 60 seconds. Works across voice, chat, email, and SMS.",
  keywords: ["AI sales", "lead response", "sales automation", "AI SDR", "voice AI", "sales AI"],
  authors: [{ name: "Mohit AI" }],
  creator: "Mohit AI",
  publisher: "Mohit AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mohit-ai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohit AI - Never Miss Another Inbound Lead",
    description: "AI-powered sales platform that responds to every lead in under 60 seconds. Works across voice, chat, email, and SMS.",
    url: "https://mohit-ai.com",
    siteName: "Mohit AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohit AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit AI - Never Miss Another Inbound Lead",
    description: "AI-powered sales platform that responds to every lead in under 60 seconds. Works across voice, chat, email, and SMS.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <div className="mesh-background">
          <div className="mesh-circle mesh-circle-1"></div>
          <div className="mesh-circle mesh-circle-2"></div>
          <div className="mesh-circle mesh-circle-3"></div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
