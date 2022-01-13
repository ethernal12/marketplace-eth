import Image from "next/image"
import Link from "next/link"


export default function CourseList({ courses, children }) {



  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {/* passed course to the children i.e. courseCard the individual course */}
      {courses.map(course => children(course))} 
    </section>


  )
}