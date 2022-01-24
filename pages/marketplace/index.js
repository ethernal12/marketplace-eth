import { CourseList } from "@components/UI/course"
import { CourseCard } from "@components/UI/course"
import { BaseLayout } from '@components/UI/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useWeb3 } from '@components/providers'
import { useWalletnInfo, useAccount, useOwnedCourses } from "@components/hooks/web3"
import { Button } from "@components/UI/common"
import { OrderModal } from "@components/UI/order"
import { useState } from "react"
import { MarketplaceHeader } from "@components/UI/common/marketplace"
import { EthRates } from "@components/UI/web3"



function Marketplace({ courses }) {
    const { web3, isLoading, contract } = useWeb3(); // deconstruct the web3Api object and retreive it via useWeb3()

    const [selectedCourse, setSelectedCourse] = useState(null)
    const { account } = useAccount()
    const { canPurchaseCourse } = useWalletnInfo()

    const { walletInfo } = useWalletnInfo()
    // indentify  purchased courses
    
    const { ownedCourses } = useOwnedCourses(courses, account.data)

    const purchaseCourse = async order => {
        const courseIdToHex = web3.utils.utf8ToHex(selectedCourse.id)

        console.log(courseIdToHex)

        const orderHash = web3.utils.soliditySha3(
            { type: "bytes16", value: courseIdToHex },
            { type: "address", value: account.data })



        const emailHash = web3.utils.sha3(order.email)
        const coursePrice = web3.utils.toWei(String(order.price))

        const proof = web3.utils.soliditySha3(
            { type: "bytes32", value: orderHash },
            { type: "bytes32", value: emailHash }
        )
        try {
            await contract.methods.purchaseCourse(
                courseIdToHex,
                proof
            ).send({ from: account.data, value: coursePrice })

        } catch (error) {
            alert("Data was not sent to the blockhain " + error)
        }

    }

    return (

        <>

            {/* double ternary operator: After loading, check if web3 is loaded */}
            {/* {isLoading ? "Is loading web3" : web3 ? "Web3 Ready" : "Please install Metamask"} */}
            <div className="py-4">
                <MarketplaceHeader />


            </div>


            <CourseList

                courses={courses} >
                {/* // callback function is passed to the courseList and return courseCard as children */}
               
                {course => <CourseCard
                 
                    key={course.id}
                    course={course}
                    disabled={!walletInfo} // if network.data && network.isSupported &&
                  
                    Footer={() =>

                        <div className="mt-4">



                            <Button
                                disabled={!walletInfo}
                                onClick={() => setSelectedCourse(course)}
                                variant="lightPurple">

                                Purchase
                            </Button>






                        </div>
 
                    }
                   
                />}
              
            </CourseList>
         
            {/* only content from modal */}
            {
                selectedCourse &&
                <OrderModal

                    onSubmit={purchaseCourse}
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />


            }



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
