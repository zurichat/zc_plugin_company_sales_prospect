import "./App.css";
import Test from "./containers/Test";
// import Home from "./containers/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prospects from "./containers/Prospects";
import Deals from "./containers/Deals";
import SubHeader from "./components/SubHeader";
import MobileHeader from "./components/MobileHeader";
import Centrifuge from 'centrifuge';
import { useEffect, useState } from "react";
import axios from "axios";
// import { getUserInfo } from "./utils";
import { addToRoomURL, leaveRoomURL } from "./axios";
// import { GetUserInfo } from "@zuri/zuri-control";
//import Header from "./components/Header";
// import Intro from "./containers/Intro";

// const centrifuge = new Centrifuge('ws://localhost:8400/connection/websocket');
const centrifuge = new Centrifuge('wss://realtime.zuri.chat/connection/websocket');
// centrifuge.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2MzMxMDI5MTN9.Fs1kg9yvQ1WXdmAoKayDjgP7PovZ6NjWBCS8xyb4J3M");

function App() {

  const [state, setState] = useState(null);
  // const [rooms, setRooms] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    centrifuge.on('connect', function (ctx) {
      console.log("CONNECTED", ctx);
    });

    centrifuge.on('disconnect', function (ctx) {
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
      const data = ctx.data
      console.log(data)
      setState(data);
      // Check if the user is the same as the logged in user
      if (data.token === "elijah") {
        if (data.event === "join") {
          const roomPayload = {
            "user": "elijah", // logged in user
            "room_name": "Prospects"
          }
          // history.push("/prospects")
          axios.post(addToRoomURL, roomPayload)
            .then(r => {
              console.log(r.data);
              // setRooms([...rooms, "Prospects"])
            })
        } else if (data.event === "leave") {
          const roomPayload = {
            "user": "elijah", // logged in user
            "room_name": "Prospects"
          }
          // history.push("/onboarding")
          axios.post(leaveRoomURL, roomPayload)
            .then(r => {
              console.log(r.data);
              // const filteredRooms = rooms.filter(x !== "Prospects")
              // setRooms(filteredRooms)
            })
        }
      }

    });

    // Deals listener
    centrifuge.subscribe("Deals", function (ctx) {
      const data = ctx.data
      console.log(data)
      setState(data);

      // Check if the user is the same as the logged in user
      if (data.token === "elijah") {
        if (data.event === "join") {
          const roomPayload = {
            "user": "elijah", // logged in user
            "room_name": "Deals"
          }
          // history.push("/sales/deals")
          axios.post(addToRoomURL, roomPayload)
            .then(r => {
              console.log(r.data);
              // setRooms([...rooms, "Deals"])
            })
        } else if (data.event === "leave") {
          const roomPayload = {
            "user": "elijah", // logged in user
            "room_name": "Deals"
          }
          // history.push("/sales/onboarding")
          axios.post(leaveRoomURL, roomPayload)
            .then(r => {
              console.log(r.data);
              // const filteredRooms = rooms.filter(x !== "Deals")
              // setRooms(filteredRooms)
            })
        }
      }

    });
    centrifuge.connect();
  }, [])
// /sales/614f63b8cf2c0f1ad7584ffe
// /sales/614f651dcf2c0f1ad7585002
  return (
        <Router basename="/sales">
          <div className="App font-lato" >
            {/* <Header /> */}
            <SubHeader/>
            <MobileHeader/>
            <Switch >
              <Route exact path="/" component={Prospects} />
              <Route exact path="/prospects" component={Prospects} />
              <Route exact path="/614f651dcf2c0f1ad7585002" component={Prospects} />
              
              <Route exact path="/deals" component={Deals} />
              <Route exact path="/614f63b8cf2c0f1ad7584ffe" component={Deals} />
              {/*  */}
            </Switch>

          </div>
        </ Router >
  );

}

export default App
