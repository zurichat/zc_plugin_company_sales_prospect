import React, { useState } from 'react'
import Button from '../components/Button'
import DealCard from '../components/DealCard'
import Input from '../components/Input'
import Modal from '../components/Modal'
import Select from '../components/Select'

function Deals() {
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true)
    const handleCloseModal = () => setOpen(false)
    return (
        <div className="p-6">
            <Button onClick={handleOpenModal}>Create New</Button>
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

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="bg-primary text-white px-10 py-2"
                        onClick={handleCloseModal}>
                        Create
                    </button>
                </div>
            </Modal>
            <div className="deals-grid">
                <div className="w-max lg:w-full">
                    <div className="grid grid-cols-4 mt-5 bg-gray-200 border border-gray-400">
                        <div className="px-24 lg:px-8 text-center border-r border-gray-400 py-2">
                            <span className="block font-bold text-lg">Prospects</span>
                            <span className="text-sm">3 deals • $ 1,500,000</span>
                        </div>
                        <div className="px-24 lg:px-8 text-center border-r border-gray-400 py-2">
                            <span className="block font-bold text-lg">Proposal</span>
                            <span className="text-sm">3 deals • $ 1,500,000</span>
                        </div>
                        <div className="px-24 lg:px-8 text-center border-r border-gray-400 py-2">
                            <span className="block font-bold text-lg">Negotiation</span>
                            <span className="text-sm">3 deals • $ 1,500,000</span>
                        </div>
                        <div className="px-24 lg:px-8 text-center py-2">
                            <span className="block font-bold text-lg">Closed</span>
                            <span className="text-sm">3 deals • $ 1,500,000</span>
                        </div>
                    </div>


                    <div className="grid grid-cols-4 border border-t-0 border-gray-400 h-screen2">
                        <div className="text-center border-r border-gray-400 py-2 overflow-x-auto">
                            <DealCard />
                            <DealCard />
                            <DealCard />
                            <DealCard />
                        </div>
                        <div className="text-center border-r border-gray-400 py-2 overflow-x-auto">
                            <DealCard />
                            <DealCard />
                        </div>
                        <div className="text-center border-r border-gray-400 py-2 overflow-x-auto">
                            <DealCard />
                        </div>
                        <div className="text-center py-2 overflow-x-auto">
                            <DealCard />
                            <DealCard />
                            <DealCard />
                            <DealCard />
                            <DealCard />
                            <DealCard />
                            <DealCard />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Deals
