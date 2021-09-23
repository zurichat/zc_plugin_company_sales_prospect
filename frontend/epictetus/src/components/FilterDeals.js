import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Shape from "./svg/Shape.svg";
import FilterEntry from './FilterEntry'
import InputRange from "./InputRange";
import FilterDeal from '../components/FilterDeal'

const property = ["Contact name", "Company name", "Amount", "Close date"];

export default function Index() {
  const [selected, setSelected] = useState();

  return (
      <Listbox as="div" value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="text-sm font-medium text-gray-700 mb-4">
            Property
            </Listbox.Label>
            <div className="relative">
              <span className="flex flex-col">
                <Listbox.Button className="flex content-center justify-between h-xl mt-3 pl-3 py-4 w-full text-left shadow-sm relative border-grey rounded focus:rounded-b-none text-gray-800" 
              >
                  <span className="truncateflex">
                    {selected } 
                    </span>
                  <img src={Shape} alt="Shape" className="relative top-2 right-3" />
                </Listbox.Button>


                <div>
                  <span className="truncateflex border-btngreen">
                  {
                    selected && selected === property[0] || selected === property[1]  ? <FilterDeal/> : null
                  }
                  

                  { !selected ? <FilterDeal/> : null }
                    {selected && selected=== property[1]? 
                    <div className="absolute w-full top-4">
                        <label className=" absolute top-44 mt-4">Entry</label>
                          <FilterEntry placeholder="Company name"/> 
                     </div>
                     : null}
         
                    {selected && selected=== property[2]? 
                          <div className="relative top-14  w-full">
                          <label className="absolute -top-10 ">Range</label>
                              <div className="flex content-center m-auto justify-between gap-2">
                                  <InputRange type="number" placeholder="From"/>
                              <InputRange type="number" placeholder="To"/>
                             
                          </div>
                        </div>
                     : null}

                      {selected && selected=== property[3]? 
                          <div className="relative top-14 w-full">
                          <label className=" absolute -top-10 ">Range</label>
                              <div className="flex content-center m-auto justify-between gap-1">
                                  <InputRange type="date" placeholder="From"/>
                              <InputRange type="date" placeholder="To"/>
                          </div>
                        </div>
                     : null}
                  </span>
                 </div>

              </span>
              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options value=""
                  static
                  className="border rounded rounded-t-none w-full shadow-lg absolute top-16 border-t-0 bg-white z-50 outline-none border-btngreen "
                >
                  {property.map((deal) => (
                    <Listbox.Option key={deal} value={deal}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? "text-black bg-gray-200"
                              : "text-gray-900"
                          } cursor-default select-none relative py-2 pl-3 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {deal}
                          </span>

                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" :""
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