//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TokensContract {
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    // receive() external payable {
    //     balances[msg.sender] += msg.value;
    // }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balances[msg.sender] >= value, "Insufficient balance");

        balances[msg.sender] -= value;
        balances[to] += value;

        emit Transfer(msg.sender, to, value);

        return true;
    }
}
