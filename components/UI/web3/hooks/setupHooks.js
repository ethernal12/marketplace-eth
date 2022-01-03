import { useAccounts } from "./useAccounts";


const DEFAULT_HOOKS = {
   useAccounts: () => {} //return an empty function


}



export const setupHooks = web3 => {


    return{

        useAccounts: useAccounts(web3) // returns the function with the object account
    }
}