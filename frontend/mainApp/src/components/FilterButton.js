import React from 'react'

function Button({ children, onClick }) {
    return (
        <div>
            <button onClick={onClick} className="bg-white text-green outline-none border-green py-2 px-4 rounded-sm">
                {children}
            </button>
        </div>
    )
}

export default Button
