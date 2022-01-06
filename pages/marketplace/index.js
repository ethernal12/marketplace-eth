


import { CourseList } from "@components/UI/course"
import { BaseLayout } from '@components/UI/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useWeb3 } from '@components/providers'
import { WalletBar } from "@components/UI/web3"
import { useAccount } from "@components/hooks/web3/useAccount"
import { useNetwork } from "@components/hooks/web3/useNetwork"



function Marketplace({ courses }) {
    const { web3, isLoading } = useWeb3(); // deconstruct the web3Api object and retreive it via useWeb3()
    const { account } = useAccount()
    const { network } = useNetwork()

    return (

        <>

            {/* double ternary operator: After loading, check if web3 is loaded */}
            {isLoading ? "Is loading web3" : web3 ? "Web3 Ready" : "Please install Metamask"}
            <div className="py-4">
                
                <WalletBar 
                address={account.data} 
                networkId = {network.data}
                />
            </div>


            <CourseList courses={courses} />

        </>

    )
}

Marketplace.Layout = BaseLayout

const Wrapper = ({ ...props }) =>
    <BaseLayout>
        <Marketplace {...props} />
    </BaseLayout>

export default Wrapper

export function getStaticProps() {
    const { data } = getAllCourses() //populate the data object with imported courses

    return {
        props: {
            courses: data // pass data to course object to be used as a prop to display courses

        }


    }
}
