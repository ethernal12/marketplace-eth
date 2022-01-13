
import { MarketplaceHeader } from "@components/UI/common/marketplace";
import { OwnedCourseCard } from "@components/UI/course";
import { BaseLayout } from "@components/UI/layout";

export default function OwnedCourses() {




    return (
        <>
            <div className="py-4">
                <MarketplaceHeader />
                <section className="gird grid-cols-1">
                    <OwnedCourseCard />

                </section>
            </div>
        </>


    )


} OwnedCourses.Layout = BaseLayout


