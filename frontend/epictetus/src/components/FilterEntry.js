import React from 'react';
import Shape from "./svg/Shape.svg";

export default function Input({ titles, label, placeholder, disabled = false }) {
    return (
        <div className="absolute w-full top-56 bg-white">
            <label className="font-normal text-base" for={titles}>
                {label}
            </label>
            <input className="border relative  border-gray-500 focus:border-btngreen outline-none rounded h-xl px-3 w-full" id={titles} type="text" placeholder={placeholder}
            />
             <img src={Shape} alt="Shape" className=" relative z-50 bottom-8 left-80 ml-14 transform rotate-180 " />
        </div>
    )
}
