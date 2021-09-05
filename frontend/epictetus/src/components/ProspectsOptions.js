import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {AiOutlineDelete} from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';

export default function ProspectsOptions({setOpen}) {
    return (
        <>
            <div>
            <Popover className="relative">
                {({ open }) => (
                <>
                    <Popover.Button
                    as="span"
                    className={`p-3
                        ${open ? 'bg-transparent' : 'bg-transparent  '}
                        `}
                    >
                    :
                    </Popover.Button>
                   
                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                    >
                    <Popover.Panel className="absolute z-10 w-48 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1 sm:px-0 lg:max-w-3xl bg-white">
                        <div className="overflow-hidden rounded-sm shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-row p-3 hover:bg-gray-200 cursor-pointer" onClick={setOpen}><FaRegEdit color="green" className="mt-1"/>&nbsp; Edit Prospect</div>
                            <hr/>
                            <div className="flex flex-row p-3 hover:bg-gray-200 cursor-pointer"><AiOutlineDelete color="red" className="mt-1"/>&nbsp; Delete Prospect</div>
                        </div>
                    </Popover.Panel>
                    </Transition>
                </>
                )}
            </Popover>
        </div>
     </>
    )
}



