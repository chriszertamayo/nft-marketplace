import { MetaMaskInpageProvider } from "@metamask/providers"
import { ethers, Contract, toBigInt } from "ethers"
import { contractABI, contractAddress } from "./contractInfo"
import { setupHooks, Web3Hooks } from "../../hooks/web3/setupHooks"
import { Web3Dependencies } from "@/app/types/hooks"

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider
    }
}

type Nullable<T> = {
    [P in keyof T]: T[P] | null
}

export type Web3State = {
    isLoading: boolean //true while loading web3state
    hooks: Web3Hooks
} & Nullable<Web3Dependencies>

export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        hooks: setupHooks({ isLoading: true } as any),
    }
}

export const createWeb3State = ({ ethereum, provider, contract, isLoading }: Web3Dependencies) => {
    return {
        ethereum,
        provider,
        contract,
        isLoading,
        hooks: setupHooks({ ethereum, provider, contract, isLoading }),
    }
}

export const loadContract = async (): Promise<Contract> => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545")
    const signer = await provider.getSigner()

    const chainId = (await provider.getNetwork()).chainId
    if (chainId !== toBigInt(1337)) {
        return Promise.reject("Network must be defined locally in 1337 ganache")
    }

    if (contractAddress) {
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        return contract
    } else {
        return Promise.reject(`Contract cannot be loaded`)
    }
}
