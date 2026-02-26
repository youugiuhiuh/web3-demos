"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch by waiting until mounted
	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <div className="w-10 h-10" />;
	}

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<Sun size={18} className="text-amber-400" />
			) : (
				<Moon size={18} className="text-cyan-600" />
			)}
		</motion.button>
	);
}
