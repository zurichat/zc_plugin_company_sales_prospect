import React from 'react';


export default function Input({ titles, label, placeholder, disabled = false }) {
    return (
        <div className="mt-24 span">
            <label className=" mb-2 font-normal text-base" for={titles}>
                {label}
            </label>
            <input className="border border-gray-500 focus:border-btngreen outline-none rounded-sm h-xl px-3 w-full" id={titles} type="number" placeholder={placeholder}/>
           
        </div>
    )
}
