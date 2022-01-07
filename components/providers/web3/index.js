const { createContext, useContext, useState, useEffect, useMemo } = require("react")

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3"
import { setupHooks } from "@components/providers/web3/hooks/setupHooks";

const Web3Context = createContext(null)

//is loading
export default function Web3Provider({ children }) {
    const [web3Api, setWeb3Api] = useState({

        provider: null,
        web3: null,
        contract: null,
        isLoading: null,
        hooks:setupHooks()
    })

    //when its done loading
    useEffect(() => {

        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if (provider) {
                const web3 = new Web3(provider)
                setWeb3Api({
                    provider,
                    web3,
                    contract: null,
                    isLoading: false,
                    hooks:setupHooks(web3, provider)
                })
            }
            else {
                setWeb3Api(({ ...web3Api, isLoading: false }))
                console.error("Please install Metamask.")
            }

        }
        loadProvider()


    }, [])
    // use memo is a react hook that exepts 2 arguments(state, [changes to the state]) deconstructed web3Api and additional states
    //debugger
    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading} = web3Api
        return {

            ...web3Api, // add at the and of the state object 
            isWeb3Loaded: web3 != null, // if its done loading and web3 is true 
            
            connect: web3Api.provider ? //add at the end of web3Api; if we have a provider
            
                async () => {

                    try {

                        await web3Api.provider.request({ method: "eth_requestAccounts" }) // pops-up the metamask login prompter
                      

                    }
                    catch {
                        location.reload()
                    }
                } : // if we do not have a provider

                () => console.log("Cnnot connect to metamask, try reloading your browser please") // if provider is null
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


    return useContext(Web3Context) //we are retreiving the provider using useContext function
}

//function responsible for retreiving the hooks
export function useHooks(hookFetcher) { //callback is a function that has to be passed in to retreive the hooks

    const {hooks} = useWeb3()
  
    return hookFetcher(hooks) 
}