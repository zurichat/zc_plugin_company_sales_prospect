import React from 'react'
import { ChevronDown } from 'react-feather';
import Avatar from "./svg/Avatar.svg";
import Avatar1 from "./svg/Avatar1.svg";
import Avatar2 from "./svg/Avatar2.svg";

export default function SubHeader() {
    return (
        <div className="px-10 py-2 w-full md:flex justify-between items-center bg-green hidden">
            <div className="font-bold text-lg text-white flex">
                #&nbsp; Sales Plugin &nbsp; <ChevronDown className="mt-1"/>
            </div>
            <div className="bg-white rounded h-8 flex p-1" >
                <img src={Avatar} alt="users" className="z-15"/>
                <img src={Avatar1} alt="users" className="-z-10"/>
                <img src={Avatar2} alt="users" className="-z-5"/>
                &nbsp;
                <p className="text-base">300</p>
            </div>

        </div>
    )
}
