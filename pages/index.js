
import { Hero } from '@components/UI/common'

import { CourseCard, CourseList } from "@components/UI/course"
import { BaseLayout } from '@components/UI/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useWeb3 } from '@components/providers'




function Home({ courses }) {
  const { web3, isLoading, provider } = useWeb3(); // deconstruct the web3Api object and retreive it via useWeb3()
  
  const checkId = async () => {
   
    await web3.eth.getChainId(res => console.log(res))

  }

  return (

    <>
      {/* double ternary operator: After loading, check if web3 is loaded */}
      {isLoading ? "Is loading web3" : provider ? "Web3 Ready" : "Please install Metamask"}

      <Hero />

      <CourseList courses={courses} >
        {/* // callback function is passed to the courseList and return courseCard as children */}
        {

          course => <CourseCard key={course.id} course={course} />

        }

      </CourseList>


    </>

  )
}

Home.Layout = BaseLayout

const Wrapper = ({ ...props }) =>
  <BaseLayout>
    <Home {...props} />
  </BaseLayout>

export default Wrapper

export function getStaticProps() {
  const { data } = getAllCourses() //populate the data object with imported courses

  return {
    props: {
      courses: data // pass data to course object to be used as a prop to display courses

    }


  }
}
