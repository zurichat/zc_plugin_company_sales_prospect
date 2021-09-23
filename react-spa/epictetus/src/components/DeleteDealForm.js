import React from "react";
import Modal from "./Modal";
import {Trash2} from "react-feather";

const DealActions = ({open2, handleCloseModal, id, deleteDeal}) => {

	return (
		<Modal open={open2} closeModal={handleCloseModal}>
			<div className="flex flex-col justify-center items-center gap-2">
				<div>
					<Trash2 strokeWidth={1} size={64} color="gray"/>
				</div>
				<div>
					<h1 className="text-3xl">Delete deal?</h1>
				</div>
				<div>
					<p className="text-center text-gray-500">
						You’re about to permanently erase this deal and all information
						about it. Are you sure you want to continue?
					</p>
					</div>
			</div>

			<div className="mt-4 flex justify-center gap-4">
				<button
					type="button"
					className="border-2 border-transparent border-primary text-primary px-6 py-2 rounded"
					onClick={handleCloseModal}
				>
					No, return
				</button>
				<button
					className=" bg-red-600 text-white px-10 py-2 rounded"
					onClick={() => deleteDeal(id)}>
					Delete
				</button>
			</div>
		</Modal>
	);
};

export default DealActions;