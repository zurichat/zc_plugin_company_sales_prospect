import React from "react";
import Cancel from "./svg/Cancel";
import "../App.css";

const EditProspectSales = ({openEdit=false, handleClick}) => {

	return (
		<div className={`fixed inset-0 modal ${openEdit ? 'hidden' : ''}`}>
			<div className="flex justify-center items-center h-screen">
				<div className="w-2/6 h-5/6 bg-white rounded-sm shadow-md flex flex-col px-6 py-5">
					<div className="flex justify-between items-center h-12">
						<h1 className="font-bold text-black text-2xl">Edit Deal</h1>
						<Cancel onClick={handleClick}/>
					</div>
					<h5 className="text-base my-4 font-medium text-gray-500">
						Edit deal information
					</h5>
					<form action="" className="flex flex-col gap-4">
						<div className="flex flex-col">
							<label for="name" className="font-bold text-sm pb-1 text-black">
								Name
							</label>
							<input
								type="text"
								placeholder="Jane Cooper"
								className=" border border-gray-400 h-10 rounded-sm pl-3 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
								id="name"
							/>
						</div>
						<div className="flex flex-col">
							<label
								for="company"
								className="font-bold text-sm pb-1 text-black"
							>
								Company
							</label>
							<input
								type="text"
								placeholder="NNPC"
								id="company"
								className="border border-gray-400 h-10 rounded-sm pl-3 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
							/>
						</div>
						<div className="flex flex-col">
							<label className="font-bold text-sm pb-1 text-black">
								Deal Stage
							</label>
							<select className="border border-gray-400 h-10 rounded-sm pl-3 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent w-full">
								<option value="Done">Done</option>
								<option value="Unfinished">Unfinished Deal</option>
								<option selected value="Negotiation">
									Negotiation
								</option>
							</select>
						</div>

						<div className="flex flex-col">
							<label className="font-bold text-sm pb-1 text-black">
								Amount
							</label>
							<input
								type="text"
								placeholder="$500,000"
								className="border w-full border-gray-400 h-10 rounded-sm pl-3 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
							/>
						</div>

						<button
							type="submit"
							className="w-36 h-10 border-0 rounded-sm self-end bg-primary text-white mt-4 text-base hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
						>
							Done
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditProspectSales;
