//import "./App.css";
import Test, { DragDrop } from "./components/Test";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateDealForm from "./components/CreateDealForm";
import EditProspectSales from "./components/EditProspectSales";
import Prospects from "./containers/Prospects";
import DealCard from "./components/svg/DealCard/DealCard";
import Header from "./components/Header";
import NoProspectsFound from './components/NoProspectsFound';
import DeleteProspect from "./components/DeleteProspect";


function App() {
    return (
       <  Router >
        < div className = "App font-lato" >
          { /* lato font class added */ } 
            <Header />
              <Switch >
              < Route exact path = "/"   component = { Home } />
                  < Route exact path = "/prospects"  component = { Prospects }   />
                  <Route exact path = "/Editprospectsales"   component = { EditProspectSales }   /> 
                  <   Route exact path = "/test"   component = { Test }    />
                  <   Route exact path = "/DragDrop"  component = { DragDrop }    /> 
                 <  Route exact path = "/DealsForm"   component = { CreateDealForm } />
                 <   Route exact path = "/deals"
                  render = {
                      (props) => ( <
                          DealCard dealName = "Jane's deal"
                          companyName = "NNPC"
                          dealWorth = "500,000"
                          customerEmail = "janecooper@nnpc.com"
                          customerFullName = "Jane Cooper" /
                          >
                      )
                      }
                  /> 
                <Route exact path = "/NoProspectsFound" component = { NoProspectsFound }/>
                <Route exact path = "/DeleteProspect" component = { DeleteProspect }/>
              </Switch>
               
        </div> 
        </ Router >
    );

}

export default App
