/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    });

    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    minimumCacheTTL: 600,
    remotePatterns: [{
      protocol: 'https',
      hostname: '**',
    }],
  },
};

module.exports = nextConfig;
