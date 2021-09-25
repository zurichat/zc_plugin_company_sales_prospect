import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Shape from "./svg/Shape.svg";

const conditions = ["Is","Is not ", " Contains", "Does not contain", "Starts with", "Ends with", "Is Empty","Negotiation","Is not Empty"];



export default function Index() {
  const [selected, setSelected] = useState();

  return (
      <Listbox as="div" value={selected} onChange={setSelected}>
     
        {({ open }) => (
          <>
            <Listbox.Label className="text-sm font-medium text-gray-700 relative top-5 ">
            Conditions
            </Listbox.Label>
            <div className="relative">
              <span className="flex w-full">
                <Listbox.Button className="flex h-14 content-center justify-between pl-4 py-4 top-8 w-full text-left focus:outline-none relative rounded text-gray-400">
                {selected ? selected : "Select filter condition"}
                  <img src={Shape} alt="Shape" className=" relative top-3 right-3 " />
                </Listbox.Button>
              </span>
              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="border pt-3 border-green shadow-lg border-t-0 outline-none rounded h-60 rounded-t-none w-full absolute top-20 bg-white z-50 overflow-y-hidden"
                >
                  {conditions.map((fruit) => (
                    <Listbox.Option key={fruit} value={fruit}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? "text-black bg-gray-200"
                              : "text-gray-900"
                          } cursor-default select-none relative py-4 pl-4 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal "
                            }`}
                          >
                            {fruit}
                          </span>

                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" : " border-b-0"
                              } absolute inset-y-0 left-0 flex items-center pl-2`}
                            >                               
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
  );
}