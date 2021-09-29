import React, {useState} from "react";
import Modal from "./Modal";
import Button from "./Button";
import axios from "axios";
import Swal from "sweetalert2";

const EditDeals = ({open, handleCloseModal, deals, id, amount, stage, description, date, name, prospectID, setDeals}) => {

        const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [selectedDeal, setSelectedDeal] = useState({
            _id: id,
            name: name,
            amount: amount,
            close_date: date,
            description: description,
            deal_stage: stage,
            prospectID: prospectID
        });


        const handleUpdate = e => {
            e.preventDefault()
            const apiDeal = {
                _id: selectedDeal._id,
                name: selectedDeal.name,
                deal_stage: selectedDeal.deal_stage,
                amount: selectedDeal.amount,
                close_date: selectedDeal.close_date,
                description: selectedDeal.description,
                prospect_id: prospectID
            }
            axios.put(`https://sales.zuri.chat/api/v1/deals/update/${id}/`, apiDeal)
                setLoading(true)
                .then(r => {
                    Swal.fire({text: 'Deal updated successfully', icon: 'success', showCancelButton: true,})
                    handleCloseModal()
                    axios.get('https://sales.zuri.chat/api/v1/deals/')
                        .then(r => setDeals((r.data)))
                        .catch(e => console.log(e.response))
                })
                .catch(e => setError(e))
            setLoading(false)
        }

        const handleOnChange = ({target}) => {
            setSelectedDeal({
                ...selectedDeal,
                [target.id]: target.value
            })
        }

        if (error) {
            return <p>{error}</p>
        }

        if (loading) {
            return <p>Loading...</p>
        }

        return (
            <Modal
                title="Edit Robert’s deal"
                description="Edit a deal for your prospect. Provide all possible about the prospect"
                open={open}
                closeModal={handleCloseModal}
            >
                <form className="mt-2" onSubmit={handleUpdate}>
                    <div>
                        <label className=" mb-2 block font-normal text-base" htmlFor="id">
                            Deal Stage
                        </label>
                        <select
                            id="stage"
                            value={selectedDeal.stage}
                            className="border border-gray-500 text-gray-600 py-3 outline-none rounded-sm px-5 h-12 w-full mb-4"
                            onChange={handleOnChange}
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
                            Name
                        </label>
                        <input
                            className="border border-gray-500 outline-none rounded-sm h-12 py-3  w-full px-5 mb-4"
                            id="name"
                            type="text"
                            value={selectedDeal.name}
                            placeholder="Enter Name"
                            onChange={handleOnChange}

                        />
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
                            onChange={handleOnChange}

                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="mb-2 block font-normal text-base">
                            Expected close date
                        </label>
                        <input
                            className="border border-gray-500 outline-none rounded-sm h-12  w-full py-3 px-5 mb-4"
                            id="close_date"
                            type="text"
                            value={selectedDeal.close_date}
                            onChange={handleOnChange}
                            placeholder="dd-mm-yyyy"

                        />
                    </div>
                    <div>
                        <label htmlFor="desc" className="mb-2 block font-normal text-base">
                            Description
                        </label>
                        <input
                            className="border border-gray-500 outline-none rounded-sm h-12  w-full py-3 px-5 mb-4"
                            id="description"
                            type="text"
                            value={selectedDeal.description}
                            onChange={handleOnChange}
                            placeholder="Additional Info"

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
    }
;

export default EditDeals;
