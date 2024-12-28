// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract NftMarket is ERC721URIStorage {
    constructor() ERC721("CreaturesNFT", "CNFT") {}
}
