import ManageCourses from "@pages/marketplace/courses/manage"

export default function ManageCourseCard({ children, course }) {







    const bgColor = {
        colVar0: "bg-red-300",
        colVar1: "bg-amber-400",
        colVar2: "bg-yellow-300",
        colVar3: "bg-green-300",
        colVar4: "bg-blue-300",
        colVar5: "bg-violet-300"
    }





    const Item = ({ title, value, color }) => {
        const changeColor = bgColor[color]
        return (
            <>

                <div className={`${changeColor} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <div className="text-sm font-medium text-black">
                        {title}
                    </div >

                </div>


                <div className={`${changeColor} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <div className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                        {value}
                    </div >

                </div>
            </>
        )


    }

    return (

        <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">

            {course &&

                <div >


                    <div className="border-t border-gray-500">
                        <dl>

                            {Object.keys(course).map((key,i) => 
                                <Item
                                key = {i}
                                title= {key}
                                value={course[key]}
                                color={`colVar${i}`}
                            />
                                
                                
                                )}
                           
                            <div className="bg-white px-4 py-5 sm:px-6">
                                {children}
                            </div>
                        </dl>
                    </div>
                </div>


            }
            {course.length === 0 &&
                <div>
                    <h1>No courses were bought yet!</h1>

                </div>

            }

        </div>
    )
}