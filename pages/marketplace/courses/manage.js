
import { Button } from "@components/UI/common";
import { MarketplaceHeader } from "@components/UI/common/marketplace";
import { CourseFilter, ManageCourseCard } from "@components/UI/course";
import { BaseLayout } from "@components/UI/layout";
import { useAccount, useManageCourses } from "@components/hooks/web3";
import { normalizeOwnedCourses } from "utils/normalize";


export default function ManageCourses() {
  const { account } = useAccount()
  const { manageCourses } = useManageCourses(account.data)

 console.log(manageCourses.data)

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

          
          />

          

        )}

      </section>
    </>
  )
}

ManageCourses.Layout = BaseLayout