// next.config.ts
import { NextConfig } from 'next';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Adiciona o NodePolyfillPlugin apenas no lado do cliente
    if (!isServer) {
      config.plugins.push(new NodePolyfillPlugin());
    }

    // Configura fallbacks para módulos Node.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      assert: require.resolve('assert/'),  // Polyfill para 'assert'
      fs: false,  // Desabilita 'fs' no lado do cliente
      path: require.resolve('path-browserify'),  // Polyfill para 'path'
      os: require.resolve('os-browserify/browser'),  // Polyfill para 'os'
      crypto: require.resolve('crypto-browserify'),  // Polyfill para 'crypto'
      stream: require.resolve('stream-browserify'),  // Polyfill para 'stream'
      child_process: false,  // Desabilita 'child_process' no lado do cliente
    };

    return config;
  },
};

export default nextConfig;
