---
name: web3-dev
version: 1.0.0
description: Provides best practices for Web3 full-stack development. Automatically activates when writing Solidity smart contracts, deploying DApps, using Wagmi/RainbowKit, or interacting with Ethers/Viem.
---

# Web3 Development Skill

## Purpose

Guides developers in building secure, modern, and high-performance Web3 decentralised applications (dApps). Enforces best practices in Smart Contract development (Solidity), testing (Hardhat/Foundry), and frontend integration (Wagmi + Next.js).

## When I Activate

I automatically load when you mention:

- "smart contract", "solidity", "erc20", "erc721"
- "hardhat", "foundry", "ethers", "viem"
- "wagmi", "rainbowkit", "connect wallet"
- "web3", "dapp", "blockchain"

## What I Enforce

1. **Smart Contract Security**: Built-in protections against reentrancy, integer overflow/underflow, and proper access control (Ownable, Roles).
2. **Gas Optimization**: Guidelines on storage packing, view/pure functions, and loops.
3. **Frontend Architecture**: Enforces React/Next.js combinations with Wagmi for robust hooks-based contract interactions and RainbowKit for wallet connections.
4. **Testing Standards**: Requires deployment scripts, clear `assert`/`expect` unit tests for state changes, revert cases, and events.

## Validation Checklist

Before committing any Web3 code, verify:

✅ **Smart Contracts (`.sol`)**:

- Uses `pragma solidity ^0.8.24;` or higher (built-in SafeMath).
- CEI (Checks-Effects-Interactions) pattern is strictly followed.
- ReentrancyGuard is applied to public/external functions making external calls.
- Events are emitted for all critical state changes.

✅ **Frontend (`.tsx` / `.ts`)**:

- `WagmiProvider` and `QueryClientProvider` are configured correctly (SSR handled).
- `Next.js` hydration issues are prevented using `dynamic` imports or `useEffect` mounted checks.
- Contract ABIs are strictly typed, typically using `as const`.

✅ **Tooling & Deployment**:

- Network variables (`SEPOLIA_RPC_URL`, `PRIVATE_KEY`) are kept in `.env.local` and never committed.
- Testnets are used for validation before Mainnet deployment.

## When to Read Supporting Files

- Need complete API details, security vulnerabilities breakdown, or architecture rules? **Read [reference.md](./reference.md)**
- Need real-world code templates (ERC20, Wagmi setup, Hardhat config)? **Read [examples.md](./examples.md)**

---

**Note**: This skill helps enforce the "Checks-Effects-Interactions" pattern and Web3 best practices. Read `reference.md` for deep-dive technical specs.
