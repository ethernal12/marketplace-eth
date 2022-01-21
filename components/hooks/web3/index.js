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

export const useOwnedCourses = (...args) => {

    //hooks goes to web3.index and exectues the function 
    // export function useHooks(hookFetcher) { //callback is a function that has to be passed in to retreive the hooks

    //     const { hooks } = useWeb3() // setWeb3Api({hooks: setupHooks(web3, provider)}

    //     return hookFetcher(hooks)
    // }


// goes to web3/index.js and executes the function useHooks(hookFetcher) that goes to setupHooks and returns the actual hook
    const res = useHooks(hooks => hooks.useOwnedCourses)(...args)
    return {

        ownedCourses: { data: res }
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