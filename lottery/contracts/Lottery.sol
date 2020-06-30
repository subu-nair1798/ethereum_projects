// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.7.0;


contract Lottery {
    address public manager;
    address payable[] public players;

    constructor () public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether,
        "A minimum payment of 0.01 ether is required to enter the lottery");
        players.push(msg.sender);
    }

    // no random number generator by default in solidity
    // hence, a pseudo-random generator (not truly random)
    function randomNumberGenerator() private view returns (uint) {
        // sha3() is a global function
        // keccak256() is equivalent to sha3()
        // keccack256 is the class of the algorithms, sha3 is the instance of it
        // block and now are global variables
        return uint(keccak256(abi.encodePacked(block.difficulty, block.number, players)));
    }

    function pickWinner() public restricted {
        uint index = randomNumberGenerator() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    // when a function which is modified as restricted,
    // the solidity compiler takes the entire code inside the function and
    // adds it in the modifier() in place of the underscore "_"
    // this allows us to write a single modifier for multiple functions
    modifier restricted() {
        require(msg.sender == manager,
        "Only the contract creator can call this function");
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}