import Image from "next/image"


export default function OwnedCourseCard({ children, course }) {

  return (

    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">

      {course &&
        <div className="flex h-full">
          <div className="flex-1  h-full">

            <Image

              className="object-cover "
              src={course.coverImage}
              layout="responsive"
              width="45"
              height="45"
              alt={course.title}
            />
          </div>

          <div className="flex-4">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {course.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {course.price} ETH
              </p>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Order ID
                  </dt>

                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {course.ownedCourseId}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Proof
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {course.proof}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:px-6">
                  {children}
                </div>
              </dl>
            </div>
          </div>

        </div>


      }
      {!course &&
        <div>
          <h1>You dont own any courses</h1>


        </div>



}



        </div>
  )
}