import React from 'react'

function Button({ children, onClick, className }) {
    return (
        <div>
            <button onClick={onClick} className={"bg-primary text-white outline-none border-0 py-2 px-4 rounded-sm hover:bg-green-300 "+className}>
                {children}
            </button>
        </div>
    )
}

export default Button
