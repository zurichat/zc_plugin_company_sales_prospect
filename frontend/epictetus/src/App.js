import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditProspectSales from './components/EditProspectSales';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/EditProspectSales" component={EditProspectSales} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;