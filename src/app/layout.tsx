import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./ultra-modern.css";
import "./layout-fixes.css";
import "./integrated-fixes.css";
import "./complete-layout-fix.css";
import "./design-preserving-fixes.css";
import "./targeted-fixes.css";
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
import "./product-page-styles.css";
import "./pricing-page-styles.css";
import "./solutions-page-styles.css";
import "./homepage-enhanced-styles.css";
import "./footer-styles.css";
import { Providers } from "@/components/providers";
import { ErrorBoundary } from "@/components/error-boundary";
import { config } from "@/lib/config";
import { GrammarlySuppressor } from "@/components/grammarly-suppressor";
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
    default: `${config.app.name} - Never Miss Another Inbound Lead`,
    template: `%s | ${config.app.name}`,
  },
  description: config.app.description,
  keywords: config.app.keywords,
  authors: [{ name: config.app.name }],
  creator: config.app.name,
  publisher: config.app.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(config.app.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${config.app.name} - Never Miss Another Inbound Lead`,
    description: config.app.description,
    url: config.app.url,
    siteName: config.app.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: config.app.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.app.name} - Never Miss Another Inbound Lead`,
    description: config.app.description,
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
      <head>
        <link rel="dns-prefetch" href={config.api.baseUrl} />
        <link rel="preconnect" href={config.api.baseUrl} />
        {/* Remove or update CSP to allow localhost connections */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' http://localhost:3002 ws://localhost:3002 wss://api.elevenlabs.io https://api.elevenlabs.io; media-src 'self' blob:; worker-src 'self' blob:;"
        />
      </head>
      <body className={inter.className}>
        <div className="mesh-background">
          <div className="mesh-circle mesh-circle-1"></div>
          <div className="mesh-circle mesh-circle-2"></div>
          <div className="mesh-circle mesh-circle-3"></div>
        </div>
        <ErrorBoundary>
          <Providers>
            <GrammarlySuppressor />
            {children}
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
