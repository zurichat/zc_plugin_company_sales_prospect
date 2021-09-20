import React from 'react';
import '../App.css'

export default function Input({ title, label, placeholder,register,required, disabled = false }) {
    return (
        <div className="mb-6">
            <label className=" mb-2 block font-bold text-base" htmlFor={title}>
                {label}
            </label>
            <input className="border border-gray-500 outline-none placeholder-gray-400 rounded-sm h-12  w-full px-5 focus:border-primary" id={title} type="text" placeholder={placeholder} disabled={disabled} {...register(title, { required })}/>
        </div>
    )
}
