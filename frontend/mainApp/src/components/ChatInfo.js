import Modal from "./Modal"
import { Star } from 'react-feather'
import { useState } from "react"
import { Tab } from "@headlessui/react"

export default function ChatInfo({ workSpaceUsers, modalOpen, handleClose }) {
    const tabs = ["About", ("Members " + workSpaceUsers.length), "Integrations", "Settings"]
    const [tab, setTab] = useState(2)
    return (
        <Modal open={modalOpen} closeModal={handleClose}>

            <div>
                {/* {} */}
            </div>
            <Tab.Group>
                <div className=""><Star className="inline-block mr-2"/> <span className="p-1 border">Get Notifications for @ Mentions</span></div>
                <Tab.List className="pb-1 border-b flex justify-evenly">
                    {tabs.map((tab, i) => (
                        <Tab key={i} className={({ selected }) =>
                        selected ? 'border-0 border-b-2' : 'border-0 border-b-2 border-green'
                      }>{tab}</Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>Content 1</Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>Content 3</Tab.Panel>
                    <Tab.Panel>Content 4</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Modal>
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
