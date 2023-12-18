//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ProfileContract {
    struct Profile {
        string name;
        string email;
        address walletAddress;
    }

    mapping(address => Profile) public profiles;

    event ProfileUpdated(address indexed user, string name, string email);

    function updateProfile(string memory name, string memory email) public {
        profiles[msg.sender].name = name;
        profiles[msg.sender].email = email;
        profiles[msg.sender].walletAddress = msg.sender;

        emit ProfileUpdated(msg.sender, name, email);
    }

    function getProfile(address walletAddress) public view returns (Profile memory) {
        return profiles[walletAddress];
    }
}