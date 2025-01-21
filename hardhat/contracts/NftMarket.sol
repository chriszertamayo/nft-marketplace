// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract NftMarket is ERC721URIStorage {
    // how many items listed in the marketplace
    uint256 private _listedItems;
    uint256 private _tokenIds;

    constructor() ERC721("CreaturesNFT", "CNFT") {}

    function mintToken(string memory tokenURI) public payable returns (uint) {
        uint256 newTokenId = _tokenIds++;
        _listedItems++;

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}
