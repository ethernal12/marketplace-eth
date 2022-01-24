
import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/UI/common";
import { MarketplaceHeader } from "@components/UI/common/marketplace";
import { OwnedCourseCard } from "@components/UI/course";
import { BaseLayout } from "@components/UI/layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function OwnedCourses({ courses }) {
    const { account } = useAccount()
    const { ownedCourses } = useOwnedCourses(courses, account.data)


    return (
        <>


            <div className="py-4">
                <MarketplaceHeader />
                <section className="gird grid-cols-1">
                    {/* {JSON.stringify(ownedCourses.data)} */}
                    
                    { ownedCourses.data?.map(course =>

                        <OwnedCourseCard
                        
                        key = {course.id}
                        course = {course}
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


