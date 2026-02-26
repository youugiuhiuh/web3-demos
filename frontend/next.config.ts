import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel deployment root path configuration */
  experimental: {
    // Tells Vercel to look inside the frontend directory for the Next apps
    outputFileTracingRoot: process.env.VITE_ROOT || undefined,
  },
  // Ensure Next.js builds properly for App Router on Vercel
  reactStrictMode: true,
};

export default nextConfig;
