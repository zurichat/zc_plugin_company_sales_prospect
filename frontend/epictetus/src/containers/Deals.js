import React, {useState} from "react";
// import { X } from 'react-feather'
import Button from "../components/Button";
import DealCard from "../components/DealCard";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Select from "../components/Select";
import axios from "axios";
import Swal from "sweetalert2";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import FilterDeal from '../components/FilterDeal'
import FilterDeals from '../components/FilterDeals'
import FilterButton from '../components/FilterButton'
import {DealsProvider} from "../context/Deal/DealContext";


const urlpost = "https://sales.zuri.chat/api/v1/deals/create/";
// const urlget = "https://sales.zuri.chat/api/v1/deals/";

const Deals = (data, key, index) => {
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [amount, setAmount] = useState("");

    const [toggle, setopen] = useState(false)
    const OpenModal = () => setopen(true)
    const CloseModal = () => setopen(false)
    // const [userInputId, setUserInputId] = useState(null);

    const userStuff = (response) => {
        // setName(response.name);
        // setCompany(response.company);
        // setAmount(response.amount);
        // setCategory(response.category);
        console.log(response.data);
    };

    // useEffect(() => {
    //   const handleSubmit = async () => {
    //     const request = await axios.get(urlget);
    //     setName(request.name);
    //     setCompany(request.company);
    //     setAmount(request.amount);
    //     setCategory(request.category);
    //     return request;
    //   };
    //   handleSubmit();
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            position: "bottom-right",
            icon: "success",
            title: "Deals created succefully",
            showConfirmButton: false,
            timer: 2000,
        });

        const userInput = {
            id: "id",
            name: name,
            company: company,
            amount: amount,
            deal_stage: category,
        };
        axios.post(urlpost, userInput).then((response) => {
            return userStuff(response);
        });
        setOpen(false);
    };

    function handleOnDragEnd(result) {
    }

    return (
        <DealsProvider>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="p-6">

                    <div className="flex gap-2 justify-end">
                        <FilterButton onClick={OpenModal}>Filter</FilterButton>
                        <Button onClick={handleOpenModal}>Create New</Button>
                    </div>

                    <Modal
                        title="Filter deal"
                        description="Filter deal to quickly find your prospects on the deal pipeline.
            You can filter by one or more criteria."
                        open={toggle} closeModal={CloseModal}>
                        <div className="w-full mt-6">
                            <FilterDeals/>
                            <FilterDeal className="relative -top-28"/>

                        </div>

                        <form className=" relative top-72 z-50 flex justify-end">
                            <button
                                type="reset"
                                className="text-btngreen px-10 py-2 border-none"
                                onClick={Modal}>
                                Reset
                            </button>
                            <button
                                type="button"
                                className="bg-green text-white px-10 py-2 rounded"
                                onClick={CloseModal}>
                                Done
                            </button>
                        </form>
                    </Modal>

                    <Modal
                        title="Create a Deal"
                        description="Provide information about your deal."
                        open={open}
                        closeModal={handleSubmit}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="mt-2">
                                <div>
                                    <label className="block font-bold">Name</label>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Enter Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block">Company</label>
                                    <Input
                                        type="text"
                                        value={company}
                                        onChange={(event) => setCompany(event.target.value)}
                                        placeholder="Enter Company"
                                    />
                                </div>
                                <div>
                                    <Select title="stage" label="Deal stage">
                                        <option>Select a stage</option>
                                        <option>Proposal</option>
                                        <option>Closed</option>
                                        <option>Negotiation</option>
                                        <option>Prospect</option>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block">Amount</label>
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(event) => setAmount(event.target.value)}
                                        placeholder="Enter Amount"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green text-white px-10 py-2"
                                    onClick={handleSubmit}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </Modal>

                    <Droppable droppableId="characters">
                        {(provided) => (
                            <div
                                className="characters"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {" "}
                                <div className="deals-grid">
                                    <div className="w-max lg:w-full">
                                        <div className="grid grid-cols-4 mt-5 border-gray-300">
                                            <div
                                                className="px-24 lg:px-8 border-b border-gray-300 py-2 text-left">
                                                <span className="block font-bold text-lg text-gray-700">Prospects</span>
                                                <span className="text-sm text-gray-500">3 deals • $ 1,500,000</span>
                                            </div>
                                            <div className="px-24 lg:px-8 text-left border-b border-gray-300 py-2">
                                                <span className="block font-bold text-lg text-gray-700">Proposal</span>
                                                <span className="text-sm text-gray-500">3 deals • $ 1,500,000</span>
                                            </div>
                                            <div className="px-24 lg:px-8 text-left border-b border-gray-300 py-2">
                      <span className="block font-bold text-lg text-gray-700">
                        Negotiation
                      </span>
                                                <span className="text-sm text-gray-500">3 deals • $ 1,500,000</span>
                                            </div>
                                            <div className="px-24 lg:px-8 text-left border-b border-gray-300 py-2">
                                                <span className="block font-bold text-lg text-gray-700">Closed</span>
                                                <span className="text-sm text-gray-500">3 deals • $ 1,500,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 border border-t-0 border-gray-300 rounded h-screen2">
                                    <div
                                        className="text-center border-r border-gray-300 rounded py-2 overflow-x-auto flex flex-col items-center gap-4">
                                        <DealCard data={"prospects"}/>
                                    </div>
                                    <div
                                        className="text-center border-r border-gray-300 rounded py-2 overflow-x-auto flex flex-col items-center gap-4">
                                        <DealCard data={"proposal"}/>
                                    </div>
                                    <div
                                        className="text-center border-r border-gray-300 rounded py-2 overflow-x-auto flex flex-col items-center gap-4">
                                        <DealCard data={"negotiation"}/>
                                    </div>
                                    <div className="text-center py-2 overflow-x-auto">
                                        <DealCard data={"closed"}/>
                                    </div>
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </DealsProvider>
    );
};
export default Deals;
