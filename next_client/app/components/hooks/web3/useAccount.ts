import { CryptoHookFactory } from "@/app/types/hooks"
import { useEffect } from "react"
import useSWR from "swr"

type UseAccountResponse = {
    connect: () => void
    isLoading: boolean
    isInstalled: boolean
}

type AccountHookFactory = CryptoHookFactory<any, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

//deps -> provider, ethereum, contract (web3Sate)
export const hookFactory: AccountHookFactory =
    ({ provider, ethereum, isLoading }) =>
    () => {
        const { data, mutate, isValidating, ...swr } = useSWR(
            provider ? "web3/useAccount" : null,
            async () => {
                const accounts = await provider!.listAccounts()
                const account = accounts[0] as unknown as string

                if (!account) {
                    throw "Cannot retrieve account! Please to web3 wallet"
                }

                return account
            },
            {
                revalidateOnFocus: false,
                shouldRetryOnError: false,
            }
        )

        useEffect(() => {
            ethereum?.on("accountsChanged", handleAccountsChanged)
            return () => {
                ethereum?.removeListener("accountsChanged", handleAccountsChanged)
            }
        })

        const handleAccountsChanged = (...args: unknown[]) => {
            const accounts = args[0] as string[]
            if (accounts.length === 0) {
                console.error("Please, connect to web3 wallet")
            } else if (accounts[0] !== data) {
                mutate(accounts[0])
            }
        }

        const connect = async () => {
            try {
                ethereum?.request({ method: "eth_requestAccounts" })
            } catch (e) {
                console.error(e)
            }
        }

        return {
            ...swr,
            data,
            isValidating,
            isLoading: isLoading as boolean,
            isInstalled: ethereum?.isMetaMask || false,
            mutate,
            connect,
        }
    }
