import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
// import Input from '../components/Input'
import Modal from "../components/Modal";
import ProspectRow from "../components/ProspectRow";
import {
	ChevronLeft,
	ChevronRight,
	Twitter,
	Linkedin,
	Facebook,
	Instagram,
} from "react-feather";
// import Select from '../components/Select'
import customAxios, {
	createProspectURL,
	editProspectURL,
	prospectsURL,
	deleteProspectURL,
	createDealURL,
	batchDeleteProspectURL,
} from "../axios";
import FileIcon from "../components/svg/FileIcon";
// import { Link } from 'react-router-dom'
import { customAlert, doesProspectExist } from "../utils";
import Loader from "../components/svg/Loader.svg";
// import {UserModals} from "../utilities/ManageRoom";

import { PluginContext } from "../context/store";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup.string().required(),
//   phone_number: yup.string().required(),
//   company: yup.string().required(),
// });
// const { register,handleSubmit, formState: { errors }, } = useForm({resolver: yupResolver(schema)});

export const Input = ({
	title,
	label,
	placeholder,
	disabled = false,
	id,
	onChange,
	value,
	defaultValue,
	type,
}) => {
	return (
		<div className='mb-6'>
			<label className=' mb-2 block font-bold text-base' htmlFor={title}>
				{label}
			</label>
			<input
				className='border border-gray-500 outline-none placeholder-opacity-50 placeholder-gray-400 rounded-sm h-12 text-sm w-full px-5 focus:border-green'
				onChange={onChange}
				id={id}
				value={value}
				type={type || "text"}
				defaultValue={defaultValue}
				placeholder={placeholder}
				disabled={disabled}
				required
			/>
		</div>
	);
};

export const Select = ({
	id,
	title,
	label,
	children,
	disabled,
	onChange,
	value,
	defaultValue,
}) => {
	return (
		<div className='mb-6' id={title}>
			<label className=' mb-2 block font-bold text-base' htmlFor={title}>
				{label}
			</label>

			<select
				id={id}
				value={value}
				required
				className='border border-gray-500 text-gray-500 outline-none rounded-sm px-5 h-12 w-full  focus:border-green'
				onChange={onChange}
				defaultValue={defaultValue}
				disabled={disabled}
				required
			>
				{children}
			</select>
		</div>
	);
};

