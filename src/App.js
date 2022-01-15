import React, {useState} from "react";
import TopNavbar from "./components/topNavBar";
import "./App.css";

export default function App(){
    const [user, setUser] = useState({name: 'HELLO'});

    return <div>
        <TopNavbar user={user} />
    </div>
}