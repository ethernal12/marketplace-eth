const { createContext, useContext, useState, useEffect, useMemo } = require("react")

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3"
import { setupHooks } from "@components/providers/web3/hooks/setupHooks";
import { loadContract } from "utils/loadContract";

const Web3Context = createContext(null)

const setListeners = provider =>{
    provider.on("chainChanged", _ => window.location.reload())

}


const createWeb3State = ({ web3, provider, contract, isLoading}) => {
    
    return {
        web3,
        provider,
        contract,
        isLoading,
        hooks: setupHooks({ web3, provider, contract })

    }

}

export default function Web3Provider({ children }) {
    
    const [web3Api, setWeb3Api] = useState(
        createWeb3State({
            web3: null,
            provider: null,
            contract: null,
            isLoading: true


        }))

    //when its done loading
    useEffect(() => {


        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            setListeners(provider)


            if (provider) {
                const web3 = new Web3(provider)
                const contract = await loadContract("Marketplace", web3)
                
                setWeb3Api(
                    
                    createWeb3State({
                        web3,
                        provider,
                        contract,
                        isLoading: false

                        
                    }))
            }
            else {
                setWeb3Api(({ ...web3Api, isLoading: false }))
                console.error("Please install Metamask.")
            }

        }
        loadProvider()


    }, [])
    // use memo is a react hook that exepts 2 arguments(state, [changes to the state]) deconstructed web3Api and additional states
   
    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading } = web3Api
        return {

            ...web3Api, // add at the and of the state object 
            isWeb3Loaded: web3 != null, // if its done loading and web3 is true 
            requireInstall: !isLoading && !web3 ,

            connect: provider ? //add at the end of web3Api; if we have a provider

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
export function useHooks(hookFetcher) { //hookefetcher is a function that has to be passed in to retreive the hooks
   
    const { hooks } = useWeb3()
    
    return hookFetcher(hooks)
}