"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import MessageBoardCard from "../components/MessageBoardCard";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-24 overflow-hidden relative w-full">
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className="text-center space-y-4 mb-16 z-10 mt-12 lg:mt-0"
			>
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
					</span>
					Sepolia Testnet Live
				</div>

				<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 pb-2">
					Web3 Showcase
				</h1>
				<p className="max-w-xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-light">
					A modern demonstration of decentralized state reading, writing, and
					elegant UI design using Wagmi, Next 15, and Framer Motion.
				</p>

				{/* Social / External Links Area */}
				<div className="flex items-center justify-center gap-6 pt-4">
					<a
						href="https://github.com/youugiuhiuh/web3-demos"
						target="_blank"
						rel="noopener noreferrer"
						className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
					>
						<Github size={20} />
						<span className="text-sm font-medium group-hover:underline underline-offset-4">
							GitHub Repository
						</span>
					</a>
				</div>
			</motion.div>

			{/* Main Interactive App Area */}
			<div className="w-full max-w-5xl flex flex-col items-center justify-center z-10 relative">
				<MessageBoardCard />

				{/* Decorative elements behind the card for depth */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 blur-3xl rounded-full -z-20 pointer-events-none" />
			</div>

			{/* Footer Area */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8, duration: 1 }}
				className="mt-auto pt-24 pb-6 z-10 text-slate-600 text-sm flex items-center justify-center gap-2"
			>
				<span>Built with</span>
				<svg
					fill="currentColor"
					viewBox="0 0 24 24"
					className="w-4 h-4 text-cyan-500"
					aria-label="Heart Icon"
					role="img"
				>
					<title>Built with love</title>
					<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
				</svg>
				<span>Next.js App Router & tsParticles</span>
			</motion.div>
		</main>
	);
}
