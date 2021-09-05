import React from 'react'

function Button({children}) {
    return (
        <div>
            <button className="bg-primary text-white outline-none border-0 py-2 px-4 rounded-sm">
            {children}
            </button>
        </div>
    )
}

export default Button
