import Head from 'next/head'
import Image from 'next/image'
//if I use {} it goes to the exported object if without we have to go to the location of the exported function one folder bellow


import { Hero } from '@components/UI/common'

import { CourseList } from "@components/UI/course"
import { BaseLayout } from '@components/UI/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useWeb3 } from '@components/providers'


 function Home({ courses }) {
  const { test  } = useWeb3();

  return (

    <>
      {test}
      <Hero />

      <CourseList courses={courses} />

    </>

  )
}



Home.Layout = BaseLayout

const Wrapper = ({...props}) => 
  <BaseLayout>
    <Home {...props}/>
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
