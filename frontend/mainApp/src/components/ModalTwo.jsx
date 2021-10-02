import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "react-feather";

export default function ModalTwo({
  open = false,
  closeModal,
  title,
  children,
  description,
  large = false
}) {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 bg-gray-900 bg-opacity-75 transition-opacity modal-wrapper" onClick={(e) => {
            if (e.target.classList?.contains('modal-wrapper')) {
              closeModal()
            }
          }} >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {large ? (
                <div className="fixed h-screen w-screen p-6 modal-wrapper"  >
                  <div className="flex flex-col m-auto max-w-3xl  p-6  h-full rounded shadow-2xl overflow-hidden text-left transition-all transform bg-white">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl font-bold leading-6 capitalize mb-5 text-gray-700 flex justify-between"
                    >
                      <span>{title}</span>
                      <span
                        className="cursor-pointer font-bold"
                        onClick={closeModal}
                      >
                        {" "}
                        <X />{" "}
                      </span>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm mb-5 text-gray-600">{description}</p>
                    </div>
                    <div className="flex-auto flex flex-col overflow-y-scroll">{children}</div>
                  </div>
                </div>
              ) : (
                <div className="block m-auto h-lgx2 w-full max-w-md p-6 my-8 rounded shadow-2xl overflow-hidden text-left transition-all transform bg-white">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold leading-6 capitalize mb-5 text-gray-700 flex justify-between"
                  >
                    <span>{title}</span>
                    <span
                      className="cursor-pointer font-bold"
                      onClick={closeModal}
                    >
                      {" "}
                      <X />{" "}
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm mb-5 text-gray-600">{description}</p>
                  </div>
                  <div className="text-sm">{children}</div>
                </div>
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
