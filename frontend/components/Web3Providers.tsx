"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const config = getDefaultConfig({
	appName: "MessageBoard dApp",
	projectId: "YOUR_PROJECT_ID", // Add WalletConnect ID here
	chains: [sepolia],
	ssr: false,
});

const client = new QueryClient();

export default function Web3Providers({ children }: { children: ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null; // Return nothing at all during SSR to truly block Wagmi
	}

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<WagmiProvider config={config}>
				<QueryClientProvider client={client}>
					<RainbowKitProvider>{mounted && children}</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</ThemeProvider>
	);
}
