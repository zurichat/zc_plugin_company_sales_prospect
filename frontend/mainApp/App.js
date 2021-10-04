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
            <Route
              exact
              path="/614f651dcf2c0f1ad7585002"
              component={Prospects}
            />

            <Route exact path="/deals" component={Deals} />
            <Route exact path="/614f63b8cf2c0f1ad7584ffe" component={Deals} />

            <Route exact path="/email" component={Email} />

            {/* <Route exact path="/test" component={Test} /> */}
          </Switch>
        </div>
      </Router>
    </PluginProvider>
  );
}

export default App;
