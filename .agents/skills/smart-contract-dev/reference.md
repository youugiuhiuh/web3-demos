# Smart Contract Web3 Architecture Reference

## 1. Security Patterns

### The CEI Pattern (Checks, Effects, Interactions)

Always structure functions in this exact order to prevent reentrancy attacks:

1. **Checks**: Validate inputs using `revert()` with custom errors.
2. **Effects**: Update the contract's state variables (like deducting a user's balance).
3. **Interactions**: Call external contracts or transfer Ether.

Example:

```solidity
error InsufficientBalance();
mapping(address => uint256) public balances;

function withdraw() external {
    uint256 amount = balances[msg.sender];

    // Checks
    if (amount == 0) revert InsufficientBalance();

    // Effects
    balances[msg.sender] = 0;

    // Interactions
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed"); // Still okay to use require here due to standard pattern
}
```

### Access Control Best Practices

- Define logic exactly. Use OpenZeppelin's `Ownable` if you just need a single super-user.
- Use `AccessControl` for granular permissions (e.g. `MINTER_ROLE`, `PAUSER_ROLE`).

## 2. Gas Optimization

### Custom Errors

Instead of `require(condition, "Very Long Error String Here");`, use:

```solidity
error Unauthorized(address caller);
// ...
if (msg.sender != owner) revert Unauthorized(msg.sender);
```

This is cheaper to deploy and execute.

### Variables Packing

Re-order structs and state variables to take advantage of 32-byte storage slots.

```solidity
// Bad - uses 3 slots (256 bits, 8 bits, 256 bits)
uint256 a;
uint8 b;
uint256 c;

// Good - uses 2 slots (256 bits, 8+256 bits packed together)
uint256 a;
uint256 c;
uint8 b;
```

### Memory vs Calldata

When a function parameter is read-only, declare it as `calldata` instead of `memory`. Copying from `calldata` to `memory` costs gas. `calldata` is strictly read-only and cheaper.

## 3. Development Tools Integration

### Hardhat

A robust JavaScript/TypeScript Ethereum environment.

- Automatically comes with `console.log()` for Solidity.
- Useful for complex deployment scripts.

### Foundry

The modern standard. Written in Rust. Tests are in written natively in Solidity.

- Fuzzing support built-in natively (`function testFuzz_Mint(uint256 amount) public { ... }`)
- Use `vm` cheatcodes to impersonate users, manipulate timestamps, or track deeply-nested revert messages.

## 4. Source URLs

- [Solidity Docs](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts Handbook](https://docs.openzeppelin.com/contracts/)
- [Consensys Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Hardhat Output/Docs](https://hardhat.org/)
