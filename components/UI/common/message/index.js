import { useState } from "react"

const TYPES = {
    success: "green",
    warning: "red",
    danger: "red"
}

export default function Message({ children, type = "success" }) {

    const [isDisplayed, setIsDisplayed] = useState(true)



    const messageType = TYPES[type]

    if (!isDisplayed) { return null }

    return (
        <div className={`bg-${messageType}-100 rounded-xl mb-3`}>
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-3 lg:px-3">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                        <div className="ml-3 font-medium text-green-900 truncate">
                            <span className=" md:inline">
                                {children}
                            </span>
                        </div>
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                            onClick={() => { setIsDisplayed(false) }}
                            type="button"
                            className={`-mr-1 flex bg-${messageType}-900 p-2 rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}>
                            <span className="sr-only">Dismiss</span>
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}