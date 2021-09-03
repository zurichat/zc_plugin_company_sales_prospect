import './App.css';
import Test from './components/Test';
import Home from './components/Home';
import DealStageColor from './DealStageColor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateDealForm from './components/CreateDealForm';
import EditProspectSales from './components/EditProspectSales';

function App() {
<<<<<<< Updated upstream
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/"
                        component={Home} />
                    <Route exact path="/test"
                        component={Test} />
                    <Route exact path="/"
                        component={CreateDealForm} />
                    <Route exact path="/prospect"
                        component={EditProspectSales} />
                </Switch>
            </div>
        </Router>
    );
=======
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />    
        </Switch>
      </div>
      <DealStageColor/>
  </Router>
  );
>>>>>>> Stashed changes
}

export default App;