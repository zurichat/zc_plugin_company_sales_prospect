import React, {useState, useEffect, useContext} from "react";
import Modal from "./Modal";
import {DealsContext} from "../context/Deal/DealContext";
import Button from "./Button";

const EditDeals = ({open, handleCloseModal, id, amount, category, name, company, email}) => {

    const [selectedDeal, setSelectedDeal] = useState({
        id: null,
        category: "",
        amount: "",
        company: "",
        email: "",
        name: "",
    });

    const {deals, editDeal} = useContext(DealsContext)

    const currentUserId = id;

    useEffect(() => {
        const dealID = currentUserId;
        const selectedDeal = deals.find(
            (currentDealTraversal) => currentDealTraversal.id === parseInt(dealID)
        );
        setSelectedDeal(selectedDeal);
    }, [currentUserId, deals]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editDeal(selectedDeal);
    };


    if (!selectedDeal || !selectedDeal.id) {
        return <div>Invalid Deal ID.</div>;
    }

    const handleOnChange = (userKey, newValue) =>
        setSelectedDeal({ ...selectedDeal, [userKey]: newValue });

    return (
        <Modal
            title="Edit Robert’s deal"
            description="Edit a deal for your prospect. Provide all possible about the prospect"
            open={open}
            closeModal={handleCloseModal}
        >
            <form className="mt-2" onSubmit={handleSubmit}>
                <div>
                    <label className=" mb-2 block font-normal text-base" htmlFor="id">
                        Deal Stage
                    </label>
                    <select
                        id="stage"
                        value={selectedDeal.category}
                        className="border border-gray-500 text-gray-600 py-3 outline-none rounded-sm px-5 h-12 w-full mb-4"
                        onChange={(e) => handleOnChange("category", e.target.value)}
                    >
                        <option>Select a Stage</option>
                        <option value="Prospect">Prospect</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="amount" className="block mb-2 font-normal text-base">
                        Amount
                    </label>
                    <input
                        className="border border-gray-500 outline-none rounded-sm h-12 py-3  w-full px-5 mb-4"
                        id="amount"
                        type="text"
                        value={selectedDeal.amount}
                        placeholder="Enter Amount"
                        onChange={(e) => handleOnChange("amount", e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="date" className="mb-2 block font-normal text-base">
                        Name
                    </label>
                    <input
                        className="border border-gray-500 outline-none rounded-sm h-12  w-full py-3 px-5 mb-4"
                        id="date"
                        type="text"
                        value={selectedDeal.name}
                        onChange={(e) => handleOnChange("name", e.target.value)}
                        placeholder="Enter Email Address"

                    />
                </div>
                <div>
                    <label htmlFor="desc" className="mb-2 block font-normal text-base">
                        Email
                    </label>
                    <input
                        className="border border-gray-500 outline-none rounded-sm h-12  w-full py-3 px-5 mb-4"
                        id="desc"
                        type="text"
                        value={selectedDeal.email}
                        onChange={(e) => handleOnChange("email", e.target.value)}
                        placeholder="Enter Email Address"

                    />
                </div>
                <div>
                    <label htmlFor="desc" className="mb-2 block font-normal text-base">
                        Company
                    </label>
                    <input
                        className="border border-gray-500 outline-none rounded-sm h-12 w-full py-3 px-5 mb-4"
                        id="desc"
                        type="text"
                        value={selectedDeal.company}
                        onChange={(e) => handleOnChange("company", e.target.value)}
                        placeholder="Enter Company"

                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button
                        type="submit"
                        className="bg-green-500 text-white px-10 py-2 rounded"

                    >
                        Edit Deal
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditDeals;
