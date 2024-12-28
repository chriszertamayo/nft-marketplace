import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"

const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        localhost: {
            url: "http://127.0.0.1:7545",
            accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
    },
}

export default config
