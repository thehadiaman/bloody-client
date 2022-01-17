import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom";
import {Icon, InputGroup, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";

export default function MenuList({list, search=false, action=()=>{}}){
    const history = useHistory();
    const [searchString, setSearchString] = useState("");
    const [menuList, setMenuList] = useState([]);

    useEffect(()=>{
        async function setList(){
            setMenuList(list.splice(0, 5));
        }
        setList().then(()=>{});
    }, [list]);


    const handleSearch = (value)=>{
        setSearchString(value);
        const filteredList = list.filter(({text})=>{
            if(text){
                return text.toLowerCase().startsWith(value);
            }
            return true;
        });
        setMenuList(filteredList.splice(0, 5));
    }

    const handleLinkClick = (item)=>{
        if(!item.link){
            action(item)
        }else{
            history.push(item.link)
        }
    }

    return <Menu>
        {
            search && (<div>
                    <InputGroup
                        large={true}
                        autoFocus={true}
                        value={searchString}
                        onChange={({target})=>{handleSearch(target.value)}}
                        leftElement={<Icon icon={'search'} />}
                        placeholder={"Search..."}
                        type={"text"}
                    />
                    <MenuDivider/>
                </div>
            )
        }
        {
            menuList.map(item=>{
                if(item['divider']) return <MenuDivider key={Math.random()} />
                return <MenuItem
                    key={Math.random()}
                    text={item.text}
                    onClick={(item.function && !item.link)?item.function:()=>handleLinkClick(item)}
                    icon={item.icon}
                />
            })
        }
    </Menu>;
}