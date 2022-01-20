
import Link from "next/link"
import { ActiveLink } from "@components/UI/common"

//import items links objects from MarketplaceHeader
export default function Breadcrumb({items}) {

    
    return (

        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
                {items.map((link, i) =>

                    <li key = {link.href} className={`${i == 0 ? "pr-4" : "px-4"}`}>

                        <ActiveLink 
                        href={link.href}
                        
                        >

                            <a className="">
                                {link.value}
                           
                            </a>
                        </ActiveLink>

                    </li>


                )}
               

            </ol>
        </nav>

    )
}