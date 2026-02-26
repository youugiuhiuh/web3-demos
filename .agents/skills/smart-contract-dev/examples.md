# Smart Contract Dev Examples

## 1. Minimal ERC20 Implementation with Access Control

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CommunityToken is ERC20, Ownable {
    error MintAmountTooLarge(uint256 amount);

    constructor() ERC20("CommunityToken", "COM") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        if (amount > 1_000_000 * 10**decimals()) {
            revert MintAmountTooLarge(amount);
        }
        _mint(to, amount);
    }
}
```

## 2. Testing with Foundry (Cheatcodes)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {CommunityToken} from "../src/CommunityToken.sol";

contract CommunityTokenTest is Test {
    CommunityToken public token;
    address public owner = address(1);
    address public user = address(2);

    function setUp() public {
        vm.prank(owner); // Sets msg.sender to `owner` for the next call
        token = new CommunityToken();
    }

    function test_MintAsOwner() public {
        vm.prank(owner);
        token.mint(user, 100 * 10 ** 18);
        assertEq(token.balanceOf(user), 100 * 10 ** 18);
    }

    function test_RevertWhen_MintingAsNonOwner() public {
        vm.expectRevert(); // Standard revert expectation
        vm.prank(user);
        token.mint(user, 100);
    }

    function test_RevertWhen_MintingTooMuch() public {
        vm.prank(owner);
        uint256 massiveAmount = 2_000_000 * 10**18;

        // Custom error expectation using abi.encodeWithSelector
        vm.expectRevert(abi.encodeWithSelector(CommunityToken.MintAmountTooLarge.selector, massiveAmount));
        token.mint(user, massiveAmount);
    }
}
```

## 3. CEI & Standard Withdraw (Solidity)

```solidity
pragma solidity ^0.8.24;

contract Vault {
    mapping(address => uint256) public deposits;

    error ZeroBalance();
    error TransferFailed();

    function deposit() external payable {
        deposits[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = deposits[msg.sender];

        // 1. Checks
        if (amount == 0) revert ZeroBalance();

        // 2. Effects
        deposits[msg.sender] = 0;

        // 3. Interactions
        (bool success, ) = msg.sender.call{value: amount}("");
        if (!success) revert TransferFailed();
    }
}
```
