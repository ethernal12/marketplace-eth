



export default function CourseModal({isOpen,children}) {




    return (
        <section>
            {/* Deactivate account if its not isOpen = true*/}
            <div className={`${!isOpen && "hidden"} fixed z-10 inset-0 overflow-y-auto"`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Adds Gray BG */}

                    {isOpen &&
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" ariaHidden="true"></div>
                    
                    }
                    
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                    {/* content is in order/card/modal/index.js OrderModal*/}
                    {children}

              
                </div>
            </div>
        </section>


    )
}