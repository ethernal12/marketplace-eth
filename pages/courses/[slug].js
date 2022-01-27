import { useAccount, useOwnedCourse } from "@components/hooks/web3"
import { useWeb3 } from "@components/providers"
import { Message } from "@components/UI/common"
import { CourseHero, CourseKeypoint, CourseLecture, CourseModal } from "@components/UI/course"
import { BaseLayout } from "@components/UI/layout"
import { getAllCourses } from "@content/courses/fetcher"


export default function Course({ course }) {
    const { account } = useAccount()
    const { isLoading } = useWeb3()
    const { ownedCourse } = useOwnedCourse(course, account.data)

    const courseState = ownedCourse.data?.state

    console.log(ownedCourse.data)


    const isLocked =
        !courseState ||
        courseState === "purchased" ||
        courseState === "deactivated" // = true






    return (

        <>

            <div className="relative max-w-5xl mx-auto px-4">

                <div className="py-5">
                    <CourseHero
                        isLoading={isLoading}
                        ownedCourse={ownedCourse.data}
                        type={course.type}
                        title={course.title}
                        description={course.description}
                        image={course.coverImage}
                        courseState={courseState}


                    />
                </div>
                <CourseKeypoint
                    points={course.wsl}

                />


                {courseState &&
                    <div className="max-w-7xl mx-auto">
                        {courseState === "purchased" &&

                            <Message type="success">

                                Course has been purchased. Activation proccess can take up to 24 hours.
                                <i className="block font-normal">Contact: myMail@gmail.com</i>
                            </Message>

                        }

                        {courseState === "activated" &&


                            <Message type="success">

                                Course has been activated.

                            </Message>


                        }
                        {courseState === "deactivated" &&


                            <Message type="danger">

                                Course has been deactivated.

                            </Message>

                        }
                    </div >

                }



                <CourseLecture
                    isLoading={isLoading}
                    locked={isLocked}
                    courseState={courseState}
                />










            </div>
        </>
    )


}

export function getStaticPaths() {
    const { data } = getAllCourses()

    return {
        paths: data.map(c => ({

            params: {
                slug: c.slug
            }
        })),
        fallback: false

    }

}

export function getStaticProps({ params }) { // params is individual slug extracted from .JSON


    const { data } = getAllCourses()

    const course = data.filter(c => c.slug === params.slug)[0]
    return {
        props: {
            course

        }

    }

}
Course.Layout = BaseLayout