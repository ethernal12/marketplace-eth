import courses from "./index.json"


export const getAllCourses = () => {


    return {
        data: courses,
        coursemap: courses.reduce((a, c, i) => {
            console.log(c)
            a[c.id] = c
            a[c.id].index = i
            return a //populates object 
        }, {})//object


    }
}