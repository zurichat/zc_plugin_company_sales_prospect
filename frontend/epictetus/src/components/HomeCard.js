import React from 'react'

export default function HomeCard({src, text, handleClick}) {
    return (
        <div className="homeCard" onClick={handleClick}>
            <img src={src} alt="job-roles" className="block mx-auto"/>
            <p className="text-sm text-center">{text}</p>
        </div>
    )
}
