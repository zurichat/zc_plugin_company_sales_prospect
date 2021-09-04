import './App.css';
import Test, { DragDrop } from './components/Test';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Prospects from './containers/Prospects';

function App() {
    return (
      <Router>
        <div className="App font-lato">
          {/* lato font class added */}
          <Switch>
            <Route exact path="/drag-and-drop" component={DragDrop} />
            <Route exact path="/" component={Home} />
            <Route exact path="/prospects" component={Prospects} />
            <Route exact path="/test" component={Test} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;