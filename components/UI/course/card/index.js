import { Message } from "@components/UI/common";
import Image from "next/image"
import Link from "next/link"
import { AnimateKeyframes } from "react-simple-animate";

export default function CourseCard({ course, Footer, disabled, state }) {



    return (

        <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex h-full">
                <div className="flex-1 h-full">
                    <Image
                        className={`object-cover md:w-48 ${disabled && "filter grayscale"}`}
                        src={course.coverImage}
                        alt={course.title}
                        layout="responsive"
                        width="200"
                        height="230"
                    />
                </div>
                <div className=" p-8 flex-2">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {course.type}</div>

                    <div className="flex items-center">
                        {state === "purchased" &&
                            <AnimateKeyframes
                                play
                                duration={2.5}
                                keyframes={["opacity: 0.1", "opacity: 1"]}
                                iterationCount="infinite"
                            >
                                <div className="text-xs text-black bg-yellow-200 p-1 px-3 rounded-full">

                                    Pending...
                                </div>

                            </AnimateKeyframes>

                        }
                        {state === "activated" &&
                            // <div className="text-xs text-black bg-green-200 p-1 px-3 rounded-full">

                            //     Activated
                            // </div>

                            <Message type ="warning">

                                Activated
                            </Message>

                        }
                        {state === "deactivated" &&
                            <div className="text-xs text-black bg-red-200 p-1 px-3 rounded-full">

                                Deactivated
                            </div>

                        }
                    </div>



                    <Link href={`/courses/${course.slug}`}>
                        <a
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                            {course.title}</a>
                    </Link>
                    <p className="mt-2 text-gray-500">
                        {course.description}</p>
                    {
                        Footer &&
                        <Footer />


                    }
                </div>
            </div>

        </div>




    )
}