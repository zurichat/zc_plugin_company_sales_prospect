import React from 'react'

const stages = {
    "Negotiation": "text-green-800",
    "Prospect": "text-error",
    "Closed": "text-secondary",
    "Proposal": "text-yellow-400"
}

function StagePill({ status, md=false }) {
    return (
        <span className={`inline-block pill ${md && 'ml-2'}`}>
            <li className={`list-disc text-xs md:text-sm ${stages[status]}`}> <span className="-ml-3 md:-ml-2">{status}</span></li>
        </span>
    )
}

export default StagePill
