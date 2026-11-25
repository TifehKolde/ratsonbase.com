import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/blogs", destination: "/insights", permanent: true }, { source: "/blogs/:slug", destination: "/insights/:slug", permanent: true }];
  },
};

export default nextConfig;
