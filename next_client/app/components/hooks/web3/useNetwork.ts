import { CryptoHookFactory } from "@/app/types/hooks"
import useSWR from "swr"

type UseNetworkResponse = {
    isLoading: boolean
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
                return "Testing network"
            },
            {
                revalidateOnFocus: false,
            }
        )

        return {
            ...swr,
            data,
            isValidating,
            isLoading: isLoading || isValidating,
        }
    }
