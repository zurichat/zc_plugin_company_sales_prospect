import React from 'react'

function ExtraInfo ({fieldLabel, fieldValue}) {
    return (
        <div className="flex-col w-full">
            <h1>{fieldLabel}</h1>
            <h3>{fieldValue}</h3>
        </div>
    )
}

export default ExtraInfo;