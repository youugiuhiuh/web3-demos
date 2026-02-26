# dApp Web3 Architecture Reference

## 1. Context and State Management (Wagmi + React Query)

### Dependencies

Wagmi v2+ requires `@tanstack/react-query` to cache contract data and manage loading states.

- **`useReadContract`**: Fetches state from blockchain. React Query handles cache invalidation and background fetching.
- **`useWriteContract`**: Triggers a transaction signature request via the injected wallet (e.g. MetaMask).
- **`useWaitForTransactionReceipt`**: Actually waits for the transaction block to be mined on-chain.

### Reading State Safely

Do not poll the contract manually (`setInterval`). Instead, pass the transaction hash returned from `useWriteContract` into `useWaitForTransactionReceipt`. Then, add a `useEffect` dependency on `isConfirmed` that will call the `refetch()` function returned by `useReadContract` to refresh your UI with the latest block data.

## 2. SSR and Hydration in Next.js

### The Problem

Next.js pre-renders pages on the server (SSR or SSG). During server render, the `window` object and injected wallets (`window.ethereum`) do not exist. If your component tree outputs wallet-dependent UI (like predicting the connected address or showing a customized Connect Button), React will throw a **Hydration Mismatch Error** when the client-side JavaScript takes over and discovers a mismatch.

### The Solutions

1. **Dynamic Provider Import**: Extract `WagmiProvider` and `RainbowKitProvider` into a `Web3Providers` child component. Import this component into `_app.tsx` or `layout.tsx` using `next/dynamic` with `{ ssr: false }`.
2. **Mounted Flag**: Use a standard React `useEffect` to flip a `isMounted` boolean to true explicitly on the client. Return `null` if not mounted before rendering Wagmi hooks.

## 3. ABI Management

Extract your smart contract ABI into a separate `.ts` file:

```ts
export const abi = [ ... ] as const;
```

By adding `as const`, TypeScript enforces the correct typings for your `args`, `functionName`, and return values inside your React hooks.

## 4. Source URLs

- [Wagmi React Hooks](https://wagmi.sh/react/getting-started)
- [RainbowKit Integration](https://www.rainbowkit.com/docs/installation)
- [Next.js dynamic imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)
