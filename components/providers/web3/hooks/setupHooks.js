import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createUseOwnedCoursesHook } from "@components/providers/web3/hooks/useOwnedCourses"
import { handler as createUseOwnedCourseHook } from "@components/providers/web3/hooks/useOwnedCourse"
import { handler as createUseManageCoursesHook } from "@components/providers/web3/hooks/useManageCourses"

export const setupHooks = ({ web3, provider, contract }) => { // use ...deps instead of (web3, provider)


    return {

        useAccount: createAccountHook(web3, provider), // returns the function with the object account, web3 passed from web3.index
        useNetwork: createNetworkHook(web3),
        useOwnedCourses: createUseOwnedCoursesHook(web3, contract),
        useOwnedCourse: createUseOwnedCourseHook(web3, contract),
        useManageCourses: createUseManageCoursesHook(web3, contract)
    }
}