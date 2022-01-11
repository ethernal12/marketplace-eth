
import Breadcrumb from "@components/UI/common/breadcrumbs"
import { EthRates, WalletBar } from "@components/UI/web3"


export default function MarketplaceHeader() {





    return (
        <>

            <WalletBar/>
            <EthRates/>
            <div className="flex flex-row-reverse">
                <Breadcrumb />
            </div>

        </>


    )
}


