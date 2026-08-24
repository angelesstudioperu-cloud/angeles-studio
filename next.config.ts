import type { NextConfig } from 'next';
import { securityHeaders } from './config/security-headers';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  async headers() {
    return [{
      source: '/:path*',
      headers: securityHeaders({ allowUnsafeEval: process.env.NODE_ENV === 'development' }),
    }];
  },
};

export default nextConfig;
