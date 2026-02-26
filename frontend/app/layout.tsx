import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ParticleBackground from "../components/ParticleBackground";
import Web3Providers from "../components/Web3Providers";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Web3 Showcase | MessageBoard",
	description:
		"A modern Web3 portfolio with Next.js App Router and Framer Motion.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} bg-slate-50 dark:bg-[#040D12] text-slate-800 dark:text-slate-200 antialiased min-h-screen relative transition-colors duration-500`}
			>
				<ParticleBackground />

				{/* z-10 ensures content sits above the absolute positioned particles */}
				<div className="relative z-10 flex flex-col min-h-screen">
					<Web3Providers>{children}</Web3Providers>
				</div>
			</body>
		</html>
	);
}
