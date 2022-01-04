import { handler as createUseAccount } from "@components/hooks/handler"; //handler is alias for createUseAccounts


export const setupHooks = web3 => {
   

    return{

        useAccount: createUseAccount(web3) // returns the function with the object account, web3 passed from web3.index
    }
}