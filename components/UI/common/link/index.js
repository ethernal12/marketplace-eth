import Link from "next/link"
import React from "react"
import { useRouter } from "next/router"

export default function ActiveLink({ children, ...props}) {

   

    const { pathname } = useRouter()
    let className = children.props.className || "" // children is the <a/> element
    if (pathname === props.href) {

        className = `${className} text-orange-400`
    }

    return (

        <Link {...props}>
            {

                React.cloneElement(children, { className })

            }

        </Link>
    )
}