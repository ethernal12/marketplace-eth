import { CourseModal } from "@components/UI/course";
import { Button } from "@components/UI/common";
import { useState, useEffect } from "react";
import { useEthPrice } from "@components/hooks/useEthPrice";


const defaultOrder = {

    price: "",
    email: "",
    conformationEmail: ""
}


export default function OrderModal({ course, onClose, onSubmit, isNewPurchase }) {
    const [isOpen, setIsOpen] = useState(false)
    const [order, setOrder] = useState(defaultOrder)
    const [enabledPrice, setEnabledPrice] = useState(false)
    const [agreeTOS, setAgreeTOS] = useState(false)
    const { eth } = useEthPrice()




    const TYPES = {
        success: "green",
        warning: "blue",
        danger: "red"
    }





    const _defaultFormState = (isDisabled = true, message = "", color = "") => ({ isDisabled, message, color })

    const createFormState = ({ price, email, conformationEmail }, agreeTOS, TYPE, isNewPurchase) => {
        
        if (price = "" || Number(price) <= 0) {

            return _defaultFormState(true, "The price is invalid!", TYPES["danger"])
        }


        else if (isNewPurchase && (conformationEmail.length == 0 || email.length == 0)) {

            return _defaultFormState(true, "You must insert your email info!", TYPES["danger"])
        }
        else if (isNewPurchase && (email !== conformationEmail)) {

            return _defaultFormState(true, "Email and your conformation emails do not match!", TYPES["danger"])
        }

        else if (!agreeTOS) {

            return _defaultFormState(true, "You have not agreed to terms of service to sumbit the form!", TYPES["danger"])
        }

        // if we have valid entered form return the default state
        return _defaultFormState()

    }
    const formState = createFormState(order, agreeTOS, TYPES, isNewPurchase)

    useEffect(() => {
        if (!!course) {
            setIsOpen(true)
            setOrder({
                ...defaultOrder,
                price: eth.perCourse

            })

        }
    }, [course])

    const closeModal = () => {

        setIsOpen(false)
        onClose()
        setEnabledPrice(false)
        setAgreeTOS(false)
        setOrder(defaultOrder)

    }


    return (
        <CourseModal isOpen={isOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900" id="modal-title">

                                {course.title} 
                            </h3>
                            {/* -------------------------set price value -------------------------------*/}
                            <div className="mt-1 relative rounded-md">
                                <div className="mb-1">
                                    <label className="mb-2 font-bold">Price(eth) </label>
                                    <div className="text-xs text-gray-700 flex">
                                        <label className="flex items-center mr-2">
                                            <input
                                                checked={enabledPrice} // default false
                                                onChange={({ target: { checked } }) => {

                                                    setOrder({
                                                        ...order,
                                                        price: checked ? order.price : eth.perCourse // if checked is true we can change the price

                                                    })
                                                    setEnabledPrice(checked) // assign it to true so we can change the price

                                                }}

                                                type="checkbox"
                                                className="form-checkbox"
                                            />
                                        </label>
                                        <span>Adjust Price - only when the price is not correct</span>
                                    </div>
                                </div>
                                <input
                                    value={order.price}
                                    disabled={!enabledPrice} // is setEnabledPrice is true
                                    // instead of onChange= {(event) => {const value = event.target.value}} we are doing ; extract {target} and assign it to {value}
                                    onChange={({ target: { value } }) => {
                                        if (isNaN(value)) { return; }
                                        setOrder({
                                            ...order,
                                            price: value

                                        })
                                    }}
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                />
                                <p className="text-xs text-gray-700">
                                    Price will be verified at the time of the order. If the price will be lower, order can be declined (+- 2% slipage is allowed)
                                </p>
                            </div>
                            {/* -------------------------set price value/ -------------------------------*/}


                            {/* -------------------------your email -------------------------------*/}

                            {isNewPurchase &&

                                <div className="mt-2 relative rounded-md">
                                    <div className="mb-1">
                                        <label className="mb-2 font-bold">Email</label>
                                    </div>
                                    <input
                                        onChange={({ target: { value } }) => {

                                            setOrder({
                                                ...order,
                                                email: value.trim()

                                            })

                                        }}


                                        type="email"
                                        name="email"
                                        id="email"
                                        className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="x@y.com"
                                    />
                                    <p className="text-xs text-gray-700 mt-1">
                                        It&apos;s important to fill a correct email, otherwise the order cannot be verified. We are not storing your email anywhere
                                    </p>


                                </div>
                            }

                            {/* -------------------------your email/ -------------------------------*/}


                            {/* ----------------------conformation email --------------------------*/}

                            {isNewPurchase &&
                                <div className="my-2 relative rounded-md">
                                    <div className="mb-1">
                                        <label className="mb-2 font-bold">Repeat Email</label>
                                    </div>
                                    <input
                                        onChange={({ target: { value } }) => {
                                            setOrder({

                                                ...order, // destructurize previous data of the order
                                                conformationEmail: value.trim()
                                            })

                                        }}
                                        type="email"
                                        name="confirmationEmail"
                                        id="confirmationEmail"
                                        className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md" placeholder="x@y.com" />
                                </div>
                            }
                            {/* ----------------------conformation email/ --------------------------*/}¨


                            {/* ------------------------terms of service -----------------------------*/}

                            <div className="text-xs text-gray-700 flex">
                                <label className="flex items-center mr-2">
                                    <input

                                        checked={agreeTOS}
                                        onChange={({ target: { checked } }) => { // if clicked on checkmark,  checked = true

                                            setAgreeTOS(checked)
                                        

                                        }}

                                        type="checkbox"
                                        className="form-checkbox" />
                                </label>
                                <span>I accept Eincode &apos;terms of service&apos; and I agree that my order can be rejected in the case data provided above are not correct</span>
                            </div>
                            {/* ------------------------terms of service/ -----------------------------*/}

                            {formState.message && formState.color &&

                                <div className={`p-4 my-3 text-blue-800 bg-${formState.color}-300 rounded-md text-sm`}>
                                    {formState.message}
                                  
                                </div>}

                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
                    <Button
                        //disabled={formState.isDisabled}
                        onClick={() => {

                            onSubmit(order, course) // order is passed trought  on Submit prop to callback function in Markeplace

                        }}

                    >
                        Submit
                    </Button>
                    <Button
                        onClick={closeModal}
                        variant="red">
                        Cancel

                    </Button>
                </div>
            </div>
        </CourseModal>
    )
}


