
import { Button, Message } from "@components/UI/common";
import { MarketplaceHeader } from "@components/UI/common/marketplace";
import { CourseFilter, ManageCourseCard } from "@components/UI/course";
import { BaseLayout } from "@components/UI/layout";
import { useAdmin, useManageCourses } from "@components/hooks/web3";
import { useState } from "react";
import { compareProof } from "utils/compareProof";
import { useWeb3 } from "@components/providers";


export const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("")


  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..." />
      <Button
        onClick={() => onVerify(email)} // sendsFunction with email parameters to VerificationInput component that calls verifyCourse const function
      >
        Verify
      </Button>
    </div>


  )


}

export default function ManageCourses() {

  const { account } = useAdmin({ redirectTo: "/marketplace" })
  const { contract } = useWeb3()
  const { manageCourses } = useManageCourses(account)
  const { web3 } = useWeb3()
  const [proofedOwnership, setProofedOwnership] = useState({})

  const verifyCourse = (email, { hash, proof }) => {

    compareProof(web3)(hash, email, proof) ? // check if courseHash + email === hash
      setProofedOwnership({
        ...proofedOwnership,
        [hash]: true

      }) :
      setProofedOwnership({
        ...proofedOwnership,
        [hash]: false

      })


  }
  if (!account.isAdmin) {
    return null
  }

  const changeCourseState = async (courseHash, method) => {

    try {
      await contract.methods[method](courseHash).
        send({ from: account.data })

    } catch (error) {
      
      alert(`The ${method} unsuccessful`  + error)
    }

  }

  console.log(manageCourses)

  

  return (
    <>

      <div className="py-4">
        <MarketplaceHeader />
        <CourseFilter />
      </div>
      <section className="grid grid-cols-1">

        {manageCourses.data?.map(course =>

          <ManageCourseCard

            key={course.ownedCourseId}
            course={course}


          >
            <VerificationInput

              onVerify={(email) => {

                verifyCourse(email, { hash: course.courseHash, proof: course.proof })

              }}

            />


            {proofedOwnership[course.courseHash] &&
              < div className="mt-2" >
                <Message>

                  Verified

                </Message>

              </div>

            }
            {proofedOwnership[course.courseHash] === false &&
              < div className="mt-2">
                <Message type="danger">

                  Wrong proof!

                </Message>

              </div>

            }
            <Button className="mt-2 mr-2" variant="green"
              onClick={() => changeCourseState(course.courseHash, "activateCourse")}
            >
              Activate course
            </Button>

            <Button className="mt-2 mr-2" variant="red"
              onClick={() => changeCourseState(course.courseHash, "deactivateCourse")}
            >
              Deactivate course
            </Button>



          </ManageCourseCard>



        )}

      </section>
    </>
  )
}

ManageCourses.Layout = BaseLayout