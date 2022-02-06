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
import { toast } from 'react-toastify';
import { withToast } from "@utils/toast"




function Marketplace({ courses }) {
    const { web3, isLoading, contract, requireInstall } = useWeb3(); // deconstruct the web3Api object and retreive it via useWeb3()
    const [busyCourseID, setBusyCourseID] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [isNewPurchase, setIsNewPurchase] = useState(true)
    const { account } = useAccount()
    const { isSupported } = useNetwork()
    const { hasConnectedWallet, isConnecting } = useWalletnInfo()

    const { network } = useNetwork()
    const { walletInfo } = useWalletnInfo()
    // indentify  purchased courses

    const { ownedCourses } = useOwnedCourses(courses, account.data, network.data)

    const purchaseCourse = async (coursePrice, courseIdToHex, createCourseProof) => {


        try {
            const result = await contract.methods.purchaseCourse(
                courseIdToHex,
                createCourseProof
            ).send({ from: account.data, value: coursePrice })
            ownedCourses.mutate()
            return result
        } catch (error) {
            throw new Error.message
        } finally {
            setBusyCourseID(null)
        }


    }

    const repurchaseCourse = async (coursePrice, orderHash) => {


        try {
            const result = await contract.methods.repurchaseCourse(orderHash)
                .send({ from: account.data, value: coursePrice })
                ownedCourses.mutate()
            return result
        } catch (error) {
            throw new Error.message
        } finally {
            setBusyCourseID(null)
        }


    }




    const processPurchase = async (order, course) => {

        if (isNewPurchase) {



            const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)
            const coursePrice = web3.utils.toWei(String(order.price))
            setBusyCourseID(course.id)
            const orderHash = createCourseHash(web3)(selectedCourse.id, account.data)
            const createCourseProof = createProof(web3)(orderHash, order.email)


            withToast(purchaseCourse(coursePrice, hexCourseId, createCourseProof))



        }
        else {

            const coursePrice = web3.utils.toWei(String(order.price))
            const orderHash = createCourseHash(web3)(selectedCourse.id, account.data)

            withToast(repurchaseCourse(coursePrice, orderHash))

        }


    }

    const cleanupModal = () => {


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
                                                {hasConnectedWallet ? "Loading state..." : "Connect"}
                                              
                                            </Button>
                                        </div>
                                    )



                                }

                                const isBusy = busyCourseID === course.id
                               
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
                                        {

                                            isBusy ?

                                                <div className="flex">

                                                    <Loader size = "sm"/>
                                                    <div className="ml2">In progress...</div>
                                                </div> :
                                                <div>Purchase</div>


                                        }

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
                    onSubmit={(order, course) => { processPurchase(order, course) }}
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
