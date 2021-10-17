import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prospects from "./containers/Prospects";
// import Test from "./containers/Test";
import Deals from "./containers/Deals";
import { PluginProvider } from "./context/store";
import PluginHeader from "./components/PluginHeader";
import EmailTemplate from "./containers/EmailTemplate";
import EditSendEmail from "./containers/EditSendEmail"
import PageNotFound from "./containers/404";
import { dealsRoom, prospectsRoom } from "./utils";

function App() {
  return (
    <PluginProvider>
      <Router basename="/sales">
        <div className="App font-lato" >
          <PluginHeader/>
          <Switch>
            <Route exact path="/" component={Prospects} />
            <Route exact path="/prospects" component={Prospects} />
            <Route exact path={`/${prospectsRoom}`} component={Prospects} />
            
            <Route exact path="/deals" component={Deals} />
            <Route exact path={`/${dealsRoom}`} component={Deals} />
            <Route exact path="/email" component={EmailTemplate} />
            <Route exact path="/template" component={EditSendEmail} />
            {/* <Route exact path="/test" component={Test} /> */}
            <Route component={PageNotFound} />{/* This route must always be the last on the routing list */}
          </Switch>


        </div>
      </Router>
    </PluginProvider>
  );
}

export default App;
