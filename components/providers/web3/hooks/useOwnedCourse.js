import useSWR from "swr"
import { createCourseHash } from "utils/courseHash"
import { normalizeOwnedCourses } from "utils/normalize"

export const handler = (web3, contract) => (course, account) => {



    const swrRes = useSWR(() =>
        (web3 && account && contract) ? `web3/ownedCourse/${account}` : null,
        async () => {
            const ownedCourses = []

            const courseHash = createCourseHash(web3)(course.id, account)


            const ownedCourse = await contract.methods.getCourse(courseHash).call()
            
            if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
                return null
              
            }

            return normalizeOwnedCourses(web3)(course, ownedCourse)

        }

    )
    return swrRes // returns ownedCourses object as data
}