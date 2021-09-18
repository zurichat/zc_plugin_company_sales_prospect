import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Select from '../components/Select';
import FileIcon from "../components/svg/FileIcon";


function NoProspectsFound() {
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true)
    const handleCloseModal = () => setOpen(false)
    return (
        <div className="p-10">
            <Button onClick={handleOpenModal}>Create Prospect</Button>
            {/*CREATE PROSPECT MODAL*/}
            <Modal
                title="Create a Prospect"
                description="Provide information about your prospects."
                open={open} closeModal={handleCloseModal}>
                     <div className="mt-2">
                    <div>
                        <label className="block">Name</label>
                        <Input placeholder="Enter Full Name" />
                    </div>
                    <div>
                        <label className="block">Email</label>
                        <Input placeholder="Enter Email" />
                    </div>
                    <div>
                        <label className="block">Phone Number</label>
                        <Input placeholder="Enter Phone Number" />
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

            <div className="flex w-100 items-center justify-center flex-col text-center pt-32">
                <FileIcon />
                <p className="max-w-sm py-3 flex-wrap text-gray-400">
                    Oops! no prospect has been added, create new prospect to view prospect here.
                </p>
                <div className="text-primary">
                    <Link to="/test">Test | </Link>{' '}
                    <Link to="/prospects">Prospects | </Link>{' '}
                    <Link to="/deals">Deals</Link>
                </div>
            </div>
        </div>
    )
}

export default NoProspectsFound;
