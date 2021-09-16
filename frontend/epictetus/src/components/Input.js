import React from 'react';
import '../App.css'

export default function Input({ title, label, placeholder, disabled = false }) {
    return (
        <div className="mb-6">
            <label className=" mb-2 block font-normal text-base" htmlFor={title}>
                {label}
            </label>
            <input className="border border-gray-500 outline-none rounded-sm h-12  w-full px-5" id={title} type="text" placeholder={placeholder} disabled={disabled} />
        </div>
    )
}
