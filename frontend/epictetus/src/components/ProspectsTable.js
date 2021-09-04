import React from 'react'
import ProspectRow from './ProspectRow'

function ProspectsTable() {
    return (
        <div className="text-center shadow-lg overflow-x-scroll border-b border-gray-200 rounded-md">
            <table className="border-1 border-gray-100 w-full">
                <thead className="bg-green-600 text-white font-bold w-100">
                    <tr className="">
                        <th scope="col"
                            className="px-6 py-3 font-medium tracking-wide">
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th scope="col"
                            className="px-6 py-3 font-medium tracking-wider">
                            Name
                        </th>
                        <th scope="col"
                            className="px-6 py-3 font-medium tracking-wider">
                            Email
                        </th>
                        <th scope="col"
                            className="px-6 py-3 font-medium tracking-wider">
                            Phone Number
                        </th>
                        <th scope="col"
                            className="px-6 py-3 font-medium tracking-wider">
                            All stages
                        </th>

                        <th scope="col"
                            className="px-6 py-3 font-medium tracking-wider">
                            <span className="sr-only">Edit</span>
                            <b>:</b>
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 w-full">
                    {Array(10).fill(null).map(() => (
                        <ProspectRow />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProspectsTable
