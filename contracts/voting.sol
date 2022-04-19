// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Voting {
    uint storedData;

    mapping(bytes32 => uint) public nbVotes;
    bytes32[] public candidates;

    constructor(bytes32[] memory nameCandidates) {
        candidates = nameCandidates;  
    }

    function verify_candidate(bytes32 nameCandidate) public view returns (bool) {
        for (uint i = 0; i != candidates.length; i++) {
            if (candidates[i] == nameCandidate)
                return (true);
        }
        return (false);
    }

    function vote(bytes32 nameCandidate) public {
        if (!verify_candidate(nameCandidate)) {
            return;
        }
        nbVotes[nameCandidate]++;
    }

    function get_number_votes(bytes32 nameCandidate) public view returns (uint) {
        if (!verify_candidate(nameCandidate)) {
            return (0);
        }
        return nbVotes[nameCandidate];
    }
}