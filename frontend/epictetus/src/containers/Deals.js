import React, { useState, useEffect } from "react";
// import { X } from 'react-feather'
import Button from "../components/Button";
import DealCard from "../components/DealCard";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const url = "https://sales.zuri.chat/api/v1/deals/create";

const Deals = (data, key, index) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");

  const getAddress = async () => {
    try {
      const reply = await fetch(url);
      const yesReply = await reply.json();
      console.log(yesReply);
      setName(name);
      setCompany(company);
      setAmount(amount);
      setCategory(category);
    } catch {
      console.log(url);
      setOpen(false);
    }
  };
  const submitHandler = () => {};
  useEffect(() => {
    submitHandler();
  }, []);

  function handleOnDragEnd(result) {
    
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="p-6">
        <Button onClick={handleOpenModal}>Create New</Button>
        <Modal
          title="Create a Deal"
          description="Provide information about your deal."
          open={open}
          closeModal={getAddress}
        >
          <form onSubmit={getAddress}>
            <div className="mt-2">
              <div>
                <label className="block">Name</label>
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
                className="bg-primary text-white px-10 py-2"
                onChange={getAddress}
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
                  <div className="grid grid-cols-4 mt-5 bg-gray-200 border border-gray-400 rounded">
                    <div className="px-24 lg:px-8 text-center border-r border-gray-300 rounded py-2">
                      <span className="block font-bold text-lg">Prospects</span>
                      <span className="text-sm">3 deals • $ 1,500,000</span>
                    </div>
                    <div className="px-24 lg:px-8 text-center border-r border-gray-300 py-2">
                      <span className="block font-bold text-lg">Proposal</span>
                      <span className="text-sm">3 deals • $ 1,500,000</span>
                    </div>
                    <div className="px-24 lg:px-8 text-center border-r border-gray-300 py-2">
                      <span className="block font-bold text-lg">
                        Negotiation
                      </span>
                      <span className="text-sm">3 deals • $ 1,500,000</span>
                    </div>
                    <div className="px-24 lg:px-8 text-center py-2">
                      <span className="block font-bold text-lg">Closed</span>
                      <span className="text-sm">3 deals • $ 1,500,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 border border-t-0 border-gray-300 rounded h-screen2">
                <div className="text-center border-r border-gray-300 rounded py-2 overflow-x-auto">
                  <DealCard data={"prospect"} />
                </div>
                <div className="text-center border-r border-gray-300 rounded py-2 overflow-x-auto">
                  <DealCard data={"proposal"} />
                </div>
                <div className="text-center border-r border-gray-300 rounded py-2 overflow-x-auto">
                  <DealCard data={"negotiation"} />
                </div>
                <div className="text-center py-2 overflow-x-auto">
                  <DealCard data={"closed"} />
                </div>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Deals;
