import React from 'react';
import { MoreVertical, Search } from 'react-feather';
import Logo from './svg/Zuri.svg';

export default function MobileHeader() {
    return (
        <header className="px-6 py-4 sm:w-full flex justify-between items-center bg-primary md:hidden ">
            <div>
                <img src={Logo} alt="logo"/>
            </div>
            <div className="flex" >
                <Search color="white" size="18px"/>&nbsp; &nbsp; &nbsp;
                <MoreVertical color="white" size="18px"/>
            </div>

        </header>
    )
}
