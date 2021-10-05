import React, { useEffect, useState } from "react"
import Parcel from 'single-spa-react/parcel'
import { pluginHeader } from '@zuri/plugin-header'
import { GetWorkspaceUsers } from '@zuri/control'
import ChatInfo from "./ChatInfo"



function PluginHeader() {
    const [modalOpen, setModalOpen] = useState(false)
    const [workspaceUsers, setWorkspaceUsers] = useState(0);
    useEffect(() => {
        async function call() {   
            try {
                const users = await GetWorkspaceUsers();
                setWorkspaceUsers(users)
            } catch (err) {
                console.log(err)
            }
        }
        call();
    }, [])

    let firstUserImg = workspaceUsers[0]?.image_url ? workspaceUsers[0].image_url : 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'
    let secondUserImg = workspaceUsers[1]?.image_url ? workspaceUsers[1].image_url : 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'
    let thirdUserImg = workspaceUsers[2]?.image_url ? workspaceUsers[2].image_url : 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'

    const pluginConfig = {
        name: 'Sales Plugin', //Name on header
        icon: 'https://www.pngfind.com/pngs/m/19-194225_png-file-svg-hashtag-icon-png-transparent-png.png', //Image on header
        thumbnailUrl: [
            firstUserImg,
            secondUserImg,
            thirdUserImg,
        ], //Replace with images of users
        userCount: workspaceUsers?.totalUsers, //User count on header
        eventTitle: () => {
            //Block of code to be triggered on title click
        },
        eventThumbnail: () => {
            setModalOpen((value) => !value)
            //Block of code to be triggered on thumbnail click
        },
        hasThumbnail: true //set false if you don't want thumbnail on the header
    }

    return (
        <>
            <Parcel
                config={pluginHeader}
                wrapWith="div"
                wrapStyle={{ width: "100%" }}
                headerConfig={pluginConfig}
            />
            <ChatInfo modalOpen={modalOpen} handleClose={() => setModalOpen((value) => !value)} workSpaceUsers={workspaceUsers} />
        </>
    )
}

export default PluginHeader
