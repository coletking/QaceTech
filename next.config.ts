import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      // Exclude the msnodesqlv8 binary from Webpack bundling
      config.externals = [
        ...config.externals,
        (context: any, request: any, callback: any) => {
          if (request === 'msnodesqlv8') {
            return callback(null, 'commonjs msnodesqlv8');
          }
          callback();
        },
      ];
    }
    return config;
  },
};



export default nextConfig;
