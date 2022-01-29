
import { useAccount } from "@components/hooks/web3"
import Breadcrumb from "@components/UI/common/breadcrumbs"
import { EthRates, WalletBar } from "@components/UI/web3"



const LINKS = [
    {
        href: "/marketplace",
        value: "Buy"
    },
    {
        href: "/marketplace/courses/manage",
        value: "Manage courses",
        requireAdmin: true
    },

    {
        href: "/marketplace/courses/owned",
        value: "My courses"
        
    }
]


export default function MarketplaceHeader() {


    const {account} = useAccount()
 

    return (
        <>

            <WalletBar />
            <EthRates />
            {/* breadcrumbs=>map.LINKS ActiveLink=>Link React.cloneElement(children) */}

            <div className="flex flex-row-reverse">
                <Breadcrumb 
                isAdmin = {account.isAdmin}
                
                items={LINKS}  />
            </div>

        </>


    )
}


