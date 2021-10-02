import ModalTwo from "./ModalTwo"
import { useState } from "react"
export default function ChatInfo({ workSpaceUsers, modalOpen, handleClose }) {

    const users = workSpaceUsers ? Object.keys(workSpaceUsers).map((key) => {
        if (+key || +key === 0) {
            return workSpaceUsers[key]
        }
    }).filter((item) => item) : []
    console.log(users)
    return (
        <ModalTwo open={modalOpen} closeModal={handleClose} large
            title={<header >Sales Plugin</ header>}
            description={
                <div className={"flex text-lg p-3 border-b w-full justify-between border-gray-200"}>
                    <div className={"cursor-pointer"}>About</div>
                    <div className={"font-bold cursor-pointer text-green"}>Members</div>
                    <div className={" cursor-pointer"} >Integration</div>
                    <div className={"cursor-pointer"}>Settings</div>
                </div>
            }
        >

            <div className="flex w-full h-full flex-col flex-auto ">
                {
                    users.map((user, idx) => {
                        return (
                            <SingleUser key={idx} user={user} />
                        )
                    })
                }
            </div>
        </ModalTwo>
    )
}

const SingleUser = ({ user }) => {
    return (
        <div className="border-b flex items-center  border-gray-100 w-full py-4" >
            <div className={'h-12 w-12 overflow-hidden rounded-full mr-3'}>
                <img 
                    src={user?.image_url || 'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'}
                    alt=""
                    className={"h-full w-full"}
                />
            </div>
            <div className={"font-bold"}>
                {user.user_name}
            </div>
        </div>
    )
}