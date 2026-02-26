---
name: dapp-dev
version: 1.0.0
description: Provides core architecture and best practices for building Web3 decentralised applications (dApps) using React, Next.js, Wagmi, Viem, and RainbowKit.
---

# dApp Development Skill

## Purpose

Enforces modern frontend best practices when building Web3 user interfaces, specifically dealing with wallet connections, contract interactions, and Next.js SSR hydration constraints.

## When I Activate

I automatically load when you mention:

- "dapp frontend", "web3 frontend", "wallet connect"
- "wagmi", "viem", "rainbowkit"
- "next.js web3", "react web3"

## What I Enforce

1. **Strict Context Isolation**: Wagmi, QueryClient, and RainbowKit providers must be isolated and loaded dynamically or handled with mounted states to avoid Next.js SSR hydration mismatches.
2. **Predictable State**: Always handle `isPending` (awaiting wallet signature), `isConfirming` (awaiting network block), and network `error` cases explicitly in the UI.
3. **Optimized Reads**: Use `useReadContract` and caching wherever possible. Avoid excessive looping or multiple single-query contract reads; prefer multicall.

## Validation Checklist

Before writing any Web3 frontend code, verify:
✅ **Hydration Safe**: `RainbowKitProvider` is mounted client-side only (via Next.js `dynamic` or `useEffect` mounted flags).
✅ **Tx Lifecycle Handled**: User feedback is provided for all transaction states (signing vs confirming).
✅ **Type Safety**: Contract ABIs are imported `as const` to gain full TypeScript autocomplete in Wagmi hooks.

## Documentation Navigation

- **[reference.md](./reference.md)**: Deep dive into SSR Hydration with Wagmi, API patterns, and design principles.
- **[examples.md](./examples.md)**: Boilerplate code for providers, wallet connection UI, and read/write contract hooks.

---

**Note**: Use this skill specifically for frontend dApp logic. If writing or testing smart contracts, refer to the `smart-contract-dev` skill instead.
