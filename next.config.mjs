/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  transpilePackages: ['react-pdf'],
  webpack(config, { isServer }) {
    // Handle canvas fallback for client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
      };
    }

    // Add module rules to handle canvas module
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
    });

    // Ignore canvas module completely
    config.externals = config.externals || [];
    config.externals.push({
      canvas: 'canvas',
    });

    return config;
  },
};

export default nextConfig;