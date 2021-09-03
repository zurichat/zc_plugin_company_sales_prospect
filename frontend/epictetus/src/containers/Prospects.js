import React from 'react'
import Button from '../components/Button'
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
    return (
        <div className="p-10">
            <Button>Create Prospect</Button>

            <div className="py-2">
                <ProspectsTable people={people} />
                <ul className="flex list-none justify-end">
                    <li className="py-2 px-3">{"<"}</li>
                    <li className="py-2 px-3">Prev</li>
                    <li className="bg-green-400 py-2 px-3">2</li>
                    <li className="py-2 px-3">Next</li>
                    <li className="py-2 px-3">{">"}</li>
                </ul>
            </div>
        </div>
    )
}

export default Prospects
