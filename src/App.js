import React from 'react';
import logo from './logo.svg';
import './App.css';
import Typography from "@material-ui/core/Typography";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    const [type, setType] = React.useState("notLoggedIn")

    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={() => <SignIn setLoginStatus={setType} loginStatus={type} />} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/dashboard" component={UserDashboard}/>
                <Route path="/panel" component={AdminPanel}/>
            </div>
        </Router>
    );
}

export default App;

/*
                <Route path="/students" exact component={StudentComponent} />
                <Route path="/students/add" exact component={FormDialog} />
                <Route path="/edit/:studentId" component={BookComponent} />
 */