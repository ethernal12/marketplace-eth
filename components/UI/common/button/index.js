export default function Button({
    children,
    className,
    hovarable = true,
    variant = "purple", //default variant
    ...rest
}) {
    const variants = {

        purple:`text-white bg-indigo-600 ${hovarable && "hover:bg-indigo-800"}`,
        red:`text-white bg-red-600 ${hovarable && "hover:bg-red-800"}`,
        lightPurple:`text-indigo-600 bg-indigo-100 ${hovarable && "hover:bg-indigo-300"}`
    }

    return (
        <button
            {...rest}
            
           
            className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 font-medium rounded-md text-base mr-8${className} ${variants[variant]}`}>
            {/* // children => onClick({connect}) (passed from on click onClick to children) */}
            {children}
        </button>


    )
}