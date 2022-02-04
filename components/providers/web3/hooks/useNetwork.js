import useSWR from "swr"

export const handler = (web3) => () => {

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

    const {data, ...rest } = useSWR(() => web3 ? "web3/network" : null,

        async () => {
            
            const chainId = await web3.eth.getChainId()

            if(!chainId){

                throw new Error("No account found, try to refresh your browser")
            }
        
            return NETWORKS[chainId]
        }

    )

   

   



    return {
       
            data, // current active network name
            
             // is we have an error or data the function chainId has finished loading 
         
            target: targetNetwork, // imported from .env file
            isSupported: data === targetNetwork, 
            ...rest// destructurise
       

        //the current network
    }
}