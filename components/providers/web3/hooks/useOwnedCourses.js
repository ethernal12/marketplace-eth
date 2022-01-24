import useSWR from "swr"
import {normalizeOwnedCourses } from "utils/normalize"

export const handler = (web3, contract) => (courses, account) => {



    const swrRes = useSWR(() =>
        (web3 && account && contract) ? `web3/ownedCourses/${account}` : null,
        async () => {
            const ownedCourses = []
            for (let i = 0; i < courses.length; i++) {
                
                const course = courses[i]
                if (!course.id) { continue } //if there is no id on the course id=0, break the current iterration and continue with the next one

                const hexCourseId = web3.utils.utf8ToHex(course.id)
                const courseHash = web3.utils.soliditySha3(
                    { type: "bytes16", value: hexCourseId }
                    , { type: "address", value: account })
                

                const ownedCourse = await contract.methods.getCourse(courseHash).call()
                const normalize = normalizeOwnedCourses(web3)(course, ownedCourse)
                if (ownedCourse.owner !== "0x0000000000000000000000000000000000000000") {

                    ownedCourses.push(normalize)
                }

            }
            
            return ownedCourses

        }

    )
    return swrRes // returns ownedCourses object as data
}