import React, {useState} from "react";

import {Calendar} from "react-feather";
import EditDeals from "./EditDeals";
import DealsOptions from "./DealOptions";

const DealCard = () => {

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  const [open2, setOpen2] = useState(false);
  const handleOpenModal2 = () => setOpen2(true);

  const handleCloseModal = () => {
    setOpen(false);
    setOpen2(false);
  };

  return (
      <div
          className={`w-64 h-44 mb-4 bg-white shadow border border-gray-50 px-4 py-2 flex flex-col gap-3 border-t-2  
                                        border-indigo-300 rounded`}
      >
        {/* Edit Deals */}
        <EditDeals
            open={open}
            handleCloseModal={handleCloseModal}
        />
        <div className="flex justify-between items-center">
          <div className="flex">
            {/* <FileText className="w-8 mr-4" strokeWidth={1}/> */}
            <span className="font-bold text-lg mt-2 text-gray-700">
                            Khadijah Wuraola
                          </span>
          </div>
          <DealsOptions
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              handleOpenDeleteModal={handleOpenModal2}
              handleCloseDeleteModal={handleCloseModal}
          />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-gray-500">Buying 100 bags of cement</p>
          <div className="mt-2">
            <p className="text-indigo-500 font-bold mt-2">
              $20,000
            </p>
            <div className="flex gap-2 text-gray-400 text-base pt-2">
              <Calendar/> - <p className="">20/10/2021</p>
            </div>
          </div>
        </div>
      </div>

  );
}

export default DealCard;