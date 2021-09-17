import React from 'react';

export default function Input({ title, label, placeholder, disabled = false, onChange, id }) {
    return (
        <div className="mb-6">
            <label className=" mb-2 block font-normal text-base" htmlFor={title}>
                {label}
            </label>
            <input id={id} onChange={onChange} className="border border-gray-500 outline-none rounded-sm h-12  w-full px-5" type="text" placeholder={placeholder} disabled={disabled} />
        </div>
    )
}
