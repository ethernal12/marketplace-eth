import { useState, useEffect } from "react"
import useSWR from "swr";


export const handler = (web3, provider) => () => {

    const adminAddresses = {

        "0x887183a9502878152ea4dc090058a660f10be60ebed4fac97e7f2c11b1199ebf": true // keccak256 hashed admin address(from hex input) 
    }


    const { data, mutate, ...rest } = useSWR(() => 
        web3 ? "web3/response" : null,

        async () => {

            const account = await web3.eth.getAccounts()

            return account[0]

        }


    )


    useEffect(() => {

        provider &&
            provider.on("accountsChanged",

                accounts => mutate(accounts[0] ?? null)) // mutate will return the new account every time it is changed


    }


        , [provider])


    return {
        account: {
            data, // is the account we get from swr data
            isAdmin: (data && adminAddresses [web3.utils.keccak256(data)]) ?? false, // ?? checks if it is null
            mutate,
            ...rest
        }
    }

}






