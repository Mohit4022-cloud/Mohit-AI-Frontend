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

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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
        {/* Preconnect to critical domains */}
        <link rel="dns-prefetch" href={config.api.baseUrl} />
        <link rel="preconnect" href={config.api.baseUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Optimized CSP for performance */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' http://localhost:3002 ws://localhost:3002 wss://api.elevenlabs.io https://api.elevenlabs.io; media-src 'self' blob:; worker-src 'self' blob:;"
        />

        {/* Critical inline CSS for above-the-fold */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for immediate render */
            * { box-sizing: border-box; margin: 0; padding: 0; }
            html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
            }
            .navbar-fixed { 
              position: fixed; 
              top: 0; 
              width: 100%; 
              z-index: 1000; 
              background: white;
              transform: translateZ(0);
            }
            .hero-section { min-height: 100vh; }
            
            /* Optimize mesh background */
            .mesh-background {
              position: fixed;
              inset: 0;
              z-index: -1;
              overflow: hidden;
              transform: translateZ(0);
              will-change: auto;
              contain: paint;
            }
            
            .mesh-circle {
              position: absolute;
              border-radius: 50%;
              filter: blur(80px);
              opacity: 0.5;
              transform: translateZ(0);
              will-change: transform;
              animation: float-optimized 20s ease-in-out infinite;
            }
            
            @keyframes float-optimized {
              0%, 100% { transform: translate(0, 0) translateZ(0); }
              50% { transform: translate(30px, -30px) translateZ(0); }
            }
            
            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
              html { scroll-behavior: auto; }
              *, *::before, *::after { 
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
              }
            }
            
            /* Mobile optimizations */
            @media (max-width: 768px) {
              .mesh-circle { 
                animation: none;
                filter: blur(100px);
              }
            }
          `
        }} />
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

        {/* Defer non-critical CSS loading */}
        <Script
          id="load-deferred-styles"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Function to load CSS file
                function loadCSS(href) {
                  const link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = href;
                  link.media = 'print';
                  link.onload = function() { this.media = 'all'; };
                  document.head.appendChild(link);
                }

                // Load page-specific CSS based on route
                const path = window.location.pathname;
                
                // Load animations after a delay or on interaction
                const loadAnimations = () => {
                  loadCSS('/animations-deferred.css');
                  // Remove listener after loading
                  window.removeEventListener('scroll', loadAnimations);
                  window.removeEventListener('touchstart', loadAnimations);
                };

                // Load animations on first interaction or after delay
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(loadAnimations, { timeout: 3000 });
                } else {
                  setTimeout(loadAnimations, 3000);
                }

                // Also load on first interaction
                window.addEventListener('scroll', loadAnimations, { once: true, passive: true });
                window.addEventListener('touchstart', loadAnimations, { once: true, passive: true });

                // Load page-specific styles immediately for the current page
                if (path.includes('/product') || path.includes('/pricing') || path.includes('/solutions')) {
                  loadCSS('/page-specific.css');
                }
              })();
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
                // Simple FPS counter
                (function() {
                  let lastTime = performance.now();
                  let frames = 0;
                  let fps = 60;
                  
                  function updateFPS() {
                    frames++;
                    const currentTime = performance.now();
                    
                    if (currentTime >= lastTime + 1000) {
                      fps = Math.round((frames * 1000) / (currentTime - lastTime));
                      frames = 0;
                      lastTime = currentTime;
                      
                      // Update display
                      const monitor = document.getElementById('fps-monitor');
                      if (monitor) {
                        monitor.textContent = fps + ' FPS';
                        monitor.style.color = fps < 30 ? '#ef4444' : fps < 50 ? '#f59e0b' : '#10b981';
                      }
                    }
                    
                    requestAnimationFrame(updateFPS);
                  }
                  
                  // Create FPS display
                  window.addEventListener('load', () => {
                    const div = document.createElement('div');
                    div.id = 'fps-monitor';
                    div.className = 'performance-monitor';
                    div.style.cssText = 'position:fixed;bottom:10px;right:10px;background:rgba(0,0,0,0.8);color:#10b981;padding:8px 12px;font-family:monospace;font-size:12px;border-radius:4px;z-index:9999;pointer-events:none;';
                    document.body.appendChild(div);
                    updateFPS();
                  });
                })();
              `
            }}
          />
        )}
      </body>
    </html>
  );
}