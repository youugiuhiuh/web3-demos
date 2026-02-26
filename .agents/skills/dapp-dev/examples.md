# dApp Dev Examples

## 1. Wagmi Providers (Next.js Setup)

**`components/Web3Providers.tsx`**

```tsx
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const config = getDefaultConfig({
  appName: "My dApp",
  projectId: "YOUR_WALLET_CONNECT_PROJECT_ID", // Required for RainbowKit
  chains: [sepolia],
  ssr: false, // Critical to avoid hydration errors
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
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@rainbow-me/rainbowkit/styles.css";

// Note: Ensure `Web3Providers` wraps your app explicitly as a dynamic component
const Web3Providers = dynamic(() => import("../components/Web3Providers"), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Providers>
      <Component {...pageProps} />
    </Web3Providers>
  );
}
```

## 2. Reading and Writing to a Contract

```tsx
import { useState, useEffect } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

const myContractAddress = "0x123...";
const myAbi = [
  {
    /* ... */
  },
] as const; // Exported from a separate file

export function ContractInteraction() {
  const [amount, setAmount] = useState("");

  const { data: balance, refetch } = useReadContract({
    address: myContractAddress,
    abi: myAbi,
    functionName: "getBalance",
  });

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDeposit = () => {
    writeContract({
      address: myContractAddress,
      abi: myAbi,
      functionName: "deposit",
      args: [amount],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch(); // Automatically refresh UI when the transaction succeeds
      setAmount("");
    }
  }, [isSuccess, refetch]);

  return (
    <div>
      <p>Balance: {balance?.toString() || "0"}</p>

      <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleDeposit} disabled={isPending || isConfirming}>
        {isPending
          ? "Confirm in Wallet..."
          : isConfirming
          ? "Mining..."
          : "Deposit"}
      </button>

      {isSuccess && <span>Transaction complete!</span>}
    </div>
  );
}
```
