import React from 'react';
import './App.css';
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import AuthService from "./services/AuthService";

function App() {
    const [type, setType] = React.useState("notLoggedIn")

    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={() => <SignIn setLoginStatus={setType} loginStatus={type} />} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/logout" exact component={() => {
                    AuthService.logout()
                    setType("notLoggedIn")
                    return(<Redirect to="/" />)} }/>
                <Route path="/dashboard" component={UserDashboard}/>
                <Route path="/panel" exact component={AdminPanel}/>
                <Route path="/panel/graphs" exact component={AdminPanel}/>
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