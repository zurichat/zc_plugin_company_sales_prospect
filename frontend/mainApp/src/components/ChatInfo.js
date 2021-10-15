import ModalTwo from "./ModalTwo";
import { useState } from "react";
import UserAdd from "./svg/UserAdd.svg";
import { UserModals } from "../utilities/ManageRoom";
import Button from "./Button";

export default function ChatInfo({ workSpaceUsers, modalOpen, handleClose }) {
	const users = workSpaceUsers
		? Object.keys(workSpaceUsers)
				.map((key) => {
					if (+key || +key === 0) {
						return workSpaceUsers[key];
					}
				})
				.filter((item) => item)
		: [];
	// console.log(users);

	const [showAddModal, setShowAddModal] = useState(false);

	const openAddUserModal = () => {
		console.log("Klikk!");
		setShowAddModal(true);
	};

	return (
		<>
			{showAddModal ? (
				<UserModals users={users} />
			) : (
				<ModalTwo
					open={modalOpen}
					closeModal={handleClose}
					large
					title={<header>Sales Plugin</header>}
					description={
						<div
							className={
								"flex text-lg p-3 border-b w-full justify-between border-gray-200"
							}
						>
							<div className={"cursor-pointer"}>About</div>
							<div className={"font-bold cursor-pointer text-green"}>
								Members
							</div>
							<div className={" cursor-pointer"}>Integration</div>
							<div className={"cursor-pointer"}>Settings</div>
						</div>
					}
				>
					<>
						<div className='flex gap-4'>
							<Button
								onClick={openAddUserModal}
								className={"flex gap-2 p-2 rounded-md cursor-pointer"}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
									/>
								</svg>
								<span>Add people</span>
							</Button>

							<Button
								onClick={openAddUserModal}
								className={"bg-error flex gap-2 p-2 rounded-md cursor-pointer"}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6'
									/>
								</svg>
								<span>Remove people</span>
							</Button>
						</div>

						<div className='flex w-full h-full flex-col flex-auto '>
							{users.map((user, idx) => {
								return <SingleUser key={idx} user={user} />;
							})}
						</div>
					</>
				</ModalTwo>
			)}
		</>
	);
}

const SingleUser = ({ user }) => {
	return (
		<div className='border-b flex items-center  border-gray-100 w-full py-4'>
			<div className={"h-12 w-12 overflow-hidden rounded-full mr-3"}>
				<img
					src={
						user?.image_url ||
						"https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png"
					}
					alt=''
					className={"h-full w-full"}
				/>
			</div>
			<div className={"font-bold"}>{user.user_name}</div>
		</div>
	);
};
