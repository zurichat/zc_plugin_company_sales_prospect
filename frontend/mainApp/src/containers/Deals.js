import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import DealCard from "../components/DealCard";
import Modal from "../components/Modal";
import customAxios, { createDealURL, dealsURL, prospectsURL } from "../axios";

import FilterDeal from "../components/FilterDeal";
import FilterDeals from "../components/FilterDeals";
import { PluginContext } from "../context/store";
import Input from "../components/Input";
import Select from "../components/Select";
//import { Input, Select } from "./Prospects";
import { customAlert } from "../utils";
import FileIcon from "../components/svg/FileIcon";
import Loader from "../components/svg/Loader.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	name: yup.string().required(),
	deal_stage: yup.string().required(),
	close_date: yup.string().required(),
	amount: yup.string().required(),
	description: yup.string().required(),
});

const Deals = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(true);
	const [prospectsLoading, setprospectsLoading] = useState(false);
	const [loadingError, setloadingError] = useState("");
	const { deals, setDeals, prospects, setProspects } =
		useContext(PluginContext);
	const [dealContacts, setdealContacts] = useState([]);
	const [openCreate, setOpenCreate] = useState(false);
	const ProspectStage = deals.filter(
		(x) => x.deal_stage && x.deal_stage.toLowerCase() === "prospect"
	);
	const NegotiationStage = deals.filter(
		(x) => x.deal_stage && x.deal_stage.toLowerCase() === "negotiation"
	);
	const ProposalStage = deals.filter(
		(x) => x.deal_stage && x.deal_stage.toLowerCase() === "proposal"
	);
	const ClosedStage = deals.filter(
		(x) => x.deal_stage && x.deal_stage.toLowerCase() === "closed"
	);

	const handleOpenCreateModal = () => {
		setOpenCreate(true);
		setprospectsLoading(true);
		setloadingError("");
		reset();
		customAxios
			.get(prospectsURL)
			.then(({ data }) => {
				setdealContacts(data.contacts);
				setprospectsLoading(false);
				//console.log(data.contacts)
			})
			.catch((e) => {
				console.log(e.response);
				setloadingError(e.response);
				setprospectsLoading(false);
			});
	};

	const [openFilter, setOpenFilter] = useState(false);
	const handleOpenFilterModal = () => setOpenFilter(true);

	const handleCloseModal = () => {
		setOpenCreate(false);
		setOpenFilter(false);
	};

	useEffect(() => {
		customAxios
			.get(dealsURL, {
				headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
			})
			.then((r) => {
				// console.log(r.data);

				setDeals(r.data);
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
				console.log(e.response);
			});

		if (prospects.length <= 0) {
			customAxios
				.get(prospectsURL)
				.then(({ data }) => {
					setProspects({
						contacts: data.contacts,
						next: data.next,
						pageNum: data.pageNum,
						prev: data.prev,
					});
					setLoading(false);
				})
				.catch((e) => {
					setLoading(false);
					console.log(e.response);
				});
		}
	}, []);

	const onSubmit = (data) => {
		var val = data.name.split(",");
		var arr = [val];
		const newDeal = {
			amount: data.amount,
			close_date: data.close_date,
			deal_stage: data.deal_stage,
			description: data.description,
			name: arr[0][0].trim(),
			prospect_id: arr[0][1].trim(),
		};

		customAxios
			.post(createDealURL, newDeal)
			.then((r) => {
				handleCloseModal();
				customAxios
					.get(dealsURL)
					.then((r) => setDeals(r.data))
					.catch((e) => console.log(e.response));
				customAlert("Deal Created Successfully", "success");
			})
			.catch((e) => {
				console.log(e);
				customAlert("Oops, something went wrong", "error");
			});
	};

	return (
		<div className='p-6'>
			<Modal
				title='Filter deal'
				description='Filter deal to quickly find your prospects on the deal pipeline.
        You can filter by one or more criteria.'
				open={openFilter}
				closeModal={handleCloseModal}
			>
				<div className='w-full mt-6'>
					<FilterDeals />
					<FilterDeal className='relative -top-28' />
				</div>

				<form className=' relative top-72 z-50 flex justify-end'>
					<button
						type='reset'
						className='text-btngreen px-10 py-2 border-none'
						onClick={Modal}
					>
						Reset
					</button>
					<button
						type='button'
						className='bg-green text-white px-10 py-2 rounded'
						onClick={handleCloseModal}
					>
						Done
					</button>
				</form>
			</Modal>

			<Modal
				title='Create a deal'
				description='Create a deal for your prospect. Please provide all necessary information.'
				open={openCreate}
				closeModal={handleCloseModal}
			>
				<form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
					<div className='text-base'>
						<Select
							label='Name'
							id='prospect_id'
							title='name'
							register={register}
							required
						>
							<option selected disabled value=''>
								Select a contact
							</option>
							{prospectsLoading && dealContacts.length == 0 ? (
								<option disabled value=''>
									Fetching all prospects ...
								</option>
							) : null}
							{!prospectsLoading && dealContacts.length == 0 ? (
								<option disabled value=''>
									No Prospects Found
								</option>
							) : null}
							{loadingError ? (
								<option disabled value=''>
									Error encountered while loading prospects
								</option>
							) : null}

							{dealContacts.map((dealContact) => (
								<option
									key={dealContact._id}
									value={`${dealContact.name}, ${dealContact._id}`}
								>
									{dealContact.name}
								</option>
							))}
							{/* {prospects.length > 0 && prospects.map((prospect, i) => (
                <option key={i} value={`${prospect._id}-${prospect.name}`}>{prospect.name}</option>
              ))} */}
						</Select>
						<p className='text-error text-xs mb-2 -mt-3 capitalize'>
							{errors.name?.message}
						</p>
					</div>
					<div className='text-gray-800 rounded'>
						<Select
							title='deal_stage'
							label='Deal stage'
							id='deal_stage'
							register={register}
							required
						>
							<option selected disabled value=''>
								Select a stage
							</option>
							<option>Proposal</option>
							<option>Closed</option>
							<option>Negotiation</option>
							<option>Prospect</option>
						</Select>
						<p className='text-error text-xs mb-2 -mt-3 capitalize'>
							{errors.deal_stage?.message}
						</p>
					</div>
					<div className='text-gray-800'>
						<Input
							label='Amount'
							placeholder='Enter Amount'
							id='amount'
							type='number'
							title='amount'
							register={register}
							required
						/>
						<p className='text-error text-xs mb-2 -mt-3 capitalize'>
							{errors.amount?.message}
						</p>
					</div>
					<div>
						<Input
							label='Expected close date'
							placeholder='dd-mm-yy'
							id='close_date'
							type='date'
							title='close_date'
							register={register}
							required
						/>
						<p className='text-error text-xs mb-2 -mt-3 capitalize'>
							{errors.close_date?.message}
						</p>
					</div>
					<div>
						<Input
							label='Description'
							placeholder='Additional Info'
							id='description'
							title='description'
							register={register}
							required
						/>
						<p className='text-error text-xs mb-2 -mt-3 capitalize'>
							{errors.description?.message}
						</p>
					</div>

					<div className='mt-4 flex justify-end'>
						<button
							type='submit'
							className='bg-green rounded text-white px-10 py-2'
						>
							Create
						</button>
					</div>
				</form>
			</Modal>

			<div className='flex gap-2 justify-end'>
				<Button outline outlineColor='gray-500' onClick={handleOpenFilterModal}>
					Filter
				</Button>
				<Button onClick={handleOpenCreateModal}>Create New</Button>
			</div>

			{deals.length > 0 && !loading ? (
				<div className='overflow-x-auto'>
					<div className='w-max lg:w-full'>
						<div className='grid grid-cols-4 mt-5 border-gray-300'>
							<div className='px-24 lg:px-8 border-b border-gray-300 py-2 text-left'>
								<span className='block font-bold text-lg text-gray-700'>
									Prospects
								</span>
								<span className='text-sm text-gray-500'>
									{ProspectStage.length} deals • $ 1,500,000
								</span>
							</div>
							<div className='px-24 lg:px-8 text-left border-b border-gray-300 py-2'>
								<span className='block font-bold text-lg text-gray-700'>
									Proposal
								</span>
								<span className='text-sm text-gray-500'>
									{ProposalStage.length} deals • $ 1,500,000
								</span>
							</div>
							<div className='px-24 lg:px-8 text-left border-b border-gray-300 py-2'>
								<span className='block font-bold text-lg text-gray-700'>
									Negotiation
								</span>
								<span className='text-sm text-gray-500'>
									{NegotiationStage.length} deals • $ 1,500,000
								</span>
							</div>
							<div className='px-24 lg:px-8 text-left border-b border-gray-300 py-2'>
								<span className='block font-bold text-lg text-gray-700'>
									Closed
								</span>
								<span className='text-sm text-gray-500'>
									{ClosedStage.length} deals • $ 1,500,000
								</span>
							</div>
						</div>

						<div className='grid grid-cols-4 border border-t-0 border-gray-300 rounded h-screen2'>
							<div className='border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4'>
								{deals
									.filter(
										(x) =>
											x.deal_stage && x.deal_stage.toLowerCase() === "prospect"
									)
									.map((deal, i) => (
										<DealCard key={deal._id} deal={deal} index={i} />
									))}
							</div>
							<div className=' border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4'>
								{deals
									.filter(
										(x) =>
											x.deal_stage && x.deal_stage.toLowerCase() === "proposal"
									)
									.map((deal, i) => (
										<DealCard key={deal._id} deal={deal} index={i} />
									))}
							</div>
							<div className=' border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4'>
								{deals
									.filter(
										(x) =>
											x.deal_stage &&
											x.deal_stage.toLowerCase() === "negotiation"
									)
									.map((deal, i) => (
										<DealCard key={deal._id} deal={deal} index={i} />
									))}
							</div>
							<div className=' border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4'>
								{deals
									.filter(
										(x) =>
											x.deal_stage && x.deal_stage.toLowerCase() === "closed"
									)
									.map((deal, i) => (
										<DealCard key={deal._id} deal={deal} index={i} />
									))}
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{loading ? (
						<div>
							<img
								src={Loader}
								alt='loader'
								className='animate-spin'
								id='loader'
							/>
							<h2 className='font-medium text-2xl text-black-500 text-center'>
								Loading available deals
							</h2>
							<br />
							<p className='text-base text-gray-400 text-center'>
								Please wait a while
							</p>
						</div>
					) : (
						<div className='mt-4'>
							<div className='flex w-100 items-center justify-center flex-col text-center pt-32'>
								<div className='shadow-lg w-96 justify-center flex p-10 flex-col items-center'>
									<FileIcon />
									<p className='font-bold text-xl mt-5'>
										You have no deal yet!
									</p>
									<p className='max-w-sm py-3 flex-wrap text-gray-400'>
										Keep track of business transactions with all your deals in
										an organised manner. Quickly add a deal to get started.
									</p>
									<div className='flex'>
										<button
											className='border-green px-4 rounded-sm text-green mr-2'
											onClick={handleCloseModal}
										>
											Skip
										</button>
										<Button
											outline
											className=''
											onClick={handleOpenCreateModal}
										>
											Add Deal
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};
export default Deals;
