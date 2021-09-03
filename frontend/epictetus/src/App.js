import "./App.css";
import Test from "./components/Test";
import Home from "./components/Home";
import Header from "./components/Header";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateDealForm from "./components/CreateDealForm";
import EditProspectSales from "./components/EditProspectSales";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/" component={CreateDealForm} />
          <Route exact path="/prospect" component={EditProspectSales} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
