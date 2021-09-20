import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
// import Input from '../components/Input'
import Modal from '../components/Modal'
import ProspectRow from '../components/ProspectRow'
import { ChevronLeft, ChevronRight } from "react-feather";
// import Select from '../components/Select'
import customAxios, { createProspectURL, editProspectURL, prospectsURL } from '../axios';
import FileIcon from '../components/svg/FileIcon'
// import { Link } from 'react-router-dom'
import { doesProspectExist, formatPropsects } from '../utils'
import Loader from "../components/svg/Loader.svg";
import Swal from 'sweetalert2'
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup.string().required(),
//   phone_number: yup.string().required(),
//   deal_stage: yup.string().required(),
// });
// const { register,handleSubmit, formState: { errors }, } = useForm({resolver: yupResolver(schema)});

function Input({ title, label, placeholder, required, disabled = false, id }) {
    return (
        <div className="mb-6">
            <label className=" mb-2 block font-bold text-base" htmlFor={title}>
                {label}
            </label>
            <input className="py-3 border border-gray-500 outline-none placeholder-gray-400 rounded-sm h-12  w-full px-5 focus:border-primary" id={id} type="text" placeholder={placeholder} disabled={disabled} />
        </div>
    )
}

function Select({ id, title, label, children, required, disabled }) {
    return (
        <div className="mb-6" id={title}>
            <label className=" mb-2 block font-bold text-base" htmlFor={title}>
                {label}
            </label>

            <select id={id} required className="py-3 border border-gray-500 text-gray-400 outline-none rounded-sm px-5 h-12 w-full  focus:border-primary" disabled={disabled}>
                {children}
            </select>
        </div>
    )
}

