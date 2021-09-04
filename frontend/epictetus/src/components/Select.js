import React from 'react';
import '../App.css'

export default function Select({title, label, children}) {
    return (
        <div className="mb-6" id={title}>
            <label className=" mb-2 block font-normal text-base" for={title}>
               {label}
            </label>
    
            <select className="rounded-sm px-5 h-12 w-full">
                {children}
            </select>
        </div>
    )
}
