import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Providers } from "@/components/providers";
import { ErrorBoundary } from "@/components/error-boundary";
import { config } from "@/lib/config";
import { GrammarlySuppressor } from "@/components/grammarly-suppressor";
import { Footer } from "@/components/footer";

// Import only critical CSS for initial render
import "./main-consolidated.css";
import "./performance-optimizations.css";

// Font optimization with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.app.url),
  title: {
    default: "Mohit AI - Never Miss Another Lead | AI-Powered Lead Response",
    template: "%s | Mohit AI"
  },
  description: "AI-powered lead qualification and response platform. Engage every lead in under 60 seconds with human-like AI conversations across voice, SMS, and email.",
  keywords: ["AI SDR", "lead response", "sales automation", "AI phone calls", "lead qualification"],
  authors: [{ name: "Mohit AI" }],
  creator: "Mohit AI",
  publisher: "Mohit AI",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.app.url,
    title: "Mohit AI - Never Miss Another Lead",
    description: "AI-powered lead qualification and response platform",
    siteName: "Mohit AI",
    images: [
      {
        url: `${config.app.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Mohit AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit AI - Never Miss Another Lead",
    description: "AI-powered lead qualification and response platform",
    images: [`${config.app.url}/og-image.png`],
    creator: "@mohitai",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for third-party services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Critical inline CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS */
            body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
            .navbar-fixed { position: fixed; top: 0; width: 100%; z-index: 1000; background: white; }
            .hero-section { min-height: 100vh; }
            * { box-sizing: border-box; }
            html { scroll-behavior: smooth; }
            @media (prefers-reduced-motion: reduce) {
              html { scroll-behavior: auto; }
              *, *::before, *::after { animation-duration: 0.01ms !important; }
            }
          `
        }} />
      </head>
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            <GrammarlySuppressor />
            <main className="flex min-h-screen flex-col">
              {children}
              <Footer />
            </main>
          </Providers>
        </ErrorBoundary>

        {/* Defer non-critical CSS */}
        <Script
          id="load-deferred-css"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Load page-specific CSS based on route
              const loadPageCSS = () => {
                const path = window.location.pathname;
                
                if (path.includes('/product')) {
                  import('./page-specific.css');
                } else if (path.includes('/pricing')) {
                  import('./page-specific.css');
                } else if (path.includes('/solutions')) {
                  import('./page-specific.css');
                }
              };
              
              // Load animations after interaction or delay
              const loadAnimations = () => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/animations-deferred.css';
                document.head.appendChild(link);
              };
              
              // Load animations on first interaction or after 2s
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadAnimations, { timeout: 2000 });
              } else {
                setTimeout(loadAnimations, 2000);
              }
              
              loadPageCSS();
            `
          }}
        />

        {/* Performance monitoring in development */}
        {process.env.NODE_ENV === 'development' && (
          <Script
            id="performance-monitor"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // FPS Monitor
                let lastTime = performance.now();
                let frames = 0;
                let fps = 0;
                
                const updateFPS = () => {
                  frames++;
                  const currentTime = performance.now();
                  if (currentTime >= lastTime + 1000) {
                    fps = Math.round((frames * 1000) / (currentTime - lastTime));
                    frames = 0;
                    lastTime = currentTime;
                    
                    const monitor = document.getElementById('fps-monitor');
                    if (monitor) {
                      monitor.textContent = fps + ' FPS';
                    }
                  }
                  requestAnimationFrame(updateFPS);
                };
                
                // Create FPS display
                const createMonitor = () => {
                  const div = document.createElement('div');
                  div.id = 'fps-monitor';
                  div.className = 'performance-monitor';
                  document.body.appendChild(div);
                  updateFPS();
                };
                
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', createMonitor);
                } else {
                  createMonitor();
                }
              `
            }}
          />
        )}
      </body>
    </html>
  );
}