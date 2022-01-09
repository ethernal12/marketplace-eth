


import { CourseList } from "@components/UI/course"
import { CourseCard, CourseModal } from "@components/UI/course"
import { BaseLayout } from '@components/UI/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useWeb3 } from '@components/providers'
import { WalletBar } from "@components/UI/web3"
import { useAccount } from "@components/hooks/web3"
import { useNetwork } from "@components/hooks/web3"
import { Button } from "@components/UI/common"
import { OrderModal } from "@components/UI/order"
import { useState } from "react"



function Marketplace({ courses }) {
    const { web3, isLoading } = useWeb3(); // deconstruct the web3Api object and retreive it via useWeb3()
    const { account } = useAccount()
    const { network } = useNetwork()
    const [selectedCourse, setSelectedCourse] = useState(null)
    return (

        <>

            {/* double ternary operator: After loading, check if web3 is loaded */}
            {isLoading ? "Is loading web3" : web3 ? "Web3 Ready" : "Please install Metamask"}
            <div className="py-4">

                <WalletBar
                    address={account.data}

                    network={{
                        target: network.target,
                        data: network.data,
                        isSupported: network.isSupported,
                        isLoading: network.isLoading

                    }}

                />

            </div>


            <CourseList

                courses={courses} >
                {/* // callback function is passed to the courseList and return courseCard as children */}
                {course => <CourseCard
                    key={course.id}
                    course={course}
                    Footer={() =>

                        <div className="mt-4">
                            
                            <Button
                            
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
