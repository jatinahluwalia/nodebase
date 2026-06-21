import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [{ source: "/", destination: "/workflows", permanent: false }];
  },
  devIndicators: false,
};

export default withSentryConfig(nextConfig, {
  org: "jatin-dd",
  project: "nodebase",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
