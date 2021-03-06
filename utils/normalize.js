const COURSE_STATE = {

    0: "purchased",
    1: "activated",
    2: "deactivated"

}


export const normalizeOwnedCourses = web3 => (course, ownedCourses) => {


    return {
        ...course, // indvidual courses info (title, etc.)
        ownedCourseId: ownedCourses.id,
        proof: ownedCourses.proof,
        ownedBy: ownedCourses.owner,
        price: web3.utils.fromWei(ownedCourses.price),
        state: COURSE_STATE[ownedCourses.state],
        courseHash: ownedCourses.courseHash
        
    }
}