import { useWeb3 } from "@components/providers"
import Link from "next/link"
import { Button } from "@components/UI/common"
import { useRouter } from "next/router"
import { useAccount } from "@components/hooks/web3"
import ActiveLink from "../link"




export default function Navbar() {
    const { connect, web3, isWeb3Loaded, isLoading } = useWeb3()
    //1st version
    // const _useAccount = useAccounts(web3); //returns the function
    // const { account } = _useAccount() // deconstructs the function
    //alternate version
    //const {account} = useAccounts(web3)() // calling the function twice because we are returning the function with a
    const { account } = useAccount() // hooks call the function setupHooks and passes the param. web3  which calls the useAccounts double function which returns the returning function on web3? condition
    const { pathname } = useRouter()

    return (


        <section>

            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative" aria-label="Global">
                    <div className="flex justify-between items-center">
                        <div>
                            <ActiveLink
                                href="/"
                            >
                                <a

                                    className="font-medium mr-8 text-indigo-600 ">Home
                                </a>
                            </ActiveLink>

                            <ActiveLink
                                href="/marketplace"
                            >
                                <a

                                    className="font-medium mr-8 text-indigo-600  ">Marketplace
                                </a>
                            </ActiveLink>
                            <ActiveLink
                                href="/wishlist"

                            >
                                <a

                                    className="font-medium mr-8 text-indigo-600 ">Wishlist
                                </a>
                            </ActiveLink>

                            <ActiveLink
                                href="/blogs"
                            >
                                <a

                                    className="font-medium mr-8 text-indigo-600  ">Blogs
                                </a>
                            </ActiveLink>

                        </div>
                        <div>


                            <a href="#" className="font-medium mr-8 text-indigo-600 hover:text-gray-900">Company</a>
                            {isLoading ?

                                <Button
                                    onClick={connect}>
                                    Loading...


                                </Button> :
                                isWeb3Loaded ?
                                    account.data ?
                                        <Button
                                            variant="purple"
                                            hovarable={false}
                                        >
                                            Hi there {account.isAdmin && "Admin"}


                                        </Button> :
                                        <Button
                                            disabled={false}
                                            onClick={connect}>
                                            Connect Metamask


                                        </Button> :
                                    <Button
                                        disabled={false}
                                        onClick={() => window.open("https://metamask.io/")}>
                                        Install metamask
                                    </Button>

                            }

                        </div>
                    </div>
                </nav>
            </div>
            {account.data &&
                !pathname.includes("/marketplace") &&
                <div className="flex justify-end sm:px-6 pt-1 lg:py-2 lg:px-8">
                    <div className="text-white bg-indigo-600 rounded-md p-2">
                        {/* account.data is because of useSWR() */}
                        {account.data}
                    </div>


                </div>}

        </section>)
}