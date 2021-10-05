import React from 'react'

function Button({ children, onClick, className, outline=false, outlineColor="green" }) {
    if(!outline){
        return (
            <div>
                <button onClick={onClick} className={"bg-green text-white outline-none border-0 py-2 px-4 rounded-sm hover:bg-green-300 "+className}>
                    {children}
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={onClick} className={`border-${outlineColor} text-${outlineColor} outline-none py-2 px-4 rounded-sm ${className}`}>
                    {children}
                </button>
            </div>
        )
    }
}

export default Button
