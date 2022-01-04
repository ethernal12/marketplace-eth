import { useWeb3 } from "@components/providers"
import Link from "next/link"
import { Button } from "@components/UI/common"


import { useAccount } from "@components/hooks/useAccount"

export default function Navbar() {
    const { connect, web3, isWeb3Loaded, isLoading } = useWeb3()
    //1st version
    // const _useAccount = useAccounts(web3); //returns the function
    // const { account } = _useAccount() // deconstruct the function
    //alternate version
    //const {account} = useAccounts(web3)() // calling the function twice because we are returning the function with a
    const {account} = useAccount() // hooks call the function setupHooks and passes the param. web3  which calls the useAccounts double function which returns the returning function on web3? condition
    


    return (


        <section>
            {account}
            
          
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative" aria-label="Global">
                    <div className="flex justify-between items-center">
                        <div>
                            <Link href="/" >
                                <a

                                    className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home
                                </a>
                            </Link>

                            <Link href="/" >
                                <a

                                    className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace
                                </a>
                            </Link>
                            <Link href="/" >
                                <a

                                    className="font-medium mr-8 text-gray-500 hover:text-gray-900">Wishlist
                                </a>
                            </Link>

                            <Link href="/" >
                                <a

                                    className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs
                                </a>
                            </Link>

                        </div>
                        <div>


                            <a href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Company</a>
                            {isLoading ?

                                <Button
                                    onClick={connect}>
                                    Loading...


                                </Button> :
                                isWeb3Loaded ?
                                    <Button
                                        disabled={false}
                                        onClick={connect}>
                                        Connected


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
        </section>)
}