import useSWR from "swr"
import { normalizeOwnedCourses } from "utils/normalize"

export const handler = (web3, contract) => (course, account) => {



    const swrRes = useSWR(() =>
        (web3 && account && contract) ? `web3/ownedCourses/${account}` : null,
        async () => {
            const ownedCourses = []


           
            const hexCourseId = web3.utils.utf8ToHex(course.id)
            const courseHash = web3.utils.soliditySha3(
                { type: "bytes16", value: hexCourseId }
                , { type: "address", value: account })


            const ownedCourse = await contract.methods.getCourse(courseHash).call()
            const normalize = normalizeOwnedCourses(web3)(course, ownedCourse)
            if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
                return null
              
            }



            return normalizeOwnedCourses(web3)(course, ownedCourse)

        }

    )
    return swrRes // returns ownedCourses object as data
}