import Link from "next/link"
import React from "react"
import { useRouter } from "next/router"

export default function ActiveLink({ children, ...props}) {

   
    const defaultClass = "hover:text-gray-500"
    const { pathname } = useRouter()
    let className = children.props.className || "" // children is the <a/> element
    className = `${defaultClass} ${className}`
    if (pathname === props.href) {

        className = `text-amber-300  ${className}`
    }

    return (

        <Link {...props}>
            {

                React.cloneElement(children, { className })

            }

        </Link>
    )
}