
import Link from "next/link"
import { ActiveLink } from "@components/UI/common"



const BreadcrumbItem = ({ link, index }) => {



    return (
        <li key={link.href} className={`${index == 0 ? "pr-4" : "px-4"}`}>

            <ActiveLink
                key={link.href}
                href={link.href}

            >

                <a className="">
                    {link.value}

                </a>
            </ActiveLink>

        </li>


    )
}

//import items links objects from MarketplaceHeader
export default function Breadcrumb({ items, isAdmin }) {






    return (

        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
                {items.map((link, i) =>
                    <>

                        {!link.requireAdmin && // is requireAdmin is = false show all breadcrumbs
                            <BreadcrumbItem
                                link={link}
                                index={i}

                            />

                        }

                        {link.requireAdmin && isAdmin && // show only manage courses if admin and requireAdmin = true

                            <BreadcrumbItem
                                link={link}
                                index={i}

                            />
                        }


                    </>
                )}


            </ol>
        </nav>

    )
}