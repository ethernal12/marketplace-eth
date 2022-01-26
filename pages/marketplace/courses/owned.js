
import { useAccount, useNetwork, useOwnedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/UI/common";
import { MarketplaceHeader } from "@components/UI/common/marketplace";
import { OwnedCourseCard } from "@components/UI/course";
import { BaseLayout } from "@components/UI/layout";
import { getAllCourses } from "@content/courses/fetcher";
import Link from "next/link"


export default function OwnedCourses({ courses }) {
    const { network } = useNetwork()
    const { account } = useAccount()
    const { ownedCourses } = useOwnedCourses(courses, account.data)



    return (
        <>


            <div className="py-4">
                <MarketplaceHeader />
                <section className="gird grid-cols-1">
                    {/* isEmpty is added in the enhanceHooks */}
                    {ownedCourses.isEmpty &&
                        <div className="w-1/2 content-center">
                            <Message type="warning">
                                <Link href="/marketplace">
                                    <a><i className="font-underline">Buy courses</i></a>


                                </Link>
                                <div>You don`t own any courses!</div>
                            </Message>

                        </div>


                    }
                    {account.isEmpty &&
                        <div className="w-1/2 content-center">
                            <Message type="warning">

                                <div>Please connect to metamask!</div>
                            </Message>

                        </div>


                    }
                    {network.isEmpty &&
                        <div className="w-1/2 content-center">
                            <Message type="warning">

                                <div>Please connect to metamask!</div>
                            </Message>

                        </div>


                    }

                    {ownedCourses.data?.map(course =>

                        <OwnedCourseCard

                            key={course.id}
                            course={course}
                            ownedCourses={ownedCourses}
                        >

                            <Button>

                                Watch the course
                            </Button>
                            <Message
                                type="warning">

                                Warning
                            </Message>

                        </OwnedCourseCard>


                    )}


                </section>
            </div>
        </>


    )


}
export function getStaticProps() {
    const { data } = getAllCourses() //populate the data object with imported courses

    return {
        props: {
            courses: data // pass data to course object to be used as a prop to display courses

        }


    }
}



OwnedCourses.Layout = BaseLayout


