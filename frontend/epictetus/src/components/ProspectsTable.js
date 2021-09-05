import React from 'react'
import ProspectRow from './ProspectRow'

function ProspectsTable({setOpen}) {
    
    return (
        <div className="shadow-xl rounded-md bg-primary">
            <table className="min-w-full text-center border-gray-100">
                <thead className="bg-primary text-white font-bold">
                    <tr>
                        <th className="p-3 tracking-wide">
                            <input className="px-6" type="checkbox" name="" id="" />
                        </th>
                        <th className="p-3 font-medium tracking-wider">
                            Name
                        </th>
                        <th className="p-3 font-medium tracking-wider">
                            Email
                        </th>
                        <th className="p-3 font-medium tracking-wider">
                            Phone Number
                        </th>
                        <th className="p-3 font-medium tracking-wider">
                            All stages
                        </th>
                        <th className="p-3 font-medium tracking-wider">
                            <span className="sr-only">Edit</span>
                            <b>:</b>
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-300">
                    {Array(10).fill(null).map(() => (
                        <ProspectRow  setOpen={setOpen}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProspectsTable
