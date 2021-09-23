import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MoreVertical, Trash2, Edit } from "react-feather";

export default function ProspectsOptions({ openEditModal, openDeleteModal }) {
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
                                <MoreVertical strokeWidth={1} />
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
                                <Popover.Panel className="absolute z-10 w-48 max-w-sm px-4 mt-3 transform -left-40 sm:px-0 lg:max-w-3xl bg-white">
                                    <div className="overflow-hidden rounded-sm shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer border-b" onClick={openEditModal}> <Edit strokeWidth={1} className="mr-2" /> Edit Prospect</div>
                                        <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer" onClick={openDeleteModal}><Trash2 strokeWidth={1} className="mr-2" /> Delete Prospect</div>
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



