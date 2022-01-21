import { handler as createAccountHook } from "@components/providers/web3/hooks/useAccount";
import { handler as createNetworkHook } from "@components/providers/web3/hooks/useNetwork";
import { handler as createUseOwnedCoursesHook } from "@components/providers/web3/hooks/useOwnedCourses"


export const setupHooks = ({web3, provider, contract}) => { // use ...deps instead of (web3, provider)


    return {

        useAccount: createAccountHook(web3, provider), // returns the function with the object account, web3 passed from web3.index
        useNetwork: createNetworkHook(web3, provider),
        useOwnedCourses: createUseOwnedCoursesHook(web3, contract),
       
    }
}