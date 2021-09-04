import React from 'react';
import '../App.css'

export default function Select({title, label, children}) {
    return (
        <div className="mb-6" id={title}>
            <label className=" mb-2 block font-normal text-base" for={title}>
               {label}
            </label>
    
            <select className="text-gray-500 border-gray-400 w-full rounded-sm  h-10 px-5">
                {children}
            </select>
        </div>
    )
}
