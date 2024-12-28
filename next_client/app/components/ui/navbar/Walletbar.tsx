/* eslint-disable @next/next/no-img-element */

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import Link from "next/link"
import { FunctionComponent } from "react"

type WalletbarProps = {
    isLoading: boolean
    isInstalled: boolean
    account: any | undefined
    connect: () => void
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

const Walletbar: FunctionComponent<WalletbarProps> = ({
    isInstalled,
    isLoading,
    connect,
    account,
}) => {
    if (isLoading) {
        return (
            <div>
                <button
                    onClick={() => {}}
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Loading ...
                </button>
            </div>
        )
    }

    if (account.data?.address) {
        return (
            <Menu as="div" className="ml-3 relative">
                <div>
                    <MenuButton className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src="/images/default_user_image.png"
                            alt=""
                        />
                    </MenuButton>
                </div>

                <MenuItems className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                        {() => (
                            <button
                                disabled={true}
                                className="disabled:text-gray-500 text-xs block px-4 pt-2 text-gray-700"
                            >
                                {/* {`0x.....${account.data.address.slice(-4)}`} */}
                                {`0x${account.data.address[2]}${account.data.address[3]}${
                                    account.data.address[4]
                                }....${account.data.address.slice(-4)}`}
                            </button>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                            <Link
                                href="/profile"
                                className={classNames(
                                    focus ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                )}
                            >
                                Profile
                            </Link>
                        )}
                    </MenuItem>
                </MenuItems>
            </Menu>
        )
    }

    if (isInstalled) {
        return (
            <div>
                <button
                    onClick={() => {
                        connect()
                    }}
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Connect Wallet
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button
                    onClick={() => {
                        window.open("https://metamask.io", "_ blank")
                    }}
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    No Wallet
                </button>
            </div>
        )
    }
}

export default Walletbar
