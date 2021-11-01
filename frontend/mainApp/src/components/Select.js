import React from "react";
import "../App.css";

export default function Select({ title, label, children, register, required }) {
  return (
    <div className="mb-6 rounded-md" id={title}>
      <label
        className=" mb-2 block font-bold text-base text-gray-800 "
        htmlFor={title}
      >
        {label}
      </label>

      <select
        className="border border-gray-500 text-gray-400 outline-none px-5 h-12 w-full text-base focus:border-primary"
        {...register(title, { required })}
      >
        {children}
      </select>
    </div>
  );
}
