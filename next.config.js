/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|fbx|obj|mtl)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
