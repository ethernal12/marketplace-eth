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
            return NETWORKS[chainId]
        }

    )

    useEffect(() => {

        provider && // if we have provider
            provider.on("chainChanged", chainId => mutate(NETWORKS[parseInt(chainId, 16)])) // convert to int, from hex


    }, [web3])



    return {
        network: {
            data, // current active network name
            
             // is we have an error or data the function chainId has finished loading 
            mutate,
            target: targetNetwork, // imported from .enc file
            isSupported: data === targetNetwork, 
            ...rest// destructurise
        }

        //the current network
    }
}