function Prospects() {
	const { prospects, setProspects } = useContext(PluginContext);
	const [usersModal, setUsersModal] = useState(false);

	const [prospect, setProspect] = useState({
		id: "",
		name: "",
		email: "",
		phone_number: "",
		company: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		instagram: "",
	});

	const [page, setPage] = useState(1);

	const [deal, setDeal] = useState(null);

	const [loading, setLoading] = useState(true);

	const [open, setOpen] = useState(false);
	const handleOpenCreateModal = () => setOpen(true);

	const [open6, setOpen6] = useState(false);
	const handleUserManageModal = () => setOpen6(true);

	const [open2, setOpen2] = useState(false);
	const handleOpenEditModal = (e, prospect) => {
		setProspect(prospect);
		setOpen2(true);
	};

	const [open3, setOpen3] = useState(false);
	const handleOpenDeleteModal = (e, prospect) => {
		setProspect(prospect);
		setOpen3(true);
	};

	const [open5, setOpen5] = useState(false);
	const handleOpenSocialModal = (e, social) => {
		setOpen5(true);
	};

	const [open4, setOpen4] = useState(false);
	const handleOpenDealCreateModal = (e, prospect) => {
		setProspect(prospect);
		const newDeal = {
			prospect_id: prospect._id,
			name: prospect.name,
		};
		setDeal(newDeal);
		setOpen4(true);
	};

	const [socialInfo, setSocialInfo] = useState(null);

	const handleCloseModal = () => {
		setDeal(null);
		setProspect({
			id: "",
			name: "",
			email: "",
			phone_number: "",
			company: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			instagram: "",
		});
		setOpen(false);
		setOpen2(false);
		setOpen3(false);
		setOpen4(false);
		setOpen5(false);
		setOpen6(false);
	};

	// console.log(socialInfo);

	const pageForward = () => {
		setLoading(true);
		setPage(prospects.pageNum + 1);
	};

	const pageBackward = () => {
		setLoading(true);
		setPage(prospects.pageNum - 1);
	};

	useEffect(() => {
		customAxios
			.get(prospectsURL, {
				params: { page: page },
			})
			.then(({ data }) => {
				// console.log(data.contacts);
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
				// console.warn("Error fetching prospects!")
			});
	}, [page]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const isProspect = doesProspectExist(prospects.contacts, prospect.name);
		if (!isProspect) {
			customAxios
				.post(createProspectURL, prospect)
				.then((r) => {
					handleCloseModal();
					customAxios
						.get(prospectsURL)
						.then(({ data }) => {
							setProspects({
								contacts: data.contacts,
								next: data.next,
								pageNum: data.pageNum,
								prev: data.prev,
							});
						})
						.then(() => {
							axios
								.post(
									"https://sales.zuri.chat/api/v1/scraping/",
									prospect.facebook
								)
								.then((res) => {
									setSocialInfo(res.data);
								})
								.catch((err) => {
									console.log(err);
									setSocialInfo(err.message);
								});
						})
						.catch((e) => console.log(e.response));
					// const latestProspect = formatProspect(prospect)
					// setProspects([...prospects, latestProspect]);
					customAlert("Prospects Successfully Created", "success");
				})
				.catch((e) => {
					console.log(e);
					customAlert("Error Creating Contact", "error");
				});
		} else {
			alert("Prospect already exists");
		}
	};

	const handleDealCreate = (e) => {
		e.preventDefault();
		const dealInfo = {
			...deal,
			prospect_id: prospect._id,
			name: prospect.name,
		};
		customAxios
			.post(createDealURL, dealInfo)
			.then((r) => {
				handleCloseModal();
				customAlert("Deal created successfully", "success");
				// history.push("/deals");
			})
			.catch((e) => {
				console.log(e);
				customAlert("Oops, something went wrong", "error");
			});
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const apiProspect = {
			object_id: prospect._id,
			name: prospect.name,
			email: prospect.email,
			phone_number: prospect.phone_number,
			company: prospect.company,
			twitter: prospect.twitter,
			facebook: prospect.facebook,
			linkedin: prospect.linkedin,
			instagram: prospect.instagram,
		};
		customAxios
			.put(editProspectURL, apiProspect)
			.then((r) => {
				customAlert("Contact Edited Successfully", "success");
				handleCloseModal();
				customAxios
					.get(prospectsURL)
					.then(({ data }) => {
						setProspects({
							contacts: data.contacts,
							next: data.next,
							pageNum: data.pageNum,
							prev: data.prev,
						});
					})
					.catch((e) => console.log(e.response));
			})
			.then(() => {
				axios
					.post(
						"https://sales.zuri.chat/api/v1/scraping/",
						apiProspect.facebook
					)
					.then((res) => {
						setSocialInfo(res.data);
					})
					.catch((err) => {
						console.log(err);
						setSocialInfo(err.message);
					});
			})

			.catch((e) => {
				console.log(e);
				customAlert("Oops, something went wrong", "error");
			});
	};

	const deleteLinkedProspects = (prospectID) => {
		const filterBy = {
			filter: [prospectID],
		};
		console.log(filterBy);
		customAxios
			.post(bashDeleteDealsURL, filterBy)
			.then((r) => {
				// console.log(r);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleDelete = (e) => {
		e.preventDefault();
		customAxios
			.delete(`${deleteProspectURL}${prospect._id}/`)
			.then((r) => {
				handleCloseModal();
				deleteLinkedProspects(prospect._id);
				customAxios
					.get(prospectsURL)
					.then(({ data }) => {
						customAlert("Contact Deleted Successfully", "success");
						setProspects({
							contacts: data.contacts,
							next: data.next,
							pageNum: data.pageNum,
							prev: data.prev,
						});
					})
					.catch((e) => console.log(e.response));
			})
			// .catch(e => console.log(e))

			.catch((e) => {
				console.log(e);
				customAlert("Oops, something went wrong", "error");
			});
	};

	const handleChange = ({ target }) => {
		setProspect({
			...prospect,
			[target.id]: target.value,
		});
	};

	const handleDealChange = ({ target }) => {
		setDeal({
			...deal,
			[target.id]: target.value,
		});
	};
	const [BatchDeleteProspect, setBatchDeleteProspect] = useState([]);
	// console.log(BatchDeleteProspect);
	// console.log(BatchDeleteProspect.length);
	const [checkedBoxes, setCheckedBoxes] = useState([]);
	const [deleteAll, setDeleteAll] = useState(false);
	const [bulkDelete, setBulkDelete] = useState(false);
	const [def, setDef] = useState(true);
	const toggleCheckbox = (e, item) => {
		//    console.log(item);
		//  console.log(e.target.checked);
		// if (deleteAll == true) {
		// setDeleteAll(false)
		//

		// console.log(e.target.checked);
		// check if it is inside the BatchDeleteProspect array
		let newArray = BatchDeleteProspect;

		if (e.target.checked) {
			const newData = { id: item._id, email: item.email };
			newArray.push(newData);
			setBatchDeleteProspect(newArray);
			// console.log(newArray.length);
			if (newArray.length == prospects.contacts.length) {
				// setDeleteAll(true);
			}
			if (newArray.length !== 0) {
				setBulkDelete(true);
			}

			// setBatchDeleteProspect(newArray);
		} else {
			//       if (deleteAll == true) {
			//   // setDeleteAll(false);
			//   // e.target.checked=true
			//   // toggleCheckbox(e,item)
			//   setDef(false)
			// console.log(e.target.checked);
			// }

			// let newArray = BatchDeleteProspect;

			let items = newArray.filter((each) => each.id !== item._id);
			// let items = newArray.splice(newArray.indexOf(item.id), 1);
			if (deleteAll == true) {
				setDeleteAll(false);
				setBatchDeleteProspect([]);
				setBulkDelete(false);
			} else {
				setBatchDeleteProspect(items);
			}

			// setDeleteAll(false);
			if (items.length == 0) {
				setBulkDelete(false);
			}
		}
	};

	const handleBatchDelete = (e) => {
		e.preventDefault();
		console.log(BatchDeleteProspect);
		let emails = [];
		BatchDeleteProspect.map((each) => {
			emails.push(each.email);
		});
		const payload = { filter: emails };
		setBulkDelete(false);
		setDeleteAll(false);
		customAxios
			.post(`${batchDeleteProspectURL}`, payload)
			.then((r) => {
				console.log(r.data);
				setBatchDeleteProspect([]);

				customAxios.get(prospectsURL).then(({ data }) => {
					setProspects({
						contacts: data.contacts,
						next: data.next,
						pageNum: data.pageNum,
						prev: data.prev,
					});
				});
			})

			.catch((e) => {
				setBatchDeleteProspect([]);
				console.log(e?.response);
				customAlert("Oops, something went wrong", "error");
			});
	};

	const selectAll = (contacts) => {
		setDeleteAll(!deleteAll);

		const contactToBeDeleted = [];
		contacts.map((eachContact) => {
			contactToBeDeleted.push({
				email: eachContact.email,
				id: eachContact._id,
			});
		});
		if (deleteAll == false) {
			setBatchDeleteProspect(contactToBeDeleted);
			setBulkDelete(true);
		} else {
			setBatchDeleteProspect([]);
			setBulkDelete(false);
			console.log(bulkDelete);
		}
	};

	return (
		// <div className='p-10 w-screen'>
		// 	<div className='flex justify-between items-center'>
		// 		<h3 className='text-2xl font-bold'>Contact</h3>
		// 		<Button onClick={handleOpenCreateModal}>Create New</Button>
		// 	</div>

		<div className='p-10 w-screen'>
			<div className='flex justify-between items-center'>
				<h3 className='text-2xl font-bold'>Contact</h3>
				<div className='flex justify-between'>
					{bulkDelete ? (
						<Button className='m-1 bg-error' onClick={handleBatchDelete}>
							Delete
						</Button>
					) : (
						<Button onClick={() => setOpen6(true)} className='m-1'>
							Manage Users
						</Button>
					)}
					<Link to='/email'>
						<Button className='m-1'>Send Email</Button>
					</Link>
					<Button className='m-1' onClick={handleOpenCreateModal}>
						Create New
					</Button>
				</div>{" "}
			</div>

			{/* MANAGE USERS MODAL */}
			{/* <UserModals show={open6} setShow={setOpen6} /> */}

			{/* CREATE MODAL */}
			<Modal
				title='Create Contact'
				description='Please input your contact information'
				open={open}
				closeModal={handleCloseModal}
			>
				<form className='my-auto' onSubmit={handleSubmit}>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Name
						</label>
						<Input
							className='text-sm'
							placeholder='Enter Full Name'
							onChange={handleChange}
							id='name'
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Email
						</label>
						<Input
							placeholder='Enter Email'
							type='email'
							onChange={handleChange}
							id='email'
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Phone Number
						</label>
						<Input
							placeholder='Enter Phone Number'
							onChange={handleChange}
							id='phone_number'
							type='tel'
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Company
						</label>
						<Input
							placeholder='Enter Company'
							onChange={handleChange}
							id='company'
						/>
					</div>
					<div className='mb-6'>
						<label className='block font-bold text-base text-gray-800'>
							Twitter Username
						</label>
						<input
							className='border border-gray-500 outline-none placeholder-opacity-50 placeholder-gray-400 rounded-sm h-12 text-sm w-full px-5 focus:border-green'
							onChange={handleChange}
							id='twitter'
							type='text'
							placeholder='Enter Twitter Username'
						/>
					</div>
					<div className='mb-6'>
						<label className='block font-bold text-base text-gray-800'>
							Facebook Username
						</label>
						<input
							className='border border-gray-500 outline-none placeholder-opacity-50 placeholder-gray-400 rounded-sm h-12 text-sm w-full px-5 focus:border-green'
							onChange={handleChange}
							id='facebook'
							type='text'
							placeholder='Enter Facebook Username'
						/>
					</div>
					<div className='mb-6'>
						<label className='block font-bold text-base text-gray-800'>
							LinkedIn Username
						</label>
						<input
							className='border border-gray-500 outline-none placeholder-opacity-50 placeholder-gray-400 rounded-sm h-12 text-sm w-full px-5 focus:border-green'
							onChange={handleChange}
							id='linkedin'
							type='text'
							placeholder='Enter LinkedIn Username'
						/>
					</div>
					<div className='mb-6'>
						<label className='block font-bold text-base text-gray-800'>
							Instagram Username
						</label>
						<input
							className='border border-gray-500 outline-none placeholder-opacity-50 placeholder-gray-400 rounded-sm h-12 text-sm w-full px-5 focus:border-green'
							onChange={handleChange}
							id='instagram'
							type='text'
							placeholder='Enter Instagram Username'
						/>
					</div>

					<div className='mt-4 flex justify-end'>
						<button
							type='submit'
							className='bg-green rounded mt-5 text-white px-10 py-2'
						>
							Create
						</button>
					</div>
				</form>
			</Modal>

			{socialInfo !== null ? (
				<Modal
					title='Your Social Information'
					description='Your profile information from Facebook'
					open={open5}
					closeModal={handleCloseModal}
				>
					{socialInfo.map((info, index) => (
						<div key={index} className='flex flex-col'>
							<h1>FaceBook</h1>
							<p>Name: {info.data.name}</p>
							<p>Education: {info.education}</p>
							<p>Address: {info.data.address}</p>
							<p>Favourite Quote: {info.data.favourite_quote}</p>
						</div>
					))}
				</Modal>
			) : (
				<Modal open={open5} closeModal={handleCloseModal}>
					<h1 className='text-xl text-center font-bold'>
						No Social Information
					</h1>
				</Modal>
			)}

			{/* EDIT MODAL */}
			<Modal
				title='Edit Contact'
				description='Provide information about your contact.'
				open={open2}
				closeModal={handleCloseModal}
			>
				<form className='mt-2' onSubmit={handleUpdate}>
					<div className='text-gray-500'>
						<label className='block font-bold text-base text-gray-800'>
							Name
						</label>
						<Input
							placeholder='Jane Cooper'
							id='name'
							defaultValue={prospect.name}
							onChange={handleChange}
						/>
					</div>
					<div className='text-gray-500'>
						<label className='block font-bold text-base text-gray-800'>
							Email
						</label>
						<Input
							placeholder='jane.cooper@example.com'
							id='email'
							defaultValue={prospect.email}
							onChange={handleChange}
						/>
					</div>
					<div className='text-gray-500'>
						<label className='block font-bold text-base text-gray-800'>
							Phone Number
						</label>
						<Input
							placeholder='09093527277'
							id='phone_number'
							type='tel'
							defaultValue={prospect.phone_number}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Company
						</label>
						<Input
							placeholder='Enter Company'
							onChange={handleChange}
							id='company'
							defaultValue={prospect.company}
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Twitter Username
						</label>
						<Input
							placeholder='Enter Twitter Username'
							onChange={handleChange}
							id='twitter'
							defaultValue={prospect.twitter}
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Facebook Username
						</label>
						<Input
							placeholder='Enter Facebook Username'
							onChange={handleChange}
							id='facebook'
							defaultValue={prospect.facebook}
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							LinkedIn Username
						</label>
						<Input
							placeholder='Enter LinkedIn Username'
							onChange={handleChange}
							id='linkedin'
							defaultValue={prospect.linkedin}
						/>
					</div>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Instagram Username
						</label>
						<Input
							placeholder='Enter Instagram Username'
							onChange={handleChange}
							id='instagram'
							defaultValue={prospect.instagram}
						/>
					</div>
					<div className='mt-8 flex justify-end'>
						<button
							type='submit'
							className='bg-green text-white rounded px-10 py-2'
						>
							Edit
						</button>
					</div>
				</form>
			</Modal>

			{/* DELETE MODAL */}
			<Modal
				title='Delete Prospect'
				description='This prospect will be deleted, this action cannot be undone.'
				open={open3}
				closeModal={handleCloseModal}
			>
				<div className='mt-2 text-gray-500'>
					<div>
						<label className='block font-bold text-base text-gray-800'>
							Name
						</label>
						<Input
							placeholder='Jane Cooper'
							id='name'
							value={prospect.name}
							disabled
						/>
					</div>
					<div className='text-gray-500'>
						<label className='block text-base text-gray-800 font-bold'>
							Email
						</label>
						<Input
							placeholder='jane.cooper@example.com'
							id='email'
							value={prospect.email}
							disabled
						/>
					</div>
					<div className='text-gray-500'>
						<label className='block text-base text-gray-800 font-bold'>
							Phone Number
						</label>
						<Input
							placeholder='09093527277'
							id='phone_number'
							value={prospect.phone_number}
							disabled
						/>
					</div>
					<div>
						<label className='block text-base text-gray-800 font-bold'>
							Company
						</label>
						<Input
							placeholder='Enter Company'
							onChange={handleChange}
							id='company'
							defaultValue={prospect.company}
						/>
					</div>
					<div>
						<label className='block text-base text-gray-800 font-bold'>
							Twitter Username
						</label>
						<Input
							placeholder='Twitter Username'
							onChange={handleChange}
							id='twitter'
							defaultValue={prospect.twitter}
						/>
					</div>
					<div>
						<label className='block text-base text-gray-800 font-bold'>
							Facebook Username
						</label>
						<Input
							placeholder='Facebook Username'
							onChange={handleChange}
							id='facebook'
							defaultValue={prospect.facebook}
						/>
					</div>
					<div>
						<label className='block text-base text-gray-800 font-bold'>
							LinkedIn Username
						</label>
						<Input
							placeholder='LinkedIn Username'
							onChange={handleChange}
							id='linkedin'
							defaultValue={prospect.linkedin}
						/>
					</div>
					<div>
						<label className='block text-base text-gray-800 font-bold'>
							Instagram Username
						</label>
						<Input
							placeholder='Instagram Username'
							onChange={handleChange}
							id='instagram'
							defaultValue={prospect.instagram}
						/>
					</div>
				</div>

				<div className='mt-4 flex justify-end'>
					<button
						type='button'
						className='text-green rounded px-10 py-2 mr-2'
						onClick={handleCloseModal}
					>
						No, Keep
					</button>
					<button
						type='button'
						className='bg-error rounded text-white px-10 py-2'
						onClick={handleDelete}
					>
						Yes, Delete
					</button>
				</div>
			</Modal>

			{/* CREATE DEAL MODAL */}
			<Modal
				title='Create a deal'
				description={`Create a deal for ${prospect.name}.`}
				open={open4}
				closeModal={handleCloseModal}
			>
				<form className='mt-2' onSubmit={handleDealCreate}>
					<div className='text-gray-800'>
						<Select
							title='stage'
							label='Deal stage'
							id='deal_stage'
							onChange={handleDealChange}
						>
							<option>Select a stage</option>
							<option>Proposal</option>
							<option>Closed</option>
							<option>Negotiation</option>
							<option>Prospect</option>
						</Select>
					</div>
					<div className='text-gray-500'>
						<label className='block font-bold text-base text-gray-800'>
							Amount
						</label>
						<Input
							type='number'
							onChange={handleDealChange}
							placeholder='Enter Amount'
							id='amount'
						/>
					</div>
					<div className='text-gray-500'>
						<label className='block font-bold text-base text-gray-800'>
							Expected close date
						</label>
						<Input
							placeholder='dd-mm-yy'
							onChange={handleDealChange}
							id='close_date'
							type='date'
						/>
					</div>
					<div className='text-gray-500'>
						<label className='block font-bold text-base text-gray-800'>
							Description
						</label>
						<Input
							placeholder='Additional info'
							onChange={handleDealChange}
							id='description'
						/>
					</div>

					<div className='mt-4 flex justify-end'>
						<button
							type='submit'
							onClick={() => handleDealCreate()}
							className='bg-green rounded text-white px-10 py-2'
						>
							Create
						</button>
					</div>
				</form>
			</Modal>
			{prospects?.contacts?.length > 0 && !loading ? (
				<div className='mt-4'>
					<div className='overflow-x-auto overflow-y-hidden rounded-md'>
						<table className='text-left border-gray-100 w-full'>
							<thead className='border-b cursor-pointer'>
								<tr>
									<th className='px-3 py-4'>
										<span className='flex items-center'>
											<input
												className='mr-4'
												type='checkbox'
												name=''
												id='all'
												checked={deleteAll}
												// checked={deleteAll}
												onChange={() => {
													selectAll(prospects.contacts);
												}}
											/>
											<label htmlFor='all'>Name</label>
										</span>
									</th>
									<th className='px-3 py-4 hidden sm:table-cell sm:text-sm '>
										Email
									</th>
									<th className='px-3 py- hidden sm:table-cell sm:text-sm  '>
										Phone Number
									</th>
									<th className='px-3 py-4 hidden sm:table-cell  sm:text-sm'>
										Company
									</th>
									<th className='px-3 py-4   sm:text-sm sm:justify-between '>
										{" "}
										Actions{" "}
									</th>
								</tr>
							</thead>
							<tbody className='bg-white'>
								{prospects.contacts.map((prospect, i) => (
									<ProspectRow
										key={i}
										deletemany={deleteAll} //deleteAll;
										// deletemany = {bulkDelete}//deleteAll;

										checkedBoxes={checkedBoxes}
										// setCheckedBoxes={setCheckedBoxes}
										default={def}
										toggleCheckbox={toggleCheckbox}
										setCheckedBoxes={setCheckedBoxes}
										openEditModal={handleOpenEditModal}
										openDealCreateModal={handleOpenDealCreateModal}
										openDeleteModal={handleOpenDeleteModal}
										prospect={prospect}
									/>
								))}
							</tbody>
						</table>
					</div>
					{/* Pagination */}
					<div className='flex list-none justify-end items-center mt-5'>
						<button
							onClick={() => pageBackward()}
							disabled={!prospects.prev}
							className='flex items-center py-2 px-3 cursor-pointer border-0 disabled:text-gray-300 sm:hidden'
						>
							{" "}
							<ChevronLeft strokeWidth={1} />{" "}
							<span className='py-2 px-3'>Prev</span>
						</button>
						<div className='bg-green-light text-green rounded-sm py-2 px-4'>
							{prospects.pageNum}
						</div>
						<button
							onClick={() => pageForward()}
							disabled={!prospects.next}
							className='flex items-center py-2 px-3 cursor-pointer border-0 disabled:text-gray-300'
						>
							<span className='py-2 px-3'>Next</span>{" "}
							<ChevronRight strokeWidth={1} />{" "}
						</button>
					</div>
				</div>
			) : (
				<>
					{loading ? (
						<div>
							<img
								src={Loader}
								alt='loader'
								className='animate-ping'
								id='loader'
							/>
							<h2 className='font-medium text-2xl text-black-500 text-center'>
								Loading available prospects
							</h2>
							<br />
							<p className='text-base text-gray-400 text-center'>
								Please wait a while
							</p>
						</div>
					) : (
						<div className='mt-4'>
							<div className='overflow-x-auto overflow-y-hidden rounded-md'>
								<table className='text-left border-gray-100 w-full'>
									<thead className='border-b cursor-pointer'>
										<tr>
											<th className='px-3 py-4 flex items-center'>
												<input
													className='mr-4'
													type='checkbox'
													name=''
													id='all'
												/>
												<label htmlFor='all'>Name</label>
											</th>
											<th className='px-3 py-4 block md:hidden '>Email</th>
											<th className='px-3 py-4'>Phone Number</th>
											<th className='px-3 py-4'>Company</th>
											<th className='px-3 py-4'> Actions </th>
										</tr>
									</thead>
								</table>
								<div className='flex w-100 items-center justify-center flex-col text-center pt-32'>
									<div className='shadow-lg w-96 justify-center flex p-10 flex-col items-center'>
										<FileIcon />
										<p className='font-bold text-xl mt-5'>
											You have no contact yet!
										</p>
										<p className='max-w-sm py-3 flex-wrap text-gray-400'>
											Keep track of business transactions with all your contacts
											in an organised manner. Quickly add a contact to get
											started.
										</p>
										<div className='flex'>
											<button
												className='border-green px-4 rounded-sm text-green mr-2'
												onClick={handleCloseModal}
											>
												Skip
											</button>
											<Button onClick={handleOpenCreateModal}>
												Add Contact
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Prospects;
