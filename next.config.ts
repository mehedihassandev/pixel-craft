import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Enable standalone output only for Docker builds, not for Vercel
  ...(process.env.DOCKER_BUILD === 'true' && { output: 'standalone' }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable compression for better performance
  compress: true,
  // Enable poweredByHeader for security
  poweredByHeader: false,
  // Generate static sitemap and robots.txt
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize images for better SEO
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { isServer }) => {
    // Handle background removal library for client-side only
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
    }

    // Handle .wasm files for ONNX runtime
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    // Handle onnxruntime-web
    config.resolve.alias = {
      ...config.resolve.alias,
      'onnxruntime-web': 'onnxruntime-web/dist/ort.webgl.min.js',
    };

    // Fix Handlebars webpack issue
    config.resolve.fallback = {
      ...config.resolve.fallback,
      handlebars: false,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
    };

    // Ignore OpenTelemetry modules that are not needed in browser
    // These packages cause issues during build, so we use null-loader for them

    // Ignore problematic packages during build
    config.module.rules.push({
      test: /node_modules\/(handlebars|@opentelemetry\/winston-transport|@opentelemetry\/exporter-jaeger).*\.js$/,
      use: 'null-loader',
    });

    return config;
  },
  // Add headers for SharedArrayBuffer support and SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          // Security headers for better SEO ranking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
