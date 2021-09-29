import React from "react";
import Cancel from "./svg/Cancel";
import DealCard from "./svg/DealCard/DealCard";
import "./../App.css";

const DeleteDealForm = () => {
  return (
    <div className="fixed inset-0 modal">
      <div className="flex justify-center items-center h-screen">
        <div className="w-2/5 h-4/6 bg-white rounded-sm shadow-md flex flex-col gap-4 px-8 py-5">
          <div className="flex justify-between items-center">
            <h5 className="font-bold text-black text-2xl">Delete Deal</h5>
            <Cancel />
          </div>
          <h5 className="font-bold text-gray-800 text-base mt-4">
            This deal will be deleted, this action cannot be undone.
          </h5>
          <div className="w-full flex justify-center mt-8">
            <DealCard className="w-full" />
          </div>
          <div className="mt-8 flex justify-end gap-4 items-center">
            <a
              href="void"
              className="text-green-600 hover:text-green-800 text-xl no-underline"
            >
              No, keep
            </a>
            <button className="bg-red-600 hover:bg-red-700 text-white w-36 h-12 rounded text-lg">
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDealForm;
