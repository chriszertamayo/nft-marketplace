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
        NftMarket = await hre.ethers.getContractFactory("NftMarket")
        nftMarket = await NftMarket.deploy()
        return { nftMarket, owner, addr1, addr2 }
    }

    describe("Mint token", function () {
        it("should resolve into true value", async () => {
            const accounts = await hre.ethers.getSigners()
            console.log(accounts)
            assert(false, "Value is NOT true")
        })
    })
})
