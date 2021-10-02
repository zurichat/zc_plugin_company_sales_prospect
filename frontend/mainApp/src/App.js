import "./App.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Prospects from "./containers/Prospects";
// import Test from "./containers/Test";
import Deals from "./containers/Deals";
import { PluginProvider } from "./context/store";
import PluginHeader from "./components/PluginHeader";
import { getUserToken } from "./auth/user";

const AuthenticatedRoute = ({ component: Component, ...otherProps }) => {
  const history = useHistory();

  return <Route
    {...otherProps}
    render={props =>
      getUserToken()
        ? <Component {...props} />
        : history.push("/login")}
  />
};

function App() {
  const baseName = '/sales';

  return (
    <PluginProvider>
      <Router>
        <div className="App font-lato" >
          <PluginHeader />
          <Switch>
            <AuthenticatedRoute exact path={`${baseName}/`} component={Prospects} />
            <AuthenticatedRoute exact path={`${baseName}/prospects`} component={Prospects} />
            <AuthenticatedRoute exact path={`${baseName}/614f651dcf2c0f1ad7585002`} component={Prospects} />

            <AuthenticatedRoute exact path={`${baseName}/deals`} component={Deals} />
            <AuthenticatedRoute exact path={`${baseName}/614f63b8cf2c0f1ad7584ffe`} component={Deals} />

           {/*for undeclared /sales/ routes */}
            <AuthenticatedRoute exact path={`${baseName}/*`} component={Prospects} />

            {/* <Route exact path="/test" component={Test} /> */}
          </Switch>

        </div>
      </Router>
    </PluginProvider>
  );
}

export default App;
