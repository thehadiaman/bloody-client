import React from "react";
import {
    Alignment,
    NavbarHeading,
    Button,
    Navbar,
    NavbarDivider
} from "@blueprintjs/core";
import PopoverButton from "./common/popover";
import {useHistory} from "react-router-dom";
import MenuList from "./common/menu";

export default function TopNavbar({user}){
    const history = useHistory();
    const loginTrueMenuList = {
        notification: [[{divider: true}, {divider: true}, {divider: true}, {divider: true}, {divider: true}]],
        user: [{text: 'Profile', icon: 'user', link: '/profile'},
            {text: 'Settings', icon: 'cog', link: '/settings'},
            {divider: true}, {text: 'logout', icon: 'log-out', function: ()=>alert('logout')}]
    };

    const notificationMenuContent = <MenuList list={loginTrueMenuList['notification']}/>;
    const userMenuContent = <MenuList list={loginTrueMenuList['user']}/>;

    const LoginTrueMenuButton = (<Navbar.Group align={Alignment.RIGHT}>
        <NavbarDivider/>
        <PopoverButton icon={"notifications"} className={"bp3-minimal"} content={notificationMenuContent}/>
        <PopoverButton icon={"user"} className={"bp3-minimal"} content={userMenuContent} />
    </Navbar.Group>);

    const LoginFalseMenuButton = (<Navbar.Group align={Alignment.RIGHT}>
        <Button icon={"log-in"} className={"bp3-minimal"} text={"Login"} onClick={()=>history.push('/')}/>
        <NavbarDivider/>
        <Button icon={"new-person"} className={"bp3-minimal"} text={"Signup"} onClick={()=>history.push('/signup')}/>
    </Navbar.Group>);

    return(
        <Navbar className={"bp3-dark"}>
            <Navbar.Group align={Alignment.LEFT}>
                <NavbarHeading onClick={()=>history.push('/')} className={"act-as-link"}>Bloody</NavbarHeading>
                <NavbarDivider/>
            </Navbar.Group>
            { user.name? LoginTrueMenuButton: LoginFalseMenuButton }
        </Navbar>
    )
}