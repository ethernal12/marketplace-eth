const { createContext, useContext, useState, useEffect } = require("react")
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3"

const Web3Context = createContext(null)

export default function Web3Provider({ children }) {
    const [web3Api, setWeb3Api] = useState({

        provider: null,
        web3: null,
        contract: null,
        isInitialized: null
    })

    useEffect(() => {

        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if (provider) {
                const web3 = new Web3(provider)
                setWeb3Api({
                    provider,
                    web3,
                    contract: null,
                    isLoading: false

                })
            }
            else {
                setWeb3Api(({ ...web3Api, isLoading: false }))
                console.error("Please install Metamask.")
            }

        }
        loadProvider()


    }, [])

    const _web3Api = useMemo(() => {

        return {

            ...web3Api,
            connect: () => console.log("Trying to connect!"),
            test: () => console.log("Hello world")
        }
    }, [web3Api])

    return (
        // all the pages (children) can access web3Api objects
        <Web3Context.Provider value={_web3Api}>

            {children}

        </Web3Context.Provider>

    )


}

export function useWeb3() {


    return useContext(Web3Context) //we are retreiving the provider using this function
}