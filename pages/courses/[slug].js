import { useAccount, useOwnedCourse } from "@components/hooks/web3"
import { CourseHero, CourseKeypoint, CourseLecture, CourseModal } from "@components/UI/course"
import { BaseLayout } from "@components/UI/layout"
import { getAllCourses } from "@content/courses/fetcher"


export default function Course({ course }) {
        const {account} = useAccount()

        const {ownedCourse} = useOwnedCourse(course, account.data)

    
    
    return (
        
        <>
   
            <div className="relative max-w-7xl mx-auto px-4">
              
                    <div className="py-5">
                        <CourseHero
                        ownCourse= {!!ownedCourse.data}
                            type={course.type}
                            title={course.title}
                            description={course.description}
                            image={course.coverImage}


                        />
                    </div>
                    <CourseKeypoint
                        points={course.wsl}

                    />

                    <CourseLecture
                    locked = {true}
                    />

                    <CourseModal />
               
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