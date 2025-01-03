"use client"
import React, {
    createContext,
    FunctionComponent,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react"
import { createDefaultState, loadContract, Web3State, createWeb3State } from "./utils"
import { ethers } from "ethers"
import { MetaMaskInpageProvider } from "@metamask/providers"

const pageReload = () => window.location.reload()

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked())
    if (isLocked) pageReload()
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("chainChanged", pageReload)
    ethereum.on("accountsChanged", handleAccount(ethereum))
}
const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum?.removeListener("chainChanged", pageReload)
    ethereum?.removeListener("accountsChanged", handleAccount)
}

const Web3Context = createContext<Web3State>(createDefaultState())

const Web3Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

    useEffect(() => {
        const initWeb3 = async () => {
            // await window.ethereum.request({ method: "eth_requestAccounts" })

            try {
                const provider = new ethers.BrowserProvider(window.ethereum as any)
                const contract = await loadContract()

                setGlobalListeners(window.ethereum)
                setWeb3Api(
                    createWeb3State({
                        ethereum: window.ethereum,
                        provider,
                        contract,
                        isLoading: false,
                    })
                )
            } catch (e: any) {
                console.error("PLease,install web3 wallet")
                setWeb3Api((api) =>
                    createWeb3State({
                        ...(api as any),
                        isLoading: false,
                    })
                )
            }
        }

        initWeb3()
        return () => removeGlobalListeners(window.ethereum)
    }, [])

    return <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
}

export function useWeb3() {
    return useContext(Web3Context)
}

export function useHooks() {
    const { hooks } = useWeb3()
    return hooks
}

export default Web3Provider
