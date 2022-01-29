
import { useEthPrice } from "@components/hooks/useEthPrice"
import Image from "next/image"
import { ETHimageImport } from "utils/ETHimageImport"

export default function EthRates() {
    const { eth } = useEthPrice()

    return (


        <div className="grid grid-cols-4 mb-5">
            <div className="flex flex-1 items-stretch text-center">
                <div className="p-10 border drop-shadow rounded-md">
                    <div className="flex items-center">
                        <ETHimageImport />
                        <span className="text-2xl font-bold">={eth.data}$ </span>
                    </div>
                    <p className="text-xl text-gray-500">Current eth Price</p>
                </div>
            </div>
            <div className="flex flex-1 items-stretch text-center">
                <div className="p-10 border drop-shadow rounded-md ">
                    <div className="flex items-center">
                        
                        <span className="text-2xl font-bold ">{eth.perCourse}
                        <ETHimageImport />
                        

                        </span>
                        
                        <span className="text-2xl font-bold" >
                       

                            = 15$
                            
                        </span>

                    </div>
                    <p className="text-xl text-gray-500">Price per course</p>
                </div>
            </div>
        </div>


    )


}


