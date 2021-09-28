import { createContext, useState } from 'react'

import Centrifuge from "centrifuge";
import customAxios, { addToRoomURL, dealsURL, leaveRoomURL, prospectsURL } from '../axios';
import { useEffect } from 'react';
import { customAlert, dummyProspects, formatProspect, formatProspects } from '../utils';
// import { GetUserInfo } from "@zuri/zuri-control";

// const centrifuge = new Centrifuge('ws://localhost:8400/connection/websocket');
// centrifuge.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2MzMxMDI5MTN9.Fs1kg9yvQ1WXdmAoKayDjgP7PovZ6NjWBCS8xyb4J3M");


const centrifuge = new Centrifuge(
    "wss://realtime.zuri.chat/connection/websocket"
);

export const PluginContext = createContext(null)
export const PluginProvider = ({ children }) => {
    const [prospects, setProspects] = useState(dummyProspects)
    const [deals, setDeals] = useState([])

    const [inRoom, setInRoom] = useState(false);
    // const [rooms, setRooms] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        centrifuge.on("connect", function (ctx) {
            console.log("CONNECTED", ctx);
            // centrifuge.publish("Prospects", {
            //     "event": "join",
            //     "token": "elijah"
            // })
            // centrifuge.publish("Deals", {
            //     "event": "join",
            //     "token": "elijah"
            // })
        });

        centrifuge.on("disconnect", function (ctx) {
            console.log("DISCONNECTED", ctx);
        });

        // getUserInfo(
        //   "6146f82c845b436ea04d10e1",
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpVek5qSTJObnhIZDNkQlIwUlplRTVIVlRST2JVNW9XbXBOZUZsVVl6QmFWRUV5VDBkVk1GcEVaR3haZHowOWZFMktIUWUxWHhRbVNTbGhTbTlndTFaZWdOdV8zMkVRRkdZeW44OHg1UnpOIiwiZW1haWwiOiJwaWRAb3h5LmNvbSIsImlkIjoiNjE0ZTg2Y2FmMzFhNzRlMDY4ZTRkN2VjIiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6NzkzOTY4NjE3NSwiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.S8vzVsij0CgaKY8TpnujYmBxM1doFPdNSNGQRZkecNs"
        // ).then(data => {
        //   console.log(data)
        // })

        // getUserInfo()
        // .then(data =>{
        //   console.log(data);
        // })

        // Prospects listener
        centrifuge.subscribe("Prospects", function (ctx) {
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
                    // const latestProspect = formatProspect(data.object)
                    // setProspects([...prospects, latestProspect])
                    customAxios
                        .get(prospectsURL)
                        .then((r) => setProspects(formatProspects(r.data)))
                        .catch((e) => console.log(e.response));

                } else if (data.event === "edit_prospect") {
                    customAxios
                        .get(prospectsURL)
                        .then((r) => setProspects(formatProspects(r.data)))
                        .catch((e) => console.log(e.response));
                } else if (data.event === "delete_prospect") {

                    customAxios
                        .get(prospectsURL)
                        .then((r) => setProspects(formatProspects(r.data)))
                        .catch((e) => console.log(e.response));
                }
            }
        });

        // Deals listener
        centrifuge.subscribe("Deals", function (ctx) {
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
                    // const latestProspect = formatProspect(data.object)
                    // setProspects([...prospects, latestProspect])
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
        });
        centrifuge.connect();

    }, [])

    return (
        <PluginContext.Provider value={{ prospects, deals, setDeals, setProspects }}>
            {children}
        </PluginContext.Provider>
    )
}
