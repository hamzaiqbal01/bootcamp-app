import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old slug (missing "a") still had impressions in Search Console; send it to the live article.
      {
        source: "/blog/how-long-does-it-take-to-become-dentist",
        destination: "/blog/how-long-does-it-take-to-become-a-dentist",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/9.x/**",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
