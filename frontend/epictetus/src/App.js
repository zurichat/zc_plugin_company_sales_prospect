import "./App.css";
import Test from "./containers/Test";
import Home from "./containers/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prospects from "./containers/Prospects";
import NoProspectsFound from './containers/NoProspectsFound';
import Deals from "./containers/Deals";
import Intro from "./containers/Intro";

function App() {
  return (
    <Router >
      <div className="App font-lato" >
        
        
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/prospects" component={Prospects} />
          <Route exact path="/deals" component={Deals} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/NoProspectsFound" component={NoProspectsFound} />
          <Route exact path="/Intro" component={Intro} />
        </Switch>

      </div>
    </ Router >
  );

}

export default App
