import useSWR from "swr"
import { normalizeOwnedCourses } from "utils/normalize"


export const handler = (web3, contract) => account => {

   //account.data is the admin accoutn
   //account.isAdmin returns bool

    const swrRes = useSWR(() =>
        (web3 && account && account.isAdmin &&  contract) ? `web3/manageCourses/${account.data}` : null,
        async () => {
            const courses = []
            const courseCount = await contract.methods.getNumberOfCourses().call()


            for (let i = Number(courseCount) - 1; i >= 0; i--) {

                let courseHash = await contract.methods.getCourseHash(i).call() // gets individual hash of the course
                let getCourseStruct = await contract.methods.getCourse(courseHash).call()

                if (getCourseStruct) {
                    courses.push(normalizeOwnedCourses(web3)(null, getCourseStruct))
                }

            }

            return courses

        }

    )
    return swrRes
}