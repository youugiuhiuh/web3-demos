# Web3 Dev Examples

## 1. Minimal ERC20 implementation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3Token is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Web3Token", "W3T") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

## 2. Setting up Wagmi inside Next.js Page Router

**`components/Web3Providers.tsx`**

```tsx
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const config = getDefaultConfig({
  appName: "My Web3 App",
  projectId: "YOUR_PROJECT_ID", // WalletConnect ID
  chains: [sepolia],
  ssr: false, // Important to prevent hydration errors from Wagmi
});

const client = new QueryClient();

export default function Web3Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

**`pages/_app.tsx`**

```tsx
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const Web3Providers = dynamic(() => import("../components/Web3Providers"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Providers>
      <Component {...pageProps} />
    </Web3Providers>
  );
}

export default MyApp;
```

## 3. Waiting for Transaction Receipt (Wagmi example)

```tsx
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

function SetMessage() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Wait for block confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleUpdate = () => {
    writeContract({
      address: "0xYourContractAddress",
      abi: YOUR_ABI,
      functionName: "setMessage",
      args: ["Hello Web3!"],
    });
  };

  return (
    <button onClick={handleUpdate} disabled={isPending || isConfirming}>
      {isPending || isConfirming ? "Processing..." : "Set Message"}
    </button>
  );
}
```
