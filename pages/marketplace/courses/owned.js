
import { useOwnedCourses} from "@components/hooks/web3";
import { Button, Message } from "@components/UI/common";
import { MarketplaceHeader } from "@components/UI/common/marketplace";
import { OwnedCourseCard } from "@components/UI/course";
import { BaseLayout } from "@components/UI/layout";

export default function OwnedCourses() {

    const {ownedCourses } = useOwnedCourses()
    

    return (
        <>
            {ownedCourses.data}  
            
            <div className="py-4">
                <MarketplaceHeader />
                <section className="gird grid-cols-1">
                    <OwnedCourseCard>

                        <Button>

                            Watch the course
                        </Button>
                        <Message
                        type = "warning">

                            Warning
                            </Message>

                    </OwnedCourseCard>

                </section>
            </div>
        </>


    )


} OwnedCourses.Layout = BaseLayout


