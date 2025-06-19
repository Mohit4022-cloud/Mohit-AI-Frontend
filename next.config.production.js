/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode for better error detection
  reactStrictMode: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize images
  images: {
    domains: [
      'localhost',
      'your-domain.com', // Add your production domain
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Production build optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Enable emotion if using it
    // emotion: true,
  },
  
  // Experimental features for better performance
  experimental: {
    // Enable optimized CSS
    optimizeCss: true,
    
    // Modern JavaScript output
    legacyBrowsers: false,
  },
  
  // Headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate'
          }
        ],
      },
    ];
  },
  
  // Redirects for common patterns
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Add more redirects as needed
    ];
  },
  
  // Rewrites for API versioning
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  // Environment variables to expose to the browser
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '1.0.0',
    NEXT_PUBLIC_ENVIRONMENT: process.env.NODE_ENV,
  },
  
  // TypeScript and ESLint in production builds
  typescript: {
    // Do not ignore TypeScript errors in production
    ignoreBuildErrors: false,
  },
  eslint: {
    // Do not ignore ESLint errors in production
    ignoreDuringBuilds: false,
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Production optimizations
    if (!dev) {
      // Minimize bundle size
      config.optimization.minimize = true;
      
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };
    }
    
    // Add aliases for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@components': require('path').resolve(__dirname, 'src/components'),
      '@lib': require('path').resolve(__dirname, 'src/lib'),
      '@hooks': require('path').resolve(__dirname, 'src/hooks'),
      '@styles': require('path').resolve(__dirname, 'src/styles'),
      '@types': require('path').resolve(__dirname, 'src/types'),
    };
    
    // Add plugins
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    );
    
    return config;
  },
  
  // Output configuration
  output: 'standalone',
  
  // Disable telemetry
  telemetry: false,
};

module.exports = nextConfig;