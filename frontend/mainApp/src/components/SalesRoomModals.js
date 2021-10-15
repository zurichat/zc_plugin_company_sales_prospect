import Parcel from "single-spa-react/parcel"
import { AddUserModal as RoomModal } from "@zuri/manage-user-modal"
import { GetWorkspaceUsers } from '@zuri/control'

import React, { useState } from 'react'
import { useEffect } from "react"
import Button from "./Button"
import customAxios from "../axios"
import { customAlert } from "../utils"
import { useContext } from "react"
import { PluginContext } from "../context/store"




export const AddUserModal = () => {

    const { workspaceUsers, setMembers } = useContext(PluginContext);

    const addMembersEvent = members => {
        customAxios.post(`/org/6153d9c4a999ef8386e80804/room/615832ad87540d8d01ffc700/members/`, {
            room_id: "615832ad87540d8d01ffc700",
            members_id: members

        })
            .then(r => {
                customAlert("Successfully removed user")
                customAxios.get("/org/6153d9c4a999ef8386e80804/room/615832ad87540d8d01ffc700")
                    .then(r => {
                        setMembers(r.data.members)
                    })
            })
            .catch(e => customAlert("Couldn't remove user", type = "error"))
    }

    const [show, setShow] = useState(false)
    // const [workspaceUsers, setWorkspaceUsers] = useState([]);
    console.log(workspaceUsers)
    const _config = {
        userList:
            workspaceUsers.map(r => {
                return {
                    ...r,
                    value: r.id,
                    label: r.email
                }
            }),
        addMembersEvent: members => addMembersEvent(members),
        show,
        handleClose: () => setShow(false),
        title: "Add users",
        type: "addmodal"
    }
    const [config, setConfig] = useState(_config);

    return (
        <div>
            <Button className="m-1" onClick={() => setShow(true)}>Add Users</Button>
            <Parcel
                config={RoomModal}
                wrapWith="div"
                parcelConfig={_config}
            />
        </div>
    )
}

export const RemoveUserModal = () => {

    const { members, setMembers } = useContext(PluginContext);

    const removeFunction = id => {
        customAxios.post(`/org/6153d9c4a999ef8386e80804/room/615832ad87540d8d01ffc700/members/${id}`, {
            room_id: "615832ad87540d8d01ffc700",
            members_id: [id]

        })
            .then(r => {
                customAlert("Successfully removed user")
                customAxios.get("/org/6153d9c4a999ef8386e80804/room/615832ad87540d8d01ffc700")
                    .then(r => {
                        setMembers(r.data.members)
                    })
            })
            .catch(e => customAlert("Couldn't remove user", type = "error"))
    }

    const [show, setShow] = useState(false)
    // const [workspaceUsers, setWorkspaceUsers] = useState([]);
    const _members = members.map((r,i) => {
        return {
            ...r,
            name: "Elijah"+i
        }
    })
    const _config = {
        currentMembers: [
            ..._members
            // {
            //     id: "xxx",
            //     name: "Elijah",
            //     image: ""
            // },
        ],
        removeFunction: id => removeFunction(id),
        show,
        handleClose: () => setShow(false),
        title: "Remove users",
        type: "removemodal"
    }
    const [config, setConfig] = useState(_config);

    return (
        <div>
            <Button className="m-1" onClick={() => setShow(true)}>Remove Users</Button>
            <Parcel
                config={RoomModal}
                wrapWith="div"
                parcelConfig={_config}
            />
        </div>
    )
}

const { members, setMembers } = useContext(PluginContext);

const removeFunction = id => {
    // Call the endpoint that removes a user from a room and
    // Call the endpoint that returns add users in a room so as to update the users in that room
}
<Parcel
    config={{
        ...config,
        members // this will always be updated
    }}
    wrapWith="div"
    parcelConfig={_config}
/>