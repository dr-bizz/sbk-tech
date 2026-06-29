import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  devIndicators: false,
  // Match the original WordPress URL structure (e.g. /consultancy/) so existing
  // indexed URLs and canonical tags line up after the migration.
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
