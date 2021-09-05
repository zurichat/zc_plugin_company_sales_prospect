import React, { useState } from 'react'
import Button from '../components/Button'
import CreateProspectModal from '../components/Modal'
import ProspectsTable from '../components/ProspectsTable'

function Prospects() {
    const people = [
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
    ]
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true)
    const handleCloseModal = () => setOpen(false)
    

    return (
        <div className="p-10">
            <Button onClick={handleOpenModal}>Create Prospect</Button>
            <CreateProspectModal open={open} closeModal={handleCloseModal}/>
            <div className="py-2">
                <ProspectsTable people={people}/>
                <ul className="flex list-none justify-end mt-5">
                    <li className="py-2 px-3">{"<"}</li>
                    <li className="py-2 px-3">Prev</li>
                    <li className="bg-primary-light text-primary rounded-sm py-2 px-4">2</li>
                    <li className="py-2 px-3">Next</li>
                    <li className="py-2 px-3">{">"}</li>
                </ul>
            </div>
        </div>
    )
}

export default Prospects
