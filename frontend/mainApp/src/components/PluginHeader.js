import React, { useEffect, useState } from "react"
import Parcel from 'single-spa-react/parcel'
import { pluginHeader } from '@zuri/plugin-header'
import ChatInfo from "./ChatInfo"
import { useContext } from "react"
import { PluginContext } from "../context/store"
import { Music } from 'react-feather'


function PluginHeader() {
    const [modalOpen, setModalOpen] = useState(false)

    const { workspaceUsers, members, addToRoomFunction, removeFromRoomFunction } = useContext(PluginContext);

    const defaultImg = 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'
    // let firstUserImg = workspaceUsers[0]?.image_url ? workspaceUsers[0].image_url : 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'
    // let secondUserImg = workspaceUsers[1]?.image_url ? workspaceUsers[1].image_url : 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'
    // let thirdUserImg = workspaceUsers[2]?.image_url ? workspaceUsers[2].image_url : 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'


    const filteredMembers = workspaceUsers.filter( user => members.find(id => user._id === id))
    console.log("filteredMembers", filteredMembers)

    console.log("workspaceUsers", workspaceUsers)
    const headerConfig = {
            name: 'Sales Plugin', //Name on header
            icon: Music, //Image on header
            thumbnailUrl: [defaultImg, defaultImg, defaultImg],
            // thumbnailUrl: workspaceUsers.length > 0 && workspaceUsers.slice(0, 3).map(user => user.image_url ? user.image_url : defaultImg), //Replace with images of users
            userCount: members.length, //User count on header
            hasThumbnail: true,
            roomInfo: {
                membersList: filteredMembers.map(user => {
                    return {
                        ...user,
                        value:user._id,
                        label:user.email
                    }
                }),
                addmembersevent: values => addToRoomFunction(values),
                removememberevent: id => removeFromRoomFunction(id)
            }
        }


    return (
        <>
            <Parcel
                config={pluginHeader}
                wrapWith="div"
                wrapStyle={{ width: "100%" }}
                headerConfig={headerConfig}
            />
            <ChatInfo modalOpen={modalOpen} handleClose={() => setModalOpen((false))} workSpaceUsers={workspaceUsers} />
        </>
    )
}

export default PluginHeader
