import React from 'react'
import StagePill from './StagePill'

function ProspectRow() {
    return (
        <tr>
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
                <b>:</b>
            </td>
        </tr>
    )
}

export default ProspectRow
