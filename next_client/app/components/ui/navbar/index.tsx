/* eslint-disable @next/next/no-img-element */
"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import Image from "next/image"
import ActiveLink from "../link"
import { useAccount, useNetwork } from "../../hooks/web3"
import Walletbar from "./Walletbar"

const navigation = [
    { name: "Marketplace", href: "/", current: true },
    { name: "Create", href: "/nft/create", current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
    const { account } = useAccount()
    const { network } = useNetwork()

    console.log(network.data)
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    {account.data?.address}
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <Image
                                        className="hidden lg:block h-10 w-auto"
                                        src="/images/page_logo.png"
                                        alt="Workflow"
                                        width={500}
                                        height={300}
                                        priority
                                    />
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <ActiveLink
                                                key={item.name}
                                                href={item.href}
                                                activeclass="bg-gray-900 text-white"
                                            >
                                                <div
                                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    aria-current={item.current ? "page" : undefined}
                                                >
                                                    {item.name}
                                                </div>
                                            </ActiveLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Walletbar
                                    isInstalled={account.isInstalled}
                                    isLoading={account.isLoading}
                                    connect={account.connect}
                                    account={account}
                                />
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "block px-3 py-2 rounded-md text-base font-medium"
                                    )}
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}
