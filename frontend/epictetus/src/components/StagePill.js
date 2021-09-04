import React from 'react'

function StagePill({ children }) {
    return (
        <span className="px-2 text-sm rounded-full bg-green-100 text-green-800">
            {children}
        </span>
    )
}

export default StagePill