function Prospects() {
    // const prospects = [
    //     { id: "0", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Prospect" },
    //     { id: "1", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Closed" },
    //     { id: "2", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Negotiation" },
    //     { id: "3", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Proposal" },
    //     { id: "4", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Negotiation" },
    //     { id: "5", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Prospect" }
    // ]

    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true)

    const [open2, setOpen2] = useState(false)
    const handleOpenModal2 = (e, propsect) => {
        setProspect(propsect)
        setOpen2(true)
    }

    const [open3, setOpen3] = useState(false)
    const handleOpenModal3 = () => setOpen3(true)

    const handleCloseModal = () => {
        setOpen(false)
        setOpen2(false)
        setOpen3(false)
    }


    const [prospects, setProspects] = useState([]);


    const [prospect, setProspect] = useState({
        id: "",
        name: "",
        phone: "",
        status: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        customAxios.get(prospectsURL)
            .then(r => {
                setProspects(formatPropsects(r.data))
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                console.log(e.response)
            })
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const isProspect = doesProspectExist(prospects, prospect.name)
        if (!isProspect) {
            customAxios.post(createProspectURL, prospect)
                .then(r => {
                    // alert("prospects created succesfully")
                    Swal.fire({ text: 'Contact created successfully', icon: 'success', showCancelButton: false, })
                    handleCloseModal()
                    customAxios.get(prospectsURL)
                        .then(r => setProspects(formatPropsects(r.data)))
                        .catch(e => console.log(e.response))
                })
                .catch(e => console.log(e))
        } else {
            // alert("Prospect already exists")

            Swal.fire({ text: 'Contact created successfully', icon: 'warningpy-3 ', showCancelButton: false, })
        }
    }


    const handleUpdate = e => {
        e.preventDefault()
        customAxios.put(editProspectURL, prospect)
            .catch(r => {
                alert("prospects edited succesfully")
                handleCloseModal()
                customAxios.get(prospectsURL)
                    .then(r => setProspects(formatPropsects(r.data)))
                    .catch(e => console.log(e.response))
            })
        // .catch(e => console.log(e))
    }

    const handleChange = ({ target }) => {
        setProspect({
            ...prospect,
            [target.id]: target.value
        })
    }
    // const [selectedProspect, setSelectedProspect] = useState(prospects[0])

    return (
        <div className="p-10 w-screen">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Contact</h3>
                <Button onClick={handleOpenModal}>Create New</Button>
            </div>
            {/* CREATE MODAL */}
            <Modal
                title="Create a Contact"
                description="Provide information about your contact."
                open={open} closeModal={handleCloseModal}>

                <form className="mt-2" onSubmit={handleSubmit}>
                    <div>
                        <label className="block">Name</label>
                        <Input placeholder="Enter Full Name" onChange={handleChange} id="name" />
                    </div>
                    <div>
                        <label className="block">Email</label>
                        <Input placeholder="Enter Email" onChange={handleChange} id="email" />
                    </div>
                    <div>
                        <label className="block">Phone Number</label>
                        <Input placeholder="Enter Phone Number" onChange={handleChange} id="phone_number" />
                    </div>
                    <div>
                        <Select title="stage" label="Deal stage" id="deal_stage" onChange={handleChange}>
                            <option>Select a stage</option>
                            <option>Active</option>
                            <option>Closed</option>
                            <option>Negotiation</option>
                            <option>Prospect</option>
                        </Select>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="bg-primary text-white px-10 py-2">
                            Create
                        </button>
                    </div>
                </form>

            </Modal>

            {/* EDIT MODAL */}
            <Modal
                title="Edit Contact"
                description="Provide information about your contact."
                open={open2} closeModal={handleCloseModal}>
                <form className="mt-2" onSubmit={handleUpdate}>
                    <div>
                        <label className="block">Name</label>
                        <Input placeholder="Jane Cooper" id="name" value={prospect.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block">Email</label>
                        <Input placeholder="jane.cooper@example.com" id="email" value={prospect.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block">Phone Number</label>
                        <Input placeholder="09093527277" id="phone_number" value={prospect.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <Select title="stage" label="Deal stage" id="deal_stage" value={prospect.status}>
                            <option>Active</option>
                            <option>Closed</option>
                            <option>Negotiation</option>
                            <option>Prospect</option>
                        </Select>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary text-white px-10 py-2">
                            Edit
                        </button>
                    </div>
                </form>


            </Modal>

            {/* DELETE MODAL */}
            <Modal
                title="Delete Prospect"
                description="This prospect will be deleted, this action cannot be undone."
                open={open3} closeModal={handleCloseModal}>
                <div className="mt-2">
                    <div>
                        <label className="block">Name</label>
                        <Input placeholder="Jane Cooper" disabled />
                    </div>
                    <div>
                        <label className="block">Email</label>
                        <Input placeholder="jane.cooper@example.com" disabled />
                    </div>
                    <div>
                        <label className="block">Phone Number</label>
                        <Input placeholder="09093527277" disabled />
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
                        className="text-primary px-10 py-2 mr-2"
                        onClick={handleCloseModal}>
                        No, Keep
                    </button>
                    <button
                        type="button"
                        className="bg-error text-white px-10 py-2"
                        onClick={handleCloseModal}>
                        Yes, Delete
                    </button>
                </div>

            </Modal>

            {prospects.length > 0 && !loading ?
                <div className="mt-4">
                    <div className="overflow-x-auto overflow-y-hidden rounded-md">
                        <table className="text-left border-gray-100 w-full">
                            <thead className="border-b cursor-pointer">
                                <tr>
                                    <th className="px-3 py-4 flex items-center">
                                        <input className="mr-4" type="checkbox" name="" id="all" />
                                        <label htmlFor="all">Name</label>
                                    </th>
                                    <th className="px-3 py-4">Email</th>
                                    <th className="px-3 py-4">Phone Number</th>
                                    <th className="px-3 py-4">All stages</th>
                                    <th className="px-3 py-4"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {prospects.map((prospect, i) => (
                                    <ProspectRow key={i}
                                        openEditModal={handleOpenModal2}
                                        openDeleteModal={handleOpenModal3}
                                        prospect={prospect} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <ul className="flex list-none justify-end mt-5">
                        <li className="py-2 px-3"> <ChevronLeft strokeWidth={1} /> </li>
                        <li className="py-2 px-3">Prev</li>
                        <li className="bg-primary-light text-primary rounded-sm py-2 px-4">2</li>
                        <li className="py-2 px-3">Next</li>
                        <li className="py-2 px-3"> <ChevronRight strokeWidth={1} /> </li>
                    </ul>

                </div> :
                <>
                    {loading ?
                        <div>
                            <img src={Loader} alt="loader" className="animate-spin" id="loader" />
                            <h2 className="font-medium text-2xl text-black-500 text-center">
                                Loading available prospects
                            </h2>
                            <br />
                            <p className="text-base text-gray-400 text-center">Please wait a while</p>
                        </div>
                        :
                        <div className="mt-4">
                            <div className="overflow-x-auto overflow-y-hidden rounded-md">
                                <table className="text-left border-gray-100 w-full">
                                    <thead className="border-b cursor-pointer">
                                        <tr>
                                            <th className="px-3 py-4 flex items-center">
                                                <input className="mr-4" type="checkbox" name="" id="all" />
                                                <label htmlFor="all">Name</label>
                                            </th>
                                            <th className="px-3 py-4">Email</th>
                                            <th className="px-3 py-4">Phone Number</th>
                                            <th className="px-3 py-4">All stages</th>
                                            <th className="px-3 py-4"> Actions </th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="flex w-100 items-center justify-center flex-col text-center pt-32">
                                    <div className="shadow-lg w-96 justify-center flex p-10 flex-col items-center">
                                        <FileIcon />
                                        <p className="font-bold text-xl mt-5">You have no contact yet!</p>
                                        <p className="max-w-sm py-3 flex-wrap text-gray-400">
                                            Keep track of business transactions with all your contacts in an organised manner. Quickly add a contact to get started.</p>
                                        <div className="flex">
                                            <button className="border-primary px-4 rounded-sm text-primary mr-2" onClick={handleCloseModal}>Skip</button>
                                            <Button outline className="" onClick={handleOpenModal}>Add Contact</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </>
            }

        </div>
    )
}

export default Prospects
