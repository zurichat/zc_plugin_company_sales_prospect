import { createContext, useState } from 'react'

import customAxios, { addToRoomURL, dealsURL, leaveRoomURL, prospectsURL } from '../axios';
import { useEffect } from 'react';
import { SubscribeToChannel, GetUserInfo } from "@zuri/zuri-control";


export const PluginContext = createContext(null)
export const PluginProvider = ({ children }) => {
    const [prospects, setProspects] = useState({ 
        contacts: [],
        next: false,
        pageNum: 1,
        prev: false
    })
    const [deals, setDeals] = useState([])

    const [inRoom, setInRoom] = useState(false);
    // const [token, setToken] = useState(null);
    // const [currentWorkspace, setCurrentWorkspace] = useState(null);

    useEffect(() => {
        GetUserInfo()
            .then(data => {
                console.log("getUserInfo >>>", data);
                // setCurrentWorkspace(data.currentWorkspace)
                // setToken(data.token)
            })

        // Prospects listener
        // centrifuge.subscribe("Prospects", );
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
        SubscribeToChannel("Prospects", prospectsSubscriber)
        // Deals listener
        // centrifuge.subscribe("Deals",  )
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
        SubscribeToChannel("Deals", dealsSubscriber)
        // centrifuge.connect();

    }, [])

    return (
        <PluginContext.Provider value={{ prospects, deals, setDeals, setProspects }}>
            {children}
        </PluginContext.Provider>
    )
}
