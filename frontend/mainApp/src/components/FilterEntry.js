import React from 'react';

export default function Input({ titles, label, placeholder, disabled = false }) {
    return (
        <div className="absolute w-full bg-white">
            <label className="font-normal text-base" for={titles}>
                {label}
            </label>
            <input className="border relative  border-gray-400 focus:border-btngreen outline-none rounded h-14 px-3 w-full" id={titles} type="text" placeholder={placeholder}
            />
        </div>
    )
}
