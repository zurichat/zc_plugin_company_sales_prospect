import React from 'react';


export default function Input({ titles, label, placeholder,type, disabled = false }) {
    return (
        <div className="span">
            <label className=" mb-2 font-normal text-base" for={titles}>
                {label}
            </label>
            <input className="border border-gray-400 focus:border-btngreen outline-none rounded h-14 px-3 w-full" id={titles} type={type} placeholder={placeholder}/>
           
        </div>
    )
}
