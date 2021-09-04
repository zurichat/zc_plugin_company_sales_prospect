import React from 'react'
import StagePill from './StagePill'

function ProspectRow() {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900"><input type="checkbox" name="" id="" /></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">jane.cooper@example.com</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">09093527277</div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <StagePill>Active</StagePill>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <b>:</b>
            </td>
        </tr>
    )
}

export default ProspectRow
