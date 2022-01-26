import { useHooks } from "@components/providers/web3"


const _isEmpty = data => {
    return (
        
      data == null ||
      data === "" ||
      (Array.isArray(data) && data.length === 0) ||
      (data.constructor === Object && Object.keys(data).length === 0)
    )
  }



const enhanceHooks = swrRes => {
    const { data, error } = swrRes
    const hasInitialResponse = !!(data || error)
    const isEmpty = hasInitialResponse && _isEmpty(data)

    return {

        ...swrRes,
        isEmpty,
        hasInitialResponse// added to all of the responses at the end
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
    const res = enhanceHooks(useHooks(hooks => hooks.useOwnedCourses)(...args))
    return {

        ownedCourses: res
    }
}

export const useOwnedCourse = (...args) => {


    const res = enhanceHooks(useHooks(hooks => hooks.useOwnedCourse)(...args))
    return {

        ownedCourse: res
    }
}

export const useManageCourses = (...args) => {


    const res = enhanceHooks(useHooks(hooks => hooks.useManageCourses)(...args))
    return {

        manageCourses: res
    }
}



export const useWalletnInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()


    return {
        account,
        network,
        walletInfo: !!(network.data && network.isSupported), // !! if one of the conditions is undefined || null it returnes false instead of undefined or null

    }




}