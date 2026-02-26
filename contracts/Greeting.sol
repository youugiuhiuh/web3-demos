// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Greeting {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory _msg) public {
        message = _msg;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
