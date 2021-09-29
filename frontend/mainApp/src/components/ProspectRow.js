import React from "react";
import { Trash2, Edit, PlusSquare } from "react-feather";

function ProspectRow({
  openEditModal,
  openDealCreateModal,
  openDeleteModal,
  prospect,
}) {
  console.log(prospect);
  return (
    <tr className="hover:bg-gray-100 cursor-pointer text-gray-900">
      <td className="p-3 text-sm font-medium">
        <span className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox mr-4"
            name=""
            id="check"
          />
          <label htmlFor="check">{prospect.name}</label>
        </span>
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

      <td className="p-3 text-sm">{prospect.email}</td>
      <td className="p-3 text-sm">{prospect.phone_number}</td>

      <td className="p-3 text-sm"> {prospect.deal_stage}</td>

      <td className="p-3 text-sm font-medium">
        <span className="flex items-center">

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
        </span>
      </td>
    </tr>
  );
}

export default ProspectRow;
