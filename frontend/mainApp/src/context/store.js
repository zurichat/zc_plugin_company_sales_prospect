import { createContext, useState } from 'react'
// import { useHistory } from "react-router-dom"

import customAxios, { addToRoomURL, dealsURL, leaveRoomURL, prospectsURL } from '../axios';
import { useEffect } from 'react';
import { prospectsRoom } from '../utils';
// import { SubscribeToChannel, GetUserInfo } from "@zuri/control"; "@zuri/control": "https://zuri.chat/zuri-control.js",

export const PluginContext = createContext(null)
export const PluginProvider = ({ children }) => {

    // const {pathname} = useHistory().location
    const [prospects, setProspects] = useState({
        contacts: [],
        next: false,
        pageNum: 1,
        prev: false
    })
    const [deals, setDeals] = useState([])

    const [inRoom, setInRoom] = useState(false);

    const [members, setMembers] = useState([])
    const [workspaceUsers, setWorkspaceUsers] = useState([]);
    const [currentWorkspace, setCurrentWorkspace] = useState(
        localStorage.getItem("currentWorkspace") || "6169c10ceb5b3de309e7e2a6"
    );
    const [room, setRoom] = useState(prospectsRoom);

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

    const addToRoomFunction = (values) => {
        const payload = {
            members_id:values.map(v => v.value)
        }
        customAxios.post(`/org/${currentWorkspace}/room/${room}/members/${user.id}/`,payload, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
        .then(()=> {
            getMembers()
        })
        .catch(e => console.log(e))
    }

    const addUserToRoomFunction = (_room) => {
        const payload = {
            members_id:[user.id]
        }
        customAxios.post(`/org/${currentWorkspace}/room/${_room}/members/${user.id}/`,payload, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
        .then(()=> {
            getMembers()
        })
        .catch(e => console.log(e))
    }

    const removeFromRoomFunction = id => {
        const payload = {
            members_id:[id]
        }
        customAxios.post(`/org/${currentWorkspace}/rroom/${room}/members/${user.id}/`,payload,{
            headers: { Authorization: `Bearer ${user.token}` }
        })
        .then(()=> {
            getMembers()
        })
        .catch(e => console.log(e))
    }

    const getMembers = () => {
        customAxios.get(`/org/${currentWorkspace}/room/${room}/`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
            .then(r => {
                setMembers(r.data.members)
                if(r.data.members.includes(user.id)){
                    setInRoom(true)
                }
                // we need to get full info not just id
            })
    }
    const getWorkspaceUsers = () => {
        customAxios.get(`https://api.zuri.chat/organizations/${currentWorkspace}/members`)
            .then(r => {
                setWorkspaceUsers(r.data.data)
            })
            .catch(e => console.log("Workspace not returning members"))
    }

    const getUserInfo = () => {

        // GetUserInfo()
        //     .then(data => {
        //         console.log("getUserInfo >>>", data);
        //         setUser(data)
        //         setCurrentWorkspace(data.currentWorkspace)
        //     })
    }

    const getUserInfoWithEmail = email => {
          customAxios.get(`https://api.zuri.chat/organizations/${currentWorkspace}/members/?query=${email}`,{
            headers: { Authorization: `Bearer ${token}` }
          })
          .then( r => {
              const userData = { ...r.data.data}
              return userData
          })
          .catch ( () => {
            console.warn("YOU ARE NOT LOGGED IN, PLEASE LOG IN")
          })
    }

    useEffect(() => {
        // getUserInfo()
        getMembers()
        getWorkspaceUsers()

        // Prospects listener
        const prospectsSubscriber = (ctx) => {
            const data = ctx.data;
            console.log(data);

            // Check if the user is the same as the logged in user
            if (data.token === "elijah") {
                if (data.event === "join") {
                    const roomPayload = {
                        user: "elijah", // logged in user
                        room_name: "Prospects",
                    };
                    // history.push("/prospects")
                    if (!inRoom) {
                        customAxios.post(addToRoomURL, roomPayload)
                            .then((r) => {
                                console.log(r.data);
                                setInRoom(true)
                                // customAlert("Heyy someone just joined", "success")
                                // setRooms([...rooms, "Prospects"])
                            })
                            .catch((e) => {
                                // console.log(r.data);
                                setInRoom(true)
                                // customAlert("Heyy someone just joined", "success")
                                // setRooms([...rooms, "Prospects"])
                            });
                    }
                } else if (data.event === "leave") {
                    const roomPayload = {
                        user: "elijah", // logged in user
                        room_name: "Prospects",
                    };
                    // history.push("/onboarding")
                    customAxios.post(leaveRoomURL, roomPayload).then((r) => {
                        console.log(r.data);
                        // const filteredRooms = rooms.filter(x !== "Prospects")
                        // setRooms(filteredRooms)
                    });
                } else if (data.event === "new_prospect") {
                    customAxios
                        .get(prospectsURL)
                        .then(({ data }) => {
                            setProspects({
                                contacts: data.contacts,
                                next: data.next,
                                pageNum: data.pageNum,
                                prev: data.prev
                            })
                        })
                        .catch((e) => console.log(e.response));

                } else if (data.event === "edit_prospect") {
                    customAxios
                        .get(prospectsURL)
                        .then(({ data }) => {
                            setProspects({
                                contacts: data.contacts,
                                next: data.next,
                                pageNum: data.pageNum,
                                prev: data.prev
                            })
                        })
                        .catch((e) => console.log(e.response));
                } else if (data.event === "delete_prospect") {

                    customAxios
                        .get(prospectsURL)
                        .then(({ data }) => {
                            setProspects({
                                contacts: data.contacts,
                                next: data.next,
                                pageNum: data.pageNum,
                                prev: data.prev
                            })
                        })
                        .catch((e) => console.log(e.response));
                }
            }
        }

        // Deals listener
        const dealsSubscriber = (ctx) => {
            const data = ctx.data;
            console.log(data);
            setInRoom(true);

            // Check if the user is the same as the logged in user
            if (data.token === "elijah") {
                if (data.event === "join") {
                    const roomPayload = {
                        user: "elijah", // logged in user
                        room_name: "Deals",
                    };
                    // history.push("/sales/deals")
                    customAxios.post(addToRoomURL, roomPayload).then((r) => {
                        console.log(r.data);
                        // setRooms([...rooms, "Deals"])
                    });
                } else if (data.event === "leave") {
                    const roomPayload = {
                        user: "elijah", // logged in user
                        room_name: "Deals",
                    };
                    // history.push("/sales/onboarding")
                    customAxios.post(leaveRoomURL, roomPayload).then((r) => {
                        console.log(r.data);
                        // const filteredRooms = rooms.filter(x !== "Deals")
                        // setRooms(filteredRooms)
                    });
                } else if (data.event === "new_deal") {
                    customAxios
                        .get(dealsURL)
                        .then((r) => setDeals(r.data))
                        .catch((e) => console.log(e.response));

                } else if (data.event === "edit_deal") {
                    customAxios
                        .get(dealsURL)
                        .then((r) => setDeals(r.data))
                        .catch((e) => console.log(e.response));
                } else if (data.event === "delete_deal") {

                    customAxios
                        .get(dealsURL)
                        .then((r) => setDeals(r.data))
                        .catch((e) => console.log(e.response));
                }
            }
        };

        // SubscribeToChannel("Prospects", prospectsSubscriber)
        // SubscribeToChannel("Deals", dealsSubscriber)

    }, [])

    return (
        <PluginContext.Provider value={{
            prospects,
            deals,
            setDeals,
            setProspects,
            members,
            setMembers,
            workspaceUsers,
            setWorkspaceUsers,
            addToRoomFunction,
            removeFromRoomFunction,
            addUserToRoomFunction,
            inRoom,
            setRoom
        }}>
            {children}
        </PluginContext.Provider>
    )
}

// /api/v1/org/<org_id>/room/room_id/members/members_id
// add users to a room
// {
// "members_id": ["32452356789","111116657111"]
// }

// /api/v1/org/<org_id>/room/room_id/members/members_id
// remove users from a room
// {
// "members_id": ["32452356789","111116657111"]
// }


//   customAxios.get(`https://api.zuri.chat/organizations/${currentWorkspace}/members/?query=${user.email}`,{
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   .then( r => {
//       const userData = {currentWorkspace, token, ...r.data.data}
//       setUser(userData)
//   })
//   .catch ( () => {
//     console.warn("YOU ARE NOT LOGGED IN, PLEASE LOG IN")
//   })
