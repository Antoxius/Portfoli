const portfolioApiUrl = new URL(
  process.env.PORTFOLIO_API_BASE_URL || "http://localhost:4000"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: portfolioApiUrl.protocol.replace(":", ""),
        hostname: portfolioApiUrl.hostname,
        port: portfolioApiUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
