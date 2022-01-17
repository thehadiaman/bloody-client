import React, {useState} from "react";
import { Switch, Route } from "react-router-dom";
import TopNavbar from "./components/topNavBar";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import "./App.css";
import {Container} from "@mui/material";

export default function App(){
    const [user, setUser] = useState({});

    return <div>
        <TopNavbar user={user} />
        <Container>
            <Switch>
                <Route exact path={'/signup'} component={()=><SignupPage/>} />
                <Route exact path={'/'} component={()=><LoginPage/>} />
            </Switch>
        </Container>
    </div>
}