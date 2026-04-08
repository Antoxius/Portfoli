import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const portfolioApiUrl = new URL(
  process.env.PORTFOLIO_API_BASE_URL || "http://localhost:4000"
);
const workspaceRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: workspaceRoot,
  },
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
