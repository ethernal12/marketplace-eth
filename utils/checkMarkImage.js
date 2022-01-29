
import Image from "next/image"


export const CheckMarkImage = ({ networkIsSupported, networkData }) => {
   

    return (
        <>


            {
                networkIsSupported && networkData ?
                    <Image

                        layout="fixed"
                        width="35"
                        height="35"
                        src="/png-transparent-green-check-check-mark.png" />

                    :
                    <Image

                        layout="fixed"
                        width="35"
                        height="35"
                        src="/red-cross-mark.fw.png">

                    </Image>
            }
        </>
    )


}