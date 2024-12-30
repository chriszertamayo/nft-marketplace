import { CryptoHookFactory } from "@/app/types/hooks"
import useSWR from "swr"

const NETWORKS: { [k: string]: string } = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "RInkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache",
}

const targetId = <string>process.env.NEXT_PUBLIC_TARGET_CHAIN_ID
const targetNetwork = NETWORKS[targetId]

type UseNetworkResponse = {
    isLoading: boolean
    isSupported: boolean
    targetNetwork: string
}

type NetworkHookFactory = CryptoHookFactory<any, UseNetworkResponse>

export type UseNetworkHook = ReturnType<NetworkHookFactory>

//deps -> provider, ethereum, contract (web3Sate)
export const hookFactory: NetworkHookFactory =
    ({ provider, isLoading }) =>
    () => {
        const { data, isValidating, ...swr } = useSWR(
            provider ? "web3/useNetwork" : null,
            async () => {
                const chaindId = parseInt((await provider!.getNetwork()).chainId.toString())

                if (!chaindId) {
                    throw "Cannot retreive network. Please refresh the browser."
                }

                return NETWORKS[chaindId]
            },
            {
                revalidateOnFocus: false,
            }
        )

        return {
            ...swr,
            data,
            isValidating,
            targetNetwork,
            isSupported: data === targetNetwork,
            isLoading: isLoading || isValidating,
        }
    }
