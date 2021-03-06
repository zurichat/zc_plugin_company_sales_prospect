import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prospects from "./containers/Prospects";
// import Test from "./containers/Test";
import Deals from "./containers/Deals";
import { PluginProvider } from "./context/store";
import PluginHeader from "./components/PluginHeader";
import Email from "./containers/EmailTemplate";

function App() {
  return (
    <PluginProvider>
      <Router basename="/sales">
        <div className="App font-lato">
          <PluginHeader />
          <Switch>
            <Route exact path="/" component={Prospects} />
            <Route exact path="/prospects" component={Prospects} />
            <Route exact path="/616b3c4c03538ad521209450" component={Prospects} />

            <Route exact path="/deals" component={Deals} />
            <Route exact path="/616b55bad7d15e82be61a983" component={Deals} />

            <Route exact path="/email" component={Email} />

            {/* <Route exact path="/test" component={Test} /> */}
          </Switch>
        </div>
      </Router>
    </PluginProvider>
  );
}

export default App;
