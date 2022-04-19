// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Owner {
    uint storedData;

    constructor() public {}

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}