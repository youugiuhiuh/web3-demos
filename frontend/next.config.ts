import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Ensure Next.js builds properly for App Router on Vercel
	reactStrictMode: true,
};

export default nextConfig;
