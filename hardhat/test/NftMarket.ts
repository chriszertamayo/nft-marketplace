import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { assert, expect } from "chai"
import hre, { ethers } from "hardhat"

describe("NftMarket", function () {
    let NftMarket
    let nftMarket
    let owner
    let addr1
    let addr2
    let tokenURI = "https://example.com/nft/1"

    async function deployNftMarketFixture() {
        ;[owner, addr1, addr2] = await ethers.getSigners()
        NftMarket = await hre.ethers.getContractFactory("NftMarket")
        nftMarket = await NftMarket.deploy()
        return { nftMarket, owner, addr1, addr2 }
    }


})
