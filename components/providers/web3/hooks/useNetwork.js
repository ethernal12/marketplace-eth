import { useEffect } from "react";
import useSWR, { mutate } from "swr";


export const handler = (web3, provider) => () => {

    const NETWORKS = {
        1: "Etehreum Main Network",
        3: "Ropsten Test network",
        4: "Rinkby Test network",
        5: "Goerli Test Network",
        42: "Kovan Test Network",
        56: "Binance Smart Chain",
        1337: "Ganache"

    }
    const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

    const {data, mutate, ...rest } = useSWR(() =>

        web3 ? "web3/network" : null,

        async () => {
            
            const chainId = await web3.eth.getChainId()

            if(!chainId){

                throw new Error("No account found, try to refresh your browser")
            }
        
            return NETWORKS[chainId]
        }

    )

    useEffect(() => {

        const mutator = chainId => mutate(NETWORKS[parseInt(chainId, 16)]) // convert to int, from hex
        
            provider?.on("chainChanged", mutator) // mutate will return the new account every time it is changed


            console.log(provider)
                return () => {

                    provider?.removeListener("chainChanged", mutator) //when we are changing the page we are unsubscruibing the event listener accountsChanged
                }
    }
    


        , [provider])

   



    return {
       
            data, // current active network name
            
             // is we have an error or data the function chainId has finished loading 
            mutate,
            target: targetNetwork, // imported from .env file
            isSupported: data === targetNetwork, 
            ...rest// destructurise
       

        //the current network
    }
}