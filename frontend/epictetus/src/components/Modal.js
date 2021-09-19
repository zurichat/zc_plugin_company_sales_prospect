import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X } from "react-feather";

export default function Modal({ open = false, closeModal, title, children, description }) {

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="block m-auto h-lgx2 w-full max-w-md p-6 my-8 overflow-hidden text-left transition-all transform bg-white">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  <span>{title}</span>
                  <span className="cursor-pointer" onClick={closeModal}> <X /> </span>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {description}
                  </p>
                </div>
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
