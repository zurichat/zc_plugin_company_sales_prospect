import "./App.css";
import Test from "./containers/Test";
import Home from "./containers/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prospects from "./containers/Prospects";
import Header from "./components/Header";
import NoProspectsFound from './containers/NoProspectsFound';
import Deals from "./containers/Deals";

function App() {
  return (
    <Router >
      <div className="App font-lato" >
        
        <Header />
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/prospects" component={Prospects} />
          <Route exact path="/deals" component={Deals} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/NoProspectsFound" component={NoProspectsFound} />
        </Switch>

      </div>
    </ Router >
  );

}

export default App
