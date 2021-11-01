import React, { useState } from "react";

import { Calendar } from "react-feather";
import EditDeals from "./EditDeals";
import DealsOptions from "./DealOptions";
import { Draggable } from "react-beautiful-dnd";

const stages = {
	Negotiation: "border-green",
	Prospect: "border-error",
	Closed: "border-secondary",
	Proposal: "border-pink",
};

const DealCard = ({ deal, index }) => {
	const [open, setOpen] = useState(false);
	const handleOpenModal = () => setOpen(true);

	const handleCloseModal = () => {
		setOpen(false);
		// setOpen2(false);
	};

	return (
		<Draggable key={deal._id} index={index} draggableId={deal._id}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`cursor-pointer w-64 mb-4 px-4 py-3 rounded shadow-lg border-t-2 ${
						stages[deal.deal_stage]
					}`}
				>
					<EditDeals open={open} handleCloseModal={handleCloseModal} />
					<div className="flex justify-between items-center">
						<span className="font-bold text-lg mt-2 text-gray-700">
							{deal.name}
						</span>
						<DealsOptions
							handleOpenModal={handleOpenModal}
							handleCloseModal={handleCloseModal}
							handleCloseDeleteModal={handleCloseModal}
							id={deal._id}
							deal={deal}
						/>
					</div>
					<div>
						<p className="text-gray-500">{deal.description}</p>
						<p className="text-green font-bold mt-3">${deal.amount}</p>
						<p className="flex text-gray-400 pt-2">
							<Calendar className="mr-2" /> {deal.close_date}
						</p>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default DealCard;
