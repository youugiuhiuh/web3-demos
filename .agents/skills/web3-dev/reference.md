# Web3 Development Reference

This document provides technical deep-dives into Web3 development best practices.

## 1. Solidity Security Best Practices

### The CEI Pattern (Checks, Effects, Interactions)

Always structure functions in this exact order to prevent reentrancy attacks:

1. **Checks**: Validate inputs using `require()`, `revert()`, or custom errors.
2. **Effects**: Update the contract's state variables.
3. **Interactions**: Call external contracts or transfer Ether.

_Why?_ If an external call passes control to a malicious contract, the malicious contract cannot re-enter the original function and exploit an unchanged state.

### Using Custom Errors vs `require`

Starting from Solidity 0.8.4, custom errors (`error Unauthorized();`) save significant gas compared to string descriptions in `require()` statements. Use them for all reverts.

### Access Control

Never leave sensitive functions (`mint`, `withdraw`, `setOwner`) `public` without restrictions.
Use OpenZeppelin's `Ownable` or `AccessControl`.

## 2. Frontend Web3 Architecture (Wagmi & Viem)

### Wagmi + React Query

Wagmi v2+ requires `@tanstack/react-query`.

- Use `useReadContract` for `view`/`pure` functions.
- Use `useWriteContract` to execute state-changing transactions.
- Always use `useWaitForTransactionReceipt` to know when a transaction actually mines, rather than just waiting for the wallet signature to return.

### SSR and Hydration in Next.js

Web3 injected wallets (like MetaMask) are not available on the server during Server-Side Rendering (SSR).
If you render a `ConnectButton` or conditional UI based on wallet state during SSR, React will throw a hydration mismatch error.
**Solution**: Delay rendering wallet-dependent UI until the component has mounted on the client, or disable SSR in the Wagmi config/Next dynamic imports.

## 3. Development Environments

### Hardhat

- Excellent TypeScript support via `hardhat-toolbox`.
- Great plugin ecosystem.
- Uses JavaScript/TypeScript for testing.

### Foundry

- Tests are written in Solidity, meaning you don't need to switch contexts.
- Extremely fast compilation and testing (written in Rust).
- Powerful cheatcodes (`vm.prank`, `vm.expectRevert`) for complex blockchain state manipulation.

## 4. Source URLs

- [Solidity Docs](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/)
- [Wagmi Docs](https://wagmi.sh/react/getting-started)
- [Viem Docs](https://viem.sh/)
