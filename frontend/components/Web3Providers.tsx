import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const config = getDefaultConfig({
  appName: "MessageBoard dApp",
  projectId: "YOUR_PROJECT_ID", // Add WalletConnect ID here
  chains: [sepolia],
  ssr: false, // Disables Wagmi SSR to prevent hydration errors!
});

const client = new QueryClient();

export default function Web3Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
