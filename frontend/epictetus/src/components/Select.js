import React from 'react';
import '../App.css'

export default function Select({ title, label, children, onChange, id }) {
    return (
        <div className="mb-6" id={title}>
            <label className=" mb-2 block font-bold text-base" htmlFor={title}>
                {label}
            </label>

            <select required id={id} onChange={onChange} className="border border-gray-500 text-gray-400 outline-none rounded-sm px-5 h-12 w-full  focus:border-primary">
                {children}
            </select>
        </div>
    )
}
