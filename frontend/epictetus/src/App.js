import './App.css';
import Test from './components/Test';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateDealForm from './components/CreateDealForm';

function App() {
    return ( <
        Router >
        <
        div className = "App" >
        <
        Switch >
        <
        Route exact path = "/"
        component = { Home }
        /> <
        Route exact path = "/test"
        component = { Test }
        />  <
        Route exact path = "/"
        component = { CreateDealForm }
        />  < /
        Switch > <
        /div> < /
        Router >
    );
}

export default App;