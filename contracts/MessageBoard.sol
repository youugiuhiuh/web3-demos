// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MessageBoard
 * @dev A simple smart contract that allows anyone to set and read a public message.
 * Follows Web3 best practices for gas optimization and security.
 */
contract MessageBoard {
    // The current message stored on the blockchain
    string public latestMessage;

    // Event emitted when the message is updated. 
    // `indexed` allows frontends to filter events cheaply by the sender's address.
    event MessageUpdated(address indexed sender, string newMsg);

    /**
     * @dev Sets a new message on the board.
     * @param _msg The new message. 
     * Note: Using `calldata` instead of `memory` is a gas optimization for read-only string parameters.
     */
    function setMessage(string calldata _msg) public {
        // 1. Effects: Update the state variable
        latestMessage = _msg;
        
        // 2. Interactions: Emit the event so off-chain applications (dApps) can listen to it
        emit MessageUpdated(msg.sender, _msg);
    }

    /**
     * @dev Returns the current message.
     * @return The latest message string.
     */
    function getMessage() public view returns (string memory) {
        return latestMessage;
    }
}
