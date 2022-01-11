import { useEthPrice } from "@components/hooks/useEthPrice"
import { useState } from "react"
import { useEffect } from "react"


    

const useCounter = () => {

    const [count, setCount] = useState(0)

    useEffect(() => {

        setInterval(() => {

            setCount(count => count + 1)

        }, 1000)



    }, [])



    return count
}

const SimpleComponent = () => {
    const count = useCounter()
    const {eth} = useEthPrice()

    return (


        <h1>Simple Component Eth price {eth.data} </h1>
    )
}


export default function pageHooks() {
    const {eth} = useEthPrice()


    

    return (

        <>
            <h1>pageHooks Eth price {eth.data} </h1>
            <SimpleComponent />
        </>

    )

}