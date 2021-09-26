import React from "react";
import StagePill from "./StagePill";
import { Trash2, Edit, PlusSquare } from "react-feather";

function ProspectRow({
  openEditModal,
  openDealCreateModal,
  openDeleteModal,
  prospect,
}) {
  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      <td className="p-3 text-sm font-medium text-gray-900 flex items-center">
        <input
          type="checkbox"
          className="form-checkbox mr-4"
          name=""
          id="check"
        />
        <label htmlFor="check">{prospect.name}</label>
        {/* <span>
                    <label htmlFor="check">{prospect.name}</label>
                    <span className="sm:hidden block">
                    <span className="block">
                    {prospect.email}
                    </span> 
                    {prospect.phone} <StagePill md status={prospect.status} />
                    </span>
                </span> */}
      </td>

      <td className="p-3 text-sm text-gray-900">{prospect.email}</td>
      <td className="p-3 text-sm text-gray-900">{prospect.phone}</td>

      <td className="p-3">
        <StagePill status={prospect.status} />
      </td>

      <td className="p-3 text-sm font-medium">
        <span>
          <Edit
            className="inline-block mr-1 text-gray-500"
            onClick={(e) => openEditModal(e, prospect)}
            strokeWidth={1}
          />
        </span>
        <span>
          <PlusSquare
            className="inline-block text-gray-500"
            strokeWidth={1}
            onClick={(e) => openDealCreateModal(e, prospect)}
          />
        </span>
        <span>
          <Trash2
            className="inline-block text-gray-500"
            onClick={(e) => openDeleteModal(e, prospect)}
            strokeWidth={1}
          />
        </span>
      </td>
    </tr>
  );
}

export default ProspectRow;
