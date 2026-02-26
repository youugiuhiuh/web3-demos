import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import Web3Providers from "../components/Web3Providers";
import ParticleBackground from "../components/ParticleBackground";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Showcase | MessageBoard",
  description: "A modern Web3 portfolio with Next.js App Router and Framer Motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#040D12] text-slate-200 antialiased min-h-screen relative`}>
        <ParticleBackground />
        
        {/* z-10 ensures content sits above the absolute positioned particles */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Web3Providers>
            {children}
          </Web3Providers>
        </div>
      </body>
    </html>
  );
}
