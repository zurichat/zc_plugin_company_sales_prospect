import React from "react";
import Cancel from "./svg/Cancel";
import "../App.css";

const EditProspectSales = () => {
	return (
		<div className=" fixed inset-0 modal">
			<div className="flex justify-center items-center h-screen">
				<div className="w-2/6 h-5/6 bg-white-default rounded-sm shadow-md flex flex-col gap-4 px-8 py-5">
					<div className="flex justify-between">
						<h1 className="font-bold text-black-default">Edit Deal</h1>
						<Cancel className=" w-12 h-12" />
					</div>
					<h5 className=" text-base text-gray-default">
						Edit deal information
					</h5>
					<form action="" className="flex flex-col gap-4">
						<div className="flex flex-col">
							<label
								for="name"
								className=" font-bold text-sm pb-2 text-black-default"
							>
								Name
							</label>
							<input
								type="text"
								placeholder="Jane Cooper"
								className=" border border-gray-100 w-100% h-10 rounded-sm pl-3 placeholder-gray-100"
								id="name"
							/>
						</div>
						<div className="flex flex-col">
							<label
								for="company"
								className="font-bold text-sm pb-2 text-black-default"
							>
								Company
							</label>
							<input
								type="text"
								placeholder="NNPC"
								id="company"
								className=" border border-gray-100 w-100% h-10 rounded-sm pl-3 placeholder-gray-100"
							/>
						</div>
						<div className="flex flex-col">
							<label className="font-bold text-sm pb-2 text-black-default">
								Deal Stage
							</label>
							<select className=" border border-gray-100 w-100% h-10 rounded-sm pl-3">
								<option value="Done">Done</option>
								<option value="Unfinished">Unfinished</option>
								<option selected value="Negotiation">
									Negotiation
								</option>
							</select>
						</div>

						<div className="flex flex-col">
							<label className="font-bold text-sm pb-2 text-black-default">
								Amount
							</label>
							<input
								type="text"
								placeholder="$500,000"
								className=" border border-gray-100 w-100% h-10 rounded-sm pl-3"
							/>
						</div>

						<button
							type="submit"
							className=" w-36 h-10 rounded-sm self-end bg-green-default text-white-default mt-4"
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
