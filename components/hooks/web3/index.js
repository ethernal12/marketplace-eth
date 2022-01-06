import { useHooks } from "@components/providers/web3"


const enhanceHooks = swrRes =>{

    return{

        ...swrRes,
        initialResponse: swrRes.data || swrRes.error
    }

}


export const useAccount = () => {


    const swrRes =  enhanceHooks (useHooks(hooks => hooks.useAccount)())// () executes the function


    return {

        account:swrRes
        
    }

}

export const useNetwork = () => {


    const swrRes = enhanceHooks (useHooks(hooks => hooks.useNetwork)())// () executes the function


    return {

        network:swrRes
        
    }

}