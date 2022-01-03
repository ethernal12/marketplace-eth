export default function Button({
    children,
    className = "text-white bg-indigo-600 hover:bg-indigo-800",
    ...rest
}) {


    return (
        <button
            {...rest}
            
            href="#"
            className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 font-medium rounded-md text-base mr-8 ${className}`}>
            {/* // children => onClick({connect}) (passed from on click onClick to children) */}
            {children}
        </button>


    )
}