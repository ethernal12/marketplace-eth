import { CourseList } from "@components/UI/course"
import { CourseCard } from "@components/UI/course"
import { BaseLayout } from '@components/UI/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useWeb3 } from '@components/providers'
import { useWalletnInfo, useAccount, useOwnedCourses, useNetwork } from "@components/hooks/web3"
import { Button, Loader, Message } from "@components/UI/common"
import { OrderModal } from "@components/UI/order"
import { useState } from "react"
import { MarketplaceHeader } from "@components/UI/common/marketplace"
import { createCourseHash } from "@utils/courseHash"
import { createProof } from "@utils/createProof"
import useSWR from "swr"



function Marketplace({ courses }) {
    const { web3, isLoading, contract, requireInstall } = useWeb3(); // deconstruct the web3Api object and retreive it via useWeb3()

    const [selectedCourse, setSelectedCourse] = useState(null)
    const [isNewPurchase, setIsNewPurchase] = useState(true)
    const { account } = useAccount()
    const { isSupported } = useNetwork()
    const { hasConnectedWallet, isConnecting } = useWalletnInfo()

    const { network } = useNetwork()
    const { walletInfo } = useWalletnInfo()
    // indentify  purchased courses

    const { ownedCourses } = useOwnedCourses(courses, account.data, network.data)

    const purchaseCourse = async order => {



       

    }


    const repurchaseCourse = async order => {


        if(isNewPurchase){

            const courseIdToHex = web3.utils.utf8ToHex(selectedCourse.id)

            const coursePrice = web3.utils.toWei(String(order.price))
    
            const orderHash = createCourseHash(web3)(selectedCourse.id, account.data)
            const createCourseProof = createProof(web3)(orderHash, order.email)
    
    
    
            try {
                await contract.methods.purchaseCourse(
                    courseIdToHex,
                    createCourseProof
                ).send({ from: account.data, value: coursePrice })
    
            } catch (error) {
                alert("Data was not sent to the blockhain " + error)
            }
        }
        else{

            const coursePrice = web3.utils.toWei(String(order.price))
            const orderHash = createCourseHash(web3)(selectedCourse.id, account.data)
            try {
    
    
                await contract.methods.repurchaseCourse(orderHash)
                    .send({ from: account.data, value: coursePrice })
    
            } catch (error) {
                console.log(error)
            }

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

                {course => {
                    const owned = ownedCourses.lookupTable[course.id]
                    return (
                        <CourseCard
                            state={owned?.state}
                            key={course.id}
                            course={course}
                            disabled={!hasConnectedWallet} // if network.data && network.isSupported &&

                            Footer={() => {


                                if (!ownedCourses.hasInitialResponse) {
                                    return (
                                        <div className="mt-4 ">

                                            <Loader size="md" />
                                            <Button
                                                disabled={true}

                                                variant="lightPurple">

                                                Loading state...
                                            </Button>
                                        </div>
                                    )



                                }


                                if (owned) {
                                    return (

                                        <>
                                            <div className="mt-4 ">

                                                <Button
                                                    disabled={true}
                                                    variant="orange">

                                                    Owned &#10003;
                                                </Button>

                                                <div>
                                                    {owned.state === "deactivated" &&


                                                        <Button
                                                            disabled={false}
                                                            onClick={() => { 
                                                                setIsNewPurchase(false) 
                                                                setSelectedCourse(course)
                                                            
                                                            }}
                                                            variant="lightGreen">


                                                            Repurchase course
                                                        </Button>

                                                    }
                                                </div>

                                            </div>







                                        </>
                                    )



                                }

                                if (!hasConnectedWallet) {

                                    return (
                                        <div className="mt-4 ">
                                            <Button
                                                disabled={true}

                                                variant="lightPurple">

                                                Install
                                            </Button>
                                        </div>
                                    )
                                }

                                if (isConnecting) {

                                    return (

                                        <div>
                                            <Button
                                                disabled={true}

                                                variant="lightPurple">

                                                <Loader size="sm" />
                                            </Button></div>
                                    )



                                }

                                return (


                                    <Button
                                        disabled={!hasConnectedWallet}
                                        onClick={() => {
                                            setSelectedCourse(course)
                                            setIsNewPurchase(true)

                                        }}
                                        variant="lightPurple">

                                        Purchase
                                    </Button>
                                )
                            }
                            }
                        />
                    )
                }
                }



            </CourseList>

            {/* only content from modal */}
            {
                selectedCourse &&
                <OrderModal
                    isNewPurchase={isNewPurchase}
                    onSubmit={repurchaseCourse}
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
