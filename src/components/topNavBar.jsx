import React from "react";
import {
    Alignment,
    NavbarHeading,
    Button,
    Navbar,
    NavbarDivider
} from "@blueprintjs/core";
import PopoverButton from "./common/popover";

export default function TopNavbar({user}){

    const loginTrueMenuList = {
        user: [{text: 'Profile', icon: 'user', link: '/profile'},
            {text: 'Settings', icon: 'cog', link: '/settings'},
            {divider: true}, {text: 'logout', icon: 'log-out', function: ()=>alert('logout')}]
    };

    const LoginTrueMenuButton = (<Navbar.Group align={Alignment.RIGHT}>
        <PopoverButton icon={"notifications"} className={"bp3-minimal"}  list={[{divider: true}, {divider: true}, {divider: true}, {divider: true}, {divider: true}, ]}/>
        <PopoverButton icon={"user"} className={"bp3-minimal"} list={loginTrueMenuList['user']} />
    </Navbar.Group>);

    const LoginFalseMenuButton = (<Navbar.Group align={Alignment.RIGHT}>
        <Button icon={"log-in"} className={"bp3-minimal"} text={"Login"}/>
        <NavbarDivider/>
        <Button icon={"new-person"} className={"bp3-minimal"} text={"Signup"}/>
    </Navbar.Group>);

    return(
        <Navbar className={"bp3-dark"}>
            <Navbar.Group align={Alignment.LEFT}>
                <NavbarHeading>Blueprint</NavbarHeading>
                <NavbarDivider/>
            </Navbar.Group>
            { user.name?LoginTrueMenuButton:LoginFalseMenuButton }
        </Navbar>
    )
}