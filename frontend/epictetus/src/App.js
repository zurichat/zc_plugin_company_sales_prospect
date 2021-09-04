import "./App.css";
import Test from "./components/Test";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateDealForm from "./components/CreateDealForm";
import EditProspectSales from "./components/EditProspectSales";
import Prospects from "./containers/Prospects";
import DealCard from "./components/svg/DealCard/DealCard";

function App() {
  return (
    <Router>
      <div className="App font-lato">
        {/* lato font class added */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/prospects" component={Prospects} />
          <Route exact path="/Editprospectsales" component={EditProspectSales} />
          <Route exact path="/test" component={Test} />
          <Route
            exact
            path="/deals"
            render={(props) => (
              <DealCard
                dealName="Jane's deal"
                companyName="NNPC"
                dealWorth="500,000"
                customerEmail="janecooper@nnpc.com"
                customerFullName="Jane Cooper"
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
