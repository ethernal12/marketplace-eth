import { useAccount, useNetwork } from "@components/hooks/web3"
import { useWeb3, Web3Provider } from "@components/providers"
import Image from "next/image"

export default function WalletBar() {
    const { account } = useAccount()
    const { network } = useNetwork()
    const { isWeb3Loaded } = useWeb3()
    const install = "install"
    const connect = "connect to"



    return (
        <section className="text-white bg-indigo-600 rounded-lg">
            <div className="p-8 ">
                <h1 className="text-2xl">Hello, {account.data}</h1>
                <h2 className="subtitle mb-5 text-xl">I hope you are having a great day!</h2>

                <div className="flex justify-between items-center">
                    <div className="sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
                                Learn how to purchase
                            </a>
                        </div>

                    </div>


                    <div>
                        {!network.isLoading && !network.isSupported && isWeb3Loaded &&


                            <div className="p-4 rounded-lg bg-rose-600 ">
                                <div>Connected to the wrong network!
                                    <div>Connect to:
                                        <strong className=" text-2xl">{network.target}</strong>


                                    </div>


                                </div>

                            </div>

                        }
                        {/* -------------have to refactor conditionals for installing and connecting metamask ------------------*/}
                        {!isWeb3Loaded && !account.data &&

                            <div className="flex items-center rounded-md bg-orange-600 py-4"><span className="px-2">{`Please ${install} metamask using the top button...  `}</span><strong className="text-2xl"></strong>


                            </div>


                        }

                        {!account.data && isWeb3Loaded &&

                            <div className="flex items-center rounded-md bg-orange-600 py-4"><span className="px-2">{`Please ${connect} metamask using the top button...  `}</span><strong className="text-2xl"></strong>


                            </div>


                        }
                        {account.data && isWeb3Loaded &&


                            <div className="flex items-center"><span className="px-2">Currently on: </span><strong className="text-2xl">


                                {network.data}</strong>
                                {network.isSupported && network.data ?
                                    <Image
                                        layout="fixed"
                                        width="35"
                                        height="35"
                                        src="/png-transparent-green-check-check-mark.png"

                                    /> :
                                    <Image
                                        layout="fixed"
                                        width="35"
                                        height="35"
                                        src="/red-cross-mark.fw.png"

                                    />


                                }


                            </div>
                        }
                        {/* -------------have to refactor conditionals for installing and connecting metamask ------------------*/}


                    </div>
                </div>
            </div>
        </section>


    )
}