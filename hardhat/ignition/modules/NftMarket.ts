// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const NftMarketModule = buildModule("NftMarketModule", (m) => {
    const nftMarketContract = m.contract("NftMarket")

    return { nftMarketContract }
})

export default NftMarketModule
