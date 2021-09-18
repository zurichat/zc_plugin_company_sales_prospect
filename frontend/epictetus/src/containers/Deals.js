import React, { useState } from 'react'
import Button from '../components/Button'
import DealCard from '../components/DealCard'
import Input from '../components/Input'
import Modal from '../components/Modal'
import Select from '../components/Select'
import FilterDeal from '../components/FilterDeal'
import FilterDeals from '../components/FilterDeals'
import FilterButton from '../components/FilterButton'

function Deals() {
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true)
    const handleCloseModal = () => setOpen(false)

    const [toggle, setopen] = useState(false)
    const OpenModal = () => setopen(true)
    const CloseModal = () => setopen(false)

    return (
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
                <FilterDeal/>
            </div>
           
            <form className=" relative top-72 z-50 flex justify-end">
                <button
                    type="reset"
                    className="text-btngreen px-10 py-2 border-none"
                    onClick={Modal}>
                    Reset
                </button>
                <button
                    type="submit"
                    className="bg-primary text-white px-10 py-2 rounded"
                    onClick={CloseModal}>
                    Done
                </button>
            </form>
            </Modal>

            <Modal
                title="Create a Deal"
                description="Provide information about your deal."
                open={open} closeModal={handleCloseModal}>
                <div className="mt-2">
                    <div>
                        <label className="block">Name</label>
                        <Input placeholder="Enter Full Name" />
                    </div>
                    <div>
                        <label className="block">Company</label>
                        <Input placeholder="Enter Company" />
                    </div>
                    <div>
                        <Select title="stage" label="Deal stage">
                            <option disabled selected>Select a stage</option>
                            <option>Active</option>
                            <option>Closed</option>
                            <option>Negotiation</option>
                            <option>Prospect</option>
                        </Select>
                    </div>
                    <div>
                        <label className="block">Amount</label>
                        <Input placeholder="Enter Amount" />
                    </div>
                </div>
import React, { useState} from "react";
// import { X } from 'react-feather'
import Button from "../components/Button";
import DealCard from "../components/DealCard";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Select from "../components/Select";


const Deals = (items) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [deals, setDeals] = useState(items)

  const creatDealHandler = (z) => {
    z.preventDefault()
    {deals.map((item) => {
      const {name, company, amount, category}= item
      if (category === data) {
        return(
          setName(name),
          setCompany(company),
          setAmount(amount)
        )
      }
    })}
    setDeals(
    )
    console.log(z)
  };


  return (
    <div className="p-6">
      <Button onClick={handleOpenModal}>Create New</Button>
      <Modal
        title="Create a Deal"
        description="Provide information about your deal."
        open={open}
        closeModal={handleCloseModal}
      >
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
            onChange={creatDealHandler}
          >
            Create
          </button>
        </div>
      </Modal>
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
              <span className="block font-bold text-lg">Negotiation</span>
              <span className="text-sm">3 deals • $ 1,500,000</span>
            </div>
            <div className="px-24 lg:px-8 text-center py-2">
              <span className="block font-bold text-lg">Closed</span>
              <span className="text-sm">3 deals • $ 1,500,000</span>
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
        </div>
      </div>
    </div>
  );
};

export default Deals;
