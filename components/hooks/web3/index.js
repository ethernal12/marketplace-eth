import { useHooks } from "@components/providers/web3"


const enhanceHooks = swrRes => {

    return {

        ...swrRes,
        initialResponse: swrRes.data || swrRes.error // added to all of the responses at the end
    }

}


export const useAccount = () => {


    const swrRes = enhanceHooks(useHooks(hooks => hooks.useAccount)())// () executes the function


    return {

        account: swrRes

    }

}

export const useNetwork = () => {


    const swrRes = enhanceHooks(useHooks(hooks => hooks.useNetwork)())// () executes the function


    return {

        network: swrRes

    }

}

export const useWalletnInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()
    
    return {
        account,
        network,
        walletInfo: !!(network.data && network.isSupported) // !! if one of the conditions is undefined || null it returnes false instead of undefined or null

    }




}