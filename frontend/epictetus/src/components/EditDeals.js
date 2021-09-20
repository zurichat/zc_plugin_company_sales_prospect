import React, {useState, useEffect, useContext} from "react";
import Modal from "./Modal";
import {DealsContext} from "../context/Deals/DealContext";
import Input from "./Input";
import Select from "./Select";

const EditDeals = ({open, handleCloseModal, id, description, amount, name, stage}) => {


    return (
        <Modal
            title="Edit Robert’s deal"
            description="Edit a deal for your prospect. Provide all possible about the prospect"
            open={open}
            closeModal={handleCloseModal}
        >
            <form className="mt-2">
                <div>
                    <label className=" mb-2 block font-normal text-base" htmlFor="id">
                        Deal Stage
                    </label>
                    <Select
                        id="stage"
                        className="border border-gray-500 text-gray-600 outline-none rounded-sm px-5 h-12 w-full mb-4"
                    >
                        <option>Select a Stage</option>
                        <option value="Prospect">Prospect</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed">Closed</option>
                    </Select>
                </div>

                <div>
                    <label htmlFor="amount" className="block mb-2 font-normal text-base">
                        Amount
                    </label>
                    <Input
                        className="border border-gray-500 outline-none rounded-sm h-12  w-full px-5 mb-4"
                        id="amount"
                        type="text"
                        placeholder="Enter Amount"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="mb-2 block font-normal text-base">
                        Expected Close Date
                    </label>
                    <Input
                        className="border border-gray-500 outline-none rounded-sm h-12  w-full px-5 mb-4"
                        id="date"
                        type="text"
                        placeholder="dd-mm-yy"

                    />
                </div>
                <div>
                    <label htmlFor="desc" className="mb-2 block font-normal text-base">
                        Description
                    </label>
                    <Input
                        className="border border-gray-500 outline-none rounded-sm h-12  w-full px-5 mb-4"
                        id="desc"
                        type="text"
                        placeholder="Additional Info"

                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="bg-primary text-white px-10 py-2 rounded"

                    >
                        Edit Deal
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditDeals;
