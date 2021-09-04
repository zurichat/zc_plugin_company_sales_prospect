import React from 'react';
import '../App.css'

export default function Input({title, label, placeholder}) {
    return (
        <div className="mb-6">
            <label className=" mb-2 block font-normal text-base" for={title}>
               {label}
            </label>
            <input className="border-gray-400 w-full rounded-sm h-10 px-5" id={title} type="text" placeholder={placeholder}/>
        </div>
    )
}
