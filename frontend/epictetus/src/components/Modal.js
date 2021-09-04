import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Input from './input'
import Select from './Select'

export default function CreateProspectModal({open=false, closeModal}) {

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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left transition-all transform bg-white">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  <span>Create a Prospect</span>
                  <span className="cursor-pointer" onClick={closeModal}>x</span>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                  Provide information about your prospects 
                  </p>
                </div>
                <div className="mt-2">
                    <div>
                        <label className="block">Name</label>
                        <Input placeholder="Enter Full Name"/>
                    </div>
                    <div>
                        <label className="block">Email</label>
                        <Input placeholder="Enter Email"/>
                    </div>
                    <div>
                        <label className="block">Phone Number</label>
                        <Input placeholder="Enter Phone Number"/>
                    </div>
                    <div>
                    <Select title="stage" label="Deal stage">
                        <option>Select a stage</option>
                        <option>Active</option>
                        <option>Closed</option>
                        <option>Negotiation</option>
                        <option>Prospect</option>
                    </Select>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="bg-primary text-white px-10 py-2"
                    onClick={closeModal}
                  >
                    Create
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
