import { handler } from "@components/hooks/handler"; //handler is alias for createUseAccounts


export const setupHooks = (...deps) => { // use ...deps instead of web3, provider
   

    return{

        useAccount: handler(...deps) // returns the function with the object account, web3 passed from web3.index
    }
}