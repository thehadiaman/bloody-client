import * as React from "react";
import { Button, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import {  Popover2 } from "@blueprintjs/popover2";
import {useHistory} from "react-router-dom";

export default function Pop({text, icon, className, list}){
    const history = useHistory();

    const createMenu = (list)=>{
        return <Menu>
            {list.map(item=>{
                if(item['divider']) return <MenuDivider key={Math.random()} />
                return <MenuItem
                    key={Math.random()}
                    text={item.text}
                    onClick={item.function?item.function:()=>history.push(item.link)}
                    icon={item.icon}
                />
            })}
        </Menu>;
    };

    const menu = createMenu(list);
    return (
        <div>
            <Popover2
                content={menu}
                placement={"bottom"}
                renderTarget={({ isOpen, ref, ...targetProps }) => (
                    <Button {...targetProps} elementRef={ref} className={className} text={text} icon={icon} />
                )}
            />
        </div>
    );
}