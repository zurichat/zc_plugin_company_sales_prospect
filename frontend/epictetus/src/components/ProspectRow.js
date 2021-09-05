import React from 'react'
import ProspectsOptions from './ProspectsOptions'
import StagePill from './StagePill'

function ProspectRow({setOpen}) {

    return (
        <tr className="hover:bg-gray-100 cursor-pointer ">
            <td className="px-3 py-4 text-sm text-gray-900">
                <input type="checkbox" name="" id="" />
            </td>
            <td className="px-3 py-4 text-sm font-medium text-gray-900">
                Jane Cooper
            </td>

            <td className="px-3 py-4 text-sm text-gray-900">
                jane.cooper@example.com
            </td>
            <td className="px-3 py-4 text-sm text-gray-900">
                09093527277
            </td>

            <td className="px-3 py-4">
                <StagePill>Active</StagePill>
            </td>

            <td className="px-3 py-4 text-sm font-medium">
                <b><ProspectsOptions setOpen={setOpen}/></b>
            </td>
            
        </tr>
    )
}

export default ProspectRow
