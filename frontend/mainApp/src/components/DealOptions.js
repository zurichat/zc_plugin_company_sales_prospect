import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Trash2, Edit, Move, ChevronDown, MoreHorizontal } from "react-feather";
import customAxios, { dealsURL, deleteDealURL } from "../axios";
import Swal from "sweetalert2";


// const [deal, setDeal] = useState({
//   id: "",
//   amount: "",
//   close_date: "",
//   deal_stage: "",
//   description: "",
//   name: "",
//   prospect_id: ""
// });

export default function DealsOptions({
  handleOpenModal,
  handleOpenDeleteModal,
  id,
}) {
  handleOpenDeleteModal = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        customAxios
          .post(`${deleteDealURL}${id}`)
          .then((res) => {
            console.log(res);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            console.log(error);
          }
          )
          // .then(
          //   customAxios
          //   .get(dealsURL, deal)
          //   .then(
          //       r => setDeals(r.data)
          //       .catch(e => console.log(e.response))
          //   )
          // );
      }
    });
  };


  return (
    <>
      <div>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                as="span"
                className={`
                        ${open ? "bg-transparent" : "bg-transparent  "}
                        `}
              >
                <MoreHorizontal strokeWidth={1} />
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
                    <div
                      className="flex items-center p-3 hover:bg-gray-200 cursor-pointer "
                      onClick={handleOpenModal}
                    >
                      {" "}
                      <Edit strokeWidth={1} className="mr-2" /> Edit
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 cursor-pointer">
                      {" "}
                      <div className="flex">
                        <Move strokeWidth={1} className="mr-2" /> Move To
                      </div>
                      <ChevronDown strokeWidth={1} />
                    </div>
                    <div
                      className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={handleOpenDeleteModal.bind(this, id)}
                    >
                      <Trash2 strokeWidth={1} className="mr-2" /> Delete
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  );
}
