import React, { useEffect, useState } from "react";
import Parcel from "single-spa-react/parcel";
import { AddUserModal } from "@zuri/manage-user-modal";
import { GetWorkspaceUsers } from "@zuri/control";

function UserModals({ users }) {
	// const [workspaceUsers, setWorkspaceUsers] = useState({});
	// const [userList, setUserList] = useState([]);

	// useEffect(() => {
	// 	async function call() {
	// 		try {
	// 			const users = await GetWorkspaceUsers();
	// 			setWorkspaceUsers(users);
	// 			console.log(users);
	// 			console.log(workspaceUsers);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	}
	// 	call();
	// }, []);

	// useEffect(() => {
	// 	let currentUsers = workspaceUsers
	// 		? Object.keys(workspaceUsers)
	// 				.map((key) => {
	// 					if (+key || +key === 0) {
	// 						return workspaceUsers[key];
	// 					}
	// 				})
	// 				.filter((item) => item)
	// 				.map((user) => ({ value: user._id, label: user.user_name }))
	// 		: [];
	// 	setUserList(currentUsers);
	// 	console.log(userList);
	// }, workspaceUsers);

	// const users = workSpaceUsers
	// 	? Object.keys(workSpaceUsers)
	// 			.map((key) => {
	// 				if (+key || +key === 0) {
	// 					return workSpaceUsers[key];
	// 				}
	// 			})
	// 			.filter((item) => item)
	// 	: [];

	const userList = users.map((user, idx) => ({
		value: user._id,
		label: user.user_name,
	}));

	const parcelConfig = {
		title: "Sales room | Add to room",
		type: "inputbox" || "addmodal" || "removemodal",
		showModal: true,
		userList: userList,
		addMembersEvent: (users) => {},
	};

	return (
		<div>
			<Parcel
				config={AddUserModal}
				wrapWith='div'
				parcelConfig={parcelConfig}
			/>
		</div>
	);
}

function RemoveModals({ users }) {
	const userList = users.map((user, idx) => ({
		value: user._id,
		label: user.user_name,
	}));

	const parcelConfig = {
		title: "Sales room | Add to room",
		type: "inputbox" || "addmodal" || "removemodal",
		showModal: true,
		userList: userList,
		addMembersEvent: (users) => {},
	};

	return (
		<div>
			<Parcel
				config={AddUserModal}
				wrapWith='div'
				parcelConfig={parcelConfig}
			/>
		</div>
	);
}

// Remove users config
const defaultConfig = {
	currentMembers: [
		{
			id: "xxx",
			name: "xxx",
			image:
				"https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png",
		},
	],
	callback: (id) => console.log("REMOVE >>", id),
	show: true,
	title: "Remove users",
};

export { UserModals };
