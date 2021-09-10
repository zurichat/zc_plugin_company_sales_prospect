import React from 'react'
import ProspectsOptions from './ProspectsOptions'
import StagePill from './StagePill'

function ProspectRow({ openEditModal, openDeleteModal, prospect }) {

    return (
        <tr className="hover:bg-gray-100 cursor-pointer">
            <td className="px-3 text-sm text-gray-900">
                <input type="checkbox" name="" id="" />
            </td>
            <td className="px-3 text-sm font-medium text-gray-900">
                {prospect.name}
            </td>

            <td className="px-3 text-sm text-gray-900">
                {prospect.email}
            </td>
            <td className="px-3 text-sm text-gray-900">
                {prospect.phone}
            </td>

            <td className="px-3">
                <StagePill>{prospect.status}</StagePill>
            </td>

            <td className="px-3 text-sm font-medium">
                <ProspectsOptions openEditModal={openEditModal} openDeleteModal={openDeleteModal} />
            </td>
        </tr>
    )
}

export default ProspectRow
